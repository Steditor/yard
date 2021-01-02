import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";

export class PlayerSetNameCommand extends Command<YardState, {
  client: Client, name: string
}> {
  execute({ client, name }: this["payload"]): void {
    this.state.players.get(client.sessionId).name =
      name.trim().substr(0, this.state.settings.playerNameMaxLength);
  }

  validate({ client, name }: this["payload"] & { name: any }): boolean {
    if (typeof name !== "string") {
      return false;
    }
    return this.state.players.has(client.sessionId);
  }
}
