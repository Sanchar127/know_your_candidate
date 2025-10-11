FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install system dependencies required for psycopg2, PDF/OCR, and fonts
RUN apt-get update && \
    apt-get install -y \
        gcc \
        libpq-dev \
        poppler-utils \
        tesseract-ocr \
        tesseract-ocr-nep \
        libglib2.0-0 \
        libsm6 \
        libxext6 \
        libxrender-dev \
        curl \
        unzip \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt first to leverage Docker cache
COPY ../../backend/requirements.txt /app/requirements.txt

# Upgrade pip and install Python dependencies
RUN pip install --upgrade pip setuptools wheel
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy backend application code
COPY ../../backend /app

# Copy start script and make it executable
COPY ../../backend/start.sh /start.sh
RUN chmod +x /start.sh

# Ensure Alembic is available in PATH
ENV PATH="/usr/local/bin:$PATH"

# Use absolute path for startup
ENTRYPOINT ["/start.sh"]
