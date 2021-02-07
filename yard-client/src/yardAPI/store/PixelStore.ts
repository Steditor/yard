import { YardPixel } from "%/schema/YardPixel";

import { SchemaProperties, watchObject } from "@/yardAPI/store/helpers";

import { reactive } from "vue";

export default class PixelStore implements SchemaProperties<YardPixel> {
  private readonly _properties = reactive<SchemaProperties<YardPixel>>({
    x: 0,
    y: 0,
    color: "#000000",
    player: "",
  });

  constructor(pixel: YardPixel) {
    watchObject(this._properties, pixel);
  }

  get x(): number {
    return this._properties.x;
  }

  get y(): number {
    return this._properties.y;
  }

  get color(): string {
    return this._properties.color;
  }

  get player(): string {
    return this._properties.player;
  }
}
