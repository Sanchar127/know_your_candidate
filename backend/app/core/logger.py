from logging.handlers import RotatingFileHandler
from pathlib import Path
import logging

# Ensure logs folder exists
log_dir = Path("/app/logs")
log_dir.mkdir(parents=True, exist_ok=True)

# Central logger
logger = logging.getLogger("election_api")
logger.setLevel(logging.INFO)

# General API log
file_handler_api = RotatingFileHandler(
    log_dir / "api.log", maxBytes=5*1024*1024, backupCount=5
)
file_handler_api.setFormatter(logging.Formatter(
    "%(asctime)s - %(levelname)s - %(name)s - %(message)s"
))
logger.addHandler(file_handler_api)

# Users-specific log
file_handler_users = RotatingFileHandler(
    log_dir / "users.log", maxBytes=5*1024*1024, backupCount=5
)
file_handler_users.setFormatter(logging.Formatter(
    "%(asctime)s - %(levelname)s - %(name)s - %(message)s"
))
logger.addHandler(file_handler_users)
