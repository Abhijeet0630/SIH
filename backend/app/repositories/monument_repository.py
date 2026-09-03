"""
Monument Repository — data access layer for monuments and heritage sites.
Supports Supabase database backend and explicit Mock test double.
"""
import random
from typing import Optional
from app.core.config import get_settings
from app.core.supabase_client import SupabaseClient, get_supabase_client
from app.utils.state_mapping import to_db_state_id, to_backend_state_id
from app.data.mock.monuments import MOCK_MONUMENTS


class MonumentRepository:
    """Repository for monument data access."""

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

    def _translate_hotspot(self, row: dict) -> dict:
        pos = row.get("position")
        if not isinstance(pos, dict):
            pos = {
                "x": float(row.get("position_x") or 0),
                "y": float(row.get("position_y") or 0),
                "z": float(row.get("position_z") or 0),
            }
        return {
            "id": row.get("id", ""),
            "name": row.get("title") or row.get("name", ""),
            "description": row.get("detailed_text") or row.get("short_description") or row.get("description", ""),
            "position": pos,
            "annotation": row.get("architectural_note") or row.get("annotation"),
            "image_url": row.get("image_url"),
        }

    def _translate_monument(self, row: dict, hotspots: Optional[list[dict]] = None) -> dict:
        coords = None
        if row.get("coordinates") and isinstance(row["coordinates"], dict):
            coords = row["coordinates"]
        elif row.get("latitude") is not None and row.get("longitude") is not None:
            coords = {"lat": float(row["latitude"]), "lng": float(row["longitude"])}

        gallery = []
        if row.get("banner_image"):
            gallery.append(row["banner_image"])
        if isinstance(row.get("gallery_urls"), list):
            gallery.extend(row["gallery_urls"])

        hotspot_list = hotspots if hotspots is not None else row.get("hotspots", [])

        return {
            "id": row.get("slug") or row.get("id", ""),
            "name": row.get("name", ""),
            "state_id": to_backend_state_id(row.get("state_id")),
            "location": row.get("location_name") or row.get("location") or row.get("district_or_city") or "",
            "coordinates": coords,
            "short_description": row.get("short_description") or "",
            "description": row.get("description") or row.get("short_description") or "",
            "history": row.get("detailed_history") or row.get("history") or row.get("description"),
            "architecture": row.get("architectural_style") or row.get("architecture"),
            "built_by": row.get("built_by"),
            "built_year": row.get("year_built") or row.get("built_year"),
            "materials": row.get("materials") or [],
            "cultural_significance": row.get("cultural_significance") or row.get("cultural_importance"),
            "timeline": row.get("timeline") or [],
            "has_3d_model": bool(row.get("model_available") if row.get("model_available") is not None else row.get("has_3d_model", False)),
            "model_url": row.get("model_url"),
            "thumbnail_url": row.get("image") or row.get("thumbnail_url"),
            "gallery_urls": gallery,
            "related_heritage_ids": row.get("related_heritage_ids") or [],
            "tags": [row.get("category")] if row.get("category") else row.get("tags", []),
            "hotspots": hotspot_list,
        }

    def get_all(self) -> list[dict]:
        """Return all monuments."""
        if self.is_mock:
            return MOCK_MONUMENTS

        rows = self.client.select("monuments")
        return [self._translate_monument(r) for r in rows]

    def get_by_id(self, monument_id: str) -> Optional[dict]:
        """Return monument by ID."""
        if self.is_mock:
            for monument in MOCK_MONUMENTS:
                if monument["id"] == monument_id:
                    return monument
            return None

        normalized = monument_id.strip().lower()
        row = self.client.get_by_field("monuments", "id", normalized)
        if not row:
            return None

        # Fetch hotspots for this monument
        hotspots = self.get_hotspots(normalized)
        return self._translate_monument(row, hotspots=hotspots)

    def get_by_state(self, state_id: str) -> list[dict]:
        """Return all monuments for a given state."""
        if self.is_mock:
            return [m for m in MOCK_MONUMENTS if m["state_id"] == state_id]

        db_state_id = to_db_state_id(state_id)
        rows = self.client.select(
            "monuments",
            filters={"state_id": f"in.({db_state_id},{state_id})"},
        )
        return [self._translate_monument(r) for r in rows]

    def get_hotspots(self, monument_id: str) -> list[dict]:
        """Return hotspot annotations for a monument."""
        if self.is_mock:
            monument = self.get_by_id(monument_id)
            if monument is None:
                return []
            return monument.get("hotspots", [])

        normalized = monument_id.strip().lower()
        raw_hotspots = self.client.select(
            "monument_hotspots",
            filters={"monument_id": f"eq.{normalized}"},
        )
        return [self._translate_hotspot(h) for h in raw_hotspots]

    def get_random(self) -> Optional[dict]:
        """Return a random monument."""
        all_monuments = self.get_all()
        if not all_monuments:
            return None
        return random.choice(all_monuments)
