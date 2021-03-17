import { YardState } from "%/schema/YardState";

import { watchMap } from "@/yardAPI/store/helpers";
import LocalSettingsStore from "@/yardAPI/store/LocalSettingsStore";
import PixelStore from "@/yardAPI/store/PixelStore";
import PlayerStore from "@/yardAPI/store/PlayerStore";
import SettingsStore from "@/yardAPI/store/SettingsStore";
import GameSettingsStore from "@/yardAPI/store/GameSettingsStore";
import YardAPI from "@/yardAPI/YardAPI";

import * as Colyseus from "colyseus.js";
import { ref, shallowReactive } from "vue";

export default class YardStore {
  private _api: YardAPI;
  private readonly _sessionId = ref<null | string>(null);
  private readonly _roomId = ref<null | string>(null);

  public readonly settings = new SettingsStore();
  public readonly gameSettings = new GameSettingsStore();
  public readonly players = shallowReactive(new Map<string, PlayerStore>());
  public readonly pixels = shallowReactive(new Map<string, PixelStore>());
  private readonly _pixelHighlight = ref<null | string>(null);

  public readonly localSettings = new LocalSettingsStore();

  constructor(api: YardAPI) {
    this._api = api;
  }

  public watch(room: Colyseus.Room<YardState>): void {
    this.clear();

    this._sessionId.value = room.sessionId;
    this._roomId.value = room.id;

    this.settings.watch(room.state.settings);
    this.gameSettings.watch(room.state.gameSettings);

    watchMap(this.players, PlayerStore, room.state.players);

    watchMap(this.pixels, PixelStore, room.state.pixels);
  }

  public clear(): void {
    this._sessionId.value = null;
    this._roomId.value = null;

    this.settings.clear();
    this.gameSettings.clear();
    this.players.clear();
    this.pixels.clear();
    this._pixelHighlight.value = null;
  }

  get sessionId(): string | null {
    return this._sessionId.value;
  }

  get roomId(): string | null {
    return this._roomId.value;
  }

  get pixelHighlight(): string | null {
    return this._pixelHighlight.value;
  }

  set pixelHighlight(pixelId: string | null) {
    this._pixelHighlight.value = pixelId;
  }

  public me(): PlayerStore | undefined {
    const id = this.sessionId;
    return id ? this.players.get(id) : undefined;
  }
}
