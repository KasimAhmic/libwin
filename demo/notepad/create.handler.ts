import { type HFONT, type HWND, WideStringBuffer, ptr } from '@libwin/common';
import {
  CLIP_DEFAULT_PRECIS,
  CreateFontW,
  DEFAULT_CHARSET,
  DEFAULT_PITCH,
  DEFAULT_QUALITY,
  FF_SWISS,
  FW_REGULAR,
  OUT_DEFAULT_PRECIS,
} from '@libwin/gdi32';
import {
  AppendMenuW,
  CW_USEDEFAULT,
  CreateMenu,
  CreatePopupMenu,
  CreateWindowExW,
  EM_SETLIMITTEXT,
  ES_MULTILINE,
  ES_NOHIDESEL,
  MF_POPUP,
  MF_SEPARATOR,
  MF_STRING,
  SBS_SIZEGRIP,
  SB_SETPARTS,
  SB_SETTEXTW,
  SendMessageW,
  SetMenu,
  WM_SETFONT,
  WM_SIZE,
  WS_CHILD,
  WS_HSCROLL,
  WS_VISIBLE,
  WS_VSCROLL,
} from '@libwin/user32';

import {
  DEBUG_MENU_LIPSUM,
  EDIT_ID,
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
  STATUS_BAR_EMPTY,
  STATUS_BAR_ENCODING,
  STATUS_BAR_LINE_COL,
  STATUS_BAR_LINE_ENDING,
  STATUS_BAR_PART_SIZES,
  STATUS_BAR_ZOOM_LEVEL,
  VIEW_MENU_RESTORE_DEFAULT_ZOOM,
  VIEW_MENU_STATUS_BAR,
  VIEW_MENU_ZOOM_IN,
  VIEW_MENU_ZOOM_OUT,
  WINDOW_WIDTH,
} from './constants';

export function handleCreate(windowHandle: HWND): [HFONT, HWND, HWND] {
  const hFont = CreateFontW(
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

  const hEdit = CreateWindowExW(
    0,
    'EDIT',
    null,
    WS_VISIBLE | WS_CHILD | WS_HSCROLL | WS_VSCROLL | ES_NOHIDESEL | ES_MULTILINE,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    windowHandle,
    EDIT_ID,
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

  const hStatusBar = CreateWindowExW(
    0,
    'msctls_statusbar32',
    null,
    WS_CHILD | WS_VISIBLE | SBS_SIZEGRIP,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    windowHandle,
    0,
    0n,
    0n,
  );

  const parts = getStatusBarParts(WINDOW_WIDTH);

  const empty = new WideStringBuffer('');
  const lineColumn = new WideStringBuffer('Ln 1, Col 1');
  const zoomLevel = new WideStringBuffer('100%');
  const lineEnding = new WideStringBuffer('Windows (CRLF)');
  const encoding = new WideStringBuffer('UTF-8');

  SendMessageW(hStatusBar, WM_SIZE, 0, 0);
  SendMessageW(hStatusBar, SB_SETPARTS, parts.length, ptr(parts));
  SendMessageW(hStatusBar, SB_SETTEXTW, STATUS_BAR_EMPTY, empty.ptr);
  SendMessageW(hStatusBar, SB_SETTEXTW, STATUS_BAR_LINE_COL, lineColumn.ptr);
  SendMessageW(hStatusBar, SB_SETTEXTW, STATUS_BAR_ZOOM_LEVEL, zoomLevel.ptr);
  SendMessageW(hStatusBar, SB_SETTEXTW, STATUS_BAR_LINE_ENDING, lineEnding.ptr);
  SendMessageW(hStatusBar, SB_SETTEXTW, STATUS_BAR_ENCODING, encoding.ptr);

  return [hFont, hEdit, hStatusBar];
}

export function getStatusBarParts(totalWidth: number): Uint32Array {
  const parts: number[] = [];

  const partOne = totalWidth - STATUS_BAR_PART_SIZES.reduce((acc, curr) => acc + curr, 0);
  parts.push(partOne);

  let runningTotal = partOne;

  for (let i = 0; i < STATUS_BAR_PART_SIZES.length; i++) {
    parts.push((runningTotal += STATUS_BAR_PART_SIZES[i]!));
  }

  return new Uint32Array(parts);
}
