<template>
  <path d="" stroke-width="2" stroke="black" fill="none" />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import gsap from "gsap";

  export default defineComponent({
    name: "YRope",
    computed: {
      path(): string {
        const orderedPixels = this.$yardAPI.store.gameData.orderedPixels;
        if (orderedPixels.length === 0) {
          return "";
        }
        const pixel2Pos = (pixelId: string) => {
          const pixel = this.$yardAPI.store.pixels.get(pixelId);
          return `${pixel?.x ?? 0},${pixel?.y ?? 0}`;
        };
        let d = "M" + pixel2Pos(orderedPixels[0]) + "L";
        for (let i = 1; i < orderedPixels.length; i++) {
          d += " " + pixel2Pos(orderedPixels[i]);
        }
        d += "z";
        return d;
      },
    },
    watch: {
      path: {
        handler(d: string): void {
          if (this.$el) {
            gsap.to(this.$el, { attr: { d }, duration: 0.3 });
          }
        },
      },
    },
    mounted() {
      gsap.set(this.$el, { attr: { d: this.path } });
    },
  });
</script>
