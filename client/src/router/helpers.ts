import { NavigationGuardWithThis } from "vue-router";

import { vm } from "../main";
import { JoinYardResult } from "../yardAPI/YardAPI";

export const connectToRoom: NavigationGuardWithThis<undefined> = async (
  to,
  from,
  next,
) => {
  if (
    (await vm.$yardAPI.joinYard(to.params.roomId as string)) ===
    JoinYardResult.SUCCESSFUL
  ) {
    next();
  } else {
    next({ name: "Home" });
  }
};
