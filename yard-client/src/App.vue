<template>
  <v-app id="app">
    <v-app-bar app dense>
      <v-toolbar-title>GTA Yard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field label="Name" single-line class="flex-grow-0" v-model="name" @input="changeName"></v-text-field>
    </v-app-bar>
    <v-main>
      <svg viewBox="-5 -5 810 610" preserveAspectRatio="xMidYMid meet">
        <rect x="-5" y="-5" width="810" height="610" fill="white" />
        <Player v-for="(p, k) in players" :key="k" :player="p" />
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
            this.watchSelf(player);
          }
        };
        this.room.state.players.onRemove = (player, key) => {
          this.$delete(this.players, key);
        };
      }
    }

    watchSelf(me: YardPlayer) {
      this.name = me.name;
      me.onChange = (changes) => {
        const nameChange = changes.find(c => c.field === "name");
        if (nameChange) {
          this.name = nameChange.value;
        }
      };
    }

    changeName(e: InputEvent) {
      this.room?.send("setName", this.name);
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
