@echo off
echo ============================================
echo    TAVILY API KEY UPDATE HELPER
echo    For Ustaz AI - Digital Dakwah Platform
echo ============================================
echo.

set /p TAVILY_KEY="Enter your Tavily API Key: "

if "%TAVILY_KEY%"=="" (
    echo ❌ No API key entered. Please try again.
    pause
    exit /b 1
)

echo.
echo 🔄 Updating your .env.local file...

powershell -Command "(Get-Content .env.local) -replace 'TAVILY_API_KEY=your-tavily-api-key-here', 'TAVILY_API_KEY=%TAVILY_KEY%' | Set-Content .env.local"

echo.
echo ✅ API key updated successfully!
echo.
echo 🔑 Your Tavily API key is now configured.
echo.
echo 🧪 Testing your API key...
echo.

node test-tavily.js

echo.
echo 🎉 Setup complete! Your Ustaz AI can now search the web.
echo.
pause
