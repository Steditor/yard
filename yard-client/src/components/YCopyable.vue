<template>
  <span class="copyable shadow-3">
    <span @click="revealSecret = !revealSecret" :class="{ secret }"><slot :content="content">{{visibleContent}}</slot></span>
    <Button icon="pi pi-copy" class="p-button-rounded p-button-text" @click="copy()" />
  </span>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Button from "primevue/button";

  export default defineComponent({
    name: "YCopyable",
    components: { Button },
    props: {
      content: {
        type: String,
        required: true,
      },
      secret: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        revealSecret: false,
      };
    },
    computed: {
      visibleContent() {
        return this.secret && !this.revealSecret ? "[click to reveal secret]" : this.content;
      },
    },
    methods: {
      copy() {
        navigator.clipboard.writeText(this.content);
        const copyContent = this.secret && !this.revealSecret ? "A hidden string" : `'${this.content}'`;
        this.$toast.add({
          severity: "success",
          summary: "Copied",
          detail: `${copyContent} was copied to your clipboard.`,
          life: 2000,
        });
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
    .secret {
      cursor: pointer;
    }
  }
</style>
