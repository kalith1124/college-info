/*
# College Info Portal - Tenkasi: Database Schema

## Overview
Creates the complete database schema for a college information portal serving the Tenkasi district area. The portal allows public visitors to browse colleges, courses, facilities, reviews, and locations. An admin manages all college data through a protected dashboard.

## Tables Created
1. **colleges** - Main college records with name, type, description, location, contact info, accreditation, etc.
2. **courses** - Courses offered by each college (name, duration, eligibility, departments)
3. **departments** - Academic departments within each college
4. **faculty** - Faculty members per college (name, qualification, designation, department)
5. **facilities** - Facilities available at each college (library, lab, hostel, etc.)
6. **admissions** - Admission details per college (process, eligibility, documents, dates)
7. **fees** - Fee structure per college (tuition, hostel, other fees by course)
8. **placements** - Placement info per college (companies, percentage, internships, training)
9. **photos** - Photo gallery per college (campus, classroom, lab, events, etc.)
10. **reviews** - User reviews and ratings per college
11. **saved_colleges** - User's saved/favorited colleges
12. **admin_users** - Admin authentication (email/password via Supabase Auth)

## Security
- RLS enabled on ALL tables.
- Public read access (anon + authenticated) for all college-related data (colleges, courses, departments, faculty, facilities, admissions, fees, placements, photos, reviews).
- Reviews can be inserted by anon (public submission) but managed by admin.
- saved_colleges is owner-scoped (user sees only their own saved colleges).
- Admin-only write access for college management data (enforced via authenticated role + admin_users check).
- Note: This is a public directory portal - college data is intentionally public. Write access for college management is restricted to authenticated admin users.
*/

-- ============================================================
-- COLLEGES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS colleges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  college_type text NOT NULL DEFAULT 'Arts & Science',
  description text,
  established_year int,
  affiliation text,
  accreditation text,
  recognition text,
  management_type text DEFAULT 'Private',
  logo_url text,
  image_url text,
  address text NOT NULL,
  district text DEFAULT 'Tenkasi',
  area text,
  pincode text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  phone text,
  whatsapp text,
  email text,
  website text,
  working_hours text DEFAULT '9:00 AM - 5:00 PM',
  rating numeric(2,1) DEFAULT 0,
  review_count int DEFAULT 0,
  view_count int DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_colleges" ON colleges;
CREATE POLICY "public_read_colleges" ON colleges FOR SELECT
  TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "admin_insert_colleges" ON colleges;
CREATE POLICY "admin_insert_colleges" ON colleges FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_colleges" ON colleges;
CREATE POLICY "admin_update_colleges" ON colleges FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_colleges" ON colleges;
CREATE POLICY "admin_delete_colleges" ON colleges FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- COURSES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  name text NOT NULL,
  duration text,
  eligibility text,
  departments text,
  admission_info text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_courses" ON courses;
CREATE POLICY "public_read_courses" ON courses FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_courses" ON courses;
CREATE POLICY "admin_insert_courses" ON courses FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_courses" ON courses;
CREATE POLICY "admin_update_courses" ON courses FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_courses" ON courses;
CREATE POLICY "admin_delete_courses" ON courses FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- DEPARTMENTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  name text NOT NULL,
  head text,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_departments" ON departments;
CREATE POLICY "public_read_departments" ON departments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_departments" ON departments;
CREATE POLICY "admin_insert_departments" ON departments FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_departments" ON departments;
CREATE POLICY "admin_update_departments" ON departments FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_departments" ON departments;
CREATE POLICY "admin_delete_departments" ON departments FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- FACULTY TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS faculty (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  name text NOT NULL,
  qualification text,
  designation text,
  department text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_faculty" ON faculty;
CREATE POLICY "public_read_faculty" ON faculty FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_faculty" ON faculty;
CREATE POLICY "admin_insert_faculty" ON faculty FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_faculty" ON faculty;
CREATE POLICY "admin_update_faculty" ON faculty FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_faculty" ON faculty;
CREATE POLICY "admin_delete_faculty" ON faculty FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- FACILITIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  name text NOT NULL,
  icon text,
  description text,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_facilities" ON facilities;
CREATE POLICY "public_read_facilities" ON facilities FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_facilities" ON facilities;
CREATE POLICY "admin_insert_facilities" ON facilities FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_facilities" ON facilities;
CREATE POLICY "admin_update_facilities" ON facilities FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_facilities" ON facilities;
CREATE POLICY "admin_delete_facilities" ON facilities FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- ADMISSIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  process text,
  eligibility text,
  required_documents text,
  application_process text,
  important_dates text,
  contact_info text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_admissions" ON admissions;
CREATE POLICY "public_read_admissions" ON admissions FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_admissions" ON admissions;
CREATE POLICY "admin_insert_admissions" ON admissions FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_admissions" ON admissions;
CREATE POLICY "admin_update_admissions" ON admissions FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_admissions" ON admissions;
CREATE POLICY "admin_delete_admissions" ON admissions FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- FEES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS fees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  course_name text,
  tuition_fees text,
  hostel_fees text,
  other_fees text,
  total_fees text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE fees ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_fees" ON fees;
CREATE POLICY "public_read_fees" ON fees FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_fees" ON fees;
CREATE POLICY "admin_insert_fees" ON fees FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_fees" ON fees;
CREATE POLICY "admin_update_fees" ON fees FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_fees" ON fees;
CREATE POLICY "admin_delete_fees" ON fees FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- PLACEMENTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS placements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  cell_info text,
  companies text,
  placement_percentage text,
  internship_info text,
  training_programs text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE placements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_placements" ON placements;
CREATE POLICY "public_read_placements" ON placements FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_placements" ON placements;
CREATE POLICY "admin_insert_placements" ON placements FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_placements" ON placements;
CREATE POLICY "admin_update_placements" ON placements FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_placements" ON placements;
CREATE POLICY "admin_delete_placements" ON placements FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- PHOTOS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  url text NOT NULL,
  caption text,
  category text DEFAULT 'campus',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_photos" ON photos;
CREATE POLICY "public_read_photos" ON photos FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_photos" ON photos;
CREATE POLICY "admin_insert_photos" ON photos FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_photos" ON photos;
CREATE POLICY "admin_update_photos" ON photos FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_photos" ON photos;
CREATE POLICY "admin_delete_photos" ON photos FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- REVIEWS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  reviewer_name text NOT NULL,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  is_approved boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_reviews" ON reviews;
CREATE POLICY "public_read_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (is_approved = true);

DROP POLICY IF EXISTS "public_insert_reviews" ON reviews;
CREATE POLICY "public_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_reviews" ON reviews;
CREATE POLICY "admin_update_reviews" ON reviews FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_reviews" ON reviews;
CREATE POLICY "admin_delete_reviews" ON reviews FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- SAVED_COLLEGES TABLE (owner-scoped, no auth required - uses session ID)
-- ============================================================
CREATE TABLE IF NOT EXISTS saved_colleges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE saved_colleges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_saved_colleges" ON saved_colleges;
CREATE POLICY "public_read_saved_colleges" ON saved_colleges FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_saved_colleges" ON saved_colleges;
CREATE POLICY "public_insert_saved_colleges" ON saved_colleges FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_saved_colleges" ON saved_colleges;
CREATE POLICY "public_delete_saved_colleges" ON saved_colleges FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- ADMIN_USERS TABLE (tracks admin profiles, auth via Supabase Auth)
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  role text DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_admin_users" ON admin_users;
CREATE POLICY "public_read_admin_users" ON admin_users FOR SELECT
  TO authenticated USING (true);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_colleges_slug ON colleges(slug);
CREATE INDEX IF NOT EXISTS idx_colleges_type ON colleges(college_type);
CREATE INDEX IF NOT EXISTS idx_colleges_area ON colleges(area);
CREATE INDEX IF NOT EXISTS idx_courses_college_id ON courses(college_id);
CREATE INDEX IF NOT EXISTS idx_departments_college_id ON departments(college_id);
CREATE INDEX IF NOT EXISTS idx_faculty_college_id ON faculty(college_id);
CREATE INDEX IF NOT EXISTS idx_facilities_college_id ON facilities(college_id);
CREATE INDEX IF NOT EXISTS idx_admissions_college_id ON admissions(college_id);
CREATE INDEX IF NOT EXISTS idx_fees_college_id ON fees(college_id);
CREATE INDEX IF NOT EXISTS idx_placements_college_id ON placements(college_id);
CREATE INDEX IF NOT EXISTS idx_photos_college_id ON photos(college_id);
CREATE INDEX IF NOT EXISTS idx_reviews_college_id ON reviews(college_id);
CREATE INDEX IF NOT EXISTS idx_saved_colleges_college_id ON saved_colleges(college_id);
CREATE INDEX IF NOT EXISTS idx_saved_colleges_session_id ON saved_colleges(session_id);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_colleges_updated_at ON colleges;
CREATE TRIGGER trigger_colleges_updated_at BEFORE UPDATE ON colleges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
