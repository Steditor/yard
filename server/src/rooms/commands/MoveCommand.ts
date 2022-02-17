import { Command } from "@colyseus/command";
import Ajv from "ajv";
import { Client } from "colyseus";

import { MovePayload } from "@yard/common/pixelInterface";

import { Yard } from "../Yard.js";
import { Game } from "../games/Game.js";
import { toRadians } from "../helpers/math.js";
import { YardPixel } from "../schema/YardPixel.js";

const validate = new Ajv().compile(MovePayload);

export class MoveCommand extends Command<
  Yard,
  {
    client: Client;
    data: MovePayload;
    game: Game;
  }
> {
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
