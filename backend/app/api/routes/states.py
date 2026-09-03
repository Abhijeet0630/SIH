"""
States routes.
GET /api/states
GET /api/states/{state_id}
GET /api/states/{state_id}/categories
GET /api/states/{state_id}/culture
"""
from typing import Optional
from fastapi import APIRouter, Query
from app.services.state_service import StateService
from app.services.category_service import CategoryService
from app.services.culture_service import CultureService
from app.schemas.common import success

router = APIRouter(prefix="/states", tags=["States"])
_state_service = StateService()
_category_service = CategoryService()
_culture_service = CultureService()


@router.get(
    "",
    summary="List All States",
    description="Returns all Indian states available for cultural exploration.",
)
def list_states():
    states = _state_service.get_all_states()
    return success([s.model_dump() for s in states])


@router.get(
    "/{state_id}",
    summary="Get State Details",
    description=(
        "Returns detailed information about a state including its cultural summary, "
        "languages, and visual theme metadata for the frontend."
    ),
)
def get_state(state_id: str):
    state = _state_service.get_state(state_id)
    return success(state.model_dump())


@router.get(
    "/{state_id}/categories",
    summary="Get Categories for a State",
    description="Returns the cultural categories available for a specific state.",
)
def get_state_categories(state_id: str):
    categories = _category_service.get_categories_for_state(state_id)
    return success([c.model_dump() for c in categories])


@router.get(
    "/{state_id}/culture",
    summary="Get Cultural Items for a State",
    description=(
        "Returns cultural cards for a state. "
        "Optionally filter by category using the 'category' query parameter. "
        "Example: ?category=food"
    ),
)
def get_state_culture(
    state_id: str,
    category: Optional[str] = Query(default=None, description="Filter by cultural category (e.g. 'food')"),
):
    items = _culture_service.get_items_for_state(state_id, category)
    return success([item.model_dump() for item in items])
