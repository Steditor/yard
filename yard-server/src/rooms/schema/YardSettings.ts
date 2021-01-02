import { Schema, type } from "@colyseus/schema";

export class YardSettings extends Schema {
  @type("uint16")
  canvasWidth = 800;

  @type("uint16")
  canvasHeight = 600;

  @type("uint8")
  playerNameMaxLength = 20;
}
