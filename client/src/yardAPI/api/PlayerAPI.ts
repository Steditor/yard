import { DebouncedFunc } from "lodash";
import debounce from "lodash/debounce";

import {
  KickPayload,
  MakeAdminPayload,
  SetNamePayload,
} from "@yard/common/playerInterface";

import YardAPI from "../YardAPI";

export class PlayerAPI {
  private readonly _api: YardAPI;
  private readonly _tSetUsername: DebouncedFunc<typeof setUsername>;

  constructor(api: YardAPI) {
    this._api = api;
    this._tSetUsername = debounce(setUsername, 400);
  }

  public setUsername(username: string, throttled = false): boolean {
    if (throttled) {
      return this._tSetUsername(username, this._api) ?? false;
    } else {
      return setUsername(username, this._api);
    }
  }

  public makeAdmin(key: string): boolean {
    return this._api.send("makeAdmin", key as MakeAdminPayload);
  }

  public kick(sessionId: string): boolean {
    return this._api.send("kick", sessionId as KickPayload);
  }
}

function setUsername(username: string, api: YardAPI): boolean {
  return api.send(
    "setName",
    username
      .trim()
      .substr(0, api.store?.settings.playerNameMaxLength) as SetNamePayload,
  );
}
