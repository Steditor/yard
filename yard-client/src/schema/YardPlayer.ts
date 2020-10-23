// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 0.5.41
// 

import { Schema, type, ArraySchema, MapSchema, DataChange } from "@colyseus/schema";


export class YardPlayer extends Schema {
    @type("string") public name: string;
    @type("string") public color: string;
    @type("number") public x: number;
    @type("number") public y: number;
}
