# Build Android Debug APK for Adarsh Mens Tailors
# This script builds the web app, syncs to Android, and creates a debug APK

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Android Debug APK Build..." -ForegroundColor Cyan
Write-Host ""

# Check if we're in the frontend directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Must run from frontend directory" -ForegroundColor Red
    exit 1
}

# Step 1: Build web app
Write-Host "📦 Step 1/5: Building web application..." -ForegroundColor Yellow
pnpm run build:skip-bindings
Write-Host "✅ Web build complete" -ForegroundColor Green
Write-Host ""

# Step 2: Ensure Capacitor is configured
Write-Host "⚙️  Step 2/5: Checking Capacitor configuration..." -ForegroundColor Yellow
if (-not (Test-Path "capacitor.config.ts")) {
    Write-Host "❌ Error: capacitor.config.ts not found" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Capacitor configured" -ForegroundColor Green
Write-Host ""

# Step 3: Add/sync Android platform
Write-Host "🔄 Step 3/5: Syncing Android platform..." -ForegroundColor Yellow
if (-not (Test-Path "android")) {
    Write-Host "Adding Android platform..."
    npx cap add android
} else {
    Write-Host "Syncing existing Android platform..."
    npx cap sync android
}
Write-Host "✅ Android platform synced" -ForegroundColor Green
Write-Host ""

# Step 4: Build debug APK
Write-Host "🔨 Step 4/5: Building debug APK..." -ForegroundColor Yellow
Push-Location android
if (Test-Path "gradlew.bat") {
    .\gradlew.bat assembleDebug
} else {
    Write-Host "❌ Error: gradlew.bat not found in android directory" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location
Write-Host "✅ Debug APK built" -ForegroundColor Green
Write-Host ""

# Step 5: Copy APK to artifacts
Write-Host "📋 Step 5/5: Copying APK to artifacts directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "android-artifacts" | Out-Null
$apkPath = "android\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkPath) {
    Copy-Item $apkPath "android-artifacts\adarsh-mens-tailors-debug.apk"
    Write-Host "✅ APK copied to artifacts" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: APK not found at expected location" -ForegroundColor Yellow
}
Write-Host ""

# Success message
Write-Host "🎉 Build Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 APK Location:" -ForegroundColor Cyan
Write-Host "   → android\app\build\outputs\apk\debug\app-debug.apk"
Write-Host "   → android-artifacts\adarsh-mens-tailors-debug.apk"
Write-Host ""
Write-Host "📖 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. See APK_DELIVERY.md for installation instructions"
Write-Host "   2. Transfer the APK to your Android device"
Write-Host "   3. Enable installation from unknown sources"
Write-Host "   4. Install and enjoy!"
Write-Host ""
