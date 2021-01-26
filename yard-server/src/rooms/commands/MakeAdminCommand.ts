import { Command } from "@colyseus/command";
import { Client, Room } from "colyseus";

import { YardState } from "../schema/YardState";
import { Yard } from "../Yard";
import { sendToast } from "../helpers";

import { MakeAdminPayload } from "%/playerInterface";
import Ajv from "ajv";

const validate = new Ajv().compile(MakeAdminPayload);

export class MakeAdminCommand extends Command<YardState, {
  client: Client, key: MakeAdminPayload
}> {
  execute({ client }: this["payload"]): void {
    const player = this.state.players.get(client.sessionId);
    if (player) {
      player.admin = true;
      this.state.settings.rerunFilters();
    }
  }

  validate({ client, key }: this["payload"] & { key: any }): boolean {
    if (!validate(key)) {
      sendKeyError(this.room as Yard, client);
      return false;
    }
    if (this.state.settings.moderationKey !== key && !(this.room as Yard).consumeInitialModerationKey(key)) {
      return false;
    }
    return this.state.players.has(client.sessionId);
  }
}

function sendKeyError(room: Room, client: Client) {
  sendToast(client, {
    severity: "error",
    summary: "Wrong key",
    detail: "The given moderation key is invalid.",
    life: 2000,
  });
}
