import pytest
import requests
from unittest.mock import patch, MagicMock
from app.schemas.chat import ChatContext
from app.services.cultural_data_service import BackendCulturalClient
from app.services.context_service import ContextService

def test_successful_backend_context_retrieval_state():
    """Tests successful state details retrieval from Main Backend GET /api/states/{id}."""
    client = BackendCulturalClient(backend_url="http://127.0.0.1:8000")
    
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {
        "id": "mh",
        "name": "Maharashtra",
        "capital": "Mumbai",
        "short_description": "Land of Maratha heritage and coastal culinary traditions."
    }

    with patch("requests.get", return_value=mock_resp):
        res = client.fetch_state_details("mh")
        assert res is not None
        assert res["name"] == "Maharashtra"
        assert res["capital"] == "Mumbai"

def test_successful_backend_context_retrieval_cultural_item():
    """Tests successful cultural item retrieval from Main Backend GET /api/cultural-items/{id}."""
    client = BackendCulturalClient(backend_url="http://127.0.0.1:8000")
    
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {
        "id": "vada-pav",
        "title": "Vada Pav",
        "category": "food",
        "description": "Popular Maharashtrian street food made with spiced potato dumpling in a soft bread roll."
    }

    with patch("requests.get", return_value=mock_resp):
        res = client.fetch_item_details("vada-pav")
        assert res is not None
        assert res["title"] == "Vada Pav"
        assert "spiced potato dumpling" in res["description"]

def test_backend_404_unknown_id():
    """Tests 404 response for unknown IDs returns None without crashing."""
    client = BackendCulturalClient()
    
    mock_resp = MagicMock()
    mock_resp.status_code = 404
    mock_resp.json.return_value = {"detail": "Item not found"}

    with patch("requests.get", return_value=mock_resp):
        res = client.fetch_item_details("nonexistent_item_xyz")
        assert res is None

def test_backend_unavailable_connection_refused():
    """Tests handling when Main Backend is offline (ConnectionRefusedError)."""
    client = BackendCulturalClient()

    with patch("requests.get", side_effect=requests.exceptions.ConnectionError("Failed to connect")):
        res = client.fetch_state_details("mh")
        assert res is None

def test_backend_timeout():
    """Tests handling when Main Backend times out."""
    client = BackendCulturalClient()

    with patch("requests.get", side_effect=requests.exceptions.Timeout("Request timed out")):
        res = client.fetch_monument_details("gateway-of-india")
        assert res is None

def test_backend_malformed_response():
    """Tests non-JSON or malformed backend payload returns None gracefully."""
    client = BackendCulturalClient()
    
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.side_effect = ValueError("Invalid JSON")

    with patch("requests.get", return_value=mock_resp):
        res = client.fetch_festival_details("gudi-padwa")
        assert res is None

def test_context_passed_correctly_to_ai_layer():
    """Verifies format_context_prompt incorporates verified Main Backend metadata when available."""
    context_svc = ContextService()
    ctx = ChatContext(state_id="mh", item_id="vada-pav", view="/item/vada-pav")

    mock_item_data = {
        "id": "vada-pav",
        "title": "Vada Pav",
        "description": "Iconic Maharashtrian street food dish."
    }

    with patch.object(context_svc, "fetch_backend_cultural_context", return_value=mock_item_data):
        prompt = context_svc.format_context_prompt(ctx)
        assert "Active State/Region: Maharashtra" in prompt
        assert "Active Heritage Item: Vada Pav" in prompt
        assert "Verified Backend Details for Vada Pav: Iconic Maharashtrian street food dish." in prompt

def test_missing_entity_ids():
    """Tests empty/None entity parameters return None without attempting HTTP calls."""
    client = BackendCulturalClient()
    with patch("requests.get") as mock_get:
        assert client.fetch_state_details("") is None
        assert client.fetch_item_details(None) is None
        mock_get.assert_not_called()
