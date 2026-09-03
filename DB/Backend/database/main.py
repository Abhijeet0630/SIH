"""
Bharat Cultural Heritage — Database API Service
FastAPI application serving cultural data from Supabase.
Runs on port 8001 alongside the chatbot service (port 8000).
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import (
    states_router,
    categories_router,
    cultural_items_router,
    monuments_router,
    festivals_router,
)

app = FastAPI(
    title="Bharat Cultural Heritage Data API",
    description="REST API serving Indian cultural heritage data from Supabase (states, categories, cultural items, monuments, festivals).",
    version="1.0.0",
)

# Enable CORS for all origins (matches chatbot configuration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers
app.include_router(states_router)
app.include_router(categories_router)
app.include_router(cultural_items_router)
app.include_router(monuments_router)
app.include_router(festivals_router)


@app.get("/")
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Bharat Cultural Heritage Data API",
        "version": "1.0.0",
        "endpoints": [
            "/api/states",
            "/api/categories",
            "/api/cultural-items",
            "/api/monuments",
            "/api/festivals",
        ],
    }


if __name__ == "__main__":
    import uvicorn
    print("Starting Bharat Cultural Heritage Data API on port 8001...")
    uvicorn.run(app, host="127.0.0.1", port=8001)
