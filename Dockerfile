FROM node:19 as build-stage

WORKDIR /build

COPY ./package*.json .
COPY ./client/package*.json ./client/
COPY ./common/package*.json ./common/
COPY ./server/package*.json ./server/
RUN npm ci
COPY . .
COPY local.config.json.example local.config.json
RUN npm run build

ENV NODE_ENV=production
RUN npm pkg delete scripts.prepare
RUN npm ci

FROM node:19-alpine as production-stage

WORKDIR /app

COPY --from=build-stage /build .
ENV VUE_DIST_DIR=/app/client/dist

WORKDIR /app/server/dist
ENV NODE_ENV=production
EXPOSE 2567
CMD [ "node", "index.js", "--experimental-json-modules" ]

LABEL org.opencontainers.image.source https://github.com/Steditor/yard
