import randomColor from "randomcolor";

import { YardPixel } from "@/rooms/schema/YardPixel";
import { YardSettings } from "@/rooms/schema/YardSettings";

export function randomPixel(settings: YardSettings, player: string): YardPixel {
  const pixel = new YardPixel();
  pixel.player = player;
  pixel.color = randomColor({ luminosity: "dark" });
  pixel.x = Math.floor(Math.random() * settings.canvasWidth);
  pixel.y = Math.floor(Math.random() * settings.canvasHeight);
  return pixel;
}
