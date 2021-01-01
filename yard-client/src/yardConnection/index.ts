import { App } from "vue";

import YardConnection from "./YardConnection";

export default {
  install: (app: App): void => {
    app.config.globalProperties.$yardConnection = new YardConnection();
  },
};
