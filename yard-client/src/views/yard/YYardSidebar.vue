<template>
  <Button title="Show/Hide Names" :icon="icon" class="p-button-text p-button-secondary" @click="toggleViewNames" />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Button from "primevue/button/Button";

  export default defineComponent({
    name: "YYardSidebar",
    components: { Button },
    methods: {
      toggleViewNames() {
        this.$yardAPI.store.localSettings.showNames = !this.$yardAPI.store.localSettings.showNames;
      },
    },
    computed: {
      icon(): string {
        return "pi " + (this.$yardAPI.store.localSettings.showNames ? "pi-eye" : "pi-eye-slash");
      },
    },
  });
</script>
