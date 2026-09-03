"""
Monuments routes.
GET /api/monuments
GET /api/monuments/{monument_id}
GET /api/monuments/{monument_id}/hotspots
"""
from typing import Optional
from fastapi import APIRouter, Query
from app.services.monument_service import MonumentService
from app.schemas.common import success

router = APIRouter(prefix="/monuments", tags=["Monuments"])
_service = MonumentService()


@router.get(
    "",
    summary="List Monuments",
    description=(
        "Returns all heritage monuments and sites. "
        "Filter by state using ?state_id=mh."
    ),
)
def list_monuments(
    state_id: Optional[str] = Query(default=None, description="Filter by state ID"),
):
    monuments = _service.get_all_monuments(state_id=state_id)
    return success([m.model_dump() for m in monuments])


@router.get(
    "/{monument_id}",
    summary="Get Monument Detail",
    description=(
        "Returns full details of a monument including history, architecture, timeline, "
        "cultural significance, and 3D model metadata. "
        "Example: /api/monuments/gateway-of-india"
    ),
)
def get_monument(monument_id: str):
    monument = _service.get_monument(monument_id)
    return success(monument.model_dump())


@router.get(
    "/{monument_id}/hotspots",
    summary="Get Monument Hotspots",
    description=(
        "Returns interactive annotation hotspots for a 3D monument model. "
        "Each hotspot includes a 3D position, name, and description. "
        "The 3D frontend uses this to place interactive labels on the model."
    ),
)
def get_monument_hotspots(monument_id: str):
    hotspots = _service.get_hotspots(monument_id)
    return success([h.model_dump() for h in hotspots])
