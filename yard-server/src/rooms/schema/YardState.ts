import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";
import { YardPlayer } from "./YardPlayer";

export class YardState extends Schema {

  @type({ map: YardPlayer })
  players = new MapSchema<YardPlayer>();

  @type([ "string" ])
  orderedPlayers = new ArraySchema<string>();

  createPlayer(id: string) {
    this.players.set(id, new YardPlayer());
    this.orderedPlayers.push(id);
  }

  removePlayer(id: string) {
    this.players.delete(id);
    const index = this.orderedPlayers.indexOf(id);
    if (index !== -1) {
      this.orderedPlayers.splice(index, 1);
    }
  }

  movePlayer(id: string, movement: any) {
    (this.players.get(id))?.move(
        typeof movement.x === "number" ? movement.x : 0,
        typeof movement.y === "number" ? movement.y : 0
    );
  }

  setName(id: string, name: any) {
    if (typeof name === "string") {
      (this.players.get(id) as YardPlayer | null)?.setName(name.substr(0, 20));
    }
  }

  setColor(id: string, val: any) {
    if (typeof val === "string" && /^#[A-Fa-f0-9]{6}$/.test(val)) {
      (this.players.get(id) as YardPlayer | null)?.setColor(val);
    }
  }
}
