import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";
import { YardPlayer } from "../schema/YardPlayer";
import { PlayerSetNameCommand } from "./PlayerSetNameCommand";

import { YardRoomJoinOptions } from "%/roomInterface";
import Ajv from "ajv";

const validate = new Ajv().compile<YardRoomJoinOptions>(YardRoomJoinOptions);

export class OnJoinCommand extends Command<YardState, {
  client: Client,
  options?: YardRoomJoinOptions,
}> {
  execute({ client, options }: this["payload"]): Array<Command> {
    const player = new YardPlayer();

    player.name = "Unknown";

    this.state.players.set(client.sessionId, player);

    const setName = new PlayerSetNameCommand();
    setName.setPayload({ client, name: options?.name as any });

    return [ setName ];
  }
  validate({ options }: this["payload"] & { options: unknown }): boolean {
    return validate(options);
  }
}
