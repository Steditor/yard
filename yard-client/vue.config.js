const fs = require("fs");

const settingsString = fs.readFileSync("../local.config.json", "utf8");
const settings = JSON.parse(settingsString);

module.exports = {
  outputDir: settings["VUE_DIST_DIR"],
  devServer: {
    port: settings["VUE_DEV_SERVER_PORT"],
  },
  transpileDependencies: [
    "vuetify",
  ],
};
