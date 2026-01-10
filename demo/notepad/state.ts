import type { HFONT, HINSTANCE, HMENU, HWND } from '@libwin/common';
import {
  CLIP_DEFAULT_PRECIS,
  DEFAULT_CHARSET,
  DEFAULT_PITCH,
  DEFAULT_QUALITY,
  FF_SWISS,
  FW_NORMAL,
  OUT_DEFAULT_PRECIS,
} from '@libwin/gdi32';

export type State = {
  isWordWrapEnabled: boolean;
  zoomLevel: number;
  font: {
    height: number;
    width: number;
    escapement: number;
    orientation: number;
    weight: number;
    italic: number;
    underline: number;
    strikeOut: number;
    charSet: number;
    outPrecision: number;
    clipPrecision: number;
    quality: number;
    pitchAndFamily: number;
    fontFaceName: string;
  };
  handles: {
    instanceHandle: HINSTANCE;
    windowHandle: HWND;
    editHandle: HWND;
    statusBarHandle: HWND;
    menuHandle: HMENU;
    fileMenuHandle: HMENU;
    editMenuHandle: HMENU;
    formatMenuHandle: HMENU;
    zoomMenuHandle: HMENU;
    viewMenuHandle: HMENU;
    helpMenuHandle: HMENU;
    debugMenuHandle: HMENU;
    fontHandle: HFONT;
  };
};

export const DEFAULT_ZOOM_LEVEL = 100;
export const MIN_ZOOM_LEVEL = 10;
export const MAX_ZOOM_LEVEL = 500;
export const ZOOM_LEVEL_INCREMENT = 10;

export const state: State = {
  isWordWrapEnabled: false,
  zoomLevel: 100,
  font: {
    height: 18,
    width: 0,
    escapement: 0,
    orientation: 0,
    weight: FW_NORMAL,
    italic: 0,
    underline: 0,
    strikeOut: 0,
    charSet: DEFAULT_CHARSET,
    outPrecision: OUT_DEFAULT_PRECIS,
    clipPrecision: CLIP_DEFAULT_PRECIS,
    quality: DEFAULT_QUALITY,
    pitchAndFamily: DEFAULT_PITCH | FF_SWISS,
    fontFaceName: 'Consolas',
  },
  handles: {
    instanceHandle: 0n,
    windowHandle: 0n,
    editHandle: 0n,
    statusBarHandle: 0n,
    menuHandle: 0n,
    fileMenuHandle: 0n,
    editMenuHandle: 0n,
    formatMenuHandle: 0n,
    zoomMenuHandle: 0n,
    viewMenuHandle: 0n,
    helpMenuHandle: 0n,
    debugMenuHandle: 0n,
    fontHandle: 0n,
  },
};
