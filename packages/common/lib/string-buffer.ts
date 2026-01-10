import { TextDecoder } from 'node:util';

import { ptr } from './common';

const STRING_DECODER = new TextDecoder('latin1');
const WIDE_STRING_DECODER = new TextDecoder('utf-16le');

abstract class BaseStringBuffer<T extends Uint8Array | Uint16Array> {
  private readonly data: T;
  private readonly decoder: TextDecoder;

  constructor(data: T, decoder: TextDecoder) {
    this.data = data;
    this.decoder = decoder;
  }

  get length(): number {
    return this.data.length;
  }

  get buffer(): T {
    return this.data;
  }

  get ptr(): bigint {
    return ptr(this.buffer);
  }

  toString(trimAtNull: boolean = true) {
    return trimAtNull
      ? this.decoder.decode(this.data.subarray(0, this.findNullTerminator()))
      : this.decoder.decode(this.data);
  }

  private findNullTerminator(): number {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === 0) {
        return i;
      }
    }

    return this.data.length;
  }
}

export class WideStringBuffer extends BaseStringBuffer<Uint16Array> {
  constructor(sizeOrContent: string | number) {
    if (typeof sizeOrContent === 'number') {
      super(new Uint16Array(sizeOrContent), WIDE_STRING_DECODER);
    } else {
      const bytes = Buffer.from(sizeOrContent, 'utf-16le');
      const data = new Uint16Array(bytes.byteLength / 2 + 1);

      new Uint8Array(data.buffer, data.byteOffset, data.byteLength).set(bytes, 0);

      super(data, WIDE_STRING_DECODER);
    }
  }
}

export class StringBuffer extends BaseStringBuffer<Uint8Array> {
  constructor(sizeOrContent: string | number) {
    if (typeof sizeOrContent === 'number') {
      super(new Uint8Array(sizeOrContent), STRING_DECODER);
    } else {
      const bytes = Buffer.from(sizeOrContent, 'latin1');
      const data = new Uint8Array(bytes.byteLength + 1);

      data.set(bytes, 0);

      super(data, STRING_DECODER);
    }
  }
}
