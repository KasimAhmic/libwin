/**
 * Experimental code generator for libwin bindings.
 *
 * Trying to see if I can represent functions in data structures that can then be
 * used to generate the header, source, and function implementations. QuickBind
 * does a lot of the heavy lifting on the C++ side so the actualy implementations
 * are fairly boilerplatey. Currently, it can handle functions whose parameters
 * are a 1:1 map to the Windows function being mapped as well as optional parameters.
 * More work needs to be done to handle functions that take objects that then need
 * to be read into structs as well as functions that take callbacks. I'm thinking I
 * can do the vast majority of the work in mapping the Win32 API here, and then
 * manually implement the more complex functions as needed.
 */

const STANDARD_INCLUDES = [
  '<windows.h>',
  '<napi.h>',
  '',
  '"../../common/include/callback_handler.hpp"',
  '"../../common/include/quickbind.hpp"',
];

function pascaleCaseToSnakeCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();
}

function generateHeader(module: Module): string {
  const lines: string[] = ['#pragma once', ''];

  for (const include of module.includes) {
    if (include) {
      lines.push(`#include ${include}`);
    } else {
      lines.push('');
    }
  }

  lines.push('', `namespace ${module.name} {`);

  for (const fn of module.functions) {
    lines.push(`  Napi::Value ${fn.name}(const Napi::CallbackInfo& info);`);
  }

  lines.push('}', '');

  return lines.join('\n');
}

function generateSource(module: Module): string {
  const lines: string[] = [`#include "${module.library}.hpp"`, ''];

  lines.push(`Napi::Object Initialize(const Napi::Env env, Napi::Object exports) {`);

  for (const fn of module.functions) {
    lines.push(`  QB_EXPORT(${module.name}::${fn.name});`);
  }

  lines.push('', '  return exports');
  lines.push('}', '');

  lines.push(`NODE_API_MODULE(${module.library}, Initialize)`, '');

  return lines.join('\n');
}

function generateFunction(library: string, fn: Fn): string {
  const lines: string[] = [`#include "${library}.hpp"`, ''];

  lines.push(`Napi::Value ${fn.name}(const Napi::CallbackInfo& info) {`);

  for (let i = 0; i < fn.parameters.length; i++) {
    const param = fn.parameters[i]!;

    const prefix = param.required ? 'ReadRequired' : 'ReadOptional';
    const generic = param.generic ? `<${param.generic}>` : '';

    lines.push(`  const QB_ARG(${param.name}, qb::${prefix}${param.type}${generic}(info, ${i}));`);
  }

  lines.push('', `  const auto result = ::${fn.name}(`);

  for (let i = 0; i < fn.parameters.length; i++) {
    const param = fn.parameters[i]!;
    const lastArg = i === fn.parameters.length - 1;

    let line = '';

    if (param.required) {
      line = `    ${param.name}`;
    } else {
      if (param.type === 'String' || param.type === 'WideString') {
        line = `    ${param.name} ? ${param.name}->c_str() : nullptr`;
      } else {
        line = `    ${param.name} ? ${param.name}.value() : nullptr`;
      }
    }

    line += lastArg ? '' : ',';

    lines.push(line);
  }

  lines.push('  );', '');

  lines.push(`  return Napi::${fn.jsReturnType}::New(info.Env(), result);`);

  lines.push('}', '');

  return lines.join('\n');
}

function main() {
  const modules: Module[] = [
    {
      name: 'User32',
      library: 'user32',
      includes: STANDARD_INCLUDES,
      functions: [
        {
          name: 'MessageBoxW',
          parameters: [
            { name: 'hWnd', type: 'Handle', required: false, generic: 'HWND' },
            { name: 'lpText', type: 'WideString', required: false },
            { name: 'lpCaption', type: 'WideString', required: false },
            { name: 'uType', type: 'Uint32', required: true },
          ],
          jsReturnType: 'Number',
        },
        {
          name: 'MessageBoxA',
          parameters: [
            { name: 'hWnd', type: 'Handle', required: false, generic: 'HWND' },
            { name: 'lpText', type: 'String', required: false },
            { name: 'lpCaption', type: 'String', required: false },
            { name: 'uType', type: 'Uint32', required: true },
          ],
          jsReturnType: 'Number',
        },
      ],
    },
  ];

  for (const module of modules) {
    const header = generateHeader(module);
    const source = generateSource(module);
    const functions = module.functions.map((fn) => generateFunction(module.library, fn)).join('\n');

    console.log(`// ===== ${module.name} =====`);
    console.log(header);
    console.log(source);
    console.log(functions);
  }
}

main();

interface Module {
  name: string;
  library: string;
  includes: string[];
  functions: Fn[];
}

interface Fn {
  name: string;
  parameters: Parameter[];
  jsReturnType: JsType;
}

interface Parameter {
  name: string;
  type: QuickBindType;
  required: boolean;
  generic?: CType;
}

type JsType = 'Number' | 'BigInt' | 'String' | 'Void' | 'Boolean' | 'Null' | 'Undefined';

type QuickBindType =
  | 'Uint64'
  | 'Uint32'
  | 'Uint16'
  | 'Uint8'
  | 'Int64'
  | 'Int32'
  | 'Int16'
  | 'Int8'
  | 'String'
  | 'WideString'
  | 'Boolean'
  | 'Object'
  | 'Function'
  | 'Handle'
  | 'PointerSized'
  | 'Int8Buffer'
  | 'Int16Buffer'
  | 'Int32Buffer'
  | 'Int64Buffer'
  | 'Uint8Buffer'
  | 'Uint16Buffer'
  | 'Uint32Buffer'
  | 'Uint64Buffer';

type CType =
  | 'BOOL'
  | 'BYTE'
  | 'CCHAR'
  | 'CHAR'
  | 'DWORD'
  | 'DWORDLONG'
  | 'DWORD_PTR'
  | 'DWORD32'
  | 'DWORD64'
  | 'FLOAT'
  | 'HALF_PTR'
  | 'INT'
  | 'INT_PTR'
  | 'INT8'
  | 'INT16'
  | 'INT32'
  | 'INT64'
  | 'LONG'
  | 'LONGLONG'
  | 'LONG_PTR'
  | 'LONG32'
  | 'LONG64'
  | 'QWORD'
  | 'SHORT'
  | 'TBYTE'
  | 'TCHAR'
  | 'UCHAR'
  | 'UHALF_PTR'
  | 'UINT'
  | 'UINT_PTR'
  | 'UINT8'
  | 'UINT16'
  | 'UINT32'
  | 'UINT64'
  | 'ULONG'
  | 'ULONGLONG'
  | 'ULONG_PTR'
  | 'ULONG32'
  | 'ULONG64'
  | 'USHORT'
  | 'WCHAR'
  | 'WORD'
  | 'VOID'
  | 'PVOID'
  | 'ATOM'
  | 'BOOLEAN'
  | 'COLORREF'
  | 'LANGID'
  | 'LPARAM'
  | 'LRESULT'
  | 'HRESULT'
  | 'WPARAM'
  | 'HANDLE'
  | 'HACCEL'
  | 'HBITMAP'
  | 'HBRUSH'
  | 'HCOLORSPACE'
  | 'HCONV'
  | 'HCONVLIST'
  | 'HCURSOR'
  | 'HDC'
  | 'HDDEDATA'
  | 'HDESK'
  | 'HDROP'
  | 'HDWP'
  | 'HENHMETAFILE'
  | 'HFILE'
  | 'HFONT'
  | 'HGDIOBJ'
  | 'HGLOBAL'
  | 'HHOOK'
  | 'HICON'
  | 'HINSTANCE'
  | 'HKEY'
  | 'HKL'
  | 'HLOCAL'
  | 'HMENU'
  | 'HMETAFILE'
  | 'HMODULE'
  | 'HMONITOR'
  | 'HPALETTE'
  | 'HPEN'
  | 'HRGN'
  | 'HRSRC'
  | 'HSZ'
  | 'HWINSTA'
  | 'HWND'
  | 'LPBOOL'
  | 'LPBYTE'
  | 'LPCSTR'
  | 'LPCWSTR'
  | 'LPCTSTR'
  | 'LPCVOID'
  | 'LPDWORD'
  | 'LPHANDLE'
  | 'LPINT'
  | 'LPLONG'
  | 'LPSTR'
  | 'LPWSTR'
  | 'LPTSTR'
  | 'LPVOID'
  | 'LPWORD'
  | 'PULONG_PTR'
  | 'PUINT_PTR';
