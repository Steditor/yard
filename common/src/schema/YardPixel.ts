// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.34
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';


export class YardPixel extends Schema {
    @type("uint16") public x!: number;
    @type("uint16") public y!: number;
    @type("string") public color!: string;
    @type("string") public player!: string;
}
