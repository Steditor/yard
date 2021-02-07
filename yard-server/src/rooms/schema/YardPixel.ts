import { Schema, type } from "@colyseus/schema";

export class YardPixel extends Schema {
  @type("uint16")
  x = 0;

  @type("uint16")
  y = 0;

  @type("string")
  color = "#000000";

  @type("string")
  player = "";
}
