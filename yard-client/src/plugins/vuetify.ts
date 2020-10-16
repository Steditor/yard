import Vue from "vue";
import Vuetify from "vuetify/lib";
import de from "vuetify/src/locale/de";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { de },
    current: "de",
  },
  icons: {
    iconfont: "fa",
  },
  theme: {
    dark: true,
  },
});
