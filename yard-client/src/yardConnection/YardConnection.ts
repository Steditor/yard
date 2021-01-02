import * as Colyseus from "colyseus.js";

import { YardJoinOptions } from "../../../yard-server/src/rooms/commands/OnJoinCommand";

export default class YardConnection {
  private _client: Colyseus.Client;

  private _room?: Colyseus.Room;
  get room(): Colyseus.Room | undefined {
    return this._room;
  }

  constructor() {
    this._client = new Colyseus.Client(getEndpoint());
  }

  public async createYard(): Promise<string | undefined> {
    try {
      this._room = await this._client.create("yard");
    } catch (e) {
      return undefined;
    }
    return this._room.id;
  }

  public async joinYard(id: string, options?: YardJoinOptions): Promise<boolean> {
    if (this._room) {
      if (this._room.id === id) {
        return true;
      } else {
        this._room.leave(true);
      }
    }
    try {
      this._room = await this._client.joinById(id, options);
    } catch (e) {
      return false;
    }
    return true;
  }

  public setUsername(username: string): boolean {
    if (this._room) {
      this._room.send("setName", username.trim().substr(0, 20));
      return true;
    }
    return false;
  }
}

function getEndpoint() {
  const host = window.document.location.host.replace(/:.*/, "");
  const port = location.port ? ":" + location.port : "";
  const protocol = location.protocol.replace(/http(s?)/, "ws$1");
  return protocol + "//" + host + port;
}
