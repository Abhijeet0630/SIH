"""
Passport Service — business logic for the Cultural Passport.
"""
from app.repositories.passport_repository import PassportRepository
from app.repositories.culture_repository import CultureRepository
from app.schemas.passport import PassportData, PassportStats, DiscoveredItem, DiscoverRequest

_DEFAULT_SESSION = "default"

# Category-to-stat field mapping
_STAT_FIELD_MAP = {
    "food": "foods_discovered",
    "monument": "monuments_explored",
    "art": "art_forms_explored",
    "dance": "art_forms_explored",
    "music": "art_forms_explored",
    "festival": "festivals_viewed",
    "temple": "monuments_explored",
    "fort": "monuments_explored",
}


class PassportService:
    def __init__(self):
        self._repo = PassportRepository()
        self._culture_repo = CultureRepository()

    def get_passport(self, session_id: str = _DEFAULT_SESSION) -> PassportData:
        discoveries = self._repo.get_discoveries(session_id)
        stats = self._compute_stats(discoveries)
        items = [DiscoveredItem(**d) for d in discoveries]
        return PassportData(stats=stats, discoveries=items)

    def record_discovery(
        self, request: DiscoverRequest, session_id: str = _DEFAULT_SESSION
    ) -> PassportData:
        # Try to look up item name from culture repo
        item_name: str | None = None
        state_id: str | None = None
        raw = self._culture_repo.get_by_id(request.item_id)
        if raw:
            item_name = raw.get("name")
            state_id = raw.get("state_id")

        self._repo.add_discovery(
            item_type=request.item_type,
            item_id=request.item_id,
            item_name=item_name,
            state_id=state_id,
            session_id=session_id,
        )
        return self.get_passport(session_id)

    def _compute_stats(self, discoveries: list[dict]) -> PassportStats:
        states_seen: set[str] = set()
        counts: dict[str, int] = {
            "foods_discovered": 0,
            "monuments_explored": 0,
            "art_forms_explored": 0,
            "festivals_viewed": 0,
        }
        for d in discoveries:
            if d.get("state_id"):
                states_seen.add(d["state_id"])
            field = _STAT_FIELD_MAP.get(d.get("item_type", ""), None)
            if field:
                counts[field] += 1

        return PassportStats(
            states_explored=len(states_seen),
            foods_discovered=counts["foods_discovered"],
            monuments_explored=counts["monuments_explored"],
            art_forms_explored=counts["art_forms_explored"],
            festivals_viewed=counts["festivals_viewed"],
            total_discoveries=len(discoveries),
        )
