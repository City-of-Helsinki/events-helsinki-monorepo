
PROJECT=events-helsinki
cd /app
[ "$(ls -A /app/apps/${PROJECT}/.next/)" ] || cp -r /app/.next_orig/* /app/apps/${PROJECT}/.next/

node ./apps/${PROJECT}/server.js
