"""
Categories routes.
GET /api/categories
"""
from fastapi import APIRouter
from app.services.category_service import CategoryService
from app.schemas.common import success

router = APIRouter(prefix="/categories", tags=["Categories"])
_service = CategoryService()


@router.get(
    "",
    summary="List All Cultural Categories",
    description="Returns all available cultural categories (Food, Dance, Forts, etc.).",
)
def list_categories():
    categories = _service.get_all_categories()
    return success([c.model_dump() for c in categories])
