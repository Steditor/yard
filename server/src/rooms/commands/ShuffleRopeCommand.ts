import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { DefaultGame } from "../games/DefaultGame.js";
import { YardState } from "../schema/YardState.js";

export class ShuffleRopeCommand extends Command<
  YardState,
  {
    client: Client;
    game: DefaultGame;
  }
> {
  execute({ game }: this["payload"]): void {
    game.shuffleRope();
  }
  validate({ client }: this["payload"]): boolean {
    return this.state.players.get(client.sessionId)?.admin ?? false; // only admins can shuffle the rope
  }
}
