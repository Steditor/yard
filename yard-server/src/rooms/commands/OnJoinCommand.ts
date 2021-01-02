import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";
import { YardPlayer } from "../schema/YardPlayer";
import { PlayerSetNameCommand } from "./PlayerSetNameCommand";

export interface YardJoinOptions {
  name?: string;
}

export class OnJoinCommand extends Command<YardState, {
  client: Client,
  options?: YardJoinOptions,
}> {
  execute({ client, options }: this["payload"]): Array<Command> {
    const player = new YardPlayer();

    player.name = "Unknown";

    this.state.players.set(client.sessionId, player);

    const setName = new PlayerSetNameCommand();
    setName.setPayload({ client, name: options?.name });

    return [ setName ];
  }
}
