<template>
  <div class="y-full-size y-flex-center">
    <p>Hi there in room {{$yardConnection.room.id}}!</p>
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
