import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export const { GetLastError, GetModuleHandleW } = require('./kernel32.node');
