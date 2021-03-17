<template>
  <div class="y-full-size y-flex-center yard-container">
    <svg :viewBox="viewBox" preserveAspectRatio="xMidYMid meet">
      <rect :x="-pixelSize" :y="-pixelSize" :width="viewWidth" :height="viewHeight" fill="white" />
      <YPixel v-for="pixel in $yardAPI.store.pixels" :key="pixel[0]" :pixel="pixel[1]" />
    </svg>
  </div>
</template>

<script lang="ts">
  import YPixel from "@/views/yard/YPixel.vue";
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "YYard",
    components: { YPixel },
    computed: {
      pixelSize(): number {
        return 5;
      },
      viewWidth(): number {
        return this.$yardAPI.store.settings.canvasWidth + 2 * this.pixelSize;
      },
      viewHeight(): number {
        return this.$yardAPI.store.settings.canvasHeight + 2 * this.pixelSize;
      },
      viewBox(): string {
        return `-${this.pixelSize} -${this.pixelSize} ${this.viewWidth} ${this.viewHeight}`;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .yard-container {
    user-select: none;
  }
</style>
