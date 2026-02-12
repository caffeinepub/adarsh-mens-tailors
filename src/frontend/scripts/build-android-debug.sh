#!/bin/bash

# Build Android Debug APK for Adarsh Mens Tailors
# This script builds the web app, syncs to Android, and creates a debug APK

set -e  # Exit on error

echo "🚀 Starting Android Debug APK Build..."
echo ""

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Must run from frontend directory"
    exit 1
fi

# Step 1: Build web app
echo "📦 Step 1/5: Building web application..."
pnpm run build:skip-bindings
echo "✅ Web build complete"
echo ""

# Step 2: Ensure Capacitor is configured
echo "⚙️  Step 2/5: Checking Capacitor configuration..."
if [ ! -f "capacitor.config.ts" ]; then
    echo "❌ Error: capacitor.config.ts not found"
    exit 1
fi
echo "✅ Capacitor configured"
echo ""

# Step 3: Add/sync Android platform
echo "🔄 Step 3/5: Syncing Android platform..."
if [ ! -d "android" ]; then
    echo "Adding Android platform..."
    npx cap add android
else
    echo "Syncing existing Android platform..."
    npx cap sync android
fi
echo "✅ Android platform synced"
echo ""

# Step 4: Build debug APK
echo "🔨 Step 4/5: Building debug APK..."
cd android
if [ -f "gradlew" ]; then
    chmod +x gradlew
    ./gradlew assembleDebug
else
    echo "❌ Error: gradlew not found in android directory"
    exit 1
fi
cd ..
echo "✅ Debug APK built"
echo ""

# Step 5: Copy APK to artifacts
echo "📋 Step 5/5: Copying APK to artifacts directory..."
mkdir -p android-artifacts
if [ -f "android/app/build/outputs/apk/debug/app-debug.apk" ]; then
    cp android/app/build/outputs/apk/debug/app-debug.apk android-artifacts/adarsh-mens-tailors-debug.apk
    echo "✅ APK copied to artifacts"
else
    echo "⚠️  Warning: APK not found at expected location"
fi
echo ""

# Success message
echo "🎉 Build Complete!"
echo ""
echo "📱 APK Location:"
echo "   → android/app/build/outputs/apk/debug/app-debug.apk"
echo "   → android-artifacts/adarsh-mens-tailors-debug.apk"
echo ""
echo "📖 Next Steps:"
echo "   1. See APK_DELIVERY.md for installation instructions"
echo "   2. Transfer the APK to your Android device"
echo "   3. Enable installation from unknown sources"
echo "   4. Install and enjoy!"
echo ""
