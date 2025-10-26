@echo off
title Mobile Live Preview Setup
color 0B

echo.
echo ==========================================
echo    📱 MOBILE LIVE PREVIEW SETUP 📱
echo ==========================================
echo.

cd /d "%~dp0"

echo 🔍 Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found! Please install Python first.
    echo 💡 Download from: https://python.org
    pause
    exit /b 1
)

echo ✅ Python found!
echo.

echo 🚀 Starting live server...
echo.
echo ==========================================
echo    YOUR MOBILE ACCESS INFO:
echo ==========================================
echo.
echo 📱 Open your phone's browser and go to:
echo    👉 http://10.1.32.40:8080
echo.
echo 💡 Make sure your phone is on the same WiFi!
echo ==========================================
echo.

python live_server.py

echo.
echo Server stopped. Press any key to exit...
pause >nul