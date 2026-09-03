"""
Shared utility helpers used across the application.
"""


def slugify(text: str) -> str:
    """Convert a string to a URL-safe slug."""
    return text.lower().replace(" ", "-").replace("_", "-")


def paginate(items: list, page: int = 1, page_size: int = 20) -> dict:
    """
    Return a paginated slice of a list along with pagination metadata.
    Simple in-memory pagination — replace with DB-level pagination when connected.
    """
    total = len(items)
    start = (page - 1) * page_size
    end = start + page_size
    return {
        "items": items[start:end],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }
