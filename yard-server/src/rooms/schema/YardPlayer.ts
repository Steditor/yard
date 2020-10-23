import { Schema, type } from "@colyseus/schema";

export class YardPlayer extends Schema {
  @type("string")
  name = "";

  @type("string")
  color = "#000000";

  @type("number")
  x = 0;

  @type("number")
  y = 0;
}
