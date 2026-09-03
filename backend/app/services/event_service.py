"""
Event Service — business logic for cultural events.
"""
from app.repositories.event_repository import EventRepository
from app.schemas.event import Event
from app.core.exceptions import NotFoundException


def _raw_to_event(raw: dict) -> Event:
    return Event(**raw)


class EventService:
    def __init__(self):
        self._repo = EventRepository()

    def get_all_events(self) -> list[Event]:
        return [_raw_to_event(e) for e in self._repo.get_all()]

    def get_today_events(self) -> list[Event]:
        return [_raw_to_event(e) for e in self._repo.get_today()]

    def get_upcoming_events(self, days_ahead: int = 30) -> list[Event]:
        return [_raw_to_event(e) for e in self._repo.get_upcoming(days_ahead)]
