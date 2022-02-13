import { RouteRecordRaw } from "vue-router";

import YHome from "../views/home/YHome.vue";
import { connectToRoom } from "./helpers";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const YModeration = () =>
  import(
    /* webpackChunkName: "moderation" */ "../views/moderation/YModeration.vue"
  );
const YYard = () =>
  import(/* webpackChunkName: "yard" */ "../views/yard/YYard.vue");
const YYardSidebar = () =>
  import(
    /* webpackChunkName: "yardSidebar" */ "../views/yard/YYardSidebar.vue"
  );
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: YHome,
  },
  {
    path: "/moderation/:roomId",
    name: "Moderation",
    beforeEnter: connectToRoom,
    components: {
      default: YModeration,
    },
  },
  {
    path: "/yard/:roomId",
    name: "Yard",
    beforeEnter: connectToRoom,
    components: {
      default: YYard,
      Sidebar: YYardSidebar,
    },
  },
];
