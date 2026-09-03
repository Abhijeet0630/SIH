"""
Pydantic schemas for Festival responses.
"""
from typing import Optional
from pydantic import BaseModel


class FestivalSummary(BaseModel):
    """Lightweight festival for list views."""
    id: str
    name: str
    state_id: Optional[str] = None   # None = pan-India
    month: Optional[str] = None
    image_url: Optional[str] = None
    short_description: str


class FestivalDetail(BaseModel):
    """Full festival detail."""
    id: str
    name: str
    state_id: Optional[str] = None
    states: list[str] = []           # list of state IDs where celebrated
    month: Optional[str] = None
    duration_days: Optional[int] = None
    short_description: str
    description: str
    rituals: list[str] = []
    foods: list[str] = []
    significance: Optional[str] = None
    image_url: Optional[str] = None
    gallery_urls: list[str] = []
