import { Command } from "@colyseus/command";
import Ajv from "ajv";
import { Client } from "colyseus";

import { SessionIdPayload } from "@yard/common/playerInterface";

import { Yard } from "../Yard.js";
import { Game } from "../games/Game";

const validate = new Ajv().compile(SessionIdPayload);

export class ConvertPlayerCommand extends Command<
  Yard,
  {
    author: Client | undefined;
    sessionId: SessionIdPayload;
    spectator: boolean;
    game: Game;
  }
> {
  execute({ sessionId, spectator, game }: this["payload"]): void {
    const player = this.state.players.get(sessionId);
    if (player) {
      player.spectator = spectator;
      game.ensurePixelCount(sessionId);
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
