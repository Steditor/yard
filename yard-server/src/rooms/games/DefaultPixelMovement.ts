import { YardPixel } from "../schema/YardPixel";
import { PixelMovement } from "./PixelMovement";
import { YardState } from "../schema/YardState";
import { clamp } from "@/rooms/helpers/math";

const minPause = 1000 / 60; // at most 60 moves per second
const maxPause = 1000 / 10; // after 100ms without movement the pixel speed is reset to 1
const maxSpeed = 10; // at most 10 pixels per frame = 300 pixel per second
const acceleration = 1.07; // accelerate with 7% per frame

export class DefaultPixelMovement extends PixelMovement {
  private lastMoves: Map<string, number> = new Map();
  private currentSpeeds: Map<string, number> = new Map();

  constructor(state: YardState) {
    super(state);
  }

  move(pixelId: string, pixel: YardPixel, angle: number): void {
    const pause = Date.now() - (this.lastMoves.get(pixelId) ?? Date.now() - maxPause);

    if (pause < minPause) {
      return;
    }

    let speed = this.currentSpeeds.get(pixelId) ?? 1;
    if (pause > maxPause) {
      speed = 1;
    } else {
      speed = Math.min(speed * acceleration, maxSpeed);
    }

    pixel.x = clamp(pixel.x + Math.cos(angle) * speed, 0, this.state.settings.canvasWidth);
    pixel.y = clamp(pixel.y - Math.sin(angle) * speed, 0, this.state.settings.canvasHeight);

    this.currentSpeeds.set(pixelId, speed);
    this.lastMoves.set(pixelId, Date.now());
  }
}

