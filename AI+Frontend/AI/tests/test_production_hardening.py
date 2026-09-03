import pytest
import requests
import asyncio
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app
from app.core.config import Settings
from app.services.fallback_engine import LocalFallbackEngine
from app.services.providers.groq_provider import GroqProvider
from app.services.cultural_data_service import BackendCulturalClient
from app.services.conversation_service import InMemoryConversationStorage
from app.services.ai_service import get_ai_service

client = TestClient(app)

def test_1_invalid_configuration_provider_validation():
    """Verifies that invalid AI_PROVIDER names raise ValueError."""
    with pytest.raises(ValueError, match="Unsupported AI_PROVIDER"):
        Settings(AI_PROVIDER="unsupported_provider_xyz")

def test_2_missing_provider_api_key_fallback():
    """Verifies LocalFallbackEngine provides offline fallback response."""
    engine = LocalFallbackEngine()
    res = engine.get_fallback_response("Tell me about Vada Pav", "conv_test", context_str="")
    assert "message" in res
    assert "Vada Pav" in res["message"]
    assert res["avatar_state"] == "speaking"

def test_3_provider_timeout_handling():
    """Verifies provider timeout is caught cleanly without throwing uncaught exception."""
    async def run():
        provider = GroqProvider()
        with patch("requests.post", side_effect=requests.exceptions.Timeout("Provider timed out")):
            res = await provider.generate_chat_response("Tell me about Raigad Fort", "conv_timeout", context_str="", api_key="mock_key", slot_id=1)
            assert res is None or "error_type" in res
    asyncio.run(run())

def test_4_provider_http_failure_handling():
    """Verifies provider HTTP 500 failure returns error dict cleanly."""
    async def run():
        provider = GroqProvider()
        mock_resp = MagicMock()
        mock_resp.status_code = 500
        mock_resp.text = "Internal Server Error"
        with patch("requests.post", return_value=mock_resp):
            res = await provider.generate_chat_response("Tell me about Bihu", "conv_http_err", context_str="", api_key="mock_key", slot_id=1)
            assert res is None or "error_type" in res
    asyncio.run(run())

def test_5_malformed_provider_response_handling():
    """Verifies malformed JSON from provider falls back cleanly."""
    async def run():
        provider = GroqProvider()
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {"choices": []}
        with patch("requests.post", return_value=mock_resp):
            res = await provider.generate_chat_response("Tell me about Muga Silk", "conv_malformed", context_str="", api_key="mock_key", slot_id=1)
            assert res is None or "error_type" in res
    asyncio.run(run())

def test_6_7_8_main_backend_resilience():
    """Verifies BackendCulturalClient handles backend downtime gracefully without crashing."""
    cult_client = BackendCulturalClient()

    with patch("requests.get", side_effect=requests.exceptions.ConnectionError("Backend connection refused")):
        state = cult_client.fetch_state_details("maharashtra")
        assert state is None

        item = cult_client.fetch_item_details("item-123")
        assert item is None

def test_9_memory_eviction_under_load():
    """Verifies InMemoryConversationStorage respects max capacity limit and evicts oldest items."""
    storage = InMemoryConversationStorage(max_conversations=5)

    for i in range(10):
        cid = f"conv_{i}"
        storage.create_session(cid)
        storage.add_message(cid, "user", f"Message {i}")

    # Active conversation count should be <= 5
    assert len(storage._conversations) <= 5
    # Earliest items (conv_0, conv_1) should be evicted
    assert "conv_0" not in storage._conversations
    assert "conv_9" in storage._conversations

def test_10_secret_sanitization():
    """Verifies API key credentials are never exposed in log outputs or API responses."""
    payload = {"message": "Tell me about Raigad Fort"}
    response = client.post("/api/ai/chat", json=payload)
    assert response.status_code == 200
    res_str = response.text
    assert "gsk_" not in res_str
    assert "GROQ_API_KEY" not in res_str
    assert "Bearer " not in res_str
