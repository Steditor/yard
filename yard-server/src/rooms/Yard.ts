import { Dispatcher } from "@colyseus/command";
import { Room, Client } from "colyseus";

import { YardState } from "./schema/YardState";
import { OnJoinCommand } from "./commands/OnJoinCommand";
import { OnLeaveCommand } from "./commands/OnLeaveCommand";
import { PlayerSetNameCommand } from "./commands/PlayerSetNameCommand";
import { MakeAdminCommand } from "./commands/MakeAdminCommand";

import { YardRoomJoinOptions } from "%/roomInterface";

import Ajv from "ajv";
import { KickCommand } from "@/rooms/commands/KickCommand";

const validate = new Ajv().compile(YardRoomJoinOptions);

export class Yard extends Room<YardState> {
  dispatcher = new Dispatcher(this);
  private _initialModerationKey: string | undefined;

  onCreate(options: YardRoomJoinOptions): void {
    this.setState(new YardState());
    if (validate(options)) {
      this._initialModerationKey = options.initialModerationKey;
    } else {
      this.disconnect();
      return;
    }

    this.onMessage("setName", (client, name) => {
      this.dispatcher.dispatch(new PlayerSetNameCommand(), { client, name });
    });

    this.onMessage("makeAdmin", (client, key) => {
      this.dispatcher.dispatch(new MakeAdminCommand(), { client, key });
    });

    this.onMessage("kick", (client, sessionId) => {
      this.dispatcher.dispatch(new KickCommand(), { author: client, sessionId });
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
    this.dispatcher.dispatch(new OnJoinCommand(), { client, options });
  }

  async onLeave(client: Client, consented: boolean): Promise<void> {
    this.dispatcher.dispatch(new OnLeaveCommand(), { client, consented });
  }
}
