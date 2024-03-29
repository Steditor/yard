// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.34
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';


export class YardSettings extends Schema {
    @type("uint16") public canvasWidth!: number;
    @type("uint16") public canvasHeight!: number;
    @type("string") public backgroundCode!: string;
    @type("uint8") public pixelSize!: number;
    @type("uint8") public playerNameMaxLength!: number;
    @type("string") public moderationKey!: string;
}
