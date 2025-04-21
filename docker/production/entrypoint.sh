#!/bin/sh

if [ "$APP_TYPE" = "order" ]; then
  node $APP_TYPE/main.js
else
  node $APP_TYPE/apps/$APP_TYPE/src/main.js
fi