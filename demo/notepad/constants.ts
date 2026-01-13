import {
  type ACCEL,
  FCONTROL,
  FSHIFT,
  FVIRTKEY,
  VK_0,
  VK_A,
  VK_ADD,
  VK_C,
  VK_DELETE,
  VK_F,
  VK_F3,
  VK_F5,
  VK_G,
  VK_H,
  VK_N,
  VK_NUMPAD0,
  VK_O,
  VK_P,
  VK_S,
  VK_SUBTRACT,
  VK_V,
  VK_X,
  VK_Z,
} from '@libwin/user32';

// Class Names
export const CLASS_NAME = 'LibWinNotepad';

// IDs
export const FILE_MENU_NEW = 1;
export const FILE_MENU_NEW_WINDOW = 2;
export const FILE_MENU_OPEN = 3;
export const FILE_MENU_SAVE = 4;
export const FILE_MENU_SAVE_AS = 5;
export const FILE_MENU_PAGE_SETUP = 6;
export const FILE_MENU_PRINT = 7;
export const FILE_MENU_EXIT = 8;

export const EDIT_MENU_UNDO = 9;
export const EDIT_MENU_CUT = 10;
export const EDIT_MENU_COPY = 11;
export const EDIT_MENU_PASTE = 12;
export const EDIT_MENU_DELETE = 13;
export const EDIT_MENU_FIND = 14;
export const EDIT_MENU_FIND_NEXT = 15;
export const EDIT_MENU_FIND_PREVIOUS = 16;
export const EDIT_MENU_REPLACE = 17;
export const EDIT_MENU_GO_TO = 18;
export const EDIT_MENU_SELECT_ALL = 19;
export const EDIT_MENU_TIME_DATE = 20;

export const FORMAT_MENU_WORD_WRAP = 21;
export const FORMAT_MENU_FONT = 22;

export const VIEW_MENU_ZOOM_IN = 23;
export const VIEW_MENU_ZOOM_OUT = 24;
export const VIEW_MENU_RESTORE_DEFAULT_ZOOM = 25;
export const VIEW_MENU_STATUS_BAR = 26;

export const HELP_MENU_VIEW_HELP = 27;
export const HELP_MENU_SEND_FEEDBACK = 28;
export const HELP_MENU_ABOUT_NOTEPAD = 29;

export const DEBUG_MENU_LIPSUM = 500;

export const EDIT_ID = 30;

// Status Bar Parts
export const STATUS_BAR_EMPTY = 0;
export const STATUS_BAR_LINE_COL = 1;
export const STATUS_BAR_ZOOM_LEVEL = 2;
export const STATUS_BAR_LINE_ENDING = 3;
export const STATUS_BAR_ENCODING = 4;

// Sizes
export const WINDOW_WIDTH = 800;
export const WINDOW_HEIGHT = 600;
export const STATUS_BAR_PART_SIZES: number[] = [140, 50, 120, 130];

// Misc
export const MAX_EDIT_LENGTH = 1024n * 1024n * 1024n;

export const ACCELERATORS: ACCEL[] = [
  // File
  { fVirt: FVIRTKEY | FCONTROL, key: VK_N, cmd: FILE_MENU_NEW },
  { fVirt: FVIRTKEY | FCONTROL | FSHIFT, key: VK_N, cmd: FILE_MENU_NEW_WINDOW },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_O, cmd: FILE_MENU_OPEN },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_S, cmd: FILE_MENU_SAVE },
  { fVirt: FVIRTKEY | FCONTROL | FSHIFT, key: VK_S, cmd: FILE_MENU_SAVE_AS },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_P, cmd: FILE_MENU_PRINT },

  // Edit
  { fVirt: FVIRTKEY | FCONTROL, key: VK_Z, cmd: EDIT_MENU_UNDO },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_X, cmd: EDIT_MENU_CUT },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_C, cmd: EDIT_MENU_COPY },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_V, cmd: EDIT_MENU_PASTE },
  { fVirt: FVIRTKEY, key: VK_DELETE, cmd: EDIT_MENU_DELETE },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_F, cmd: EDIT_MENU_FIND },
  { fVirt: FVIRTKEY, key: VK_F3, cmd: EDIT_MENU_FIND_NEXT },
  { fVirt: FVIRTKEY | FSHIFT, key: VK_F3, cmd: EDIT_MENU_FIND_PREVIOUS },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_H, cmd: EDIT_MENU_REPLACE },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_G, cmd: EDIT_MENU_GO_TO },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_A, cmd: EDIT_MENU_SELECT_ALL },
  { fVirt: FVIRTKEY, key: VK_F5, cmd: EDIT_MENU_TIME_DATE },

  // View
  { fVirt: FVIRTKEY | FCONTROL, key: VK_ADD, cmd: VIEW_MENU_ZOOM_IN },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_SUBTRACT, cmd: VIEW_MENU_ZOOM_OUT },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_0, cmd: VIEW_MENU_RESTORE_DEFAULT_ZOOM },
  { fVirt: FVIRTKEY | FCONTROL, key: VK_NUMPAD0, cmd: VIEW_MENU_RESTORE_DEFAULT_ZOOM },
];
