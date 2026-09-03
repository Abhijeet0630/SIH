"""
Culture Service — business logic for cultural items.
"""
from typing import Optional
from app.repositories.culture_repository import CultureRepository
from app.repositories.state_repository import StateRepository
from app.schemas.culture import CultureCard, CultureDetail, CultureConnections, ConnectionNode, RecipeInfo
from app.core.exceptions import NotFoundException


def _raw_to_card(raw: dict) -> CultureCard:
    return CultureCard(
        id=raw["id"],
        name=raw["name"],
        type=raw["type"],
        state_id=raw["state_id"],
        short_description=raw["short_description"],
        image_url=raw.get("image_url"),
        tags=raw.get("tags", []),
    )


def _raw_to_detail(raw: dict) -> CultureDetail:
    recipe_data = raw.get("recipe")
    recipe = RecipeInfo(**recipe_data) if recipe_data else None
    return CultureDetail(
        id=raw["id"],
        name=raw["name"],
        type=raw["type"],
        state_id=raw["state_id"],
        region=raw.get("region"),
        short_description=raw["short_description"],
        description=raw.get("description", raw["short_description"]),
        origin=raw.get("origin"),
        history=raw.get("history"),
        cultural_significance=raw.get("cultural_significance"),
        recipe=recipe,
        materials=raw.get("materials", []),
        techniques=raw.get("techniques", []),
        timeline=raw.get("timeline", []),
        image_url=raw.get("image_url"),
        gallery_urls=raw.get("gallery_urls", []),
        tags=raw.get("tags", []),
        related_item_ids=raw.get("related_item_ids", []),
    )


class CultureService:
    def __init__(self):
        self._repo = CultureRepository()
        self._state_repo = StateRepository()

    def get_items_for_state(self, state_id: str, category: Optional[str] = None) -> list[CultureCard]:
        if not self._state_repo.exists(state_id):
            raise NotFoundException("State", state_id)
        if category:
            raw_items = self._repo.get_by_state_and_category(state_id, category)
        else:
            raw_items = self._repo.get_by_state(state_id)
        return [_raw_to_card(item) for item in raw_items]

    def get_item(self, culture_id: str) -> CultureDetail:
        raw = self._repo.get_by_id(culture_id)
        if raw is None:
            raise NotFoundException("Cultural item", culture_id)
        return _raw_to_detail(raw)

    def get_connections(self, culture_id: str) -> CultureConnections:
        raw = self._repo.get_by_id(culture_id)
        if raw is None:
            raise NotFoundException("Cultural item", culture_id)
        center = _raw_to_card(raw)
        raw_connections = self._repo.get_connections(culture_id)
        connections = [ConnectionNode(**c) for c in raw_connections]
        return CultureConnections(center=center, connections=connections)
