"""
AI Gateway routes.
POST /api/ai/chat
"""
from fastapi import APIRouter
from app.services.ai_service import get_ai_service
from app.schemas.ai import AIChatRequest
from app.schemas.common import success

router = APIRouter(prefix="/ai", tags=["AI Cultural Guide"])


@router.post(
    "/chat",
    summary="AI Cultural Guide Chat",
    description=(
        "Send a message to the AI cultural guide. Include a context object to provide "
        "the AI with information about what the user is currently exploring "
        "(state, category, monument, hotspot, etc.). "
        "Currently returns mock responses. The AI teammate will replace the underlying service."
    ),
)
def ai_chat(request: AIChatRequest):
    ai_service = get_ai_service()
    response = ai_service.chat(request)
    return success(response.model_dump())
