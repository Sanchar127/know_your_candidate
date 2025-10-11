# app/middleware/logging_middleware.py
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.logger import logger
import time

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = (time.time() - start_time) * 1000  # in ms

        log_details = {
            "method": request.method,
            "url": str(request.url),
            "status_code": response.status_code,
            "process_time_ms": f"{process_time:.2f}"
        }

        logger.info(f"{log_details}")
        return response
