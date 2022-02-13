import { Command } from "@colyseus/command";
import Ajv from "ajv";
import { Client } from "colyseus";

import { KickPayload } from "@yard/common/playerInterface";
import { YardCloseCodes } from "@yard/common/roomInterface";

import { YardState } from "../schema/YardState.js";

const validate = new Ajv().compile(KickPayload);

export class KickCommand extends Command<
  YardState,
  {
    author: Client | undefined;
    sessionId: KickPayload;
  }
> {
  execute({ sessionId }: this["payload"]): void {
    this.room.clients
      .find((client) => client.sessionId === sessionId)
      ?.leave(YardCloseCodes.KICKED);
  }
  validate({ author, sessionId }: this["payload"]): boolean {
    if (!validate(sessionId)) {
      return false;
    }
    if (author === undefined) return true; // internal server usage
    if (this.state.players.get(sessionId)?.admin) return false; // cannot kick admins
    return this.state.players.get(author.sessionId)?.admin ?? false; // only admins can kick
  }
}
