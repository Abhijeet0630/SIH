-- Migration 002: Align existing tables with the full schema
-- Note: If you get an error that a column already exists, you can ignore it or remove it from this script.

ALTER TABLE states
    ADD COLUMN IF NOT EXISTS native_name VARCHAR(200),
    ADD COLUMN IF NOT EXISTS is_fully_developed BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS cultural_identity TEXT,
    ADD COLUMN IF NOT EXISTS short_description TEXT,
    ADD COLUMN IF NOT EXISTS historical_overview TEXT,
    ADD COLUMN IF NOT EXISTS banner_image_url TEXT,
    ADD COLUMN IF NOT EXISTS item_count INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS monument_count INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS highlighted_item_slug TEXT,
    ADD COLUMN IF NOT EXISTS featured_traditions TEXT[],
    ADD COLUMN IF NOT EXISTS latitude NUMERIC(9,6),
    ADD COLUMN IF NOT EXISTS longitude NUMERIC(9,6);

ALTER TABLE categories
    ADD COLUMN IF NOT EXISTS label_key TEXT,
    ADD COLUMN IF NOT EXISTS default_label VARCHAR(200),
    ADD COLUMN IF NOT EXISTS icon_name VARCHAR(100),
    ADD COLUMN IF NOT EXISTS accent_color VARCHAR(20);

-- Make sure the rest of the tables from 001 are created.
-- We re-run the creation logic in case they don't exist at all.
