"""
State Service — business logic for state operations.
"""
from app.repositories.state_repository import StateRepository
from app.schemas.state import StateSummary, StateDetail, StateTheme
from app.core.exceptions import NotFoundException


class StateService:
    def __init__(self):
        self._repo = StateRepository()

    def get_all_states(self) -> list[StateSummary]:
        raw = self._repo.get_all()
        return [StateSummary(**{k: v for k, v in s.items() if k in StateSummary.model_fields}) for s in raw]

    def get_state(self, state_id: str) -> StateDetail:
        raw = self._repo.get_by_id(state_id)
        if raw is None:
            raise NotFoundException("State", state_id)
        # Build theme if present
        theme_data = raw.get("theme")
        theme = StateTheme(**theme_data) if theme_data else None
        return StateDetail(
            id=raw["id"],
            name=raw["name"],
            code=raw["code"],
            description=raw["description"],
            cultural_summary=raw["cultural_summary"],
            capital=raw.get("capital"),
            region=raw.get("region"),
            languages=raw.get("languages", []),
            theme=theme,
            thumbnail_url=raw.get("thumbnail_url"),
        )

    def state_exists(self, state_id: str) -> bool:
        return self._repo.exists(state_id)
