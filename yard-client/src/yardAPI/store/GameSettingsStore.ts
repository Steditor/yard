import { SchemaProperties } from "%/schema/helpers";
import { YardGameSettings } from "%/schema/YardGameSettings";
import { reactive } from "vue";

import { watchObject } from "@/yardAPI/store/helpers";

export default class GameSettingsStore implements SchemaProperties<YardGameSettings> {
  private readonly _properties = reactive<SchemaProperties<YardGameSettings>>(defaultSettings());

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
}

function defaultSettings(): SchemaProperties<YardGameSettings> {
  return {
    minPixelPerPerson: 1,
    rope: false,
  };
}
