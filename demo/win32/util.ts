import { WideStringBuffer } from '@libwin/common';
import {
  FORMAT_MESSAGE_FROM_SYSTEM,
  FORMAT_MESSAGE_IGNORE_INSERTS,
  FormatMessageW,
  GetLastError,
  LANG_NEUTRAL,
  SUBLANG_DEFAULT,
} from '@libwin/kernel32';
import { MAKELANGID, MB_ICONERROR, MB_OK, MessageBoxW } from '@libwin/user32';

export function HandleError(context: string): number {
  const errorCode = GetLastError();
  const errorMessage = new WideStringBuffer(128);

  FormatMessageW(
    FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS,
    null,
    errorCode,
    MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
    errorMessage.buffer,
    errorMessage.length,
    null,
  );

  MessageBoxW(
    null,
    `${context}\n\nCode: ${errorCode}\nMessage: ${errorMessage.toString()}`,
    `An error occured`,
    MB_OK | MB_ICONERROR,
  );

  return 1;
}
