import { type HWND, LOWORD, type LPARAM, type LRESULT, type WPARAM, WideStringBuffer } from '@libwin/common';
import { CreateFontW, DeleteObject } from '@libwin/gdi32';
import {
  CreateWindowExW,
  DestroyWindow,
  EM_SETSEL,
  EM_UNDO,
  GetClientRect,
  GetWindowLongPtrW,
  GetWindowTextW,
  MoveWindow,
  SB_SETTEXTW,
  SendMessageW,
  SetMenuItemInfoW,
  SetWindowTextW,
  WM_CLEAR,
  WM_CLOSE,
  WM_COPY,
  WM_CUT,
  WM_PASTE,
  WM_SETFONT,
  WM_SETTEXT,
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
  STATUS_BAR_ZOOM_LEVEL,
  VIEW_MENU_RESTORE_DEFAULT_ZOOM,
  VIEW_MENU_STATUS_BAR,
  VIEW_MENU_ZOOM_IN,
  VIEW_MENU_ZOOM_OUT,
} from './constants';
import { DEFAULT_ZOOM_LEVEL, MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL, ZOOM_LEVEL_INCREMENT, state } from './state';

export function handleMenu(wordParam: WPARAM, longParam: LPARAM): void {
  switch (LOWORD(wordParam)) {
    case FILE_MENU_NEW:
      console.debug('FILE_MENU_NEW', FILE_MENU_NEW);
      break;

    case FILE_MENU_NEW_WINDOW:
      console.debug('FILE_MENU_NEW_WINDOW', FILE_MENU_NEW_WINDOW);
      break;

    case FILE_MENU_OPEN:
      console.debug('FILE_MENU_OPEN', FILE_MENU_OPEN);
      break;

    case FILE_MENU_SAVE:
      console.debug('FILE_MENU_SAVE', FILE_MENU_SAVE);
      break;

    case FILE_MENU_SAVE_AS:
      console.debug('FILE_MENU_SAVE_AS', FILE_MENU_SAVE_AS);
      break;

    case FILE_MENU_PAGE_SETUP:
      console.debug('FILE_MENU_PAGE_SETUP', FILE_MENU_PAGE_SETUP);
      break;

    case FILE_MENU_PRINT:
      console.debug('FILE_MENU_PRINT', FILE_MENU_PRINT);
      break;

    case FILE_MENU_EXIT:
      console.debug('FILE_MENU_EXIT', FILE_MENU_EXIT);
      SendMessageW(state.handles.windowHandle, WM_CLOSE, 0, 0);
      break;

    // ============================================================

    case EDIT_MENU_UNDO:
      console.debug('EDIT_MENU_UNDO', EDIT_MENU_UNDO);
      SendMessageW(state.handles.editHandle, EM_UNDO, 0, 0);
      break;

    case EDIT_MENU_CUT:
      console.debug('EDIT_MENU_CUT', EDIT_MENU_CUT);
      SendMessageW(state.handles.editHandle, WM_CUT, 0, 0);
      break;

    case EDIT_MENU_COPY:
      console.debug('EDIT_MENU_COPY', EDIT_MENU_COPY);
      SendMessageW(state.handles.editHandle, WM_COPY, 0, 0);
      break;

    case EDIT_MENU_PASTE:
      console.debug('EDIT_MENU_PASTE', EDIT_MENU_PASTE);
      SendMessageW(state.handles.editHandle, WM_PASTE, 0, 0);
      break;

    case EDIT_MENU_DELETE:
      console.debug('EDIT_MENU_DELETE', EDIT_MENU_DELETE);
      // TODO: Figure out how to handle both the delete key and the delete menu item
      SendMessageW(state.handles.editHandle, WM_CLEAR, 0, 0);
      break;

    case EDIT_MENU_FIND:
      console.debug('EDIT_MENU_FIND', EDIT_MENU_FIND);
      break;

    case EDIT_MENU_FIND_NEXT:
      console.debug('EDIT_MENU_FIND_NEXT', EDIT_MENU_FIND_NEXT);
      break;

    case EDIT_MENU_FIND_PREVIOUS:
      console.debug('EDIT_MENU_FIND_PREVIOUS', EDIT_MENU_FIND_PREVIOUS);
      break;

    case EDIT_MENU_REPLACE:
      console.debug('EDIT_MENU_REPLACE', EDIT_MENU_REPLACE);
      break;

    case EDIT_MENU_GO_TO:
      console.debug('EDIT_MENU_GO_TO', EDIT_MENU_GO_TO);
      break;

    case EDIT_MENU_SELECT_ALL:
      console.debug('EDIT_MENU_SELECT_ALL', EDIT_MENU_SELECT_ALL);
      SendMessageW(state.handles.editHandle, EM_SETSEL, 0, -1);
      break;

    case EDIT_MENU_TIME_DATE:
      console.debug('EDIT_MENU_TIME_DATE', EDIT_MENU_TIME_DATE);
      break;

    // ============================================================

    case FORMAT_MENU_WORD_WRAP:
      console.debug('FORMAT_MENU_WORD_WRAP', FORMAT_MENU_WORD_WRAP);
      state.isWordWrapEnabled = !state.isWordWrapEnabled;
      // toggleMenuItem(FORMAT_MENU_WORD_WRAP, state.isWordWrapEnabled);
      break;

    case FORMAT_MENU_FONT:
      console.debug('FORMAT_MENU_FONT', FORMAT_MENU_FONT);
      break;

    // ============================================================

    case VIEW_MENU_ZOOM_IN:
      console.debug('VIEW_MENU_ZOOM_IN', VIEW_MENU_ZOOM_IN);

      if (state.zoomLevel >= MAX_ZOOM_LEVEL) {
        break;
      }

      state.zoomLevel += ZOOM_LEVEL_INCREMENT;
      updateZoomLevel();
      break;

    case VIEW_MENU_ZOOM_OUT:
      console.debug('VIEW_MENU_ZOOM_OUT', VIEW_MENU_ZOOM_OUT);

      if (state.zoomLevel <= MIN_ZOOM_LEVEL) {
        break;
      }

      state.zoomLevel -= ZOOM_LEVEL_INCREMENT;
      updateZoomLevel();
      break;

    case VIEW_MENU_RESTORE_DEFAULT_ZOOM:
      console.debug('VIEW_MENU_RESTORE_DEFAULT_ZOOM', VIEW_MENU_RESTORE_DEFAULT_ZOOM);
      state.zoomLevel = DEFAULT_ZOOM_LEVEL;
      updateZoomLevel();
      break;

    case VIEW_MENU_STATUS_BAR:
      console.debug('VIEW_MENU_STATUS_BAR', VIEW_MENU_STATUS_BAR);
      break;

    // ============================================================

    case HELP_MENU_VIEW_HELP:
      console.debug('HELP_MENU_VIEW_HELP', HELP_MENU_VIEW_HELP);
      break;

    case HELP_MENU_SEND_FEEDBACK:
      console.debug('HELP_MENU_SEND_FEEDBACK', HELP_MENU_SEND_FEEDBACK);
      break;

    case HELP_MENU_ABOUT_NOTEPAD:
      console.debug('HELP_MENU_ABOUT_NOTEPAD', HELP_MENU_ABOUT_NOTEPAD);
      break;

    // ============================================================

    case DEBUG_MENU_LIPSUM:
      // SendMessageW(state.handles.editHandle, WM_SETTEXT, 0, wideStringToLongParam(LIPSUM));
      break;
  }
}

function updateZoomLevel() {
  const zoomLevel = new WideStringBuffer(`${state.zoomLevel}%`);

  SendMessageW(state.handles.statusBarHandle, SB_SETTEXTW, STATUS_BAR_ZOOM_LEVEL, zoomLevel.ptr);

  // const fontHandle = CreateFontW(
  //   Math.round(state.font.height * parseFloat((state.zoomLevel / 100).toFixed(2))),
  //   state.font.width,
  //   state.font.escapement,
  //   state.font.orientation,
  //   state.font.weight,
  //   state.font.italic,
  //   state.font.underline,
  //   state.font.strikeOut,
  //   state.font.charSet,
  //   state.font.outPrecision,
  //   state.font.clipPrecision,
  //   state.font.quality,
  //   state.font.pitchAndFamily,
  //   state.font.fontFaceName,
  // );

  // DeleteObject(fontHandle);
  // state.handles.fontHandle = fontHandle;

  // SendMessageW(state.handles.editHandle, WM_SETFONT, state.handles.fontHandle, 1);
}

// function toggleMenuItem(index: number, checked: boolean) {
//   const menuItemInfo = new MenuItemInfoW({
//     fMask: MenuItemInfoMask.STATE,
//     fState: checked ? MenuFlagState.CHECKED : MenuFlagState.UNCHECKED,
//   });

//   SetMenuItemInfoW(state.handles.formatMenuHandle, index, false, menuItemInfo);

//   const rect = new Rect();
//   GetClientRect(state.handles.windowHandle, rect);

//   const text = GetWindowTextW(state.handles.editHandle, 4096);
//   let style = GetWindowLongPtrW(state.handles.editHandle, WindowLongPtrIndex.GWL_STYLE);

//   if (checked) {
//     style &= ~WindowStyle.H_SCROLL;
//   } else {
//     style |= WindowStyle.H_SCROLL;
//   }

//   // TODO: Break this out into a reusable function
//   const editHandle = CreateWindowExW(
//     0,
//     EDIT_CLASS_NAME,
//     null,
//     style,
//     WindowPosition.USE_DEFAULT,
//     WindowPosition.USE_DEFAULT,
//     WindowPosition.USE_DEFAULT,
//     WindowPosition.USE_DEFAULT,
//     mainWindowHandle,
//     EDIT_ID,
//     instanceHandle,
//     0,
//   );

//   SendMessageW(editHandle, WM_SETFONT, state.handles.fontHandle, 1);
//   SetWindowTextW(editHandle, text);
//   MoveWindow(editHandle, 0, 0, rect.right, rect.bottom - 23, 1);

//   DestroyWindow(editHandle);

//   state.handles.editHandle = editHandle;
// }
