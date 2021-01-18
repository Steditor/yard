import { ref, shallowReactive } from "vue";
import * as Colyseus from "colyseus.js";

import { YardState } from "%/schema/YardState";

import { watchMap } from "@/yardAPI/store/helpers";
import PlayerStore from "@/yardAPI/store/PlayerStore";
import SettingsStore from "@/yardAPI/store/SettingsStore";
import YardAPI from "@/yardAPI/YardAPI";

export default class YardStore {
  private _api: YardAPI;
  private readonly _sessionId = ref<null | string>(null);
  private readonly _roomId = ref<null | string>(null);

  public readonly settings = new SettingsStore();
  public readonly players = shallowReactive(new Map<string, PlayerStore>());

  constructor(api: YardAPI) {
    this._api = api;
  }

  public watch(room: Colyseus.Room<YardState>): void {
    this.clear();

    this._sessionId.value = room.sessionId;
    this._roomId.value = room.id;

    watchMap(this.players, PlayerStore, room.state.players);

    this.settings.watch(room.state.settings);
  }

  public clear(): void {
    this.players.clear();
  }

  get sessionId(): string | null {
    return this._sessionId.value;
  }

  get roomId(): string | null {
    return this._roomId.value;
  }

  public me(): PlayerStore | undefined {
    const id = this.sessionId;
    return id ? this.players.get(id) : undefined;
  }
}
