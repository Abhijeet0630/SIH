"""
Monument Service — business logic for monuments.
"""
from typing import Optional
from app.repositories.monument_repository import MonumentRepository
from app.schemas.monument import MonumentSummary, MonumentDetail, MonumentHotspot, HotspotPosition, TimelineEntry
from app.core.exceptions import NotFoundException


def _raw_to_summary(raw: dict) -> MonumentSummary:
    return MonumentSummary(
        id=raw["id"],
        name=raw["name"],
        state_id=raw["state_id"],
        location=raw["location"],
        short_description=raw["short_description"],
        thumbnail_url=raw.get("thumbnail_url"),
        has_3d_model=raw.get("has_3d_model", False),
    )


def _raw_to_detail(raw: dict) -> MonumentDetail:
    timeline = [TimelineEntry(**t) for t in raw.get("timeline", [])]
    return MonumentDetail(
        id=raw["id"],
        name=raw["name"],
        state_id=raw["state_id"],
        location=raw["location"],
        coordinates=raw.get("coordinates"),
        short_description=raw["short_description"],
        description=raw["description"],
        history=raw.get("history"),
        architecture=raw.get("architecture"),
        built_by=raw.get("built_by"),
        built_year=raw.get("built_year"),
        materials=raw.get("materials", []),
        cultural_significance=raw.get("cultural_significance"),
        timeline=timeline,
        has_3d_model=raw.get("has_3d_model", False),
        model_url=raw.get("model_url"),
        thumbnail_url=raw.get("thumbnail_url"),
        gallery_urls=raw.get("gallery_urls", []),
        related_heritage_ids=raw.get("related_heritage_ids", []),
        tags=raw.get("tags", []),
    )


def _raw_to_hotspot(raw: dict) -> MonumentHotspot:
    return MonumentHotspot(
        id=raw["id"],
        name=raw["name"],
        description=raw["description"],
        position=HotspotPosition(**raw["position"]),
        annotation=raw.get("annotation"),
        image_url=raw.get("image_url"),
    )


class MonumentService:
    def __init__(self):
        self._repo = MonumentRepository()

    def get_all_monuments(self, state_id: Optional[str] = None) -> list[MonumentSummary]:
        if state_id:
            raw_list = self._repo.get_by_state(state_id)
        else:
            raw_list = self._repo.get_all()
        return [_raw_to_summary(m) for m in raw_list]

    def get_monument(self, monument_id: str) -> MonumentDetail:
        raw = self._repo.get_by_id(monument_id)
        if raw is None:
            raise NotFoundException("Monument", monument_id)
        return _raw_to_detail(raw)

    def get_hotspots(self, monument_id: str) -> list[MonumentHotspot]:
        raw = self._repo.get_by_id(monument_id)
        if raw is None:
            raise NotFoundException("Monument", monument_id)
        return [_raw_to_hotspot(h) for h in raw.get("hotspots", [])]
