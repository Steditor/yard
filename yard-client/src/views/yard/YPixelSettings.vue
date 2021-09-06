<template>
  <ColorPicker v-model="pixelColor" @pointerover="selectAndHighlightPixel" @pointerout="unhighlightPixel" class="pixel-color-picker" :class="{ active }" />
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";

  import ColorPicker from "primevue/colorpicker";

  import PixelStore from "@/yardAPI/store/PixelStore";
  import OverlayScrollbars from "overlayscrollbars";

  export default defineComponent({
    name: "YPixelSettings",
    components: { ColorPicker },
    props: {
      pixel: {
        type: Object as PropType<PixelStore>,
        required: true,
      },
      pixelId: {
        type: String,
        required: true,
      },
      overlayScrollbars: {
        type: Object as PropType<OverlayScrollbars | undefined>,
      },
    },
    methods: {
      selectAndHighlightPixel(): void {
        this.$yardAPI.controller.activePixel = this.pixelId;
        this.$yardAPI.store.setPixelHighlight(this.pixelId, false);
      },
      unhighlightPixel(): void {
        this.$yardAPI.store.setPixelHighlight(null);
      },
    },
    computed: {
      pixelColor: {
        get(): string {
          return this.pixel.color ?? "";
        },
        set(value: string) {
          this.$yardAPI.pixelAPI.setColor(this.pixelId, "#" + value);
        },
      },
      active(): boolean {
        return this.$yardAPI.controller.activePixel === this.pixelId;
      },
    },
    watch: {
      active(): void {
        if (this.active && this.overlayScrollbars) {
          this.overlayScrollbars.scroll({ el: this.$el, scroll: "ifneeded", block: "nearest" }, 500);
        }
      },
    },
  });
</script>

<style lang="scss" scoped>
  .pixel-color-picker {
    ::v-deep(input) {
      transition: border-radius ease-in-out 0.2s;
    }
    &.active ::v-deep(input) {
      box-shadow: inset 0 0 0 1px #9FA8DA;
      border-radius: 10px;
    }
  }
</style>
