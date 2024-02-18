import { uuidv7 } from 'uuidv7';

export class Uuid {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? uuidv7();
  }

  toString() {
    return this.value;
  }
}
