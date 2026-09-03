"""Tests for /api/ai/chat"""
import pytest


@pytest.mark.anyio
async def test_ai_chat_basic(client):
    response = await client.post(
        "/api/ai/chat",
        json={"message": "Who built the Gateway of India?"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    data = body["data"]
    assert "message" in data
    assert "conversation_id" in data
    assert "avatar_state" in data
    assert len(data["message"]) > 0


@pytest.mark.anyio
async def test_ai_chat_with_context(client):
    response = await client.post(
        "/api/ai/chat",
        json={
            "message": "Tell me about its architecture.",
            "conversation_id": None,
            "context": {
                "state_id": "mh",
                "category": "forts",
                "item_id": "raigad-fort",
                "view": "architecture",
            },
        },
    )
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    data = body["data"]
    assert "message" in data
    assert "conversation_id" in data
    assert isinstance(data.get("suggestions", []), list)


@pytest.mark.anyio
async def test_ai_chat_continues_conversation(client):
    """Verify the same conversation_id is echoed back."""
    conv_id = "test-conv-123"
    response = await client.post(
        "/api/ai/chat",
        json={"message": "Hello", "conversation_id": conv_id},
    )
    body = response.json()
    assert body["data"]["conversation_id"] == conv_id
