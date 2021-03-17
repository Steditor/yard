import { toDegrees } from "@/yardAPI/controller/math";
import YardAPI from "@/yardAPI/YardAPI";
import { ColorPayload, MovePayload } from "%/pixelInterface";

export class PixelAPI {
  private readonly _api: YardAPI;

  constructor(api: YardAPI) {
    this._api = api;
  }

  public move(pixel: string, angle: number): boolean {
    return this._api.send(
      "move",
      {
        p: pixel,
        a: Math.floor((toDegrees(angle) + 360) % 360 / 3), // transport data is non-negative angle in 1/3 degrees
      } as MovePayload,
    );
  }

  public setColor(pixel: string, color: string): boolean {
    return this._api.send(
      "color",
      {
        p: pixel,
        c: color,
      } as ColorPayload,
    );
  }
}
