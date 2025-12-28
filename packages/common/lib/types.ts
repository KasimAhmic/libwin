/**
 * A nominal type is a type that is defined by its name, rather than its structure. This allows us to take
 * multiple C types that would otherwise map to the same TypeScript (JavaScript) type and treat them as
 * distinct types.
 *
 * For example, `int`, `unsigned int`, `long`, etc. are all distinct types with their own meaning and own
 * features in C, however in TypeScript they all map to `number`. By using nominal types, we can make
 * TypeScript display an error when you try to use an `int32_t` type in a function that expects an
 * `uint32_t` type for example.
 *
 * Note that there is no runtime safety to this! This is purely a compile-time check to help you catch errors
 * early. For example, if a C function expects an `unsigned int` and you pass in a positive `int` ignoring
 * the TypeScript error, it will work fine at runtime. If you however try to pass a negative `int`, you may
 * get a runtime error or unexpected behavior.
 *
 * **You have been warned!**
 *
 * @template T The underlying TypeScript type.
 * @template U The name of the nominal type.
 *
 * @example
 *
 * type int32_t = Nominal<number, 'int32_t'>;
 * type uint32_t = Nominal<number, 'uint32_t'>;
 *
 * function add(a: int32_t, b: int32_t): int32_t {
 *   return a + b;
 * }
 *
 * const one: int32_t = 123;
 * const two: int32_t = 456;
 * const three: uint32_t = 789;
 *
 * add(one, two);   // OK
 * add(one, three); // Error
 */
export type Nominal<T, U extends string> = T & { readonly __jsType?: T; readonly __cType?: U };

export type JsType<T extends Nominal<unknown, string>> = NonNullable<T['__jsType']>;
export type CType<T extends Nominal<unknown, string>> = NonNullable<T['__cType']>;

export type BOOL = Nominal<number, 'BOOL'>;
export type BYTE = Nominal<number, 'BYTE'>;
export type CCHAR = Nominal<string, 'CCHAR'>;
export type CHAR = Nominal<string, 'CHAR'>;
export type DWORD = Nominal<number, 'DWORD'>;
export type DWORDLONG = Nominal<bigint, 'DWORDLONG'>;
export type DWORD_PTR = Nominal<bigint, 'DWORD_PTR'>;
export type DWORD32 = Nominal<number, 'DWORD32'>;
export type DWORD64 = Nominal<bigint, 'DWORD64'>;
export type FLOAT = Nominal<number, 'FLOAT'>;
export type HALF_PTR = Nominal<bigint, 'HALF_PTR'>;
export type INT = Nominal<number, 'INT'>;
export type INT_PTR = Nominal<bigint, 'INT_PTR'>;
export type INT8 = Nominal<number, 'INT8'>;
export type INT16 = Nominal<number, 'INT16'>;
export type INT32 = Nominal<number, 'INT32'>;
export type INT64 = Nominal<bigint, 'INT64'>;
export type LONG = Nominal<number, 'LONG'>;
export type LONGLONG = Nominal<bigint, 'LONGLONG'>;
export type LONG_PTR = Nominal<bigint, 'LONG_PTR'>;
export type LONG32 = Nominal<number, 'LONG32'>;
export type LONG64 = Nominal<bigint, 'LONG64'>;
export type QWORD = Nominal<bigint, 'QWORD'>;
export type SHORT = Nominal<number, 'SHORT'>;
export type TBYTE = Nominal<number, 'TBYTE'>;
export type TCHAR = Nominal<string, 'TCHAR'>;
export type UCHAR = Nominal<number, 'UCHAR'>;
export type UHALF_PTR = Nominal<bigint, 'UHALF_PTR'>;
export type UINT = Nominal<number, 'UINT'>;
export type UINT_PTR = Nominal<bigint, 'UINT_PTR'>;
export type UINT8 = Nominal<number, 'UINT8'>;
export type UINT16 = Nominal<number, 'UINT16'>;
export type UINT32 = Nominal<number, 'UINT32'>;
export type UINT64 = Nominal<bigint, 'UINT64'>;
export type ULONG = Nominal<number, 'ULONG'>;
export type ULONGLONG = Nominal<bigint, 'ULONGLONG'>;
export type ULONG_PTR = Nominal<bigint, 'ULONG_PTR'>;
export type ULONG32 = Nominal<number, 'ULONG32'>;
export type ULONG64 = Nominal<bigint, 'ULONG64'>;
export type USHORT = Nominal<number, 'USHORT'>;
export type WCHAR = Nominal<string, 'WCHAR'>;
export type WORD = Nominal<number, 'WORD'>;
export type VOID = Nominal<void, 'VOID'>;
export type PVOID = Nominal<bigint, 'PVOID'>;

export type ATOM = Nominal<number, 'ATOM'>;
export type BOOLEAN = Nominal<number, 'BOOLEAN'>;
export type COLORREF = Nominal<number, 'COLORREF'>;
export type LANGID = Nominal<number, 'LANGID'>;
export type LPARAM = Nominal<bigint, 'LPARAM'>;
export type LRESULT = Nominal<bigint, 'LRESULT'>;
export type HRESULT = Nominal<number, 'HRESULT'>;
export type WPARAM = Nominal<bigint, 'WPARAM'>;

export type HANDLE = Nominal<bigint, 'HANDLE'>;
export type HACCEL = Nominal<JsType<HANDLE>, 'HACCEL'>;
export type HBITMAP = Nominal<JsType<HANDLE>, 'HBITMAP'>;
export type HBRUSH = Nominal<JsType<HANDLE>, 'HBRUSH'>;
export type HCOLORSPACE = Nominal<JsType<HANDLE>, 'HCOLORSPACE'>;
export type HCONV = Nominal<JsType<HANDLE>, 'HCONV'>;
export type HCONVLIST = Nominal<JsType<HANDLE>, 'HCONVLIST'>;
export type HCURSOR = Nominal<JsType<HANDLE>, 'HCURSOR'>;
export type HDC = Nominal<JsType<HANDLE>, 'HDC'>;
export type HDDEDATA = Nominal<JsType<HANDLE>, 'HDDEDATA'>;
export type HDESK = Nominal<JsType<HANDLE>, 'HDESK'>;
export type HDROP = Nominal<JsType<HANDLE>, 'HDROP'>;
export type HDWP = Nominal<JsType<HANDLE>, 'HDWP'>;
export type HENHMETAFILE = Nominal<JsType<HANDLE>, 'HENHMETAFILE'>;
export type HFILE = Nominal<JsType<HANDLE>, 'HFILE'>;
export type HFONT = Nominal<JsType<HANDLE>, 'HFONT'>;
export type HGDIOBJ = Nominal<JsType<HANDLE>, 'HGDIOBJ'>;
export type HGLOBAL = Nominal<JsType<HANDLE>, 'HGLOBAL'>;
export type HHOOK = Nominal<JsType<HANDLE>, 'HHOOK'>;
export type HICON = Nominal<JsType<HANDLE>, 'HICON'>;
export type HINSTANCE = Nominal<JsType<HANDLE>, 'HINSTANCE'>;
export type HKEY = Nominal<JsType<HANDLE>, 'HKEY'>;
export type HKL = Nominal<JsType<HANDLE>, 'HKL'>;
export type HLOCAL = Nominal<JsType<HANDLE>, 'HLOCAL'>;
export type HMENU = Nominal<JsType<HANDLE>, 'HMENU'>;
export type HMETAFILE = Nominal<JsType<HANDLE>, 'HMETAFILE'>;
export type HMODULE = Nominal<JsType<HANDLE>, 'HMODULE'>;
export type HMONITOR = Nominal<JsType<HANDLE>, 'HMONITOR'>;
export type HPALETTE = Nominal<JsType<HANDLE>, 'HPALETTE'>;
export type HPEN = Nominal<JsType<HANDLE>, 'HPEN'>;
export type HRGN = Nominal<JsType<HANDLE>, 'HRGN'>;
export type HRSRC = Nominal<JsType<HANDLE>, 'HRSRC'>;
export type HSZ = Nominal<JsType<HANDLE>, 'HSZ'>;
export type HWINSTA = Nominal<JsType<HANDLE>, 'HWINSTA'>;
export type HWND = Nominal<JsType<HANDLE>, 'HWND'>;

export type LPBOOL = Nominal<bigint, 'LPBOOL'>;
export type LPBYTE = Nominal<bigint, 'LPBYTE'>;
export type LPCSTR = Nominal<string, 'LPCSTR'>;
export type LPCWSTR = Nominal<string, 'LPCWSTR'>;
export type LPCTSTR = Nominal<string, 'LPCTSTR'>;
export type LPCVOID = Nominal<bigint, 'LPCVOID'>;
export type LPDWORD = Nominal<bigint, 'LPDWORD'>;
export type LPHANDLE = Nominal<bigint, 'LPHANDLE'>;
export type LPINT = Nominal<bigint, 'LPINT'>;
export type LPLONG = Nominal<bigint, 'LPLONG'>;
export type LPSTR = Nominal<string, 'LPSTR'>;
export type LPWSTR = Nominal<string, 'LPWSTR'>;
export type LPTSTR = Nominal<string, 'LPTSTR'>;
export type LPVOID = Nominal<bigint, 'LPVOID'>;
export type LPWORD = Nominal<bigint, 'LPWORD'>;

export type PULONG_PTR = Nominal<bigint, 'PULONG_PTR'>;
export type PUINT_PTR = Nominal<bigint, 'PUINT_PTR'>;

export type WinMain = (
  hInstance: HINSTANCE,
  hPrevInstance: HINSTANCE | null,
  lpCmdLine: LPSTR,
  nShowCmd: INT,
) => LRESULT;

export type wWinMain = (
  hInstance: HINSTANCE,
  hPrevInstance: HINSTANCE | null,
  lpCmdLine: LPWSTR,
  nShowCmd: INT,
) => LRESULT;
