<template>
  <div class="y-full-size yard-container" ref="container">
    <svg :viewBox="viewBox" preserveAspectRatio="xMidYMid meet" class="yard">
      <rect x="0" y="0" :width="viewWidth" :height="viewHeight" fill="white" />
      <YRope v-if="$yardAPI.store.gameSettings.rope" />
      <YPixel v-for="pixel in $yardAPI.store.pixels" :key="pixel[0]" :pixel="pixel[1]" :pixel-id="pixel[0]" />
    </svg>
    <svg ref="touchVisuals" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMidYMid slice" class="touch-visuals" :class="touchVisualsClass">
      <circle r="12" v-bind="touchOrigin" class="touch-origin" />
      <circle r="10" v-bind="touchTarget" class="touch-target" />
      <path :d="touchControllerPath" class="touch-path" />
    </svg>
  </div>
</template>

<script lang="ts">
  import { TouchController } from "@/yardAPI/controller/TouchController";
  import { MultiController } from "@/yardAPI/controller/MultiController";

  import YPixel from "@/views/yard/YPixel.vue";
  import YRope from "@/views/yard/YRope.vue";
  import { defineComponent } from "vue";
  import { Vec2 } from "@/yardAPI/controller/math";

  export default defineComponent({
    name: "YYard",
    components: { YRope, YPixel },
    computed: {
      viewWidth(): number {
        return this.$yardAPI.store.settings.canvasWidth;
      },
      viewHeight(): number {
        return this.$yardAPI.store.settings.canvasHeight;
      },
      viewBox(): string {
        return `0 0 ${this.viewWidth} ${this.viewHeight}`;
      },
      controller(): TouchController | null {
        const controller = this.$yardAPI.controller;
        if (controller instanceof TouchController) {
          return controller;
        } else if (controller instanceof MultiController) {
          return controller.touch;
        } else {
          return null;
        }
      },
      touchVisualsClass(): Record<string, boolean> {
        return { active: !!(this.controller?.origin.value) };
      },
      touchOrigin(): { cx: number, cy: number } {
        const origin = this.controller?.origin.value;
        if (origin) {
          const svgPoint = toSVGCoordinates(origin, this.$refs.touchVisuals as SVGSVGElement);
          return { cx: svgPoint.x, cy: svgPoint.y };
        } else {
          return { cx: 0, cy: 0 };
        }
      },
      touchTarget(): { cx: number, cy: number } {
        const target = this.controller?.target.value;
        if (target) {
          const svgPoint = toSVGCoordinates(target, this.$refs.touchVisuals as SVGSVGElement);
          return { cx: svgPoint.x, cy: svgPoint.y };
        } else {
          return this.touchOrigin;
        }
      },
      touchControllerPath(): string {
        const origin = this.controller?.origin.value;
        const target = this.controller?.target.value;
        if (origin && target) {
          const originPoint = toSVGCoordinates(origin, this.$refs.touchVisuals as SVGSVGElement);
          const targetPoint = toSVGCoordinates(target, this.$refs.touchVisuals as SVGSVGElement);
          return `M${originPoint.x} ${originPoint.y}L${targetPoint.x} ${targetPoint.y}`;
        } else {
          return "";
        }
      },
    },
    mounted() {
      this.controller?.registerPointerDown(this.$refs.container as EventTarget);
    },
  });

  function toSVGCoordinates(clientXY: Vec2, svg: SVGSVGElement): SVGPoint {
    const point = svg.createSVGPoint();
    point.x = clientXY[0];
    point.y = clientXY[1];
    return point.matrixTransform(svg.getScreenCTM()?.inverse());
  }
</script>

<style lang="scss" scoped>
  .yard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    user-select: none;
    touch-action: none;

    svg.touch-visuals {
      position: absolute;
      width: 100%;
      height: 100%;
      user-select: none;
      touch-action: none;
      pointer-events: none;

      opacity: 0;
      &.active {
        opacity: 0.9;
      }

      .touch-origin {
        stroke: rgb(128, 128, 128);
        fill: rgba(200, 200, 200, 0.2);
      }
      .touch-target {
        fill: rgb(128, 128, 128);
        stroke: rgba(200, 200, 200, 0.2);
      }
      .touch-path {
        stroke: rgb(128, 128, 128);
      }
    }
  }
</style>
