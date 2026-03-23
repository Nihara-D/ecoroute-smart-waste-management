@echo off
echo.
echo =============================================
echo   EcoRoute Smart Waste Management System
echo   IT4020 Assignment 2 ^| SLIIT 2026
echo =============================================
echo.

echo Installing dependencies...
cd bin-service && npm install && cd ..
cd dispatch-service && npm install && cd ..
cd citizen-service && npm install && cd ..
cd ewaste-service && npm install && cd ..
cd api-gateway && npm install && cd ..

echo.
echo Starting Bin Service (port 3001)...
start "Bin Service" cmd /k "cd bin-service && npm start"
timeout /t 2 /nobreak >nul

echo Starting Dispatch Service (port 3002)...
start "Dispatch Service" cmd /k "cd dispatch-service && npm start"
timeout /t 2 /nobreak >nul

echo Starting Citizen Service (port 3003)...
start "Citizen Service" cmd /k "cd citizen-service && npm start"
timeout /t 2 /nobreak >nul

echo Starting E-Waste Service (port 3004)...
start "E-Waste Service" cmd /k "cd ewaste-service && npm start"
timeout /t 2 /nobreak >nul

echo Starting API Gateway (port 3000)...
start "API Gateway" cmd /k "cd api-gateway && npm start"
timeout /t 3 /nobreak >nul

echo.
echo =============================================
echo All services started in separate windows!
echo.
echo API Gateway:   http://localhost:3000
echo Gateway Docs:  http://localhost:3000/api-docs
echo Health Check:  http://localhost:3000/health
echo =============================================
pause
