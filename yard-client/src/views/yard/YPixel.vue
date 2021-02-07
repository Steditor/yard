<template>
  <g class="player" ref="group" :style="dynamicStyle" :class="dynamicClass">
    <rect x="-5" y="-5" width="10" height="10"></rect>
    <text text-anchor="middle" dominant-baseline="central">{{playerName}}</text>
  </g>
</template>

<script lang="ts">
  import PixelStore from "@/yardAPI/store/PixelStore";

  import { defineComponent, PropType } from "vue";
  import gsap from "gsap";

  export default defineComponent({
    name: "YPixel",
    props: {
      pixel: {
        type: Object as PropType<PixelStore>,
        required: true,
      },
      showName: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      pixelSize(): number {
        return 5;
      },
      playerName(): string {
        return this.$yardAPI.store.players.get(this.pixel.player)?.name ?? "";
      },
      dynamicStyle(): Record<string, string> {
        return {
          "--player-color": this.pixel.color,
        };
      },
      dynamicClass(): string {
        return this.showName ? "show-name" : "";
      },
      pos(): { x: number, y: number } {
        return {
          x: this.pixel.x,
          y: this.pixel.y,
        };
      },
    },
    watch: {
      pos: {
        handler(position: { x: number, y: number}): void {
          if (this.$el) {
            gsap.to(this.$el, { translateX: position.x, translateY: position.y, duration: 0.3 });
          }
        },
        deep: true,
      },
    },
    mounted() {
      gsap.set(this.$el, { translateX: this.pos.x, translateY: this.pos.y, duration: 0.3 });
    },
  });
</script>

<style lang="scss" scoped>
  .player {
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
  }
</style>
