import { Schema, type } from "@colyseus/schema";

export class YardGameSettings extends Schema {
  @type("uint8")
  minPixelPerPerson = 1;

  @type("boolean")
  rope = false;

  @type("boolean")
  hideSelf = false;
}
