<template>
  <ColorPicker v-model="pixelColor" />
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";

  import ColorPicker from "primevue/colorpicker/ColorPicker";

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
    },
    computed: {
      pixelColor: {
        get(): string {
          console.log(this.pixel.color);
          return this.pixel.color ?? "";
        },
        set(value: string) {
          this.$yardAPI.pixelAPI.setColor(this.pixelId, "#" + value);
        },
      },
    },
  });
</script>
