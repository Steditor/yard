<template>
  <div class="y-full-size y-flex-center">
    <div class="p-card login-card">
      <Accordion :active-index="0">
        <AccordionTab>
          <template #header>
            <i class="pi pi-sign-in"></i>
            <span class="ml-3">Join a Yard</span>
          </template>
          <YJoinPanel />
        </AccordionTab>
        <AccordionTab>
          <template #header>
            <i class="pi pi-plus"></i>
            <span class="ml-3">Create a Yard</span>
          </template>
          <YCreatePanel />
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Accordion from "primevue/accordion";
  import AccordionTab from "primevue/accordiontab";

  import YJoinPanel from "./YJoinPanel.vue";
  import YCreatePanel from "./YCreatePanel.vue";

  export default defineComponent({
    name: "YHome",
    components: { YCreatePanel, YJoinPanel, Accordion, AccordionTab },
  });
</script>

<style lang="scss" scoped>
  .login-card {
    max-width: 500px;
  }
  i, span {
    vertical-align: middle;
  }
</style>
