<template>
  <aside>
    <RouterLink
      :to="{ name: 'Home' }"
      title="Home"
      class="logo-link lg:block"
      :class="{ hidden: $router.currentRoute.value.name !== 'Home' }"
    >
      <YLogo icon animated />
    </RouterLink>

    <template
      v-if="$yardAPI.store.roomId && $router.currentRoute.value.name !== 'Home'"
    >
      <YMenuSeparator class="lg:block hidden" />
      <YUserSettings />
    </template>

    <router-view name="Sidebar" />

    <SpeedDial
      :model="filteredItems"
      :tooltip-options="{ position: 'right' }"
      mask
      class="speed-dial-menu"
      show-icon="pi pi-bars"
      hide-icon="pi pi-times"
      button-class="p-button-rounded p-button-text"
      mask-class="y-sd-mask"
    />
  </aside>
</template>

<script lang="ts">
  import screenfull from "screenfull";

  import { defineComponent } from "vue";

  import { MenuItem } from "primevue/menuitem";
  import SpeedDial from "primevue/speeddial";

  import YLogo from "../YLogo.vue";
  import YMenuSeparator from "./YMenuSeparator.vue";
  import YUserSettings from "./YUserSettings.vue";

  export default defineComponent({
    name: "YMenu",
    components: { YUserSettings, YMenuSeparator, YLogo, SpeedDial },
    data() {
      return {
        items: [
          {
            icon: "pi pi-cog",
            label: "Moderate this Yard",
            command: () =>
              this.$router.push({
                name: "Moderation",
                params: { roomId: this.$yardAPI.store.roomId },
              }),
            visible: () =>
              !!this.$yardAPI.store.roomId &&
              this.$router.currentRoute.value.name !== "Moderation",
          },
          {
            icon: "pi pi-desktop",
            label: "Go to Yard",
            command: () =>
              this.$router.push({
                name: "Yard",
                params: { roomId: this.$yardAPI.store.roomId },
              }),
            visible: () =>
              !!this.$yardAPI.store.roomId &&
              this.$router.currentRoute.value.name !== "Yard",
          },
          {
            icon: "pi pi-window-maximize",
            label: "Enter Fullscreen",
            visible: () =>
              !!this.$yardAPI.store.roomId &&
              screenfull.isEnabled &&
              !this.isFullscreen,
            command: () => this.enterFullscreen(),
          },
          {
            icon: "pi pi-window-minimize",
            label: "Exit Fullscreen",
            visible: () =>
              !!this.$yardAPI.store.roomId &&
              screenfull.isEnabled &&
              this.isFullscreen,
            command: () => this.exitFullscreen(),
          },
          {
            icon: "pi pi-home",
            label: "Go Home",
            command: () => this.$router.push({ name: "Home" }),
          },
        ] as MenuItem[],
        isFullscreen: screenfull.isEnabled ? screenfull.isFullscreen : false,
      };
    },
    computed: {
      filteredItems(): any[] {
        return this.items.filter((item: any) =>
          item.visible ? item.visible() : true,
        );
      },
    },
    mounted() {
      if (screenfull.isEnabled) {
        screenfull.on("change", () => {
          this.isFullscreen = screenfull.isEnabled && screenfull.isFullscreen;
        });
      }
    },
    methods: {
      enterFullscreen() {
        if (screenfull.isEnabled) {
          screenfull.request();
        }
      },
      exitFullscreen() {
        if (screenfull.isEnabled) {
          screenfull.exit();
        }
      },
    },
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

    padding-top: 0.5rem;
    padding-bottom: 4.5rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    > ::v-deep(*) {
      flex-shrink: 0;
    }
    .logo-link {
      align-self: flex-start;
      padding: 0 calc((4rem - 50px) / 2) 0.5rem;
    }
    ::v-deep(.speed-dial-menu) {
      left: 0;
      bottom: 0;
      a {
        text-decoration: none;
      }
    }
  }
</style>
