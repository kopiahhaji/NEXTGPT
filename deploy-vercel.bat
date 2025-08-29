@echo off
echo ===========================================
echo   Ustaz AI - Vercel Deployment
echo   Digital Dakwah Platform
echo   Developed by Rodhi Rahman
echo ===========================================

cd /d %~dp0

echo Checking Vercel CLI installation...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Vercel CLI...
    npm install -g vercel
)

echo.
echo Choose deployment option:
echo 1. Deploy to production
echo 2. Deploy to preview
echo 3. Link project to existing Vercel project
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo Deploying to production...
    vercel --prod
) else if "%choice%"=="2" (
    echo.
    echo Deploying to preview...
    vercel
) else if "%choice%"=="3" (
    echo.
    echo Linking to existing Vercel project...
    vercel link
    echo.
    echo Now you can deploy with option 1 or 2
) else (
    echo Invalid choice. Exiting...
    pause
    exit /b 1
)

echo.
echo Deployment completed!
echo Access your Ustaz AI at the provided Vercel URL
echo.
echo Platform: Digital Dakwah Platform
echo Developer: Rodhi Rahman

pause
