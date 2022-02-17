import { Command } from "@colyseus/command";
import Ajv from "ajv";
import { Client } from "colyseus";

import { SetNamePayload } from "@yard/common/playerInterface";

import { Yard } from "../Yard.js";

const validate = new Ajv().compile(SetNamePayload);

export class PlayerSetNameCommand extends Command<
  Yard,
  {
    client: Client;
    name: SetNamePayload;
  }
> {
  execute({ client, name }: this["payload"]): void {
    const player = this.state.players.get(client.sessionId);
    if (player) {
      player.name = name
        .trim()
        .substr(0, this.state.settings.playerNameMaxLength);
    }
  }

  validate({ client, name }: this["payload"] & { name: any }): boolean {
    if (!validate(name)) {
      return false;
    }
    return this.state.players.has(client.sessionId);
  }
}
