#!/bin/bash

# Copy built APK to artifacts directory for easy retrieval

set -e

echo "📋 Copying APK to artifacts directory..."

# Create artifacts directory if it doesn't exist
mkdir -p android-artifacts

# Check if APK exists
APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    cp "$APK_PATH" "android-artifacts/adarsh-mens-tailors-debug.apk"
    echo "✅ APK copied successfully!"
    echo ""
    echo "📱 APK available at:"
    echo "   → android-artifacts/adarsh-mens-tailors-debug.apk"
    echo ""
    ls -lh "android-artifacts/adarsh-mens-tailors-debug.apk"
else
    echo "❌ Error: APK not found at $APK_PATH"
    echo "Please build the APK first using:"
    echo "  ./scripts/build-android-debug.sh"
    exit 1
fi
