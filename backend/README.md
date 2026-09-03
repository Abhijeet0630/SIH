# Heritage Backend — Indian Cultural Heritage Exploration Platform

## Overview

This is the **FastAPI backend** for the Indian Cultural Heritage Exploration Platform — an immersive digital experience that lets users explore India's rich states, monuments, food, festivals, art, and traditions.

The backend exposes a clean REST API that the React frontend consumes. It is designed for extensibility: the current version uses **mock data repositories** so the team can work independently while the database and AI integrations are finalized.

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | FastAPI (Python 3.11+) |
| Server | Uvicorn |
| Validation | Pydantic v2 |
| Config | Pydantic Settings + python-dotenv |
| Testing | Pytest + HTTPX |
| Data Layer | Mock repositories (swappable for real DB) |

---

## Quick Start

### 1. Create a Virtual Environment

```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux / macOS
python -m venv .venv
source .venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
# Copy the example env file
cp .env.example .env
# Edit .env as needed (defaults work for local development)
```

### 4. Run the Server

```bash
uvicorn app.main:app --reload --port 8000
```

Or using the provided runner script:

```bash
python run.py
```

### 5. Access Swagger Docs

Open your browser at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json
- **Health Check**: http://localhost:8000/api/health

---

## Running Tests

```bash
pytest tests/ -v
```

---

## Project Structure

```
backend/
├── app/
│   ├── main.py                  # FastAPI app factory, middleware, router
│   │
│   ├── core/
│   │   ├── config.py            # Pydantic Settings — all env vars
│   │   └── exceptions.py        # Custom exceptions & global handlers
│   │
│   ├── api/
│   │   ├── router.py            # Central API router
│   │   └── routes/
│   │       ├── health.py        # GET /api/health
│   │       ├── states.py        # GET /api/states, /api/states/{id}
│   │       ├── categories.py    # GET /api/categories
│   │       ├── culture.py       # Cultural items & connections
│   │       ├── events.py        # Events / On This Day
│   │       ├── festivals.py     # Festivals
│   │       ├── monuments.py     # Monuments + hotspots
│   │       ├── passport.py      # Cultural Passport
│   │       ├── discovery.py     # Surprise Me / Discover
│   │       └── ai.py            # AI Gateway (mock)
│   │
│   ├── schemas/                 # Pydantic request/response models
│   ├── services/                # Business logic layer
│   ├── repositories/            # Data access layer (mock → DB)
│   ├── data/mock/               # Realistic mock data for Maharashtra + other states
│   └── utils/helpers.py
│
├── tests/                       # Pytest test suite
├── .env.example
├── requirements.txt
├── run.py
└── README.md
```

---

## Available APIs

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/states` | List all states |
| GET | `/api/states/{state_id}` | State details |
| GET | `/api/states/{state_id}/categories` | Categories for a state |
| GET | `/api/categories` | All cultural categories |
| GET | `/api/states/{state_id}/culture` | Cultural items for a state |
| GET | `/api/states/{state_id}/culture?category=food` | Filtered cultural items |
| GET | `/api/culture/{culture_id}` | Cultural item details |
| GET | `/api/culture/{culture_id}/connections` | Star-schema connections |
| GET | `/api/events` | All events |
| GET | `/api/events/today` | Today's cultural events |
| GET | `/api/events/upcoming` | Upcoming events |
| GET | `/api/festivals` | All festivals |
| GET | `/api/festivals?state_id=mh` | Festivals for a state |
| GET | `/api/festivals/{festival_id}` | Festival details |
| GET | `/api/monuments` | All monuments |
| GET | `/api/monuments/{monument_id}` | Monument details |
| GET | `/api/monuments/{monument_id}/hotspots` | Monument interactive hotspots |
| GET | `/api/discover/surprise` | Surprise Me — random cultural item |
| GET | `/api/passport` | Cultural Passport stats |
| POST | `/api/passport/discover` | Record a discovery |
| POST | `/api/ai/chat` | AI cultural guide (mock gateway) |

---

## Standard Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "State 'xyz' not found"
  }
}
```

---

## Mock Data Architecture

All data currently lives in `app/data/mock/`. The **repository layer** reads from these Python dicts/lists. This separation means:

- The **API routes** never touch mock data directly
- The **services** contain all business logic
- The **repositories** are the only layer that knows where data comes from

### To connect the real database (Database teammate):
1. Create a new implementation of the repository interfaces in `app/repositories/`
2. Point the services to use the real repositories (via dependency injection)
3. No changes needed in routes or schemas

### To connect the real AI service (AI teammate):
1. Implement `AIServiceInterface` in `app/services/ai_service.py`
2. Replace `MockAIService` with the real implementation
3. The `/api/ai/chat` endpoint contract stays the same

---

## CORS

The backend allows requests from `http://localhost:5173` (Vite/React dev server) by default.
Edit `FRONTEND_URL` in `.env` to change this.

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_NAME` | `Heritage Backend` | Application name |
| `APP_ENV` | `development` | Environment |
| `DEBUG` | `true` | Enable auto-reload |
| `API_PREFIX` | `/api` | API URL prefix |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed CORS origin |
| `HOST` | `0.0.0.0` | Bind host |
| `PORT` | `8000` | Bind port |
| `DATABASE_URL` | *(empty)* | Set by Database teammate |
| `AI_SERVICE_URL` | *(empty)* | Set by AI teammate |
