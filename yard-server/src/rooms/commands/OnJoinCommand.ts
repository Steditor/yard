import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";
import { YardPlayer } from "../schema/YardPlayer";
import { canvasHeight, canvasWidth } from "../YardConfig";
import randomColor from "randomcolor";

export class OnJoinCommand extends Command<YardState, {
  client: Client
}> {
  execute({ client }: this["payload"]): void {
    const player = new YardPlayer();

    player.name = "Unbenannt"; // TODO: set via options
    player.color = randomColor({ luminosity: "dark" });
    player.x = Math.floor(Math.random() * canvasWidth);
    player.y = Math.floor(Math.random() * canvasHeight);

    this.state.players.set(client.sessionId, player);
    this.state.orderedPlayers.push(client.sessionId);
  }
}
