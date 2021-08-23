<template>
  <div class="y-full-size y-flex-center yard-container" ref="container">
    <svg :viewBox="viewBox" preserveAspectRatio="xMidYMid meet">
      <rect :x="0" :y="0" :width="viewWidth" :height="viewHeight" fill="white" />
      <YRope v-if="$yardAPI.store.gameSettings.rope" />
      <YPixel v-for="pixel in $yardAPI.store.pixels" :key="pixel[0]" :pixel="pixel[1]" :pixel-id="pixel[0]" />
    </svg>
  </div>
</template>

<script lang="ts">
  import { TouchController } from "@/yardAPI/controller/TouchController";
  import { MultiController } from "@/yardAPI/controller/MultiController";

  import YPixel from "@/views/yard/YPixel.vue";
  import YRope from "@/views/yard/YRope.vue";
  import { defineComponent } from "vue";

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
    },
    mounted() {
      const controllers: TouchController[] = [];
      if (this.$yardAPI.controller instanceof TouchController) {
        controllers.push(this.$yardAPI.controller);
      } else if (this.$yardAPI.controller instanceof MultiController) {
        controllers.push(
          ...this.$yardAPI.controller.controllers.filter((c) => c instanceof TouchController) as TouchController[],
        );
      }
      controllers.forEach((c) => c.registerPointerDown(this.$refs.container as EventTarget));
    },
  });
</script>

<style lang="scss" scoped>
  .yard-container {
    user-select: none;
  }
</style>
