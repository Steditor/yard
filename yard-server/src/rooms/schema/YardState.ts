import { Schema, type, MapSchema } from "@colyseus/schema";
import { YardPlayer } from "./YardPlayer";

export class YardState extends Schema {

  @type({ map: YardPlayer })
  players = new MapSchema<YardPlayer>();

  createPlayer(id: string) {
    this.players[id] = new YardPlayer();
  }

  removePlayer(id: string) {
    delete this.players[id];
  }

  movePlayer(id: string, movement: any) {
    (this.players[id] as YardPlayer | null)?.move(
        typeof movement.x === "number" ? movement.x : 0,
        typeof movement.y === "number" ? movement.y : 0
    );
  }

  setName(id: string, name: any) {
    if (typeof name === "string") {
      (this.players[id] as YardPlayer | null)?.setName(name);
    }
  }
}
