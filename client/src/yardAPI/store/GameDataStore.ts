import { reactive } from "vue";

import { YardGameData } from "@yard/common/schema/YardGameData";

import { watchArrayMapProxy } from "./helpers";

export default class GameDataStore {
  public readonly orderedPixels = reactive<string[]>([]);

  public clear(): void {
    this.orderedPixels.splice(0);
  }

  public watch(gameData: YardGameData): void {
    gameData.onChange = (changes) => {
      changes.forEach((change) => {
        if (change.field === "orderedPixels" && change.value !== undefined) {
          watchArrayMapProxy(this.orderedPixels, change.value);
        }
      });
    };
  }
}
