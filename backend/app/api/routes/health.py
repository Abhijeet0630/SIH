"""
Health check route.
GET /api/health
"""
from fastapi import APIRouter
from app.schemas.common import success

router = APIRouter(tags=["Health"])


@router.get(
    "/health",
    summary="Health Check",
    description="Verify that the Heritage Backend server is running.",
)
def health_check():
    return success({"status": "ok", "service": "heritage-backend"})
