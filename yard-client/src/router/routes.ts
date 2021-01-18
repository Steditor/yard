import { RouteRecordRaw } from "vue-router";

import { connectToRoom } from "@/router/helpers";

import YHome from "@/views/home/YHome.vue";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const YModeration = () => import(/* webpackChunkName: "moderation" */ "../views/moderation/YModeration.vue");
const YYard = () => import(/* webpackChunkName: "yard" */ "../views/yard/YYard.vue");
const YYardMenu = () => import(/* webpackChunkName: "yardMenu" */ "../views/yard/YYardMenu.vue");
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
    component: YModeration,
  },
  {
    path: "/yard/:roomId",
    name: "Yard",
    beforeEnter: connectToRoom,
    components: {
      default: YYard,
      Sidebar: YYardMenu,
    },
  },
];
