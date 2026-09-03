"""
Festival Service — business logic for festivals.
"""
from typing import Optional
from app.repositories.festival_repository import FestivalRepository
from app.schemas.festival import FestivalSummary, FestivalDetail
from app.core.exceptions import NotFoundException


def _raw_to_summary(raw: dict) -> FestivalSummary:
    return FestivalSummary(
        id=raw["id"],
        name=raw["name"],
        state_id=raw.get("state_id"),
        month=raw.get("month"),
        image_url=raw.get("image_url"),
        short_description=raw["short_description"],
    )


def _raw_to_detail(raw: dict) -> FestivalDetail:
    return FestivalDetail(**raw)


class FestivalService:
    def __init__(self):
        self._repo = FestivalRepository()

    def get_all_festivals(self, state_id: Optional[str] = None) -> list[FestivalSummary]:
        if state_id:
            festivals = self._repo.get_by_state(state_id)
        else:
            festivals = self._repo.get_all()
        return [_raw_to_summary(f) for f in festivals]

    def get_festival(self, festival_id: str) -> FestivalDetail:
        raw = self._repo.get_by_id(festival_id)
        if raw is None:
            raise NotFoundException("Festival", festival_id)
        return _raw_to_detail(raw)
