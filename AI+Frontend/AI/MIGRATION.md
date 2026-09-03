# AI Microservice Architecture — Migration Log

This document records the complete step-by-step decoupling, migration, production hardening, deployment packaging, response quality debugging, intent differentiation, real provider verification, multi-provider failover, multi-key Groq API rotation load balancing, context-aware topic switching, real Groq 404 model resolution, concise question-focused response optimization, fallback engine refactoring, and pre-Groq server-side domain restriction of the AI service from the React Frontend into a dedicated standalone microservice running on **Port 8001**.

---

## Migration Chronology & Summary of Phases

### Phase 0 — Initial Architecture Audit
- Inspected codebase (`AIGuide.tsx`, `aiService.ts`, `api.ts`, `vite.config.ts`) and prototype `Backend/chatbot/main.py`.
- Defined multi-phase migration plan.

### Phase 1–20 — Standalone Microservice, Packaging, Hardening & Rendering
- Created FastAPI app under `AI/` on Port 8001.
- Implemented `POST /api/ai/chat` contract, system prompt, context engine, `InMemoryConversationStorage` with thread-safe LRU eviction, and `BackendCulturalClient`.
- Decoupled Frontend; removed client credentials.
- Permanently deleted obsolete prototype `Backend/chatbot/`.
- Packaged with Docker (`Dockerfile`, `.dockerignore`, `docker-compose.yml`).
- Fixed markdown rendering, isolated SVG icons (`ArrowRight`), and separated suggestion chips.

### Phase 21 — AI Response Differentiation & Intent Routing
- Re-ordered and expanded fallback intent classifier to evaluate specific keywords and multi-turn pronoun follow-ups (*"Where is it?"*, *"How many gates does it have?"*).

### Phase 22 — Real Gemini Provider Verification & Production AI Validation
- Verified multi-turn history and credential-safe logging.

### Phase 23 — Multi-Provider AI Failover & Provider Health Management
- Implemented initial `ProviderManager` orchestrator with circuit breaker health tracking.

### Phase 24 — OpenRouter Primary + Groq + Gemini Multi-Provider Restructuring
- Restructured provider chain to OpenRouter $\rightarrow$ Groq $\rightarrow$ Gemini $\rightarrow$ Local Fallback.

### Phase 25 — Multi-Key Groq API Rotation & Per-Question Load Balancing
- Single-provider focus on multi-key Groq API rotation across 6 key slots (`GROQ_API_KEY_1`..`6`).

### Phase 26 — Context-Aware Topic Switching & Intent Resolution Fix
- Implemented strict priority resolution: `Current User Query Explicit Topic` $\rightarrow$ `History Resolution (User Prompts First)` $\rightarrow$ `Active Exploration Context`.
- 112 automated Pytest test cases passing.

### Phase 27 — Fix Groq HTTP 404 & Restore Real AI Responses
- Updated default `GROQ_MODEL` to currently active supported model `qwen/qwen3.8-27b`.
- Protected key slot failure counters from HTTP 404 configuration-level model errors.
- 132 automated Pytest test cases passing.

### Phase 28 — Concise, Question-Focused AI Responses
- Enforced direct answers in the first 1–2 sentences.
- Set default target response length to 50–120 words for simple factual, origin, and location queries.
- 144 automated Pytest test cases passing.

### Phase 29 — Rename Gemini Fallback to LocalFallbackEngine
- Moved local fallback/intent-routing functionality from legacy `gemini_provider.py` into a dedicated `LocalFallbackEngine` class in `app/services/fallback_engine.py`.
- Permanently deleted legacy `AI/app/services/providers/gemini_provider.py`.
- 149 automated Pytest test cases passing.

### Phase 30 — Bharat AI Domain Restriction & Out-of-Scope Query Guard
- **Pre-Groq DomainGuard Service**:
  - Implemented `DomainGuard` (`app/services/domain_guard.py`) executing lightweight server-side classification **before calling Groq API**.
  - Out-of-scope queries (politics, current news, sports, current military conflicts, programming, macro-economics, prompt injection attempts) are refused locally with zero Groq API calls and zero Groq key rotation.
- **Scope Differentiation**:
  - **In-Scope**: Indian monuments, forts, temples, UNESCO sites, traditional crafts/textiles (Paithani, Muga silk), regional cuisine (Vada Pav, Idli), festivals, cultural geography (Living Root Bridges), and heritage history (Shivaji Maharaj, Maratha fort warfare).
  - **Out-of-Scope Refusal**: Short, polite refusal explaining Bharat AI's scope, returning standard `ChatResponseEnvelope` with cultural suggestions.
- **Secondary Prompt & Fallback Protection**:
  - Updated `CULTURAL_GUIDE_SYSTEM_PROMPT` (`app/prompts/cultural_guide.py`) and `LocalFallbackEngine` (`app/services/fallback_engine.py`) with defensive domain checks.
- **Automated Test Suite**:
  - Created `tests/test_phase30_domain_guard.py` covering all 25 required test scenarios.
  - 174 automated Pytest test cases passing.

---

## Final Verification Summary

| Check | Tool / Command | Result |
| :--- | :--- | :--- |
| **Pytest Test Suite** | `python -m pytest tests/` | **174 PASSED** |
| **TypeScript Compilation** | `npx tsc --noEmit` | **0 ERRORS** |
| **Frontend Production Build** | `npm run build` | **SUCCESS (built in 9.9s)** |
| **Secret Scan** | Credential Pattern Matcher | **PASSED (0 secrets exposed)** |
| **Active Pipeline** | Codebase Audit | **chat_endpoint -> DomainGuard (Pre-Groq Filter) -> ProviderManager -> GroqKeyManager -> GroqProvider -> Groq API (Fallback: LocalFallbackEngine)** |
| **Out-of-Scope Efficiency** | Integration Test | **0 Groq API requests, 0 Groq key cursor rotation on refusal** |
| **Active Groq Model** | Groq API Audit | **`qwen/qwen3.8-27b` (HTTP 200 VERIFIED)** |
| **Real Provider Runtime Status** | Live Groq HTTP Call | **REAL GROQ VERIFIED — `[PROVIDER_SUCCESS] Groq key slot 1`** |

---

## Final Architecture Topology

```text
React Frontend (Port 5173)
       │
       │ HTTP POST /api/ai/chat (Vite proxy -> Port 8001)
       ▼
AI Service (Port 8001)
       │
       ▼
DomainGuard (Pre-Groq Scope Filter)
       │
       ├──────── OUT_OF_SCOPE ──► Local Refusal Response (0 Groq calls, 0 key rotation)
       │
       └── IN_SCOPE
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
                 ├──────► Groq API (qwen/qwen3.8-27b @ https://api.groq.com/openai/v1/chat/completions)
                 │
                 └──────► LocalFallbackEngine (If all keys fail or unconfigured)
```
