/**
 * Experimental TypeScript function declaration generator for libwin bindings.
 *
 * Wanted to see if I could create a sort of DSL that would allow me to both export my bindings and serve as the source
 * of truth for my TypeScript function declarations. The `.api.inc` files would be in the following format:
 *
 * ```cpp
 * QB_EXPORT(User32, MessageBoxW, int, HWND hWnd, LPCWSTR lpText, LPCWSTR lpCaption, UINT uType);
 * QB_EXPORT(User32, MessageBoxA, int, HWND hWnd, LPCSTR lpText, LPCSTR lpCaption, UINT uType);
 * QB_EXPORT(User32, CreateMenu, HMENU);
 * QB_EXPORT(User32, CreatePopupMenu, HMENU);
 * ```
 *
 * The first argument is the namespace, the second is the function name, the third is the return type, and the rest are
 * the arguments and their types. The actual macro would only use the namespace and function name and ignore everything
 * else. The TypeScript generator would parse everything.
 *
 * ```cpp
 * #define QB_EXPORT(ns, fn, ...)                                                      \
 * do {                                                                                \
 *   exports.Set(Napi::String::New(env, #fn), Napi::Function::New(env, ns::fn, #fn));  \
 * } while (0);
 * ```
 *
 * The `.api.inc` files would just be plain C++ code essentially and would just be included in the libraries entry file.
 * Includes being just a dumb copy-paste job really help here.
 *
 * ```cpp
 * Napi::Object Initialize() {
 *   #include "user32.api.inc"
 *
 *   return exports;
 * }
 *
 * NODE_API_MODULE(user32, Initialize)
 * ```
 *
 * As is, this setup works shockingly well for how simple it is, but it does not yet handle complex types, pointers, or
 * a variety of other things. Ultimately, I don't think I'll be using this approach as I'd also want to add some kind of
 * inline documentation to the generated functions, and that would make the `.api.inc` files more complex. Similarly, I
 * would need to sort out how to handle type imports. Simpler types like `HWND`, `BOOL`, and `int` are easy as they can
 * just be imported from `@libwin/common`, but struct types would need to be imported from their respective packages.
 *
 * All of this is solvable, but not at all the goal of this project. The goal is Win32 bindings, not a full-fledged
 * C++ to TypeScript transpiler with accompanying DSL. Still, it was a fun experiment and maybe a future project?
 */
import { readFileSync } from 'node:fs';

import ts from 'typescript';

const EXPORT_REGEX = /(?:QB_EXPORT\()([A-Za-z0-9]+)(?:, )([A-Za-z0-9]+)(?:, )([A-Za-z0-9]+)(?:, )?(.*)(\);)/;

const typeMap: Record<string, ts.KeywordTypeSyntaxKind> = {
  BOOL: ts.SyntaxKind.NumberKeyword,
  int: ts.SyntaxKind.NumberKeyword,
  HMENU: ts.SyntaxKind.BigIntKeyword,
  HWND: ts.SyntaxKind.BigIntKeyword,
  HCURSOR: ts.SyntaxKind.BigIntKeyword,
  ATOM: ts.SyntaxKind.NumberKeyword,
  LRESULT: ts.SyntaxKind.BigIntKeyword,
  void: ts.SyntaxKind.VoidKeyword,
};

class Logger {
  private static readonly MAGENTA = '\x1b[35m'; // verbose
  private static readonly CYAN = '\x1b[36m'; // debug
  private static readonly GREEN = '\x1b[32m'; // info
  private static readonly YELLOW = '\x1b[33m'; // warn
  private static readonly RED = '\x1b[31m'; // error
  private static readonly RESET = '\x1b[0m'; // reset

  private static readonly VERBOSE = `${this.MAGENTA}VERBOSE${this.RESET}`;
  private static readonly DEBUG = `${this.CYAN} DEBUG${this.RESET}`;
  private static readonly INFO = `${this.GREEN} INFO${this.RESET}`;
  private static readonly WARN = `${this.YELLOW} WARN${this.RESET}`;
  private static readonly ERROR = `${this.RED} ERROR${this.RESET}`;

  public static verbose(...messages: string[]) {
    this.write(this.VERBOSE, this.MAGENTA, ...messages);
  }

  public static debug(...messages: string[]) {
    this.write(this.DEBUG, this.CYAN, ...messages);
  }

  public static info(...messages: string[]) {
    this.write(this.INFO, this.GREEN, ...messages);
  }

  public static warn(...messages: string[]) {
    this.write(this.WARN, this.YELLOW, ...messages);
  }

  public static error(...messages: string[]) {
    this.write(this.ERROR, this.RED, ...messages);
  }

  private static write(level: string, color: string, ...messages: string[]) {
    process.stdout.write(
      `${new Date().toLocaleString()} - ${process.pid} ${level} ${this.YELLOW}[root]${this.RESET} ${color}${messages.join(' ')}${this.RESET}\n`,
    );
  }
}

function convertType(
  type: string,
  functionName: string,
  argumentName?: string,
): ts.KeywordTypeNode<ts.KeywordTypeSyntaxKind> {
  const mappedType = typeMap[type];
  if (!mappedType) {
    Logger.warn(
      `Unmapped type "${type}" in function "${functionName}"` + (argumentName ? ` for argument "${argumentName}"` : ''),
    );
  }

  return ts.factory.createKeywordTypeNode(mappedType || ts.SyntaxKind.UnknownKeyword);
}

function createArgumentsArray(argumentString: string | undefined, functionName: string): ts.ParameterDeclaration[] {
  const trimmedArgsString = argumentString?.trim();

  if (!trimmedArgsString) {
    return [];
  }

  return trimmedArgsString.split(', ').map((pair) => {
    const [argumentType, argumentName] = pair.split(' ');

    if (!argumentType || !argumentName) {
      throw new SyntaxError(`Invalid argument pair: ${pair} in function: ${functionName}`);
    }

    return ts.factory.createParameterDeclaration(
      undefined,
      undefined,
      argumentName,
      undefined,
      convertType(argumentType, functionName, argumentName),
      undefined,
    );
  });
}

function main() {
  const contents = readFileSync('./packages/user32/src/user32.api.inc', 'utf8');
  const lines = contents.split('\n');
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const sourceFile = ts.createSourceFile('functionFile.ts', '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);

  for (const line of lines) {
    const match = EXPORT_REGEX.exec(line);

    if (!match) {
      continue;
    }

    const functionName = match[2];
    const cReturnType = match[3];
    const functionArgs = match[4];

    if (!functionName || !cReturnType) {
      throw new SyntaxError(`Invalid function declaration: ${line}`);
    }

    const functionDeclaration = ts.factory.createFunctionDeclaration(
      ts.factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
      undefined,
      functionName,
      undefined,
      createArgumentsArray(functionArgs, functionName),
      convertType(cReturnType, functionName),
      undefined,
    );

    const result = printer.printNode(ts.EmitHint.Unspecified, functionDeclaration, sourceFile);

    console.log(result);
  }
}

main();
