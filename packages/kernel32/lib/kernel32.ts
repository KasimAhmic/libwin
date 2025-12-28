import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export const {
  GetLastError,
  GetModuleHandleW,
  CreateActCtxW,
  ActivateActCtx,
  FormatMessageW,
  FormatMessageA,
  GetCommandLineW,
  GetCommandLineA,
  GetStartupInfoW,
} = require('./kernel32.node');
