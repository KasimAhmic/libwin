import { GetLastError } from '@libwin/kernel32';
import {
  CreateMenu,
  DestroyMenu,
  GetClientRect,
  GetMenu,
  type HELPINFO,
  IDABORT,
  IDCANCEL,
  IDCONTINUE,
  IDIGNORE,
  IDNO,
  IDOK,
  IDRETRY,
  IDTRYAGAIN,
  IDYES,
  MAKELANGID,
  MB_CANCELTRYCONTINUE,
  MB_DEFBUTTON1,
  MB_DEFBUTTON2,
  MB_DEFBUTTON3,
  MB_HELP,
  MB_ICONASTERISK,
  MB_ICONWARNING,
  MB_OKCANCEL,
  MB_RIGHT,
  MB_YESNO,
  MessageBoxA,
  MessageBoxExA,
  MessageBoxExW,
  MessageBoxIndirectW,
  MessageBoxW,
  WS_BORDER,
  WS_CLIPSIBLINGS,
  WS_DLGFRAME,
  WS_POPUP,
  WS_VISIBLE,
} from '@libwin/user32';

const rect = {};

GetClientRect(0x00000000000305e4n, rect);

function checkRes(func: () => number, expectToThrow: boolean = false): void {
  try {
    const res = func();

    switch (res) {
      case IDOK:
      case IDCANCEL:
      case IDABORT:
      case IDRETRY:
      case IDIGNORE:
      case IDYES:
      case IDNO:
      case IDTRYAGAIN:
      case IDCONTINUE:
        console.log('✅ Function executed successfully with result code:', res);
        break;
      default:
        console.error('❌ Function executed with unexpected result code:', res);
        break;
    }
  } catch (error) {
    if (expectToThrow) {
      console.log(`✅ Successfully caught an error! (${(error as { message: string }).message})`);
    } else {
      console.error(`❌ An unexpected error occurred: (${(error as { message: string }).message})`);
    }
  }
}

// Invalid arguments
// checkRes(() => MessageBoxW('0n', '你好世界！', 'Greetings', 0), true);
// checkRes(() => MessageBoxW(0n, 0, 'Greetings', 0), true);
// checkRes(() => MessageBoxW(0n, '你好世界！', 0, 0), true);
// checkRes(() => MessageBoxW(0n, '你好世界！', 'Greetings', '0'), true);

// // Missing arguments
// checkRes(() => MessageBoxW(), true);
// checkRes(() => MessageBoxW(0n), true);
// checkRes(() => MessageBoxW(0n, '你好世界！'), true);
// checkRes(() => MessageBoxW(0n, '你好世界！', 'Greetings'), true);

// // Valid arguments
// checkRes(() => MessageBoxW(0n, 'testing', 'Greetings', 0));
// checkRes(() => MessageBoxA(0n, 'Hello world!', 'Greetings', MB_ICONWARNING | MB_CANCELTRYCONTINUE | MB_DEFBUTTON1));
// checkRes(() =>
//   MessageBoxExW(
//     0n,
//     '你好世界！',
//     'Greetings',
//     MB_ICONWARNING | MB_CANCELTRYCONTINUE | MB_DEFBUTTON2,
//     MAKELANGID(0x4001, 0),
//   ),
// );
// checkRes(() =>
//   MessageBoxExA(
//     0n,
//     'Hello world!',
//     'Greetings',
//     MB_ICONWARNING | MB_CANCELTRYCONTINUE | MB_DEFBUTTON3,
//     MAKELANGID(0x4001, 0),
//   ),
// );

// style (right):   0x94C801C5
// style:           0x94C801C5
// exStyle: 0x00010101

// checkRes(
//   () =>
//     MessageBoxIndirectW({
//       cbSize: 80,
//       hwndOwner: 0n,
//       hInstance: 0n,
//       lpszText: null,
//       lpszCaption: 'testing',
//       dwStyle:
//         MB_OKCANCEL |
//         MB_ICONASTERISK |
//         MB_DEFBUTTON2 |
//         WS_DLGFRAME |
//         WS_BORDER |
//         WS_CLIPSIBLINGS |
//         WS_VISIBLE |
//         WS_POPUP,
//       lpszIcon: '',
//       dwContextHelpId: 0n,
//       dwLanguageId: 0,
//     }),
//   true,
// );

// checkRes(
//   () =>
//     MessageBoxIndirectW({
//       cbSize: 80,
//       hwndOwner: 0n,
//       hInstance: 0n,
//       lpszText: undefined,
//       lpszCaption: 'testing',
//       dwStyle:
//         MB_OKCANCEL |
//         MB_ICONASTERISK |
//         MB_DEFBUTTON2 |
//         WS_DLGFRAME |
//         WS_BORDER |
//         WS_CLIPSIBLINGS |
//         WS_VISIBLE |
//         WS_POPUP,
//       lpszIcon: '',
//       dwContextHelpId: 0n,
//       dwLanguageId: 0,
//     }),
//   true,
// );

// checkRes(
//   () =>
//     MessageBoxIndirectW({
//       cbSize: 80,
//       hwndOwner: 0n,
//       hInstance: 0n,
//       lpszCaption: 'testing',
//       dwStyle:
//         MB_OKCANCEL |
//         MB_ICONASTERISK |
//         MB_DEFBUTTON2 |
//         WS_DLGFRAME |
//         WS_BORDER |
//         WS_CLIPSIBLINGS |
//         WS_VISIBLE |
//         WS_POPUP,
//       lpszIcon: '',
//       dwContextHelpId: 0n,
//       dwLanguageId: 0,
//     }),
//   true,
// );

// checkRes(() =>
//   MessageBoxIndirectW({
//     cbSize: 80,
//     hwndOwner: 0n,
//     hInstance: 0n,
//     lpszCaption: 'testing',
//     lpszText: '你好世界！',
//     dwStyle:
//       MB_OKCANCEL |
//       MB_ICONASTERISK |
//       MB_DEFBUTTON2 |
//       WS_DLGFRAME |
//       WS_BORDER |
//       WS_CLIPSIBLINGS |
//       WS_VISIBLE |
//       WS_POPUP |
//       MB_HELP,
//     lpszIcon: '',
//     dwContextHelpId: 0n,
//     lpfnMsgBoxCallback: (lpHelpInfo: HELPINFO) => {
//       console.log(lpHelpInfo);
//     },
//     dwLanguageId: 0,
//   }),
// );

function bench(fn: () => void, cleanup?: (arg: any) => void) {
  console.log(`Benchmarking function: ${fn.name}...`);

  const ITERATIONS = 1_000_000;

  let total = 0n;
  let min = BigInt(Number.MAX_VALUE);
  let max = BigInt(0);

  for (let i = 0; i < ITERATIONS; i++) {
    const start = process.hrtime.bigint();
    const res = fn();
    const end = process.hrtime.bigint();
    cleanup?.(res);

    const duration = end - start;
    total += duration;
    if (duration < min) min = duration;
    if (duration > max) max = duration;
  }

  const averageNs = total / BigInt(ITERATIONS);
  const averageMs = Number(averageNs) / 1_000_000;

  const minMs = Number(min) / 1_000_000;
  const maxMs = Number(max) / 1_000_000;

  const totalMs = Number(total) / 1_000_000;

  console.log(`Benchmark results for ${fn.name}:`);
  console.log(`  Total time: ${totalMs.toFixed(3)} ms`);
  console.log(`  Average time: ${averageMs.toFixed(6)} ms`);
  console.log(`  Min time: ${minMs.toFixed(6)} ms`);
  console.log(`  Max time: ${maxMs.toFixed(6)} ms`);
  console.log('-----------------------------------');
}
console.log(GetLastError());

bench(CreateMenu, (hMenu) => DestroyMenu(hMenu));
console.log(GetLastError());
bench(function BenchGetMenu() {
  GetMenu(0n);
});

console.log(GetLastError());
