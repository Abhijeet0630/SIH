import pytest
import asyncio
import requests
from unittest.mock import patch, MagicMock
from app.services.providers.base import AIServiceInterface
from app.services.providers.groq_provider import GroqProvider
from app.services.fallback_engine import LocalFallbackEngine
from app.services.provider_manager import ProviderManager
from app.services.ai_service import get_ai_service
from app.core.config import settings

def test_successful_mocked_groq_response():
    """Tests successful HTTP 200 response handling from GroqProvider."""
    async def run():
        provider = GroqProvider()
        
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "choices": [
                {
                    "message": {
                        "content": "Paithani Sarees are crafted in Maharashtra."
                    }
                }
            ]
        }

        with patch("requests.post", return_value=mock_resp):
            result = await provider.generate_chat_response(
                message="Tell me about Paithani Saree",
                conversation_id="conv_groq1",
                context_str="",
                api_key="mock_groq_key",
                slot_id=1
            )

        assert result["message"] == "Paithani Sarees are crafted in Maharashtra."
        assert result["conversation_id"] == "conv_groq1"
        assert result["avatar_state"] == "speaking"
        assert "suggestions" in result

    asyncio.run(run())

def test_provider_failure_graceful_fallback():
    """Tests HTTP 500 or upstream API failure gracefully falls back without throwing exceptions."""
    async def run():
        provider = GroqProvider()
        
        mock_resp = MagicMock()
        mock_resp.status_code = 500
        mock_resp.text = "Internal Error"

        with patch("requests.post", return_value=mock_resp):
            result = await provider.generate_chat_response(
                message="Tell me about Vada Pav",
                conversation_id="conv_fail",
                context_str="",
                api_key="mock_key",
                slot_id=1
            )

        assert result is None or "error_type" in result

    asyncio.run(run())

def test_provider_timeout_handling():
    """Tests connection timeout exception is caught gracefully."""
    async def run():
        provider = GroqProvider()

        with patch("requests.post", side_effect=requests.exceptions.Timeout("Connection timed out")):
            result = await provider.generate_chat_response(
                message="Tell me about Living Root Bridges",
                conversation_id="conv_timeout",
                context_str="",
                api_key="mock_key",
                slot_id=1
            )

        assert result is None or "error_type" in result

    asyncio.run(run())

def test_local_fallback_engine_behavior():
    """Tests local fallback engine generates grounded responses offline."""
    engine = LocalFallbackEngine()
    result = engine.get_fallback_response(
        message="What is Muga Silk?",
        conversation_id="conv_nokey",
        context_str=""
    )
    assert result["message"].startswith("**Muga Silk") or "Muga Silk" in result["message"]
    assert result["conversation_id"] == "conv_nokey"
    assert result["avatar_state"] == "speaking"

def test_provider_abstraction_interface_behavior():
    """Verifies GroqProvider and ProviderManager inherit from AIServiceInterface."""
    groq = GroqProvider()
    mgr = ProviderManager()

    assert isinstance(groq, AIServiceInterface)
    assert isinstance(mgr, AIServiceInterface)

def test_get_ai_service_factory():
    """Verifies factory function instantiates ProviderManager orchestrator."""
    srv = get_ai_service()
    assert isinstance(srv, AIServiceInterface)
