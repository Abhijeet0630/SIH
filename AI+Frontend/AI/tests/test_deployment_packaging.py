import os
import re
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.config import Settings

client = TestClient(app)

def test_settings_cors_parser():
    """Verifies comma-separated string parsing for CORS_ORIGINS."""
    s = Settings(CORS_ORIGINS="http://localhost:5173,http://production.com")
    assert s.CORS_ORIGINS == ["http://localhost:5173", "http://production.com"]

def test_settings_invalid_provider():
    """Verifies invalid AI_PROVIDER names raise ValueError."""
    with pytest.raises(ValueError, match="Unsupported AI_PROVIDER"):
        Settings(AI_PROVIDER="invalid_provider")

def test_settings_numeric_validators():
    """Verifies invalid numeric settings raise ValueError."""
    with pytest.raises(ValueError, match="Invalid PORT"):
        Settings(PORT=-1)

    with pytest.raises(ValueError, match="Invalid MAX_MESSAGE_LENGTH"):
        Settings(MAX_MESSAGE_LENGTH=0)

    with pytest.raises(ValueError, match="Invalid MAX_CONVERSATIONS"):
        Settings(MAX_CONVERSATIONS=-5)

    with pytest.raises(ValueError, match="Invalid PROVIDER_TIMEOUT_SECONDS"):
        Settings(PROVIDER_TIMEOUT_SECONDS=0)

def test_docker_files_secret_scan():
    """Statically verifies Dockerfile, .dockerignore, docker-compose.yml, and .env.example contain 0 hardcoded secrets."""
    secret_pat = re.compile(r'AIzaSy[A-Za-z0-9_-]{33}')
    
    files_to_check = [
        "Dockerfile",
        ".dockerignore",
        ".env.example",
        "../docker-compose.yml"
    ]
    
    for rel_path in files_to_check:
        full_path = os.path.join(os.path.dirname(__file__), "..", rel_path)
        if os.path.exists(full_path):
            with open(full_path, "r", encoding="utf-8") as f:
                content = f.read()
                assert not secret_pat.search(content), f"Secret pattern match found in {rel_path}"

def test_dockerignore_excludes_env():
    """Verifies .dockerignore explicitly excludes .env files."""
    dockerignore_path = os.path.join(os.path.dirname(__file__), "..", ".dockerignore")
    assert os.path.exists(dockerignore_path)
    with open(dockerignore_path, "r", encoding="utf-8") as f:
        content = f.read()
        assert ".env" in content

def test_health_endpoint_contract_compliance():
    """Verifies GET /api/health returns only minimal schema and zero secrets."""
    resp = client.get("/api/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "healthy"
    assert data["port"] == 8001
    assert "service" in data
    assert "provider" not in data
    assert "api_key_configured" not in data
