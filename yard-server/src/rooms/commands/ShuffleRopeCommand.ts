import { DefaultGame } from "@/rooms/games/DefaultGame";
import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";

export class ShuffleRopeCommand extends Command<YardState, {
  client: Client,
  game: DefaultGame,
}> {
  async execute({ game }: this["payload"]): Promise<boolean> {
    game.shuffleRope();
    return true;
  }
  validate({ client }: this["payload"]): boolean {
    return this.state.players.get(client.sessionId)?.admin ?? false; // only admins can shuffle the rope
  }
}
