"""
Events routes.
GET /api/events
GET /api/events/today
GET /api/events/upcoming
"""
from fastapi import APIRouter
from app.services.event_service import EventService
from app.schemas.common import success

router = APIRouter(prefix="/events", tags=["Events"])
_service = EventService()


@router.get(
    "/today",
    summary="Today's Cultural Events",
    description="Returns cultural events and 'On This Day' entries matching today's date.",
)
def events_today():
    events = _service.get_today_events()
    return success([e.model_dump() for e in events])


@router.get(
    "/upcoming",
    summary="Upcoming Events",
    description="Returns cultural events scheduled in the next 30 days.",
)
def events_upcoming():
    events = _service.get_upcoming_events()
    return success([e.model_dump() for e in events])


@router.get(
    "",
    summary="All Cultural Events",
    description="Returns all cultural events in the system.",
)
def list_events():
    events = _service.get_all_events()
    return success([e.model_dump() for e in events])
