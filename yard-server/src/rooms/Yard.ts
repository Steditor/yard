import { Room, Client } from "colyseus";
import { YardState } from "./schema/YardState";

export class Yard extends Room<YardState> {

  onCreate (options: any) {
    this.setState(new YardState());

    this.onMessage("move", (client, data) => {
      this.state.movePlayer(client.sessionId, data);
    });

  }

  onJoin (client: Client, options: any) {
    this.state.createPlayer(client.sessionId);
  }

  async onLeave (client: Client, consented: boolean) {
    try {
      if (consented) {
        throw new Error("left_manually");
      }
      await this.allowReconnection(client, 10);
    } catch (e) {
      this.state.removePlayer(client.sessionId);
    }
  }

  onDispose() {
  }
}
