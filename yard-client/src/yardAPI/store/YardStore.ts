import { YardState } from "%/schema/YardState";

import { watchMap } from "@/yardAPI/store/helpers";
import PixelStore from "@/yardAPI/store/PixelStore";
import PlayerStore from "@/yardAPI/store/PlayerStore";
import SettingsStore from "@/yardAPI/store/SettingsStore";
import YardAPI from "@/yardAPI/YardAPI";

import * as Colyseus from "colyseus.js";
import { ref, shallowReactive } from "vue";

export default class YardStore {
  private _api: YardAPI;
  private readonly _sessionId = ref<null | string>(null);
  private readonly _roomId = ref<null | string>(null);

  public readonly settings = new SettingsStore();
  public readonly players = shallowReactive(new Map<string, PlayerStore>());
  public readonly pixels = shallowReactive(new Map<string, PixelStore>());

  constructor(api: YardAPI) {
    this._api = api;
  }

  public watch(room: Colyseus.Room<YardState>): void {
    this.clear();

    this._sessionId.value = room.sessionId;
    this._roomId.value = room.id;

    this.settings.watch(room.state.settings);

    watchMap(this.players, PlayerStore, room.state.players);

    watchMap(this.pixels, PixelStore, room.state.pixels);
  }

  public clear(): void {
    this.players.clear();
    this.pixels.clear();
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
