<template>
  <y-menu-separator />
  <Button title="User Settings" icon="pi pi-user" class="p-button-text p-button-secondary" @click="toggleUserOverlay" />
  <OverlayPanel ref="userOverlay" class="user-settings">
    <h3 class="p-mt-0">User Settings</h3>
    <div class="p-field p-fluid">
    <span class="p-float-label p-input-icon-right">
      <i class="pi pi-user" />
      <InputText id="username" type="text" v-model="username" @keyup.enter="joinYard()" />
      <label for="username">Choose a Username</label>
    </span>
    </div>
  </OverlayPanel>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import OverlayPanel from "primevue/overlaypanel/OverlayPanel";

  import YMenuSeparator from "@/components/menu/YMenuSeparator.vue";

  export default defineComponent({
    name: "YYardMenu",
    components: { YMenuSeparator },
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
