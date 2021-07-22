# Yard Server

This is the server component for Yard.

## Loadtesting

Have a server running, start a room there and then run

```sh
npm run loadtest -- --endpoint {ws[s]://SERVER_ADDRESS:PORT} --roomId {ROOM_ID}  --numClients {NUMBER_OF_CLIENTS}
```

## Local commands

Usually you should use the commands provided on the [project's top level](../README.md).
If you feel like running local commands - here they are:

Develop with

```sh
npm run dev
```

Lint with

```sh
npm run lint
```

Build with

```sh
npm run build
```

Run the built server with

```sh
npm start
```
