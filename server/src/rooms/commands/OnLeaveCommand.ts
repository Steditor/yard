import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { Game } from "../games/Game.js";
import { YardState } from "../schema/YardState.js";

export class OnLeaveCommand extends Command<
  YardState,
  {
    client: Client;
    consented: boolean;
    game: Game;
  }
> {
  async execute({ client, consented, game }: this["payload"]): Promise<void> {
    let timeout = false;
    if (!consented) {
      try {
        await this.room.allowReconnection(client, 10);
      } catch (e) {
        timeout = true;
      }
    }
    if (consented || timeout) {
      game.onPlayerLeave(client);
      this.state.players.delete(client.sessionId);
    }
  }
}
