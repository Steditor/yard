<template>
  <g class="player" ref="group" :style="dynamicStyle" :class="dynamicClass">
    <rect class="pixel" :x="-pixelSize/2" :y="-pixelSize/2" :width="pixelSize" :height="pixelSize" @click="selectPixel"></rect>
    <text text-anchor="middle" dominant-baseline="central">{{playerName}}</text>
    <rect class="pixel-highlight" v-if="pixelId === $yardAPI.store.pixelHighlight"
          :x="-pixelSize/2" :y="-pixelSize/2" :width="pixelSize" :height="pixelSize" ></rect>
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
      pixelId: {
        type: String,
        required: true,
      },
    },
    computed: {
      pixelSize(): number {
        return this.$yardAPI.store.settings.pixelSize;
      },
      playerName(): string {
        return this.$yardAPI.store.players.get(this.pixel.player)?.name ?? "";
      },
      dynamicStyle(): Record<string, string> {
        return {
          "--player-color": this.pixel.color,
        };
      },
      selectable(): boolean {
        return this.pixel.player === this.$yardAPI.store.sessionId;
      },
      dynamicClass(): Record<string, boolean> {
        return {
          "show-name": this.$yardAPI.store.localSettings.showNames,
          "selectable": this.selectable,
        };
      },
      pos(): { x: number, y: number } {
        return {
          x: this.pixel.x,
          y: this.pixel.y,
        };
      },
    },
    methods: {
      selectPixel() {
        if (this.selectable) {
          this.$yardAPI.controller.activePixel = this.pixelId;
        }
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
    rect.pixel {
      fill: var(--player-color);
    }
    &.selectable rect.pixel {
      cursor: pointer;
    }
    text {
      pointer-events: none;
      opacity: 0;
      transition: opacity 200ms ease-in-out;
      filter: drop-shadow(0 0 3px white);
    }
    rect.pixel:hover + text, &.show-name text {
      opacity: 1;
    }
  }
</style>

<style lang="scss">
  .player rect.pixel-highlight {
    fill: white;
    fill-opacity: 0;
    stroke: var(--player-color);
    stroke-opacity: 1;
    animation: pixel-pulse 1s infinite cubic-bezier(0.15, 0, 0.42, 1.07);
  }

  @keyframes pixel-pulse {
    0% {
      stroke-width: 2px;
      stroke-opacity: 1;
      transform: scale(1);
    }

    50% {
      stroke-width: 0;
      stroke-opacity: 0;
      transform: scale(5);
    }

    100% {
      stroke-width: 0;
      stroke-opacity: 0;
      transform: scale(5);
    }
  }
</style>
