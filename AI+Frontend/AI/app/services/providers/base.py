from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional

class AIServiceInterface(ABC):
    """Abstract interface for LLM provider implementations."""
    
    @abstractmethod
    async def generate_chat_response(
        self, 
        message: str, 
        conversation_id: str, 
        context_str: str,
        history: Optional[List[dict]] = None
    ) -> Dict[str, Any]:
        """
        Generates a standardized chat response.
        Must return a dict containing:
          - message: str
          - conversation_id: str
          - avatar_state: str
          - suggestions: List[str]
        """
        pass
