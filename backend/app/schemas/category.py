"""
Pydantic schemas for Category responses.
"""
from typing import Optional
from pydantic import BaseModel


class Category(BaseModel):
    """A cultural category (food, dance, forts, etc.)."""
    id: str
    name: str
    description: Optional[str] = None
    icon: Optional[str] = None  # icon name hint for the frontend
