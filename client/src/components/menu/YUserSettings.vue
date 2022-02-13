<template>
  <Button
    title="User Settings"
    icon="pi pi-user"
    class="p-button-text p-button-secondary"
    @click="toggleUserOverlay"
  />
  <OverlayPanel ref="userOverlay" class="user-settings">
    <div class="p-fluid">
      <div class="field">
        <span class="p-float-label p-input-icon-right">
          <i class="pi pi-user" />
          <InputText id="username" type="text" v-model="username" />
          <label for="username">Choose a Username</label>
        </span>
      </div>
      <div class="field-checkbox mb-0">
        <Checkbox id="showNames" v-model="showNames" :binary="true" />
        <label for="showNames">Show Player Names</label>
      </div>
    </div>
  </OverlayPanel>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Button from "primevue/button";
  import Checkbox from "primevue/checkbox";
  import InputText from "primevue/inputtext";
  import OverlayPanel from "primevue/overlaypanel";

  export default defineComponent({
    name: "YUserSettings",
    components: { OverlayPanel, InputText, Button, Checkbox },
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
      showNames: {
        get(): boolean {
          return this.$yardAPI.store.localSettings.showNames;
        },
        set(value: boolean) {
          this.$yardAPI.store.localSettings.showNames = value;
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
