<template>
  <div class="y-full-size y-flex-center">
    <svg :viewBox="viewBox" preserveAspectRatio="xMidYMid meet">
      <rect :x="-pixelSize" :y="-pixelSize" :width="viewWidth" :height="viewHeight" fill="white" />
    </svg>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "YYard",
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
</style>
