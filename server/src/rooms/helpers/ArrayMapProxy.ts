import { MapSchema } from "@colyseus/schema";

export default class ArrayMapProxy<T>
  implements Pick<Array<T>, "length" | "splice" | "indexOf">
{
  private readonly array: T[];
  private readonly map: MapSchema<T>;

  constructor(map: MapSchema<T>) {
    this.map = map;
    this.array = [];
    map.forEach((val, i) => (this.array[Number.parseInt(i, 36)] = val));
  }

  get length(): number {
    return this.array.length;
  }

  splice(start: number, deleteCount?: number, ...items: T[]): T[] {
    if (start > this.array.length) {
      start = this.array.length;
    }
    if (start < 0) {
      start = this.array.length - start;
    }
    if (start < 0) {
      start = 0;
    }

    if (deleteCount === undefined) {
      deleteCount = this.array.length - start;
    }

    const result = this.array.splice(start, deleteCount, ...items);

    const lastUpdateIndex =
      deleteCount !== items.length ? this.array.length : start + deleteCount;
    for (let i = start; i < lastUpdateIndex; i++) {
      this.mapSet(i, this.array[i]);
    }
    if (deleteCount > items.length) {
      // only ever delete backwards
      for (let i = deleteCount - items.length - 1; i >= 0; i--) {
        this.mapDelete(this.array.length + i);
      }
    }
    return result;
  }

  indexOf(searchElement: T, fromIndex?: number): number {
    return this.array.indexOf(searchElement, fromIndex);
  }

  private mapSet(index: number, value: T) {
    this.map.set(Number(index).toString(36), value);
  }

  private mapDelete(index: number) {
    this.map.delete(Number(index).toString(36));
  }
}
