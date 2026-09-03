"""
Custom exception classes and global FastAPI exception handlers.
"""
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse


# ── Custom Exception Classes ─────────────────────────────────────────────────

class HeritageException(Exception):
    """Base exception for the Heritage backend."""

    def __init__(self, code: str, message: str, status_code: int = 400):
        self.code = code
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class NotFoundException(HeritageException):
    """Raised when a requested resource does not exist."""

    def __init__(self, resource: str, identifier: str):
        super().__init__(
            code="NOT_FOUND",
            message=f"{resource} '{identifier}' not found.",
            status_code=404,
        )


class ValidationException(HeritageException):
    """Raised when input validation fails at the service/business layer."""

    def __init__(self, message: str):
        super().__init__(
            code="VALIDATION_ERROR",
            message=message,
            status_code=422,
        )


class AIServiceException(HeritageException):
    """Raised when the AI service is unavailable or returns an error."""

    def __init__(self, message: str = "AI service is currently unavailable."):
        super().__init__(
            code="AI_SERVICE_ERROR",
            message=message,
            status_code=503,
        )


class DatabaseException(HeritageException):
    """Raised when a database operation fails."""

    def __init__(self, message: str = "A database error occurred."):
        super().__init__(
            code="DATABASE_ERROR",
            message=message,
            status_code=500,
        )


# ── Response Helpers ─────────────────────────────────────────────────────────

def error_response(code: str, message: str, status_code: int = 400) -> JSONResponse:
    """Build a standard error JSONResponse."""
    return JSONResponse(
        status_code=status_code,
        content={
            "success": False,
            "error": {
                "code": code,
                "message": message,
            },
        },
    )


# ── Exception Handlers ───────────────────────────────────────────────────────

def register_exception_handlers(app: FastAPI) -> None:
    """Register global exception handlers on the FastAPI app."""

    @app.exception_handler(HeritageException)
    async def heritage_exception_handler(
        request: Request, exc: HeritageException
    ) -> JSONResponse:
        return error_response(exc.code, exc.message, exc.status_code)

    @app.exception_handler(404)
    async def not_found_handler(request: Request, exc: Exception) -> JSONResponse:
        return error_response(
            "NOT_FOUND",
            f"The requested path '{request.url.path}' does not exist.",
            404,
        )

    @app.exception_handler(500)
    async def internal_error_handler(request: Request, exc: Exception) -> JSONResponse:
        return error_response(
            "INTERNAL_ERROR",
            "An internal server error occurred. Please try again later.",
            500,
        )
