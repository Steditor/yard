<template>
  <div class="y-full-size y-flex-center yard-container">
    <svg :viewBox="viewBox" preserveAspectRatio="xMidYMid meet">
      <rect :x="0" :y="0" :width="viewWidth" :height="viewHeight" fill="white" />
      <YRope v-if="$yardAPI.store.gameSettings.rope" />
      <YPixel v-for="pixel in $yardAPI.store.pixels" :key="pixel[0]" :pixel="pixel[1]" :pixel-id="pixel[0]" />
    </svg>
  </div>
</template>

<script lang="ts">
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
  });
</script>

<style lang="scss" scoped>
  .yard-container {
    user-select: none;
  }
</style>
