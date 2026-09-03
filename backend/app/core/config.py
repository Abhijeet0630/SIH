"""
Application configuration using Pydantic Settings.
All environment variables are loaded here.
"""
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Heritage Backend"
    APP_ENV: str = "development"
    DEBUG: bool = True

    # API
    API_PREFIX: str = "/api"

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # CORS
    FRONTEND_URL: str = "http://localhost:5173"

    # Database / Supabase
    DATABASE_URL: str = ""
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    REPOSITORY_BACKEND: str = "supabase"  # "supabase" | "mock"

    # AI Service — to be filled by AI teammate
    AI_SERVICE_URL: str = ""
    AI_SERVICE_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    """Return cached Settings instance."""
    return Settings()
