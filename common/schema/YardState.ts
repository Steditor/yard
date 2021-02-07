// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.10
// 

import { Schema, type, ArraySchema, MapSchema, DataChange } from "@colyseus/schema";
import { YardSettings } from "./YardSettings"
import { YardPlayer } from "./YardPlayer"
import { YardPixel } from "./YardPixel"

export class YardState extends Schema {
    @type(YardSettings) public settings: YardSettings = new YardSettings();
    @type({ map: YardPlayer }) public players: MapSchema<YardPlayer> = new MapSchema<YardPlayer>();
    @type({ map: YardPixel }) public pixels: MapSchema<YardPixel> = new MapSchema<YardPixel>();
}
