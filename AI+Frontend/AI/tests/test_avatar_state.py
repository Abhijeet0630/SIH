import pytest
from app.services.avatar_service import avatar_service, AvatarState, SUPPORTED_AVATAR_STATES
from app.schemas.chat import ChatResponseData
from fastapi.testclient import TestClient
from app.main import app
from app.services.ai_service import get_ai_service, AIServiceInterface

client = TestClient(app)

def test_supported_avatar_states_enum():
    """Verifies core and extended avatar states are supported."""
    assert AvatarState.IDLE.value == "idle"
    assert AvatarState.THINKING.value == "thinking"
    assert AvatarState.SPEAKING.value == "speaking"
    
    # Extended future states
    assert AvatarState.HAPPY.value == "happy"
    assert AvatarState.CURIOUS.value == "curious"
    assert AvatarState.SURPRISED.value == "surprised"
    assert AvatarState.EXCITED.value == "excited"

def test_avatar_state_validation_and_coercion():
    """Tests that invalid or unknown avatar state strings fall back safely to 'speaking'."""
    assert avatar_service.validate_or_default("speaking") == "speaking"
    assert avatar_service.validate_or_default("idle") == "idle"
    assert avatar_service.validate_or_default("thinking") == "thinking"
    assert avatar_service.validate_or_default("happy") == "happy"
    assert avatar_service.validate_or_default("curious") == "curious"
    
    # Invalid / Unsupported states coerce to default 'speaking'
    assert avatar_service.validate_or_default("flying_superman") == "speaking"
    assert avatar_service.validate_or_default(None) == "speaking"
    assert avatar_service.validate_or_default("") == "speaking"

def test_avatar_state_determination_for_responses():
    """Tests state calculation for normal responses and error states."""
    # Normal response
    state = avatar_service.determine_avatar_state("Here is information about Vada Pav.")
    assert state in SUPPORTED_AVATAR_STATES
    assert state == "speaking"

    # Error state
    err_state = avatar_service.determine_avatar_state("Error message", is_error=True)
    assert err_state == "idle"

    # Excited response
    excited_state = avatar_service.determine_avatar_state("Welcome to this amazing 3D experience!")
    assert excited_state == "excited"

def test_schema_coercion_on_chat_response_data():
    """Tests Pydantic validator on ChatResponseData schema."""
    data = ChatResponseData(
        message="Test message",
        conversation_id="conv_123",
        avatar_state="invalid_state_xyz"
    )
    # Pydantic field validator should coerce invalid_state_xyz to 'speaking'
    assert data.avatar_state == "speaking"

class MockCustomAvatarAIService(AIServiceInterface):
    def __init__(self, state_to_return: str):
        self.state_to_return = state_to_return

    async def generate_chat_response(self, message: str, conversation_id: str, context_str: str, history=None):
        return {
            "message": "Mock answer",
            "conversation_id": conversation_id,
            "avatar_state": self.state_to_return,
            "suggestions": []
        }

def test_api_contract_avatar_state_preservation():
    """Verifies POST /api/ai/chat returns valid avatar_state in response envelope."""
    mock_service = MockCustomAvatarAIService(state_to_return="happy")
    app.dependency_overrides[get_ai_service] = lambda: mock_service

    try:
        response = client.post("/api/ai/chat", json={"message": "Tell me a fun fact about Raigad Fort"})
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["avatar_state"] == "happy"
    finally:
        app.dependency_overrides.clear()
