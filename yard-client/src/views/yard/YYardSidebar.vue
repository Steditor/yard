<template>
  <Button title="Show/Hide Names" :icon="icon" class="p-button-text p-button-secondary" @click="toggleViewNames" />
  <YPixelSettings v-for="pixel in pixels" :key="pixel[0]" :pixel="pixel[1]" :pixel-id="pixel[0]" class="p-mt-1" />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

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
        const all = this.$yardAPI.store.pixels as Map<string, PixelStore>;
        return new Map([ ...all.entries() ].filter((entry) => entry[1].player === this.$yardAPI.store.sessionId));
      },
    },
  });
</script>
