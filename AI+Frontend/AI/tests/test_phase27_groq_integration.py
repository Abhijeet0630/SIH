import pytest
import asyncio
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app
from app.services.providers.groq_provider import GroqProvider
from app.services.groq_key_manager import GroqKeyManager
from app.services.provider_manager import ProviderManager

@pytest.fixture
def groq_provider():
    return GroqProvider(api_key="gsk_dummy_test_key", model="qwen/qwen3.8-27b")

# Test 1: Correct Groq endpoint
def test_1_correct_groq_endpoint(groq_provider):
    async def run():
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "choices": [{"message": {"content": "The capital of Maharashtra is Mumbai."}}]
        }
        with patch("requests.post", return_value=mock_resp) as mock_post:
            res = await groq_provider.generate_chat_response("What is the capital of Maharashtra?", "conv_1", "")
            assert res is not None
            called_url = mock_post.call_args[0][0]
            assert called_url == "https://api.groq.com/openai/v1/chat/completions"
    asyncio.run(run())

# Test 2: Correct authorization format
def test_2_correct_authorization_format(groq_provider):
    async def run():
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "choices": [{"message": {"content": "Mumbai"}}]
        }
        with patch("requests.post", return_value=mock_resp) as mock_post:
            await groq_provider.generate_chat_response("Capital?", "conv_2", "", api_key="gsk_test_key_123")
            called_headers = mock_post.call_args[1].get("headers", {})
            assert called_headers.get("Authorization") == "Bearer gsk_test_key_123"
            assert called_headers.get("Content-Type") == "application/json"
    asyncio.run(run())

# Test 3: Correct request JSON payload structure
def test_3_correct_request_json_structure(groq_provider):
    async def run():
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "choices": [{"message": {"content": "Mumbai"}}]
        }
        with patch("requests.post", return_value=mock_resp) as mock_post:
            await groq_provider.generate_chat_response("Capital?", "conv_3", "")
            called_json = mock_post.call_args[1].get("json", {})
            assert called_json["model"] == "qwen/qwen3.8-27b"
            assert isinstance(called_json["messages"], list)
            assert called_json["messages"][0]["role"] == "system"
            assert called_json["messages"][-1]["role"] == "user"
            assert called_json["messages"][-1]["content"] == "Capital?"
    asyncio.run(run())

# Test 4: Configurable model
def test_4_configurable_model():
    async def run():
        custom_provider = GroqProvider(api_key="gsk_test", model="custom-groq-model")
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "choices": [{"message": {"content": "Custom model response"}}]
        }
        with patch("requests.post", return_value=mock_resp) as mock_post:
            await custom_provider.generate_chat_response("Hello", "conv_4", "")
            called_json = mock_post.call_args[1].get("json", {})
            assert called_json["model"] == "custom-groq-model"
    asyncio.run(run())

# Test 5: HTTP 200 success
def test_5_http_200_success(groq_provider):
    async def run():
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "choices": [{"message": {"content": "### Mumbai\n\nThe capital of Maharashtra."}}]
        }
        with patch("requests.post", return_value=mock_resp):
            res = await groq_provider.generate_chat_response("Tell me about Mumbai", "conv_5", "")
            assert res is not None
            assert res["message"] == "### Mumbai\n\nThe capital of Maharashtra."
            assert res["avatar_state"] == "speaking"
            assert isinstance(res["suggestions"], list)
    asyncio.run(run())

# Test 6: HTTP 401 handling
def test_6_http_401_handling(groq_provider):
    async def run():
        mock_resp = MagicMock()
        mock_resp.status_code = 401
        with patch("requests.post", return_value=mock_resp):
            res = await groq_provider.generate_chat_response("Hello", "conv_6", "")
            assert res["error_type"] == "auth_error"
    asyncio.run(run())

# Test 7: HTTP 403 handling
def test_7_http_403_handling(groq_provider):
    async def run():
        mock_resp = MagicMock()
        mock_resp.status_code = 403
        with patch("requests.post", return_value=mock_resp):
            res = await groq_provider.generate_chat_response("Hello", "conv_7", "")
            assert res["error_type"] == "auth_error"
    asyncio.run(run())

# Test 8: HTTP 429 handling
def test_8_http_429_handling(groq_provider):
    async def run():
        mock_resp = MagicMock()
        mock_resp.status_code = 429
        with patch("requests.post", return_value=mock_resp):
            res = await groq_provider.generate_chat_response("Hello", "conv_8", "")
            assert res["error_type"] == "rate_limit"
    asyncio.run(run())

# Test 9: HTTP 5xx handling
def test_9_http_5xx_handling(groq_provider):
    async def run():
        mock_resp = MagicMock()
        mock_resp.status_code = 500
        with patch("requests.post", return_value=mock_resp):
            res = await groq_provider.generate_chat_response("Hello", "conv_9", "")
            assert res["error_type"] == "http_error"
    asyncio.run(run())

# Test 10: Timeout handling
def test_10_timeout_handling(groq_provider):
    async def run():
        import requests
        with patch("requests.post", side_effect=requests.exceptions.Timeout):
            res = await groq_provider.generate_chat_response("Hello", "conv_10", "")
            assert res["error_type"] == "timeout"
    asyncio.run(run())

# Test 11: Network failure handling
def test_11_network_failure_handling(groq_provider):
    async def run():
        import requests
        with patch("requests.post", side_effect=requests.exceptions.ConnectionError):
            res = await groq_provider.generate_chat_response("Hello", "conv_11", "")
            assert res["error_type"] == "network_error"
    asyncio.run(run())

# Test 12: 404 diagnostic handling
def test_12_404_diagnostic_handling(groq_provider):
    async def run():
        mock_resp = MagicMock()
        mock_resp.status_code = 404
        mock_resp.json.return_value = {
            "error": {"message": "The model `llama-3.3-70b-versatile` does not exist"}
        }
        with patch("requests.post", return_value=mock_resp):
            res = await groq_provider.generate_chat_response("Hello", "conv_12", "")
            assert res["error_type"] == "config_404"
            assert "llama-3.3-70b-versatile" in res["message"]
    asyncio.run(run())

# Test 13: 404 does not incorrectly poison all API keys
def test_13_404_does_not_poison_keys():
    async def run():
        km = GroqKeyManager({1: "gsk_key1", 2: "gsk_key2"})
        gp = GroqProvider(model="invalid-model")
        pm = ProviderManager(groq_key_manager=km, groq_provider=gp)

        mock_resp = MagicMock()
        mock_resp.status_code = 404
        mock_resp.json.return_value = {"error": {"message": "Model not found"}}

        with patch("requests.post", return_value=mock_resp):
            res = await pm.generate_chat_response("Hello", "conv_13", "")
            # Verify local fallback is executed
            assert "message" in res
            # Verify key slots failure count remains 0!
            health = km.get_health_status()
            assert health["slot_1"]["failures"] == 0
            assert health["slot_2"]["failures"] == 0
    asyncio.run(run())

# Test 14: Six-key rotation
def test_14_six_key_rotation():
    async def run():
        km = GroqKeyManager({
            1: "gsk_1", 2: "gsk_2", 3: "gsk_3", 4: "gsk_4", 5: "gsk_5", 6: "gsk_6"
        })
        gp = GroqProvider()
        pm = ProviderManager(groq_key_manager=km, groq_provider=gp)

        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {"choices": [{"message": {"content": "Response"}}]}

        called_keys = []
        async def mock_gen(*args, **kwargs):
            called_keys.append(kwargs.get("slot_id"))
            return {"message": "OK", "conversation_id": kwargs.get("conversation_id"), "avatar_state": "speaking", "suggestions": []}

        with patch.object(gp, "generate_chat_response", side_effect=mock_gen):
            for i in range(6):
                await pm.generate_chat_response(f"Q{i}", f"conv_rot_{i}", "")

        assert called_keys == [1, 2, 3, 4, 5, 6]
    asyncio.run(run())

# Test 15: Failed-key failover
def test_15_failed_key_failover():
    async def run():
        km = GroqKeyManager({1: "gsk_1", 2: "gsk_2"})
        gp = GroqProvider()
        pm = ProviderManager(groq_key_manager=km, groq_provider=gp)

        call_count = 0
        async def mock_gen(*args, **kwargs):
            nonlocal call_count
            call_count += 1
            if kwargs.get("slot_id") == 1:
                return {"error_type": "rate_limit", "status_code": 429}
            return {"message": "Success on Slot 2", "conversation_id": "conv_failover", "avatar_state": "speaking", "suggestions": []}

        with patch.object(gp, "generate_chat_response", side_effect=mock_gen):
            res = await pm.generate_chat_response("Hello", "conv_failover", "")
            assert res["message"] == "Success on Slot 2"
            assert call_count == 2
    asyncio.run(run())

# Test 16: Conversation history propagation
def test_16_conversation_history_propagation(groq_provider):
    async def run():
        history = [
            {"role": "user", "content": "Tell me about Raigad Fort"},
            {"role": "assistant", "content": "Raigad Fort is a hill fort."}
        ]
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {"choices": [{"message": {"content": "Raigad is in Mahad."}}]}

        with patch("requests.post", return_value=mock_resp) as mock_post:
            await groq_provider.generate_chat_response("Where is it?", "conv_hist", "", history)
            called_json = mock_post.call_args[1].get("json", {})
            msgs = called_json["messages"]
            assert msgs[1]["content"] == "Tell me about Raigad Fort"
            assert msgs[2]["content"] == "Raigad Fort is a hill fort."
            assert msgs[3]["content"] == "Where is it?"
    asyncio.run(run())

# Test 17: Local fallback
def test_17_local_fallback():
    async def run():
        km = GroqKeyManager({})
        pm = ProviderManager(groq_key_manager=km)
        res = await pm.generate_chat_response("Tell me about Raigad Fort", "conv_17", "")
        assert "Raigad Fort" in res["message"]
        assert res["avatar_state"] == "speaking"
    asyncio.run(run())

# Test 18: Secret protection
def test_18_secret_protection():
    km = GroqKeyManager({1: "gsk_secret123", 2: "your_placeholder"})
    summary = km.get_configured_slots_summary()
    assert summary["slot_1"] == "configured"
    assert summary["slot_2"] == "unconfigured"
    assert "gsk_secret123" not in str(summary)

# Test 19: Frozen API response contract
def test_19_frozen_api_response_contract():
    with TestClient(app) as client:
        res = client.post("/api/ai/chat", json={"message": "What is the capital of Maharashtra?"})
        assert res.status_code == 200
        body = res.json()
        assert body["success"] is True
        assert "message" in body["data"]
        assert "conversation_id" in body["data"]
        assert body["data"]["avatar_state"] in ["speaking", "idle", "thinking"]
        assert isinstance(body["data"]["suggestions"], list)
        assert body["error"] is None

# Test 20: No frontend credential exposure
def test_20_no_frontend_credential_exposure():
    with TestClient(app) as client:
        res = client.post("/api/ai/chat", json={"message": "Tell me about Vada Pav"})
        assert res.status_code == 200
        text = res.text
        assert "GROQ_API_KEY" not in text
        assert "Bearer" not in text
