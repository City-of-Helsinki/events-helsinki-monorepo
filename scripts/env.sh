#!/bin/bash

# Generates env-config.js with window._env_ for runtime environment injection.
# Follows the pattern used in kerrokantasi-ui / open-city-profile-ui.
#
# Usage: env.sh [ENVDIR] [TARGETDIR]
#   ENVDIR    - directory containing .env file (default: .)
#   TARGETDIR - directory where env-config.js is written (default: ./public)

ENVDIR=${1:-.}
TARGETDIR=${2:-./public}

mkdir -p "${TARGETDIR}"

rm -f "${TARGETDIR}/env-config.js"
touch "${TARGETDIR}/env-config.js"

echo "window._env_ = {" >> "${TARGETDIR}/env-config.js"

if [[ -f "${ENVDIR}/.env" ]]; then
  while read -r line || [[ -n "$line" ]]; do
  # Skip comments and empty lines
  if [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]]; then
    continue
  fi

  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  else
    continue
  fi

  # Read value of current variable if it exists as an environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}
  # Remove quotes around the value
  value=${value%\"}
  value=${value#\"}
  value=${value%\'}
  value=${value#\'}

  # Append configuration property to JS file
  escaped_value=$(printf '%s' "${value}" | sed 's/\\/\\\\/g; s/"/\\"/g')
  echo "  ${varname}: \"${escaped_value}\"," >> "${TARGETDIR}/env-config.js"

  export "${varname}=${value}"
  done < "${ENVDIR}/.env"
fi

echo "}" >> "${TARGETDIR}/env-config.js"
