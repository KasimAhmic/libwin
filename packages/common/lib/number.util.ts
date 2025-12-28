/**
 * Returns the higher 16 bits of a number.
 *
 * @param value A 32-bit number.
 *
 * @example
 *
 * HIWORD(0x12345678); // 0x1234
 */
export function HIWORD(value: number): number;
export function HIWORD(value: bigint): number;
export function HIWORD(value: number | bigint): number {
  if (typeof value === 'bigint') {
    return Number((value >> 16n) & 0xffffn);
  }

  return (value >>> 16) & 0xffff;
}

/**
 * Returns the lower 16 bits of a number.
 *
 * @param value A 32-bit number.
 *
 * @example
 *
 * LOWORD(0x12345678); // 0x5678
 */
export function LOWORD(value: number): number;
export function LOWORD(value: bigint): number;
export function LOWORD(value: number | bigint): number {
  if (typeof value === 'bigint') {
    return Number(value & 0xffffn);
  }

  return value & 0xffff;
}
