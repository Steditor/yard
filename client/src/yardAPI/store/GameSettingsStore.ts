import { reactive } from "vue";

import { YardGameSettings } from "@yard/common/schema/YardGameSettings";
import { SchemaProperties } from "@yard/common/schema/helpers";

import { watchObject } from "./helpers";

export default class GameSettingsStore
  implements SchemaProperties<YardGameSettings>
{
  private readonly _properties = reactive<SchemaProperties<YardGameSettings>>(
    defaultSettings(),
  );

  public clear(): void {
    Object.assign(this._properties, defaultSettings());
  }

  public watch(settings: YardGameSettings): void {
    watchObject(this._properties, settings);
  }

  get minPixelPerPerson(): number {
    return this._properties.minPixelPerPerson;
  }

  get rope(): boolean {
    return this._properties.rope;
  }

  get hideSelf(): boolean {
    return this._properties.hideSelf;
  }
}

function defaultSettings(): SchemaProperties<YardGameSettings> {
  return {
    minPixelPerPerson: 1,
    rope: false,
    hideSelf: false,
  };
}
