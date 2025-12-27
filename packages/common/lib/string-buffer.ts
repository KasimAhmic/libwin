const STRING_DECODER = new TextDecoder('latin1');
const WIDE_STRING_DECODER = new TextDecoder('utf-16le');

export class WideStringBuffer {
  private readonly data: Uint16Array;

  constructor(size: number) {
    this.data = new Uint16Array(size);
  }

  get length(): number {
    return this.data.length;
  }

  get buffer(): Uint16Array {
    return this.data;
  }

  toString(trimTrailingNullTerminators: boolean = true) {
    const text = WIDE_STRING_DECODER.decode(this.data);

    return trimTrailingNullTerminators ? text.replace(/\0+$/, '') : text;
  }
}

export class StringBuffer {
  private readonly data: Uint8Array;

  constructor(size: number) {
    this.data = new Uint8Array(size);
  }

  get length(): number {
    return this.data.length;
  }

  get buffer(): Uint8Array {
    return this.data;
  }

  toString(trimTrailingNullTerminators: boolean = true) {
    const text = STRING_DECODER.decode(this.data);

    return trimTrailingNullTerminators ? text.replace(/\0+$/, '') : text;
  }
}
