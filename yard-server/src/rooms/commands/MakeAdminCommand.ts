import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";

import { MakeAdminPayload } from "%/playerInterface";
import Ajv from "ajv";
import { Yard } from "@/rooms/Yard";

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
      return false;
    }
    if (this.state.settings.moderationKey !== key && !(this.room as Yard).consumeInitialModerationKey(key)) {
      return false;
    }
    return this.state.players.has(client.sessionId);
  }
}
