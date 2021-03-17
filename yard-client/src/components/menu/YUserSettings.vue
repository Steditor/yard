<template>
  <Button title="User Settings" icon="pi pi-user" class="p-button-text p-button-secondary" @click="toggleUserOverlay" />
  <OverlayPanel ref="userOverlay" class="user-settings">
    <h3 class="p-mt-0">User Settings</h3>
    <div class="p-field p-fluid">
    <span class="p-float-label p-input-icon-right">
      <i class="pi pi-user" />
      <InputText id="username" type="text" v-model="username" />
      <label for="username">Choose a Username</label>
    </span>
    </div>
  </OverlayPanel>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Button from "primevue/button";
  import InputText from "primevue/inputtext";
  import OverlayPanel from "primevue/overlaypanel";

  export default defineComponent({
    name: "YUserSettings",
    components: { OverlayPanel, InputText, Button },
    methods: {
      toggleUserOverlay(event: MouseEvent) {
        (this.$refs.userOverlay as OverlayPanel).toggle(event);
      },
    },
    computed: {
      username: {
        get(): string {
          return this.$yardAPI.store?.me()?.name ?? "";
        },
        set(value: string) {
          this.$yardAPI.playerAPI.setUsername(value, true);
        },
      },
    },
  });
</script>

<style lang="scss" scoped>
  .user-settings {
    width: 300px;
  }
</style>
