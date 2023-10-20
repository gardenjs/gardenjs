#!/bin/bash
npm run build
cp src/codegenerator/shapes/* ../minesweeper/.garden/ -r
cp dist/* ../minesweeper/.garden/ -r

cp src/codegenerator/shapes/* ../vu/.garden/ -r
cp dist/* ../vu/.garden/ -r
