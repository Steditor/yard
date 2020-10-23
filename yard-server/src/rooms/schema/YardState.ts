import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";
import { YardPlayer } from "./YardPlayer";

export class YardState extends Schema {

  @type({ map: YardPlayer })
  players = new MapSchema<YardPlayer>();

  @type([ "string" ])
  orderedPlayers = new ArraySchema<string>();

  createPlayer(id: string): void {
    this.players.set(id, new YardPlayer());
    this.orderedPlayers.push(id);
  }

  removePlayer(id: string): void {
    this.players.delete(id);
    const index = this.orderedPlayers.indexOf(id);
    if (index !== -1) {
      this.orderedPlayers.splice(index, 1);
    }
  }

  movePlayer(id: string, movement: unknown): void {
    if (hasMovementData(movement)) {
      (this.players.get(id))?.move(
        typeof movement.x === "number" ? movement.x : 0,
        typeof movement.y === "number" ? movement.y : 0,
      );
    }
  }

  setName(id: string, name: unknown): void {
    if (typeof name === "string") {
      (this.players.get(id) as YardPlayer | null)?.setName(name.substr(0, 20));
    }
  }

  setColor(id: string, val: unknown): void {
    if (typeof val === "string" && /^#[A-Fa-f0-9]{6}$/.test(val)) {
      (this.players.get(id) as YardPlayer | null)?.setColor(val);
    }
  }
}

function hasMovementData(data: any): data is { x: unknown, y: unknown } {
  return "x" in data && "y" in data;
}
