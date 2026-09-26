-- Create questions table for "Raise a Question" feature
CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  college_name TEXT,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  is_answered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert questions (public form)
CREATE POLICY "Anyone can submit a question"
  ON questions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to read answered questions (for FAQ display)
CREATE POLICY "Anyone can read answered questions"
  ON questions FOR SELECT
  TO anon, authenticated
  USING (is_answered = TRUE);

-- Allow authenticated users (admin) to read all questions
CREATE POLICY "Admin can read all questions"
  ON questions FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admin) to update questions (add answers)
CREATE POLICY "Admin can update questions"
  ON questions FOR UPDATE
  TO authenticated
  USING (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_questions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER questions_updated_at
  BEFORE UPDATE ON questions
  FOR EACH ROW
  EXECUTE FUNCTION update_questions_updated_at();

