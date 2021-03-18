import { MapSchema, Schema, type } from "@colyseus/schema";

export class YardGameData extends Schema {
  @type({ map: "string" })
  orderedPixels = new MapSchema<string>();
}
