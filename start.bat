@echo off
chcp 65001 > nul
title Time Travel Forum
echo ==========================================
echo       Time Travel Forum - Launcher
echo ============================================
echo.

where node > nul 2>&1
if %errorlevel% neq 0 (
    echo [Error] Node.js not found
    echo Please install Node.js: https://nodejs.org/
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo [1/3] Installing dependencies...
    npm install
)

echo [2/3] Starting server...
start "TimeForum" cmd /c "npm run dev"
timeout /t 5 /nobreak > nul

echo [3/3] Opening browser...
start http://localhost:5173

echo.
echo ============================================
echo   Forum started! Visit http://localhost:5173
echo   Press any key to close this window
echo ============================================
pause > nul
