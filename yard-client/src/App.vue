<template>
  <div class="content">
    <router-view/>
  </div>
  <YMenu/>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import YMenu from "@/components/menu/YMenu.vue";

  export default defineComponent({
    components: { YMenu },
    data() {
      return {
        visible: true,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @use "src/styles/vars" as vars;

  .content {
    position: absolute;
    left: vars.$menuWidth;
    top: 0;
    right: 0;
    bottom: 0;
  }
</style>
