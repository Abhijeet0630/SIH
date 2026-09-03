"""Tests for /api/states/{state_id}/culture and /api/culture/{id}"""
import pytest


@pytest.mark.anyio
async def test_get_state_culture(client):
    response = await client.get("/api/states/mh/culture")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    items = body["data"]
    assert isinstance(items, list)
    assert len(items) > 0
    # Check card structure
    first = items[0]
    assert "id" in first
    assert "name" in first
    assert "type" in first
    assert "state_id" in first
    assert first["state_id"] == "mh"


@pytest.mark.anyio
async def test_get_state_culture_filtered(client):
    response = await client.get("/api/states/mh/culture?category=food")
    assert response.status_code == 200
    body = response.json()
    items = body["data"]
    assert len(items) > 0
    for item in items:
        assert item["type"] == "food"


@pytest.mark.anyio
async def test_get_culture_item_vada_pav(client):
    response = await client.get("/api/culture/vada-pav")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    data = body["data"]
    assert data["id"] == "vada-pav"
    assert data["name"] == "Vada Pav"
    assert data["type"] == "food"
    assert data["state_id"] == "mh"
    assert "description" in data
    assert "recipe" in data
    assert data["recipe"]["recipe_url"] is not None


@pytest.mark.anyio
async def test_get_culture_connections(client):
    response = await client.get("/api/culture/vada-pav/connections")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    data = body["data"]
    assert "center" in data
    assert data["center"]["id"] == "vada-pav"
    assert "connections" in data
    assert isinstance(data["connections"], list)
    assert len(data["connections"]) > 0
    # Check structure of a connection node
    node = data["connections"][0]
    assert "id" in node
    assert "type" in node
    assert "relationship" in node


@pytest.mark.anyio
async def test_get_culture_item_not_found(client):
    response = await client.get("/api/culture/does-not-exist")
    assert response.status_code == 404
    body = response.json()
    assert body["success"] is False
    assert body["error"]["code"] == "NOT_FOUND"


@pytest.mark.anyio
async def test_get_culture_for_invalid_state(client):
    response = await client.get("/api/states/zzz/culture")
    assert response.status_code == 404
