#!/bin/sh

npm install

npx pm2 start "npm run start:dev order" --name "order"
npx pm2 start "npm run start:dev kitchen" --name "kitchen"
npx pm2 start "npm run start:dev notification" --name "notification"

npx pm2 logs
