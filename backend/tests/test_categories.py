"""Tests for /api/categories"""
import pytest


@pytest.mark.anyio
async def test_list_categories(client):
    response = await client.get("/api/categories")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    categories = body["data"]
    assert isinstance(categories, list)
    assert len(categories) >= 9  # food, fashion, forts, temples, dance, music, art, festivals, languages
    ids = [c["id"] for c in categories]
    for expected in ["food", "dance", "forts", "festivals"]:
        assert expected in ids
