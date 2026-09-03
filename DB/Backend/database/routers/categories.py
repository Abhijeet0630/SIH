"""
GET /api/categories  — list all cultural categories
"""

from typing import List
from fastapi import APIRouter

from config import supabase
from models.category import CategoryResponse

router = APIRouter(prefix="/api/categories", tags=["Categories"])


def _row_to_category(row: dict) -> CategoryResponse:
    return CategoryResponse(
        id=row.get("id", ""),
        labelKey=row.get("label_key", ""),
        defaultLabel=row.get("default_label", ""),
        iconName=row.get("icon_name", ""),
        accentColor=row.get("accent_color", ""),
        description=row.get("description", ""),
    )


@router.get("", response_model=List[CategoryResponse])
async def list_categories():
    """Return all cultural categories."""
    result = supabase.table("categories").select("*").execute()
    return [_row_to_category(row) for row in (result.data or [])]
