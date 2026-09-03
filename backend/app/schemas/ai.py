"""
Pydantic schemas for AI Gateway.
"""
from typing import Optional
from pydantic import BaseModel


class AIContext(BaseModel):
    """Context passed to the AI service about the user's current exploration."""
    state_id: Optional[str] = None
    category: Optional[str] = None
    item_id: Optional[str] = None
    monument_id: Optional[str] = None
    hotspot_id: Optional[str] = None
    view: Optional[str] = None              # e.g. "architecture", "history", "overview"
    recent_exploration: list[str] = []      # list of recently viewed item IDs


class AIChatRequest(BaseModel):
    """Request body for POST /api/ai/chat."""
    message: str
    conversation_id: Optional[str] = None
    context: Optional[AIContext] = None


class AIChatResponse(BaseModel):
    """Response from the AI cultural guide."""
    message: str
    conversation_id: str
    avatar_state: str = "speaking"          # speaking | idle | thinking
    suggestions: list[str] = []            # follow-up questions suggested by AI
