<template>
  <g class="player" ref="group" :style="playerStyle" :class="playerClass">
    <rect class="pixel" :x="-pixelSize/2" :y="-pixelSize/2" :width="pixelSize" :height="pixelSize" @click="selectPixel"></rect>
    <g class="player-name" :style="labelStyle">
      <path :d="labelPath"></path>
      <rect :x="-textWidth/2" :y="-textHeight/2" :width="textWidth" :height="textHeight" rx="5" ry="100%"></rect>
      <text ref="tag">{{playerName}}</text>
    </g>
    <rect class="pixel-highlight" v-if="pixelId === $yardAPI.store.pixelHighlight?.pixelId"
          :x="-pixelSize/2" :y="-pixelSize/2" :width="pixelSize" :height="pixelSize"
          :class="{ once: $yardAPI.store.pixelHighlight?.once }"
    ></rect>
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
    data() {
      return { textWidth: 0, textHeight: 0 };
    },
    computed: {
      pixelSize(): number {
        return this.$yardAPI.store.settings.pixelSize;
      },
      playerName(): string {
        return this.$yardAPI.store.players.get(this.pixel.player)?.name ?? "";
      },
      playerStyle(): Record<string, string> {
        return {
          "--player-color": this.pixel.color,
        };
      },
      selectable(): boolean {
        return this.pixel.player === this.$yardAPI.store.sessionId;
      },
      playerClass(): Record<string, boolean> {
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
      labelStyle(): Record<string, string> {
        return {
          transform: `translate(${this.labelXPosition}px, ${this.labelYPosition}px)`,
        };
      },
      labelXPosition(): number {
        const ratio = this.pixel.x / this.$yardAPI.store.settings.canvasWidth;
        return (ratio - 0.5) * -(this.textWidth + 0.5 * this.pixelSize);
      },
      labelYPosition(): number {
        return (0.5 * this.pixelSize + 2 * this.textHeight) * this.labelYDirection;
      },
      labelYDirection(): number {
        return this.pixel.y / this.$yardAPI.store.settings.canvasHeight < 0.15 ? 1 : -1;
      },
      labelPath(): string {
        return `M0 ${this.textHeight / -2 * this.labelYDirection} V${-this.labelYPosition} L${-this.labelXPosition} ${-this.labelYPosition}`;
      },
    },
    methods: {
      selectPixel() {
        if (this.selectable) {
          this.$yardAPI.controller.activePixel = this.pixelId;
        }
      },
      detectTextSize() {
        const tag = this.$refs.tag as SVGTextElement;
        const bbox = tag.getBBox();
        this.textWidth = bbox.width + 8;
        this.textHeight = bbox.height;
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
      this.$nextTick(() => this.detectTextSize());
    },
    updated() {
      this.$nextTick(() => this.detectTextSize());
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
    .player-name {
      pointer-events: none;
      opacity: 0;
      transition: opacity 200ms ease-in-out;
      path {
        stroke: var(--player-color);
        fill: none;
      }
      rect {
        fill: rgba(255,255,255,0.5);
        stroke: var(--player-color);
        filter: drop-shadow(0 0 3px white);
      }
      text {
        dominant-baseline: central;
        text-anchor: middle;
        font-size: 0.8rem;
        fill: var(--player-color);
      }
    }
    rect.pixel:hover + .player-name, &.show-name .player-name {
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
    &.once {
      animation-iteration-count: 1;
    }
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
