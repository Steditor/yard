import { Schema } from "@colyseus/schema";

export type SchemaProperties<T extends Schema> = Omit<T, keyof Schema>;
