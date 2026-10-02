/*
# Create reports table for Bloc Dix gaming server

1. New Tables
- `reports`
  - `id` (uuid, primary key)
  - `reporter_name` (text, name of the person reporting)
  - `reported_player` (text, name of the player being reported)
  - `category` (text, type of report: cheating, toxicity, spam, other)
  - `description` (text, detailed description of the incident)
  - `status` (text, default 'pending' — pending, reviewing, resolved)
  - `created_at` (timestamp)

2. Security
- Enable RLS on `reports`.
- Allow anon + authenticated to INSERT (anyone can submit a report).
- Allow anon + authenticated to SELECT (reports are visible publicly on the landing page).
- No UPDATE or DELETE from the client — admins handle status changes via the Supabase dashboard.
*/

CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_name text NOT NULL,
  reported_player text NOT NULL,
  category text NOT NULL CHECK (category IN ('cheating', 'toxicity', 'spam', 'other')),
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reports" ON reports;
CREATE POLICY "anon_select_reports" ON reports FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reports" ON reports;
CREATE POLICY "anon_insert_reports" ON reports FOR INSERT
  TO anon, authenticated WITH CHECK (true);
