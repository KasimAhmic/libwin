export * from './user32';
export * from './colors';
export * from './cursor';
export * from './class-styles';
export * from './window-styles';
export * from './extended-window-styles';
export * from './message-box';
export * from './message';
export * from './edit-styles';
export * from './menu-flags';
export * from './scroll-bar-styles';
export * from './set-window-pos-flags';
export * from './accelerator';

export const CW_USEDEFAULT = 0x80000000;

export type HELPINFO = {
  iContextType: number;
  iCtrlId: number;
  hItemHandle: bigint;
  dwContextId: bigint;
  MousePos: {
    x: number;
    y: number;
  };
};

/**
 * Macro to create a language identifier.
 *
 * @param primaryLanguageId Primary language ID
 * @param subLanguageId Sublanguage ID
 *
 * @returns Language identifier
 */
export function MAKELANGID(primaryLanguageId: number, subLanguageId: number): number {
  return (subLanguageId << 10) | primaryLanguageId;
}
