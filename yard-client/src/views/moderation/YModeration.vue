<template>
  <div v-if="isAdmin()" class="p-grid">
    <div class="p-col-12 p-lg-6">
      <YModInfo  />
      <YModSettings class="p-mt-3" />
      <YModGameSettings class="p-mt-3" />
    </div>
    <div class="p-col-12 p-lg-6">
      <YModPeople />
    </div>
  </div>
  <YModLogin v-else />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import YModGameSettings from "@/views/moderation/YModGameSettings.vue";
  import YModInfo from "@/views/moderation/YModInfo.vue";
  import YModLogin from "@/views/moderation/YModLogin.vue";
  import YModPeople from "@/views/moderation/YModPeople.vue";
  import YModSettings from "@/views/moderation/YModSettings.vue";

  export default defineComponent({
    name: "YModeration",
    components: { YModGameSettings, YModInfo, YModLogin, YModPeople, YModSettings },
    methods: {
      isAdmin(): boolean {
        return this.$yardAPI.store.me()?.admin ?? false;
      },
    },
  });
</script>

<style lang="scss" scoped>
</style>
