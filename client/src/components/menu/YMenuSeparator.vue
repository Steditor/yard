<template>
  <div class="y-menu-separator mt-3 mb-3 md:mt-1 md:mb-1 sm:mt-0 sm:mb-0"></div>
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
