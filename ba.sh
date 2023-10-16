#!/bin/bash
npm run build
cp src/codegenerator/shapes/* ../vu/.garden/ -r
cp dist/* ../vu/.garden/ -r
