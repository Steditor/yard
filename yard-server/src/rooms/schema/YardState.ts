import { Schema, type, MapSchema } from "@colyseus/schema";
import { YardPlayer } from "./YardPlayer";
import { YardSettings } from "./YardSettings";

export class YardState extends Schema {
  @type({ map: YardPlayer })
  players = new MapSchema<YardPlayer>();

  @type(YardSettings)
  settings = new YardSettings();
}
