"""
Central API router — registers all route modules.
"""
from fastapi import APIRouter
from app.api.routes import (
    health,
    states,
    categories,
    culture,
    events,
    festivals,
    monuments,
    passport,
    discovery,
    ai,
)

api_router = APIRouter()

# Register all route modules
api_router.include_router(health.router)
api_router.include_router(states.router)
api_router.include_router(categories.router)
api_router.include_router(culture.router)
api_router.include_router(events.router)
api_router.include_router(festivals.router)
api_router.include_router(monuments.router)
api_router.include_router(passport.router)
api_router.include_router(discovery.router)
api_router.include_router(ai.router)
