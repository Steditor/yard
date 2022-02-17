import { Command } from "@colyseus/command";
import Ajv from "ajv";
import { Client } from "colyseus";

import { SetSettingsPayload } from "@yard/common/roomInterface";

import { Yard } from "../Yard.js";
import { clampPixelPosition } from "../games/DefaultPixelMovement.js";

const validate = new Ajv().compile(SetSettingsPayload);

export class SetSettingsCommand extends Command<
  Yard,
  {
    client: Client;
    settings: SetSettingsPayload;
  }
> {
  execute({ settings }: this["payload"]): void {
    Object.assign(this.state.settings, settings);

    // move all pixels inside canvas area
    this.state.pixels.forEach((pixel) =>
      clampPixelPosition(pixel, this.state.settings),
    );

    // shorten too long player names
    this.state.players.forEach(
      (player) =>
        (player.name = player.name.substring(0, settings.playerNameMaxLength)),
    );
  }

  validate({ client, settings }: this["payload"] & { settings: any }): boolean {
    if (!validate(settings)) {
      return false;
    }
    return this.state.players.get(client.sessionId)?.admin ?? false; // only admins can configure settings
  }
}
