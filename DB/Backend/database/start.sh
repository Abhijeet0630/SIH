#!/bin/bash
# Start the Bharat Cultural Heritage Data API on port 8001
echo "Starting Bharat Cultural Heritage Data API on port 8001..."
cd "$(dirname "$0")"
python -m uvicorn main:app --host 127.0.0.1 --port 8001 --reload
