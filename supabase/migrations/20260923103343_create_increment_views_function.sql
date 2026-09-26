/*
# Create increment_college_views function

## Overview
Creates a database function to atomically increment the view_count column of a college.
This is called when a user views a college detail page.

## Security
- The function is SECURITY DEFINER so it can run with elevated privileges.
- It only increments view_count, no sensitive data is exposed.
*/

CREATE OR REPLACE FUNCTION increment_college_views(college_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE colleges SET view_count = view_count + 1 WHERE id = college_id;
END;
$$;

GRANT EXECUTE ON FUNCTION increment_college_views(uuid) TO anon, authenticated;
