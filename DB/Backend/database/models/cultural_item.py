"""
Pydantic models for CulturalItem data.
Mirrors Frontend/src/types/culturalItem.ts — CulturalItem and nested types.
"""

from typing import Optional, List, Any
from pydantic import BaseModel


class ImageMetaResponse(BaseModel):
    url: str
    alt: str = ""
    caption: Optional[str] = None
    credit: str = ""
    license: str = ""
    source: Optional[str] = None


class SourceCitationResponse(BaseModel):
    title: str
    url: Optional[str] = None
    publisher: str = ""
    verifiedDate: str = ""


class StarSchemaNodeResponse(BaseModel):
    id: str
    type: str  # history/region/materials/tradition/festival/modern/etc
    label: str = ""
    shortDescription: str = ""
    detailedContent: str = ""


class RecipeInfoResponse(BaseModel):
    prepTime: Optional[str] = None
    cookTime: Optional[str] = None
    difficulty: Optional[str] = None  # Easy/Medium/Advanced
    ingredientsSummary: List[str] = []
    culturalContext: str = ""
    recipeUrl: str = ""
    verifiedSourceName: str = ""


class LocationResponse(BaseModel):
    name: str = ""
    district: str = ""
    state: str = ""
    coordinates: dict = {}  # {lat: float, lng: float}


class CulturalItemResponse(BaseModel):
    """Full CulturalItem — matches Frontend CulturalItem interface."""
    id: str
    slug: str
    title: str
    marathiTitle: Optional[str] = None
    hindiTitle: Optional[str] = None
    stateId: str = ""
    category: str = ""
    shortDescription: str = ""
    description: str = ""
    history: str = ""
    culturalSignificance: str = ""
    location: LocationResponse = LocationResponse()
    images: List[ImageMetaResponse] = []
    primaryImage: str = ""
    sources: List[SourceCitationResponse] = []
    starSchemaNodes: List[StarSchemaNodeResponse] = []
    relatedItemSlugs: List[str] = []
    tags: List[str] = []
    recipeInfo: Optional[RecipeInfoResponse] = None
    model3DId: Optional[str] = None
    lastVerified: str = ""


class CulturalItemSummaryResponse(BaseModel):
    """Lightweight summary for list endpoints."""
    id: str
    slug: str
    title: str
    stateId: str = ""
    category: str = ""
    shortDescription: str = ""
    primaryImage: str = ""
    location: LocationResponse = LocationResponse()
    tags: List[str] = []
