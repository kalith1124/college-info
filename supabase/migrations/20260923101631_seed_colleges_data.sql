/*
# Seed Initial College Data

## Overview
Inserts 8 college records based on provided screenshots for the Tenkasi district area.
Only information confirmed from the screenshots is included. Missing fields are left NULL
and the UI will display "Information not available" for those fields.

## Colleges Inserted
1. St. Mary's Institute of Pharmacy - Puliyangudi/Kadayanallur
2. Shanmuga Arts and Science College - Pogai
3. Manonmaniam Sundaranar University College - Naduvakkurichi
4. S. Thangapazham Agricultural College - Vasudevanallur/Naranapuram
5. S. Veerasamy Chettiar College of Engineering and Technology - Puliyangudi
6. Mano College - Puliyangudi
7. Vyasa Arts & Science Women's College - Vasudevanallur
8. Annai Meenakshi College - Puliyangudi

## Notes
- Ratings and review counts are reference data from screenshots, NOT live Google ratings.
- Coordinates are approximate based on the known locations/areas.
- No course, fee, accreditation, or placement data is invented.
*/

INSERT INTO colleges (name, slug, college_type, description, address, area, district, pincode, latitude, longitude, phone, whatsapp, rating, review_count, is_featured, is_active) VALUES
(
  'St. Mary''s Institute of Pharmacy',
  'st-marys-institute-of-pharmacy',
  'Pharmacy',
  NULL,
  '11, Madurai Main Road, Chinthamani, Puliangudi, Kadayanallur (TK), Tenkasi, Tamil Nadu 627855',
  'Puliyangudi',
  'Tenkasi',
  '627855',
  8.9640,
  77.3890,
  '078452 64333',
  NULL,
  0,
  0,
  false,
  true
),
(
  'Shanmuga Arts and Science College',
  'shanmuga-arts-and-science-college',
  'Arts & Science',
  NULL,
  '4FQR+Q33, Pogai, Tamil Nadu 627862',
  'Pogai',
  'Tenkasi',
  '627862',
  9.0160,
  77.4380,
  NULL,
  NULL,
  3.7,
  16,
  false,
  true
),
(
  'Manonmaniam Sundaranar University College',
  'manonmaniam-sundaranar-university-college',
  'Arts & Science',
  NULL,
  'Sankarankovil - Virasigamani Road, Naduvakkurichi, Tamil Nadu 627862',
  'Naduvakkurichi',
  'Tenkasi',
  '627862',
  9.0380,
  77.4150,
  NULL,
  NULL,
  4.6,
  21,
  true,
  true
),
(
  'S. Thangapazham Agricultural College',
  's-thangapazham-agricultural-college',
  'Agriculture',
  NULL,
  'Vasudevanallur, Naranapuram, Tamil Nadu 627760',
  'Vasudevanallur',
  'Tenkasi',
  '627760',
  9.0490,
  77.3420,
  '099428 52100',
  NULL,
  3.6,
  94,
  true,
  true
),
(
  'S. Veerasamy Chettiar College of Engineering and Technology',
  's-veerasamy-chettiar-college-of-engineering-and-technology',
  'Engineering',
  NULL,
  'S V Nagar, Puliyangudi, Tamil Nadu 627855',
  'Puliyangudi',
  'Tenkasi',
  '627855',
  8.9680,
  77.3850,
  '04636 234 742',
  NULL,
  3.6,
  139,
  true,
  true
),
(
  'Mano College',
  'mano-college',
  'Arts & Science',
  NULL,
  'HNUC Higher Secondary School, T.N. Puthukudi, Puliyangudi, Tamil Nadu 627855',
  'Puliyangudi',
  'Tenkasi',
  '627855',
  8.9650,
  77.3920,
  '0462 233 3741',
  NULL,
  3.9,
  39,
  false,
  true
),
(
  'Vyasa Arts & Science Women''s College',
  'vyasa-arts-and-science-womens-college',
  'Women''s College',
  NULL,
  'Madurai - Tenkasi Road, Subramaniapuram, Vellanaikottai Post, Vasudevanallur, Tamil Nadu',
  'Vasudevanallur',
  'Tenkasi',
  '627760',
  9.0520,
  77.3500,
  '04636 242 415',
  NULL,
  4.2,
  69,
  true,
  true
),
(
  'Annai Meenakshi College',
  'annai-meenakshi-college',
  'Arts & Science',
  NULL,
  '70, Pambu Kovil Santhai Road, Puliyangudi, Tamil Nadu 627855',
  'Puliyangudi',
  'Tenkasi',
  '627855',
  8.9620,
  77.3880,
  '094433 81380',
  NULL,
  4.0,
  23,
  false,
  true
)
ON CONFLICT (slug) DO NOTHING;
