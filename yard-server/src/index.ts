import http from "http";

import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import serveStatic from "serve-static";
import expressBasicAuth from "express-basic-auth";

import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";

import { Yard } from "./rooms/Yard";

import localConfig from "../../local.config.json";

const port = Number(process.env.EXPRESS_PORT ?? localConfig.EXPRESS_PORT);
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
  server,
});

// register room handlers
gameServer.define("yard", Yard);

// register colyseus monitor
const monitorPassword = process.env.MONITOR_PASSWORD ?? localConfig.MONITOR_PASSWORD;
app.use("/colyseus", expressBasicAuth({
  users: { admin: monitorPassword },
  challenge: true,
  realm: "Colyseus monitor for Yard",
}), monitor());

if (process.env.NODE_ENV === "production") {
  app.use("/", serveStatic(process.env.VUE_DIST_DIR ?? localConfig.VUE_DIST_DIR));
} else {
  app.use("/", createProxyMiddleware({
    target: "http://localhost:" + (process.env.VUE_DEV_SERVER_PORT ?? localConfig.VUE_DEV_SERVER_PORT),
    changeOrigin: true,
  }));
}

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`);
