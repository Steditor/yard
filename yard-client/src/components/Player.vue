<template>
  <g class="player" :style="dynamicStyle" :class="dynamicClass">
    <rect x="-5" y="-5" width="10" height="10"></rect>
    <text text-anchor="middle" dominant-baseline="central">{{player.name}}</text>
  </g>
</template>
<script lang="ts">
  import { Component, Vue, Prop, Watch } from "vue-property-decorator";
  import gsap from "gsap";

  import PlayerStore from "@/store/PlayerStore";

  @Component({})
  export default class App extends Vue {
    @Prop()
    player!: PlayerStore;

    @Prop({
      type: Boolean,
    })
    showName!: boolean;

    private tween?: gsap.core.Tween;

    mounted(): void {
      gsap.set(this.$el, { translateX: this.player.position.x, translateY: this.player.position.y });
    }

    @Watch("player.position", { deep: true })
    onPositionChange(position: { x: number; y: number }): void {
      gsap.to(this.$el, { translateX: position.x, translateY: position.y, duration: 0.3 });
    }

    get dynamicStyle(): Record<string, string> {
      return {
        "--player-color": this.player.color,
      };
    }

    get dynamicClass(): string {
      return this.showName ? "show-name" : "";
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
  rect:hover + text, .show-name text {
    opacity: 1;
  }
</style>
