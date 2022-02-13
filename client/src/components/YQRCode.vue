<template>
  <canvas ref="canvas" class="qrcanvas"></canvas>
</template>

<script lang="ts">
  import QRCode, { QRCodeRenderersOptions } from "qrcode";

  import { PropType, defineComponent } from "vue";

  export default defineComponent({
    name: "YQRCode",
    props: {
      content: {
        type: String,
        required: true,
      },
      options: {
        type: Object as PropType<QRCodeRenderersOptions>,
        required: false,
      },
    },
    mounted() {
      QRCode.toCanvas(this.$refs.canvas, this.content, this.options);
    },
  });
</script>

<style lang="scss" scoped>
  .qrcanvas {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }
</style>
