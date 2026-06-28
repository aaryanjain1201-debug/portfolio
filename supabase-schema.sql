-- Supabase SQL Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query → Run)

CREATE TABLE IF NOT EXISTS portfolio_data (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default row
INSERT INTO portfolio_data (id, data)
VALUES ('main', '{}')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- Allow all operations (anon key)
CREATE POLICY "Allow all for anon" ON portfolio_data
  FOR ALL
  USING (true)
  WITH CHECK (true);
