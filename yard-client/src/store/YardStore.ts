import PlayerStore from "@/store/PlayerStore";

import { YardState } from "@/schema/YardState";
import { YardPlayer } from "@/schema/YardPlayer";

import { Room } from "colyseus.js";
import { Vue } from "vue-property-decorator";

export default class YardStore {
  players: Record<string, PlayerStore> = {};

  me: string = "";

  watch(room: Room<YardState>) {
    this.me = room.sessionId;
    const state = room.state;
    state.players.onAdd = (player, key) => this.addPlayer(player, key);
    state.players.onRemove = (player, key) => this.removePlayer(player, key);
  }

  private addPlayer(player: YardPlayer, key: string) {
    const playerStore = new PlayerStore(player);
    Vue.set(this.players, key, playerStore);
  }

  private removePlayer(player: YardPlayer, key: string) {
    Vue.delete(this.players, key);
  }
}
