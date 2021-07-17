<template>
  <aside>
    <RouterLink :to="{ name: 'Home' }" title="Home" class="logo-link"><YLogo icon animated /></RouterLink>
    <YMenuItem :to="{ name: 'Home' }" title="Home" icon="pi pi-home" />

    <template v-if="$yardAPI.store.roomId">
      <YMenuSeparator />
      <YUserSettings />
    </template>

    <router-view name="Sidebar" />

    <div style="flex: 1" />
    <YMenuSeparator />
    <template v-if="$yardAPI.store.roomId">
      <YMenuItem :to="{ name: 'Yard', params: { roomId: $yardAPI.store.roomId } }" title="Yard" icon="pi pi-desktop" class="mb-1" />
      <YMenuItem :to="{ name: 'Moderation', params: { roomId: $yardAPI.store.roomId } }" title="Settings" icon="pi pi-cog" class="mb-3" />
    </template>
  </aside>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import YLogo from "@/components/YLogo.vue";
  import YMenuItem from "@/components/menu/YMenuItem.vue";
  import YMenuSeparator from "@/components/menu/YMenuSeparator.vue";
  import YUserSettings from "@/components/menu/YUserSettings.vue";

  export default defineComponent({
    name: "YMenu",
    components: { YUserSettings, YMenuItem, YMenuSeparator, YLogo },
  });
</script>

<style lang="scss" scoped>
  @use "src/styles/vars" as vars;

  aside {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: vars.$menuWidth;
    background-color: var(--surface-c);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    > ::v-deep(*) {
      flex-shrink: 0;
    }
  }
  .logo-link {
    align-self: flex-start;
    padding: calc((4rem - 50px) / 2);
  }
</style>
