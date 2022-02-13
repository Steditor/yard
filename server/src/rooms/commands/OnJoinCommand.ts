import { Command } from "@colyseus/command";
import Ajv from "ajv";
import { Client } from "colyseus";

import { YardRoomJoinOptions } from "@yard/common/roomInterface";

import { Game } from "../games/Game.js";
import { YardPlayer } from "../schema/YardPlayer.js";
import { YardState } from "../schema/YardState.js";
import { MakeAdminCommand } from "./MakeAdminCommand.js";
import { PlayerSetNameCommand } from "./PlayerSetNameCommand.js";

const validate = new Ajv().compile(YardRoomJoinOptions);

export class OnJoinCommand extends Command<
  YardState,
  {
    client: Client;
    options?: YardRoomJoinOptions;
    game: Game;
  }
> {
  execute({ client, options, game }: this["payload"]): Array<Command> {
    const player = new YardPlayer();

    player.name = "Unknown";

    this.state.players.set(client.sessionId, player);
    game.onPlayerJoin(client);

    const commands = [] as Array<Command>;
    if (options?.username) {
      const setName = new PlayerSetNameCommand();
      setName.setPayload({ client, name: options.username });
      commands.push(setName);
    }
    if (options?.initialModerationKey) {
      const makeAdmin = new MakeAdminCommand();
      makeAdmin.setPayload({ client, key: options.initialModerationKey });
      commands.push(makeAdmin);
    }
    return commands;
  }
  validate({ options }: this["payload"] & { options: unknown }): boolean {
    return validate(options);
  }
}
