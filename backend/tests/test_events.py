"""Tests for /api/events"""
import pytest


@pytest.mark.anyio
async def test_list_all_events(client):
    response = await client.get("/api/events")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    events = body["data"]
    assert isinstance(events, list)
    assert len(events) > 0
    first = events[0]
    assert "id" in first
    assert "title" in first
    assert "date" in first


@pytest.mark.anyio
async def test_events_today(client):
    response = await client.get("/api/events/today")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    # Today's events may be empty depending on the date — just verify structure
    assert isinstance(body["data"], list)


@pytest.mark.anyio
async def test_events_upcoming(client):
    response = await client.get("/api/events/upcoming")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert isinstance(body["data"], list)
