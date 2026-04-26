#!/bin/bash
set -e

# Backend
cd /app/backend
pip install -r requirements.txt 2>/dev/null || true
python app.py &

# Frontend
cd /app/frontend
npm install
npm run build && npx vite preview --port 3000 --host 0.0.0.0 --strictPort &
