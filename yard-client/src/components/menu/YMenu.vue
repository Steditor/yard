<template>
  <aside>
    <router-link :to="{ name: 'Home' }" title="Home" class="logo-link"><YLogo icon animated /></router-link>
    <Button icon="pi pi-home" class="p-button-text p-button-secondary" />
  </aside>
</template>

<script lang="ts">
  import YLogo from "@/components/YLogo.vue";
  export default {
    name: "YMenu",
    components: { YLogo },
  };
</script>

<style lang="scss" scoped>
  aside {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 4rem;
    background-color: var(--surface-b);

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
