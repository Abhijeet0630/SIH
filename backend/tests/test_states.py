"""Tests for /api/states endpoints"""
import pytest


@pytest.mark.anyio
async def test_list_states(client):
    response = await client.get("/api/states")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    states = body["data"]
    assert isinstance(states, list)
    assert len(states) >= 6  # At minimum: MH, RJ, GJ, KL, AS, TN
    # Check structure
    first = states[0]
    assert "id" in first
    assert "name" in first
    assert "code" in first


@pytest.mark.anyio
async def test_get_state_mh(client):
    response = await client.get("/api/states/mh")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    data = body["data"]
    assert data["id"] == "mh"
    assert data["name"] == "Maharashtra"
    assert data["code"] == "MH"
    assert "description" in data
    assert "cultural_summary" in data
    assert "languages" in data


@pytest.mark.anyio
async def test_get_state_not_found(client):
    response = await client.get("/api/states/xyz")
    assert response.status_code == 404
    body = response.json()
    assert body["success"] is False
    assert body["error"]["code"] == "NOT_FOUND"


@pytest.mark.anyio
async def test_get_state_categories(client):
    response = await client.get("/api/states/mh/categories")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    categories = body["data"]
    assert isinstance(categories, list)
    assert len(categories) > 0
    category_ids = [c["id"] for c in categories]
    assert "food" in category_ids
