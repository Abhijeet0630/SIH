"""
Common / shared Pydantic schemas used across the application.
"""
from typing import Any, Generic, TypeVar
from pydantic import BaseModel

T = TypeVar("T")


class ErrorDetail(BaseModel):
    code: str
    message: str


class SuccessResponse(BaseModel, Generic[T]):
    """Standard success envelope."""
    success: bool = True
    data: T


class ErrorResponse(BaseModel):
    """Standard error envelope."""
    success: bool = False
    error: ErrorDetail


def success(data: Any) -> dict:
    """Return a plain dict success response (used in route handlers)."""
    return {"success": True, "data": data}


def failure(code: str, message: str) -> dict:
    """Return a plain dict error response."""
    return {"success": False, "error": {"code": code, "message": message}}
