import pytest
import asyncio
from unittest.mock import patch
from app.schemas.chat import ChatContext
from app.services.context_service import context_service

def test_missing_context():
    """Tests handling of None, empty, or default ChatContext."""
    ctx_data = context_service.process_context(None)
    assert ctx_data["has_context"] is False
    assert ctx_data["state"] is None
    assert ctx_data["item"] is None
    assert context_service.format_context_prompt(None) == ""

    ctx_empty = ChatContext(state_id="", category="", item_id="", view="/")
    assert context_service.format_context_prompt(ctx_empty) == ""

def test_state_context_resolution():
    """Tests normalization of state codes like 'mh' -> 'Maharashtra' and prompt generation."""
    ctx = ChatContext(state_id="mh", view="/state/maharashtra")
    ctx_data = context_service.process_context(ctx)
    assert ctx_data["has_context"] is True
    assert ctx_data["state"] == "Maharashtra"

    prompt = context_service.format_context_prompt(ctx)
    assert "Active State/Region: Maharashtra" in prompt
    assert "referring to Maharashtra" in prompt

def test_culture_item_context_resolution():
    """Tests normalization of item slugs like 'vada-pav' -> 'Vada Pav' and prompt formatting."""
    ctx = ChatContext(item_id="vada-pav", view="/item/vada-pav")
    ctx_data = context_service.process_context(ctx)
    assert ctx_data["has_context"] is True
    assert ctx_data["item"] == "Vada Pav"

    prompt = context_service.format_context_prompt(ctx)
    assert "Active Heritage Item: Vada Pav" in prompt
    assert "referring to 'Vada Pav'" in prompt

def test_combined_context_resolution():
    """Tests state_id, category, item_id, and view combined."""
    ctx = ChatContext(
        state_id="as",
        category="fashion",
        item_id="muga-silk",
        view="/item/muga-silk"
    )
    ctx_data = context_service.process_context(ctx)
    assert ctx_data["has_context"] is True
    assert ctx_data["state"] == "Assam"
    assert ctx_data["category"] == "Textiles & Costumes"
    assert ctx_data["item"] == "Muga Silk"

    prompt = context_service.format_context_prompt(ctx)
    assert "Active State/Region: Assam" in prompt
    assert "Active Category: Textiles & Costumes" in prompt
    assert "Active Heritage Item: Muga Silk" in prompt

def test_unknown_or_invalid_context_ids():
    """Tests unknown or unmapped state/item IDs degrade gracefully without crashing."""
    ctx = ChatContext(
        state_id="unknown_state_xyz",
        category="unknown_category_abc",
        item_id="custom-unknown-monument-123"
    )
    ctx_data = context_service.process_context(ctx)
    assert ctx_data["has_context"] is True
    assert ctx_data["state"] == "unknown_state_xyz"
    assert ctx_data["category"] == "Unknown_category_abc"
    assert ctx_data["item"] == "Custom Unknown Monument 123"

    prompt = context_service.format_context_prompt(ctx)
    assert "Active State/Region: unknown_state_xyz" in prompt
    assert "Active Heritage Item: Custom Unknown Monument 123" in prompt

def test_future_backend_client_stub():
    """Tests the decoupled backend client interface method returns None when backend is offline."""
    with patch("requests.get", side_effect=Exception("Backend offline")):
        res = context_service.fetch_backend_cultural_context("state", "mh")
        assert res is None
