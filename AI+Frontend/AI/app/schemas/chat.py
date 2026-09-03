from typing import Optional, List, Any
from pydantic import BaseModel, Field, field_validator
from app.services.avatar_service import avatar_service

class ChatContext(BaseModel):
    state_id: Optional[str] = None
    category: Optional[str] = None
    item_id: Optional[str] = None
    view: Optional[str] = "/"

class ChatRequest(BaseModel):
    message: str = Field(..., description="User message query")
    conversation_id: Optional[str] = Field(None, description="Optional conversation session ID")
    context: Optional[ChatContext] = Field(None, description="Active UI context")

class ChatResponseData(BaseModel):
    message: str
    conversation_id: str
    avatar_state: str = "speaking"
    suggestions: List[str] = Field(default_factory=list)

    @field_validator("avatar_state", mode="before")
    @classmethod
    def validate_avatar_state(cls, v: Any) -> str:
        return avatar_service.validate_or_default(v, default="speaking")

class ChatResponseEnvelope(BaseModel):
    success: bool = True
    data: Optional[ChatResponseData] = None
    error: Optional[dict] = None
