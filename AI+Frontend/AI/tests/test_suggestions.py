import pytest
from app.schemas.chat import ChatContext
from app.services.suggestion_service import suggestion_service
from fastapi.testclient import TestClient
from app.main import app
from app.services.ai_service import get_ai_service, AIServiceInterface

client = TestClient(app)

def test_suggestions_food_specific():
    """Tests food-specific queries return relevant food follow-up questions."""
    suggestions = suggestion_service.generate_suggestions("Tell me about Vada Pav")
    assert len(suggestions) >= 2
    assert any("Vada Pav" in s or "prepared" in s or "street foods" in s for s in suggestions)
    assert not any("3D fort" in s for s in suggestions)

def test_suggestions_monument_specific():
    """Tests monument and fort queries return monument follow-up questions."""
    ctx = ChatContext(category="monuments", item_id="raigad-fort", view="/item/raigad-fort")
    suggestions = suggestion_service.generate_suggestions("Who built this fort?", context=ctx)
    assert len(suggestions) >= 2
    assert any("Raigad Fort" in s or "constructed" in s or "architectural" in s or "3D" in s for s in suggestions)

def test_suggestions_festival_specific():
    """Tests festival queries return festival follow-up questions."""
    suggestions = suggestion_service.generate_suggestions("Tell me about Bihu festival")
    assert len(suggestions) >= 2
    assert any("Bihu" in s or "celebrated" in s or "dishes" in s for s in suggestions)

def test_suggestions_state_specific():
    """Tests state-level exploration context returns state follow-up questions."""
    ctx = ChatContext(state_id="mh", view="/state/maharashtra")
    suggestions = suggestion_service.generate_suggestions("What should I see here?", context=ctx)
    assert len(suggestions) >= 2
    assert any("Maharashtra" in s for s in suggestions)

def test_suggestions_textile_craft_specific():
    """Tests textile and craft queries return textile follow-up questions."""
    suggestions = suggestion_service.generate_suggestions("Tell me about Paithani Saree")
    assert len(suggestions) >= 2
    assert any("Paithani Saree" in s or "woven" in s or "techniques" in s for s in suggestions)

def test_empty_or_missing_llm_suggestions_fallback():
    """Tests empty/invalid LLM suggestions fall back to contextual suggestions cleanly."""
    suggestions_empty = suggestion_service.generate_suggestions("Tell me about Living Root Bridges", llm_suggestions=[])
    assert len(suggestions_empty) >= 2
    assert any("Living Root Bridges" in s or "Root Bridges" in s for s in suggestions_empty)

def test_valid_llm_suggestions_preserved():
    """Tests clean, valid LLM suggestions are preserved when available."""
    custom = [
        "What are the historical trade routes near Ellora Caves?",
        "Which dynasty patronized Kailasa Temple?"
    ]
    res = suggestion_service.generate_suggestions("Tell me about Ellora Caves", llm_suggestions=custom)
    assert res == custom

class MockNoSuggestionAIService(AIServiceInterface):
    async def generate_chat_response(self, message: str, conversation_id: str, context_str: str, history=None):
        return {
            "message": "Mock answer",
            "conversation_id": conversation_id,
            "avatar_state": "speaking",
            "suggestions": []
        }

def test_api_contract_suggestions_integration():
    """Verifies POST /api/ai/chat returns contextually relevant suggestions array in response envelope."""
    mock_service = MockNoSuggestionAIService()
    app.dependency_overrides[get_ai_service] = lambda: mock_service

    try:
        payload = {
            "message": "How is Misal Pav prepared?",
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
        suggestions = data["data"]["suggestions"]
        assert isinstance(suggestions, list)
        assert len(suggestions) >= 2
        assert any("Misal Pav" in s or "prepared" in s or "street foods" in s for s in suggestions)
    finally:
        app.dependency_overrides.clear()
