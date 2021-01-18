<template>
  <div class="y-full-size y-flex-center">
    <p>Hello {{$yardAPI.store.me()?.name}} in room {{$yardAPI.store.roomId}}!</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "YYard",
  });
</script>

<style lang="scss" scoped>
</style>
