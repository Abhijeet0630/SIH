"""
Event Repository — data access layer for cultural events.
"""
import datetime
from typing import Optional
from app.data.mock.events import MOCK_EVENTS


class EventRepository:
    """Repository for event data access."""

    def get_all(self) -> list[dict]:
        """Return all events."""
        return MOCK_EVENTS

    def get_by_id(self, event_id: str) -> Optional[dict]:
        for event in MOCK_EVENTS:
            if event["id"] == event_id:
                return event
        return None

    def get_today(self) -> list[dict]:
        """Return events whose date matches today's month-day."""
        today = datetime.date.today()
        today_str = today.strftime("%m-%d")   # MM-DD
        return [
            event for event in MOCK_EVENTS
            if event["date"][5:] == today_str  # compare MM-DD portion
        ]

    def get_upcoming(self, days_ahead: int = 30) -> list[dict]:
        """Return events in the next N days (using mock year-agnostic dates)."""
        today = datetime.date.today()
        upcoming = []
        for event in MOCK_EVENTS:
            try:
                event_date = datetime.date.fromisoformat(event["date"])
                # For mock data: compare month/day only, treat any year
                this_year_date = event_date.replace(year=today.year)
                diff = (this_year_date - today).days
                if 0 < diff <= days_ahead:
                    upcoming.append(event)
            except ValueError:
                continue
        return sorted(upcoming, key=lambda e: e["date"])

    def get_by_state(self, state_id: str) -> list[dict]:
        return [e for e in MOCK_EVENTS if e.get("state_id") == state_id]
