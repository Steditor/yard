import { Dispatcher } from "@colyseus/command";
import { Client } from "colyseus";

import { Yard } from "../Yard.js";
import { YardState } from "../schema/YardState.js";
import { PixelMovement } from "./PixelMovement.js";

export abstract class Game {
  protected readonly state: YardState;

  protected constructor(state: YardState) {
    this.state = state;
  }

  abstract onPlayerJoin(client: Client): void;
  abstract onPlayerLeave(client: Client): void;

  abstract onMessage(
    type: string | number,
    client: Client,
    message: unknown,
    dispatcher: Dispatcher<Yard>,
  ): void;

  abstract applyGameSettings(): void;
  abstract ensurePixelCount(playerId: string): void;

  abstract pixelMovement: PixelMovement;
}
