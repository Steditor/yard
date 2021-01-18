<template>
  <RouterLink :to="$attrs.to" v-bind="$attrs" class="y-button-link p-component">
    <span :class="icon"></span>
  </RouterLink>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "YMenuItem",
    props: {
      icon: String,
    },
  });
</script>

<style lang="scss">
  // from .p-button / .p-button-icon-only
  .y-button-link {
    // component:
    margin: 0;
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    vertical-align: bottom;
    text-align: center;
    overflow: hidden;
    position: relative;
    justify-content: center;
    // theme:
    border: 0 none;
    width: 3rem;
    padding: 0.714rem;
    font-size: 1rem;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s, background-size 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);
    border-radius: 4px;
    &:focus {
      outline: 0 none;
      outline-offset: 0;
      box-shadow: none;
    }
    // own:
    text-decoration: none;
  }
  // from .p-button.p-button-text
  .y-button-link {
    background-color: transparent;
    color: #9FA8DA;
    border-color: transparent;
    &:hover {
      background: rgba(159, 168, 218, 0.04);
      border-color: transparent;
      color: #9FA8DA;
    }
    &:active, &.router-link-active {
      background: rgba(159, 168, 218, 0.16);
      border-color: transparent;
      color: #9FA8DA;
    }
  }
</style>
