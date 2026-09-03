-- ============================================================
-- SIH India Cultural Heritage — Supabase Migration 002
-- Creates user_discoveries table for Cultural Passport persistence.
-- ============================================================

CREATE TABLE IF NOT EXISTS user_discoveries (
    id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    session_id          TEXT NOT NULL DEFAULT 'default',
    item_type           VARCHAR(50) NOT NULL,
    item_id             TEXT NOT NULL,
    item_name           TEXT,
    state_id            TEXT,
    discovered_at       TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_user_discovery UNIQUE (session_id, item_type, item_id)
);

CREATE INDEX IF NOT EXISTS idx_user_discoveries_session ON user_discoveries(session_id);

ALTER TABLE user_discoveries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read user_discoveries" ON user_discoveries FOR SELECT USING (true);
CREATE POLICY "Public insert user_discoveries" ON user_discoveries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update user_discoveries" ON user_discoveries FOR UPDATE USING (true);
CREATE POLICY "Public delete user_discoveries" ON user_discoveries FOR DELETE USING (true);
