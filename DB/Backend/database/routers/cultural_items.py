"""
GET /api/cultural-items              — list items (with optional ?state_id= and ?category= filters)
GET /api/cultural-items/{slug}       — single item with star schema nodes
"""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query

from config import supabase
from models.cultural_item import (
    CulturalItemResponse,
    CulturalItemSummaryResponse,
    ImageMetaResponse,
    SourceCitationResponse,
    StarSchemaNodeResponse,
    RecipeInfoResponse,
    LocationResponse,
)

router = APIRouter(prefix="/api/cultural-items", tags=["Cultural Items"])


def _row_to_summary(row: dict) -> CulturalItemSummaryResponse:
    return CulturalItemSummaryResponse(
        id=row.get("id", ""),
        slug=row.get("slug", ""),
        title=row.get("title", ""),
        stateId=row.get("state_id", ""),
        category=row.get("category", ""),
        shortDescription=row.get("short_description", ""),
        primaryImage=row.get("primary_image", ""),
        location=LocationResponse(
            name=row.get("location_name", ""),
            district=row.get("district", ""),
            state=row.get("state_name", ""),
            coordinates={
                "lat": float(row.get("latitude") or 0),
                "lng": float(row.get("longitude") or 0),
            },
        ),
        tags=row.get("tags") or [],
    )


def _row_to_full(row: dict, star_nodes: list | None = None) -> CulturalItemResponse:
    # Parse JSONB fields
    images_raw = row.get("images") or []
    images = [ImageMetaResponse(**img) if isinstance(img, dict) else img for img in images_raw]

    sources_raw = row.get("sources") or []
    sources = [SourceCitationResponse(**s) if isinstance(s, dict) else s for s in sources_raw]

    recipe_raw = row.get("recipe_info")
    recipe = RecipeInfoResponse(**recipe_raw) if isinstance(recipe_raw, dict) else None

    nodes = []
    if star_nodes:
        for n in star_nodes:
            nodes.append(StarSchemaNodeResponse(
                id=n.get("id", ""),
                type=n.get("type", ""),
                label=n.get("label", ""),
                shortDescription=n.get("short_description", ""),
                detailedContent=n.get("detailed_content", ""),
            ))

    return CulturalItemResponse(
        id=row.get("id", ""),
        slug=row.get("slug", ""),
        title=row.get("title", ""),
        marathiTitle=row.get("marathi_title"),
        hindiTitle=row.get("hindi_title"),
        stateId=row.get("state_id", ""),
        category=row.get("category", ""),
        shortDescription=row.get("short_description", ""),
        description=row.get("description", ""),
        history=row.get("history", ""),
        culturalSignificance=row.get("cultural_significance", ""),
        location=LocationResponse(
            name=row.get("location_name", ""),
            district=row.get("district", ""),
            state=row.get("state_name", ""),
            coordinates={
                "lat": float(row.get("latitude") or 0),
                "lng": float(row.get("longitude") or 0),
            },
        ),
        images=images,
        primaryImage=row.get("primary_image", ""),
        sources=sources,
        starSchemaNodes=nodes,
        relatedItemSlugs=row.get("related_item_slugs") or [],
        tags=row.get("tags") or [],
        recipeInfo=recipe,
        model3DId=row.get("model_3d_id"),
        lastVerified=row.get("last_verified", ""),
    )


@router.get("", response_model=List[CulturalItemSummaryResponse])
async def list_cultural_items(
    state_id: Optional[str] = Query(None, description="Filter by state ID"),
    category: Optional[str] = Query(None, description="Filter by category ID"),
):
    """Return cultural items with optional state and category filters."""
    query = supabase.table("cultural_items").select("*")

    if state_id:
        query = query.eq("state_id", state_id.lower())
    if category and category != "all":
        query = query.eq("category", category.lower())

    result = query.execute()
    return [_row_to_summary(row) for row in (result.data or [])]


@router.get("/{slug}", response_model=CulturalItemResponse)
async def get_cultural_item(slug: str):
    """Return a single cultural item by slug, including star schema nodes."""
    result = supabase.table("cultural_items").select("*").eq("slug", slug.lower()).execute()
    rows = result.data or []
    if not rows:
        raise HTTPException(status_code=404, detail=f"Cultural item '{slug}' not found")

    item_row = rows[0]

    # Fetch star schema nodes
    nodes_result = (
        supabase.table("star_schema_nodes")
        .select("*")
        .eq("cultural_item_id", item_row["id"])
        .execute()
    )

    return _row_to_full(item_row, star_nodes=nodes_result.data)
