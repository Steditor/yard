import { Schema, type, MapSchema } from "@colyseus/schema";

import { YardPixel } from "./YardPixel";
import { YardPlayer } from "./YardPlayer";
import { YardSettings } from "./YardSettings";
import { YardGameSettings } from "./YardGameSettings";

export class YardState extends Schema {
  @type(YardSettings)
  settings = new YardSettings();

  @type(YardGameSettings)
  gameSettings = new YardGameSettings();

  @type({ map: YardPlayer })
  players = new MapSchema<YardPlayer>();

  @type({ map: YardPixel })
  pixels = new MapSchema<YardPixel>();
}
