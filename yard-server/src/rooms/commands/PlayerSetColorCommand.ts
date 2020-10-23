import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";

export class PlayerSetColorCommand extends Command<YardState, {
  client: Client, data: unknown
}> {
  execute({ client, data }: this["payload"]): void {
    if (typeof data !== "string" || !/^#[A-Fa-f0-9]{6}$/.test(data)) {
      return;
    }
    const player = this.state.players.get(client.sessionId);
    if (!player) {
      return;
    }
    player.color = data;
  }
}
