<template>
  <div v-if="isAdmin()" class="p-grid">
    <div class="p-col-12 p-lg-6"><YModInfo  /></div>
    <div class="p-col-12 p-lg-6"><YModPeople /></div>
  </div>
  <YLogin v-else />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import YLogin from "@/views/moderation/YLogin.vue";
  import YModInfo from "@/views/moderation/YModInfo.vue";
  import YModPeople from "@/views/moderation/YModPeople.vue";

  export default defineComponent({
    name: "YModeration",
    components: { YModPeople, YModInfo, YLogin },
    methods: {
      isAdmin(): boolean {
        return this.$yardAPI.store.me()?.admin ?? false;
      },
    },
  });
</script>

<style lang="scss" scoped>
</style>
