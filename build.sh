#!/usr/bin/env bash

# npm version
echo '/*!' > build/new.npm.js
cat LICENSE.txt >> build/new.npm.js
echo '*/' >> build/new.npm.js
cat src/new.js >> build/new.npm.js
echo '(module.exports=New).New=New;' >> build/new.npm.js

# production minified
./node_modules/.bin/uglifyjs src/new.js --preamble='/*!(C)Andrea Giammarchi*/' -o build/new.js