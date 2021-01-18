import { reactive } from "vue";

import { YardPlayer } from "%/schema/YardPlayer";

import { SchemaProperties, watchObject } from "@/yardAPI/store/helpers";

export default class PlayerStore implements SchemaProperties<YardPlayer> {
  private readonly _properties = reactive<SchemaProperties<YardPlayer>>({
    name: "",
    admin: false,
  });

  constructor(player: YardPlayer) {
    watchObject(this._properties, player);
  }

  get name(): string {
    return this._properties.name;
  }

  get admin(): boolean {
    return this._properties.admin;
  }
}
