"""
Unit tests for Supabase Repository Adapters, PostgREST Client, and State ID Mapping.
Uses dependency injection and mocked HTTP client to remain 100% deterministic and offline.
"""
import pytest
import httpx
from unittest.mock import MagicMock

from app.core.exceptions import DatabaseException
from app.core.supabase_client import SupabaseClient
from app.utils.state_mapping import (
    to_db_state_id,
    to_backend_state_id,
    is_valid_backend_state_id,
)
from app.repositories.state_repository import StateRepository
from app.repositories.category_repository import CategoryRepository
from app.repositories.culture_repository import CultureRepository
from app.repositories.monument_repository import MonumentRepository
from app.repositories.festival_repository import FestivalRepository


# ── 1. State Mapping Tests ───────────────────────────────────────────────────

def test_state_mapping_bidirectional():
    assert to_db_state_id("mh") == "maharashtra"
    assert to_db_state_id("rj") == "rajasthan"
    assert to_db_state_id("gj") == "gujarat"
    assert to_db_state_id("kl") == "kerala"
    assert to_db_state_id("as") == "assam"
    assert to_db_state_id("tn") == "tamil-nadu"

    assert to_backend_state_id("maharashtra") == "mh"
    assert to_backend_state_id("rajasthan") == "rj"
    assert to_backend_state_id("gujarat") == "gj"
    assert to_backend_state_id("kerala") == "kl"
    assert to_backend_state_id("assam") == "as"
    assert to_backend_state_id("tamil-nadu") == "tn"

    assert to_backend_state_id(None, code="IN-MH") == "mh"
    assert to_backend_state_id(None, code="MH") == "mh"
    assert to_backend_state_id(None, code="IN-RJ") == "rj"


def test_state_mapping_validity():
    assert is_valid_backend_state_id("mh") is True
    assert is_valid_backend_state_id("rj") is True
    assert is_valid_backend_state_id("invalid-state") is False
    assert is_valid_backend_state_id("") is False


# ── 2. Supabase Client Unit Tests ────────────────────────────────────────────

def test_supabase_client_unconfigured():
    client = SupabaseClient(base_url="", anon_key="")
    assert client.is_configured is False
    with pytest.raises(DatabaseException) as exc_info:
        client.select("states")
    assert "not configured" in str(exc_info.value.message)


def test_supabase_client_select_success():
    def mock_handler(request: httpx.Request):
        assert request.headers["apikey"] == "test-anon-key"
        assert "Bearer test-anon-key" in request.headers["Authorization"]
        assert request.url.path == "/rest/v1/states"
        return httpx.Response(200, json=[{"id": "maharashtra", "name": "Maharashtra"}])

    transport = httpx.MockTransport(mock_handler)
    http_client = httpx.Client(transport=transport)
    client = SupabaseClient(
        base_url="https://example.supabase.co",
        anon_key="test-anon-key",
        http_client=http_client,
    )

    results = client.select("states")
    assert len(results) == 1
    assert results[0]["id"] == "maharashtra"


def test_supabase_client_http_error_handling():
    def mock_handler(request: httpx.Request):
        return httpx.Response(500, json={"error": "Internal Server Error"})

    transport = httpx.MockTransport(mock_handler)
    http_client = httpx.Client(transport=transport)
    client = SupabaseClient(
        base_url="https://example.supabase.co",
        anon_key="test-anon-key",
        http_client=http_client,
    )

    with pytest.raises(DatabaseException) as exc:
        client.select("states")
    assert "status 500" in str(exc.value.message)


# ── 3. State Repository Adapter Tests ────────────────────────────────────────

def test_state_repository_adapter():
    mock_sb = MagicMock(spec=SupabaseClient)
    mock_sb.select.return_value = [
        {
            "id": "maharashtra",
            "code": "IN-MH",
            "name": "Maharashtra",
            "capital": "Mumbai",
            "region": "West",
            "short_description": "Land of Sahyadri forts",
            "historical_overview": "Ancient history",
            "languages": ["Marathi", "Hindi"],
            "banner_image_url": "https://example.com/banner.jpg",
            "primary_color": "#FF6B00",
            "accent_color": "#FFCC00",
            "highlighted_item_slug": "raigad-fort",
        }
    ]

    repo = StateRepository(client=mock_sb)
    # Monkey-patch is_mock to test database code path
    type(repo).is_mock = property(lambda self: False)

    states = repo.get_all()
    assert len(states) == 1
    st = states[0]
    assert st["id"] == "mh"
    assert st["code"] == "MH"
    assert st["name"] == "Maharashtra"
    assert st["capital"] == "Mumbai"
    assert st["theme"]["primary_color"] == "#FF6B00"
    assert st["thumbnail_url"] == "https://example.com/banner.jpg"


# ── 4. Category Repository Adapter Tests ─────────────────────────────────────

def test_category_repository_adapter():
    mock_sb = MagicMock(spec=SupabaseClient)
    mock_sb.select.return_value = [
        {
            "id": "food",
            "default_label": "Food & Cuisine",
            "description": "Culinary heritage",
            "icon_name": "Utensils",
        }
    ]

    repo = CategoryRepository(client=mock_sb)
    type(repo).is_mock = property(lambda self: False)

    categories = repo.get_all()
    assert len(categories) == 1
    cat = categories[0]
    assert cat["id"] == "food"
    assert cat["name"] == "Food & Cuisine"
    assert cat["icon"] == "Utensils"


# ── 5. Culture Repository Adapter Tests ──────────────────────────────────────

def test_culture_repository_adapter():
    mock_sb = MagicMock(spec=SupabaseClient)
    mock_sb.get_by_field.return_value = {
        "id": "vada-pav",
        "slug": "vada-pav",
        "title": "Mumbai Vada Pav",
        "state_id": "maharashtra",
        "category": "food",
        "short_description": "Spiced potato fritter in a bun.",
        "description": "Iconic street food.",
        "location_name": "Mumbai",
        "history": "Created in 1966.",
        "cultural_significance": "Democratic food.",
        "recipe_info": {
            "recipeUrl": "https://example.com/vada-pav",
            "ingredientsSummary": ["Potatoes", "Besan", "Pav"],
            "prepTime": "25 mins",
            "difficulty": "Easy",
        },
        "primary_image": "https://example.com/vada.jpg",
        "images": [{"url": "https://example.com/gallery1.jpg"}],
        "tags": ["street-food", "vegetarian"],
        "related_item_slugs": ["misal-pav"],
    }
    mock_sb.select.return_value = [
        {
            "id": "node-1",
            "type": "city",
            "label": "Mumbai",
            "short_description": "Associated city",
        }
    ]

    repo = CultureRepository(client=mock_sb)
    type(repo).is_mock = property(lambda self: False)

    item = repo.get_by_id("vada-pav")
    assert item is not None
    assert item["id"] == "vada-pav"
    assert item["name"] == "Mumbai Vada Pav"
    assert item["state_id"] == "mh"
    assert item["type"] == "food"
    assert item["recipe"]["recipe_url"] == "https://example.com/vada-pav"
    assert item["recipe"]["ingredients"] == ["Potatoes", "Besan", "Pav"]
    assert item["recipe"]["preparation_time"] == "25 mins"
    assert item["image_url"] == "https://example.com/vada.jpg"
    assert item["gallery_urls"] == ["https://example.com/gallery1.jpg"]

    connections = repo.get_connections("vada-pav")
    assert len(connections) == 1
    assert connections[0]["name"] == "Mumbai"


# ── 6. Monument Repository Adapter Tests ─────────────────────────────────────

def test_monument_repository_adapter():
    mock_sb = MagicMock(spec=SupabaseClient)
    mock_sb.get_by_field.return_value = {
        "id": "gateway-of-india",
        "slug": "gateway-of-india",
        "name": "Gateway of India",
        "state_id": "maharashtra",
        "location_name": "Apollo Bunder, Mumbai",
        "latitude": 18.9220,
        "longitude": 72.8347,
        "short_description": "Iconic waterfront arch",
        "description": "Indo-Saracenic triumphal arch",
        "detailed_history": "Built in 1924",
        "architectural_style": "Indo-Saracenic",
        "year_built": "1924",
        "model_available": True,
        "model_url": "https://example.com/model.glb",
        "image": "https://example.com/gateway.jpg",
        "banner_image": "https://example.com/banner.jpg",
    }
    mock_sb.select.return_value = [
        {
            "id": "central-arch",
            "title": "Central Arch",
            "detailed_text": "26-meter grand archway",
            "position_x": 0.0,
            "position_y": 2.5,
            "position_z": 1.2,
            "architectural_note": "Yellow basalt masonry",
        }
    ]

    repo = MonumentRepository(client=mock_sb)
    type(repo).is_mock = property(lambda self: False)

    monument = repo.get_by_id("gateway-of-india")
    assert monument is not None
    assert monument["id"] == "gateway-of-india"
    assert monument["state_id"] == "mh"
    assert monument["coordinates"] == {"lat": 18.922, "lng": 72.8347}
    assert monument["has_3d_model"] is True
    assert monument["model_url"] == "https://example.com/model.glb"
    assert len(monument["hotspots"]) == 1

    hs = monument["hotspots"][0]
    assert hs["id"] == "central-arch"
    assert hs["name"] == "Central Arch"
    assert hs["position"] == {"x": 0.0, "y": 2.5, "z": 1.2}
    assert hs["annotation"] == "Yellow basalt masonry"


# ── 7. Festival Repository Adapter Tests ─────────────────────────────────────

def test_festival_repository_adapter():
    mock_sb = MagicMock(spec=SupabaseClient)
    mock_sb.get_by_field.return_value = {
        "id": "gudi-padwa",
        "name": "Gudi Padwa",
        "state_id": "maharashtra",
        "date_or_season": "March/April",
        "short_description": "Marathi New Year",
        "cultural_significance": "Auspicious new beginnings",
        "traditional_practices": ["Hoisting the Gudi", "Puran Poli feast"],
        "image": "https://example.com/gudi.jpg",
    }

    repo = FestivalRepository(client=mock_sb)
    type(repo).is_mock = property(lambda self: False)

    fest = repo.get_by_id("gudi-padwa")
    assert fest is not None
    assert fest["id"] == "gudi-padwa"
    assert fest["name"] == "Gudi Padwa"
    assert fest["state_id"] == "mh"
    assert fest["image_url"] == "https://example.com/gudi.jpg"


# ── 8. Passport Repository Adapter Tests ─────────────────────────────────────

def test_passport_repository_adapter():
    from app.repositories.passport_repository import PassportRepository

    mock_sb = MagicMock(spec=SupabaseClient)
    mock_sb.select.return_value = [
        {
            "id": "disc-1",
            "session_id": "test-session",
            "item_type": "food",
            "item_id": "vada-pav",
            "item_name": "Mumbai Vada Pav",
            "state_id": "maharashtra",
            "discovered_at": "2026-09-02T12:00:00Z",
        }
    ]
    mock_sb.insert.return_value = [
        {
            "id": "disc-2",
            "session_id": "test-session",
            "item_type": "monument",
            "item_id": "gateway-of-india",
            "item_name": "Gateway of India",
            "state_id": "mh",
            "discovered_at": "2026-09-02T12:05:00Z",
        }
    ]

    repo = PassportRepository(client=mock_sb)
    type(repo).is_mock = property(lambda self: False)

    # Test get_discoveries
    discoveries = repo.get_discoveries("test-session")
    assert len(discoveries) == 1
    assert discoveries[0]["item_id"] == "vada-pav"
    assert discoveries[0]["state_id"] == "mh"

    # Test add_discovery
    new_disc = repo.add_discovery(
        item_type="monument",
        item_id="gateway-of-india",
        item_name="Gateway of India",
        state_id="mh",
        session_id="test-session",
    )
    assert new_disc["item_id"] == "gateway-of-india"
    assert new_disc["state_id"] == "mh"

