// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.16
// 

import { Schema, type, ArraySchema, MapSchema, DataChange } from '@colyseus/schema';
import { YardSettings } from './YardSettings'
import { YardGameSettings } from './YardGameSettings'
import { YardPlayer } from './YardPlayer'
import { YardPixel } from './YardPixel'
import { YardGameData } from './YardGameData'

export class YardState extends Schema {
    @type(YardSettings) public settings: YardSettings = new YardSettings();
    @type(YardGameSettings) public gameSettings: YardGameSettings = new YardGameSettings();
    @type({ map: YardPlayer }) public players: MapSchema<YardPlayer> = new MapSchema<YardPlayer>();
    @type({ map: YardPixel }) public pixels: MapSchema<YardPixel> = new MapSchema<YardPixel>();
    @type(YardGameData) public gameData: YardGameData = new YardGameData();
}
