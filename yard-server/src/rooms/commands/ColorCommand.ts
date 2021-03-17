import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";
import { YardPixel } from "../schema/YardPixel";

import { ColorPayload } from "%/pixelInterface";
import Ajv from "ajv";

const validate = new Ajv().compile(ColorPayload);

export class ColorCommand extends Command<YardState, {
  client: Client,
  data: ColorPayload,
}> {
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
