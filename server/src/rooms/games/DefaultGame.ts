import { Dispatcher } from "@colyseus/command";
import { Client } from "colyseus";
import shuffle from "lodash-es/shuffle.js";
import { nanoid } from "nanoid";

import { Yard } from "../Yard";
import { ShuffleRopeCommand } from "../commands/ShuffleRopeCommand.js";
import ArrayMapProxy from "../helpers/ArrayMapProxy.js";
import { randomPixel } from "../helpers/pixels.js";
import { YardState } from "../schema/YardState.js";
import { DefaultPixelMovement } from "./DefaultPixelMovement.js";
import { Game } from "./Game.js";
import { PixelMovement } from "./PixelMovement.js";

export class DefaultGame extends Game {
  public readonly pixelMovement: PixelMovement;

  private orderedPixelProxy: ArrayMapProxy<string> | null = null;

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
      .filter(([, pixel]) => pixel.player === client.sessionId)
      .forEach(([key]) => this.removePixel(key));
  }

  applyGameSettings(): void {
    this.state.players.forEach((_, id) => this.ensurePixelCount(id));

    if (this.state.gameSettings.rope && !this.orderedPixelProxy) {
      this.state.gameData.orderedPixels.clear();
      this.orderedPixelProxy = new ArrayMapProxy(
        this.state.gameData.orderedPixels,
      );
      const pixels = shuffle(Array.from(this.state.pixels.keys()));
      this.orderedPixelProxy.splice(0, 0, ...pixels);
    }
  }

  ensurePixelCount(playerId: string): void {
    const player = this.state.players.get(playerId);
    if (!player) return;
    const current = Array.from(this.state.pixels.entries()).filter(
      ([, pixel]) => pixel.player === playerId,
    );

    const min = player.spectator
      ? 0
      : this.state.gameSettings.minPixelPerPerson;
    const max = min; // todo: maxPixelPerPerson
    current.forEach(([key], index) => {
      if (index >= max) {
        this.removePixel(key);
      }
    });

    for (let i = current.length; i < min; i++) {
      this.addPixelFor(playerId);
    }
  }

  onMessage(
    type: string | number,
    client: Client,
    message: unknown,
    dispatcher: Dispatcher<Yard>,
  ): void {
    if (type === "shuffleRope") {
      dispatcher.dispatch(new ShuffleRopeCommand(), { client, game: this });
    }
  }

  shuffleRope(): void {
    if (this.orderedPixelProxy) {
      const pixels = shuffle(Array.from(this.state.pixels.keys()));
      this.orderedPixelProxy.splice(0, undefined, ...pixels);
    }
  }

  private addPixelFor(playerId: string) {
    const id = nanoid(9);
    this.state.pixels.set(id, randomPixel(this.state.settings, playerId));

    if (this.orderedPixelProxy) {
      const pos = Math.floor(Math.random() * this.orderedPixelProxy.length);
      this.orderedPixelProxy.splice(pos, 0, id);
    }
  }

  private removePixel(pixelId: string) {
    this.state.pixels.delete(pixelId);

    if (this.orderedPixelProxy) {
      const index = this.orderedPixelProxy.indexOf(pixelId);
      if (index !== -1) {
        this.orderedPixelProxy.splice(index, 1);
      }
    }
  }
}
