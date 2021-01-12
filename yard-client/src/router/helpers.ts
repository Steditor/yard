import { NavigationGuardWithThis } from "vue-router";

import { vm } from "@/main";

export const connectToRoom: NavigationGuardWithThis<undefined> = async (to, from, next) => {
  if (await vm.$yardAPI.joinYard(to.params.roomId as string)) {
    next();
  } else {
    next({ name: "Home" });
  }
};
