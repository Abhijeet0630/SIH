import os
os.environ["APP_ENV"] = "test"
os.environ["REPOSITORY_BACKEND"] = "mock"

import pytest
from httpx import AsyncClient, ASGITransport
from app.core.config import get_settings
get_settings.cache_clear()

from app.main import app
from app.repositories.passport_repository import PassportRepository


@pytest.fixture
def anyio_backend():
    return "asyncio"


@pytest.fixture(autouse=True)
def reset_passport_store():
    """Reset the in-memory passport repository before each test to prevent test state leakage."""
    PassportRepository().clear()
    yield
    PassportRepository().clear()


@pytest.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        yield ac
