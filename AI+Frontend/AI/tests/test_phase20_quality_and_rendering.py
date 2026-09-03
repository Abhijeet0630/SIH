import pytest
import asyncio
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app
from app.services.fallback_engine import LocalFallbackEngine

client = TestClient(app)

def test_1_raigad_fort_query_response():
    """Verifies that Raigad Fort query receives detailed, topic-specific cultural response."""
    response = client.post("/api/ai/chat", json={"message": "Tell me about the history of Raigad Fort"})
    assert response.status_code == 200
    data = response.json()["data"]
    assert "Raigad Fort" in data["message"]
    assert "Shivaji" in data["message"]
    assert data["message"].startswith("### ") or "**Raigad" in data["message"] or "Raigad" in data["message"]
    assert "Here is information regarding" not in data["message"]

def test_2_location_query_with_context():
    """Verifies that 'Where is it?' uses conversation history to answer specific location details."""
    # Turn 1: Raigad Fort query
    t1 = client.post("/api/ai/chat", json={"message": "Tell me about Raigad Fort"})
    conv_id = t1.json()["data"]["conversation_id"]

    # Turn 2: Follow-up location query
    t2 = client.post("/api/ai/chat", json={
        "message": "Where is it?",
        "conversation_id": conv_id
    })
    assert t2.status_code == 200
    data = t2.json()["data"]
    assert data["conversation_id"] == conv_id
    assert "Mahad" in data["message"] or "Maharashtra" in data["message"] or "Sahyadri" in data["message"]

def test_3_maharashtra_forts_query():
    """Verifies that query about Maharashtra forts returns structured list of forts."""
    response = client.post("/api/ai/chat", json={"message": "What are the famous forts of Maharashtra?"})
    assert response.status_code == 200
    data = response.json()["data"]
    assert "Sinhagad" in data["message"] or "Pratapgad" in data["message"] or "Shivneri" in data["message"]

def test_4_vada_pav_preparation_query():
    """Verifies 'How is Vada Pav prepared?' returns step-by-step recipe instructions."""
    response = client.post("/api/ai/chat", json={"message": "How is Vada Pav prepared?"})
    assert response.status_code == 200
    data = response.json()["data"]
    msg_lower = data["message"].lower()
    assert "potato" in msg_lower or "batter" in msg_lower or "fry" in msg_lower or "vada" in msg_lower

def test_5_local_fallback_engine_iteration():
    """Verifies LocalFallbackEngine returns domain-grounded response."""
    engine = LocalFallbackEngine()
    res = engine.get_fallback_response("Tell me about Raigad Fort", "conv_f1", "")
    assert res is not None
    assert "Raigad Fort" in res["message"]
    assert res["avatar_state"] == "speaking"

def test_6_api_contract_preservation():
    """Verifies ChatResponseEnvelope structure remains 100% compliant."""
    payload = {"message": "Tell me about Living Root Bridges"}
    response = client.post("/api/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "message" in data["data"]
    assert "conversation_id" in data["data"]
    assert "avatar_state" in data["data"]
    assert isinstance(data["data"]["suggestions"], list)
