"""Tests for /api/festivals endpoints"""
import pytest


@pytest.mark.anyio
async def test_list_festivals(client):
    response = await client.get("/api/festivals")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    festivals = body["data"]
    assert isinstance(festivals, list)
    assert len(festivals) >= 5
    first = festivals[0]
    assert "id" in first
    assert "name" in first
    assert "short_description" in first


@pytest.mark.anyio
async def test_list_festivals_filter_by_state(client):
    response = await client.get("/api/festivals?state_id=mh")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    festivals = body["data"]
    assert len(festivals) > 0
    ids = [f["id"] for f in festivals]
    assert "ganesh-chaturthi" in ids


@pytest.mark.anyio
async def test_get_festival_detail(client):
    response = await client.get("/api/festivals/ganesh-chaturthi")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    data = body["data"]
    assert data["id"] == "ganesh-chaturthi"
    assert data["name"] == "Ganesh Chaturthi"
    assert "rituals" in data
    assert "foods" in data
    assert len(data["rituals"]) > 0


@pytest.mark.anyio
async def test_get_festival_not_found(client):
    response = await client.get("/api/festivals/unknown-festival")
    assert response.status_code == 404
    body = response.json()
    assert body["success"] is False
    assert body["error"]["code"] == "NOT_FOUND"
