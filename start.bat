@echo off
title Trading Monitor
echo Starting Trading Monitor...

REM Start backend
cd backend
start cmd /k "npm install && node server.js"

REM Wait a few seconds for backend to start
timeout /t 5

REM Start frontend Angular app
cd ../frontend
start cmd /k "npm install && ng serve --open"

exit
REM End of script