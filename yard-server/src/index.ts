import http from "http";
import * as path from "path";

import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import serveStatic from "serve-static";

import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";

import { Yard } from "./rooms/Yard";

const port = Number(process.env.PORT || 2567);
const app = express()

app.use(cors());
app.use(express.json())

const server = http.createServer(app);
const gameServer = new Server({
  server,
});

// register your room handlers
gameServer.define('yard', Yard);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor());

if (process.env.NODE_ENV === "production") {
  app.use("/", serveStatic(path.join(__dirname, "../../yard-client/dist")));
} else {
  app.use("/", createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: true,
  }));
}

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`)
