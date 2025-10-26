@echo off
title Live Preview Server - Mobile Testing
color 0A

echo.
echo ========================================
echo    🚀 MOBILE LIVE PREVIEW SERVER 🚀
echo ========================================
echo.

cd /d "%~dp0"
python live_server.py

echo.
echo Press any key to exit...
pause >nul