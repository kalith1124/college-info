-- ====================================================================
-- TENKASI COLLEGE PORTAL: COMPLETE DATABASE SETUP
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/rcbekjylbybctfphioqr/sql/new
-- ====================================================================

-- 1. COLLEGES TABLE
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

-- 2. COURSES TABLE
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

-- 3. DEPARTMENTS TABLE
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

-- 4. FACULTY TABLE
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

-- 5. FACILITIES TABLE
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

-- 6. ADMISSIONS TABLE
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

-- 7. FEES TABLE
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

-- 8. PLACEMENTS TABLE
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

-- 9. PHOTOS TABLE
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

-- 10. REVIEWS TABLE
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

-- 11. SAVED_COLLEGES TABLE
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

-- 12. ADMIN_USERS TABLE
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

-- 13. QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS questions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text,
  college_name text,
  category text NOT NULL,
  question text NOT NULL,
  answer text,
  is_answered boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit a question" ON questions;
CREATE POLICY "Anyone can submit a question" ON questions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can read answered questions" ON questions;
CREATE POLICY "Anyone can read answered questions" ON questions FOR SELECT
  TO anon, authenticated USING (is_answered = true);

DROP POLICY IF EXISTS "Admin can read all questions" ON questions;
CREATE POLICY "Admin can read all questions" ON questions FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin can update questions" ON questions;
CREATE POLICY "Admin can update questions" ON questions FOR UPDATE
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
-- FUNCTIONS AND TRIGGERS
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

CREATE OR REPLACE FUNCTION update_questions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS questions_updated_at ON questions;
CREATE TRIGGER questions_updated_at BEFORE UPDATE ON questions
  FOR EACH ROW EXECUTE FUNCTION update_questions_updated_at();

-- ============================================================
-- SEED COLLEGES (Full Tenkasi Directory)
-- ============================================================
INSERT INTO colleges (name, slug, college_type, description, established_year, affiliation, accreditation, recognition, management_type, address, district, area, pincode, latitude, longitude, phone, email, website, working_hours, rating, review_count, is_featured, is_active) VALUES
(
  'Sri Paramakalyani College, Alwarkurichi',
  'sri-paramakalyani-college',
  'Arts & Science',
  'Premier co-educational diamond jubilee institution founded in 1963. Serving Tenkasi district for 63 years with exceptional science research centers.',
  1963,
  'Manonmaniam Sundaranar University',
  'NAAC Re-accredited with A Grade',
  'Govt. of Tamil Nadu',
  'Aided',
  'Alwarkurichi, Tenkasi District, Tamil Nadu 627412',
  'Tenkasi',
  'Alwarkurichi',
  '627412',
  8.7830000,
  77.4040000,
  '04634 283226',
  'spkc_alwarkurichi@yahoo.co.in',
  'https://spkcollege.org/',
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.8,
  145,
  true,
  true
),
(
  'Sri Parasakthi College for Women, Courtallam',
  'sri-parasakthi-college-for-women',
  'Women''s College',
  'Autonomous premier diamond jubilee institution established in 1964 by visionary leader Thiru S. Chellapandian. A pioneer in rural women empowerment with 62 years of continuous educational service.',
  1964,
  'Manonmaniam Sundaranar University (Autonomous)',
  'NAAC Accredited with A Grade (Autonomous)',
  'Govt. of Tamil Nadu',
  'Aided',
  'Sivan Sannathi Street, Courtallam, Tenkasi District, Tamil Nadu 627802',
  'Tenkasi',
  'Courtallam',
  '627802',
  8.9290000,
  77.2690000,
  '04633 221244',
  'sriparasakthi1964@gmail.com',
  'https://sriparasakthicollege.edu.in/',
  'Mon - Sat: 9:00 AM - 4:30 PM',
  4.9,
  210,
  true,
  true
),
(
  'Pasumpon Muthuramalingam Thevar College',
  'pasumpon-muthuramalingam-thevar-college',
  'Arts & Science',
  'Golden Jubilee institution established in 1970 providing 56 continuous years of higher educational service to rural youth in Melaneelithanallur, Sankarankovil, and Tenkasi.',
  1970,
  'Manonmaniam Sundaranar University',
  'NAAC Accredited',
  'Govt. of Tamil Nadu',
  'Aided',
  'Melaneelithanallur, Sankarankovil Taluk, Tenkasi District, Tamil Nadu 627953',
  'Tenkasi',
  'Melaneelithanallur',
  '627953',
  9.1120000,
  77.5890000,
  '04636 284223',
  'pmtcollege@rediffmail.com',
  NULL,
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.5,
  98,
  true,
  true
),
(
  'Sri Ram Nallamani Yadava College of Arts and Science',
  'sri-ram-nallamani-yadava-college',
  'Arts & Science',
  'Prestigious institution established in 1994 in Kodikurichi, Tenkasi. Multi-disciplinary UG and PG courses with modern laboratories.',
  1994,
  'Manonmaniam Sundaranar University',
  'UGC Recognized',
  'Govt. of Tamil Nadu',
  'Private',
  'Kodikurichi, Tenkasi District, Tamil Nadu 627804',
  'Tenkasi',
  'Kodikurichi',
  '627804',
  8.9450000,
  77.3480000,
  '04633 222325',
  'srnycollege@gmail.com',
  'https://srnycollege.edu.in/',
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.3,
  76,
  true,
  true
),
(
  'CSI Jeyaraj Annapackiam College',
  'csi-jeyaraj-annapackiam-college',
  'Arts & Science',
  'Silver Jubilee co-educational institution established in 1997 at Nallur, Alangulam under CSI Tirunelveli Diocese.',
  1997,
  'Manonmaniam Sundaranar University',
  'UGC Recognized',
  'Govt. of Tamil Nadu',
  'Private',
  'Nallur, Alangulam, Tenkasi District, Tamil Nadu 627853',
  'Tenkasi',
  'Alangulam',
  '627853',
  8.8740000,
  77.5020000,
  '04633 270275',
  'csijacollege@yahoo.co.in',
  'https://csijacollege.ac.in/',
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.4,
  65,
  true,
  true
),
(
  'Manonmaniam Sundaranar University College, Puliangudi',
  'mano-college',
  'Arts & Science',
  'Co-educational constituent college serving rural students in and around Puliangudi, Sivagiri, Sankarankovil and Kadayanallur taluks.',
  2000,
  'Manonmaniam Sundaranar University',
  'UGC Recognized',
  'Govt. of Tamil Nadu',
  'Government',
  'Hindu Nadar Uravinmurai Committee Higher Secondary School Campus, T. N. Puthukudi, Puliangudi, Tenkasi, Tamil Nadu 627855',
  'Tenkasi',
  'Puliyangudi',
  '627855',
  8.9640000,
  77.3890000,
  '04636 356341',
  'msucollege_puliangudi@yahoo.com',
  'https://www.msuniv.ac.in/',
  'Mon - Sat: 10:00 AM - 5:00 PM',
  4.1,
  18,
  false,
  true
),
(
  'Government Arts and Science College, Sankarankovil',
  'government-arts-and-science-college-sankarankovil',
  'Arts & Science',
  'Government co-educational college established in 2020 at Sankarankovil with modern facilities and dedicated faculty.',
  2020,
  'Manonmaniam Sundaranar University',
  'Govt. Recognized',
  'Govt. of Tamil Nadu',
  'Government',
  'Sankarankovil, Tenkasi District, Tamil Nadu 627754',
  'Tenkasi',
  'Sankarankovil',
  '627754',
  9.1750000,
  77.5350000,
  NULL,
  NULL,
  NULL,
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.3,
  36,
  true,
  true
),
(
  'Government Arts and Science College for Women, Tenkasi',
  'government-arts-and-science-college-for-women-tenkasi',
  'Women''s College',
  'Flagship government women’s college established in 2022 in Tenkasi town with high student demand and state scholarships.',
  2022,
  'Manonmaniam Sundaranar University',
  'Govt. Recognized',
  'Govt. of Tamil Nadu',
  'Government',
  'Tenkasi Town, Tenkasi, Tamil Nadu 627851',
  'Tenkasi',
  'Tenkasi',
  '627851',
  8.9590000,
  77.3160000,
  NULL,
  NULL,
  NULL,
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.6,
  54,
  true,
  true
),
(
  'Government Arts and Science College, Kadayanallur',
  'government-arts-and-science-college-kadayanallur',
  'Arts & Science',
  'Government co-educational college serving the Kadayanallur region with quality undergraduate courses.',
  2017,
  'Manonmaniam Sundaranar University',
  'Govt. Recognized',
  'Govt. of Tamil Nadu',
  'Government',
  'Kadayanallur, Tenkasi District, Tamil Nadu 627751',
  'Tenkasi',
  'Kadayanallur',
  '627751',
  9.0740000,
  77.3480000,
  NULL,
  NULL,
  NULL,
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.3,
  42,
  true,
  true
),
(
  'Kamarajar Government Arts College, Surandai',
  'kamarajar-government-arts-college-surandai',
  'Arts & Science',
  'Premier government arts and science college in Surandai with sprawling campus and active NSS/NCC wings.',
  2008,
  'Manonmaniam Sundaranar University',
  'NAAC Accredited',
  'Govt. of Tamil Nadu',
  'Government',
  'Surandai, Tenkasi District, Tamil Nadu 627859',
  'Tenkasi',
  'Surandai',
  '627859',
  8.9760000,
  77.4240000,
  NULL,
  NULL,
  NULL,
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.4,
  68,
  true,
  true
),
(
  'J. P. College of Arts and Science',
  'jp-college-of-arts-and-science',
  'Arts & Science',
  'Co-educational institution located at Ayikudy, Tenkasi offering emerging arts, commerce, and computer science streams.',
  2007,
  'Manonmaniam Sundaranar University',
  'UGC Recognized',
  'Govt. of Tamil Nadu',
  'Private',
  'Ayikudy, Tenkasi District, Tamil Nadu 627852',
  'Tenkasi',
  'Ayikudy',
  '627852',
  8.9810000,
  77.3250000,
  NULL,
  NULL,
  NULL,
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.2,
  45,
  true,
  true
),
(
  'J. P. College of Engineering',
  'jp-college-of-engineering',
  'Engineering',
  'Premier engineering institution offering B.E./B.Tech courses with advanced technical labs and campus placement cell.',
  2008,
  'Anna University',
  'AICTE Approved',
  'Govt. of Tamil Nadu',
  'Private',
  'Ayikudy, Tenkasi District, Tamil Nadu 627852',
  'Tenkasi',
  'Ayikudy',
  '627852',
  8.9810000,
  77.3250000,
  NULL,
  NULL,
  NULL,
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.3,
  82,
  true,
  true
),
(
  'A.R. College of Engineering and Technology',
  'ar-college-of-engineering-and-technology',
  'Engineering',
  'Technical institution in Kadayanallur region offering engineering disciplines with hands-on technical workshops.',
  2009,
  'Anna University',
  'AICTE Approved',
  'Govt. of Tamil Nadu',
  'Private',
  'Kadayanallur, Tenkasi District, Tamil Nadu 627751',
  'Tenkasi',
  'Kadayanallur',
  '627751',
  9.0740000,
  77.3480000,
  NULL,
  NULL,
  NULL,
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.1,
  38,
  true,
  true
),
(
  'St. Mary''s Institute of Pharmacy',
  'st-marys-institute-of-pharmacy',
  'Pharmacy',
  'Specialized pharmaceutical institution offering B.Pharm and D.Pharm with modern pharmacological laboratories.',
  2015,
  'The Tamil Nadu Dr. M.G.R. Medical University',
  'PCI Approved',
  'Govt. of Tamil Nadu',
  'Private',
  '11, Madurai Main Road, Chinthamani, Puliangudi, Kadayanallur (TK), Tenkasi, Tamil Nadu 627855',
  'Tenkasi',
  'Puliyangudi',
  '627855',
  8.9640000,
  77.3890000,
  '078452 64333',
  NULL,
  NULL,
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.5,
  38,
  true,
  true
),
(
  'S. Thangapazham Agricultural College',
  's-thangapazham-agricultural-college',
  'Agriculture',
  'Pioneering agricultural institution with extensive research farms and practical agronomy training.',
  2015,
  'Tamil Nadu Agricultural University (TNAU)',
  'ICAR Accredited',
  'Govt. of Tamil Nadu',
  'Private',
  'Vasudevanallur, Naranapuram, Tenkasi District, Tamil Nadu 627760',
  'Tenkasi',
  'Vasudevanallur',
  '627760',
  9.0490000,
  77.3420000,
  '099428 52100',
  NULL,
  NULL,
  'Mon - Sat: 9:00 AM - 5:00 PM',
  4.4,
  94,
  true,
  true
),
(
  'Manonmaniam Sundaranar University College, Naduvakkurichi',
  'msu-college-naduvakurichi-sankarankovil',
  'Arts & Science',
  'Constituent college of Manonmaniam Sundaranar University situated on Sankarankovil - Virasigamani Road in Naduvakkurichi. Providing quality, affordable higher education to rural youth across Sankarankovil, Veerasigamani, and Tenkasi.',
  2011,
  'Manonmaniam Sundaranar University (Constituent College)',
  'UGC Recognized Constituent College',
  'Govt. of Tamil Nadu',
  'Government',
  'Sankarankovil - Virasigamani Rd, Near Vallaramapuram Bus Stop, Naduvakurichi, Sankarankovil, Tenkasi District, Tamil Nadu 627862',
  'Tenkasi',
  'Sankarankovil',
  '627862',
  9.1350000,
  77.4950000,
  '04636 281155',
  'msucollegesankarankovil@gmail.com',
  'https://www.msuniv.ac.in/',
  'Mon - Sat: 10:00 AM - 5:00 PM',
  4.6,
  21,
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  college_type = EXCLUDED.college_type,
  description = EXCLUDED.description,
  established_year = EXCLUDED.established_year,
  affiliation = EXCLUDED.affiliation,
  accreditation = EXCLUDED.accreditation,
  management_type = EXCLUDED.management_type,
  address = EXCLUDED.address,
  district = EXCLUDED.district,
  area = EXCLUDED.area,
  pincode = EXCLUDED.pincode,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  website = EXCLUDED.website,
  working_hours = EXCLUDED.working_hours,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  is_featured = EXCLUDED.is_featured,
  is_active = EXCLUDED.is_active;
