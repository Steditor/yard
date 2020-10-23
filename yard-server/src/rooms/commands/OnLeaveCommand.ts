import { Command } from "@colyseus/command";
import { YardState } from "../schema/YardState";
import { Client } from "colyseus";

export class OnLeaveCommand extends Command<YardState, {
  client: Client, consented: boolean
}> {
  async execute({ client, consented }: this["payload"]): Promise<void> {
    let timeout = false;
    if (!consented) {
      try {
        await this.room.allowReconnection(client, 10);
      } catch (e) {
        timeout = true;
      }
    }
    if (consented || timeout) {
      this.state.players.delete(client.sessionId);
      const index = this.state.orderedPlayers.indexOf(client.sessionId);

      if (index !== -1) {
        this.state.orderedPlayers.splice(index, 1);
      }
    }
  }
}
