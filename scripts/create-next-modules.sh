#!/bin/bash
# Description: Create a tarball of the node_modules directory from clean next.js install
# for the next.js standalone build. This needs to be done because the next.js standalone
# build for monorepo does not include all the files in node_modules directory in the output.
# Usage: ./scripts/create-next-modules.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd /tmp
# Create a clean next.js install using the same version as the current project
npx -y create-next-app@12.3.1 --typescript --use-npm next_standalone
cd next_standalone
# Add the standalone output to the next.config.js file
sed -i.bak '3i\
  output: "standalone",\
' next.config.js
npm run build
cd ..
# Create a tarball of the node_modules directory
tar -czf next_standalone_modules.tar.gz -C next_standalone/.next/standalone/node_modules .
rm -rf next_standalone
mv -f next_standalone_modules.tar.gz $DIR/next_standalone_modules.tar.gz
cd $DIR
