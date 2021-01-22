<template>
  <span class="copyable p-shadow-3">
    {{content}}
    <Button icon="pi pi-copy" class="p-button-rounded p-button-text" @click="copy()" />
  </span>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Button from "primevue/button/Button";

  export default defineComponent({
    name: "YCopyable",
    components: { Button },
    props: {
      content: {
        type: String,
        required: true,
      },
    },
    methods: {
      copy() {
        navigator.clipboard.writeText(this.content);
      },
    },
  });
</script>

<style lang="scss">
  .copyable {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    color: var(--primary-color);
    .p-button.p-button-rounded {
      width: 1em;
      height: 1em;
    }
  }
</style>
