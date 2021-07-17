<template>
  <Button title="Show/Hide Names" :icon="icon" class="p-button-text p-button-secondary" @click="toggleViewNames" />
  <div class="pixel-container">
    <div ref="pixelScrollContainer" class="pixel-scroll-container">
      <div class="inner-pixel-container">
        <YPixelSettings v-for="pixel in pixels" :key="pixel[0]" :pixel="pixel[1]" :pixel-id="pixel[0]" class="mt-1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import OverlayScrollbars from "overlayscrollbars";

  import Button from "primevue/button";

  import YPixelSettings from "@/views/yard/YPixelSettings.vue";
  import PixelStore from "@/yardAPI/store/PixelStore";

  export default defineComponent({
    name: "YYardSidebar",
    components: { YPixelSettings, Button },
    methods: {
      toggleViewNames() {
        this.$yardAPI.store.localSettings.showNames = !this.$yardAPI.store.localSettings.showNames;
      },
    },
    computed: {
      icon(): string {
        return "pi " + (this.$yardAPI.store.localSettings.showNames ? "pi-eye" : "pi-eye-slash");
      },
      pixels(): Map<string, PixelStore> {
        return new Map(
          Array.from(this.$yardAPI.store.pixels.entries())
            .filter(([ , pixel ]) => pixel.player === this.$yardAPI.store.sessionId),
        );
      },
    },
    mounted() {
      OverlayScrollbars(this.$refs.pixelScrollContainer as HTMLDivElement, {
        resize: "none",
        className: "os-theme-light",
        overflowBehavior: {
          x: "hidden",
          y: "scroll",
        },
      });
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
