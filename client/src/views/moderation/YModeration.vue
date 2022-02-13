<template>
  <div v-if="isAdmin()" class="grid">
    <div class="col-12 lg:col-6">
      <YModInfo />
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

  import YModGameSettings from "./YModGameSettings.vue";
  import YModInfo from "./YModInfo.vue";
  import YModLogin from "./YModLogin.vue";
  import YModPeople from "./YModPeople.vue";
  import YModSettings from "./YModSettings.vue";

  export default defineComponent({
    name: "YModeration",
    components: {
      YModGameSettings,
      YModInfo,
      YModLogin,
      YModPeople,
      YModSettings,
    },
    methods: {
      isAdmin(): boolean {
        return this.$yardAPI.store.me()?.admin ?? false;
      },
    },
  });
</script>
