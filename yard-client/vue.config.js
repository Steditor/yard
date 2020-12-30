const fs = require("fs");
const path = require("path");

const settingsString = fs.readFileSync("../local.config.json", "utf8");
const settings = JSON.parse(settingsString);

const faviconGenerator = fs.readFileSync("../logo/favicon/html_code.html", "utf8");

module.exports = {
  outputDir: settings.VUE_DIST_DIR,
  devServer: {
    port: settings.VUE_DEV_SERVER_PORT,
  },
  chainWebpack: config => {
    config.plugin("html").tap((args) => {
      args[0].title = "Yard";
      args[0].faviconGenerator = faviconGenerator;
      return args;
    });
    config.plugins.has("copy") && config.plugin("copy").tap(([ patterns ]) => {
      const to = patterns[0].to;
      patterns[0].force = true; // so the original `/public` folder keeps priority

      // add other locations.
      patterns.unshift({
        context: path.resolve(__dirname, "../logo/favicon/"),
        from: "*.{png,xml,ico,svg,webmanifest}",
        to,
        toType: "dir",
      });
      return [ patterns ];
    });
  },
};
