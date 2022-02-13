<template>
  <div class="y-full-size flex">
    <div class="y-flex-center-wrapper">
      <router-link
        v-if="$yardAPI.store.roomId"
        :to="{ name: 'Yard', params: { roomId: $yardAPI.store.roomId } }"
        custom
        v-slot="{ navigate }"
      >
        <Button
          @click="navigate"
          label="Go back to your current Yard"
          icon="pi pi-chevron-left"
          iconPos="left"
          class="p-button-text mb-2"
        />
      </router-link>
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
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Accordion from "primevue/accordion";
  import AccordionTab from "primevue/accordiontab";
  import Button from "primevue/button";

  import YCreatePanel from "./YCreatePanel.vue";
  import YJoinPanel from "./YJoinPanel.vue";

  export default defineComponent({
    name: "YHome",
    components: { YCreatePanel, YJoinPanel, Accordion, AccordionTab, Button },
  });
</script>

<style lang="scss" scoped>
  .login-card {
    max-width: 500px;
    min-width: 300px;
  }
  i,
  span {
    vertical-align: middle;
  }
</style>
