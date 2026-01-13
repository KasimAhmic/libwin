/** The ALT key must be held down when the accelerator key is pressed. */
export const FALT = 0x10;
/** The CTRL key must be held down when the accelerator key is pressed. */
export const FCONTROL = 0x08;
/** No top-level menu item is highlighted when the accelerator is used. If this flag is not specified, a top-level menu item will be highlighted, if possible, when the accelerator is used. This attribute is obsolete and retained only for backward compatibility with resource files designed for 16-bit Windows. */
export const FNOINVERT = 0x02;
/** The SHIFT key must be held down when the accelerator key is pressed. */
export const FSHIFT = 0x04;
/** The key member specifies a virtual-key code. If this flag is not specified, key is assumed to specify a character code. */
export const FVIRTKEY = 0x01;

/** Left mouse button */
export const VK_LBUTTON = 0x01;
/** Right mouse button */
export const VK_RBUTTON = 0x02;
/** Control-break processing */
export const VK_CANCEL = 0x03;
/** Middle mouse button */
export const VK_MBUTTON = 0x04;
/** X1 mouse button */
export const VK_XBUTTON1 = 0x05;
/** X2 mouse button */
export const VK_XBUTTON2 = 0x06;
/** Backspace key */
export const VK_BACK = 0x08;
/** Tab key */
export const VK_TAB = 0x09;
/** Clear key */
export const VK_CLEAR = 0x0c;
/** Enter key */
export const VK_RETURN = 0x0d;
/** Shift key */
export const VK_SHIFT = 0x10;
/** Ctrl key */
export const VK_CONTROL = 0x11;
/** Alt key */
export const VK_MENU = 0x12;
/** Pause key */
export const VK_PAUSE = 0x13;
/** Caps lock key */
export const VK_CAPITAL = 0x14;
/** IME Kana mode */
export const VK_KANA = 0x15;
/** IME Hangul mode */
export const VK_HANGUL = 0x15;
/** IME On */
export const VK_IME_ON = 0x16;
/** IME Junja mode */
export const VK_JUNJA = 0x17;
/** IME final mode */
export const VK_FINAL = 0x18;
/** IME Hanja mode */
export const VK_HANJA = 0x19;
/** IME Kanji mode */
export const VK_KANJI = 0x19;
/** IME Off */
export const VK_IME_OFF = 0x1a;
/** Esc key */
export const VK_ESCAPE = 0x1b;
/** IME convert */
export const VK_CONVERT = 0x1c;
/** IME nonconvert */
export const VK_NONCONVERT = 0x1d;
/** IME accept */
export const VK_ACCEPT = 0x1e;
/** IME mode change request */
export const VK_MODECHANGE = 0x1f;
/** Spacebar key */
export const VK_SPACE = 0x20;
/** Page up key */
export const VK_PRIOR = 0x21;
/** Page down key */
export const VK_NEXT = 0x22;
/** End key */
export const VK_END = 0x23;
/** Home key */
export const VK_HOME = 0x24;
/** Left arrow key */
export const VK_LEFT = 0x25;
/** Up arrow key */
export const VK_UP = 0x26;
/** Right arrow key */
export const VK_RIGHT = 0x27;
/** Down arrow key */
export const VK_DOWN = 0x28;
/** Select key */
export const VK_SELECT = 0x29;
/** Print key */
export const VK_PRINT = 0x2a;
/** Execute key */
export const VK_EXECUTE = 0x2b;
/** Print screen key */
export const VK_SNAPSHOT = 0x2c;
/** Insert key */
export const VK_INSERT = 0x2d;
/** Delete key */
export const VK_DELETE = 0x2e;
/** Help key */
export const VK_HELP = 0x2f;
/** 0 key */
export const VK_0 = 0x30;
/** 1 key */
export const VK_1 = 0x31;
/** 2 key */
export const VK_2 = 0x32;
/** 3 key */
export const VK_3 = 0x33;
/** 4 key */
export const VK_4 = 0x34;
/** 5 key */
export const VK_5 = 0x35;
/** 6 key */
export const VK_6 = 0x36;
/** 7 key */
export const VK_7 = 0x37;
/** 8 key */
export const VK_8 = 0x38;
/** 9 key */
export const VK_9 = 0x39;
/** A key */
export const VK_A = 0x41;
/** B key */
export const VK_B = 0x42;
/** C key */
export const VK_C = 0x43;
/** D key */
export const VK_D = 0x44;
/** E key */
export const VK_E = 0x45;
/** F key */
export const VK_F = 0x46;
/** G key */
export const VK_G = 0x47;
/** H key */
export const VK_H = 0x48;
/** I key */
export const VK_I = 0x49;
/** J key */
export const VK_J = 0x4a;
/** K key */
export const VK_K = 0x4b;
/** L key */
export const VK_L = 0x4c;
/** M key */
export const VK_M = 0x4d;
/** N key */
export const VK_N = 0x4e;
/** O key */
export const VK_O = 0x4f;
/** P key */
export const VK_P = 0x50;
/** Q key */
export const VK_Q = 0x51;
/** R key */
export const VK_R = 0x52;
/** S key */
export const VK_S = 0x53;
/** T key */
export const VK_T = 0x54;
/** U key */
export const VK_U = 0x55;
/** V key */
export const VK_V = 0x56;
/** W key */
export const VK_W = 0x57;
/** X key */
export const VK_X = 0x58;
/** Y key */
export const VK_Y = 0x59;
/** Z key */
export const VK_Z = 0x5a;
/** Left Windows logo key */
export const VK_LWIN = 0x5b;
/** Right Windows logo key */
export const VK_RWIN = 0x5c;
/** Application key */
export const VK_APPS = 0x5d;
/** Computer Sleep key */
export const VK_SLEEP = 0x5f;
/** Numeric keypad 0 key */
export const VK_NUMPAD0 = 0x60;
/** Numeric keypad 1 key */
export const VK_NUMPAD1 = 0x61;
/** Numeric keypad 2 key */
export const VK_NUMPAD2 = 0x62;
/** Numeric keypad 3 key */
export const VK_NUMPAD3 = 0x63;
/** Numeric keypad 4 key */
export const VK_NUMPAD4 = 0x64;
/** Numeric keypad 5 key */
export const VK_NUMPAD5 = 0x65;
/** Numeric keypad 6 key */
export const VK_NUMPAD6 = 0x66;
/** Numeric keypad 7 key */
export const VK_NUMPAD7 = 0x67;
/** Numeric keypad 8 key */
export const VK_NUMPAD8 = 0x68;
/** Numeric keypad 9 key */
export const VK_NUMPAD9 = 0x69;
/** Multiply key */
export const VK_MULTIPLY = 0x6a;
/** Add key */
export const VK_ADD = 0x6b;
/** Separator key */
export const VK_SEPARATOR = 0x6c;
/** Subtract key */
export const VK_SUBTRACT = 0x6d;
/** Decimal key */
export const VK_DECIMAL = 0x6e;
/** Divide key */
export const VK_DIVIDE = 0x6f;
/** F1 key */
export const VK_F1 = 0x70;
/** F2 key */
export const VK_F2 = 0x71;
/** F3 key */
export const VK_F3 = 0x72;
/** F4 key */
export const VK_F4 = 0x73;
/** F5 key */
export const VK_F5 = 0x74;
/** F6 key */
export const VK_F6 = 0x75;
/** F7 key */
export const VK_F7 = 0x76;
/** F8 key */
export const VK_F8 = 0x77;
/** F9 key */
export const VK_F9 = 0x78;
/** F10 key */
export const VK_F10 = 0x79;
/** F11 key */
export const VK_F11 = 0x7a;
/** F12 key */
export const VK_F12 = 0x7b;
/** F13 key */
export const VK_F13 = 0x7c;
/** F14 key */
export const VK_F14 = 0x7d;
/** F15 key */
export const VK_F15 = 0x7e;
/** F16 key */
export const VK_F16 = 0x7f;
/** F17 key */
export const VK_F17 = 0x80;
/** F18 key */
export const VK_F18 = 0x81;
/** F19 key */
export const VK_F19 = 0x82;
/** F20 key */
export const VK_F20 = 0x83;
/** F21 key */
export const VK_F21 = 0x84;
/** F22 key */
export const VK_F22 = 0x85;
/** F23 key */
export const VK_F23 = 0x86;
/** F24 key */
export const VK_F24 = 0x87;
/** Num lock key */
export const VK_NUMLOCK = 0x90;
/** Scroll lock key */
export const VK_SCROLL = 0x91;
/** Left Shift key */
export const VK_LSHIFT = 0xa0;
/** Right Shift key */
export const VK_RSHIFT = 0xa1;
/** Left Ctrl key */
export const VK_LCONTROL = 0xa2;
/** Right Ctrl key */
export const VK_RCONTROL = 0xa3;
/** Left Alt key */
export const VK_LMENU = 0xa4;
/** Right Alt key */
export const VK_RMENU = 0xa5;
/** Browser Back key */
export const VK_BROWSER_BACK = 0xa6;
/** Browser Forward key */
export const VK_BROWSER_FORWARD = 0xa7;
/** Browser Refresh key */
export const VK_BROWSER_REFRESH = 0xa8;
/** Browser Stop key */
export const VK_BROWSER_STOP = 0xa9;
/** Browser Search key */
export const VK_BROWSER_SEARCH = 0xaa;
/** Browser Favorites key */
export const VK_BROWSER_FAVORITES = 0xab;
/** Browser Start and Home key */
export const VK_BROWSER_HOME = 0xac;
/** Volume Mute key */
export const VK_VOLUME_MUTE = 0xad;
/** Volume Down key */
export const VK_VOLUME_DOWN = 0xae;
/** Volume Up key */
export const VK_VOLUME_UP = 0xaf;
/** Next Track key */
export const VK_MEDIA_NEXT_TRACK = 0xb0;
/** Previous Track key */
export const VK_MEDIA_PREV_TRACK = 0xb1;
/** Stop Media key */
export const VK_MEDIA_STOP = 0xb2;
/** Play/Pause Media key */
export const VK_MEDIA_PLAY_PAUSE = 0xb3;
/** Start Mail key */
export const VK_LAUNCH_MAIL = 0xb4;
/** Select Media key */
export const VK_LAUNCH_MEDIA_SELECT = 0xb5;
/** Start Application 1 key */
export const VK_LAUNCH_APP1 = 0xb6;
/** Start Application 2 key */
export const VK_LAUNCH_APP2 = 0xb7;
/** It can vary by keyboard. For the US ANSI keyboard , the Semiсolon and Colon key */
export const VK_OEM_1 = 0xba;
/** For any country/region, the Equals and Plus key */
export const VK_OEM_PLUS = 0xbb;
/** For any country/region, the Comma and Less Than key */
export const VK_OEM_COMMA = 0xbc;
/** For any country/region, the Dash and Underscore key */
export const VK_OEM_MINUS = 0xbd;
/** For any country/region, the Period and Greater Than key */
export const VK_OEM_PERIOD = 0xbe;
/** It can vary by keyboard. For the US ANSI keyboard, the Forward Slash and Question Mark key */
export const VK_OEM_2 = 0xbf;
/** It can vary by keyboard. For the US ANSI keyboard, the Grave Accent and Tilde key */
export const VK_OEM_3 = 0xc0;
/** Gamepad A button */
export const VK_GAMEPAD_A = 0xc3;
/** Gamepad B button */
export const VK_GAMEPAD_B = 0xc4;
/** Gamepad X button */
export const VK_GAMEPAD_X = 0xc5;
/** Gamepad Y button */
export const VK_GAMEPAD_Y = 0xc6;
/** Gamepad Right Shoulder button */
export const VK_GAMEPAD_RIGHT_SHOULDER = 0xc7;
/** Gamepad Left Shoulder button */
export const VK_GAMEPAD_LEFT_SHOULDER = 0xc8;
/** Gamepad Left Trigger button */
export const VK_GAMEPAD_LEFT_TRIGGER = 0xc9;
/** Gamepad Right Trigger button */
export const VK_GAMEPAD_RIGHT_TRIGGER = 0xca;
/** Gamepad D-pad Up button */
export const VK_GAMEPAD_DPAD_UP = 0xcb;
/** Gamepad D-pad Down button */
export const VK_GAMEPAD_DPAD_DOWN = 0xcc;
/** Gamepad D-pad Left button */
export const VK_GAMEPAD_DPAD_LEFT = 0xcd;
/** Gamepad D-pad Right button */
export const VK_GAMEPAD_DPAD_RIGHT = 0xce;
/** Gamepad Menu/Start button */
export const VK_GAMEPAD_MENU = 0xcf;
/** Gamepad View/Back button */
export const VK_GAMEPAD_VIEW = 0xd0;
/** Gamepad Left Thumbstick button */
export const VK_GAMEPAD_LEFT_THUMBSTICK_BUTTON = 0xd1;
/** Gamepad Right Thumbstick button */
export const VK_GAMEPAD_RIGHT_THUMBSTICK_BUTTON = 0xd2;
/** Gamepad Left Thumbstick up */
export const VK_GAMEPAD_LEFT_THUMBSTICK_UP = 0xd3;
/** Gamepad Left Thumbstick down */
export const VK_GAMEPAD_LEFT_THUMBSTICK_DOWN = 0xd4;
/** Gamepad Left Thumbstick right */
export const VK_GAMEPAD_LEFT_THUMBSTICK_RIGHT = 0xd5;
/** Gamepad Left Thumbstick left */
export const VK_GAMEPAD_LEFT_THUMBSTICK_LEFT = 0xd6;
/** Gamepad Right Thumbstick up */
export const VK_GAMEPAD_RIGHT_THUMBSTICK_UP = 0xd7;
/** Gamepad Right Thumbstick down */
export const VK_GAMEPAD_RIGHT_THUMBSTICK_DOWN = 0xd8;
/** Gamepad Right Thumbstick right */
export const VK_GAMEPAD_RIGHT_THUMBSTICK_RIGHT = 0xd9;
/** Gamepad Right Thumbstick left */
export const VK_GAMEPAD_RIGHT_THUMBSTICK_LEFT = 0xda;
/** It can vary by keyboard. For the US ANSI keyboard, the Left Brace key */
export const VK_OEM_4 = 0xdb;
/** It can vary by keyboard. For the US ANSI keyboard, the Backslash and Pipe key */
export const VK_OEM_5 = 0xdc;
/** It can vary by keyboard. For the US ANSI keyboard, the Right Brace key */
export const VK_OEM_6 = 0xdd;
/** It can vary by keyboard. For the US ANSI keyboard, the Apostrophe and Double Quotation Mark key */
export const VK_OEM_7 = 0xde;
/** It can vary by keyboard. For the Canadian CSA keyboard, the Right Ctrl key */
export const VK_OEM_8 = 0xdf;
/** It can vary by keyboard. For the European ISO keyboard, the Backslash and Pipe key */
export const VK_OEM_102 = 0xe2;
/** IME PROCESS key */
export const VK_PROCESSKEY = 0xe5;
/** Used to pass Unicode characters as if they were keystrokes. The VK_PACKET key is the low word of a 32-bit Virtual Key value used for non-keyboard input methods. For more information, see Remark in KEYBDINPUT, SendInput, WM_KEYDOWN, and WM_KEYUP */
export const VK_PACKET = 0xe7;
/** Attn key */
export const VK_ATTN = 0xf6;
/** CrSel key */
export const VK_CRSEL = 0xf7;
/** ExSel key */
export const VK_EXSEL = 0xf8;
/** Erase EOF key */
export const VK_EREOF = 0xf9;
/** Play key */
export const VK_PLAY = 0xfa;
/** Zoom key */
export const VK_ZOOM = 0xfb;
/** Reserved */
export const VK_NONAME = 0xfc;
/** PA1 key */
export const VK_PA1 = 0xfd;
/** Clear key */
export const VK_OEM_CLEAR = 0xfe;

export type ACCEL = {
  fVirt: AcceleratorBehavior | number;
  key: VirtualKey;
  cmd: number;
};

type AcceleratorBehavior = typeof FALT | typeof FCONTROL | typeof FNOINVERT | typeof FSHIFT | typeof FVIRTKEY;

type VirtualKey =
  | typeof VK_LBUTTON
  | typeof VK_RBUTTON
  | typeof VK_CANCEL
  | typeof VK_MBUTTON
  | typeof VK_XBUTTON1
  | typeof VK_XBUTTON2
  | typeof VK_BACK
  | typeof VK_TAB
  | typeof VK_CLEAR
  | typeof VK_RETURN
  | typeof VK_SHIFT
  | typeof VK_CONTROL
  | typeof VK_MENU
  | typeof VK_PAUSE
  | typeof VK_CAPITAL
  | typeof VK_KANA
  | typeof VK_HANGUL
  | typeof VK_IME_ON
  | typeof VK_JUNJA
  | typeof VK_FINAL
  | typeof VK_HANJA
  | typeof VK_KANJI
  | typeof VK_IME_OFF
  | typeof VK_ESCAPE
  | typeof VK_CONVERT
  | typeof VK_NONCONVERT
  | typeof VK_ACCEPT
  | typeof VK_MODECHANGE
  | typeof VK_SPACE
  | typeof VK_PRIOR
  | typeof VK_NEXT
  | typeof VK_END
  | typeof VK_HOME
  | typeof VK_LEFT
  | typeof VK_UP
  | typeof VK_RIGHT
  | typeof VK_DOWN
  | typeof VK_SELECT
  | typeof VK_PRINT
  | typeof VK_EXECUTE
  | typeof VK_SNAPSHOT
  | typeof VK_INSERT
  | typeof VK_DELETE
  | typeof VK_HELP
  | typeof VK_0
  | typeof VK_1
  | typeof VK_2
  | typeof VK_3
  | typeof VK_4
  | typeof VK_5
  | typeof VK_6
  | typeof VK_7
  | typeof VK_8
  | typeof VK_9
  | typeof VK_A
  | typeof VK_B
  | typeof VK_C
  | typeof VK_D
  | typeof VK_E
  | typeof VK_F
  | typeof VK_G
  | typeof VK_H
  | typeof VK_I
  | typeof VK_J
  | typeof VK_K
  | typeof VK_L
  | typeof VK_M
  | typeof VK_N
  | typeof VK_O
  | typeof VK_P
  | typeof VK_Q
  | typeof VK_R
  | typeof VK_S
  | typeof VK_T
  | typeof VK_U
  | typeof VK_V
  | typeof VK_W
  | typeof VK_X
  | typeof VK_Y
  | typeof VK_Z
  | typeof VK_LWIN
  | typeof VK_RWIN
  | typeof VK_APPS
  | typeof VK_SLEEP
  | typeof VK_NUMPAD0
  | typeof VK_NUMPAD1
  | typeof VK_NUMPAD2
  | typeof VK_NUMPAD3
  | typeof VK_NUMPAD4
  | typeof VK_NUMPAD5
  | typeof VK_NUMPAD6
  | typeof VK_NUMPAD7
  | typeof VK_NUMPAD8
  | typeof VK_NUMPAD9
  | typeof VK_MULTIPLY
  | typeof VK_ADD
  | typeof VK_SEPARATOR
  | typeof VK_SUBTRACT
  | typeof VK_DECIMAL
  | typeof VK_DIVIDE
  | typeof VK_F1
  | typeof VK_F2
  | typeof VK_F3
  | typeof VK_F4
  | typeof VK_F5
  | typeof VK_F6
  | typeof VK_F7
  | typeof VK_F8
  | typeof VK_F9
  | typeof VK_F10
  | typeof VK_F11
  | typeof VK_F12
  | typeof VK_F13
  | typeof VK_F14
  | typeof VK_F15
  | typeof VK_F16
  | typeof VK_F17
  | typeof VK_F18
  | typeof VK_F19
  | typeof VK_F20
  | typeof VK_F21
  | typeof VK_F22
  | typeof VK_F23
  | typeof VK_F24
  | typeof VK_NUMLOCK
  | typeof VK_SCROLL
  | typeof VK_LSHIFT
  | typeof VK_RSHIFT
  | typeof VK_LCONTROL
  | typeof VK_RCONTROL
  | typeof VK_LMENU
  | typeof VK_RMENU
  | typeof VK_BROWSER_BACK
  | typeof VK_BROWSER_FORWARD
  | typeof VK_BROWSER_REFRESH
  | typeof VK_BROWSER_STOP
  | typeof VK_BROWSER_SEARCH
  | typeof VK_BROWSER_FAVORITES
  | typeof VK_BROWSER_HOME
  | typeof VK_VOLUME_MUTE
  | typeof VK_VOLUME_DOWN
  | typeof VK_VOLUME_UP
  | typeof VK_MEDIA_NEXT_TRACK
  | typeof VK_MEDIA_PREV_TRACK
  | typeof VK_MEDIA_STOP
  | typeof VK_MEDIA_PLAY_PAUSE
  | typeof VK_LAUNCH_MAIL
  | typeof VK_LAUNCH_MEDIA_SELECT
  | typeof VK_LAUNCH_APP1
  | typeof VK_LAUNCH_APP2
  | typeof VK_OEM_1
  | typeof VK_OEM_PLUS
  | typeof VK_OEM_COMMA
  | typeof VK_OEM_MINUS
  | typeof VK_OEM_PERIOD
  | typeof VK_OEM_2
  | typeof VK_OEM_3
  | typeof VK_GAMEPAD_A
  | typeof VK_GAMEPAD_B
  | typeof VK_GAMEPAD_X
  | typeof VK_GAMEPAD_Y
  | typeof VK_GAMEPAD_RIGHT_SHOULDER
  | typeof VK_GAMEPAD_LEFT_SHOULDER
  | typeof VK_GAMEPAD_LEFT_TRIGGER
  | typeof VK_GAMEPAD_RIGHT_TRIGGER
  | typeof VK_GAMEPAD_DPAD_UP
  | typeof VK_GAMEPAD_DPAD_DOWN
  | typeof VK_GAMEPAD_DPAD_LEFT
  | typeof VK_GAMEPAD_DPAD_RIGHT
  | typeof VK_GAMEPAD_MENU
  | typeof VK_GAMEPAD_VIEW
  | typeof VK_GAMEPAD_LEFT_THUMBSTICK_BUTTON
  | typeof VK_GAMEPAD_RIGHT_THUMBSTICK_BUTTON
  | typeof VK_GAMEPAD_LEFT_THUMBSTICK_UP
  | typeof VK_GAMEPAD_LEFT_THUMBSTICK_DOWN
  | typeof VK_GAMEPAD_LEFT_THUMBSTICK_RIGHT
  | typeof VK_GAMEPAD_LEFT_THUMBSTICK_LEFT
  | typeof VK_GAMEPAD_RIGHT_THUMBSTICK_UP
  | typeof VK_GAMEPAD_RIGHT_THUMBSTICK_DOWN
  | typeof VK_GAMEPAD_RIGHT_THUMBSTICK_RIGHT
  | typeof VK_GAMEPAD_RIGHT_THUMBSTICK_LEFT
  | typeof VK_OEM_4
  | typeof VK_OEM_5
  | typeof VK_OEM_6
  | typeof VK_OEM_7
  | typeof VK_OEM_8
  | typeof VK_OEM_102
  | typeof VK_PROCESSKEY
  | typeof VK_PACKET
  | typeof VK_ATTN
  | typeof VK_CRSEL
  | typeof VK_EXSEL
  | typeof VK_EREOF
  | typeof VK_PLAY
  | typeof VK_ZOOM
  | typeof VK_NONAME
  | typeof VK_PA1
  | typeof VK_OEM_CLEAR;
