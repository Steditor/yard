<template>
  <g class="player" :style="style">
    <rect x="-5" y="-5" width="10" height="10"></rect>
    <text text-anchor="middle" dominant-baseline="central">{{name}}</text>
  </g>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import gsap from "gsap";

  import { YardPlayer } from "@/schema/YardPlayer";

  @Component({})
  export default class App extends Vue {
    @Prop()
    player!: YardPlayer;

    name = "";

    private tween?: gsap.core.Tween;

    mounted() {
      this.name = this.player.name;
      gsap.set(this.$el, { translateX: this.player.x, translateY: this.player.y });
      this.watchPlayer();
    }

    watchPlayer() {
      this.player.onChange = (changes) => {
        const changesPosition = changes.find((change) => [ "x", "y" ].includes(change.field));
        if (changesPosition) {
          this.tween?.kill();
          this.tween = gsap.to(this.$el, { translateX: this.player.x, translateY: this.player.y, duration: 0.3 });
        }
        const nameChange = changes.find(c => c.field === "name");
        if (nameChange) {
          this.name = this.player.name;
        }
      };
    }

    get style() {
      return {
        "--player-color": this.player.color,
      };
    }
  }
</script>

<style lang="scss" scoped>
  rect {
    fill: var(--player-color);
  }
  text {
    pointer-events: none;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    filter: drop-shadow(0 0 3px white);
  }
  rect:hover + text {
    opacity: 1;
  }
</style>
