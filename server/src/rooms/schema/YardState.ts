import { MapSchema, Schema, type } from "@colyseus/schema";

import { YardGameData } from "./YardGameData.js";
import { YardGameSettings } from "./YardGameSettings.js";
import { YardPixel } from "./YardPixel.js";
import { YardPlayer } from "./YardPlayer.js";
import { YardSettings } from "./YardSettings.js";

export class YardState extends Schema {
  @type(YardSettings)
  settings = new YardSettings();

  @type(YardGameSettings)
  gameSettings = new YardGameSettings();

  @type({ map: YardPlayer })
  players = new MapSchema<YardPlayer>();

  @type({ map: YardPixel })
  pixels = new MapSchema<YardPixel>();

  @type(YardGameData)
  gameData = new YardGameData();
}
