from .states import router as states_router
from .categories import router as categories_router
from .cultural_items import router as cultural_items_router
from .monuments import router as monuments_router
from .festivals import router as festivals_router

__all__ = [
    "states_router",
    "categories_router",
    "cultural_items_router",
    "monuments_router",
    "festivals_router",
]
