/*
  Tenkasi college directory expansion

  Sources checked: Manonmaniam Sundaranar University's affiliated-college
  directory and Anna University's Tenkasi district affiliated-engineering
  directory (September 2026).  Contact, fee, accreditation, rating and
  placement fields are deliberately left NULL/zero unless already present
  in the project, so the public directory does not present unverified data.
*/

-- Correct the existing university-college record with information published
-- by MSU. The existing slug is retained so existing saved links continue working.
UPDATE colleges
SET
  name = 'Manonmaniam Sundaranar University College, Puliangudi',
  description = 'Co-educational constituent college serving rural students in and around Puliangudi, Sivagiri, Sankarankovil and Kadayanallur taluks.',
  established_year = 2000,
  affiliation = 'Manonmaniam Sundaranar University',
  management_type = 'Government',
  address = 'Hindu Nadar Uravinmurai Committee Higher Secondary School Campus, T. N. Puthukudi, Puliangudi, Tenkasi, Tamil Nadu 627855',
  phone = '04636 356341',
  email = 'msucollege_puliangudi@yahoo.com'
WHERE slug = 'mano-college';

-- Arts and science colleges listed in the MSU affiliated-college directory.
INSERT INTO colleges (name, slug, college_type, description, affiliation, management_type, address, area, district, pincode, is_active) VALUES
('Aladi Aruna College of Liberal Arts & Science', 'aladi-aruna-college-of-liberal-arts-and-science', 'Arts & Science', 'Co-educational arts and science college listed by Manonmaniam Sundaranar University.', 'Manonmaniam Sundaranar University', 'Private', 'Sivalarkulam, Tenkasi District, Tamil Nadu 627853', 'Sivalarkulam', 'Tenkasi', '627853', true),
('A.V.K. Arts & Science Women''s College', 'avk-arts-and-science-womens-college', 'Women''s College', 'Women''s arts and science college listed by Manonmaniam Sundaranar University.', 'Manonmaniam Sundaranar University', 'Private', 'Vadikottai, Sankarankovil, Tenkasi District, Tamil Nadu 627753', 'Sankarankovil', 'Tenkasi', '627753', true),
('CSI Jeyaraj Annapackiam College', 'csi-jeyaraj-annapackiam-college', 'Arts & Science', 'Arts and science college listed by Manonmaniam Sundaranar University.', 'Manonmaniam Sundaranar University', 'Private', 'Nallur, Alangulam, Tenkasi District, Tamil Nadu 627853', 'Alangulam', 'Tenkasi', '627853', true),
('Government Arts and Science College, Sankarankovil', 'government-arts-and-science-college-sankarankovil', 'Arts & Science', 'Government co-educational arts and science college.', 'Manonmaniam Sundaranar University', 'Government', 'Sankarankovil, Tenkasi District, Tamil Nadu 627754', 'Sankarankovil', 'Tenkasi', '627754', true),
('Government Arts and Science College for Women, Tenkasi', 'government-arts-and-science-college-for-women-tenkasi', 'Women''s College', 'Government women''s arts and science college.', 'Manonmaniam Sundaranar University', 'Government', 'Tenkasi, Tamil Nadu 627851', 'Tenkasi', 'Tenkasi', '627851', true),
('Government Arts and Science College, Kadayanallur', 'government-arts-and-science-college-kadayanallur', 'Arts & Science', 'Government arts and science college.', 'Manonmaniam Sundaranar University', 'Government', 'Kadayanallur, Tenkasi District, Tamil Nadu 627751', 'Kadayanallur', 'Tenkasi', '627751', true),
('J. P. College of Arts and Science', 'jp-college-of-arts-and-science', 'Arts & Science', 'Arts and science college at Ayikudy.', 'Manonmaniam Sundaranar University', 'Private', 'Ayikudy, Tenkasi District, Tamil Nadu 627852', 'Ayikudy', 'Tenkasi', '627852', true),
('Kamarajar Government Arts College', 'kamarajar-government-arts-college-surandai', 'Arts & Science', 'Government arts college at Surandai.', 'Manonmaniam Sundaranar University', 'Government', 'Surandai, Tenkasi District, Tamil Nadu 627859', 'Surandai', 'Tenkasi', '627859', true),
('Mahatma Gandhi College of Arts and Science', 'mahatma-gandhi-college-of-arts-and-science', 'Arts & Science', 'Arts and science college at Solaiseri, Sankarankovil.', 'Manonmaniam Sundaranar University', 'Private', 'Solaiseri, Sankarankovil, Tenkasi District, Tamil Nadu 627753', 'Sankarankovil', 'Tenkasi', '627753', true),
('Pasumpon Muthuramalingam Thevar College', 'pasumpon-muthuramalingam-thevar-college', 'Arts & Science', 'Arts and science college at Melaneelithanallur.', 'Manonmaniam Sundaranar University', 'Private', 'Melaneelithanallur, Tenkasi District, Tamil Nadu 627953', 'Melaneelithanallur', 'Tenkasi', '627953', true),
('Perarignar Anna Science College', 'perarignar-anna-science-college', 'Arts & Science', 'Science college at Dharugapuram, Sivagiri.', 'Manonmaniam Sundaranar University', 'Private', 'Dharugapuram, Sivagiri, Tenkasi District, Tamil Nadu 627755', 'Sivagiri', 'Tenkasi', '627755', true),
('Sri Paramakalyani College', 'sri-paramakalyani-college', 'Arts & Science', 'Arts and science college at Alwarkurichi.', 'Manonmaniam Sundaranar University', 'Private', 'Alwarkurichi, Tenkasi District, Tamil Nadu 627412', 'Alwarkurichi', 'Tenkasi', '627412', true),
('Sri Parasakthi College for Women', 'sri-parasakthi-college-for-women', 'Women''s College', 'Autonomous women''s arts and science college at Courtallam.', 'Manonmaniam Sundaranar University', 'Private', 'Courtallam, Tenkasi District, Tamil Nadu 627802', 'Courtallam', 'Tenkasi', '627802', true),
('Sri Ram Nallamani Yadava College of Arts and Science', 'sri-ram-nallamani-yadava-college', 'Arts & Science', 'Arts and science college at Kodikurichi.', 'Manonmaniam Sundaranar University', 'Private', 'Kodikurichi, Tenkasi District, Tamil Nadu 627804', 'Kodikurichi', 'Tenkasi', '627804', true),
('St. Joseph College of Arts and Science', 'st-joseph-college-of-arts-and-science-vaikalipatti', 'Arts & Science', 'Arts and science college at Vaikalipatti, Mettur.', 'Manonmaniam Sundaranar University', 'Private', 'Vaikalipatti, Mettur, Tenkasi District, Tamil Nadu 627808', 'Mettur', 'Tenkasi', '627808', true),
('U.S.P. Arts and Science Women''s College', 'usp-arts-and-science-womens-college', 'Women''s College', 'Women''s arts and science college at Kodikurichi.', 'Manonmaniam Sundaranar University', 'Private', 'Kodikurichi, Tenkasi District, Tamil Nadu 627804', 'Kodikurichi', 'Tenkasi', '627804', true),
('Valanar Arts and Science College', 'valanar-arts-and-science-college', 'Arts & Science', 'Co-educational arts and science college at Kuruvikulam.', 'Manonmaniam Sundaranar University', 'Private', 'Kuruvikulam, Tenkasi District, Tamil Nadu 627754', 'Kuruvikulam', 'Tenkasi', '627754', true),
('Vivekananda College of Arts and Science', 'vivekananda-college-of-arts-and-science', 'Arts & Science', 'Arts and science college at Vellalankulam, Sankarankovil taluk.', 'Manonmaniam Sundaranar University', 'Private', 'Vellalankulam, Sankarankovil, Tenkasi District, Tamil Nadu 627857', 'Sankarankovil', 'Tenkasi', '627857', true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  college_type = EXCLUDED.college_type,
  description = EXCLUDED.description,
  affiliation = EXCLUDED.affiliation,
  management_type = EXCLUDED.management_type,
  address = EXCLUDED.address,
  area = EXCLUDED.area,
  district = EXCLUDED.district,
  pincode = EXCLUDED.pincode,
  is_active = true;

-- Engineering colleges in Anna University's Tenkasi district directory.
INSERT INTO colleges (name, slug, college_type, description, affiliation, management_type, address, area, district, is_active) VALUES
('A.R. College of Engineering and Technology', 'ar-college-of-engineering-and-technology', 'Engineering', 'Engineering college listed in Anna University''s Tenkasi district directory.', 'Anna University', 'Private', 'Tenkasi District, Tamil Nadu', 'Tenkasi', 'Tenkasi', true),
('J. P. College of Engineering', 'jp-college-of-engineering', 'Engineering', 'Engineering college listed in Anna University''s Tenkasi district directory.', 'Anna University', 'Private', 'Tenkasi District, Tamil Nadu', 'Tenkasi', 'Tenkasi', true),
('Mahakavi Bharathiyar College of Engineering and Technology', 'mahakavi-bharathiyar-college-of-engineering-and-technology', 'Engineering', 'Engineering college listed in Anna University''s Tenkasi district directory.', 'Anna University', 'Private', 'Tenkasi District, Tamil Nadu', 'Tenkasi', 'Tenkasi', true),
('Sardar Raja College of Engineering', 'sardar-raja-college-of-engineering', 'Engineering', 'Engineering college listed in Anna University''s Tenkasi district directory.', 'Anna University', 'Private', 'Tenkasi District, Tamil Nadu', 'Tenkasi', 'Tenkasi', true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  college_type = EXCLUDED.college_type,
  description = EXCLUDED.description,
  affiliation = EXCLUDED.affiliation,
  management_type = EXCLUDED.management_type,
  address = EXCLUDED.address,
  area = EXCLUDED.area,
  district = EXCLUDED.district,
  is_active = true;

-- Courses explicitly published by MSU for its Puliangudi constituent college.
INSERT INTO courses (college_id, name, duration, eligibility, departments, admission_info)
SELECT id, course_name, '3 years', 'Higher Secondary (10+2) or equivalent', department, 'Refer to the college or MSU admission notice for the current intake and dates.'
FROM colleges
CROSS JOIN (
  VALUES
    ('B.Com', 'Commerce'),
    ('B.B.A.', 'Business Administration'),
    ('B.Sc. Mathematics', 'Mathematics'),
    ('B.Sc. Computer Science', 'Computer Science'),
    ('B.A. English', 'English')
) AS published_courses(course_name, department)
WHERE colleges.slug = 'mano-college'
  AND NOT EXISTS (
    SELECT 1 FROM courses existing
    WHERE existing.college_id = colleges.id AND existing.name = published_courses.course_name
  );

INSERT INTO admissions (college_id, process, eligibility, required_documents, application_process, contact_info)
SELECT id,
       'Applications are handled by the college and the applicable university or state admission process.',
       'Programme-specific eligibility applies. Contact the college for the current prospectus.',
       'Typically required documents include academic mark sheets, transfer certificate, conduct certificate and applicable category certificates.',
       'Check the official college or university notice for the current academic year.',
       phone
FROM colleges
WHERE district = 'Tenkasi'
  AND NOT EXISTS (SELECT 1 FROM admissions existing WHERE existing.college_id = colleges.id);
