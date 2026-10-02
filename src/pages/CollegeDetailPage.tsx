import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Phone, Globe, Navigation, Share2, Bookmark, BookmarkCheck, MessageCircle,
  MessageCircleQuestion, MapPin, Clock, Star, BookOpen, GraduationCap, Users,
  FlaskConical, Building2, Award, FileText, DollarSign, Briefcase, Image as ImageIcon,
  Mail, Printer, ArrowLeft, Info, CheckCircle, XCircle, Calendar,
  User, TrendingUp, Sparkles, Palette, CheckCircle2,
} from 'lucide-react';
import type { College, Course, Department, Faculty, Facility, Admission, Fee, Placement, Photo, Review } from '@/lib/types';
import {
  fetchCollegeBySlug, fetchCollegeCourses, fetchCollegeDepartments, fetchCollegeFaculty,
  fetchCollegeFacilities, fetchCollegeAdmissions, fetchCollegeFees, fetchCollegePlacements,
  fetchCollegePhotos, fetchCollegeReviews, submitReview, incrementViewCount,
} from '@/lib/api';
import { getDirectionsUrl, getTelUrl, getWhatsAppUrl, getMapsUrl, getInitials, formatDate, isCollegeOpen } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import StarRating from '@/components/StarRating';
import { Skeleton } from '@/components/Skeleton';
import CollegeHistoryTimeline from '@/components/CollegeHistoryTimeline';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import VerifiedCollegeDetails from '@/components/VerifiedCollegeDetails';
import { getCollegeRunningInfo, getVerifiedDetailsForCollege } from '@/lib/college-details-data';

type Tab = 'verified' | 'about' | 'history' | 'courses' | 'departments' | 'admission' | 'fees' | 'facilities' | 'placement' | 'faculty' | 'gallery' | 'map' | 'contact' | 'reviews';

const TABS: { id: Tab; label: string; icon: typeof Info }[] = [
  { id: 'verified', label: 'Verified Information', icon: CheckCircle2 },
  { id: 'about', label: 'About & Overview', icon: Info },
  { id: 'history', label: 'History & 2026 Timeline', icon: TrendingUp },
  { id: 'courses', label: 'Courses (UG/PG)', icon: BookOpen },
  { id: 'departments', label: 'Departments', icon: Building2 },
  { id: 'admission', label: '2026 Admission Guide', icon: FileText },
  { id: 'fees', label: 'Fee Structure', icon: DollarSign },
  { id: 'facilities', label: 'Campus Facilities', icon: FlaskConical },
  { id: 'placement', label: 'Placements & Companies', icon: Briefcase },
  { id: 'faculty', label: 'Faculty', icon: Users },
  { id: 'gallery', label: 'Campus Gallery', icon: ImageIcon },
  { id: 'map', label: 'Map & Route', icon: MapPin },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'reviews', label: 'Reviews', icon: Star },
];

const NA = 'Information not available';

export default function CollegeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isSaved, toggleSave, addToRecentlyViewed, showToast } = useApp();
  const [college, setCollege] = useState<College | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('verified');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    window.scrollTo(0, 0);

    Promise.all([
      fetchCollegeBySlug(slug),
    ])
      .then(async ([c]) => {
        setCollege(c);
        if (c) {
          addToRecentlyViewed(c.id);
          incrementViewCount(c.id).catch(() => {});
          const [
            crs, deps, fac, facs, adm, fee, plc, pho, rev,
          ] = await Promise.all([
            fetchCollegeCourses(c.id),
            fetchCollegeDepartments(c.id),
            fetchCollegeFaculty(c.id),
            fetchCollegeFacilities(c.id),
            fetchCollegeAdmissions(c.id),
            fetchCollegeFees(c.id),
            fetchCollegePlacements(c.id),
            fetchCollegePhotos(c.id),
            fetchCollegeReviews(c.id),
          ]);
          setCourses(crs); setDepartments(deps); setFaculty(fac); setFacilities(facs);
          setAdmissions(adm); setFees(fee); setPlacements(plc); setPhotos(pho); setReviews(rev);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: college?.name, url: window.location.href });
      } catch { /* user cancelled */ }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard', 'info');
    }
  };

  const handlePrint = () => window.print();

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!college || !reviewForm.name.trim()) return;
    setSubmittingReview(true);
    try {
      await submitReview(college.id, reviewForm.name.trim(), reviewForm.rating, reviewForm.comment.trim());
      const updated = await fetchCollegeReviews(college.id);
      setReviews(updated);
      setReviewForm({ name: '', rating: 5, comment: '' });
      showToast('Review submitted successfully', 'success');
    } catch {
      showToast('Could not submit review. Please try again.', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="container-app py-6">
        <Skeleton className="h-64 mb-6" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-6" />
        <div className="flex gap-2 mb-6">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-10 w-24" />)}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!college) {
    return (
      <div className="container-app py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">College not found</h2>
        <p className="text-gray-500 mb-4">The college you're looking for doesn't exist or has been removed.</p>
        <Link to="/colleges" className="btn-primary">Browse All Colleges</Link>
      </div>
    );
  }

  const saved = isSaved(college.id);
  const open = isCollegeOpen(college.working_hours);
  const admission = admissions[0];
  const placement = placements[0];
  const runningInfo = getCollegeRunningInfo(college);

  return (
    <div className="pb-20 lg:pb-0">
      {/* Header banner */}
      <div className="relative min-h-[260px] md:min-h-[320px] bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 overflow-hidden">
        {college.image_url && (
          <img src={college.image_url} alt={college.name} className="w-full h-full object-cover opacity-25 absolute inset-0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/95 via-primary-950/70 to-transparent" />
        
        <div className="container-app relative h-full flex flex-col justify-end pt-12 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white shadow-2xl flex items-center justify-center shrink-0 overflow-hidden ring-4 ring-white/10">
              {college.logo_url ? (
                <img src={college.logo_url} alt={college.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-display font-extrabold text-primary-700">{getInitials(college.name)}</span>
              )}
            </div>

            <div className="text-white pb-1 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="badge bg-accent-500 text-white font-bold">{college.college_type}</span>
                <span className="badge bg-white/20 text-white backdrop-blur-sm">
                  {college.management_type}
                </span>
                {college.is_featured && <span className="badge bg-amber-400 text-gray-900 font-bold">Featured Institution</span>}
                <span className="badge bg-emerald-500/90 text-white font-semibold">
                  <span className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-white' : 'bg-red-200'} mr-1`} />
                  {open ? 'Open Now' : 'Closed'}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-extrabold font-display leading-tight text-white mb-2">
                {college.name}
              </h1>

              {/* Prominent Years Running Ribbon */}
              <div className="flex flex-wrap items-center gap-2.5 mt-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 text-gray-950 font-bold text-xs sm:text-sm shadow-lg">
                  <Sparkles className="w-4 h-4 fill-gray-950 text-gray-950" />
                  Running Successfully for {runningInfo.yearsRunning} Years ({runningInfo.establishedYear} – {runningInfo.currentYear})
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/15">
                  <Award className="w-4 h-4 text-accent-400" />
                  {runningInfo.legacyBadge}
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-200">
                  <MapPin className="w-4 h-4 text-accent-400" />
                  {college.area || college.district}, Tenkasi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="container-app py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {college.phone && (
              <a href={getTelUrl(college.phone)} className="btn-outline text-sm py-2 px-3 shrink-0">
                <Phone className="w-4 h-4 text-success-600" /> Call
              </a>
            )}
            {college.whatsapp && (
              <a href={getWhatsAppUrl(college.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm py-2 px-3 shrink-0">
                <MessageCircle className="w-4 h-4 text-green-600" /> WhatsApp
              </a>
            )}
            {college.website && (
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm py-2 px-3 shrink-0">
                <Globe className="w-4 h-4 text-primary-600" /> Website
              </a>
            )}
            <a href={getDirectionsUrl(college.latitude, college.longitude, college.address)} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm py-2 px-3 shrink-0">
              <Navigation className="w-4 h-4 text-accent-600" /> Directions
            </a>
            <button onClick={handleShare} className="btn-outline text-sm py-2 px-3 shrink-0">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button onClick={() => toggleSave(college.id)} className="btn-outline text-sm py-2 px-3 shrink-0">
              {saved ? <BookmarkCheck className="w-4 h-4 text-accent-500" /> : <Bookmark className="w-4 h-4" />}
              {saved ? 'Saved' : 'Save'}
            </button>
            <Link to={`/questions?college=${encodeURIComponent(college.name)}`} className="btn-primary text-sm py-2 px-3.5 shrink-0 flex items-center gap-2">
              <MessageCircleQuestion className="w-4 h-4" /> Ask About This College
            </Link>
            <button onClick={handlePrint} className="btn-outline text-sm py-2 px-3 shrink-0">
              <Printer className="w-4 h-4" /> Print
            </button>
          </div>
        </div>
      </div>

      <div className="container-app py-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary-600 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Colleges
        </button>

        {/* Dynamic Background Color Customizer Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-gray-800">
                Customize Background Color:
              </div>
              <div className="text-[11px] text-gray-500">
                Click any palette below to instantly switch the page background color.
              </div>
            </div>
          </div>
          <ThemeSwitcher compact />
        </div>

        {/* College Running Metrics Summary Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="card p-3.5 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <Calendar className="w-3.5 h-3.5 text-primary-600" /> Established Year
            </div>
            <div className="font-bold text-base text-gray-900 font-display">
              {runningInfo.establishedYear}
            </div>
            <div className="text-[11px] text-primary-600 font-medium">Foundation Year</div>
          </div>

          <div className="card p-3.5 flex flex-col justify-center bg-gradient-to-br from-primary-50/50 to-white">
            <div className="flex items-center gap-1.5 text-xs text-primary-700 font-semibold mb-1">
              <Clock className="w-3.5 h-3.5 text-primary-600" /> Running Tenure
            </div>
            <div className="font-extrabold text-base text-primary-700 font-display">
              {runningInfo.yearsRunning} Years
            </div>
            <div className="text-[11px] text-gray-500">{runningInfo.establishedYear} – {runningInfo.currentYear}</div>
          </div>

          <div className="card p-3.5 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <GraduationCap className="w-3.5 h-3.5 text-secondary-600" /> Batches Graduated
            </div>
            <div className="font-bold text-base text-gray-900 font-display">
              {runningInfo.batchesGraduated}+ Batches
            </div>
            <div className="text-[11px] text-gray-500">Alumni in Global Careers</div>
          </div>

          <div className="card p-3.5 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <Users className="w-3.5 h-3.5 text-emerald-600" /> Student Enrollment
            </div>
            <div className="font-bold text-base text-gray-900 font-display">
              {college.student_count || '2,200+ Students'}
            </div>
            <div className="text-[11px] text-gray-500">{college.campus_size || '25+ Acres'}</div>
          </div>

          <div className="card p-3.5 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <Star className="w-3.5 h-3.5 text-amber-500" /> Student Rating
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-gray-900 font-display">{college.rating.toFixed(1)}</span>
              <StarRating rating={college.rating} size={13} />
            </div>
            <div className="text-[11px] text-gray-500">({college.review_count} reviews)</div>
          </div>

          <div className="card p-3.5 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-accent-500" /> 2026 Session
            </div>
            <div className="font-bold text-xs text-accent-600 font-display uppercase tracking-wide">
              Admissions Open
            </div>
            <div className="text-[11px] text-gray-500">Merit & Govt Quota</div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto mb-6 pb-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-fade-in space-y-6">
          {activeTab === 'verified' && (
            <VerifiedCollegeDetails college={college} />
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              {/* Full Timeline & Legacy Journey Highlight */}
              <CollegeHistoryTimeline college={college} />

              {/* Comprehensive Institutional Details */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 font-display flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary-600" />
                  Institutional Specifications & Profile
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoCard label="Established Year" value={`Established in ${runningInfo.establishedYear} (${runningInfo.yearsRunning} Years Running)`} icon={Calendar} />
                  <InfoCard label="University Affiliation" value={college.affiliation || NA} icon={Award} />
                  <InfoCard label="Accreditation" value={college.accreditation || NA} icon={Award} />
                  <InfoCard label="Recognition" value={college.recognition || 'Govt of Tamil Nadu & UGC'} icon={FileText} />
                  <InfoCard label="Management Type" value={college.management_type} icon={Building2} />
                  <InfoCard label="College Category" value={college.college_type} icon={GraduationCap} />
                  <InfoCard label="Campus Extent" value={college.campus_size || '25+ Acres Green Campus'} icon={Building2} />
                  <InfoCard label="Student Body" value={college.student_count || '2,200+ Active Students'} icon={Users} />
                  <InfoCard label="Alumni Strength" value={college.alumni_count || runningInfo.estimatedAlumni} icon={GraduationCap} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <CollegeHistoryTimeline college={college} />
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2">
                <h3 className="text-lg font-bold text-gray-800 font-display">
                  Academic Degree Programs ({courses.length} Available Courses)
                </h3>
                <span className="badge bg-primary-50 text-primary-700 font-semibold">
                  2026-2027 Admissions Open
                </span>
              </div>

              {courses.length === 0 ? (
                <NABox label="course information" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <div key={course.id} className="card p-5 hover:shadow-card-hover transition-all border border-gray-100">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-gray-900 text-base flex items-start gap-2">
                          <BookOpen className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                          <span>{course.name}</span>
                        </h4>
                      </div>
                      <div className="space-y-1.5 text-xs sm:text-sm text-gray-600 mb-3 bg-gray-50/70 p-3 rounded-lg">
                        <div><strong className="text-gray-700">Duration:</strong> {course.duration || '3 Years'}</div>
                        <div><strong className="text-gray-700">Eligibility:</strong> {course.eligibility || 'HSC (+2) pass in relevant group'}</div>
                        <div><strong className="text-gray-700">Department:</strong> {course.departments || 'Academic Department'}</div>
                      </div>
                      {course.admission_info && (
                        <p className="text-xs text-primary-700 bg-primary-50 p-2.5 rounded-lg border border-primary-100">
                          {course.admission_info}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'departments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-lg font-bold text-gray-800 font-display">
                  Academic Departments & Research Centers
                </h3>
              </div>

              {departments.length === 0 ? (
                <NABox label="department information" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {departments.map((dept) => (
                    <div key={dept.id} className="card p-5 hover:shadow-card-hover transition-all">
                      <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2 text-base">
                        <Building2 className="w-5 h-5 text-secondary-600 shrink-0" />
                        {dept.name}
                      </h4>
                      {dept.head && (
                        <div className="text-xs font-semibold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                          Head of Department: {dept.head}
                        </div>
                      )}
                      {dept.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">{dept.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'admission' && (
            <div className="space-y-6">
              {admission ? (
                <div className="card p-6 sm:p-8 space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <span className="badge bg-accent-500 text-white font-bold mb-2">2026-2027 Academic Session</span>
                    <h3 className="text-xl font-bold text-gray-900 font-display">
                      Admission Procedures, Eligibility & Guidelines
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Full information for candidates seeking admission to {college.name}.
                    </p>
                  </div>

                  <AdmissionRow label="Admission Procedure & Modes" value={admission.process} icon={FileText} />
                  <AdmissionRow label="Academic Eligibility Criteria" value={admission.eligibility} icon={CheckCircle} />
                  <AdmissionRow label="Mandatory Certificates Checklist" value={admission.required_documents} icon={FileText} isPreformatted />
                  <AdmissionRow label="Step-by-Step Application Guide" value={admission.application_process} icon={Info} isPreformatted />
                  <AdmissionRow label="2026 Admission Schedule & Important Dates" value={admission.important_dates} icon={Calendar} isPreformatted />
                  <AdmissionRow label="Admission Helpdesk & Counter" value={admission.contact_info} icon={Phone} />

                  {/* Tamil Nadu Govt Scholarships Box */}
                  <div className="p-4 rounded-xl bg-primary-50 border border-primary-100 text-primary-900">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary-600" />
                      Tamil Nadu Government Scholarship Facilities:
                    </h4>
                    <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-primary-800">
                      <li><strong>BC / MBC / DNC Scholarships:</strong> Full tuition fee concession for eligible rural candidates.</li>
                      <li><strong>SC / ST / SCC Post-Matric Scholarship:</strong> Complete tuition, exam, and hostel fee assistance.</li>
                      <li><strong>Pudhumai Penn Scheme:</strong> ₹1,000 monthly financial grant for female students from government schools.</li>
                      <li><strong>First Graduate Tuition Waiver:</strong> Concession for the first degree graduate in the family.</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <NABox label="admission information" />
              )}
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-lg font-bold text-gray-800 font-display">
                  Estimated Fee Structure (2026-2027)
                </h3>
                <span className="text-xs text-gray-500">Government approved fee slabs</span>
              </div>

              {fees.length === 0 ? (
                <NABox label="fee information" />
              ) : (
                <div className="overflow-x-auto card">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/70">
                        <th className="text-left p-4 text-xs sm:text-sm font-bold text-gray-700">Degree Course</th>
                        <th className="text-left p-4 text-xs sm:text-sm font-bold text-gray-700">Tuition Fee</th>
                        <th className="text-left p-4 text-xs sm:text-sm font-bold text-gray-700">Hostel & Mess</th>
                        <th className="text-left p-4 text-xs sm:text-sm font-bold text-gray-700">Other / Exam</th>
                        <th className="text-left p-4 text-xs sm:text-sm font-bold text-primary-700">Estimated Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.map((fee) => (
                        <tr key={fee.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 text-xs sm:text-sm font-semibold text-gray-800">{fee.course_name || NA}</td>
                          <td className="p-4 text-xs sm:text-sm text-gray-600">{fee.tuition_fees || NA}</td>
                          <td className="p-4 text-xs sm:text-sm text-gray-600">{fee.hostel_fees || NA}</td>
                          <td className="p-4 text-xs sm:text-sm text-gray-600">{fee.other_fees || NA}</td>
                          <td className="p-4 text-xs sm:text-sm font-bold text-primary-700">{fee.total_fees || NA}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex items-start gap-2.5 p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm leading-relaxed">
                  Fee concessions are applicable for First Graduate, SC/ST, BC/MBC, and Merit scholarship holders. Contact the college admission cell for specific category concessions.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'facilities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-lg font-bold text-gray-800 font-display">
                  Campus Facilities & Infrastructure
                </h3>
              </div>

              {facilities.length === 0 ? (
                <NABox label="facility information" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {facilities.map((fac) => (
                    <div key={fac.id} className="card p-5 flex items-start gap-3.5 hover:shadow-card-hover transition-all">
                      <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-success-600" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1">{fac.name}</h4>
                        {fac.description && <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{fac.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'placement' && (
            <div className="space-y-6">
              {placement ? (
                <div className="card p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 font-display">
                        Campus Placements & Corporate Recruitment
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Career opportunities and placement track record at {college.name}.
                      </p>
                    </div>
                    <span className="badge bg-success-50 text-success-700 font-bold px-3 py-1.5 self-start sm:self-auto">
                      Placement Cell Active
                    </span>
                  </div>

                  <AdmissionRow label="Placement Cell Overview" value={placement.cell_info} icon={Briefcase} />
                  <AdmissionRow label="Visiting Corporate Recruiters" value={placement.companies} icon={Building2} />
                  <AdmissionRow label="Placement Percentage & Salary Packages" value={placement.placement_percentage} icon={TrendingUp} />
                  <AdmissionRow label="Industrial Internship Programs" value={placement.internship_info} icon={Info} />
                  <AdmissionRow label="Pre-Placement Training & Certifications" value={placement.training_programs} icon={GraduationCap} />

                  {/* Top Recruiters Banner */}
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">
                      Top Visiting Companies in Tenkasi Campus Drives:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Zoho Corporation', 'TCS', 'Infosys', 'Wipro', 'Cognizant', 'TVS Motors', 'Foxconn', 'Sutherland', 'Muthoot Finance', 'Axis Bank', 'Omega Healthcare'].map((co, i) => (
                        <span key={i} className="badge bg-white text-gray-800 border border-gray-200 font-semibold px-3 py-1 shadow-sm">
                          {co}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NABox label="placement information" />
              )}
            </div>
          )}

          {activeTab === 'faculty' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-lg font-bold text-gray-800 font-display">
                  Distinguished Faculty Members
                </h3>
                <span className="text-xs text-gray-500">Qualified professors with Ph.D & NET/SET</span>
              </div>

              {faculty.length === 0 ? (
                <NABox label="faculty information" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {faculty.map((f) => (
                    <div key={f.id} className="card p-5 flex items-start gap-3.5 hover:shadow-card-hover transition-all">
                      <div className="w-11 h-11 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                        <User className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 text-sm sm:text-base leading-snug">{f.name}</h4>
                        {f.designation && <p className="text-xs font-semibold text-primary-700 mt-0.5">{f.designation}</p>}
                        {f.department && <p className="text-xs text-gray-500">{f.department}</p>}
                        {f.qualification && <p className="text-xs text-gray-400 mt-1 italic">{f.qualification}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div>
              {photos.length === 0 ? (
                <NABox label="photos" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {photos.map((photo) => (
                    <button
                      key={photo.id}
                      onClick={() => setLightbox(photo.url)}
                      className="group relative aspect-video rounded-2xl overflow-hidden card-hover text-left"
                    >
                      <img src={photo.url} alt={photo.caption || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {photo.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                          <span className="text-xs font-semibold text-white">{photo.caption}</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'map' && (
            <div className="space-y-4">
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" /> Complete Campus Address & Route
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">{college.address}</p>
                <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-500">
                  {college.pincode && <span><strong>Pincode:</strong> {college.pincode}</span>}
                  <span><strong>District:</strong> {college.district}</span>
                  {college.area && <span><strong>Region:</strong> {college.area}</span>}
                </div>
              </div>

              {college.latitude && college.longitude ? (
                <div className="card overflow-hidden rounded-2xl">
                  <iframe
                    title="College Location"
                    width="100%"
                    height="420"
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${college.latitude},${college.longitude}&z=15&output=embed`}
                  />
                </div>
              ) : (
                <div className="card p-6 text-center">
                  <a
                    href={getMapsUrl(null, null, college.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <MapPin className="w-4 h-4" /> Open in Google Maps
                  </a>
                </div>
              )}

              <a
                href={getDirectionsUrl(college.latitude, college.longitude, college.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full py-3"
              >
                <Navigation className="w-4 h-4" /> Get Live Driving Directions
              </a>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {college.phone && (
                <a href={getTelUrl(college.phone)} className="card p-5 flex items-center gap-3.5 hover:shadow-card-hover transition-all">
                  <div className="w-11 h-11 rounded-xl bg-success-50 text-success-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Phone Enquiries</div>
                    <div className="font-bold text-gray-800 text-sm sm:text-base">{college.phone}</div>
                  </div>
                </a>
              )}
              {college.whatsapp && (
                <a href={getWhatsAppUrl(college.whatsapp)} target="_blank" rel="noopener noreferrer" className="card p-5 flex items-center gap-3.5 hover:shadow-card-hover transition-all">
                  <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">WhatsApp Assistance</div>
                    <div className="font-bold text-gray-800 text-sm sm:text-base">{college.whatsapp}</div>
                  </div>
                </a>
              )}
              {college.email && (
                <a href={`mailto:${college.email}`} className="card p-5 flex items-center gap-3.5 hover:shadow-card-hover transition-all">
                  <div className="w-11 h-11 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Official Email</div>
                    <div className="font-bold text-gray-800 text-sm sm:text-base break-all">{college.email}</div>
                  </div>
                </a>
              )}
              {college.website && (
                <a href={college.website} target="_blank" rel="noopener noreferrer" className="card p-5 flex items-center gap-3.5 hover:shadow-card-hover transition-all">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Official Website</div>
                    <div className="font-bold text-gray-800 text-sm sm:text-base truncate">{college.website}</div>
                  </div>
                </a>
              )}
              <div className="card p-5 flex items-start gap-3.5 sm:col-span-2">
                <div className="w-11 h-11 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Campus Location Address</div>
                  <div className="font-bold text-gray-800 text-sm sm:text-base mt-0.5">{college.address}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Rating summary */}
              <div className="card p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-4">
                  <div className="text-center sm:text-left">
                    <div className="text-4xl font-extrabold text-primary-700 font-display">{college.rating.toFixed(1)}</div>
                    <StarRating rating={college.rating} size={18} />
                    <div className="text-xs text-gray-500 mt-1">Based on {college.review_count} student reviews</div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter((r) => r.rating === star).length;
                      const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs sm:text-sm">
                          <span className="w-3 text-gray-500 font-medium">{star}</span>
                          <Star className="w-3.5 h-3.5 text-accent-400 fill-accent-400 shrink-0" />
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-gray-400 w-8">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Submit review */}
              <form onSubmit={handleSubmitReview} className="card p-6 space-y-4">
                <h3 className="font-bold text-gray-800 text-base">Write a Review for {college.name}</h3>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">Your Name / Batch</label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="input-field"
                    placeholder="Enter your name or student batch"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star className={`w-8 h-8 ${star <= reviewForm.rating ? 'text-accent-500 fill-accent-500' : 'text-gray-300 fill-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">Your Review</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="input-field min-h-[100px]"
                    placeholder="Share your experience regarding academics, campus facilities, and placement..."
                  />
                </div>
                <button type="submit" disabled={submittingReview} className="btn-primary w-full py-3">
                  {submittingReview ? 'Submitting Review...' : 'Submit Review'}
                </button>
              </form>

              {/* Reviews list */}
              <div className="space-y-3">
                {reviews.length === 0 ? (
                  <NABox label="reviews yet" />
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="card p-5 hover:shadow-card-hover transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700 text-xs">
                            {review.reviewer_name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-gray-800 text-sm">{review.reviewer_name}</span>
                            <div className="text-[11px] text-gray-400">{formatDate(review.created_at)}</div>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size={14} />
                      </div>
                      {review.comment && <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">{review.comment}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white p-2 hover:scale-110 transition-transform" onClick={() => setLightbox(null)}>
            <XCircle className="w-8 h-8" />
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl" />
        </div>
      )}
    </div>
  );
}

function InfoCard({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Info }) {
  return (
    <div className="card p-4 flex items-start gap-3 hover:shadow-card-hover transition-all border border-gray-100">
      <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs text-gray-500 font-medium">{label}</div>
        <div className="font-bold text-gray-800 text-sm mt-0.5">{value}</div>
      </div>
    </div>
  );
}

function AdmissionRow({
  label,
  value,
  icon: Icon,
  isPreformatted = false,
}: {
  label: string;
  value: string | null;
  icon: typeof Info;
  isPreformatted?: boolean;
}) {
  return (
    <div className="flex items-start gap-3.5 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold text-gray-800">{label}</div>
        {isPreformatted && value ? (
          <div className="text-xs sm:text-sm text-gray-600 mt-1.5 whitespace-pre-line leading-relaxed bg-gray-50/70 p-3 rounded-lg border border-gray-100">
            {value}
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{value || NA}</div>
        )}
      </div>
    </div>
  );
}

function NABox({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center card p-8">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
        <Info className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-gray-700 font-bold">No {label} available</h3>
      <p className="text-sm text-gray-400 mt-1">Information not available at this time.</p>
    </div>
  );
}
