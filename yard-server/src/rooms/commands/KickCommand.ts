import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";
import { YardCloseCodes } from "%/roomInterface";

import { KickPayload } from "%/playerInterface";
import Ajv from "ajv";

const validate = new Ajv().compile(KickPayload);

export class KickCommand extends Command<YardState, {
  author: Client | undefined,
  sessionId: KickPayload,
}> {
  async execute({ sessionId }: this["payload"]): Promise<boolean> {
    this.room.clients.find((client) => client.sessionId === sessionId)?.leave(YardCloseCodes.KICKED);
    return true;
  }
  validate({ author, sessionId }: this["payload"]): boolean {
    if (!validate(sessionId)) {
      return false;
    }
    if(author === undefined) return true; // internal server usage
    if (this.state.players.get(sessionId)?.admin) return false; // cannot kick admins
    return this.state.players.get(author.sessionId)?.admin ?? false; // only admins can kick
  }
}
