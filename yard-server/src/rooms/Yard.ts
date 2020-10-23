import { Room, Client } from "colyseus";
import { YardState } from "./schema/YardState";

export class Yard extends Room<YardState> {

  onCreate(): void {
    this.setState(new YardState());

    this.onMessage("move", (client, data) => {
      this.state.movePlayer(client.sessionId, data);
    });
    this.onMessage("setName", (client, data) => {
      this.state.setName(client.sessionId, data);
    });
    this.onMessage("setColor", (client, data) => {
      this.state.setColor(client.sessionId, data);
    });
  }

  onJoin(client: Client): void {
    this.state.createPlayer(client.sessionId);
  }

  async onLeave(client: Client, consented: boolean): Promise<void> {
    try {
      if (consented) {
        throw new Error("left_manually");
      }
      await this.allowReconnection(client, 10);
    } catch (e) {
      this.state.removePlayer(client.sessionId);
    }
  }
}
