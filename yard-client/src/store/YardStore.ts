import PlayerStore from "@/store/PlayerStore";

import { YardState } from "@/schema/YardState";
import { YardPlayer } from "@/schema/YardPlayer";

import { Room } from "colyseus.js";
import { Vue } from "vue-property-decorator";

export default class YardStore {
  players: Record<string, PlayerStore> = {};

  me = "";

  orderedPlayers: string[] = [];

  watch(room: Room<YardState>) {
    this.me = room.sessionId;
    const state = room.state;
    state.players.onAdd = (player, key) => this.addPlayer(player, key);
    state.players.onRemove = (player, key) => this.removePlayer(player, key);

    state.orderedPlayers.onAdd = (player, index) => this.addOrderedPlayer(player, index);
    state.orderedPlayers.onRemove = (player, index) => this.removeOrderedPlayer(player, index);
    state.orderedPlayers.onChange = (player, index) => this.changeOrderedPlayer(player, index);
  }

  private addPlayer(player: YardPlayer, key: string) {
    const playerStore = new PlayerStore(player);
    Vue.set(this.players, key, playerStore);
  }

  private removePlayer(player: YardPlayer, key: string) {
    Vue.delete(this.players, key);
  }

  private addOrderedPlayer(player: string, index: number) {
    this.orderedPlayers.splice(index, 0, player);
  }

  private removeOrderedPlayer(player: string, i: number) {
    // careful: provided index i seems to be wrong in quite a lot of cases!
    const index = this.orderedPlayers.indexOf(player);
    if (index !== -1) {
      this.orderedPlayers.splice(index, 1);
    }
  }

  private changeOrderedPlayer(player: string, index: number) {
    this.orderedPlayers[index] = player;
  }
}
