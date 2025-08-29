const numberFormatter = new Intl.NumberFormat('en-US', { style: 'decimal', useGrouping: true });

const yellow = '\x1b[33m';
const boldGreen = '\x1b[1;32m';
const boldRed = '\x1b[1;31m';
const reset = '\x1b[0m';

const NUMBERS = [
  0x0000000000000001n,
  0x0000000000000002n,
  0x0000000000000004n,
  0x0000000000000008n,
  0x0000000000000010n,
  0x0000000000000020n,
  0x0000000000000040n,
  0x0000000000000080n,
  0x0000000000000100n,
  0x0000000000000200n,
  0x0000000000000400n,
  0x0000000000000800n,
  0x0000000000001000n,
  0x0000000000002000n,
  0x0000000000004000n,
  0x0000000000008000n,
  0x0000000000010000n,
  0x0000000000020000n,
  0x0000000000040000n,
  0x0000000000080000n,
  0x0000000000100000n,
  0x0000000000200000n,
  0x0000000000400000n,
  0x0000000000800000n,
  0x0000000001000000n,
  0x0000000002000000n,
  0x0000000004000000n,
  0x0000000008000000n,
  0x0000000010000000n,
  0x0000000020000000n,
  0x0000000040000000n,
  0x0000000080000000n,
  0x0000000100000000n,
  0x0000000200000000n,
  0x0000000400000000n,
  0x0000000800000000n,
  0x0000001000000000n,
  0x0000002000000000n,
  0x0000004000000000n,
  0x0000008000000000n,
  0x0000010000000000n,
  0x0000020000000000n,
  0x0000040000000000n,
  0x0000080000000000n,
  0x0000100000000000n,
  0x0000200000000000n,
  0x0000400000000000n,
  0x0000800000000000n,
  0x0001000000000000n,
  0x0002000000000000n,
  0x0004000000000000n,
  0x0008000000000000n,
  0x0010000000000000n,
  0x0020000000000000n,
  0x0040000000000000n,
  0x0080000000000000n,
  0x0100000000000000n,
  0x0200000000000000n,
  0x0400000000000000n,
  0x0800000000000000n,
  0x1000000000000000n,
  0x2000000000000000n,
  0x4000000000000000n,
  0x8000000000000000n,
];

function decimalToHex(decimal: bigint | number) {
  return decimal
    .toString(16)
    .toLowerCase()
    .padStart(typeof decimal === 'bigint' ? 16 : 8, '0')
    .replace(/.{2}/g, '$& ')
    .replace(/[1-9A-Fa-f]/g, boldRed + '$&' + reset)
    .trimEnd();
}

function decimalToBinary(decimal: bigint | number) {
  return decimal
    .toString(2)
    .padStart(typeof decimal === 'bigint' ? 64 : 32, '0')
    .match(/.{4}/g)!
    .join(' ')
    .replace(/1/g, boldRed + '1' + reset);
}

/**
 * Prints a chart of numbers in decimal, hexadecimal, and binary format.
 *
 * @example
 *             1 | 00 00 00 01  | 0000 0000 0000 0000 0000 0000 0000 0001
 *             2 | 00 00 00 02  | 0000 0000 0000 0000 0000 0000 0000 0010
 *             4 | 00 00 00 04  | 0000 0000 0000 0000 0000 0000 0000 0100
 *             8 | 00 00 00 08  | 0000 0000 0000 0000 0000 0000 0000 1000
 *            16 | 00 00 00 10  | 0000 0000 0000 0000 0000 0000 0001 0000
 *            32 | 00 00 00 20  | 0000 0000 0000 0000 0000 0000 0010 0000
 *            64 | 00 00 00 40  | 0000 0000 0000 0000 0000 0000 0100 0000
 *           128 | 00 00 00 80  | 0000 0000 0000 0000 0000 0000 1000 0000
 *           256 | 00 00 01 00  | 0000 0000 0000 0000 0000 0001 0000 0000
 *           512 | 00 00 02 00  | 0000 0000 0000 0000 0000 0010 0000 0000
 *         1,024 | 00 00 04 00  | 0000 0000 0000 0000 0000 0100 0000 0000
 *         2,048 | 00 00 08 00  | 0000 0000 0000 0000 0000 1000 0000 0000
 *         4,096 | 00 00 10 00  | 0000 0000 0000 0000 0001 0000 0000 0000
 *         8,192 | 00 00 20 00  | 0000 0000 0000 0000 0010 0000 0000 0000
 *        16,384 | 00 00 40 00  | 0000 0000 0000 0000 0100 0000 0000 0000
 *        32,768 | 00 00 80 00  | 0000 0000 0000 0000 1000 0000 0000 0000
 *        65,536 | 00 01 00 00  | 0000 0000 0000 0001 0000 0000 0000 0000
 *       131,072 | 00 02 00 00  | 0000 0000 0000 0010 0000 0000 0000 0000
 *       262,144 | 00 04 00 00  | 0000 0000 0000 0100 0000 0000 0000 0000
 *       524,288 | 00 08 00 00  | 0000 0000 0000 1000 0000 0000 0000 0000
 *     1,048,576 | 00 10 00 00  | 0000 0000 0001 0000 0000 0000 0000 0000
 *     2,097,152 | 00 20 00 00  | 0000 0000 0010 0000 0000 0000 0000 0000
 *     4,194,304 | 00 40 00 00  | 0000 0000 0100 0000 0000 0000 0000 0000
 *     8,388,608 | 00 80 00 00  | 0000 0000 1000 0000 0000 0000 0000 0000
 *    16,777,216 | 01 00 00 00  | 0000 0001 0000 0000 0000 0000 0000 0000
 *    33,554,432 | 02 00 00 00  | 0000 0010 0000 0000 0000 0000 0000 0000
 *    67,108,864 | 04 00 00 00  | 0000 0100 0000 0000 0000 0000 0000 0000
 *   134,217,728 | 08 00 00 00  | 0000 1000 0000 0000 0000 0000 0000 0000
 *   268,435,456 | 10 00 00 00  | 0001 0000 0000 0000 0000 0000 0000 0000
 *   536,870,912 | 20 00 00 00  | 0010 0000 0000 0000 0000 0000 0000 0000
 * 1,073,741,824 | 40 00 00 00  | 0100 0000 0000 0000 0000 0000 0000 0000
 * 2,147,483,648 | 80 00 00 00  | 1000 0000 0000 0000 0000 0000 0000 0000
 */
function printChart() {
  for (const number of NUMBERS) {
    const decimal = numberFormatter.format(number).padStart(21, ' ');
    const hex = decimalToHex(number);
    const binary = decimalToBinary(number);

    console.log(`${boldGreen}${decimal}${reset} | ${hex} | ${binary}`);
  }
}

/**
 * Deconstructs a number into its individual flags.
 *
 * @param number
 */
function deconstructOredNumber<T extends number | bigint>(number: T) {
  const decimal = numberFormatter.format(number);
  const hex = decimalToHex(number);
  const binary = decimalToBinary(number);

  const constituantFlags = new Set<T>();

  const zero = typeof number === 'bigint' ? 0n : 0;
  const numbers = typeof number === 'bigint' ? (NUMBERS as T[]) : (NUMBERS.map((n) => Number(n & 0xffffffn)) as T[]);

  for (const flag of numbers) {
    if ((number & flag) !== zero) {
      constituantFlags.add(flag);
    }
  }

  for (const flag of constituantFlags) {
    const constituantDecimal = numberFormatter.format(flag).padStart(decimal.length, ' ');
    const constituantHex = decimalToHex(flag);
    const constituantBinary = decimalToBinary(flag);

    // Constituent
    console.log(`${yellow}${constituantDecimal}${reset} | ${constituantHex} | ${constituantBinary}`);
  }

  // Total
  console.log(`${boldGreen}${decimal.padStart(decimal.length)}${reset} | ${hex} | ${binary}`);

  // OR sequence
  const orSequence = Array.from(constituantFlags)
    .map((flag) => '0x' + decimalToHex(flag).replaceAll(' ', ''))
    .join(' | ');

  console.log('\nSequence => ' + orSequence);
}

deconstructOredNumber(0xffffffffffffffffn);
