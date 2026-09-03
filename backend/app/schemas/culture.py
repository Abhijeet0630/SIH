"""
Pydantic schemas for Cultural Item responses.
"""
from typing import Optional
from pydantic import BaseModel


class CultureCard(BaseModel):
    """Lightweight cultural item for list/card views."""
    id: str
    name: str
    type: str           # food | dance | art | fort | temple | festival | fashion | music
    state_id: str
    short_description: str
    image_url: Optional[str] = None
    tags: list[str] = []


class RecipeInfo(BaseModel):
    """Recipe metadata for food items."""
    recipe_url: Optional[str] = None
    ingredients: list[str] = []
    preparation_time: Optional[str] = None
    difficulty: Optional[str] = None


class CultureDetail(BaseModel):
    """Full cultural item detail."""
    id: str
    name: str
    type: str
    state_id: str
    region: Optional[str] = None
    short_description: str
    description: str
    origin: Optional[str] = None
    history: Optional[str] = None
    cultural_significance: Optional[str] = None
    # Food-specific
    recipe: Optional[RecipeInfo] = None
    # Art/Dance/Craft-specific
    materials: list[str] = []
    techniques: list[str] = []
    # General
    timeline: list[dict] = []
    image_url: Optional[str] = None
    gallery_urls: list[str] = []
    tags: list[str] = []
    related_item_ids: list[str] = []


class ConnectionNode(BaseModel):
    """A single node in the cultural connections graph."""
    id: str
    name: str
    type: str           # state | city | food | monument | festival | person | art | dance
    relationship: str   # origin | associated_with | influenced_by | part_of | celebrated_at


class CultureConnections(BaseModel):
    """Star-schema connections for a cultural item."""
    center: CultureCard
    connections: list[ConnectionNode] = []
