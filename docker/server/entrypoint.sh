#!/bin/bash

cd /app
npm install
node_modules/bower/bin/bower install --allow-root
npm start
