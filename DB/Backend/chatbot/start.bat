@echo off
echo Starting Bharat AI Chatbot Backend Server...
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
pause
