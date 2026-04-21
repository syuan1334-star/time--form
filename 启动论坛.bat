@echo off
chcp 65001 > nul
title 时间穿越论坛
echo ==========================================
echo       时间穿越论坛 - 启动器
echo ============================================
echo.

REM 检查 Node.js 是否安装
where node > nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

REM 检查是否已安装依赖
if not exist "node_modules" (
    echo [1/3] 正在安装依赖...
    npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
)

REM 启动开发服务器
echo [2/3] 正在启动服务器...
start "时间穿越论坛" cmd /c "npm run dev"
timeout /t 5 /nobreak > nul

REM 打开浏览器
echo [3/3] 正在打开浏览器...
start http://localhost:5173

echo.
echo ============================================
echo   已启动！请在浏览器中访问论坛
echo   按任意键关闭此窗口
echo ============================================
pause > nul
