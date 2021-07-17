<template>
  <div v-if="isAdmin()" class="grid">
    <div class="col-12 lg:col-6">
      <YModInfo  />
      <YModSettings class="mt-3" />
      <YModGameSettings class="mt-3" />
    </div>
    <div class="col-12 lg:col-6">
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
