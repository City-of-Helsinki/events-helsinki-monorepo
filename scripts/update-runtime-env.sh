#!/bin/bash

# Generates env-config.js for local development (non-Docker).
# Usage: ./scripts/update-runtime-env.sh [PROJECT]
# Example: ./scripts/update-runtime-env.sh events-helsinki

PROJECT=${1:-events-helsinki}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

"${SCRIPT_DIR}/env.sh" "${REPO_ROOT}" "${REPO_ROOT}/apps/${PROJECT}/public"
