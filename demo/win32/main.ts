import { GetModuleHandleW } from '@libwin/kernel32';
import {
  CS_VREDRAW,
  CW_USEDEFAULT,
  CreateWindowExW,
  DefWindowProcW,
  DispatchMessageW,
  GetMessageW,
  PostQuitMessage,
  RegisterClassExW,
  ShowWindow,
  TranslateMessage,
  UpdateWindow,
  WM_DESTROY,
  WS_BORDER,
  WS_CLIPSIBLINGS,
  WS_DLGFRAME,
  WS_EX_ACCEPTFILES,
  WS_EX_WINDOWEDGE,
  WS_MAXIMIZEBOX,
  WS_MINIMIZEBOX,
  WS_SIZEBOX,
  WS_SYSMENU,
  WS_VISIBLE,
} from '@libwin/user32';

function WndProc(windowHandle: bigint, message: number, longParam: number, wordParam: number): bigint {
  switch (message) {
    case WM_DESTROY:
      PostQuitMessage(0);
      return 0n;
    default:
      return DefWindowProcW(windowHandle, message, longParam, wordParam);
  }
}

function WinMain(instanceHandle: number, showCmd: number): number {
  RegisterClassExW({
    cbSize: 80,
    style: CS_VREDRAW,
    lpfnWndProc: WndProc,
    cbClsExtra: 0,
    cbWndExtra: 0,
    hInstance: instanceHandle,
    lpszClassName: 'LibNativeNotepad',
  });

  const hWnd = CreateWindowExW(
    WS_EX_WINDOWEDGE | WS_EX_ACCEPTFILES,
    'LibNativeNotepad',
    'Untitled - Notepad',
    WS_MAXIMIZEBOX | WS_MINIMIZEBOX | WS_SIZEBOX | WS_SYSMENU | WS_DLGFRAME | WS_BORDER | WS_CLIPSIBLINGS | WS_VISIBLE,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    500,
    300,
    null,
    null,
    null,
    null,
  );

  ShowWindow(hWnd, showCmd);

  UpdateWindow(hWnd);

  const msg = {};

  while (GetMessageW(msg, null, 0, 0)) {
    TranslateMessage(msg);
    DispatchMessageW(msg);
  }

  return 0;
}

process.exitCode = WinMain(GetModuleHandleW(null), 1);
