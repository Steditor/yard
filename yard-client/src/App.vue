<template>
  <v-app id="app">
    <v-app-bar app dense>
      <v-toolbar-title>GTA Yard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="showColorDialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" :color="color" class="mr-5">Farbe wählen</v-btn>
        </template>
        <v-card><v-color-picker hide-inputs :value="color" @input="setColor"></v-color-picker></v-card>
      </v-dialog>
      <v-text-field hide-details label="Name" single-line class="flex-grow-0 mr-5" v-model="name" @input="changeName" @keydown.stop="" />
      <v-switch flat hide-details v-model="showNames" label="Namen anzeigen"></v-switch>
    </v-app-bar>
    <v-main>
      <svg viewBox="-5 -5 810 610" preserveAspectRatio="xMidYMid meet">
        <rect x="-5" y="-5" width="810" height="610" fill="white" />
        <Player v-for="(p, k) in players" :key="k" :player="p" :showName="showNames" />
      </svg>
    </v-main>
  </v-app>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import * as Colyseus from "colyseus.js";
  import kd from "keydrown";

  import { YardState } from "@/schema/YardState";
  import { YardPlayer } from "@/schema/YardPlayer";
  import Player from "@/components/Player.vue";

  enum Dir {
    UP = 1, RIGHT = 2, DOWN = 4, LEFT = 8
  }

  @Component({
    components: { Player },
  })
  export default class App extends Vue {
    private client?: Colyseus.Client;
    private room?: Colyseus.Room<YardState>;

    players: Record<string, YardPlayer> = {};

    name = "";
    showNames = false;
    color = "";
    showColorDialog = false;

    async mounted() {
      await this.connect();
      this.watchPlayers();
      this.listenForInput();
    }

    async connect() {
      const host = window.document.location.host.replace(/:.*/, "");
      const port = location.port ? ":" + location.port : "";
      const protocol = location.protocol.replace(/http(s?)/, "ws$1");
      const endpoint = protocol + "//" + host + port;
      this.client = new Colyseus.Client(endpoint);
      this.room = await this.client.joinOrCreate("yard");
    }

    watchPlayers() {
      if (this.room) {
        this.room.state.players.onAdd = (player, key) => {
          this.$set(this.players, key, player);
          if (key === this.room?.sessionId) {
            this.name = player.name;
            this.color = player.color;
          }
        };
        this.room.state.players.onRemove = (player, key) => {
          this.$delete(this.players, key);
        };
      }
    }

    changeName() {
      this.room?.send("setName", this.name.substr(0, 20));
    }

    setColor(val: string) {
      this.room?.send("setColor", val);
      this.color = val;
    }

    listenForInput() {
      let speed = 1;
      let keys = 0;
      kd.Key.prototype.down((event) => {
        switch (event.key) {
          case "ArrowLeft":
          case "a":
            this.room?.send("move", { x: -speed });
            keys |= Dir.LEFT;
            break;
          case "ArrowRight":
          case "d":
            this.room?.send("move", { x: speed });
            keys |= Dir.RIGHT;
            break;
          case "ArrowUp":
          case "w":
            this.room?.send("move", { y: -speed });
            keys |= Dir.UP;
            break;
          case "ArrowDown":
          case "s":
            this.room?.send("move", { y: speed });
            keys |= Dir.DOWN;
            break;
        }
      });
      kd.Key.prototype.up((event) => {
        switch (event.key) {
          case "ArrowLeft":
          case "a":
            keys &= ~Dir.LEFT;
            break;
          case "ArrowRight":
          case "d":
            keys &= ~Dir.RIGHT;
            break;
          case "ArrowUp":
          case "w":
            keys &= ~Dir.UP;
            break;
          case "ArrowDown":
          case "s":
            keys &= ~Dir.DOWN;
            break;
        }
      });
      kd.run(() => {
        kd.tick();

        if (keys === 0) {
          speed = 1;
        } else {
          speed = Math.min(5, speed * 1.07);
        }
      });
    }

    stopPropagation(event: Event) {
      event.stopPropagation();
    }
  }
</script>

<style lang="scss" scoped>
  #app .v-main {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  svg {
    width: 100%;
    height: 100%;
  }
</style>
