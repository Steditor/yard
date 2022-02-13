import { App } from "vue";

import YardAPI from "./YardAPI";

export default {
  install: (app: App): void => {
    app.config.globalProperties.$yardAPI = new YardAPI();
  },
};
