import { YardState } from "../schema/YardState";
import { YardPixel } from "@/rooms/schema/YardPixel";

export abstract class PixelMovement {
  protected readonly state: YardState;

  protected constructor(state: YardState) {
    this.state = state;
  }

  abstract move(pixelId: string, pixel: YardPixel, angle: number): void;
}
