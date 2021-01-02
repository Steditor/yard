import { Dispatcher } from "@colyseus/command";
import { Room, Client } from "colyseus";

import { YardState } from "./schema/YardState";
import { OnJoinCommand } from "./commands/OnJoinCommand";
import { OnLeaveCommand } from "./commands/OnLeaveCommand";
import { PlayerSetNameCommand } from "./commands/PlayerSetNameCommand";

export class Yard extends Room<YardState> {
  dispatcher = new Dispatcher(this);

  onCreate(): void {
    this.setState(new YardState());

    this.onMessage("setName", (client, name) => {
      this.dispatcher.dispatch(new PlayerSetNameCommand(), { client, name });
    });
  }

  onJoin(client: Client, options: unknown): void {
    this.dispatcher.dispatch(new OnJoinCommand(), { client, options });
  }

  async onLeave(client: Client, consented: boolean): Promise<void> {
    this.dispatcher.dispatch(new OnLeaveCommand(), { client, consented });
  }
}
