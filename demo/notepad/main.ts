import { join } from 'node:path';

import { InitCommonControlsEx } from '@libwin/comctl32';
import {
  type HFONT,
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
  FW_REGULAR,
  OUT_DEFAULT_PRECIS,
} from '@libwin/gdi32';
import { ActivateActCtx, CreateActCtxW, main } from '@libwin/kernel32';
import {
  AppendMenuW,
  COLOR_WINDOW,
  CS_VREDRAW,
  CW_USEDEFAULT,
  CreateMenu,
  CreatePopupMenu,
  CreateWindowExW,
  DefWindowProcW,
  DispatchMessageW,
  EM_SETLIMITTEXT,
  ES_MULTILINE,
  ES_NOHIDESEL,
  GetMessageW,
  IDC_ARROW,
  LoadCursorW,
  MF_POPUP,
  MF_SEPARATOR,
  MF_STRING,
  MoveWindow,
  PostQuitMessage,
  RegisterClassExW,
  SendMessageW,
  SetMenu,
  ShowWindow,
  TranslateMessage,
  UpdateWindow,
  WM_CREATE,
  WM_DESTROY,
  WM_SETFONT,
  WM_SIZE,
  WS_BORDER,
  WS_CHILD,
  WS_CLIPSIBLINGS,
  WS_DLGFRAME,
  WS_EX_ACCEPTFILES,
  WS_EX_WINDOWEDGE,
  WS_HSCROLL,
  WS_MAXIMIZEBOX,
  WS_MINIMIZEBOX,
  WS_SIZEBOX,
  WS_SYSMENU,
  WS_VISIBLE,
  WS_VSCROLL,
} from '@libwin/user32';

import { HandleError } from '../utils/error.util';
import {
  CLASS_NAME,
  DEBUG_MENU_LIPSUM,
  EDIT_MENU_COPY,
  EDIT_MENU_CUT,
  EDIT_MENU_DELETE,
  EDIT_MENU_FIND,
  EDIT_MENU_FIND_NEXT,
  EDIT_MENU_FIND_PREVIOUS,
  EDIT_MENU_GO_TO,
  EDIT_MENU_PASTE,
  EDIT_MENU_REPLACE,
  EDIT_MENU_SELECT_ALL,
  EDIT_MENU_TIME_DATE,
  EDIT_MENU_UNDO,
  FILE_MENU_EXIT,
  FILE_MENU_NEW,
  FILE_MENU_NEW_WINDOW,
  FILE_MENU_OPEN,
  FILE_MENU_PAGE_SETUP,
  FILE_MENU_PRINT,
  FILE_MENU_SAVE,
  FILE_MENU_SAVE_AS,
  FORMAT_MENU_FONT,
  FORMAT_MENU_WORD_WRAP,
  HELP_MENU_ABOUT_NOTEPAD,
  HELP_MENU_SEND_FEEDBACK,
  HELP_MENU_VIEW_HELP,
  MAX_EDIT_LENGTH,
  VIEW_MENU_RESTORE_DEFAULT_ZOOM,
  VIEW_MENU_STATUS_BAR,
  VIEW_MENU_ZOOM_IN,
  VIEW_MENU_ZOOM_OUT,
} from './constants';

const IDC_EDIT = 1001;

let hFont: HFONT;
let hEdit: HWND;

function WndProc(windowHandle: HWND, message: UINT, wordParam: WPARAM, longParam: LPARAM): LRESULT {
  switch (message) {
    case WM_CREATE: {
      hFont = CreateFontW(
        0,
        0,
        0,
        0,
        FW_REGULAR,
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

      hEdit = CreateWindowExW(
        0,
        'EDIT',
        null,
        WS_VISIBLE | WS_CHILD | WS_HSCROLL | WS_VSCROLL | ES_NOHIDESEL | ES_MULTILINE,
        CW_USEDEFAULT,
        CW_USEDEFAULT,
        CW_USEDEFAULT,
        CW_USEDEFAULT,
        windowHandle,
        IDC_EDIT,
        null,
        null,
      );

      SendMessageW(hEdit, WM_SETFONT, hFont, 1n);
      SendMessageW(hEdit, EM_SETLIMITTEXT, MAX_EDIT_LENGTH, 0n);

      const hMenu = CreateMenu();
      const hMenuFile = CreateMenu();
      const hMenuEdit = CreateMenu();
      const hMenuFormat = CreateMenu();
      const hMenuZoom = CreatePopupMenu();
      const hMenuView = CreateMenu();
      const hMenuHelp = CreateMenu();
      const hMenuDebug = CreateMenu();

      // File menu
      AppendMenuW(hMenuFile, MF_STRING, FILE_MENU_NEW, '&New\tCtrl+N');
      AppendMenuW(hMenuFile, MF_STRING, FILE_MENU_NEW_WINDOW, 'New &Window\tCtrl+Shift+N');
      AppendMenuW(hMenuFile, MF_STRING, FILE_MENU_OPEN, '&Open...\tCtrl+O');
      AppendMenuW(hMenuFile, MF_STRING, FILE_MENU_SAVE, '&Save\tCtrl+S');
      AppendMenuW(hMenuFile, MF_STRING, FILE_MENU_SAVE_AS, 'Save &As...\tCtrl+Shift+S');
      AppendMenuW(hMenuFile, MF_SEPARATOR, 0, null);
      AppendMenuW(hMenuFile, MF_STRING, FILE_MENU_PAGE_SETUP, 'Page Set&up...');
      AppendMenuW(hMenuFile, MF_STRING, FILE_MENU_PRINT, '&Print...\tCtrl+P');
      AppendMenuW(hMenuFile, MF_SEPARATOR, 0, null);
      AppendMenuW(hMenuFile, MF_STRING, FILE_MENU_EXIT, 'E&xit');

      // Edit menu
      AppendMenuW(hMenuEdit, MF_STRING, EDIT_MENU_UNDO, '&Undo\tCtrl+Z');
      AppendMenuW(hMenuEdit, MF_SEPARATOR, 0, null);
      AppendMenuW(hMenuEdit, MF_STRING, EDIT_MENU_CUT, 'Cu&t\tCtrl+X');
      AppendMenuW(hMenuEdit, MF_STRING, EDIT_MENU_COPY, '&Copy\tCtrl+C');
      AppendMenuW(hMenuEdit, MF_STRING, EDIT_MENU_PASTE, '&Paste\tCtrl+V');
      AppendMenuW(hMenuEdit, MF_STRING, EDIT_MENU_DELETE, '&Delete\tDel');
      AppendMenuW(hMenuEdit, MF_SEPARATOR, 0, null);
      AppendMenuW(hMenuEdit, MF_STRING, EDIT_MENU_FIND, '&Find...\tCtrl+F');
      AppendMenuW(hMenuEdit, MF_STRING, EDIT_MENU_FIND_NEXT, 'Find &Next\tF3');
      AppendMenuW(hMenuEdit, MF_STRING, EDIT_MENU_FIND_PREVIOUS, 'Find &Previous\tShift+F3');
      AppendMenuW(hMenuEdit, MF_STRING, EDIT_MENU_REPLACE, '&Replace...\tCtrl+H');
      AppendMenuW(hMenuEdit, MF_STRING, EDIT_MENU_GO_TO, '&Go To...\tCtrl+G');
      AppendMenuW(hMenuEdit, MF_SEPARATOR, 0, null);
      AppendMenuW(hMenuEdit, MF_STRING, EDIT_MENU_SELECT_ALL, '&Select All\tCtrl+A');
      AppendMenuW(hMenuEdit, MF_STRING, EDIT_MENU_TIME_DATE, '&Time/Date\tF5');

      // Format menu
      AppendMenuW(hMenuFormat, MF_STRING, FORMAT_MENU_WORD_WRAP, '&Word Wrap');
      AppendMenuW(hMenuFormat, MF_STRING, FORMAT_MENU_FONT, '&Font...');

      // Zoom menu
      AppendMenuW(hMenuZoom, MF_STRING, VIEW_MENU_ZOOM_IN, 'Zoom &In\tCtrl+Plus');
      AppendMenuW(hMenuZoom, MF_STRING, VIEW_MENU_ZOOM_OUT, 'Zoom &Out\tCtrl+Minus');
      AppendMenuW(hMenuZoom, MF_STRING, VIEW_MENU_RESTORE_DEFAULT_ZOOM, '&Restore Default Zoom\tCtrl+0');

      // View menu
      AppendMenuW(hMenuView, MF_POPUP, hMenuZoom, '&Zoom');
      AppendMenuW(hMenuView, MF_STRING, VIEW_MENU_STATUS_BAR, '&Status Bar');

      // Help menu
      AppendMenuW(hMenuHelp, MF_STRING, HELP_MENU_VIEW_HELP, '&View Help');
      AppendMenuW(hMenuHelp, MF_STRING, HELP_MENU_SEND_FEEDBACK, '&Send Feedback');
      AppendMenuW(hMenuHelp, MF_SEPARATOR, 0, null);
      AppendMenuW(hMenuHelp, MF_STRING, HELP_MENU_ABOUT_NOTEPAD, '&About Notepad');

      // Debug menu
      AppendMenuW(hMenuDebug, MF_STRING, DEBUG_MENU_LIPSUM, 'Load Lorem &Ipsum');

      AppendMenuW(hMenu, MF_POPUP, hMenuFile, '&File');
      AppendMenuW(hMenu, MF_POPUP, hMenuEdit, '&Edit');
      AppendMenuW(hMenu, MF_POPUP, hMenuFormat, 'F&ormat');
      AppendMenuW(hMenu, MF_POPUP, hMenuView, '&View');
      AppendMenuW(hMenu, MF_POPUP, hMenuHelp, '&Help');
      AppendMenuW(hMenu, MF_POPUP, hMenuDebug, '&Debug');

      SetMenu(windowHandle, hMenu);

      return 0n;
    }

    case WM_SIZE: {
      const width = LOWORD(longParam);
      const height = HIWORD(longParam);

      MoveWindow(hEdit, 0, 0, width, height, true);
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
