#!/usr/bin/env bash

git pull --force
kill $(ps -e | grep node | sed 's/ ?.*//g' | sed 's/ [a-z].*//g')
node index.ts
