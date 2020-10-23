# Yard

Simulate running around on a yard with many many many people.

## Setup

Create a `local.config.json` according to the template in [`local.config.json.example`](local.config.json.example).
Take note of the port you specify for the express server, you will need it both for development and deployment.

Run `npm install` in the main directory to install all packages for both server and client.

## Development

Run `npm run dev` in the main directory to start server and client in watch mode.
Access the frontend via the server URL `localhost:{{EXPRESS_PORT}}` which serves as proxy for the vue-cli dev-server.

## Deployment

Install [PM2](https://pm2.keymetrics.io/) on your server.
Run [`.deploy/deploy.sh`](.deploy/deploy.sh) from the project's root directory.
The script will install all dependencies and build both server and client.
Afterwards it uses PM2 to run the application.

Setup your reverse proxy according to [the colyseus manual](https://docs.colyseus.io/deployment/#nginx-recommended).
Remember to put in the `EXPRESS_PORT` you specified during setup.

## Server monitoring

The server exposes the [Colyseus Monitoring Panel](https://docs.colyseus.io/tools/monitor/) under `URL:PORT/colyseus`.
