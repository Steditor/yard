import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { Yard } from "../Yard.js";
import { DefaultGame } from "../games/DefaultGame.js";

export class ShuffleRopeCommand extends Command<
  Yard,
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
