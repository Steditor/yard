import { monitor } from "@colyseus/monitor";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { Server } from "colyseus";
import express from "express";
import expressBasicAuth from "express-basic-auth";
import http from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import serveStatic from "serve-static";

import { Yard } from "./rooms/Yard.js";

import localConfig from "../../local.config.json" assert { type: "json" };

const port = Number(process.env.EXPRESS_PORT ?? localConfig.EXPRESS_PORT);
const app = express();

app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
  transport: new WebSocketTransport({
    server,
  }),
});

// register room handlers
gameServer.define("yard", Yard);

// register colyseus monitor
const monitorPassword =
  process.env.MONITOR_PASSWORD ?? localConfig.MONITOR_PASSWORD;
app.use(
  "/colyseus",
  expressBasicAuth({
    users: { admin: monitorPassword },
    challenge: true,
    realm: "Colyseus monitor for Yard",
  }),
  monitor(),
);

if (process.env.NODE_ENV === "production") {
  // in production mode, the express server serves the vue dist directory
  const staticPath = process.env.VUE_DIST_DIR ?? localConfig.VUE_DIST_DIR;
  app.use(serveStatic(staticPath));
  app.get("*", (req: express.Request, res: express.Response) => {
    res.sendFile("index.html", { root: staticPath });
  });
} else {
  // in development mode, the express server redirects to the vue dev server
  app.use(
    "/",
    createProxyMiddleware({
      target:
        "http://localhost:" +
        (process.env.VUE_DEV_SERVER_PORT ?? localConfig.VUE_DEV_SERVER_PORT),
      changeOrigin: true,
    }),
  );
}

gameServer.listen(port);
// eslint-disable-next-line no-console
console.log(`Listening on localhost:${port}`);
