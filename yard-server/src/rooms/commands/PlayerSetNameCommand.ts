import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";
import { maxNameLength } from "../YardConfig";

export class PlayerSetNameCommand extends Command<YardState, {
  client: Client, data: unknown
}> {
  execute({ client, data }: this["payload"]): void {
    if (typeof data !== "string") {
      return;
    }
    const player = this.state.players.get(client.sessionId);
    if (!player) {
      return;
    }
    player.name = data.substr(0, maxNameLength);
  }
}
