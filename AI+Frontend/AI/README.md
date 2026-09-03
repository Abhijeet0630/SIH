# Bharat AI Microservice — Cultural Heritage Guide

Dedicated, independent AI Microservice for the **Student Innovation · India Cultural Heritage Experience Platform**.

---

## 1. Overview

The **Bharat AI Service** is a lightweight, high-performance FastAPI microservice running on **Port 8001**. It powers the interactive cultural chatbot (`AIGuide.tsx`) with expert, domain-grounded knowledge covering Indian monuments, 3D fort models, traditional textiles, regional gastronomy, festivals, and spatial state maps.

---

## 2. Architecture & Multi-Key Groq Rotation Topology

```text
React Frontend (Port 5173)
       │
       │ HTTP POST /api/ai/chat (Vite proxy -> Port 8001)
       ▼
AI Microservice (Port 8001)
       │
       ▼
ProviderManager
       │
       ▼
GroqKeyManager (Server-side Round-Robin & Circuit Breaker)
 ├── Groq Key Slot 1 (GROQ_API_KEY_1)
 ├── Groq Key Slot 2 (GROQ_API_KEY_2)
 ├── Groq Key Slot 3 (GROQ_API_KEY_3)
 ├── Groq Key Slot 4 (GROQ_API_KEY_4)
 ├── Groq Key Slot 5 (GROQ_API_KEY_5)
 └── Groq Key Slot 6 (GROQ_API_KEY_6)
       │
       ├──────► Groq API (https://api.groq.com/openai/v1/chat/completions)
       │
       └──────► Local Intent-Routed Fallback Engine (If all keys fail or unconfigured)
       │
       │ HTTP GET /api/states, /api/cultural-items (On-demand metadata)
       ▼
Main Application Backend (Port 8000)
       │
       ▼
Relational Database Store
```

---

## 3. Directory Structure

```text
AI/
├── app/
│   ├── main.py                  # FastAPI entry point & routes registration
│   ├── api/
│   │   └── routes/
│   │       └── chat.py          # POST /api/ai/chat endpoint handler
│   ├── core/
│   │   └── config.py            # Pydantic V2 settings & environment variables
│   ├── prompts/
│   │   └── cultural_guide.py    # Cultural Guide system prompt & refusal guardrails
│   ├── schemas/
│   │   ├── chat.py              # ChatRequest, ChatResponseEnvelope, ChatContext
│   │   └── avatar.py            # AvatarState Enum & validation definitions
│   └── services/
│       ├── ai_service.py        # Service factory & ProviderManager export
│       ├── avatar_service.py    # Avatar state determination & validation
│       ├── context_service.py   # Context normalization & prompt enrichment
│       ├── conversation_service.py # Thread-safe in-memory session manager
│       ├── cultural_data_service.py # Non-blocking client for Main Backend (8000)
│       ├── fallback_engine.py   # Local intent-routed fallback engine
│       ├── groq_key_manager.py  # Thread-safe multi-key Groq round-robin load balancer
│       ├── provider_manager.py  # Multi-key Groq orchestrator & fallback router
│       ├── suggestion_service.py # Context-aware suggestion engine
│       └── providers/
│           ├── base.py          # AIServiceInterface abstract base class
│           └── groq_provider.py # Groq REST provider with dynamic API key injection
├── tests/                       # Automated Pytest suite (97 test cases)
├── .env.example                 # Multi-key Groq environment configuration template
├── .gitignore                   # Git ignore patterns
├── MIGRATION.md                 # Complete architectural migration log (Phases 0–25)
├── README.md                    # Service documentation
├── requirements.txt             # Python dependencies
└── start.bat                    # Windows startup script
```

---

## 4. API Endpoints

### 1. Health Inspection Endpoint
- **URL**: `GET /api/health`
- **Description**: Hardened health check endpoint. Omits credential configuration and internal provider details.
- **Response**:
  ```json
  {
    "status": "healthy",
    "service": "Bharat AI Service",
    "version": "1.0.0",
    "port": 8001
  }
  ```

---

### 2. Chat Endpoint
- **URL**: `POST /api/ai/chat`
- **Description**: Processes user queries with server-side multi-key Groq round-robin rotation, context grounding, conversation memory, avatar states, and suggestions.
- **Request Body**:
  ```json
  {
    "message": "Tell me about Vada Pav",
    "conversation_id": "optional-session-id",
    "context": {
      "state_id": "mh",
      "category": "food",
      "item_id": "vada-pav",
      "view": "/item/vada-pav"
    }
  }
  ```
- **Response Body**:
  ```json
  {
    "success": true,
    "data": {
      "message": "### Vada Pav: The Iconic Street Food of Maharashtra\n\n**Vada Pav** is one of the most beloved street food items originating from Maharashtra...",
      "conversation_id": "conv_74246ba2666a",
      "avatar_state": "speaking",
      "suggestions": [
        "How is authentic Vada Pav prepared?",
        "Where did Vada Pav originate in Mumbai?",
        "What chutneys are served with Vada Pav?"
      ]
    },
    "error": null
  }
  ```

---

## 5. Multi-Key Groq Configuration

Environment settings are loaded via `app/core/config.py` from `.env`:

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `8001` | Microservice HTTP port |
| `HOST` | `127.0.0.1` | Bind host address |
| `GROQ_API_KEY_1` | `""` | Groq API Key Slot 1 (Server-Side Only) |
| `GROQ_API_KEY_2` | `""` | Groq API Key Slot 2 (Server-Side Only) |
| `GROQ_API_KEY_3` | `""` | Groq API Key Slot 3 (Server-Side Only) |
| `GROQ_API_KEY_4` | `""` | Groq API Key Slot 4 (Server-Side Only) |
| `GROQ_API_KEY_5` | `""` | Groq API Key Slot 5 (Server-Side Only) |
| `GROQ_API_KEY_6` | `""` | Groq API Key Slot 6 (Server-Side Only) |
| `GROQ_MODEL` | `qwen/qwen3.8-27b` | Groq model identifier |
| `PROVIDER_TIMEOUT_SECONDS` | `10.0` | Individual provider request timeout |
| `PROVIDER_MAX_RETRIES` | `1` | Max retry attempts per key before failover |
| `GROQ_KEY_FAILURE_THRESHOLD` | `3` | Consecutive failure threshold to trip circuit breaker for a key |
| `GROQ_KEY_COOLDOWN_SECONDS` | `30.0` | Cooldown period when a key circuit breaker is open |
| `MAIN_BACKEND_URL` | `http://127.0.0.1:8000` | Main Application Backend URL for metadata grounding |

> **Security Note**: Never commit actual API keys to source control. Set credentials only in local `.env` files or server environment settings.

---

## 6. Running the Service

### Windows
Run `start.bat` or execute:
```bash
python -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
```

---

## 7. Testing

Run the automated test suite (97 test cases covering multi-key rotation, failover, circuit breaker, intent routing, multi-turn context, secret protection, and frontend contracts):
```bash
python -m pytest tests/
```

---

## 8. Multi-Key Groq Rotation Architecture

### Groq Key Manager (`GroqKeyManager`)
The `GroqKeyManager` manages server-side load balancing across configured Groq API keys (slots 1 through 6):
1. **Deterministic Round-Robin**: For every new `/api/ai/chat` request, the next available healthy key slot is selected in round-robin sequence (Slot 1 $\rightarrow$ Slot 2 $\rightarrow$ Slot 3 $\rightarrow$ Slot 4 $\rightarrow$ Slot 5 $\rightarrow$ Slot 6 $\rightarrow$ Slot 1). Cursor advances after every completed chat request selection.
2. **Partial & Zero-Key Resilience**: Operates seamlessly with 1 to 6 configured keys. If zero keys are configured or all keys fail, the local intent-routed fallback engine is automatically invoked.
3. **Independent Circuit Breaker**: Each key slot maintains an independent failure counter and cooldown timestamp. After `GROQ_KEY_FAILURE_THRESHOLD=3` consecutive failures (or HTTP 429 rate limits), that specific key slot enters cooldown for `GROQ_KEY_COOLDOWN_SECONDS=30` seconds while other healthy keys continue serving traffic.
4. **Secret Protection**: Logs reference ONLY key slot numbers (`Groq key slot X`). Full API key values, Authorization headers, and Bearer tokens are NEVER logged or exposed to the frontend.

---

## 9. Security Posture

- **Server-Side API Keys**: Groq API keys remain exclusively on the server side in `AI/.env`.
- **Zero Secrets Exposed**: Server logs sanitize request parameters, hiding Bearer tokens and API key strings.
- **Hardened Health Endpoint**: `GET /api/health` does not expose key status or internal credentials.
- **Contract Abstraction**: Provider-specific SDK details are hidden behind standard Pydantic response models.

---

## 10. Troubleshooting

- **AI Service Unavailable**: Ensure uvicorn is running on `http://127.0.0.1:8001`.
- **Main Backend Offline**: The AI Service will log a warning and use local context formatting. The AI Service remains 100% operational.
- **Missing Groq API Keys**: Check that `GROQ_API_KEY_1` through `GROQ_API_KEY_6` are set in `AI/.env`. If all keys are omitted or unconfigured, the service gracefully uses the local fallback engine.
- **Invalid Request (400 / 422)**: Ensure message is non-empty and request payload matches `ChatRequest` Pydantic schema.
