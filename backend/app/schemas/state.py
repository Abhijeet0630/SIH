"""
Pydantic schemas for State responses.
"""
from typing import Optional
from pydantic import BaseModel


class StateTheme(BaseModel):
    """Visual theme metadata for the frontend (colors, imagery hints)."""
    primary_color: Optional[str] = None
    accent_color: Optional[str] = None
    banner_keyword: Optional[str] = None  # keyword to fetch banner image


class StateSummary(BaseModel):
    """Lightweight state representation for list endpoints."""
    id: str
    name: str
    code: str
    thumbnail_url: Optional[str] = None


class StateDetail(BaseModel):
    """Full state detail including description and theme metadata."""
    id: str
    name: str
    code: str
    description: str
    cultural_summary: str
    capital: Optional[str] = None
    region: Optional[str] = None
    languages: list[str] = []
    theme: Optional[StateTheme] = None
    thumbnail_url: Optional[str] = None
