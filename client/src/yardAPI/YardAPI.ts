import * as Colyseus from "colyseus.js";
import { nanoid } from "nanoid";

import { YardRoomJoinOptions } from "@yard/common/roomInterface";
import { YardState } from "@yard/common/schema/YardState";

import { ToastMessage } from "../../typings/primetoast";
import { vm } from "../main";
import router from "../router";
import { GameAPI } from "./api/GameAPI";
import { PixelAPI } from "./api/PixelAPI";
import { PlayerAPI } from "./api/PlayerAPI";
import { RoomAPI } from "./api/RoomAPI";
import Controller from "./controller/Controller";
import { MultiController } from "./controller/MultiController";
import YardStore from "./store/YardStore";

export enum JoinYardResult {
  SUCCESSFUL,
  ROOM_NOT_FOUND,
  UNKNOWN_ERROR,
}

export default class YardAPI {
  private readonly _client: Colyseus.Client;

  private _room?: Colyseus.Room<YardState>;
  get room(): Colyseus.Room | undefined {
    return this._room;
  }

  public readonly store: YardStore;

  public readonly playerAPI: PlayerAPI;
  public readonly pixelAPI: PixelAPI;
  public readonly roomAPI: RoomAPI;
  public readonly gameAPI: GameAPI;

  public readonly controller: Controller;

  constructor() {
    this._client = new Colyseus.Client(getEndpoint());
    this.playerAPI = new PlayerAPI(this);
    this.pixelAPI = new PixelAPI(this);
    this.roomAPI = new RoomAPI(this);
    this.gameAPI = new GameAPI(this);
    this.store = new YardStore(this);

    this.controller = new MultiController(this, true);

    window.addEventListener("beforeunload", () => this.onBeforeUnload());
  }

  public async createYard(username: string): Promise<string | undefined> {
    try {
      this._room = await this._client.create("yard", {
        initialModerationKey: nanoid(15),
        username,
      } as YardRoomJoinOptions);
      this.watchRoom(this._room);
    } catch (e) {
      return undefined;
    }
    return this._room.id;
  }

  public async joinYard(
    id: string,
    options?: YardRoomJoinOptions,
  ): Promise<JoinYardResult> {
    if (this._room) {
      if (this._room.id === id) {
        return JoinYardResult.SUCCESSFUL;
      } else {
        this._room.leave(true);
        this._room = undefined;
      }
    }
    try {
      this._room = await this._client.joinById(id, options);
      this.watchRoom(this._room);
      this.receiveMessages(this._room);
    } catch (e: any) {
      if ((e.message as string).includes("not found")) {
        return JoinYardResult.ROOM_NOT_FOUND;
      } else {
        return JoinYardResult.UNKNOWN_ERROR;
      }
    }
    return JoinYardResult.SUCCESSFUL;
  }

  public send<T>(type: string | number, message?: T): boolean {
    if (this._room) {
      this._room.send(type, message);
      return true;
    } else {
      return false;
    }
  }

  private watchRoom(room: Colyseus.Room<YardState>) {
    room.onLeave((code) => this.onLeaveYard(code));
    // eslint-disable-next-line no-console
    room.onError((code, message) => console.log(code, message));
    this.store.watch(room);
  }

  private receiveMessages(room: Colyseus.Room<YardState>): void {
    room.onMessage("toast", (message: ToastMessage) => {
      vm.$toast.add(message);
    });
  }

  private onLeaveYard(code: number) {
    if (code !== 1000) {
      vm.$toast.add({
        severity: "warn",
        summary: "Disconnected",
        detail: "You were disconnected from the server.",
      });
    }
    this._room = undefined;
    this.store.clear();
    router.push({ name: "Home" });
  }

  private onBeforeUnload() {
    this._room?.leave(true);
  }
}

function getEndpoint() {
  const host = window.document.location.host.replace(/:.*/, "");
  const port = location.port ? ":" + location.port : "";
  const protocol = location.protocol.replace(/http(s?)/, "ws$1");
  return protocol + "//" + host + port;
}
