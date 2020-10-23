import { Dispatcher } from "@colyseus/command";
import { Room, Client } from "colyseus";

import { YardState } from "./schema/YardState";
import { OnJoinCommand } from "./commands/OnJoinCommand";
import { OnLeaveCommand } from "./commands/OnLeaveCommand";
import { PlayerMoveCommand } from "./commands/PlayerMoveCommand";
import { PlayerSetNameCommand } from "./commands/PlayerSetNameCommand";
import { PlayerSetColorCommand } from "./commands/PlayerSetColorCommand";

export class Yard extends Room<YardState> {
  dispatcher = new Dispatcher(this);

  onCreate(): void {
    this.setState(new YardState());

    this.onMessage("move", (client, data) => {
      this.dispatcher.dispatch(new PlayerMoveCommand(), { client, data });
    });
    this.onMessage("setName", (client, data) => {
      this.dispatcher.dispatch(new PlayerSetNameCommand(), { client, data });
    });
    this.onMessage("setColor", (client, data) => {
      this.dispatcher.dispatch(new PlayerSetColorCommand(), { client, data });
    });
  }

  onJoin(client: Client): void {
    this.dispatcher.dispatch(new OnJoinCommand(), { client });
  }

  async onLeave(client: Client, consented: boolean): Promise<void> {
    this.dispatcher.dispatch(new OnLeaveCommand(), { client, consented });
  }
}
