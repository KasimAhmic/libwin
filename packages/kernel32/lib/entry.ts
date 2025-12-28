import type { INT, WinMain, wWinMain } from '@libwin/common';

import { GetCommandLineW, GetModuleHandleW, GetStartupInfoW } from './kernel32';
import type { STARTUPINFOW } from './structs';

export const STARTF_USESHOWWINDOW = 0x00000001;
export const STARTF_USESIZE = 0x00000002;
export const STARTF_USEPOSITION = 0x00000004;
export const STARTF_USECOUNTCHARS = 0x00000008;
export const STARTF_USEFILLATTRIBUTE = 0x00000010;
export const STARTF_RUNFULLSCREEN = 0x00000020;
export const STARTF_FORCEONFEEDBACK = 0x00000040;
export const STARTF_FORCEOFFFEEDBACK = 0x00000080;
export const STARTF_USESTDHANDLES = 0x00000100;
export const STARTF_USEHOTKEY = 0x00000200;
export const STARTF_TITLEISLINKNAME = 0x00000800;
export const STARTF_TITLEISAPPID = 0x00001000;
export const STARTF_PREVENTPINNING = 0x00002000;
export const STARTF_UNTRUSTEDSOURCE = 0x00008000;
export const STARTF_HOLOGRAPHIC = 0x00040000;

export function main(entry: WinMain | wWinMain): number {
  const hInstance = GetModuleHandleW(null);
  const hPrevInstance = null;
  const lpCmdLine = GetCommandLineW();

  const startupInfo = { cb: 0x44 } as STARTUPINFOW;
  GetStartupInfoW(startupInfo);

  const nShowCmd = (startupInfo.dwFlags & STARTF_USESHOWWINDOW) !== 0 ? startupInfo.wShowWindow : 10;

  return Number(entry(hInstance, hPrevInstance, lpCmdLine, nShowCmd as INT));
}
