import YardAPI from "../YardAPI";

export class StringRepositoryAPI {
  private readonly _api: YardAPI;

  constructor(api: YardAPI) {
    this._api = api;
  }

  public async request(stringId: string): Promise<string | undefined> {
    const current = this._api.store.strings.get(stringId);
    if (current !== undefined) {
      return current;
    }
    const result = await fetch(`/services/string/${stringId}`, {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    });
    if (result.ok) {
      const string = await result.text();
      this._api.store.strings.set(stringId, string);
      return string;
    } else {
      return undefined;
    }
  }
}
