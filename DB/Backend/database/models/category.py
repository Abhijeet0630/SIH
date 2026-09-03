"""
Pydantic models for Category data.
Mirrors Frontend/src/types/category.ts — CategoryInfo.
"""

from pydantic import BaseModel


class CategoryResponse(BaseModel):
    """Matches Frontend CategoryInfo interface."""
    id: str
    labelKey: str = ""
    defaultLabel: str = ""
    iconName: str = ""
    accentColor: str = ""
    description: str = ""
