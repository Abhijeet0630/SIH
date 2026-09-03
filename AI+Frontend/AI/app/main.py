import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import chat

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("bharat_ai.main")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Dedicated AI Service for India Cultural Heritage Exploration Platform",
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

cors_origins = (
    settings.CORS_ORIGINS if isinstance(settings.CORS_ORIGINS, list)
    else [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix=f"{settings.API_V1_STR}/ai", tags=["chat"])

@app.get("/")
@app.get(f"{settings.API_V1_STR}/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "port": settings.PORT
    }

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting %s on %s:%s (Provider: %s)", settings.PROJECT_NAME, settings.HOST, settings.PORT, settings.AI_PROVIDER)
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
