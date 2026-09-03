"""
Pydantic schemas for Monument responses.
"""
from typing import Optional
from pydantic import BaseModel


class HotspotPosition(BaseModel):
    """3D coordinate for a monument hotspot annotation."""
    x: float
    y: float
    z: float


class MonumentHotspot(BaseModel):
    """Interactive annotation point on a 3D monument model."""
    id: str
    name: str
    description: str
    position: HotspotPosition
    annotation: Optional[str] = None
    image_url: Optional[str] = None


class TimelineEntry(BaseModel):
    year: str
    event: str


class MonumentSummary(BaseModel):
    """Lightweight monument for list views."""
    id: str
    name: str
    state_id: str
    location: str
    short_description: str
    thumbnail_url: Optional[str] = None
    has_3d_model: bool = False


class MonumentDetail(BaseModel):
    """Full monument detail including 3D metadata."""
    id: str
    name: str
    state_id: str
    location: str
    coordinates: Optional[dict] = None     # {"lat": ..., "lng": ...}
    short_description: str
    description: str
    history: Optional[str] = None
    architecture: Optional[str] = None
    built_by: Optional[str] = None
    built_year: Optional[str] = None
    materials: list[str] = []
    cultural_significance: Optional[str] = None
    timeline: list[TimelineEntry] = []
    # 3D model metadata — actual files managed by 3D teammate
    has_3d_model: bool = False
    model_url: Optional[str] = None        # URL provided by 3D teammate
    thumbnail_url: Optional[str] = None
    gallery_urls: list[str] = []
    related_heritage_ids: list[str] = []
    tags: list[str] = []
