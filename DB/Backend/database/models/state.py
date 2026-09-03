"""
Pydantic models for State data.
Mirrors Frontend/src/types/state.ts — StateOverview & StateRegion.
"""

from typing import Optional, List
from pydantic import BaseModel, Field


class StateRegionResponse(BaseModel):
    """Matches Frontend StateRegion interface."""
    id: str
    name: str
    nativeName: Optional[str] = None
    districts: List[str] = []
    description: str = ""
    culturalCharacter: str = ""


class CoordinatesResponse(BaseModel):
    lat: float
    lng: float


class StateOverviewResponse(BaseModel):
    """Matches Frontend StateOverview interface."""
    id: str
    code: str
    name: str
    title: Optional[str] = None
    nativeName: Optional[str] = None
    capital: str = ""
    region: str = ""
    isFullyDeveloped: bool = False
    culturalIdentity: str = ""
    shortDescription: str = ""
    description: Optional[str] = None
    historicalOverview: Optional[str] = None
    languages: List[str] = []
    bannerImage: str = ""
    itemCount: int = 0
    monumentCount: int = 0
    highlightedItemSlug: Optional[str] = None
    featuredTraditions: Optional[List[str]] = None
    subRegions: Optional[List[StateRegionResponse]] = None
    coordinates: CoordinatesResponse
