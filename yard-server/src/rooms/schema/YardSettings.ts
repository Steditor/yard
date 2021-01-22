import { filter, Schema, type } from "@colyseus/schema";
import { nanoid } from "nanoid";

import { YardState } from "./YardState";

export class YardSettings extends Schema {
  @type("uint16")
  canvasWidth = 800;

  @type("uint16")
  canvasHeight = 600;

  @type("uint8")
  playerNameMaxLength = 20;

  @filter(function(client, value, state: YardState) {
    return state.players.get(client.sessionId)?.admin ?? false;
  })
  @type("string")
  moderationKey = nanoid(15);

  public rerunFilters(): void {
    this._definition.indexesWithFilters.forEach((index) => this.$changes.touch(index));
  }
}
