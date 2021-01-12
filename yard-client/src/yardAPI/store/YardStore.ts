import { shallowReactive } from "vue";

import { YardState } from "%/schema/YardState";

import { watchMap } from "@/yardAPI/store/helpers";
import PlayerStore from "@/yardAPI/store/PlayerStore";
import SettingsStore from "@/yardAPI/store/SettingsStore";
import YardAPI from "@/yardAPI/YardAPI";

export default class YardStore {
  private _api: YardAPI;

  public readonly settings: SettingsStore;
  public readonly players = shallowReactive(new Map<string, PlayerStore>());

  constructor(api: YardAPI, state: YardState) {
    this._api = api;

    this.settings = new SettingsStore(state.settings);
    watchMap(this.players, PlayerStore, state.players);
  }

  public clear(): void {
    this.players.clear();
  }

  public me(): PlayerStore | undefined {
    return this._api.room?.sessionId ? this.players.get(this._api.room.sessionId) : undefined;
  }
}
