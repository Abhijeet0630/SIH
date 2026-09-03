"""
Pydantic schemas for Cultural Passport.
"""
from typing import Optional
from pydantic import BaseModel


class PassportStats(BaseModel):
    """Aggregate discovery statistics for the Cultural Passport."""
    states_explored: int = 0
    foods_discovered: int = 0
    monuments_explored: int = 0
    art_forms_explored: int = 0
    festivals_viewed: int = 0
    total_discoveries: int = 0


class DiscoveredItem(BaseModel):
    """A single item recorded in the passport."""
    item_type: str   # food | monument | art | festival | dance | music
    item_id: str
    item_name: Optional[str] = None
    state_id: Optional[str] = None
    discovered_at: Optional[str] = None   # ISO datetime string


class PassportData(BaseModel):
    """Complete passport object returned to the frontend."""
    stats: PassportStats
    discoveries: list[DiscoveredItem] = []


class DiscoverRequest(BaseModel):
    """Request body for POST /api/passport/discover."""
    item_type: str
    item_id: str
