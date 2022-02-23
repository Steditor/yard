import { ComponentCustomProperties, WritableComputedOptions } from "vue";

import { SetGameSettingsPayload } from "@yard/common/gameInterface";
import { SetSettingsPayload } from "@yard/common/roomInterface";

type PropertiesOfType<TObj, TResult> = {
  [K in keyof TObj]: TObj[K] extends TResult ? K : never;
}[keyof TObj];

export function settingsFieldModel<
  T extends SetSettingsPayload[keyof SetSettingsPayload],
>(
  field: PropertiesOfType<Required<SetSettingsPayload>, T>,
): WritableComputedOptions<T> {
  return {
    get(this: ComponentCustomProperties): T {
      return this.$yardAPI.store.settings[field] as T;
    },
    set(this: ComponentCustomProperties, value: T) {
      this.$yardAPI.roomAPI.setSettings({ [field]: value });
    },
  };
}

export function gameSettingsFieldModel<
  T extends SetGameSettingsPayload[keyof SetGameSettingsPayload],
>(
  field: PropertiesOfType<Required<SetGameSettingsPayload>, T>,
): WritableComputedOptions<T> {
  return {
    get(this: ComponentCustomProperties): T {
      return this.$yardAPI.store.gameSettings[field] as T;
    },
    set(this: ComponentCustomProperties, value: T) {
      this.$yardAPI.gameAPI.setSettings({ [field]: value });
    },
  };
}
