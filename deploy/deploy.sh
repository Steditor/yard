#!/bin/sh
npm install
npm run build
pm2 start .deploy/ecosystem.config.js
