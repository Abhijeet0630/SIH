"""
Festival Repository — data access layer for festivals.
Supports Supabase database backend and explicit Mock test double.
"""
from typing import Optional
from app.core.config import get_settings
from app.core.supabase_client import SupabaseClient, get_supabase_client
from app.utils.state_mapping import to_db_state_id, to_backend_state_id
from app.data.mock.festivals import MOCK_FESTIVALS


class FestivalRepository:
    """Repository for festival data access."""

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

    def _translate_festival(self, row: dict) -> dict:
        state_backend_id = to_backend_state_id(row.get("state_id")) if row.get("state_id") else None
        states_list = [state_backend_id] if state_backend_id else []
        if isinstance(row.get("states"), list):
            states_list = [to_backend_state_id(s) for s in row["states"]]

        MONTH_NAMES = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        raw_month = row.get("month") or row.get("date_or_season")
        if isinstance(raw_month, int):
            month_str = MONTH_NAMES[raw_month] if 0 <= raw_month < 12 else str(raw_month)
        else:
            month_str = str(raw_month) if raw_month else ""

        return {
            "id": row.get("id", ""),
            "name": row.get("name", ""),
            "state_id": state_backend_id,
            "states": states_list,
            "month": month_str,
            "duration_days": row.get("duration_days") or 1,
            "short_description": row.get("short_description") or "",
            "description": row.get("description") or row.get("cultural_significance") or row.get("short_description") or "",
            "rituals": row.get("traditional_practices") or row.get("rituals") or [],
            "foods": row.get("foods") or [],
            "significance": row.get("cultural_significance") or row.get("significance"),
            "image_url": row.get("image") or row.get("image_url"),
            "gallery_urls": row.get("gallery_urls") or [],
        }

    def get_all(self) -> list[dict]:
        """Return all festivals."""
        if self.is_mock:
            return MOCK_FESTIVALS

        rows = self.client.select("festivals")
        return [self._translate_festival(r) for r in rows]

    def get_by_id(self, festival_id: str) -> Optional[dict]:
        """Return festival by ID."""
        if self.is_mock:
            for festival in MOCK_FESTIVALS:
                if festival["id"] == festival_id:
                    return festival
            return None

        normalized = festival_id.strip().lower()
        row = self.client.get_by_field("festivals", "id", normalized)
        return self._translate_festival(row) if row else None

    def get_by_state(self, state_id: str) -> list[dict]:
        """Return festivals celebrated in a specific state."""
        if self.is_mock:
            return [f for f in MOCK_FESTIVALS if state_id in f.get("states", []) or f.get("state_id") == state_id]

        db_state_id = to_db_state_id(state_id)
        rows = self.client.select(
            "festivals",
            filters={"state_id": f"in.({db_state_id},{state_id})"},
        )
        return [self._translate_festival(r) for r in rows]
