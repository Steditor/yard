<template>
  <div class="y-menu-separator"></div>
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
    margin: 1rem 0;
  }
</style>
