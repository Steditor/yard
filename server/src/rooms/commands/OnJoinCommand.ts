import { Command } from "@colyseus/command";
import Ajv from "ajv";
import { Client } from "colyseus";

import { YardRoomJoinOptions } from "@yard/common/roomInterface";

import { Yard } from "../Yard.js";
import { Game } from "../games/Game.js";
import { YardPlayer } from "../schema/YardPlayer.js";
import { BecomeAdminCommand } from "./BecomeAdminCommand.js";
import { PlayerSetNameCommand } from "./PlayerSetNameCommand.js";

const validate = new Ajv().compile(YardRoomJoinOptions);

export class OnJoinCommand extends Command<
  Yard,
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
      const becomeAdmin = new BecomeAdminCommand();
      becomeAdmin.setPayload({ client, key: options.initialModerationKey });
      commands.push(becomeAdmin);
    }
    return commands;
  }
  validate({ options }: this["payload"] & { options: unknown }): boolean {
    return validate(options);
  }
}
