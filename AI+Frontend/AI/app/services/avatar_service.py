"""
Bharat AI Avatar State Manager.

Determines, validates, and normalizes avatar states for API responses.
Supported primary states: idle, thinking, speaking.
Extensible states: happy, curious, surprised, excited.
"""

from enum import Enum
from typing import Optional, Any

class AvatarState(str, Enum):
    IDLE = "idle"
    THINKING = "thinking"
    SPEAKING = "speaking"
    HAPPY = "happy"
    CURIOUS = "curious"
    SURPRISED = "surprised"
    EXCITED = "excited"

SUPPORTED_AVATAR_STATES = {state.value for state in AvatarState}

class AvatarService:
    """Manages avatar state transitions and validation."""

    def validate_or_default(self, state: Optional[str], default: str = "speaking") -> str:
        """
        Validates the avatar state string.
        Returns the valid state string if supported, otherwise returns the default state.
        """
        if not state or not isinstance(state, str):
            return default
        clean_state = state.strip().lower()
        if clean_state in SUPPORTED_AVATAR_STATES:
            return clean_state
        return default

    def determine_avatar_state(
        self, 
        message: str, 
        is_error: bool = False, 
        llm_state: Optional[str] = None
    ) -> str:
        """
        Determines the appropriate avatar state for the response payload.
        """
        if is_error:
            return AvatarState.IDLE.value

        if llm_state:
            return self.validate_or_default(llm_state, AvatarState.SPEAKING.value)

        lower_msg = (message or "").lower()
        if "!" in lower_msg or "amazing" in lower_msg or "wow" in lower_msg:
            return AvatarState.EXCITED.value
        elif "happy" in lower_msg or "welcome" in lower_msg or "delighted" in lower_msg:
            return AvatarState.HAPPY.value
        elif "wonder" in lower_msg or "curious" in lower_msg or "explore" in lower_msg:
            return AvatarState.CURIOUS.value

        return AvatarState.SPEAKING.value

avatar_service = AvatarService()
