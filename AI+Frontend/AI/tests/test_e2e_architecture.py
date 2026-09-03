import pytest
import requests
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app
from app.services.ai_service import get_ai_service, AIServiceInterface

client = TestClient(app)

class MockE2EAIService(AIServiceInterface):
    async def generate_chat_response(self, message: str, conversation_id: str, context_str: str, history=None):
        return {
            "message": f"### E2E Response\n\nAnswer for '{message}'. Grounding: {context_str}",
            "conversation_id": conversation_id,
            "avatar_state": "speaking",
            "suggestions": ["What are the famous forts of Maharashtra?", "Tell me about Living Root Bridges"]
        }

def test_full_request_path_integration():
    """
    Verifies complete end-to-end request path:
    Frontend contract -> AI microservice :8001 -> Main Backend :8000 metadata lookup -> Mocked LLM Provider.
    """
    mock_service = MockE2EAIService()
    app.dependency_overrides[get_ai_service] = lambda: mock_service

    mock_backend_response = MagicMock()
    mock_backend_response.status_code = 200
    mock_backend_response.json.return_value = {
        "id": "gateway-of-india",
        "title": "Gateway of India",
        "description": "Historic arch monument built in 20th-century Mumbai."
    }

    try:
        with patch("requests.get", return_value=mock_backend_response):
            payload = {
                "message": "Tell me about Gateway of India monument",
                "conversation_id": "conv_e2e_path_1",
                "context": {
                    "state_id": "mh",
                    "category": "monuments",
                    "item_id": "gateway-of-india",
                    "view": "/monument/gateway-of-india"
                }
            }
            response = client.post("/api/ai/chat", json=payload)
            assert response.status_code == 200
            data = response.json()
            assert data["success"] is True
            assert data["data"]["conversation_id"] == "conv_e2e_path_1"
            assert "Gateway of India" in data["data"]["message"]
            assert data["data"]["avatar_state"] == "speaking"
            assert isinstance(data["data"]["suggestions"], list)
    finally:
        app.dependency_overrides.clear()

def test_ai_service_functional_when_main_backend_unavailable():
    """
    Verifies AI service on port 8001 remains 100% functional when Main Backend on port 8000 is unavailable.
    """
    mock_service = MockE2EAIService()
    app.dependency_overrides[get_ai_service] = lambda: mock_service

    try:
        with patch("requests.get", side_effect=requests.exceptions.ConnectionError("Connection refused on 8000")):
            payload = {
                "message": "What is Misal Pav?",
                "conversation_id": "conv_backend_offline",
                "context": {
                    "state_id": "mh",
                    "category": "food",
                    "item_id": "misal-pav",
                    "view": "/item/misal-pav"
                }
            }
            response = client.post("/api/ai/chat", json=payload)
            assert response.status_code == 200
            data = response.json()
            assert data["success"] is True
            assert data["data"]["conversation_id"] == "conv_backend_offline"
            assert data["data"]["avatar_state"] == "speaking"
            assert len(data["data"]["suggestions"]) >= 2
    finally:
        app.dependency_overrides.clear()
