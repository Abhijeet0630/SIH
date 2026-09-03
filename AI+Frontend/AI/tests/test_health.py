import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["port"] == 8001
    assert "service" in data
    assert "provider" not in data
    assert "api_key_configured" not in data

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

def test_empty_chat_message():
    response = client.post("/api/ai/chat", json={"message": "   "})
    assert response.status_code == 400
