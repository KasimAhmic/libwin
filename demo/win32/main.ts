import { join } from 'node:path';

import { InitCommonControlsEx } from '@libwin/comctl32';
import {
  type HINSTANCE,
  HIWORD,
  type HWND,
  type INT,
  LOWORD,
  type LPARAM,
  type LPWSTR,
  type LRESULT,
  type UINT,
  type WPARAM,
} from '@libwin/common';
import {
  CLIP_DEFAULT_PRECIS,
  CreateFontW,
  DEFAULT_CHARSET,
  DEFAULT_PITCH,
  DEFAULT_QUALITY,
  FF_SWISS,
  FW_HEAVY,
  OUT_DEFAULT_PRECIS,
} from '@libwin/gdi32';
import { ActivateActCtx, CreateActCtxW, main } from '@libwin/kernel32';
import {
  BN_CLICKED,
  COLOR_WINDOW,
  CS_VREDRAW,
  CW_USEDEFAULT,
  CreateWindowExW,
  DefWindowProcW,
  DispatchMessageW,
  GetMessageW,
  IDC_ARROW,
  LoadCursorW,
  MessageBoxW,
  PostQuitMessage,
  RegisterClassExW,
  SendMessageW,
  ShowWindow,
  TranslateMessage,
  UpdateWindow,
  WM_COMMAND,
  WM_CREATE,
  WM_DESTROY,
  WM_SETFONT,
  WS_BORDER,
  WS_CHILD,
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

import { HandleError } from '../utils/error.util.js';

const IDC_OPEN_BUTTON = 1001;

let hFont;
let hButton;

function WndProc(windowHandle: HWND, message: UINT, wordParam: WPARAM, longParam: LPARAM): LRESULT {
  switch (message) {
    case WM_CREATE: {
      hFont = CreateFontW(
        -18,
        0,
        0,
        0,
        FW_HEAVY,
        0,
        0,
        0,
        DEFAULT_CHARSET,
        OUT_DEFAULT_PRECIS,
        CLIP_DEFAULT_PRECIS,
        DEFAULT_QUALITY,
        DEFAULT_PITCH | FF_SWISS,
        'Consolas',
      );

      hButton = CreateWindowExW(
        0,
        'BUTTON',
        'Click Me',
        WS_VISIBLE | WS_CHILD,
        10,
        10,
        100,
        30,
        windowHandle,
        IDC_OPEN_BUTTON,
        null,
        null,
      );

      SendMessageW(hButton, WM_SETFONT, hFont, 1n);

      return 0n;
    }

    case WM_COMMAND: {
      if (HIWORD(wordParam) === BN_CLICKED) {
        switch (LOWORD(wordParam)) {
          case IDC_OPEN_BUTTON: {
            MessageBoxW(windowHandle, 'Button Clicked!', 'Info', 0);

            return 0n;
          }
        }
      }

      return 0n;
    }

    case WM_DESTROY: {
      PostQuitMessage(0);

      return 0n;
    }

    default:
      return DefWindowProcW(windowHandle, message, wordParam, longParam);
  }
}

function WinMain(
  instanceHandle: HINSTANCE,
  _previousInstanceHandle: HINSTANCE | null,
  _commandLine: LPWSTR,
  showCmd: INT,
): LRESULT {
  InitCommonControlsEx({
    dwSize: 8,
    dwICC: 0x00004000 | 0x00000004, // ICC_STANDARD_CLASSES | ICC_BAR_CLASSES
  });

  const activationContextHandle = CreateActCtxW({
    cbSize: 24,
    lpSource: join(process.cwd(), 'win32', 'win32.manifest'),
  });

  if (!activationContextHandle) {
    return HandleError('Failed to create activation context');
  }

  const cookie = new BigUint64Array(1);

  if (!ActivateActCtx(activationContextHandle, cookie)) {
    return HandleError('Failed to activate activation context ');
  }

  if (
    !RegisterClassExW({
      cbSize: 80,
      style: CS_VREDRAW,
      lpszClassName: 'LibWinExampleApp',
      hInstance: instanceHandle,
      hCursor: LoadCursorW(null, IDC_ARROW),
      hbrBackground: COLOR_WINDOW,
      cbClsExtra: 0,
      cbWndExtra: 0,
      lpfnWndProc: WndProc,
    })
  ) {
    return HandleError('Failed to register class');
  }

  const hWnd = CreateWindowExW(
    WS_EX_WINDOWEDGE | WS_EX_ACCEPTFILES,
    'LibWinExampleApp',
    'Example App using libwin',
    WS_MAXIMIZEBOX | WS_MINIMIZEBOX | WS_SIZEBOX | WS_SYSMENU | WS_DLGFRAME | WS_BORDER | WS_CLIPSIBLINGS | WS_VISIBLE,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    500,
    300,
    null,
    null,
    instanceHandle,
    null,
  );

  if (!hWnd) {
    return HandleError('Failed to create main window');
  }

  ShowWindow(hWnd, showCmd);
  UpdateWindow(hWnd);

  const msg = {};

  while (GetMessageW(msg, null, 0, 0)) {
    TranslateMessage(msg);
    DispatchMessageW(msg);
  }

  return 0n;
}

process.exitCode = main(WinMain);
