"""
Culture Repository — data access layer for cultural items.
Supports Supabase database backend and explicit Mock test double.
"""
import random
from typing import Optional, Any
from app.core.config import get_settings
from app.core.supabase_client import SupabaseClient, get_supabase_client
from app.utils.state_mapping import to_db_state_id, to_backend_state_id
from app.data.mock.culture import MOCK_CULTURE_ITEMS
from app.data.mock.connections import MOCK_CONNECTIONS


class CultureRepository:
    """Repository for cultural item data access."""

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

    def _translate_recipe(self, raw_recipe: Any) -> Optional[dict]:
        if not isinstance(raw_recipe, dict):
            return None
        return {
            "recipe_url": raw_recipe.get("recipe_url") or raw_recipe.get("recipeUrl"),
            "ingredients": raw_recipe.get("ingredients") or raw_recipe.get("ingredientsSummary") or [],
            "preparation_time": raw_recipe.get("preparation_time") or raw_recipe.get("prepTime"),
            "difficulty": raw_recipe.get("difficulty"),
        }

    def _translate_item(self, row: dict) -> dict:
        recipe_data = row.get("recipe_info") or row.get("recipe")
        gallery_urls = []
        raw_images = row.get("images")
        if isinstance(raw_images, list):
            for img in raw_images:
                if isinstance(img, dict) and "url" in img:
                    gallery_urls.append(img["url"])
                elif isinstance(img, str):
                    gallery_urls.append(img)
        elif isinstance(row.get("gallery_urls"), list):
            gallery_urls = row["gallery_urls"]

        return {
            "id": row.get("slug") or row.get("id", ""),
            "name": row.get("title") or row.get("name", ""),
            "type": row.get("category") or row.get("type", ""),
            "state_id": to_backend_state_id(row.get("state_id")),
            "region": row.get("district") or row.get("location_name") or row.get("region"),
            "short_description": row.get("short_description") or "",
            "description": row.get("description") or row.get("short_description") or "",
            "origin": row.get("location_name") or row.get("district") or row.get("origin"),
            "history": row.get("history"),
            "cultural_significance": row.get("cultural_significance"),
            "recipe": self._translate_recipe(recipe_data),
            "materials": row.get("materials") or [],
            "techniques": row.get("techniques") or [],
            "timeline": row.get("timeline") or [],
            "image_url": row.get("primary_image") or row.get("image_url"),
            "gallery_urls": gallery_urls,
            "tags": row.get("tags") or [],
            "related_item_ids": row.get("related_item_slugs") or row.get("related_item_ids") or [],
        }

    def get_all(self) -> list[dict]:
        """Return all cultural items."""
        if self.is_mock:
            return MOCK_CULTURE_ITEMS

        rows = self.client.select("cultural_items")
        return [self._translate_item(r) for r in rows]

    def get_by_state(self, state_id: str) -> list[dict]:
        """Return all cultural items for a given state."""
        if self.is_mock:
            return [item for item in MOCK_CULTURE_ITEMS if item["state_id"] == state_id]

        db_state_id = to_db_state_id(state_id)
        # Query using both possible state ID representations
        rows = self.client.select(
            "cultural_items",
            filters={"state_id": f"in.({db_state_id},{state_id})"},
        )
        return [self._translate_item(r) for r in rows]

    def get_by_state_and_category(self, state_id: str, category: str) -> list[dict]:
        """Return cultural items for a state filtered by type/category."""
        if self.is_mock:
            return [
                item for item in MOCK_CULTURE_ITEMS
                if item["state_id"] == state_id and item["type"] == category
            ]

        db_state_id = to_db_state_id(state_id)
        rows = self.client.select(
            "cultural_items",
            filters={
                "state_id": f"in.({db_state_id},{state_id})",
                "category": f"eq.{category.lower()}",
            },
        )
        return [self._translate_item(r) for r in rows]

    def get_by_id(self, culture_id: str) -> Optional[dict]:
        """Return a single cultural item by ID."""
        if self.is_mock:
            for item in MOCK_CULTURE_ITEMS:
                if item["id"] == culture_id:
                    return item
            return None

        normalized = culture_id.strip().lower()
        row = self.client.get_by_field("cultural_items", "id", normalized)
        return self._translate_item(row) if row else None

    def get_connections(self, culture_id: str) -> list[dict]:
        """Return connection nodes for a cultural item."""
        if self.is_mock:
            return MOCK_CONNECTIONS.get(culture_id, [])

        normalized = culture_id.strip().lower()
        # Attempt to fetch star_schema_nodes from Supabase if table exists
        try:
            nodes = self.client.select(
                "star_schema_nodes",
                filters={"cultural_item_id": f"eq.{normalized}"},
            )
            if nodes:
                return [
                    {
                        "id": n.get("id", ""),
                        "name": n.get("label") or n.get("id", ""),
                        "type": n.get("type", "concept"),
                        "relationship": n.get("type", "associated_with"),
                    }
                    for n in nodes
                ]
        except Exception:
            pass

        return MOCK_CONNECTIONS.get(normalized, [])

    def get_random_items(self, count: int = 5) -> list[dict]:
        """Return a random sample of cultural items."""
        items = self.get_all()
        if not items:
            return []
        sample_size = min(count, len(items))
        return random.sample(items, sample_size)
