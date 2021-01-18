import { Schema, type } from "@colyseus/schema";

export class YardPlayer extends Schema {
  @type("string")
  name = "";

  @type("boolean")
  admin = false;
}
