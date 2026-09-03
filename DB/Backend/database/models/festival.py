"""
Pydantic models for Festival data.
Mirrors Frontend/src/types/festival.ts — FestivalEvent.
"""

from typing import Optional, List
from pydantic import BaseModel


class FestivalResponse(BaseModel):
    """Matches Frontend FestivalEvent interface."""
    id: str
    name: str
    marathiName: Optional[str] = None
    hindiName: Optional[str] = None
    monthIndex: int = 0
    dateOrSeason: str = ""
    upcomingDate: Optional[str] = None
    dayOrTithi: Optional[str] = None
    state: str = ""
    stateId: str = ""
    category: str = ""   # harvest/religious/seasonal/art/new-year
    image: str = ""
    shortDescription: str = ""
    culturalSignificance: str = ""
    traditionalPractices: List[str] = []
    relatedItemSlug: Optional[str] = None
