import time
import logging
import threading
from typing import Dict, List, Optional, Any
from app.core.config import settings

logger = logging.getLogger("bharat_ai.groq_key_manager")

class GroqKeyManager:
    """
    Thread-safe Groq API Key Manager providing:
    - Support for up to 6 Groq API key slots (GROQ_API_KEY_1 through GROQ_API_KEY_6)
    - Deterministic server-side round-robin load balancing per question
    - Automatic cursor advancement after each completed chat request selection
    - Independent key health tracking, failure counters, and circuit breaker cooldowns
    - Automatic failover between healthy key slots
    - Secret protection (only slot labels logged or returned)
    """

    def __init__(self, keys_dict: Optional[Dict[int, str]] = None):
        self._lock = threading.Lock()
        self._key_slots: Dict[int, str] = {}
        self._failures: Dict[int, int] = {}
        self._cooldown_until: Dict[int, float] = {}
        self._cursor: int = 0

        if keys_dict is not None:
            raw_keys = keys_dict
        else:
            raw_keys = {
                1: settings.GROQ_API_KEY_1,
                2: settings.GROQ_API_KEY_2,
                3: settings.GROQ_API_KEY_3,
                4: settings.GROQ_API_KEY_4,
                5: settings.GROQ_API_KEY_5,
                6: settings.GROQ_API_KEY_6,
            }

        # Filter valid configured key slots
        for slot_id in range(1, 7):
            val = (raw_keys.get(slot_id) or "").strip()
            if val and not val.startswith("your_") and not val.startswith("your_groq_api_key_"):
                self._key_slots[slot_id] = val
                self._failures[slot_id] = 0
                self._cooldown_until[slot_id] = 0.0

    @property
    def configured_slots(self) -> List[int]:
        with self._lock:
            return sorted(self._key_slots.keys())

    def is_slot_healthy(self, slot_id: int) -> bool:
        with self._lock:
            if slot_id not in self._key_slots:
                return False
            now = time.time()
            cooldown = self._cooldown_until.get(slot_id, 0.0)
            failures = self._failures.get(slot_id, 0)
            if failures >= settings.GROQ_KEY_FAILURE_THRESHOLD and now < cooldown:
                return False
            return True

    def record_success(self, slot_id: int):
        with self._lock:
            if slot_id in self._key_slots:
                self._failures[slot_id] = 0
                self._cooldown_until[slot_id] = 0.0
                logger.info("[PROVIDER_SUCCESS] Groq key slot %s", slot_id)

    def record_failure(self, slot_id: int, is_rate_limited: bool = False):
        with self._lock:
            if slot_id not in self._key_slots:
                return
            self._failures[slot_id] = self._failures.get(slot_id, 0) + 1
            if is_rate_limited:
                logger.warning("[PROVIDER_RATE_LIMITED] Groq key slot %s", slot_id)
            else:
                logger.warning("[PROVIDER_FAILURE] Groq key slot %s", slot_id)

            if self._failures[slot_id] >= settings.GROQ_KEY_FAILURE_THRESHOLD:
                self._cooldown_until[slot_id] = time.time() + settings.GROQ_KEY_COOLDOWN_SECONDS
                logger.warning(
                    "[CIRCUIT_BREAKER_TRIGGERED] Groq key slot %s | Failures: %s | Cooldown: %ss",
                    slot_id, self._failures[slot_id], settings.GROQ_KEY_COOLDOWN_SECONDS
                )

    def get_healthy_slots_sequence(self) -> List[int]:
        """
        Returns a deterministic sequence of healthy key slots starting from the current round-robin cursor,
        and advances the round-robin cursor for the next request.
        """
        with self._lock:
            configured = sorted(self._key_slots.keys())
            if not configured:
                return []

            now = time.time()
            healthy_slots = set()
            for s in configured:
                cooldown = self._cooldown_until.get(s, 0.0)
                failures = self._failures.get(s, 0)
                if failures < settings.GROQ_KEY_FAILURE_THRESHOLD or now >= cooldown:
                    healthy_slots.add(s)

            if not healthy_slots:
                return []

            start_idx = self._cursor % len(configured)
            ordered_configured = configured[start_idx:] + configured[:start_idx]
            sequence = [s for s in ordered_configured if s in healthy_slots]

            # Advance cursor for next request
            self._cursor = (self._cursor + 1) % len(configured)
            return sequence

    def get_api_key(self, slot_id: int) -> Optional[str]:
        with self._lock:
            return self._key_slots.get(slot_id)

    def get_health_status(self) -> Dict[str, Any]:
        with self._lock:
            now = time.time()
            status = {}
            for slot_id in sorted(self._key_slots.keys()):
                cooldown = self._cooldown_until.get(slot_id, 0.0)
                failures = self._failures.get(slot_id, 0)
                healthy = failures < settings.GROQ_KEY_FAILURE_THRESHOLD or now >= cooldown
                status[f"slot_{slot_id}"] = {
                    "slot": slot_id,
                    "failures": failures,
                    "healthy": healthy,
                    "cooldown_remaining": max(0.0, round(cooldown - now, 2))
                }
            return status

    def get_configured_slots_summary(self) -> Dict[str, str]:
        """
        Returns a secret-safe summary of configured key slots.
        Only slot labels are returned (e.g. {'slot_1': 'configured', 'slot_2': 'unconfigured'}).
        Never prints or exposes raw API key strings.
        """
        with self._lock:
            summary = {}
            for i in range(1, 7):
                raw = self._key_slots.get(i, "")
                summary[f"slot_{i}"] = "configured" if raw else "unconfigured"
            return summary
