import { Command } from "@colyseus/command";
import Ajv from "ajv";
import { Client } from "colyseus";

import { SessionIdPayload } from "@yard/common/playerInterface";

import { Yard } from "../Yard.js";

const validate = new Ajv().compile(SessionIdPayload);

export class ConvertUserCommand extends Command<
  Yard,
  {
    author: Client | undefined;
    sessionId: SessionIdPayload;
    admin: boolean;
  }
> {
  execute({ sessionId, admin }: this["payload"]): void {
    const player = this.state.players.get(sessionId);
    if (player) {
      player.admin = admin;
      this.state.settings.rerunFilters();
    }
  }
  validate({ author, sessionId }: this["payload"]): boolean {
    if (!validate(sessionId)) {
      return false;
    }
    if (author === undefined) return true; // internal server usage
    return this.state.players.get(author.sessionId)?.admin ?? false; // only admins can convert users
  }
}
