import uuid
import logging
import threading
from abc import ABC, abstractmethod
from typing import Dict, List, Optional
from app.schemas.chat import ChatContext
from app.core.config import settings

logger = logging.getLogger("bharat_ai.conversation")

class ConversationStorageInterface(ABC):
    """Abstract interface for conversation persistence (In-memory, DB, Redis, etc.)."""

    @abstractmethod
    def create_session(self, conversation_id: Optional[str] = None) -> str:
        pass

    @abstractmethod
    def add_message(self, conversation_id: str, role: str, content: str) -> None:
        pass

    @abstractmethod
    def get_history(self, conversation_id: str) -> List[Dict[str, str]]:
        pass

    @abstractmethod
    def set_context(self, conversation_id: str, context: ChatContext) -> None:
        pass

    @abstractmethod
    def get_context(self, conversation_id: str) -> Optional[ChatContext]:
        pass

    @abstractmethod
    def clear_session(self, conversation_id: str) -> bool:
        pass


class InMemoryConversationStorage(ConversationStorageInterface):
    """
    Thread-safe in-memory implementation of conversation history and session context.
    Includes maximum session memory bounds and message history capping for production safety.
    """

    def __init__(self, max_conversations: int = 1000, max_history_per_session: int = 20):
        self._conversations: Dict[str, List[Dict[str, str]]] = {}
        self._contexts: Dict[str, ChatContext] = {}
        self._lock = threading.Lock()
        self.max_conversations = max_conversations
        self.max_history_per_session = max_history_per_session

    def create_session(self, conversation_id: Optional[str] = None) -> str:
        with self._lock:
            if conversation_id and conversation_id.strip():
                clean_id = conversation_id.strip()
                if clean_id not in self._conversations:
                    self._enforce_capacity_limit()
                    self._conversations[clean_id] = []
                return clean_id

            self._enforce_capacity_limit()
            new_id = f"conv_{uuid.uuid4().hex[:12]}"
            self._conversations[new_id] = []
            return new_id

    def _enforce_capacity_limit(self) -> None:
        """Evicts oldest session if memory capacity is reached."""
        while len(self._conversations) >= self.max_conversations:
            oldest_id = next(iter(self._conversations))
            self._conversations.pop(oldest_id, None)
            self._contexts.pop(oldest_id, None)
            logger.info("Memory capacity reached. Evicted oldest conversation session %s", oldest_id)

    def add_message(self, conversation_id: str, role: str, content: str) -> None:
        with self._lock:
            if conversation_id not in self._conversations:
                self._enforce_capacity_limit()
                self._conversations[conversation_id] = []
            
            history = self._conversations[conversation_id]
            history.append({"role": role, "content": content})
            
            # Cap message history to prevent token explosion
            if len(history) > self.max_history_per_session:
                self._conversations[conversation_id] = history[-self.max_history_per_session:]

    def get_history(self, conversation_id: str) -> List[Dict[str, str]]:
        with self._lock:
            return list(self._conversations.get(conversation_id, []))

    def set_context(self, conversation_id: str, context: ChatContext) -> None:
        with self._lock:
            if context:
                self._contexts[conversation_id] = context

    def get_context(self, conversation_id: str) -> Optional[ChatContext]:
        with self._lock:
            return self._contexts.get(conversation_id)

    def clear_session(self, conversation_id: str) -> bool:
        with self._lock:
            existed = conversation_id in self._conversations
            self._conversations.pop(conversation_id, None)
            self._contexts.pop(conversation_id, None)
            return existed


class ConversationService:
    """High-level service managing multi-turn interactions using pluggable storage."""

    def __init__(self, storage: Optional[ConversationStorageInterface] = None):
        self.storage = storage or InMemoryConversationStorage(
            max_conversations=settings.MAX_CONVERSATIONS
        )

    def get_or_create_conversation_id(self, conversation_id: Optional[str] = None) -> str:
        return self.storage.create_session(conversation_id)

    def add_message(self, conversation_id: str, role: str, content: str) -> None:
        self.storage.add_message(conversation_id, role, content)

    def get_history(self, conversation_id: str) -> List[Dict[str, str]]:
        return self.storage.get_history(conversation_id)

    def set_context(self, conversation_id: str, context: Optional[ChatContext]) -> None:
        if context:
            self.storage.set_context(conversation_id, context)

    def get_context(self, conversation_id: str) -> Optional[ChatContext]:
        return self.storage.get_context(conversation_id)

    def clear_session(self, conversation_id: str) -> bool:
        return self.storage.clear_session(conversation_id)


conversation_service = ConversationService()
