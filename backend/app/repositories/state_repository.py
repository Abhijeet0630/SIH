"""
State Repository — data access layer for states.
Supports Supabase database backend and explicit Mock test double.
"""
from typing import Optional
from app.core.config import get_settings
from app.core.supabase_client import SupabaseClient, get_supabase_client
from app.utils.state_mapping import to_db_state_id, to_backend_state_id
from app.data.mock.states import MOCK_STATES


class StateRepository:
    """Repository for state data access."""

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

    def _translate_state(self, row: dict) -> dict:
        backend_id = to_backend_state_id(row.get("id"), row.get("code"))
        theme = None
        if "theme" in row and isinstance(row["theme"], dict):
            theme = row["theme"]
        elif row.get("primary_color") or row.get("accent_color") or row.get("banner_keyword"):
            theme = {
                "primary_color": row.get("primary_color"),
                "accent_color": row.get("accent_color"),
                "banner_keyword": row.get("banner_keyword"),
            }

        return {
            "id": backend_id,
            "name": row.get("name", ""),
            "code": (row.get("code") or "").replace("IN-", ""),
            "capital": row.get("capital"),
            "region": row.get("region"),
            "description": row.get("description") or row.get("short_description") or "",
            "cultural_summary": row.get("cultural_summary") or row.get("historical_overview") or row.get("cultural_identity") or "",
            "languages": row.get("languages") or [],
            "theme": theme,
            "thumbnail_url": row.get("thumbnail_url") or row.get("banner_image_url"),
        }

    def get_all(self) -> list[dict]:
        """Return all states."""
        if self.is_mock:
            return MOCK_STATES

        rows = self.client.select("states")
        return [self._translate_state(r) for r in rows]

    def get_by_id(self, state_id: str) -> Optional[dict]:
        """Return a single state by ID, or None if not found."""
        if self.is_mock:
            for state in MOCK_STATES:
                if state["id"] == state_id:
                    return state
            return None

        normalized = state_id.strip().lower()
        db_id = to_db_state_id(normalized)

        # Try querying by backend id first
        row = self.client.get_by_field("states", "id", normalized)
        if not row and db_id and db_id != normalized:
            row = self.client.get_by_field("states", "id", db_id)
        if not row:
            row = self.client.get_by_field("states", "code", f"IN-{normalized.upper()}")
        if not row:
            row = self.client.get_by_field("states", "code", normalized.upper())

        return self._translate_state(row) if row else None

    def exists(self, state_id: str) -> bool:
        """Check whether a state with the given ID exists."""
        return self.get_by_id(state_id) is not None
