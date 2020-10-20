import { Schema, type } from "@colyseus/schema";

import randomColor from "randomcolor";

const canvasWidth = 800;
const canvasHeight = 600;
const maxSpeed = 5;

export class YardPlayer extends Schema {

  @type("string")
  name: string = "Unbenannt";

  @type("string")
  color: string = randomColor({ luminosity: "dark" });

  @type("number")
  x = Math.floor(Math.random() * canvasWidth);

  @type("number")
  y = Math.floor(Math.random() * canvasHeight);

  move(x: number, y: number) {
    this.x = clamp(this.x + clamp(x, -maxSpeed, maxSpeed), 0, canvasWidth);
    this.y = clamp(this.y + clamp(y, -maxSpeed, maxSpeed), 0, canvasHeight);
  }

  setName(name: string) {
    this.name = name;
  }

  setColor(color: string) {
    this.color = color;
  }
}

function clamp(val: number, low: number, high: number): number {
  return Math.min(Math.max(val, low), high);
}
