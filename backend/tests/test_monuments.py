"""Tests for /api/monuments endpoints"""
import pytest


@pytest.mark.anyio
async def test_list_monuments(client):
    response = await client.get("/api/monuments")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    monuments = body["data"]
    assert isinstance(monuments, list)
    assert len(monuments) >= 3  # gateway, raigad, ellora at minimum
    first = monuments[0]
    assert "id" in first
    assert "name" in first
    assert "state_id" in first
    assert "location" in first


@pytest.mark.anyio
async def test_get_monument_gateway(client):
    response = await client.get("/api/monuments/gateway-of-india")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    data = body["data"]
    assert data["id"] == "gateway-of-india"
    assert data["name"] == "Gateway of India"
    assert data["state_id"] == "mh"
    assert "history" in data
    assert "architecture" in data
    assert data["has_3d_model"] is True
    assert len(data["timeline"]) > 0


@pytest.mark.anyio
async def test_get_monument_hotspots(client):
    response = await client.get("/api/monuments/gateway-of-india/hotspots")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    hotspots = body["data"]
    assert isinstance(hotspots, list)
    assert len(hotspots) >= 3
    # Check hotspot structure
    hotspot = hotspots[0]
    assert "id" in hotspot
    assert "name" in hotspot
    assert "description" in hotspot
    assert "position" in hotspot
    pos = hotspot["position"]
    assert "x" in pos
    assert "y" in pos
    assert "z" in pos


@pytest.mark.anyio
async def test_get_monument_not_found(client):
    response = await client.get("/api/monuments/does-not-exist")
    assert response.status_code == 404
    body = response.json()
    assert body["success"] is False
    assert body["error"]["code"] == "NOT_FOUND"


@pytest.mark.anyio
async def test_filter_monuments_by_state(client):
    response = await client.get("/api/monuments?state_id=mh")
    assert response.status_code == 200
    body = response.json()
    monuments = body["data"]
    assert all(m["state_id"] == "mh" for m in monuments)
