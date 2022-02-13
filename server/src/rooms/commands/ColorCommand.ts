import { Command } from "@colyseus/command";
import Ajv from "ajv";
import { Client } from "colyseus";

import { ColorPayload } from "@yard/common/pixelInterface";

import { YardPixel } from "../schema/YardPixel.js";
import { YardState } from "../schema/YardState.js";

const validate = new Ajv().compile(ColorPayload);

export class ColorCommand extends Command<
  YardState,
  {
    client: Client;
    data: ColorPayload;
  }
> {
  private pixel!: YardPixel;

  execute({ data }: this["payload"]): void {
    this.pixel.color = data.c;
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
