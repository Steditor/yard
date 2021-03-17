<template>
  <div class="y-full-size y-flex-center">
    <div class="p-card login-card">
      <TabView>
        <TabPanel>
          <template #header>
            <i class="pi pi-sign-in"></i>
            <span class="p-ml-3">Join a Yard</span>
          </template>
          <YJoinPanel />
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-plus"></i>
            <span class="p-ml-3">Create a Yard</span>
          </template>
          <YCreatePanel />
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import TabView from "primevue/tabview";
  import TabPanel from "primevue/tabpanel";

  import YJoinPanel from "./YJoinPanel.vue";
  import YCreatePanel from "./YCreatePanel.vue";

  export default defineComponent({
    name: "YHome",
    components: { YCreatePanel, YJoinPanel, TabView, TabPanel },
  });
</script>

<style lang="scss" scoped>
  .login-card {
    width: 500px;
  }
  i, span {
    vertical-align: middle;
  }
</style>
