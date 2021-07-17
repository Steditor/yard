<template>
  <ColorPicker v-model="pixelColor" @mouseover="selectAndHighlightPixel" @mouseout="unhighlightPixel" class="pixel-color-picker" :class="{ active }" />
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";

  import ColorPicker from "primevue/colorpicker";

  import PixelStore from "@/yardAPI/store/PixelStore";

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
    },
    methods: {
      selectAndHighlightPixel(): void {
        this.$yardAPI.controller.activePixel = this.pixelId;
        this.$yardAPI.store.pixelHighlight = this.pixelId;
      },
      unhighlightPixel(): void {
        this.$yardAPI.store.pixelHighlight = null;
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
