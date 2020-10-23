import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";
import { YardPlayer } from "./YardPlayer";

export class YardState extends Schema {
  @type({ map: YardPlayer })
  players = new MapSchema<YardPlayer>();

  @type([ "string" ])
  orderedPlayers = new ArraySchema<string>();
}
