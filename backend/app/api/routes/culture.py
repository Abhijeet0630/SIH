"""
Culture routes.
GET /api/culture/{culture_id}
GET /api/culture/{culture_id}/connections
"""
from fastapi import APIRouter
from app.services.culture_service import CultureService
from app.schemas.common import success

router = APIRouter(prefix="/culture", tags=["Culture"])
_service = CultureService()


@router.get(
    "/{culture_id}",
    summary="Get Cultural Item Detail",
    description=(
        "Returns the full details of a cultural item including history, cultural significance, "
        "recipe (for food), techniques (for art/dance), and related items. "
        "Example: /api/culture/vada-pav"
    ),
)
def get_culture_item(culture_id: str):
    item = _service.get_item(culture_id)
    return success(item.model_dump())


@router.get(
    "/{culture_id}/connections",
    summary="Get Cultural Connections (Star Schema)",
    description=(
        "Returns the connection graph for a cultural item. "
        "The frontend uses this to render the star-schema relationship visualization. "
        "The response includes a center node and connected nodes with relationship types."
    ),
)
def get_culture_connections(culture_id: str):
    connections = _service.get_connections(culture_id)
    return success(connections.model_dump())
