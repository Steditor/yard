<template>
  <Button
    label="Reset"
    icon="pi pi-undo"
    @click="resetBackground"
    class="p-button-warning"
  />
  <Button
    label="Generate..."
    icon="pi pi-chevron-down"
    iconPos="right"
    class="ml-2"
    @click="(event) => this.$refs.generators.toggle(event)"
  />
  <Menu ref="generators" :model="generatorItems" :popup="true" />
  <YModBackgroundColorGenerator v-model:visible="showColorGeneratorDialog" />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Button from "primevue/button";
  import Menu from "primevue/menu";
  import { MenuItem } from "primevue/menuitem";

  import YModBackgroundColorGenerator from "./YModBackgroundColorGenerator.vue";

  export default defineComponent({
    name: "YModBackground",
    components: {
      Button,
      Menu,
      YModBackgroundColorGenerator,
    },
    data() {
      return {
        showColorGeneratorDialog: false,
        generatorItems: [
          {
            label: "Background Color",
            icon: "pi pi-palette",
            command: () => this.showColorGenerator(),
          },
        ] as MenuItem[],
      };
    },
    methods: {
      resetBackground() {
        if (
          this.$yardAPI.roomAPI.setSettings({
            backgroundCode: `<svg xmlns="http://www.w3.org/2000/svg"></svg>`,
          })
        ) {
          this.$toast.add({
            severity: "success",
            summary: "Background reset",
            detail: `The Yard background is back to being an empty white void.`,
            life: 2000,
          });
        }
      },
      showColorGenerator() {
        this.showColorGeneratorDialog = true;
      },
    },
  });
</script>
