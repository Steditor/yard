import { SchemaProperties } from "%/schema/helpers";
import { MapSchema, Schema } from "@colyseus/schema";

export function watchObject<T extends Schema>(target: SchemaProperties<T>, source: T): void {
  Object.assign(target, source);
  source.onChange = (changes) => {
    changes.forEach((change) => {
      target[change.field as keyof SchemaProperties<T>] = change.value;
    });
  };
}

export function watchMap<T extends Schema, W>(
  target: Map<string, W>,
  Wrapper: new (item: T) => W,
  source: MapSchema<T>,
): void {
  source.onAdd = (item, key) => {
    target.set(key, new Wrapper(item));
  };
  source.onChange = source.onAdd;
  source.onRemove = (item, key) => {
    target.delete(key);
  };
}
