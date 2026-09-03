"""
Supabase PostgREST Client.

Provides a reusable, connection-pooled HTTP client for interacting with Supabase's
PostgREST REST API. Handles headers, timeouts, error encapsulation, and lifecycle management.
"""
from typing import Optional, Any
import httpx

from app.core.config import get_settings
from app.core.exceptions import DatabaseException


class SupabaseClient:
    """Client for querying Supabase tables via PostgREST REST API."""

    def __init__(
        self,
        base_url: Optional[str] = None,
        anon_key: Optional[str] = None,
        http_client: Optional[httpx.Client] = None,
        timeout: float = 10.0,
    ):
        settings = get_settings()
        raw_url = base_url if base_url is not None else settings.SUPABASE_URL
        self.base_url = (raw_url or "").rstrip("/")
        self.anon_key = anon_key if anon_key is not None else settings.SUPABASE_ANON_KEY
        self.timeout = timeout
        self._custom_client = http_client is not None
        self._client: httpx.Client = http_client or httpx.Client(timeout=self.timeout)

    @property
    def is_configured(self) -> bool:
        return bool(self.base_url and self.anon_key)

    def _get_headers(self) -> dict[str, str]:
        if not self.is_configured:
            raise DatabaseException("Supabase URL or API key is not configured.")
        return {
            "apikey": self.anon_key,
            "Authorization": f"Bearer {self.anon_key}",
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

    def select(
        self,
        table: str,
        select: str = "*",
        filters: Optional[dict[str, Any]] = None,
        order: Optional[str] = None,
        limit: Optional[int] = None,
    ) -> list[dict]:
        """
        Query a Supabase table using PostgREST syntax.
        Example: select('cultural_items', filters={'state_id': 'eq.maharashtra'})
        """
        if not self.is_configured:
            raise DatabaseException("Supabase is not configured.")

        endpoint = f"{self.base_url}/rest/v1/{table}"
        params: dict[str, Any] = {"select": select}

        if filters:
            for k, v in filters.items():
                params[k] = v

        if order:
            params["order"] = order

        if limit is not None:
            params["limit"] = limit

        try:
            response = self._client.get(
                endpoint,
                headers=self._get_headers(),
                params=params,
            )
            if response.status_code >= 400:
                raise DatabaseException(
                    f"Database query on '{table}' failed with status {response.status_code}."
                )
            data = response.json()
            if isinstance(data, list):
                return data
            return []
        except DatabaseException:
            raise
        except (httpx.HTTPError, Exception) as exc:
            # Encapsulate without leaking auth details
            raise DatabaseException(f"Database connection error: {exc.__class__.__name__}") from exc

    def get_by_field(
        self,
        table: str,
        field: str,
        value: str,
        select: str = "*",
    ) -> Optional[dict]:
        """Query a single record matching field == value."""
        results = self.select(
            table=table,
            select=select,
            filters={field: f"eq.{value}"},
            limit=1,
        )
        return results[0] if results else None

    def insert(
        self,
        table: str,
        payload: list[dict] | dict,
        ignore_duplicates: bool = True,
    ) -> list[dict]:
        """
        Insert record(s) into a Supabase table.
        Uses PostgREST POST /rest/v1/{table}.
        """
        if not self.is_configured:
            raise DatabaseException("Supabase is not configured.")

        endpoint = f"{self.base_url}/rest/v1/{table}"
        headers = self._get_headers()
        prefer = "return=representation"
        if ignore_duplicates:
            prefer = "resolution=ignore-duplicates,return=representation"
        headers["Prefer"] = prefer

        data = payload if isinstance(payload, list) else [payload]

        try:
            response = self._client.post(endpoint, headers=headers, json=data)
            if response.status_code >= 400:
                raise DatabaseException(
                    f"Database insert on '{table}' failed with status {response.status_code}."
                )
            res_data = response.json()
            if isinstance(res_data, list):
                return res_data
            return [res_data] if isinstance(res_data, dict) else []
        except DatabaseException:
            raise
        except (httpx.HTTPError, Exception) as exc:
            raise DatabaseException(f"Database connection error: {exc.__class__.__name__}") from exc

    def delete(
        self,
        table: str,
        filters: dict[str, Any],
    ) -> list[dict]:
        """Delete record(s) matching filters."""
        if not self.is_configured:
            raise DatabaseException("Supabase is not configured.")

        endpoint = f"{self.base_url}/rest/v1/{table}"
        headers = self._get_headers()
        headers["Prefer"] = "return=representation"

        try:
            response = self._client.delete(endpoint, headers=headers, params=filters)
            if response.status_code >= 400:
                raise DatabaseException(
                    f"Database delete on '{table}' failed with status {response.status_code}."
                )
            res_data = response.json()
            return res_data if isinstance(res_data, list) else []
        except DatabaseException:
            raise
        except (httpx.HTTPError, Exception) as exc:
            raise DatabaseException(f"Database connection error: {exc.__class__.__name__}") from exc

    def close(self) -> None:
        """Close the underlying HTTP client session."""
        if not self._custom_client and self._client and not self._client.is_closed:
            self._client.close()


# Module-level singleton instance for shared connection reuse
_default_supabase_client: Optional[SupabaseClient] = None


def get_supabase_client() -> SupabaseClient:
    """Return or initialize the singleton SupabaseClient instance."""
    global _default_supabase_client
    if _default_supabase_client is None:
        _default_supabase_client = SupabaseClient()
    return _default_supabase_client


def set_supabase_client(client: Optional[SupabaseClient]) -> None:
    """Set or override the singleton SupabaseClient instance (used in tests)."""
    global _default_supabase_client
    _default_supabase_client = client
