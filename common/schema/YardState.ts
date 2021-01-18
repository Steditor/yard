//
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
//
// GENERATED USING @colyseus/schema 1.0.9
//

import { Schema, type, ArraySchema, MapSchema, DataChange } from "@colyseus/schema";
import { YardPlayer } from "./YardPlayer"
import { YardSettings } from "./YardSettings"

export class YardState extends Schema {
    @type({ map: YardPlayer }) public players: MapSchema<YardPlayer> = new MapSchema<YardPlayer>();
    @type(YardSettings) public settings: YardSettings = new YardSettings();
}
