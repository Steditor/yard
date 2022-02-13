import { Command } from "@colyseus/command";
import Ajv from "ajv";
import { Client } from "colyseus";

import { SetGameSettingsPayload } from "@yard/common/gameInterface";

import { Game } from "../games/Game.js";
import { YardState } from "../schema/YardState.js";

const validate = new Ajv().compile(SetGameSettingsPayload);

export class SetGameSettingsCommand extends Command<
  YardState,
  {
    client: Client;
    settings: SetGameSettingsPayload;
    game: Game;
  }
> {
  execute({ settings, game }: this["payload"]): void {
    Object.assign(this.state.gameSettings, settings);
    game.applyGameSettings();
  }

  validate({ client, settings }: this["payload"] & { settings: any }): boolean {
    if (!validate(settings)) {
      return false;
    }
    return this.state.players.get(client.sessionId)?.admin ?? false; // only admins can configure settings
  }
}
