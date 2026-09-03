"""
Pydantic schemas for Event responses.
"""
from typing import Optional
from pydantic import BaseModel


class Event(BaseModel):
    """A cultural event or 'On This Day' entry."""
    id: str
    title: str
    description: str
    date: str               # ISO date string YYYY-MM-DD
    state_id: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    significance: Optional[str] = None
    event_type: str = "event"   # event | on_this_day | featured
