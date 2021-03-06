import { Dispatcher } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";
import { PixelMovement } from "./PixelMovement";

export abstract class Game {
  protected readonly state: YardState;

  protected constructor(state: YardState) {
    this.state = state;
  }

  abstract onPlayerJoin(client: Client): void;
  abstract onPlayerLeave(client: Client): void;

  abstract onMessage(type: string | number, client: Client, message: unknown, dispatcher: Dispatcher): void;

  abstract applyGameSettings(): void;

  abstract pixelMovement: PixelMovement;
}
