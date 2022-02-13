import { YardPixel } from "../schema/YardPixel.js";
import { YardState } from "../schema/YardState.js";

export abstract class PixelMovement {
  protected readonly state: YardState;

  protected constructor(state: YardState) {
    this.state = state;
  }

  abstract move(pixelId: string, pixel: YardPixel, angle: number): void;
}
