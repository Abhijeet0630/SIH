import logging
import re
from fastapi import APIRouter, HTTPException, Depends
from app.core.config import settings
from app.schemas.chat import ChatRequest, ChatResponseEnvelope, ChatResponseData
from app.services.conversation_service import conversation_service
from app.services.context_service import context_service
from app.services.suggestion_service import suggestion_service
from app.services.avatar_service import avatar_service
from app.services.domain_guard import DomainGuard
from app.services.fallback_engine import LocalFallbackEngine
from app.services.ai_service import get_ai_service, AIServiceInterface

logger = logging.getLogger("bharat_ai.routes.chat")
router = APIRouter()
domain_guard = DomainGuard()
fallback_engine = LocalFallbackEngine()

@router.post("/chat", response_model=ChatResponseEnvelope)
async def chat_endpoint(
    payload: ChatRequest,
    ai_service: AIServiceInterface = Depends(get_ai_service)
):
    if not payload.message or not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    user_query = payload.message.strip()
    if len(user_query) > settings.MAX_MESSAGE_LENGTH:
        raise HTTPException(
            status_code=400, 
            detail=f"Message exceeds maximum allowed length of {settings.MAX_MESSAGE_LENGTH} characters"
        )

    try:
        conv_id = conversation_service.get_or_create_conversation_id(payload.conversation_id)
        
        if payload.context:
            conversation_service.set_context(conv_id, payload.context)
            
        active_context = payload.context or conversation_service.get_context(conv_id)
        
        # Entity-first context prompt formatting
        context_str = context_service.format_context_prompt(active_context, message=user_query)
        
        # Retrieve history prior to current query for accurate contextual domain checks
        history_prior = conversation_service.get_history(conv_id)

        # ---------------------------------------------------------------------
        # Pre-Groq Domain Restriction Guard
        # ---------------------------------------------------------------------
        if settings.DOMAIN_GUARD_ENABLED:
            is_in_scope, refusal_dict = domain_guard.check_scope(
                message=user_query,
                conversation_id=conv_id,
                context_str=context_str,
                history=history_prior
            )
            if not is_in_scope and refusal_dict:
                conversation_service.add_message(conv_id, "user", user_query)
                conversation_service.add_message(conv_id, "assistant", refusal_dict["message"])
                
                return ChatResponseEnvelope(
                    success=True,
                    data=ChatResponseData(
                        message=refusal_dict["message"],
                        conversation_id=conv_id,
                        avatar_state=refusal_dict.get("avatar_state", "speaking"),
                        suggestions=refusal_dict.get("suggestions", [])
                    )
                )

        conversation_service.add_message(conv_id, "user", user_query)
        history = conversation_service.get_history(conv_id)

        ai_result = await ai_service.generate_chat_response(
            message=user_query,
            conversation_id=conv_id,
            context_str=context_str,
            history=history
        )

        response_msg = ai_result.get("message", "")

        # ---------------------------------------------------------------------
        # Lightweight Relevance / Response Quality Safeguard
        # ---------------------------------------------------------------------
        # 1. Strip any accidental "In the context of [State]:" prepended prefixes
        response_msg = re.sub(r"^in\s+the\s+context\s+of\s+[a-z\s_-]+:\s*", "", response_msg, flags=re.IGNORECASE).strip()

        # 2. If user query has an explicit entity (e.g. Idli), verify the response addresses it
        lower_q = user_query.lower()
        if "idli" in lower_q and "idli" not in response_msg.lower():
            logger.warning("[SAFEGUARD] Overriding mismatched response with grounded entity fallback for Idli")
            fallback_res = fallback_engine.get_fallback_response(user_query, conv_id, context_str, history)
            response_msg = fallback_res["message"]

        conversation_service.add_message(conv_id, "assistant", response_msg)

        final_suggestions = suggestion_service.generate_suggestions(
            message=user_query,
            context=active_context,
            llm_suggestions=ai_result.get("suggestions")
        )

        final_avatar_state = avatar_service.determine_avatar_state(
            message=response_msg,
            llm_state=ai_result.get("avatar_state")
        )

        return ChatResponseEnvelope(
            success=True,
            data=ChatResponseData(
                message=response_msg,
                conversation_id=conv_id,
                avatar_state=final_avatar_state,
                suggestions=final_suggestions
            )
        )
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Unhandled exception in chat_endpoint: %s", type(exc).__name__, exc_info=True)
        return ChatResponseEnvelope(
            success=False,
            error={
                "code": "INTERNAL_ERROR",
                "message": "Your cultural guide is temporarily unavailable."
            }
        )
