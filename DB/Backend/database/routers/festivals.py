"""
GET /api/festivals  — list all festivals (with optional ?state_id= filter)
"""

from typing import List, Optional
from fastapi import APIRouter, Query

from config import supabase
from models.festival import FestivalResponse

router = APIRouter(prefix="/api/festivals", tags=["Festivals"])


def _row_to_festival(row: dict) -> FestivalResponse:
    return FestivalResponse(
        id=row.get("id", ""),
        name=row.get("name", ""),
        marathiName=row.get("marathi_name"),
        hindiName=row.get("hindi_name"),
        monthIndex=row.get("month_index", 0),
        dateOrSeason=row.get("date_or_season", ""),
        upcomingDate=row.get("upcoming_date"),
        dayOrTithi=row.get("day_or_tithi"),
        state=row.get("state", ""),
        stateId=row.get("state_id", ""),
        category=row.get("category", ""),
        image=row.get("image", ""),
        shortDescription=row.get("short_description", ""),
        culturalSignificance=row.get("cultural_significance", ""),
        traditionalPractices=row.get("traditional_practices") or [],
        relatedItemSlug=row.get("related_item_slug"),
    )


@router.get("", response_model=List[FestivalResponse])
async def list_festivals(
    state_id: Optional[str] = Query(None, description="Filter by state ID"),
):
    """Return all festivals, optionally filtered by state."""
    query = supabase.table("festivals").select("*")

    if state_id:
        query = query.eq("state_id", state_id.lower())

    result = query.execute()
    return [_row_to_festival(row) for row in (result.data or [])]
