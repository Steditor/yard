//
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
//
// GENERATED USING @colyseus/schema 1.0.1
//

import { Schema, type, ArraySchema, MapSchema, DataChange } from "@colyseus/schema";
import { YardPlayer } from "./YardPlayer"

export class YardState extends Schema {
    @type({ map: YardPlayer }) public players: MapSchema<YardPlayer> = new MapSchema<YardPlayer>();
    @type([ "string" ]) public orderedPlayers: ArraySchema<string> = new ArraySchema<string>();
}
