<template>
  <div class="pixel-container">
    <div ref="pixelScrollContainer" class="pixel-scroll-container">
      <div class="inner-pixel-container">
        <YPixelSettings
          v-for="pixel in this.$yardAPI.store.myPixels()"
          :key="pixel[0]"
          :pixel="pixel[1]"
          :pixel-id="pixel[0]"
          class="mt-1"
          :overlay-scrollbars="overlayScrollbars"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import OverlayScrollbars from "overlayscrollbars";

  import { defineComponent } from "vue";

  import YPixelSettings from "./YPixelSettings.vue";

  export default defineComponent({
    name: "YYardSidebar",
    components: { YPixelSettings },
    data() {
      return {
        overlayScrollbars: undefined as OverlayScrollbars | undefined,
      };
    },
    mounted() {
      this.overlayScrollbars = OverlayScrollbars(
        this.$refs.pixelScrollContainer as HTMLDivElement,
        {
          resize: "none",
          className: "os-theme-light",
          overflowBehavior: {
            x: "hidden",
            y: "scroll",
          },
        },
      );
    },
  });
</script>

<style lang="scss" scoped>
  .pixel-container {
    flex-shrink: 1;
    flex-basis: 100%;
    width: 100%;
  }
  .pixel-scroll-container {
    display: block;
    width: 100%;
    height: 100%;
  }
  .inner-pixel-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
</style>
