<template>
  <aside>
    <RouterLink :to="{ name: 'Home' }" title="Home" class="logo-link"><YLogo icon animated /></RouterLink>
    <YMenuItem :to="{ name: 'Home' }" title="Home" icon="pi pi-home" />
    <router-view name="Sidebar" />
  </aside>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import YLogo from "@/components/YLogo.vue";
  import YMenuItem from "@/components/menu/YMenuItem.vue";

  export default defineComponent({
    name: "YMenu",
    components: { YMenuItem, YLogo },
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
  }
  .logo-link {
    align-self: flex-start;
    padding: calc((4rem - 50px) / 2);
  }
</style>
