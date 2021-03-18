import YardAPI from "@/yardAPI/YardAPI";
import { SetGameSettingsPayload } from "%/gameInterface";

export class GameAPI {
  private readonly _api: YardAPI;

  constructor(api: YardAPI) {
    this._api = api;
  }

  public setSettings(settings: SetGameSettingsPayload): boolean {
    return this._api.send("setGameSettings", settings);
  }

  public shuffleRope(): boolean {
    return this._api.send("shuffleRope");
  }
}
