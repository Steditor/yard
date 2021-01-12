<template>
  <div class="y-full-size y-flex-center">
    <p>Hi there in room {{$yardAPI.room.id}}!</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "YModeration",
  });
</script>

<style lang="scss" scoped>
</style>
