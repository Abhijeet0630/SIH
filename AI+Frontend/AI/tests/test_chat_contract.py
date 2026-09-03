import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.ai_service import get_ai_service, AIServiceInterface

client = TestClient(app)

class MockAIService(AIServiceInterface):
    async def generate_chat_response(self, message: str, conversation_id: str, context_str: str, history=None):
        return {
            "message": f"Mock response for: {message}",
            "conversation_id": conversation_id,
            "avatar_state": "speaking",
            "suggestions": ["What are the famous forts of Maharashtra?", "Tell me about Living Root Bridges"]
        }

@pytest.fixture
def override_ai_service():
    mock_service = MockAIService()
    app.dependency_overrides[get_ai_service] = lambda: mock_service
    yield mock_service
    app.dependency_overrides.clear()

def test_valid_request_contract(override_ai_service):
    """Tests full valid request contract with message, conversation_id, and context."""
    payload = {
        "message": "Tell me about Vada Pav",
        "conversation_id": "conv_test123",
        "context": {
            "state_id": "mh",
            "category": "food",
            "item_id": "vada-pav",
            "view": "/item/vada-pav"
        }
    }
    response = client.post("/api/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["message"] == "Mock response for: Tell me about Vada Pav"
    assert data["data"]["conversation_id"] == "conv_test123"
    assert data["data"]["avatar_state"] == "speaking"
    assert isinstance(data["data"]["suggestions"], list)

def test_missing_conversation_id_generates_id(override_ai_service):
    """Tests that missing conversation_id automatically generates a valid session ID."""
    payload = {
        "message": "Tell me about Muga Silk",
        "context": {
            "state_id": "as",
            "category": "fashion",
            "item_id": "muga-silk",
            "view": "/item/muga-silk"
        }
    }
    response = client.post("/api/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["conversation_id"] is not None
    assert data["data"]["conversation_id"].startswith("conv_")

def test_missing_context(override_ai_service):
    """Tests request without optional context field."""
    payload = {
        "message": "Tell me about Living Root Bridges",
        "conversation_id": "conv_nocontext"
    }
    response = client.post("/api/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["conversation_id"] == "conv_nocontext"

def test_empty_message_returns_validation_error(override_ai_service):
    """Tests empty or whitespace message returns 400 validation error."""
    response = client.post("/api/ai/chat", json={"message": ""})
    assert response.status_code == 400

    response = client.post("/api/ai/chat", json={"message": "    "})
    assert response.status_code == 400

def test_invalid_schema_returns_422():
    """Tests missing required message field returns 422 validation error."""
    response = client.post("/api/ai/chat", json={"invalid_key": "sample"})
    assert response.status_code == 422

def test_response_envelope_strict_schema(override_ai_service):
    """Verifies response structure envelope and ensures no provider internals are exposed."""
    payload = {"message": "What is Paithani Saree?"}
    response = client.post("/api/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()

    # Exact envelope top-level keys
    assert set(data.keys()) == {"success", "data", "error"}
    
    # Exact data payload keys
    data_obj = data["data"]
    assert set(data_obj.keys()) == {"message", "conversation_id", "avatar_state", "suggestions"}
    
    # Verify no LLM provider leak
    assert "api_key" not in data_obj
    assert "candidates" not in data_obj
    assert "gemini" not in data_obj
