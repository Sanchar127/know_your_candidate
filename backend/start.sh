#!/usr/bin/env bash
set -e

echo "PATH: $PATH"
which alembic || echo "Alembic not found!"

if [ -f "alembic.ini" ]; then
  echo "Running Alembic migrations..."
  alembic upgrade head
fi

echo "Starting FastAPI..."
exec uvicorn app.main:app --host 0.0.0.0 --port ${APP_PORT:-8000} --reload
