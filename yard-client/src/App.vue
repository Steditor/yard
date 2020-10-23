<template>
  <v-app id="app">
    <v-app-bar app dense>
      <v-toolbar-title>GTA Yard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="showColorDialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" :color="myColor" class="mr-5">Farbe wählen</v-btn>
        </template>
        <v-card><v-color-picker hide-inputs v-model="myColor"></v-color-picker></v-card>
      </v-dialog>
      <v-text-field hide-details label="Name" single-line class="flex-grow-0 mr-5" v-model="myName" @keydown.stop="" />
      <v-switch flat hide-details v-model="showNames" label="Namen anzeigen"></v-switch>
    </v-app-bar>
    <v-main>
      <svg viewBox="-5 -5 810 610" preserveAspectRatio="xMidYMid meet">
        <rect x="-5" y="-5" width="810" height="610" fill="white" />
        <path ref="rope" d="" stroke-width="2" stroke="black" fill="none" />
        <Player v-for="(p, k) in store.players" :key="k" :player="p" :showName="showNames" />
      </svg>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { Component, Ref, Vue, Watch } from "vue-property-decorator";
  import * as Colyseus from "colyseus.js";
  import kd from "keydrown";

  import { YardState } from "@/schema/YardState";
  import Player from "@/components/Player.vue";
  import YardStore from "@/store/YardStore";
  import gsap from "gsap";

  enum Dir {
    UP = 1, RIGHT = 2, DOWN = 4, LEFT = 8
  }

  @Component({
    components: { Player },
  })
  export default class App extends Vue {
    @Ref()
    rope!: SVGPathElement;

    private client?: Colyseus.Client;
    private room?: Colyseus.Room<YardState>;

    private store = new YardStore();

    showNames = false;
    showColorDialog = false;

    async mounted(): Promise<void> {
      await this.connect();
      if (this.room) {
        this.store.watch(this.room);
        this.listenForInput();
      }
    }

    async connect(): Promise<void> {
      const host = window.document.location.host.replace(/:.*/, "");
      const port = location.port ? ":" + location.port : "";
      const protocol = location.protocol.replace(/http(s?)/, "ws$1");
      const endpoint = protocol + "//" + host + port;
      this.client = new Colyseus.Client(endpoint);
      this.room = await this.client.joinOrCreate("yard");
    }

    get myColor(): string {
      return this.store.players[this.store.me]?.color ?? "#000000";
    }

    set myColor(val: string) {
      this.room?.send("setColor", val);
    }

    get myName(): string {
      return this.store.players[this.store.me]?.name ?? "Unbenannt";
    }

    set myName(name: string) {
      this.room?.send("setName", name.substr(0, 20));
    }

    @Watch("store.orderedPlayers")
    @Watch("store.players", { deep: true })
    onRopeChange(): void {
      console.log("updated");
      let d = "";
      const last = this.store.orderedPlayers[this.store.orderedPlayers.length - 1];
      d += "M" + this.store.players[last].position.x + "," + this.store.players[last].position.y + "L";
      for (const player of this.store.orderedPlayers) {
        d += " " + this.store.players[player].position.x + "," + this.store.players[player].position.y;
      }
      gsap.to(this.rope, { attr: { d }, duration: 0.3 });
    }

    listenForInput(): void {
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
