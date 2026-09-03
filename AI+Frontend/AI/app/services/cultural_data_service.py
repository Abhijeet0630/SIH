import logging
import requests
from typing import Optional, Dict, Any
from app.core.config import settings

logger = logging.getLogger("bharat_ai.cultural_data")

class BackendCulturalClient:
    """Client for fetching authoritative cultural entity metadata from Main Backend (Port 8000)."""

    def __init__(self, backend_url: Optional[str] = None):
        self.backend_url = (backend_url or settings.MAIN_BACKEND_URL).rstrip("/")
        self.timeout = 3.0

    def fetch_state_details(self, state_id: str) -> Optional[Dict[str, Any]]:
        """Fetches state information from Main Backend GET /api/states/{state_id}."""
        if not state_id:
            return None
        endpoint = f"{self.backend_url}/api/states/{state_id}"
        return self._safe_get(endpoint)

    def fetch_item_details(self, item_id: str) -> Optional[Dict[str, Any]]:
        """Fetches cultural item details from Main Backend GET /api/culture/{item_id}."""
        if not item_id:
            return None
        endpoint = f"{self.backend_url}/api/culture/{item_id}"
        return self._safe_get(endpoint)

    def fetch_monument_details(self, monument_id: str) -> Optional[Dict[str, Any]]:
        """Fetches monument details from Main Backend GET /api/monuments/{monument_id}."""
        if not monument_id:
            return None
        endpoint = f"{self.backend_url}/api/monuments/{monument_id}"
        return self._safe_get(endpoint)

    def fetch_festival_details(self, festival_id: str) -> Optional[Dict[str, Any]]:
        """Fetches festival details from Main Backend GET /api/festivals/{festival_id}."""
        if not festival_id:
            return None
        endpoint = f"{self.backend_url}/api/festivals/{festival_id}"
        return self._safe_get(endpoint)

    def _safe_get(self, endpoint: str) -> Optional[Dict[str, Any]]:
        """Executes GET request catching timeouts, 404s, connection errors, and malformed JSON safely."""
        try:
            resp = requests.get(endpoint, timeout=self.timeout)
            if resp.status_code == 200:
                data = resp.json()
                if isinstance(data, dict):
                    # Unwrap standard backend envelope: {"success": True, "data": {...}}
                    if "data" in data and ("success" in data or "error" in data):
                        inner = data.get("data")
                        if isinstance(inner, dict):
                            return inner
                    return data
            else:
                logger.debug("Main Backend returned HTTP %s for endpoint %s", resp.status_code, endpoint)
            return None
        except requests.exceptions.Timeout:
            logger.warning("Main Backend request timed out after %s seconds on %s", self.timeout, endpoint)
            return None
        except requests.exceptions.ConnectionError:
            logger.warning("Main Backend unavailable (Connection refused on %s)", endpoint)
            return None
        except (requests.exceptions.RequestException, ValueError, Exception) as exc:
            logger.warning("Main Backend request failed on %s: %s", endpoint, type(exc).__name__)
            return None

backend_cultural_client = BackendCulturalClient()
