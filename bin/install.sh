#!/bin/bash

# Get the browser_download_url from the latest release
URL=$(curl -s https://api.github.com/repos/trogulja/maker-one/releases/latest | grep 'browser_download_url' | cut -d'"' -f4)

# Set the destination directory for the binary
DEST_DIR="$HOME/bin"

# Create the destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Remove the existing binary if it exists
rm -f "$DEST_DIR/maker-one"

# Download the binary file
curl -L "$URL" -o "$DEST_DIR/maker-one"

# Make the binary file executable
chmod +x "$DEST_DIR/maker-one"
xattr -c "$DEST_DIR/maker-one"

# Remove token.json file because it is not valid anymore
rm -f "$HOME/.maker-one/token.json"
