<template>
  <div class="y-menu-separator p-mt-3 p-mb-3"></div>
</template>

<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "YMenuSeparator",
  });
</script>

<style lang="scss">
  .y-menu-separator {
    width: 100%;
    border-top: 1px solid var(--surface-c);
  }
</style>
