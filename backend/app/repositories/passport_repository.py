"""
Passport Repository — storage for Cultural Passport discoveries.
Supports Supabase database persistence and explicit Mock test double.
"""
from datetime import datetime, timezone
from typing import Optional
from app.core.config import get_settings
from app.core.supabase_client import SupabaseClient, get_supabase_client
from app.utils.state_mapping import to_backend_state_id


# In-memory store for mock/test double: session_id → list of discovered items
_mock_passport_store: dict[str, list[dict]] = {}

_DEFAULT_SESSION = "default"  # single-user for prototype; replace with real auth later


class PassportRepository:
    """Repository for passport discovery storage."""

    def __init__(self, client: Optional[SupabaseClient] = None):
        self._client = client

    @property
    def client(self) -> SupabaseClient:
        if self._client is None:
            self._client = get_supabase_client()
        return self._client

    @property
    def is_mock(self) -> bool:
        return get_settings().REPOSITORY_BACKEND == "mock"

    def _translate_discovery(self, row: dict) -> dict:
        return {
            "item_type": row.get("item_type", ""),
            "item_id": row.get("item_id", ""),
            "item_name": row.get("item_name"),
            "state_id": to_backend_state_id(row.get("state_id")) if row.get("state_id") else None,
            "discovered_at": row.get("discovered_at") or row.get("created_at"),
        }

    def get_discoveries(self, session_id: str = _DEFAULT_SESSION) -> list[dict]:
        """Return all discoveries for a session."""
        if self.is_mock:
            return _mock_passport_store.get(session_id, [])

        try:
            rows = self.client.select(
                "user_discoveries",
                filters={"session_id": f"eq.{session_id}"},
                order="discovered_at.asc",
            )
            return [self._translate_discovery(r) for r in rows]
        except Exception:
            # If user_discoveries table is not yet created remotely, return empty list gracefully
            return []

    def add_discovery(
        self,
        item_type: str,
        item_id: str,
        item_name: Optional[str] = None,
        state_id: Optional[str] = None,
        session_id: str = _DEFAULT_SESSION,
    ) -> dict:
        """Record a new discovery. Returns the saved item dict."""
        if self.is_mock:
            if session_id not in _mock_passport_store:
                _mock_passport_store[session_id] = []

            # Prevent exact duplicates
            for disc in _mock_passport_store[session_id]:
                if disc["item_type"] == item_type and disc["item_id"] == item_id:
                    return disc

            discovery = {
                "item_type": item_type,
                "item_id": item_id,
                "item_name": item_name,
                "state_id": state_id,
                "discovered_at": datetime.now(timezone.utc).isoformat(),
            }
            _mock_passport_store[session_id].append(discovery)
            return discovery

        # Supabase mode
        payload = {
            "session_id": session_id,
            "item_type": item_type,
            "item_id": item_id,
            "item_name": item_name,
            "state_id": state_id,
            "discovered_at": datetime.now(timezone.utc).isoformat(),
        }

        try:
            res = self.client.insert("user_discoveries", payload, ignore_duplicates=True)
            if res:
                return self._translate_discovery(res[0])
        except Exception:
            pass

        # Fallback return matching item
        return {
            "item_type": item_type,
            "item_id": item_id,
            "item_name": item_name,
            "state_id": state_id,
            "discovered_at": payload["discovered_at"],
        }

    def clear(self, session_id: str = _DEFAULT_SESSION) -> None:
        """Clear all passport data for a session (useful in tests)."""
        if self.is_mock:
            _mock_passport_store[session_id] = []
            return

        try:
            self.client.delete("user_discoveries", filters={"session_id": f"eq.{session_id}"})
        except Exception:
            pass
