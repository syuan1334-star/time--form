@echo off
chcp 65001 >nul
echo ================================================
echo   流水无涯论坛 - GitHub Pages 部署脚本
echo ================================================
echo.

REM 设置PATH
set PATH=%PATH%;C:\Program Files\nodejs

cd /d "%~dp0"
echo 当前目录: %CD%
echo.

REM 安装依赖
echo [1/3] 安装依赖...
call npm install
if errorlevel 1 (
    echo 安装失败！
    pause
    exit /b 1
)

REM 构建
echo.
echo [2/3] 构建项目...
call npm run build
if errorlevel 1 (
    echo 构建失败！
    pause
    exit /b 1
)

REM 推送
echo.
echo [3/3] 推送到GitHub...
call git add .
call git commit -m "Build for GitHub Pages - %date% %time%"
call git push -u origin main
if errorlevel 1 (
    echo 推送失败！请检查网络连接。
    pause
    exit /b 1
)

echo.
echo ================================================
echo   部署完成！
echo ================================================
echo.
echo 请在GitHub仓库设置中启用GitHub Pages:
echo https://github.com/syuan1334-star/time--form/settings/pages
echo.
echo 网站地址: https://syuan1334-star.github.io/time--form/
echo.
pause
