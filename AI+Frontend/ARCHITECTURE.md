# System Architecture — India Cultural Heritage Experience

## 1. High-Level Architecture Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                       Client Layer                          │
│  React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion│
└──────────────────────────────┬──────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
   ┌──────────────────────────┐   ┌──────────────────────────┐
   │    Presentation Layer    │   │      State & Context     │
   │  - Navbar & Footer       │   │  - AccessibilityContext  │
   │  - A11y Drawer Panel     │   │  - LanguageContext (i18n)│
   │  - Category Slicer       │   │  - CulturalContext       │
   │  - Star Schema Graph     │   └──────────────────────────┘
   │  - 3D Monument Viewer    │
   └────────────┬─────────────┘
                │
                ▼
   ┌──────────────────────────┐
   │    Service & Data Layer  │
   │  - aiService.ts          │
   │  - Local Data Models     │
   │  - Geo Coordinate Mapper │
   └────────────┬─────────────┘
                │ (Future Integration)
                ▼
   ┌───────────────────────────────────────────────────────────┐
   │                  Future Backend Layer                     │
   │  API Gateway (FastAPI / Express)                          │
   │   ├── Authentication & Role Management                   │
   │   ├── AI LLM Provider with Heritage Grounding Layer       │
   │   └── PostgreSQL / Supabase Relational Database           │
   └───────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture (Current Implementation)

### Design System & Token Distribution
- **Background Tokens**: Warm parchment `#FAF8F5`, soft canvas `#F5EFEB`, deep neutral `#1A1410`.
- **Category Color Identities**:
  - `Food`: Terracotta (`#C25E3E`)
  - `Fashion`: Maroon (`#881337`)
  - `Forts`: Stone brown (`#57534E`)
  - `Temples`: Muted saffron (`#D97706`)
  - `Dance`: Peacock teal (`#0D9488`)
  - `Music`: Deep indigo (`#3730A3`)
  - `Crafts`: Natural ochre (`#CA8A04`)
- **Contextual Textures**: 3%–15% opacity CSS overlay patterns (`texture-parchment`, `texture-sandstone`, `texture-textile`, `texture-paper`) applied contextually per page without interfering with readability.

### Accessibility Architecture (WCAG 2.1 Compliant)
- **DOM Engine**: `AccessibilityContext` applies class modifiers directly onto `document.body` without breaking layout geometry (`.large-text`, `.small-text`, `.high-contrast`, `.grayscale-mode`, `.invert-colors`, `.enhanced-cursor`, `.reduced-motion`).
- **Persistence**: Synced with browser `localStorage` and system `prefers-reduced-motion` media queries.

### Multilingual Engine (i18n)
- **Zero-Duplication Design**: Single-page architecture rendered via `useTranslation` hook consuming structured JSON dictionaries (`en.json`, `hi.json`, `mr.json`).
- **Fallback Protocol**: Gracefully falls back to English keys if regional terminology is unmapped.

---

## 3. Backend & AI Microservice Architecture

```text
React Frontend (Port 5173)
      │
      │ HTTP POST /api/ai/chat (Vite proxy -> Port 8001)
      ▼
AI Microservice (Port 8001) ──► LLM Provider (Google Gemini / OpenAI)
      │
      │ HTTP GET /api/states, /api/cultural-items (Grounding metadata)
      ▼
Main Application Backend (Port 8000)
      ├── /api/states/{id}
      ├── /api/cultural-items/{id}
      ├── /api/monuments/{id}
      └── /api/festivals/{id}
            │
            ▼
Relational Cultural Database Store
```

---

## 4. Future Database Schema (PostgreSQL / Supabase)

### Relational Entity-Relationship Diagram (ERD)

```text
[States] 1 ──── ∞ [CulturalItems]
   │                      │
   │ 1                    │ ∞
   │                      │
   ∞                      ∞
[Monuments] 1 ──── ∞ [Hotspots]
```

### Table Definitions

#### `states`
- `id` (VARCHAR PK)
- `code` (VARCHAR(10) UNIQUE)
- `name` (VARCHAR(100))
- `capital` (VARCHAR(100))
- `region` (VARCHAR(50))
- `is_fully_developed` (BOOLEAN DEFAULT FALSE)
- `short_description` (TEXT)
- `historical_overview` (TEXT)
- `languages` (TEXT[])
- `banner_image_url` (TEXT)
- `latitude` (NUMERIC(9,6))
- `longitude` (NUMERIC(9,6))

#### `cultural_items`
- `id` (VARCHAR PK)
- `slug` (VARCHAR(100) UNIQUE)
- `title` (VARCHAR(200))
- `marathi_title` (VARCHAR(200))
- `hindi_title` (VARCHAR(200))
- `state_id` (VARCHAR FK -> states.id)
- `category` (VARCHAR(50))
- `short_description` (TEXT)
- `description` (TEXT)
- `history` (TEXT)
- `cultural_significance` (TEXT)
- `location_name` (VARCHAR(150))
- `district` (VARCHAR(100))
- `latitude` (NUMERIC(9,6))
- `longitude` (NUMERIC(9,6))
- `primary_image_url` (TEXT)
- `recipe_data` (JSONB)
- `last_verified_at` (TIMESTAMP)

#### `star_schema_nodes`
- `id` (VARCHAR PK)
- `cultural_item_id` (VARCHAR FK -> cultural_items.id)
- `node_type` (VARCHAR(50)) -- history, materials, region, tradition, festival, modern
- `label` (VARCHAR(150))
- `short_description` (TEXT)
- `detailed_content` (TEXT)

#### `monuments`
- `id` (VARCHAR PK)
- `slug` (VARCHAR(100) UNIQUE)
- `name` (VARCHAR(200))
- `state_id` (VARCHAR FK -> states.id)
- `year_built` (VARCHAR(50))
- `architectural_style` (VARCHAR(100))
- `model_asset_url` (TEXT)
- `lighting_preset` (VARCHAR(50))

#### `monument_hotspots`
- `id` (VARCHAR PK)
- `monument_id` (VARCHAR FK -> monuments.id)
- `title` (VARCHAR(150))
- `short_description` (TEXT)
- `detailed_text` (TEXT)
- `position_x` (FLOAT)
- `position_y` (FLOAT)
- `position_z` (FLOAT)
- `architectural_note` (TEXT)

---

## 5. AI Architecture & Knowledge Guardrails

- **Decoupled Service Interface**: `aiService.ts` maintains a clean separation of concerns. The AI module does not write to the cultural data store directly.
- **Grounding Protocol**: Future queries pass through a verified knowledge extraction layer before reaching the LLM, preventing hallucinated dates or distorted cultural representations.
- **Context Injection**: The active route, state, and category are dynamically injected as context metadata on each query.
