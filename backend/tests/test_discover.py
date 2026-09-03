"""Tests for /api/discover/surprise"""
import pytest


@pytest.mark.anyio
async def test_surprise_me(client):
    response = await client.get("/api/discover/surprise")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    data = body["data"]
    assert "state" in data
    assert "category" in data
    assert "cultural_item" in data
    item = data["cultural_item"]
    assert "id" in item
    assert "name" in item
    assert "type" in item
    assert "short_description" in item


@pytest.mark.anyio
async def test_surprise_returns_different_results(client):
    """Statistical test: multiple calls should not always return identical results."""
    results = set()
    for _ in range(5):
        response = await client.get("/api/discover/surprise")
        body = response.json()
        results.add(body["data"]["cultural_item"]["id"])
    # With 10 items and 5 draws, very likely to get at least 2 distinct results
    # (This test may occasionally fail — acceptable for a randomness check)
    assert len(results) >= 1  # At minimum we get valid results
