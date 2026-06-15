
echo "run_node.sh for $PROJECT"

cd /app

if [[ -z "$(ls -A /app/apps/${PROJECT}/.next/)" || -n "$(diff -q /app/apps/${PROJECT}/.next/BUILD_ID /app/.next_orig/BUILD_ID)" ]]; then
    echo "Copy generated static files from .next_orig to .next"
    rm -fr .next/*
    cp -r -f /app/.next_orig/* /app/apps/${PROJECT}/.next/
fi

echo "Generating runtime env-config.js"
/app/scripts/env.sh /app "/app/apps/${PROJECT}/public"

node ./apps/${PROJECT}/server.js
