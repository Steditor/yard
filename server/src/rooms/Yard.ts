import { Dispatcher } from "@colyseus/command";
import Ajv from "ajv";
import { Client, Room } from "colyseus";

import { YardRoomJoinOptions } from "@yard/common/roomInterface";

import { ColorCommand } from "./commands/ColorCommand.js";
import { KickCommand } from "./commands/KickCommand.js";
import { MakeAdminCommand } from "./commands/MakeAdminCommand.js";
import { MoveCommand } from "./commands/MoveCommand.js";
import { OnJoinCommand } from "./commands/OnJoinCommand.js";
import { OnLeaveCommand } from "./commands/OnLeaveCommand.js";
import { PlayerSetNameCommand } from "./commands/PlayerSetNameCommand.js";
import { SetGameSettingsCommand } from "./commands/SetGameSettingsCommand.js";
import { SetSettingsCommand } from "./commands/SetSettingsCommand.js";
import { DefaultGame } from "./games/DefaultGame.js";
import { Game } from "./games/Game.js";
import { YardState } from "./schema/YardState.js";

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
      this.dispatcher.dispatch(new SetGameSettingsCommand(), {
        client,
        settings,
        game: this.game,
      });
    });

    this.onMessage("setName", (client, name) => {
      this.dispatcher.dispatch(new PlayerSetNameCommand(), { client, name });
    });

    this.onMessage("makeAdmin", (client, key) => {
      this.dispatcher.dispatch(new MakeAdminCommand(), { client, key });
    });

    this.onMessage("kick", (client, sessionId) => {
      this.dispatcher.dispatch(new KickCommand(), {
        author: client,
        sessionId,
      });
    });

    this.onMessage("move", (client, data) => {
      this.dispatcher.dispatch(new MoveCommand(), {
        client,
        data,
        game: this.game,
      });
    });

    this.onMessage("color", (client, data) => {
      this.dispatcher.dispatch(new ColorCommand(), { client, data });
    });

    this.onMessage("*", (client, type, message) => {
      this.game.onMessage(type, client, message, this.dispatcher);
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
    this.dispatcher.dispatch(new OnJoinCommand(), {
      client,
      options,
      game: this.game,
    });
  }

  async onLeave(client: Client, consented: boolean): Promise<void> {
    this.dispatcher.dispatch(new OnLeaveCommand(), {
      client,
      consented,
      game: this.game,
    });
  }
}
