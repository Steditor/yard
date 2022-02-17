<template>
  <path d="" stroke-width="2" stroke="black" fill="none" />
</template>

<script lang="ts">
  import gsap from "gsap";

  import { defineComponent } from "vue";

  import PixelStore from "../../yardAPI/store/PixelStore";

  export default defineComponent({
    name: "YRope",
    computed: {
      path(): string {
        const orderedPixels = this.$yardAPI.store.gameData.orderedPixels.map(
          (pixelId) => this.$yardAPI.store.pixels.get(pixelId),
        );
        if (orderedPixels.length === 0) {
          return "";
        }
        const pixel2Pos = (pixel?: PixelStore) => {
          return `${pixel?.x ?? 0},${pixel?.y ?? 0}`;
        };
        let d = "M" + pixel2Pos(orderedPixels[0]);
        let last = orderedPixels[0];
        let next: PixelStore | undefined;
        const me = this.$yardAPI.store.sessionId;
        const hideSelf = this.$yardAPI.store.gameSettings.hideSelf;
        for (let i = 1; i <= orderedPixels.length; i++) {
          next = orderedPixels[i % orderedPixels.length];
          if (hideSelf && (last?.player === me || next?.player === me)) {
            d += "M";
          } else {
            d += "L";
          }
          d += pixel2Pos(next);
          last = next;
        }
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
