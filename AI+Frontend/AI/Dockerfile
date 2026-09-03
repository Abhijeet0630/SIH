# ==============================================================================
# Bharat AI Microservice - Minimal Production Dockerfile
# ==============================================================================
FROM python:3.11-slim AS builder

WORKDIR /app

# Install dependencies into wheel cache
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Final minimal production stage
FROM python:3.11-slim

WORKDIR /app

# Create non-root system user for security
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy installed python dependencies from builder
COPY --from=builder /root/.local /home/appuser/.local
COPY app/ ./app/

ENV PATH=/home/appuser/.local/bin:$PATH \
    PYTHONUNBUFFERED=1 \
    PORT=8001 \
    HOST=0.0.0.0

# Set ownership to non-root user
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 8001

# Production Container Health Check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD python -c "import requests; resp = requests.get('http://127.0.0.1:8001/api/health'); exit(0 if resp.status_code == 200 else 1)"

# Production Uvicorn startup (no --reload)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
