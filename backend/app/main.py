"""
Heritage Backend — FastAPI Application Factory
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager
from app.core.config import get_settings
from app.core.exceptions import register_exception_handlers
from app.core.supabase_client import get_supabase_client
from app.api.router import api_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    # Gracefully close connection pool on shutdown
    try:
        get_supabase_client().close()
    except Exception:
        pass


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    application = FastAPI(
        title=settings.APP_NAME,
        description=(
            "REST API for the Indian Cultural Heritage Exploration Platform. "
            "Provides data for states, cultural items, monuments, festivals, "
            "events, cultural passport, and an AI cultural guide gateway."
        ),
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
        lifespan=lifespan,
    )

    # ── CORS ────────────────────────────────────────────────────────────────
    application.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.FRONTEND_URL, "http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Exception Handlers ──────────────────────────────────────────────────
    register_exception_handlers(application)

    # ── Routers ─────────────────────────────────────────────────────────────
    application.include_router(api_router, prefix=settings.API_PREFIX)

    return application


app = create_app()
