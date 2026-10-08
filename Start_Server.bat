@echo off
powershell -ExecutionPolicy Bypass -File "%~dp0viewer\server.ps1" -Port 8085
pause
