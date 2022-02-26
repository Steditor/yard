import { reactive } from "vue";

import { YardSettings } from "@yard/common/schema/YardSettings";
import { SchemaProperties } from "@yard/common/schema/helpers";

import { watchObject } from "./helpers";

export default class SettingsStore implements SchemaProperties<YardSettings> {
  private readonly _properties = reactive<SchemaProperties<YardSettings>>(
    defaultSettings(),
  );

  public clear(): void {
    Object.assign(this._properties, defaultSettings());
  }

  public watch(settings: YardSettings): void {
    watchObject(this._properties, settings);
  }

  get canvasWidth(): number {
    return this._properties.canvasWidth;
  }

  get canvasHeight(): number {
    return this._properties.canvasHeight;
  }

  get backgroundCode(): string {
    return this._properties.backgroundCode;
  }

  get pixelSize(): number {
    return this._properties.pixelSize;
  }

  get playerNameMaxLength(): number {
    return this._properties.playerNameMaxLength;
  }

  get moderationKey(): string {
    return this._properties.moderationKey;
  }
}

function defaultSettings(): SchemaProperties<YardSettings> {
  return {
    canvasWidth: 800,
    canvasHeight: 600,
    backgroundCode: "",
    pixelSize: 10,
    playerNameMaxLength: 20,
    moderationKey: "",
  };
}
