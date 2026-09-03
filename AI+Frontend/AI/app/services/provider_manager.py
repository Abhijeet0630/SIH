import logging
from typing import Dict, Any, List, Optional
from app.services.providers.base import AIServiceInterface
from app.services.groq_key_manager import GroqKeyManager
from app.services.providers.groq_provider import GroqProvider
from app.services.fallback_engine import LocalFallbackEngine

logger = logging.getLogger("bharat_ai.provider_manager")

class ProviderManager(AIServiceInterface):
    """
    ProviderManager for Phase 29:
    Orchestrates per-question multi-key Groq API rotation and failover via GroqKeyManager.
    Protects API key health counters from configuration-level HTTP 404 model errors.
    Falls back to LocalFallbackEngine when Groq is unavailable.
    
    Topology:
    ProviderManager -> GroqKeyManager -> Groq Key Slot X -> Groq API -> LocalFallbackEngine
    """

    def __init__(
        self,
        groq_key_manager: Optional[GroqKeyManager] = None,
        groq_provider: Optional[GroqProvider] = None,
        fallback_engine: Optional[LocalFallbackEngine] = None
    ):
        self.groq_key_manager = groq_key_manager or GroqKeyManager()
        self.groq_provider = groq_provider or GroqProvider()
        self.fallback_engine = fallback_engine or LocalFallbackEngine()

    def get_health_status(self) -> Dict[str, Any]:
        """Returns internal key health status from GroqKeyManager without exposing credentials."""
        return self.groq_key_manager.get_health_status()

    async def generate_chat_response(
        self, 
        message: str, 
        conversation_id: str, 
        context_str: str,
        history: Optional[List[dict]] = None
    ) -> Dict[str, Any]:
        sequence = self.groq_key_manager.get_healthy_slots_sequence()

        if not sequence:
            logger.info("[FALLBACK_USED] All Groq keys unavailable for session %s.", conversation_id)
            return self.fallback_engine.get_fallback_response(message, conversation_id, context_str, history)

        for i, slot_id in enumerate(sequence):
            api_key = self.groq_key_manager.get_api_key(slot_id)
            if not api_key:
                logger.info("[PROVIDER_SKIPPED] Groq key slot %s", slot_id)
                continue

            logger.info("[PROVIDER_ATTEMPT] Groq key slot %s", slot_id)
            res = None
            try:
                res = await self.groq_provider.generate_chat_response(
                    message=message,
                    conversation_id=conversation_id,
                    context_str=context_str,
                    history=history,
                    api_key=api_key,
                    slot_id=slot_id
                )
            except Exception as exc:
                logger.error("[PROVIDER_FAILURE] Groq key slot %s | Exception: %s", slot_id, type(exc).__name__)
                res = None

            if res and isinstance(res, dict) and "message" in res and "error_type" not in res:
                self.groq_key_manager.record_success(slot_id)
                return res

            # Handle 404 configuration error vs key health failure
            if res and isinstance(res, dict) and res.get("error_type") == "config_404":
                logger.warning("[PROVIDER_CONFIG_ERROR] Groq key slot %s encountered 404 (model/endpoint configuration issue). Key slot failure counter not incremented.", slot_id)
            else:
                is_rate_limited = isinstance(res, dict) and res.get("error_type") == "rate_limit"
                self.groq_key_manager.record_failure(slot_id, is_rate_limited=is_rate_limited)

            if i + 1 < len(sequence):
                next_slot = sequence[i + 1]
                logger.warning("[FAILOVER] Groq key slot %s -> slot %s", slot_id, next_slot)

        # Local fallback if all available Groq keys failed
        logger.info("[FALLBACK_USED] All Groq keys unavailable for session %s.", conversation_id)
        return self.fallback_engine.get_fallback_response(message, conversation_id, context_str, history)
