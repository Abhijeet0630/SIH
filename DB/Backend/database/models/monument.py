"""
Pydantic models for Monument data.
Mirrors Frontend/src/types/monument.ts — MonumentData and nested types.
"""

from typing import Optional, List, Tuple
from pydantic import BaseModel


class HotspotAnnotationResponse(BaseModel):
    """Matches Frontend HotspotAnnotation interface."""
    id: str
    title: str = ""
    shortDescription: str = ""
    detailedText: str = ""
    position: List[float] = []          # [x, y, z]
    cameraPosition: Optional[List[float]] = None
    cameraTarget: Optional[List[float]] = None
    imageUrl: Optional[str] = None
    architecturalNote: Optional[str] = None


class Monument3DModelConfigResponse(BaseModel):
    """Matches Frontend Monument3DModelConfig interface."""
    modelType: Optional[str] = None
    defaultCameraPosition: Optional[List[float]] = None
    lookAtTarget: Optional[List[float]] = None
    lightingPreset: Optional[str] = None
    minDistance: Optional[float] = None
    maxDistance: Optional[float] = None
    autoRotateSpeed: Optional[float] = None
    modelScale: Optional[float] = None
    groundOffset: Optional[float] = None


class MonumentResponse(BaseModel):
    """Full MonumentData — matches Frontend MonumentData interface."""
    id: str
    slug: str
    name: str
    nativeName: Optional[str] = None
    marathiName: Optional[str] = None
    hindiName: Optional[str] = None
    state: str = ""
    stateId: str = ""
    region: str = ""
    district_or_city: str = ""
    category: str = ""
    description: str = ""
    shortDescription: str = ""
    image: str = ""
    bannerImage: Optional[str] = None
    modelUrl: Optional[str] = None
    modelAvailable: bool = False
    architecturalStyle: Optional[str] = None
    yearBuilt: Optional[str] = None
    culturalSignificance: Optional[str] = None
    detailedHistory: Optional[str] = None
    culturalImportance: Optional[str] = None
    locationName: Optional[str] = None
    coordinates: Optional[dict] = None
    modelConfig: Optional[Monument3DModelConfigResponse] = None
    hotspots: Optional[List[HotspotAnnotationResponse]] = None
    starSchemaNodes: Optional[List[dict]] = None
    sources: Optional[List[dict]] = None


class MonumentSummaryResponse(BaseModel):
    """Lightweight summary for list endpoints."""
    id: str
    slug: str
    name: str
    stateId: str = ""
    state: str = ""
    shortDescription: str = ""
    image: str = ""
    modelAvailable: bool = False
