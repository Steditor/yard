import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";
import { YardPixel } from "../schema/YardPixel";
import { Game } from "../games/Game";
import { toRadians } from "../helpers/math";

import { MovePayload } from "%/pixelInterface";
import Ajv from "ajv";

const validate = new Ajv().compile(MovePayload);

export class MoveCommand extends Command<YardState, {
  client: Client,
  data: MovePayload,
  game: Game,
}> {
  private pixel!: YardPixel;

  execute({ data, game }: this["payload"]): void {
    game.pixelMovement.move(
      data.p,
      this.pixel,
      toRadians(data.a * 3), // transport data is angle in 1/3 degrees
    );
  }
  validate({ client, data }: this["payload"] & { data: unknown }): boolean {
    if (!validate(data)) {
      return false;
    }
    const pixel = this.state.pixels.get(data.p);
    if (!pixel) {
      return false;
    }
    this.pixel = pixel;
    return this.pixel.player === client.sessionId;
  }
}
