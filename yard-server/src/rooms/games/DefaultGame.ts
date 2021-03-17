import { Client } from "colyseus";
import { nanoid } from "nanoid";

import { Game } from "./Game";
import { YardState } from "../schema/YardState";
import { DefaultPixelMovement } from "../games/DefaultPixelMovement";
import { PixelMovement } from "../games/PixelMovement";
import { randomPixel } from "@/rooms/helpers/pixels";

export class DefaultGame extends Game {
  public readonly pixelMovement: PixelMovement;

  constructor(state: YardState) {
    super(state);
    this.pixelMovement = new DefaultPixelMovement(state);
  }

  onPlayerJoin(client: Client): void {
    this.state.pixels.set(nanoid(9), randomPixel(this.state.settings, client.sessionId));
  }

  onPlayerLeave(client: Client): void {
    Array.from(this.state.pixels.entries())
      .filter(([ , pixel ]) => pixel.player === client.sessionId)
      .forEach(([ key ]) => this.state.pixels.delete(key));
  }
}