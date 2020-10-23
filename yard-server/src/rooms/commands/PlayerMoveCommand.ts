import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";
import { canvasHeight, canvasWidth, maxSpeed } from "../YardConfig";

export class PlayerMoveCommand extends Command<YardState, {
  client: Client, data: unknown
}> {
  execute({ client, data }: this["payload"]): void {
    if (!hasMovementData(data)) {
      return;
    }
    const player = this.state.players.get(client.sessionId);
    if (!player) {
      return;
    }

    player.x = clampedUpdate(player.x, data.x, 0, canvasWidth);
    player.y = clampedUpdate(player.y, data.y, 0, canvasHeight);
  }
}

function hasMovementData(data: any): data is { x?: unknown, y?: unknown } {
  return "x" in data || "y" in data;
}

function clampedUpdate(current: number, delta: unknown, low: number, high: number): number {
  return clamp(current + clamp(numberOr(delta, 0), -maxSpeed, maxSpeed), low, high);
}

function numberOr(value: unknown, fallback: number): number {
  return typeof value === "number" ? value : fallback;
}

function clamp(val: number, low: number, high: number): number {
  return Math.min(Math.max(val, low), high);
}
