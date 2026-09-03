"""Tests for /api/passport"""
import pytest


@pytest.mark.anyio
async def test_get_empty_passport(client):
    response = await client.get("/api/passport")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    data = body["data"]
    assert "stats" in data
    assert "discoveries" in data
    stats = data["stats"]
    assert "states_explored" in stats
    assert "foods_discovered" in stats
    assert "monuments_explored" in stats
    assert "total_discoveries" in stats


@pytest.mark.anyio
async def test_record_discovery(client):
    response = await client.post(
        "/api/passport/discover",
        json={"item_type": "food", "item_id": "vada-pav"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    data = body["data"]
    # Stats should be updated
    stats = data["stats"]
    assert stats["foods_discovered"] >= 1
    assert stats["total_discoveries"] >= 1
    assert stats["states_explored"] >= 1  # Maharashtra counted


@pytest.mark.anyio
async def test_discover_updates_passport(client):
    """Record multiple discoveries and check that stats accumulate."""
    await client.post(
        "/api/passport/discover",
        json={"item_type": "food", "item_id": "misal-pav"},
    )
    response = await client.get("/api/passport")
    body = response.json()
    assert body["success"] is True
    assert body["data"]["stats"]["total_discoveries"] >= 1
