import pytest
import asyncio
from app.prompts.cultural_guide import get_system_prompt, get_off_topic_refusal, CULTURAL_GUIDE_SYSTEM_PROMPT
from app.services.fallback_engine import LocalFallbackEngine

def test_cultural_guide_personality_prompt_content():
    """Verifies that system prompt defines personality traits and cultural domains."""
    prompt = get_system_prompt()
    
    # Personality traits
    assert "Bharat AI Cultural Guide" in prompt
    assert "Friendly" in prompt
    assert "conversational" in prompt
    assert "intelligent" in prompt
    assert "informal phrasing" in prompt
    assert "typos" in prompt
    
    # Cultural domains
    assert "States & Spatial Atlases" in prompt
    assert "Architecture & Monuments" in prompt
    assert "Culinary Heritage" in prompt
    assert "Performing Arts & Music" in prompt
    assert "Traditional Crafts & Textiles" in prompt
    assert "Festivals & Celebrations" in prompt
    assert "History, Lineages & Connections" in prompt

def test_off_topic_refusal_helper():
    """Verifies off-topic refusal message format."""
    refusal = get_off_topic_refusal()
    assert "specialized solely in India's cultural heritage" in refusal
    assert "Please ask me anything about our monuments" in refusal

def test_boundary_refusal_handling():
    """Tests LocalFallbackEngine handles off-topic non-heritage queries with polite refusal."""
    engine = LocalFallbackEngine()
    result = engine.get_fallback_response(
        message="How do I write a Python function for binary search?",
        conversation_id="conv_offtopic",
        context_str=""
    )
    assert "conversation_id" in result
    assert result["conversation_id"] == "conv_offtopic"
    assert result["avatar_state"] == "speaking"
