import type { DWORD, HANDLE, LPBYTE, LPSTR, LPWSTR, WORD } from '@libwin/common';

export interface STARTUPINFOW {
  cb: DWORD;
  lpReserved: LPWSTR;
  lpDesktop: LPWSTR;
  lpTitle: LPWSTR;
  dwX: DWORD;
  dwY: DWORD;
  dwXSize: DWORD;
  dwYSize: DWORD;
  dwXCountChars: DWORD;
  dwYCountChars: DWORD;
  dwFillAttribute: DWORD;
  dwFlags: DWORD;
  wShowWindow: WORD;
  cbReserved2: WORD;
  lpReserved2: LPBYTE;
  hStdInput: HANDLE;
  hStdOutput: HANDLE;
  hStdError: HANDLE;
}

export interface STARTUPINFOA {
  cb: DWORD;
  lpReserved: LPSTR;
  lpDesktop: LPSTR;
  lpTitle: LPSTR;
  dwX: DWORD;
  dwY: DWORD;
  dwXSize: DWORD;
  dwYSize: DWORD;
  dwXCountChars: DWORD;
  dwYCountChars: DWORD;
  dwFillAttribute: DWORD;
  dwFlags: DWORD;
  wShowWindow: WORD;
  cbReserved2: WORD;
  lpReserved2: LPBYTE;
  hStdInput: HANDLE;
  hStdOutput: HANDLE;
  hStdError: HANDLE;
}
