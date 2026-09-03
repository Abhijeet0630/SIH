from typing import List, Union, Any
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator

class Settings(BaseSettings):
    PROJECT_NAME: str = "Bharat AI Service"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    HOST: str = "127.0.0.1"
    PORT: int = 8001
    
    AI_PROVIDER: str = "auto"
    DOMAIN_GUARD_ENABLED: bool = True
    
    GROQ_API_KEY_1: str = ""
    GROQ_API_KEY_2: str = ""
    GROQ_API_KEY_3: str = ""
    GROQ_API_KEY_4: str = ""
    GROQ_API_KEY_5: str = ""
    GROQ_API_KEY_6: str = ""
    
    GROQ_MODEL: str = "qwen/qwen3.8-27b"
    MAIN_BACKEND_URL: str = "http://127.0.0.1:8000"
    
    MAX_MESSAGE_LENGTH: int = 2000
    MAX_CONVERSATIONS: int = 1000
    
    PROVIDER_TIMEOUT_SECONDS: float = 10.0
    PROVIDER_MAX_RETRIES: int = 1
    
    GROQ_KEY_COOLDOWN_SECONDS: float = 30.0
    GROQ_KEY_FAILURE_THRESHOLD: int = 3
    
    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://localhost:8000"
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v: Any) -> List[str]:
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        if isinstance(v, list):
            return v
        return ["http://localhost:5173", "http://127.0.0.1:5173"]

    @field_validator("AI_PROVIDER")
    @classmethod
    def validate_ai_provider(cls, v: str) -> str:
        clean = (v or "").strip().lower()
        if clean not in ["auto", "groq"]:
            raise ValueError(f"Unsupported AI_PROVIDER: {v}. Must be 'auto' or 'groq'")
        return clean

    @field_validator("PORT")
    @classmethod
    def validate_port(cls, v: int) -> int:
        if v < 1 or v > 65535:
            raise ValueError(f"Invalid PORT: {v}. Port must be between 1 and 65535")
        return v

    @field_validator("MAX_MESSAGE_LENGTH")
    @classmethod
    def validate_max_message_length(cls, v: int) -> int:
        if v <= 0:
            raise ValueError(f"Invalid MAX_MESSAGE_LENGTH: {v}. Must be greater than 0")
        return v

    @field_validator("MAX_CONVERSATIONS")
    @classmethod
    def validate_max_conversations(cls, v: int) -> int:
        if v <= 0:
            raise ValueError(f"Invalid MAX_CONVERSATIONS: {v}. Must be greater than 0")
        return v

    @field_validator("PROVIDER_TIMEOUT_SECONDS")
    @classmethod
    def validate_provider_timeout(cls, v: float) -> float:
        if v <= 0:
            raise ValueError(f"Invalid PROVIDER_TIMEOUT_SECONDS: {v}. Must be greater than 0")
        return v

    @field_validator("PROVIDER_MAX_RETRIES")
    @classmethod
    def validate_max_retries(cls, v: int) -> int:
        if v < 0:
            raise ValueError(f"Invalid PROVIDER_MAX_RETRIES: {v}. Must be greater than or equal to 0")
        return v

    @field_validator("GROQ_KEY_COOLDOWN_SECONDS")
    @classmethod
    def validate_cooldown(cls, v: float) -> float:
        if v <= 0:
            raise ValueError(f"Invalid GROQ_KEY_COOLDOWN_SECONDS: {v}. Must be greater than 0")
        return v

    @field_validator("GROQ_KEY_FAILURE_THRESHOLD")
    @classmethod
    def validate_failure_threshold(cls, v: int) -> int:
        if v <= 0:
            raise ValueError(f"Invalid GROQ_KEY_FAILURE_THRESHOLD: {v}. Must be greater than 0")
        return v

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
