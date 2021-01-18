<template>
  <div class="y-full-size y-flex-center" v-if="isAdmin()">
    <p>Hello {{$yardAPI.store.me()?.name}} in room {{$yardAPI.store.roomId}}!</p>
  </div>
  <YLogin v-else />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import YLogin from "@/views/moderation/YLogin.vue";

  export default defineComponent({
    name: "YModeration",
    components: { YLogin },
    methods: {
      isAdmin(): boolean {
        return this.$yardAPI.store.me()?.admin ?? false;
      },
    },
  });
</script>

<style lang="scss" scoped>
</style>
