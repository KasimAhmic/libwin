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
  ptr,
} from '@libwin/common';
import { ActivateActCtx, CreateActCtxW, main } from '@libwin/kernel32';
import {
  COLOR_WINDOW,
  CS_VREDRAW,
  CW_USEDEFAULT,
  CreateWindowExW,
  DefWindowProcW,
  DispatchMessageW,
  GetMessageW,
  IDC_ARROW,
  LoadCursorW,
  MoveWindow,
  PostQuitMessage,
  RegisterClassExW,
  SB_SETPARTS,
  SWP_NOMOVE,
  SendMessageW,
  SetWindowPos,
  ShowWindow,
  TranslateMessage,
  UpdateWindow,
  WM_COMMAND,
  WM_CREATE,
  WM_DESTROY,
  WM_SIZE,
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

import { HandleError } from '../utils/error.util';
import { CLASS_NAME, WINDOW_WIDTH } from './constants';
import { getStatusBarParts, handleCreate } from './create.handler';
import { handleMenu } from './menu.handler';
import { state } from './state';

function WndProc(windowHandle: HWND, message: UINT, wordParam: WPARAM, longParam: LPARAM): LRESULT {
  switch (message) {
    case WM_CREATE: {
      const [hFont, hEdit, hStatusBar] = handleCreate(windowHandle);

      state.handles.fontHandle = hFont;
      state.handles.editHandle = hEdit;
      state.handles.statusBarHandle = hStatusBar;

      return 0n;
    }

    case WM_SIZE: {
      const width = LOWORD(longParam);
      const height = HIWORD(longParam);
      const parts = getStatusBarParts(width);

      MoveWindow(state.handles.editHandle, 0, 0, width, height - 23, true);
      SetWindowPos(state.handles.statusBarHandle, 0n, 0, height - 20, width, 20, SWP_NOMOVE);
      SendMessageW(state.handles.statusBarHandle, SB_SETPARTS, parts.length, ptr(parts));

      return 0n;
    }

    case WM_COMMAND: {
      handleMenu(wordParam, longParam);

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
    lpSource: join(process.cwd(), 'notepad', 'notepad.manifest'),
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
      lpszClassName: CLASS_NAME,
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
    CLASS_NAME,
    'Untitled - Notepad',
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
