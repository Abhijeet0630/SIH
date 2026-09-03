"""
Festivals routes.
GET /api/festivals
GET /api/festivals/{festival_id}
"""
from typing import Optional
from fastapi import APIRouter, Query
from app.services.festival_service import FestivalService
from app.schemas.common import success

router = APIRouter(prefix="/festivals", tags=["Festivals"])
_service = FestivalService()


@router.get(
    "",
    summary="List Festivals",
    description="Returns all festivals. Filter by state using ?state_id=mh.",
)
def list_festivals(state_id: Optional[str] = Query(default=None, description="Filter by state ID (e.g. 'mh')")):
    festivals = _service.get_all_festivals(state_id=state_id)
    return success([f.model_dump() for f in festivals])


@router.get(
    "/{festival_id}",
    summary="Get Festival Detail",
    description="Returns full details about a festival including rituals, foods, and significance.",
)
def get_festival(festival_id: str):
    festival = _service.get_festival(festival_id)
    return success(festival.model_dump())
