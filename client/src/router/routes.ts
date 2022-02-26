import { RouteRecordRaw } from "vue-router";

import YHome from "../views/home/YHome.vue";
import YModeration from "../views/moderation/YModeration.vue";
import YYardSidebar from "../views/yard/YYardSidebar.vue";
import YYardView from "../views/yard/YYardView.vue";
import { connectToRoom } from "./helpers";

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
      default: YYardView,
      Sidebar: YYardSidebar,
    },
  },
];
