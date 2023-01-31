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
  <YModBackgroundAxisGenerator v-model:visible="showAxisGeneratorDialog" />
  <Button
    label="Edit SVG"
    icon="pi pi-pencil"
    class="ml-2"
    @click="showSVGEditDialog = true"
  />
  <YModBackgroundEditor v-model:visible="showSVGEditDialog" />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Button from "primevue/button";
  import Menu from "primevue/menu";

  import YModBackgroundAxisGenerator from "./YModBackgroundAxisGenerator.vue";
  import YModBackgroundColorGenerator from "./YModBackgroundColorGenerator.vue";
  import YModBackgroundEditor from "./YModBackgroundEditor.vue";

  // import { MenuItem } from "primevue/menuitem";
  type MenuItem = any; // can't be imported at the moment

  export default defineComponent({
    name: "YModBackground",
    components: {
      Button,
      Menu,
      YModBackgroundAxisGenerator,
      YModBackgroundColorGenerator,
      YModBackgroundEditor,
    },
    data() {
      return {
        showSVGEditDialog: false,
        showColorGeneratorDialog: false,
        showAxisGeneratorDialog: false,
        generatorItems: [
          {
            label: "Coordinate System",
            icon: "pi pi-arrows-h",
            command: () => this.showAxisGenerator(),
          },
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
      showAxisGenerator() {
        this.showAxisGeneratorDialog = true;
      },
    },
  });
</script>
