import * as Colyseus from "colyseus.js";

import { ref, shallowReactive } from "vue";

import { YardState } from "@yard/common/schema/YardState";

import YardAPI from "../YardAPI";
import GameDataStore from "./GameDataStore";
import GameSettingsStore from "./GameSettingsStore";
import LocalSettingsStore from "./LocalSettingsStore";
import PixelStore from "./PixelStore";
import PlayerStore from "./PlayerStore";
import SettingsStore from "./SettingsStore";
import { watchMap } from "./helpers";

export default class YardStore {
  private _api: YardAPI;
  private readonly _sessionId = ref<null | string>(null);
  private readonly _roomId = ref<null | string>(null);

  public readonly settings = new SettingsStore();
  public readonly gameSettings = new GameSettingsStore();
  public readonly gameData = new GameDataStore();
  public readonly players = shallowReactive(new Map<string, PlayerStore>());
  public readonly pixels = shallowReactive(new Map<string, PixelStore>());
  private readonly _pixelHighlight = ref<null | {
    pixelId: string;
    once: boolean;
  }>(null);

  public readonly strings = shallowReactive(new Map<string, string>());

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
    this.gameData.watch(room.state.gameData);

    watchMap(this.players, PlayerStore, room.state.players);

    watchMap(this.pixels, PixelStore, room.state.pixels);
  }

  public clear(): void {
    this._sessionId.value = null;
    this._roomId.value = null;

    this.settings.clear();
    this.gameSettings.clear();
    this.gameData.clear();
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

  get pixelHighlight(): null | { pixelId: string; once: boolean } {
    return this._pixelHighlight.value;
  }

  setPixelHighlight(pixelId: string | null, once = false): void {
    this._pixelHighlight.value = pixelId ? { pixelId, once } : null;
  }

  public me(): PlayerStore | undefined {
    const id = this.sessionId;
    return id ? this.players.get(id) : undefined;
  }

  public myPixels(): Array<[string, PixelStore]> {
    return Array.from(this.pixels.entries())
      .filter(([, pixel]) => pixel.player === this.sessionId)
      .sort(([idA], [idB]) => (idA < idB ? -1 : idA > idB ? 1 : 0));
  }
}
