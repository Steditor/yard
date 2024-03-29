const fs = require("fs");

const settingsString = fs.readFileSync("local.config.json", "utf8");
const settings = JSON.parse(settingsString);

module.exports = {
  apps: [
    {
      name: "Yard.io",
      script: "./index.js",
      env: Object.assign(
        {
          NODE_ENV: "production",
        },
        settings,
      ),
      cwd: "./server/dist",
      interpreter_args: "--experimental-json-modules",
    },
  ],
};
