import * as Colyseus from "colyseus.js";

import { YardState } from "%/schema/YardState";
import { YardRoomJoinOptions } from "%/roomInterface";

import YardStore from "@/yardAPI/store/YardStore";

export default class YardAPI {
  private readonly _client: Colyseus.Client;

  private _room?: Colyseus.Room<YardState>;
  get room(): Colyseus.Room | undefined {
    return this._room;
  }

  private _store?: YardStore;
  get store(): YardStore | undefined {
    return this._store;
  }

  constructor() {
    this._client = new Colyseus.Client(getEndpoint());
  }

  public async createYard(): Promise<string | undefined> {
    try {
      this._room = await this._client.create("yard");
      this.watchRoom(this._room);
    } catch (e) {
      return undefined;
    }
    return this._room.id;
  }

  public async joinYard(id: string, options?: YardRoomJoinOptions): Promise<boolean> {
    if (this._room) {
      if (this._room.id === id) {
        return true;
      } else {
        this._room.leave(true);
        this._room = undefined;
      }
    }
    try {
      this._room = await this._client.joinById(id, options);
      this.watchRoom(this._room);
    } catch (e) {
      return false;
    }
    return true;
  }

  private watchRoom(room: Colyseus.Room<YardState>) {
    room.onLeave((code) => this.onLeaveYard(code));
    room.onError((code, message) => console.log(message));
    this._store = new YardStore(this, room.state);
  }

  public send<T>(type: string | number, message?: T): boolean {
    if (this._room) {
      this._room.send(type, message);
      return true;
    } else {
      return false;
    }
  }

  private onLeaveYard(code: number) {
    if (code !== 1000) {
      // handle error
    }
    this._room = undefined;
    this._store = undefined;
  }
}

function getEndpoint() {
  const host = window.document.location.host.replace(/:.*/, "");
  const port = location.port ? ":" + location.port : "";
  const protocol = location.protocol.replace(/http(s?)/, "ws$1");
  return protocol + "//" + host + port;
}
