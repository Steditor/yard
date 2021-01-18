import { reactive } from "vue";

import { YardSettings } from "%/schema/YardSettings";

import { SchemaProperties, watchObject } from "@/yardAPI/store/helpers";

export default class SettingsStore implements SchemaProperties<YardSettings> {
  private readonly _properties = reactive<SchemaProperties<YardSettings>>({
    canvasWidth: 800,
    canvasHeight: 600,
    playerNameMaxLength: 20,
    moderationKey: "",
  });

  constructor(settings: YardSettings) {
    watchObject(this._properties, settings);
  }

  get canvasWidth(): number {
    return this._properties.canvasWidth;
  }

  get canvasHeight(): number {
    return this._properties.canvasHeight;
  }

  get playerNameMaxLength(): number {
    return this._properties.playerNameMaxLength;
  }

  get moderationKey(): string {
    return this._properties.moderationKey;
  }
}
