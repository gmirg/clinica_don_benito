#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOY_DIR="$ROOT_DIR/deploy"
STAGE_DIR="$DEPLOY_DIR/banahosting-package"
TIMESTAMP="$(date +"%Y%m%d-%H%M%S")"
ZIP_PATH="$DEPLOY_DIR/clinica-don-benito-banahosting-$TIMESTAMP.zip"

INCLUDE_PATHS=(
  ".next"
  "app"
  "components"
  "lib"
  "public"
  "package.json"
  "package-lock.json"
  "next.config.mjs"
  "server.js"
  "tsconfig.json"
  "next-env.d.ts"
)

echo "Building production bundle..."
cd "$ROOT_DIR"
npm run build

echo "Preparing deploy package..."
rm -rf "$STAGE_DIR"
mkdir -p "$STAGE_DIR"

for path in "${INCLUDE_PATHS[@]}"; do
  if [ -e "$ROOT_DIR/$path" ]; then
    cp -R "$ROOT_DIR/$path" "$STAGE_DIR/$path"
  fi
done

find "$STAGE_DIR" -name '.DS_Store' -delete

mkdir -p "$DEPLOY_DIR"
rm -f "$ZIP_PATH"

echo "Creating ZIP archive..."
(
  cd "$STAGE_DIR"
  zip -qr "$ZIP_PATH" .
)

echo
echo "Deploy package created:"
echo "$ZIP_PATH"
echo
echo "Contents:"
(
  cd "$STAGE_DIR"
  find . -maxdepth 2 | sort
)
echo
echo "Next step in BanaHosting:"
echo "1. Upload the ZIP with File Manager or FTP."
echo "2. Extract it inside the Node app root."
echo "3. Restart the app from Setup Node.js App."
