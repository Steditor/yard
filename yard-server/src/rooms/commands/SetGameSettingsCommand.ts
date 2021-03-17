import { Game } from "@/rooms/games/Game";
import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { YardState } from "../schema/YardState";

import { SetGameSettingsPayload } from "%/gameInterface";
import Ajv from "ajv";

const validate = new Ajv().compile(SetGameSettingsPayload);

export class SetGameSettingsCommand extends Command<YardState, {
  client: Client, settings: SetGameSettingsPayload, game: Game
}> {
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
