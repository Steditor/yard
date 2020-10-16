import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";

import { Yard } from "./rooms/Yard";
import { createProxyMiddleware } from "http-proxy-middleware";

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
  console.log("production mode todo!");
  // TODO: serve static
} else {
  app.use("/", createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: true,
  }))
}

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`)
