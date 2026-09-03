"""
Category Repository — data access layer for cultural categories.
Supports Supabase database backend and explicit Mock test double.
"""
from typing import Optional
from app.core.config import get_settings
from app.core.supabase_client import SupabaseClient, get_supabase_client
from app.utils.state_mapping import to_backend_state_id
from app.data.mock.categories import MOCK_CATEGORIES, STATE_CATEGORY_MAP


class CategoryRepository:
    """Repository for category data access."""

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

    def _translate_category(self, row: dict) -> dict:
        return {
            "id": row.get("id", ""),
            "name": row.get("name") or row.get("default_label") or row.get("id", "").capitalize(),
            "description": row.get("description") or "",
            "icon": row.get("icon") or row.get("icon_name") or "",
        }

    def get_all(self) -> list[dict]:
        """Return all cultural categories."""
        if self.is_mock:
            return MOCK_CATEGORIES

        rows = self.client.select("categories")
        return [self._translate_category(r) for r in rows]

    def get_by_id(self, category_id: str) -> Optional[dict]:
        """Return a category by ID."""
        if self.is_mock:
            for cat in MOCK_CATEGORIES:
                if cat["id"] == category_id:
                    return cat
            return None

        row = self.client.get_by_field("categories", "id", category_id.strip().lower())
        return self._translate_category(row) if row else None

    def get_category_ids_for_state(self, state_id: str) -> list[str]:
        """Return category IDs available for a specific state."""
        backend_id = to_backend_state_id(state_id)
        if backend_id in STATE_CATEGORY_MAP:
            return STATE_CATEGORY_MAP[backend_id]

        all_categories = self.get_all()
        return [c["id"] for c in all_categories]
