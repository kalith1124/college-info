export interface Milestone {
  year: number | string;
  title: string;
  description: string;
  tag?: string;
}

export interface College {
  id: string;
  name: string;
  slug: string;
  college_type: string;
  description: string | null;
  established_year: number | null;
  affiliation: string | null;
  accreditation: string | null;
  recognition: string | null;
  management_type: string;
  logo_url: string | null;
  image_url: string | null;
  address: string;
  district: string;
  area: string | null;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  working_hours: string;
  rating: number;
  review_count: number;
  view_count: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  history?: string | null;
  vision?: string | null;
  mission?: string | null;
  motto?: string | null;
  campus_size?: string | null;
  student_count?: string | null;
  alumni_count?: string | null;
  milestones?: Milestone[];
  highlights?: string[];
  principal_name?: string | null;
}

export interface Course {
  id: string;
  college_id: string;
  name: string;
  duration: string | null;
  eligibility: string | null;
  departments: string | null;
  admission_info: string | null;
}

export interface Department {
  id: string;
  college_id: string;
  name: string;
  head: string | null;
  description: string | null;
}

export interface Faculty {
  id: string;
  college_id: string;
  name: string;
  qualification: string | null;
  designation: string | null;
  department: string | null;
}

export interface Facility {
  id: string;
  college_id: string;
  name: string;
  icon: string | null;
  description: string | null;
  is_available: boolean;
}

export interface Admission {
  id: string;
  college_id: string;
  process: string | null;
  eligibility: string | null;
  required_documents: string | null;
  application_process: string | null;
  important_dates: string | null;
  contact_info: string | null;
}

export interface Fee {
  id: string;
  college_id: string;
  course_name: string | null;
  tuition_fees: string | null;
  hostel_fees: string | null;
  other_fees: string | null;
  total_fees: string | null;
}

export interface Placement {
  id: string;
  college_id: string;
  cell_info: string | null;
  companies: string | null;
  placement_percentage: string | null;
  internship_info: string | null;
  training_programs: string | null;
}

export interface Photo {
  id: string;
  college_id: string;
  url: string;
  caption: string | null;
  category?: string;
  created_at?: string;
}

export interface Review {
  id: string;
  college_id: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  is_approved: boolean;
  created_at: string;
}

export interface SavedCollege {
  id: string;
  college_id: string;
  session_id: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  created_at?: string;
}

export type CollegeType =
  | 'Arts & Science'
  | 'Engineering'
  | 'Pharmacy'
  | 'Agriculture'
  | "Women's College"
  | 'Polytechnic'
  | 'Medical / Allied Health'
  | 'Other';

export const COLLEGE_TYPES: CollegeType[] = [
  'Arts & Science',
  'Engineering',
  'Pharmacy',
  'Agriculture',
  "Women's College",
  'Polytechnic',
  'Medical / Allied Health',
  'Other',
];

export const FACILITY_LIST = [
  'Library',
  'Laboratories',
  'Computer Lab',
  'Wi-Fi',
  'Hostel',
  'Canteen',
  'Transport',
  'Sports',
  'Gym',
  'Auditorium',
  'Smart Classrooms',
  'Medical Facilities',
  'Placement Cell',
];

export const AREAS = [
  'Puliyangudi',
  'Vasudevanallur',
  'Sankarankovil',
  'Kadayanallur',
  'Tenkasi',
  'Pogai',
  'Naduvakkurichi',
  'Naranapuram',
  'Alangulam',
  'Alwarkurichi',
  'Ayikudy',
  'Courtallam',
  'Kodikurichi',
  'Kuruvikulam',
  'Mettur',
  'Sivagiri',
  'Sivalarkulam',
  'Surandai',
  'Melaneelithanallur',
  'Solaiseri',
  'Dharugapuram',
  'Vaikalipatti',
  'Vellalankulam',
  'Vadikottai',
  'Nallur',
  'T. N. Puthukudi',
];

export const DISTRICTS = ['Tenkasi'];
