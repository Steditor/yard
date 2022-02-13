import { SetSettingsPayload } from "@yard/common/roomInterface";

import YardAPI from "../YardAPI";

export class RoomAPI {
  private readonly _api: YardAPI;

  constructor(api: YardAPI) {
    this._api = api;
  }

  public setSettings(settings: SetSettingsPayload): boolean {
    return this._api.send("setSettings", settings);
  }
}
