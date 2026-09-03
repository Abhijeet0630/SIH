"""
Discovery routes.
GET /api/discover/surprise
"""
from fastapi import APIRouter
from app.services.discovery_service import DiscoveryService
from app.schemas.common import success

router = APIRouter(prefix="/discover", tags=["Discovery"])
_service = DiscoveryService()


@router.get(
    "/surprise",
    summary="Surprise Me",
    description=(
        "Returns a randomly selected cultural item from the platform. "
        "The response includes state, category, and cultural item details. "
        "Designed to be upgraded to AI-based personalised recommendations later."
    ),
)
def surprise_me():
    result = _service.get_surprise()
    return success(result)
