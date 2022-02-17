import { Command } from "@colyseus/command";
import Ajv from "ajv";
import { Client, Room } from "colyseus";

import { BecomeAdminPayload } from "@yard/common/playerInterface";

import { Yard } from "../Yard.js";
import { sendToast } from "../helpers/messages.js";

const validate = new Ajv().compile(BecomeAdminPayload);

export class BecomeAdminCommand extends Command<
  Yard,
  {
    client: Client;
    key: BecomeAdminPayload;
  }
> {
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
    if (
      this.state.settings.moderationKey !== key &&
      !(this.room as Yard).consumeInitialModerationKey(key)
    ) {
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
