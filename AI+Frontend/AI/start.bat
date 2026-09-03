@echo off
echo Starting Bharat AI Independent Service on port 8001...
python -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
pause
