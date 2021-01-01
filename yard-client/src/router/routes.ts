import { RouteRecordRaw } from "vue-router";

import YHome from "@/views/home/YHome.vue";
import { connectToRoom } from "@/router/helpers";

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
    component: () => import(/* webpackChunkName: "moderation" */ "../views/moderation/YModeration.vue"),
  },
  {
    path: "/yard/:roomId",
    name: "Yard",
    beforeEnter: connectToRoom,
    component: () => import(/* webpackChunkName: "yard" */ "../views/yard/YYard.vue"),
  },
];
