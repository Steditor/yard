module.exports = {
    apps: [{
        name: "Yard.io",
        script: "./yard-server/dist/src/index.js",
        env: {
            "NODE_ENV": "production",
        },
    }]
};
