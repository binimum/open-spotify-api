#!/bin/bash

# Configuration
GITHUB_TOKEN="YOUR_GITHUB_TOKEN"
GIST_ID="YOUR_GIST_ID"
GIST_FILENAME="latest_secret.json"

# Directories
SCRIPT_DIR="$(dirname "$0")"
cd "$SCRIPT_DIR"

# Virtual Environment
VENV_DIR="$SCRIPT_DIR/.venv"

if [ ! -d "$VENV_DIR" ]; then
  echo "Creating virtual environment..."
  python3 -m venv "$VENV_DIR"
  
  echo "Installing dependencies..."
  "$VENV_DIR/bin/pip" install playwright
  "$VENV_DIR/bin/playwright" install chromium
fi

echo "Running Spotify TOTP extractor..."
"$VENV_DIR/bin/python" spotify_totp.py --all

if [ $? -eq 0 ]; then
  echo "Extraction successful."
  
  # Read the latest secret
  LATEST_SECRET=$(jq -c 'sort_by(.version) | reverse | .[0]' secretBytes.json)
  
  if [ -z "$LATEST_SECRET" ] || [ "$LATEST_SECRET" == "null" ]; then
    echo "Error: Could not extract latest secret from JSON."
    exit 1
  fi
  
  # Check if jq is available (it should be if we used it above)
  
  # Construct JSON payload for Gist API
  # We need to escape quote marks in the content string for JSON embedding
  # Using jq to handle proper JSON string escaping
  CONTENT_STR=$(echo "$LATEST_SECRET" | jq -R .)
  PAYLOAD="{\"files\": {\"$GIST_FILENAME\": {\"content\": $CONTENT_STR}}}"
  
  echo "Uploading to GitHub Gist..."
  
  curl -X PATCH \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -d "$PAYLOAD" \
    "https://api.github.com/gists/$GIST_ID"
       
  echo ""
  echo "Done."
else
  echo "Extraction failed."
  exit 1
fi
