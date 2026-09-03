-- ============================================================
-- SIH India Cultural Heritage — Supabase Migration 001
-- Creates all tables required by the frontend application.
-- Run this in the Supabase SQL Editor.
-- ============================================================

-- --------------------------------------------------------
-- 1. states
-- Matches: ARCHITECTURE.md + Frontend StateOverview type
-- Your existing table uses these columns already.
-- If the table already exists, skip or ALTER as needed.
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS states (
    id              TEXT PRIMARY KEY,                -- e.g. 'maharashtra'
    code            VARCHAR(10) UNIQUE NOT NULL,     -- e.g. 'IN-MH'
    name            VARCHAR(100) NOT NULL,
    native_name     VARCHAR(200),
    capital         VARCHAR(100),
    region          VARCHAR(50),                     -- North/South/West/East/Central/Northeast
    is_fully_developed BOOLEAN DEFAULT FALSE,
    cultural_identity  TEXT,
    short_description  TEXT,
    historical_overview TEXT,
    languages       TEXT[],                          -- e.g. {'Marathi','Hindi','Konkani'}
    banner_image_url TEXT,
    item_count      INTEGER DEFAULT 0,
    monument_count  INTEGER DEFAULT 0,
    highlighted_item_slug TEXT,
    featured_traditions TEXT[],
    latitude        NUMERIC(9,6),
    longitude       NUMERIC(9,6),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------
-- 2. state_sub_regions
-- Matches: Frontend StateRegion type (nested in StateOverview)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS state_sub_regions (
    id                  TEXT PRIMARY KEY,            -- e.g. 'konkan'
    state_id            TEXT NOT NULL REFERENCES states(id) ON DELETE CASCADE,
    name                VARCHAR(200) NOT NULL,
    districts           TEXT[],
    description         TEXT,
    cultural_character  TEXT,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sub_regions_state ON state_sub_regions(state_id);

-- --------------------------------------------------------
-- 3. categories
-- Matches: Frontend CategoryInfo type
-- Your existing table may already have these columns.
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
    id              TEXT PRIMARY KEY,                -- e.g. 'food', 'forts'
    label_key       TEXT,                            -- i18n key e.g. 'categories.food'
    default_label   VARCHAR(200),
    icon_name       VARCHAR(100),                    -- Lucide icon name
    accent_color    VARCHAR(20),                     -- Hex color e.g. '#C25E3E'
    description     TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------
-- 4. cultural_items
-- Matches: Frontend CulturalItem type
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS cultural_items (
    id                      TEXT PRIMARY KEY,
    slug                    VARCHAR(200) UNIQUE NOT NULL,
    title                   VARCHAR(300) NOT NULL,
    marathi_title           VARCHAR(300),
    hindi_title             VARCHAR(300),
    state_id                TEXT REFERENCES states(id) ON DELETE SET NULL,
    category                TEXT REFERENCES categories(id) ON DELETE SET NULL,
    short_description       TEXT,
    description             TEXT,
    history                 TEXT,
    cultural_significance   TEXT,
    location_name           VARCHAR(300),
    district                VARCHAR(200),
    state_name              VARCHAR(200),
    latitude                NUMERIC(9,6),
    longitude               NUMERIC(9,6),
    images                  JSONB DEFAULT '[]'::jsonb,     -- Array of ImageMeta
    primary_image           TEXT,
    sources                 JSONB DEFAULT '[]'::jsonb,     -- Array of SourceCitation
    related_item_slugs      TEXT[],
    tags                    TEXT[],
    recipe_info             JSONB,                         -- RecipeInfo (nullable)
    model_3d_id             TEXT,
    last_verified           TEXT,
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cultural_items_state ON cultural_items(state_id);
CREATE INDEX IF NOT EXISTS idx_cultural_items_category ON cultural_items(category);
CREATE INDEX IF NOT EXISTS idx_cultural_items_slug ON cultural_items(slug);

-- --------------------------------------------------------
-- 5. star_schema_nodes
-- Matches: Frontend StarSchemaNode type (nested in CulturalItem)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS star_schema_nodes (
    id                  TEXT PRIMARY KEY,
    cultural_item_id    TEXT NOT NULL REFERENCES cultural_items(id) ON DELETE CASCADE,
    type                VARCHAR(50) NOT NULL,        -- history/region/materials/tradition/festival/modern/etc
    label               VARCHAR(200),
    short_description   TEXT,
    detailed_content    TEXT,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_star_nodes_item ON star_schema_nodes(cultural_item_id);

-- --------------------------------------------------------
-- 6. monuments
-- Matches: Frontend MonumentData type
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS monuments (
    id                      TEXT PRIMARY KEY,
    slug                    VARCHAR(200) UNIQUE NOT NULL,
    name                    VARCHAR(300) NOT NULL,
    native_name             VARCHAR(300),
    marathi_name            VARCHAR(300),
    hindi_name              VARCHAR(300),
    state                   VARCHAR(200),
    state_id                TEXT REFERENCES states(id) ON DELETE SET NULL,
    region                  VARCHAR(200),
    district_or_city        VARCHAR(200),
    category                VARCHAR(200),
    short_description       TEXT,
    description             TEXT,
    detailed_history        TEXT,
    cultural_importance     TEXT,
    cultural_significance   TEXT,
    location_name           VARCHAR(300),
    year_built              VARCHAR(100),
    architectural_style     VARCHAR(200),
    image                   TEXT,
    banner_image            TEXT,
    model_url               TEXT,
    model_available         BOOLEAN DEFAULT FALSE,
    latitude                NUMERIC(9,6),
    longitude               NUMERIC(9,6),
    model_config            JSONB,                  -- Monument3DModelConfig
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_monuments_state ON monuments(state_id);
CREATE INDEX IF NOT EXISTS idx_monuments_slug ON monuments(slug);

-- --------------------------------------------------------
-- 7. monument_hotspots
-- Matches: Frontend HotspotAnnotation type
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS monument_hotspots (
    id                  TEXT PRIMARY KEY,
    monument_id         TEXT NOT NULL REFERENCES monuments(id) ON DELETE CASCADE,
    title               VARCHAR(200),
    short_description   TEXT,
    detailed_text       TEXT,
    position_x          FLOAT,
    position_y          FLOAT,
    position_z          FLOAT,
    camera_position_x   FLOAT,
    camera_position_y   FLOAT,
    camera_position_z   FLOAT,
    camera_target_x     FLOAT,
    camera_target_y     FLOAT,
    camera_target_z     FLOAT,
    image_url           TEXT,
    architectural_note  TEXT,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hotspots_monument ON monument_hotspots(monument_id);

-- --------------------------------------------------------
-- 8. festivals
-- Matches: Frontend FestivalEvent type
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS festivals (
    id                      TEXT PRIMARY KEY,
    name                    VARCHAR(300) NOT NULL,
    marathi_name            VARCHAR(300),
    hindi_name              VARCHAR(300),
    month_index             INTEGER,                -- 0-11
    date_or_season          TEXT,
    upcoming_date           TEXT,
    day_or_tithi            TEXT,
    state                   VARCHAR(200),
    state_id                TEXT REFERENCES states(id) ON DELETE SET NULL,
    category                VARCHAR(50),            -- harvest/religious/seasonal/art/new-year
    image                   TEXT,
    short_description       TEXT,
    cultural_significance   TEXT,
    traditional_practices   TEXT[],
    related_item_slug       TEXT,
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_festivals_state ON festivals(state_id);

-- --------------------------------------------------------
-- Enable Row Level Security (read-only public access)
-- --------------------------------------------------------
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE state_sub_regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE star_schema_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE monuments ENABLE ROW LEVEL SECURITY;
ALTER TABLE monument_hotspots ENABLE ROW LEVEL SECURITY;
ALTER TABLE festivals ENABLE ROW LEVEL SECURITY;

-- Public read-only policies (using anon key)
CREATE POLICY "Public read states"          ON states          FOR SELECT USING (true);
CREATE POLICY "Public read sub_regions"     ON state_sub_regions FOR SELECT USING (true);
CREATE POLICY "Public read categories"      ON categories      FOR SELECT USING (true);
CREATE POLICY "Public read cultural_items"  ON cultural_items  FOR SELECT USING (true);
CREATE POLICY "Public read star_nodes"      ON star_schema_nodes FOR SELECT USING (true);
CREATE POLICY "Public read monuments"       ON monuments       FOR SELECT USING (true);
CREATE POLICY "Public read hotspots"        ON monument_hotspots FOR SELECT USING (true);
CREATE POLICY "Public read festivals"       ON festivals       FOR SELECT USING (true);
