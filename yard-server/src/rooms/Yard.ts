import { YardRoomJoinOptions } from "%/roomInterface";

import { ColorCommand } from "@/rooms/commands/ColorCommand";
import { KickCommand } from "@/rooms/commands/KickCommand";
import { MakeAdminCommand } from "@/rooms/commands/MakeAdminCommand";
import { MoveCommand } from "@/rooms/commands/MoveCommand";
import { OnJoinCommand } from "@/rooms/commands/OnJoinCommand";
import { OnLeaveCommand } from "@/rooms/commands/OnLeaveCommand";
import { PlayerSetNameCommand } from "@/rooms/commands/PlayerSetNameCommand";
import { SetGameSettingsCommand } from "@/rooms/commands/SetGameSettingsCommand";
import { SetSettingsCommand } from "@/rooms/commands/SetSettingsCommand";

import { DefaultGame } from "@/rooms/games/DefaultGame";
import { Game } from "@/rooms/games/Game";
import { YardState } from "@/rooms/schema/YardState";
import { Dispatcher } from "@colyseus/command";

import Ajv from "ajv";
import { Client, Room } from "colyseus";

const validate = new Ajv().compile(YardRoomJoinOptions);

export class Yard extends Room<YardState> {
  dispatcher = new Dispatcher(this);
  private _initialModerationKey: string | undefined;

  private game!: Game;

  onCreate(options: YardRoomJoinOptions): void {
    if (validate(options)) {
      this._initialModerationKey = options.initialModerationKey;
    } else {
      this.disconnect();
      return;
    }
    this.setState(new YardState());
    this.game = new DefaultGame(this.state);

    this.onMessage("setSettings", (client, settings) => {
      this.dispatcher.dispatch(new SetSettingsCommand(), { client, settings });
    });

    this.onMessage("setGameSettings", (client, settings) => {
      this.dispatcher.dispatch(new SetGameSettingsCommand(), { client, settings, game: this.game });
    });

    this.onMessage("setName", (client, name) => {
      this.dispatcher.dispatch(new PlayerSetNameCommand(), { client, name });
    });

    this.onMessage("makeAdmin", (client, key) => {
      this.dispatcher.dispatch(new MakeAdminCommand(), { client, key });
    });

    this.onMessage("kick", (client, sessionId) => {
      this.dispatcher.dispatch(new KickCommand(), { author: client, sessionId });
    });

    this.onMessage("move", (client, data) => {
      this.dispatcher.dispatch(new MoveCommand(), { client, data, game: this.game });
    });

    this.onMessage("color", (client, data) => {
      this.dispatcher.dispatch(new ColorCommand(), { client, data });
    });
  }

  public consumeInitialModerationKey(key: string): boolean {
    if (this._initialModerationKey && key === this._initialModerationKey) {
      this._initialModerationKey = undefined;
      return true;
    } else {
      return false;
    }
  }

  onJoin(client: Client, options: YardRoomJoinOptions): void {
    this.dispatcher.dispatch(new OnJoinCommand(), { client, options, game: this.game });
  }

  async onLeave(client: Client, consented: boolean): Promise<void> {
    this.dispatcher.dispatch(new OnLeaveCommand(), { client, consented, game: this.game });
  }
}
