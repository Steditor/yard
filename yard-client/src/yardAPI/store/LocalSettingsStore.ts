import { reactive } from "vue";

interface LocalSettings {
  showNames: boolean;
}

export default class LocalSettingsStore implements LocalSettings {
  private readonly _properties = reactive<LocalSettings>({
    showNames: false,
  });

  get showNames(): boolean {
    return this._properties.showNames;
  }

  set showNames(showNames: boolean) {
    this._properties.showNames = showNames;
  }
}
