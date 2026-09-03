import pytest
import asyncio
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app
from app.services.fallback_engine import LocalFallbackEngine
from app.services.provider_manager import ProviderManager

client = TestClient(app)

# Test 1: LocalFallbackEngine imports successfully
def test_1_local_fallback_engine_import():
    engine = LocalFallbackEngine()
    assert engine is not None
    assert hasattr(engine, "get_fallback_response")

# Test 2: LocalFallbackEngine can generate a local fallback response
def test_2_generate_fallback_response():
    engine = LocalFallbackEngine()
    res = engine.get_fallback_response("Tell me about Paithani Saree", "c_p29_2", "")
    assert res is not None
    assert "message" in res
    assert "Paithani" in res["message"]
    assert res["conversation_id"] == "c_p29_2"

# Test 3: Raigad Fort fallback works
def test_3_raigad_fort_fallback():
    engine = LocalFallbackEngine()
    res = engine.get_fallback_response("Tell me about Raigad Fort", "c_p29_3", "")
    assert "Raigad Fort" in res["message"]
    assert "Maratha" in res["message"] or "Shivaji" in res["message"]

# Test 4: Vada Pav fallback works
def test_4_vada_pav_fallback():
    engine = LocalFallbackEngine()
    res = engine.get_fallback_response("Where is Vada Pav famous?", "c_p29_4", "")
    assert "Vada Pav" in res["message"]
    assert "Mumbai" in res["message"] or "Maharashtra" in res["message"]

# Test 5: Living Root Bridges fallback works
def test_5_living_root_bridges_fallback():
    engine = LocalFallbackEngine()
    res = engine.get_fallback_response("How are Living Root Bridges grown?", "c_p29_5", "")
    assert "Root Bridges" in res["message"] or "Khasi" in res["message"] or "Meghalaya" in res["message"]

# Test 6: Explicit topic overrides stale history
def test_6_explicit_topic_overrides_stale_history():
    engine = LocalFallbackEngine()
    history = [
        {"role": "user", "content": "Tell me about Raigad Fort"},
        {"role": "assistant", "content": "Raigad Fort was the Maratha capital."}
    ]
    res = engine.get_fallback_response("Where is Vada Pav famous?", "c_p29_6", "", history)
    assert "Vada Pav" in res["message"]
    assert "Raigad Fort is located in Mahad" not in res["message"]

# Test 7: Pronoun resolution still works
def test_7_pronoun_resolution_works():
    engine = LocalFallbackEngine()
    history = [
        {"role": "user", "content": "Tell me about Raigad Fort"},
        {"role": "assistant", "content": "Raigad Fort was the Maratha capital."}
    ]
    res = engine.get_fallback_response("Where is it?", "c_p29_7", "", history)
    assert "Mahad" in res["message"] or "Maharashtra" in res["message"]

# Test 8: Concise response behavior remains intact (approx 50-120 words)
def test_8_concise_response_behavior():
    engine = LocalFallbackEngine()
    res = engine.get_fallback_response("Who built Raigad Fort?", "c_p29_8", "")
    words = len(res["message"].split())
    assert words <= 120

# Test 9: Suggestions generation still works
def test_9_suggestions_generation_works():
    engine = LocalFallbackEngine()
    res = engine.get_fallback_response("Who built Raigad Fort?", "c_p29_9", "")
    assert "suggestions" in res
    assert isinstance(res["suggestions"], list)
    assert len(res["suggestions"]) > 0

# Test 10: ProviderManager uses LocalFallbackEngine
def test_10_provider_manager_uses_local_fallback_engine():
    pm = ProviderManager()
    assert hasattr(pm, "fallback_engine")
    assert isinstance(pm.fallback_engine, LocalFallbackEngine)

# Test 11: No Gemini API request is made when Groq is unavailable
def test_11_no_gemini_api_request_made():
    pm = ProviderManager()
    with patch("requests.post") as mock_post:
        res = pm.fallback_engine.get_fallback_response("Tell me about Idli origin", "c_p29_11", "")
        mock_post.assert_not_called()
        assert "Idli" in res["message"]

# Test 12: No Gemini API key is required
def test_12_no_gemini_api_key_required():
    # Instantiating ProviderManager without any keys works cleanly
    pm = ProviderManager()
    res = pm.fallback_engine.get_fallback_response("Tell me about Muga Silk", "c_p29_12", "")
    assert "Muga Silk" in res["message"]
