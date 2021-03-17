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
    for (let i = 0; i < this.state.gameSettings.minPixelPerPerson; i++) {
      this.addPixelFor(client.sessionId);
    }
  }

  onPlayerLeave(client: Client): void {
    Array.from(this.state.pixels.entries())
      .filter(([ , pixel ]) => pixel.player === client.sessionId)
      .forEach(([ key ]) => this.state.pixels.delete(key));
  }

  applyGameSettings(): void {
    this.state.players.forEach((_,id) => this.ensurePixelCount(id));
  }

  private addPixelFor(playerId: string) {
    this.state.pixels.set(nanoid(9), randomPixel(this.state.settings, playerId));
  }

  private ensurePixelCount(playerId: string): void {
    const current = Array.from(this.state.pixels.entries())
      .filter(([ , pixel ]) => pixel.player === playerId);

    // todo: maxPixelPerPerson
    current.forEach(([ key ], index) => {
      if (index >= this.state.gameSettings.minPixelPerPerson) {
        this.state.pixels.delete(key);
      }
    });

    for (let i = current.length; i < this.state.gameSettings.minPixelPerPerson; i++) {
      this.addPixelFor(playerId);
    }
  }
}
