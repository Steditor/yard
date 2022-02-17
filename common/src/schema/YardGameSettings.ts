// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.33
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';


export class YardGameSettings extends Schema {
    @type("uint8") public minPixelPerPerson!: number;
    @type("boolean") public rope!: boolean;
    @type("boolean") public hideSelf!: boolean;
}
