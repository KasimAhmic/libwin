import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export const FORMAT_MESSAGE_ALLOCATE_BUFFER = 0x00000100;
export const FORMAT_MESSAGE_FROM_SYSTEM = 0x00001000;
export const FORMAT_MESSAGE_IGNORE_INSERTS = 0x00000200;
export const LANG_NEUTRAL = 0x00;
export const SUBLANG_DEFAULT = 0x01;

export const {
  GetLastError,
  GetModuleHandleW,
  CreateActCtxW,
  ActivateActCtx,
  FormatMessageW,
  FormatMessageA,
} = require('./kernel32.node');
