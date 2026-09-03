import time
import asyncio
import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app
from app.services.groq_key_manager import GroqKeyManager
from app.services.provider_manager import ProviderManager
from app.services.providers.groq_provider import GroqProvider
from app.services.fallback_engine import LocalFallbackEngine

# Test 1 — Six-Key Rotation
def test_1_six_key_rotation():
    keys = {
        1: "mock_groq_key_1",
        2: "mock_groq_key_2",
        3: "mock_groq_key_3",
        4: "mock_groq_key_4",
        5: "mock_groq_key_5",
        6: "mock_groq_key_6"
    }
    km = GroqKeyManager(keys_dict=keys)
    assert km.configured_slots == [1, 2, 3, 4, 5, 6]

    s1 = km.get_healthy_slots_sequence()
    assert s1 == [1, 2, 3, 4, 5, 6]

    s2 = km.get_healthy_slots_sequence()
    assert s2 == [2, 3, 4, 5, 6, 1]

    s3 = km.get_healthy_slots_sequence()
    assert s3 == [3, 4, 5, 6, 1, 2]

    s4 = km.get_healthy_slots_sequence()
    assert s4 == [4, 5, 6, 1, 2, 3]

    s5 = km.get_healthy_slots_sequence()
    assert s5 == [5, 6, 1, 2, 3, 4]

    s6 = km.get_healthy_slots_sequence()
    assert s6 == [6, 1, 2, 3, 4, 5]

    s7 = km.get_healthy_slots_sequence()
    assert s7 == [1, 2, 3, 4, 5, 6]

# Test 2 — Partial Configuration
def test_2_partial_configuration():
    keys = {
        1: "mock_key_1",
        2: "mock_key_2",
        3: "mock_key_3",
        4: "",
        5: "",
        6: ""
    }
    km = GroqKeyManager(keys_dict=keys)
    assert km.configured_slots == [1, 2, 3]

    assert km.get_healthy_slots_sequence() == [1, 2, 3]
    assert km.get_healthy_slots_sequence() == [2, 3, 1]
    assert km.get_healthy_slots_sequence() == [3, 1, 2]
    assert km.get_healthy_slots_sequence() == [1, 2, 3]

# Test 3 — Empty Keys
def test_3_empty_keys_ignored():
    keys = {1: "mock_key_1", 2: "  ", 3: "", 4: None}
    km = GroqKeyManager(keys_dict=keys)
    assert km.configured_slots == [1]

# Test 4 — Placeholder Keys
def test_4_placeholder_keys_ignored():
    keys = {
        1: "your_groq_api_key_1",
        2: "your_groq_api_key_2",
        3: "real_configured_key_3"
    }
    km = GroqKeyManager(keys_dict=keys)
    assert km.configured_slots == [3]

# Test 5 — HTTP 429
def test_5_http_429_failover():
    keys = {1: "mock_key_1", 2: "mock_key_2"}
    km = GroqKeyManager(keys_dict=keys)
    groq_provider = GroqProvider()
    
    # Mock slot 1 returning None (rate limited) and slot 2 returning response
    async def mock_gen(message, conversation_id, context_str, history, api_key, slot_id):
        if slot_id == 1:
            return None
        return {
            "message": "Response from key slot 2",
            "conversation_id": conversation_id,
            "avatar_state": "speaking",
            "suggestions": []
        }

    groq_provider.generate_chat_response = AsyncMock(side_effect=mock_gen)
    pm = ProviderManager(groq_key_manager=km, groq_provider=groq_provider)

    res = asyncio.run(pm.generate_chat_response("Tell me about Raigad Fort", "conv_429", ""))
    assert res["message"] == "Response from key slot 2"

# Test 6 — HTTP 500
def test_6_http_500_failover():
    keys = {1: "mock_key_1", 2: "mock_key_2"}
    km = GroqKeyManager(keys_dict=keys)
    groq_provider = GroqProvider()

    async def mock_gen(message, conversation_id, context_str, history, api_key, slot_id):
        if slot_id == 1:
            return None
        return {
            "message": "Response from key slot 2 on 500 failover",
            "conversation_id": conversation_id,
            "avatar_state": "speaking",
            "suggestions": []
        }

    groq_provider.generate_chat_response = AsyncMock(side_effect=mock_gen)
    pm = ProviderManager(groq_key_manager=km, groq_provider=groq_provider)

    res = asyncio.run(pm.generate_chat_response("Tell me about Raigad Fort", "conv_500", ""))
    assert res["message"] == "Response from key slot 2 on 500 failover"

# Test 7 — Timeout
def test_7_timeout_failover():
    keys = {1: "mock_key_1", 2: "mock_key_2"}
    km = GroqKeyManager(keys_dict=keys)
    groq_provider = GroqProvider()

    async def mock_gen(message, conversation_id, context_str, history, api_key, slot_id):
        if slot_id == 1:
            raise Exception("Timeout")
        return {
            "message": "Response from key slot 2 on timeout",
            "conversation_id": conversation_id,
            "avatar_state": "speaking",
            "suggestions": []
        }

    groq_provider.generate_chat_response = AsyncMock(side_effect=mock_gen)
    pm = ProviderManager(groq_key_manager=km, groq_provider=groq_provider)

    res = asyncio.run(pm.generate_chat_response("Tell me about Raigad Fort", "conv_to", ""))
    assert res["message"] == "Response from key slot 2 on timeout"

# Test 8 — All Keys Fail
def test_8_all_keys_fail_local_fallback():
    keys = {1: "mock_key_1", 2: "mock_key_2"}
    km = GroqKeyManager(keys_dict=keys)
    groq_provider = GroqProvider()
    groq_provider.generate_chat_response = AsyncMock(return_value=None)

    pm = ProviderManager(groq_key_manager=km, groq_provider=groq_provider)
    res = asyncio.run(pm.generate_chat_response("How many gates are there on Raigad Fort?", "conv_all_fail", ""))
    assert "Maha Darwaja" in res["message"] or "Gates" in res["message"]
    assert res["conversation_id"] == "conv_all_fail"

# Test 9 — Unhealthy Key
def test_9_unhealthy_key_skipped():
    keys = {1: "mock_key_1", 2: "mock_key_2"}
    km = GroqKeyManager(keys_dict=keys)
    
    # Fail slot 1 three times to trip circuit breaker
    km.record_failure(1)
    km.record_failure(1)
    km.record_failure(1)

    assert km.is_slot_healthy(1) is False
    assert km.is_slot_healthy(2) is True

    seq = km.get_healthy_slots_sequence()
    assert 1 not in seq
    assert 2 in seq

# Test 10 — Cooldown Recovery
def test_10_cooldown_recovery():
    keys = {1: "mock_key_1"}
    km = GroqKeyManager(keys_dict=keys)

    km.record_failure(1)
    km.record_failure(1)
    km.record_failure(1)
    assert km.is_slot_healthy(1) is False

    # Mock time passing beyond cooldown
    with patch("time.time", return_value=time.time() + 35.0):
        assert km.is_slot_healthy(1) is True

# Test 11 — Successful Request Resets Failures
def test_11_successful_request_resets_failures():
    keys = {1: "mock_key_1"}
    km = GroqKeyManager(keys_dict=keys)

    km.record_failure(1)
    km.record_failure(1)
    assert km._failures[1] == 2

    km.record_success(1)
    assert km._failures[1] == 0
    assert km.is_slot_healthy(1) is True

# Test 12 — Concurrent Requests
def test_12_concurrent_requests_safety():
    keys = {1: "k1", 2: "k2", 3: "k3"}
    km = GroqKeyManager(keys_dict=keys)

    results = []
    def run_worker():
        for _ in range(100):
            seq = km.get_healthy_slots_sequence()
            if seq:
                results.append(seq[0])

    import threading
    threads = [threading.Thread(target=run_worker) for _ in range(5)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()

    assert len(results) == 500
    assert set(results).issubset({1, 2, 3})

# Test 13 — Conversation History Survives Key Rotation
def test_13_conversation_history_survives_key_rotation():
    with TestClient(app) as client:
        t1 = client.post("/api/ai/chat", json={"message": "Tell me about Raigad Fort"})
        conv_id = t1.json()["data"]["conversation_id"]

        t2 = client.post("/api/ai/chat", json={
            "message": "Where is it?",
            "conversation_id": conv_id
        })
        assert t2.json()["data"]["conversation_id"] == conv_id
        assert "Mahad" in t2.json()["data"]["message"] or "Location" in t2.json()["data"]["message"]

# Test 14 — Secret Protection
def test_14_secret_protection():
    with TestClient(app) as client:
        res = client.post("/api/ai/chat", json={"message": "Tell me about Raigad Fort"})
        assert res.status_code == 200
        res_text = res.text
        assert "GROQ_API_KEY" not in res_text
        assert "Bearer" not in res_text
        assert "your_groq_api_key" not in res_text

# Test 15 — API Contract
def test_15_api_contract_preserved():
    with TestClient(app) as client:
        res = client.post("/api/ai/chat", json={"message": "What is Hirakani Buruj?"})
        assert res.status_code == 200
        body = res.json()
        assert body["success"] is True
        assert "message" in body["data"]
        assert "conversation_id" in body["data"]
        assert body["data"]["avatar_state"] in ["speaking", "idle", "thinking"]
        assert isinstance(body["data"]["suggestions"], list)
        assert body["error"] is None
