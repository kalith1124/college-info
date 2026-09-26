import { supabase } from '@/lib/supabase';
import { TENKASI_COLLEGES, TENKASI_COLLEGE_LOOKUP } from '@/lib/tenkasi-colleges';
import type { College, Course, Department, Faculty, Facility, Admission, Fee, Placement, Photo, Review } from '@/lib/types';

const fallbackColleges = () => [...TENKASI_COLLEGES].sort((a, b) => Number(b.is_featured) - Number(a.is_featured) || b.rating - a.rating);

export async function fetchColleges(): Promise<College[]> {
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('rating', { ascending: false });

    if (!error && data && data.length > 0) {
      const existingSlugs = new Set(data.map((item) => item.slug));
      const dbColleges: College[] = data.map((item) => {
        const fb = TENKASI_COLLEGE_LOOKUP.get(item.slug);
        if (!fb) return item as College;
        return {
          ...fb,
          ...item,
          image_url: item.image_url ?? fb.image_url,
          established_year: item.established_year ?? fb.established_year,
          description: item.description ?? fb.description,
          affiliation: item.affiliation ?? fb.affiliation,
        };
      });
      const extraLocal = TENKASI_COLLEGES.filter((c) => !existingSlugs.has(c.slug));
      return [...dbColleges, ...extraLocal].sort(
        (a, b) => Number(b.is_featured) - Number(a.is_featured) || b.rating - a.rating
      );
    }
  } catch {
    return fallbackColleges();
  }

  return fallbackColleges();
}

export async function fetchCollegeBySlug(slug: string): Promise<College | null> {
  const fallback = TENKASI_COLLEGE_LOOKUP.get(slug) ?? null;
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (!error && data) {
      if (fallback) {
        return {
          ...fallback,
          ...data,
          established_year: data.established_year ?? fallback.established_year,
          description: data.description ?? fallback.description,
          affiliation: data.affiliation ?? fallback.affiliation,
          accreditation: data.accreditation ?? fallback.accreditation,
          recognition: data.recognition ?? fallback.recognition,
          website: data.website ?? fallback.website,
          phone: data.phone ?? fallback.phone,
        };
      }
      return data as College;
    }
  } catch {
    // fallback
  }

  return fallback;
}

import {
  getFullCoursesForCollege,
  getFullDepartmentsForCollege,
  getFullFacultyForCollege,
  getFullFacilitiesForCollege,
  getFullAdmissionForCollege,
  getFullFeesForCollege,
  getFullPlacementForCollege,
  getFullPhotosForCollege,
  getFullReviewsForCollege,
} from '@/lib/college-details-data';

const getCollegeById = (collegeId: string): College | undefined => {
  return TENKASI_COLLEGE_LOOKUP.get(collegeId) || TENKASI_COLLEGES.find((c) => c.id === collegeId || c.slug === collegeId);
};

export async function fetchCollegeCourses(collegeId: string): Promise<Course[]> {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('college_id', collegeId)
      .order('name');

    if (!error && data && data.length > 0) return data;
  } catch {
    // fallback
  }

  const college = getCollegeById(collegeId);
  return college ? getFullCoursesForCollege(college) : [];
}

export async function fetchCollegeDepartments(collegeId: string): Promise<Department[]> {
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('college_id', collegeId)
      .order('name');

    if (!error && data && data.length > 0) return data;
  } catch {
    // fallback
  }

  const college = getCollegeById(collegeId);
  return college ? getFullDepartmentsForCollege(college) : [];
}

export async function fetchCollegeFaculty(collegeId: string): Promise<Faculty[]> {
  try {
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .eq('college_id', collegeId)
      .order('name');

    if (!error && data && data.length > 0) return data;
  } catch {
    // fallback
  }

  const college = getCollegeById(collegeId);
  return college ? getFullFacultyForCollege(college) : [];
}

export async function fetchCollegeFacilities(collegeId: string): Promise<Facility[]> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('college_id', collegeId)
      .order('name');

    if (!error && data && data.length > 0) return data;
  } catch {
    // fallback
  }

  const college = getCollegeById(collegeId);
  return college ? getFullFacilitiesForCollege(college) : [];
}

export async function fetchCollegeAdmissions(collegeId: string): Promise<Admission[]> {
  try {
    const { data, error } = await supabase
      .from('admissions')
      .select('*')
      .eq('college_id', collegeId);

    if (!error && data && data.length > 0) return data;
  } catch {
    // fallback
  }

  const college = getCollegeById(collegeId);
  return college ? [getFullAdmissionForCollege(college)] : [];
}

export async function fetchCollegeFees(collegeId: string): Promise<Fee[]> {
  try {
    const { data, error } = await supabase
      .from('fees')
      .select('*')
      .eq('college_id', collegeId)
      .order('course_name');

    if (!error && data && data.length > 0) return data;
  } catch {
    // fallback
  }

  const college = getCollegeById(collegeId);
  return college ? getFullFeesForCollege(college) : [];
}

export async function fetchCollegePlacements(collegeId: string): Promise<Placement[]> {
  try {
    const { data, error } = await supabase
      .from('placements')
      .select('*')
      .eq('college_id', collegeId);

    if (!error && data && data.length > 0) return data;
  } catch {
    // fallback
  }

  const college = getCollegeById(collegeId);
  return college ? [getFullPlacementForCollege(college)] : [];
}

export async function fetchCollegePhotos(collegeId: string): Promise<Photo[]> {
  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('college_id', collegeId)
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) return data;
  } catch {
    // fallback
  }

  const college = getCollegeById(collegeId);
  return college ? getFullPhotosForCollege(college) : [];
}

export async function fetchCollegeReviews(collegeId: string): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('college_id', collegeId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) return data;
  } catch {
    // fallback
  }

  const college = getCollegeById(collegeId);
  return college ? getFullReviewsForCollege(college) : [];
}

export async function submitReview(
  collegeId: string,
  reviewerName: string,
  rating: number,
  comment: string
): Promise<void> {
  const { error } = await supabase.from('reviews').insert({
    college_id: collegeId,
    reviewer_name: reviewerName,
    rating,
    comment,
    is_approved: true,
  });

  if (error) throw error;
}

export async function incrementViewCount(collegeId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_college_views', { college_id: collegeId });
  if (error) {
    // Fallback: direct update
    await supabase
      .from('colleges')
      .update({ view_count: supabase.rpc('increment_college_views', { college_id: collegeId }) })
      .eq('id', collegeId);
  }
}

export async function fetchSavedColleges(sessionId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('saved_colleges')
    .select('college_id')
    .eq('session_id', sessionId);

  if (error) return [];
  return (data || []).map((row) => row.college_id);
}

export async function toggleSavedCollege(collegeId: string, sessionId: string): Promise<boolean> {
  const { data } = await supabase
    .from('saved_colleges')
    .select('id')
    .eq('college_id', collegeId)
    .eq('session_id', sessionId)
    .maybeSingle();

  if (data) {
    await supabase.from('saved_colleges').delete().eq('id', data.id);
    return false;
  } else {
    await supabase.from('saved_colleges').insert({ college_id: collegeId, session_id: sessionId });
    return true;
  }
}
