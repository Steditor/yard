// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.16
// 

import { Schema, type, ArraySchema, MapSchema, DataChange } from '@colyseus/schema';


export class YardGameData extends Schema {
    @type({ map: "string" }) public orderedPixels: MapSchema<string> = new MapSchema<string>();
}
