from app.core.config import settings
from app.services.providers.base import AIServiceInterface
from app.services.provider_manager import ProviderManager

# Singleton ProviderManager instance preserving thread-safe circuit breaker health state across requests
provider_manager_instance = ProviderManager()

def get_ai_service() -> AIServiceInterface:
    """Factory function returning configured AI ProviderManager orchestrator."""
    return provider_manager_instance
