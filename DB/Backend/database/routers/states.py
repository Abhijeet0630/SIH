"""
GET /api/states       — list all states
GET /api/states/{id}  — single state with sub-regions
"""

from typing import List
from fastapi import APIRouter, HTTPException

from config import supabase
from models.state import StateOverviewResponse, StateRegionResponse, CoordinatesResponse

router = APIRouter(prefix="/api/states", tags=["States"])


def _row_to_state(row: dict, sub_regions: list | None = None) -> StateOverviewResponse:
    """Convert a Supabase row (snake_case) into the camelCase response model."""
    return StateOverviewResponse(
        id=row.get("id", ""),
        code=row.get("code", ""),
        name=row.get("name", ""),
        nativeName=row.get("native_name"),
        capital=row.get("capital", ""),
        region=row.get("region", ""),
        isFullyDeveloped=row.get("is_fully_developed", False),
        culturalIdentity=row.get("cultural_identity", ""),
        shortDescription=row.get("short_description", ""),
        historicalOverview=row.get("historical_overview"),
        languages=row.get("languages") or [],
        bannerImage=row.get("banner_image_url", ""),
        itemCount=row.get("item_count", 0),
        monumentCount=row.get("monument_count", 0),
        highlightedItemSlug=row.get("highlighted_item_slug"),
        featuredTraditions=row.get("featured_traditions"),
        subRegions=sub_regions,
        coordinates=CoordinatesResponse(
            lat=float(row.get("latitude") or 0),
            lng=float(row.get("longitude") or 0),
        ),
    )


def _row_to_sub_region(row: dict) -> StateRegionResponse:
    return StateRegionResponse(
        id=row.get("id", ""),
        name=row.get("name", ""),
        districts=row.get("districts") or [],
        description=row.get("description", ""),
        culturalCharacter=row.get("cultural_character", ""),
    )


@router.get("", response_model=List[StateOverviewResponse])
async def list_states():
    """Return all states (without sub-regions for performance)."""
    result = supabase.table("states").select("*").execute()
    return [_row_to_state(row) for row in (result.data or [])]


@router.get("/{state_id}", response_model=StateOverviewResponse)
async def get_state(state_id: str):
    """Return a single state with its sub-regions."""
    result = supabase.table("states").select("*").eq("id", state_id.lower()).execute()
    rows = result.data or []
    if not rows:
        raise HTTPException(status_code=404, detail=f"State '{state_id}' not found")

    # Fetch sub-regions
    sr_result = supabase.table("state_sub_regions").select("*").eq("state_id", state_id.lower()).execute()
    sub_regions = [_row_to_sub_region(sr) for sr in (sr_result.data or [])]

    return _row_to_state(rows[0], sub_regions=sub_regions if sub_regions else None)
