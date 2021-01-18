import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";

import { SetNamePayload } from "%/playerInterface";
import Ajv from "ajv";

const validate = new Ajv().compile(SetNamePayload);

export class PlayerSetNameCommand extends Command<YardState, {
  client: Client, name: SetNamePayload
}> {
  execute({ client, name }: this["payload"]): void {
    const player = this.state.players.get(client.sessionId);
    if (player) {
      player.name = name.trim().substr(0, this.state.settings.playerNameMaxLength);
    }
  }

  validate({ client, name }: this["payload"] & { name: any }): boolean {
    if (!validate(name)) {
      return false;
    }
    return this.state.players.has(client.sessionId);
  }
}
