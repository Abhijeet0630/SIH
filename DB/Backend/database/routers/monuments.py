"""
GET /api/monuments          — list all monuments
GET /api/monuments/{slug}   — single monument with hotspots
"""

from typing import List
from fastapi import APIRouter, HTTPException

from config import supabase
from models.monument import (
    MonumentResponse,
    MonumentSummaryResponse,
    HotspotAnnotationResponse,
    Monument3DModelConfigResponse,
)

router = APIRouter(prefix="/api/monuments", tags=["Monuments"])


def _row_to_summary(row: dict) -> MonumentSummaryResponse:
    return MonumentSummaryResponse(
        id=row.get("id", ""),
        slug=row.get("slug", ""),
        name=row.get("name", ""),
        stateId=row.get("state_id", ""),
        state=row.get("state", ""),
        shortDescription=row.get("short_description", ""),
        image=row.get("image", ""),
        modelAvailable=row.get("model_available", False),
    )


def _hotspot_row(row: dict) -> HotspotAnnotationResponse:
    pos = [
        row.get("position_x", 0),
        row.get("position_y", 0),
        row.get("position_z", 0),
    ]
    cam_pos = None
    if row.get("camera_position_x") is not None:
        cam_pos = [
            row.get("camera_position_x", 0),
            row.get("camera_position_y", 0),
            row.get("camera_position_z", 0),
        ]
    cam_target = None
    if row.get("camera_target_x") is not None:
        cam_target = [
            row.get("camera_target_x", 0),
            row.get("camera_target_y", 0),
            row.get("camera_target_z", 0),
        ]

    return HotspotAnnotationResponse(
        id=row.get("id", ""),
        title=row.get("title", ""),
        shortDescription=row.get("short_description", ""),
        detailedText=row.get("detailed_text", ""),
        position=pos,
        cameraPosition=cam_pos,
        cameraTarget=cam_target,
        imageUrl=row.get("image_url"),
        architecturalNote=row.get("architectural_note"),
    )


def _row_to_full(row: dict, hotspots: list | None = None) -> MonumentResponse:
    # Parse model_config JSONB
    mc_raw = row.get("model_config")
    model_config = Monument3DModelConfigResponse(**mc_raw) if isinstance(mc_raw, dict) else None

    coords = None
    if row.get("latitude") is not None and row.get("longitude") is not None:
        coords = {"lat": float(row["latitude"]), "lng": float(row["longitude"])}

    hotspot_list = None
    if hotspots:
        hotspot_list = [_hotspot_row(h) for h in hotspots]

    return MonumentResponse(
        id=row.get("id", ""),
        slug=row.get("slug", ""),
        name=row.get("name", ""),
        nativeName=row.get("native_name"),
        marathiName=row.get("marathi_name"),
        hindiName=row.get("hindi_name"),
        state=row.get("state", ""),
        stateId=row.get("state_id", ""),
        region=row.get("region", ""),
        district_or_city=row.get("district_or_city", ""),
        category=row.get("category", ""),
        description=row.get("description", ""),
        shortDescription=row.get("short_description", ""),
        image=row.get("image", ""),
        bannerImage=row.get("banner_image"),
        modelUrl=row.get("model_url"),
        modelAvailable=row.get("model_available", False),
        architecturalStyle=row.get("architectural_style"),
        yearBuilt=row.get("year_built"),
        culturalSignificance=row.get("cultural_significance"),
        detailedHistory=row.get("detailed_history"),
        culturalImportance=row.get("cultural_importance"),
        locationName=row.get("location_name"),
        coordinates=coords,
        modelConfig=model_config,
        hotspots=hotspot_list,
    )


@router.get("", response_model=List[MonumentSummaryResponse])
async def list_monuments():
    """Return all monuments (summary view)."""
    result = supabase.table("monuments").select("*").execute()
    return [_row_to_summary(row) for row in (result.data or [])]


@router.get("/{slug}", response_model=MonumentResponse)
async def get_monument(slug: str):
    """Return a single monument by slug with hotspots."""
    normalized = slug.lower().strip()

    # Try by slug first, then by id
    result = supabase.table("monuments").select("*").eq("slug", normalized).execute()
    rows = result.data or []
    if not rows:
        result = supabase.table("monuments").select("*").eq("id", normalized).execute()
        rows = result.data or []

    if not rows:
        raise HTTPException(status_code=404, detail=f"Monument '{slug}' not found")

    monument_row = rows[0]

    # Fetch hotspots
    hs_result = (
        supabase.table("monument_hotspots")
        .select("*")
        .eq("monument_id", monument_row["id"])
        .execute()
    )

    return _row_to_full(monument_row, hotspots=hs_result.data)
