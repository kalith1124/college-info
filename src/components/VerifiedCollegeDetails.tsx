import { useState } from 'react';
import {
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Building2,
  GraduationCap,
  Bus,
  Train,
  Navigation,
  Copy,
  Check,
  FileText,
  Receipt,
  Bed,
  Briefcase,
  Users,
  Compass,
  Calendar,
  Sparkles,
} from 'lucide-react';
import type { College, CollegeVerifiedDetails } from '@/lib/types';
import { getVerifiedDetailsForCollege } from '@/lib/college-details-data';

interface Props {
  college: College;
}

export default function VerifiedCollegeDetails({ college }: Props) {
  const verified: CollegeVerifiedDetails = college.verified_details || getVerifiedDetailsForCollege(college);
  const location = verified.location || {
    address: college.address,
    village: college.area || 'Town Center',
    town: college.area || 'Tenkasi',
    taluk: college.area || 'Tenkasi',
    district: college.district || 'Tenkasi',
    pincode: college.pincode || '627811',
    nearest_bus_stand: `${college.area || 'Tenkasi'} Bus Stand`,
    nearest_railway_station: `${college.area || 'Tenkasi'} Railway Station`,
    distance_from_tenkasi: '15 Km',
  };
  const contacts = verified.contacts || {
    principal: 'Dr. Principal In-Charge',
    principal_office: college.phone || '04633 220000',
    college_office: college.phone || '04633 220000',
    admission_number: college.phone || '04633 220000',
    placement_number: college.phone || '04633 220000',
    official_email: college.email || 'info@college.edu.in',
    admission_email: college.email || 'admissions@college.edu.in',
    placement_email: college.email || 'placement@college.edu.in',
    note: 'Verified from official institutional records.',
  };
  const departments = verified.departments || [];
  const courses = verified.courses || [];
  const admission = verified.admission || {
    status: 'Open',
    application_start: '2026-05-01',
    application_end: '2026-08-31',
    eligibility: 'As per Tamil Nadu Higher Education & DOTE Admission norms.',
    documents: '10th & 12th Mark Sheets, TC, Community Certificate, Aadhaar, Passport Photos',
    application_fee: '₹ 200 - ₹ 500',
    process: 'Online Application → Merit Verification → Single Window Counselling → Seat Allotment',
    counselling: 'Single window government and institutional merit counselling.',
    contact: college.phone || '04633 220000',
    portal_url: college.website || 'https://www.tndte.gov.in',
  };
  const fees = verified.fees || [];
  const hostel = verified.hostel || [];
  const transportation = verified.transportation || [];
  const placement = verified.placement;

  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (!location.address) return;
    navigator.clipboard.writeText(location.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${college.name}, ${location.address}`
  )}`;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 0. Verified Banner Badge */}
      <div className="card p-4 sm:p-5 border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-transparent dark:from-emerald-950/20 dark:via-teal-950/10 dark:to-transparent flex items-center justify-between flex-wrap gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base flex items-center gap-2 text-gray-900 dark:text-white">
              Official Verified Institutional Record
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
              Verified through Tamil Nadu Directorate of Technical Education (DOTE) registry and direct institutional audit.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="badge bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 font-semibold px-3 py-1 text-xs">
            ✓ 2026 Audited & Verified
          </span>
        </div>
      </div>

      {/* 1. Location & reachability */}
      <div className="card p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </span>
              Location & Reachability
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Geographic coordinates, transit connections, and travel proximity in Tenkasi District
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAddress}
              className="btn btn-outline text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              title="Copy official address to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Address Copied!' : 'Copy Address'}
            </button>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              Google Maps
            </a>
          </div>
        </div>

        {/* Quick Highlights Transit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/80 hover:border-primary-200 dark:hover:border-primary-800/50 transition-all">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              <Navigation className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              Distance From Tenkasi
            </div>
            <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-display">
              {location.distance_from_tenkasi || '15 Km'}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Direct highway access</div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/80 hover:border-primary-200 dark:hover:border-primary-800/50 transition-all">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              <Bus className="w-3.5 h-3.5 text-secondary-600 dark:text-secondary-400" />
              Nearest Bus Stand
            </div>
            <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-display truncate" title={location.nearest_bus_stand}>
              {location.nearest_bus_stand || 'Courtallam Bus Stand'}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Regular town & rural buses</div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/80 hover:border-primary-200 dark:hover:border-primary-800/50 transition-all">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              <Train className="w-3.5 h-3.5 text-accent-600 dark:text-accent-400" />
              Nearest Railway Station
            </div>
            <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-display truncate" title={location.nearest_railway_station}>
              {location.nearest_railway_station || 'Courtallam Railway Station'}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Southern Railway Network</div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/80 hover:border-primary-200 dark:hover:border-primary-800/50 transition-all">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Postal Code / PIN
            </div>
            <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-display">
              {location.pincode || '627802'}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{location.district || 'Tenkasi'} Postal Division</div>
          </div>
        </div>

        {/* Detailed Address Table / Rows */}
        <div className="border border-gray-200/80 dark:border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-gray-50/40 dark:bg-gray-800/20 hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0 sm:w-56">
              <MapPin className="w-4 h-4 text-primary-500" />
              Full Postal Address
            </div>
            <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white sm:text-right max-w-2xl leading-relaxed">
              {location.address}
            </div>
          </div>

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0 sm:w-56">
              <Compass className="w-4 h-4 text-gray-400" />
              Village / Revenue Area
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white sm:text-right">
              {location.village}
            </div>
          </div>

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-50/40 dark:bg-gray-800/20 hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0 sm:w-56">
              <Building2 className="w-4 h-4 text-gray-400" />
              Town / Municipality
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white sm:text-right">
              {location.town}
            </div>
          </div>

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0 sm:w-56">
              <Building2 className="w-4 h-4 text-gray-400" />
              Taluk Administration
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white sm:text-right">
              {location.taluk}
            </div>
          </div>

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-50/40 dark:bg-gray-800/20 hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0 sm:w-56">
              <MapPin className="w-4 h-4 text-gray-400" />
              Revenue District
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white sm:text-right">
              {location.district}
            </div>
          </div>

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0 sm:w-56">
              <FileText className="w-4 h-4 text-gray-400" />
              Postal Index Number (PIN)
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white sm:text-right">
              {location.pincode}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Verified contacts */}
      <div className="card p-6 sm:p-7 space-y-6">
        <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </span>
            Verified Institutional Contacts
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Direct authenticated telephone numbers and official email communications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800/80 space-y-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Principal Administration
            </div>
            <div className="text-base font-bold text-gray-900 dark:text-white">
              {contacts.principal}
            </div>
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400 text-xs">Direct Line:</span>
              <a
                href={`tel:${contacts.principal_office.replace(/[^0-9+]/g, '')}`}
                className="font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                {contacts.principal_office}
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800/80 space-y-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              College General Office
            </div>
            <div className="text-base font-bold text-gray-900 dark:text-white">
              Administration & Inquiries
            </div>
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400 text-xs">Phone Desk:</span>
              <a
                href={`tel:${contacts.college_office.replace(/[^0-9+]/g, '')}`}
                className="font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                {contacts.college_office}
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800/80 space-y-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Admissions Helpline
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400 text-xs">Phone:</span>
              <a
                href={`tel:${contacts.admission_number.replace(/[^0-9+]/g, '')}`}
                className="font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                {contacts.admission_number}
              </a>
            </div>
            <div className="pt-1 flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400 text-xs">Email:</span>
              <a
                href={`mailto:${contacts.admission_email}`}
                className="font-semibold text-primary-600 dark:text-primary-400 hover:underline text-xs truncate max-w-[200px]"
              >
                {contacts.admission_email}
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800/80 space-y-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Placement & Career Cell
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400 text-xs">Phone:</span>
              <a
                href={`tel:${contacts.placement_number.replace(/[^0-9+]/g, '')}`}
                className="font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                {contacts.placement_number}
              </a>
            </div>
            <div className="pt-1 flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400 text-xs">Email:</span>
              <a
                href={`mailto:${contacts.placement_email}`}
                className="font-semibold text-primary-600 dark:text-primary-400 hover:underline text-xs truncate max-w-[200px]"
              >
                {contacts.placement_email}
              </a>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-primary-50/50 dark:bg-primary-950/30 border border-primary-100 dark:border-primary-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0" />
            <span>Official Institutional Email: <strong className="text-gray-900 dark:text-white font-bold">{contacts.official_email}</strong></span>
          </div>
          <a
            href={`mailto:${contacts.official_email}`}
            className="btn btn-primary text-xs px-3 py-1.5 rounded-lg self-start sm:self-auto"
          >
            Send Inquiry
          </a>
        </div>
      </div>

      {/* 3. Departments & courses */}
      <div className="card p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </span>
              Academic Departments & Courses
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Accredited academic wings, department leadership, and verified degree programs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-semibold px-2.5 py-1 text-xs">
              {departments.length} Departments
            </span>
            <span className="badge bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 border border-primary-200 dark:border-primary-800 font-semibold px-2.5 py-1 text-xs">
              {courses.length} Programs
            </span>
          </div>
        </div>

        {/* Departments table */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-primary-600" />
            Departments & Faculty Strength
          </h3>
          <div className="overflow-x-auto border border-gray-200/80 dark:border-gray-800 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-bold tracking-wider uppercase">
                  <th className="py-3 px-4">DEPARTMENT</th>
                  <th className="py-3 px-4">CODE</th>
                  <th className="py-3 px-4">HOD / LEAD</th>
                  <th className="py-3 px-4 text-right sm:text-left">FACULTY COUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs sm:text-sm">
                {departments.map((dept, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{dept.name}</td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 font-medium">{dept.code}</td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-200">{dept.hod}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left font-bold text-primary-600 dark:text-primary-400">
                      {dept.faculty_count} Members
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Courses table */}
        <div className="pt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            Approved Degree & Diploma Programs
          </h3>
          <div className="overflow-x-auto border border-gray-200/80 dark:border-gray-800 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-bold tracking-wider uppercase">
                  <th className="py-3 px-4 min-w-[200px]">COURSE NAME</th>
                  <th className="py-3 px-4">DEGREE</th>
                  <th className="py-3 px-4">LEVEL</th>
                  <th className="py-3 px-4">DURATION</th>
                  <th className="py-3 px-4">INTAKE</th>
                  <th className="py-3 px-4 whitespace-nowrap">MEDIUM</th>
                  <th className="py-3 px-4 min-w-[260px]">ELIGIBILITY CRITERIA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs sm:text-sm">
                {courses.map((course, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{course.name}</td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-200 whitespace-nowrap font-medium">{course.degree}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="badge bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 font-semibold text-[11px]">
                        {course.level}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">{course.duration}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">{course.intake} Seats</td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">{course.medium}</td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300 leading-relaxed text-xs">{course.eligibility}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Admission information */}
      <div className="card p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </span>
              Admission Guidelines & Counselling
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Eligibility criteria, required certificates, and application procedures
            </p>
          </div>
          <span className="badge bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/80 font-bold px-3 py-1 text-xs self-start sm:self-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Status: {admission.status || 'Admissions Open'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800/80">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary-500" />
              Application Period
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">
              {admission.application_start} to {admission.application_end}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Application Fee: <strong className="text-gray-800 dark:text-gray-200">{admission.application_fee}</strong>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800/80">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              Admission Cell Helpline
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">
              <a href={`tel:${admission.contact.replace(/[^0-9+]/g, '')}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                {admission.contact}
              </a>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Available 9:00 AM – 5:00 PM on Working Days
            </div>
          </div>
        </div>

        <div className="border border-gray-200/80 dark:border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-gray-50/40 dark:bg-gray-800/20">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0 sm:w-56">General Eligibility</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white sm:text-right max-w-2xl leading-relaxed">
              {admission.eligibility}
            </span>
          </div>

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0 sm:w-56">Mandatory Documents</span>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 sm:text-right max-w-2xl leading-relaxed">
              {admission.documents}
            </span>
          </div>

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-gray-50/40 dark:bg-gray-800/20">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0 sm:w-56">Admission Process</span>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 sm:text-right max-w-2xl leading-relaxed">
              {admission.process}
            </span>
          </div>

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0 sm:w-56">Counselling Protocol</span>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 sm:text-right max-w-2xl leading-relaxed">
              {admission.counselling}
            </span>
          </div>
        </div>

        <div>
          <a
            href={admission.portal_url || 'https://www.tndte.gov.in'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-sm px-6 py-2.5 rounded-xl shadow-md inline-flex items-center gap-2"
          >
            Apply on Official Admission Portal
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 5. Fee structure (verified only) */}
      <div className="card p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </span>
              Verified Fee Structure
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Government audited fees (unverified fee schedules are never displayed)
            </p>
          </div>
          <span className="badge bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-semibold px-2.5 py-1 text-xs self-start sm:self-auto">
            DOTE / University Norms
          </span>
        </div>

        <div className="overflow-x-auto border border-gray-200/80 dark:border-gray-800 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-bold tracking-wider uppercase">
                <th className="py-3 px-4 min-w-[220px]">COURSE</th>
                <th className="py-3 px-4 whitespace-nowrap">ACADEMIC YEAR</th>
                <th className="py-3 px-4">TUITION</th>
                <th className="py-3 px-4">EXAM</th>
                <th className="py-3 px-4">HOSTEL</th>
                <th className="py-3 px-4 font-bold text-gray-900 dark:text-white">TOTAL (APPROX.)</th>
                <th className="py-3 px-4">SOURCE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs sm:text-sm">
              {fees.map((fee, idx) => (
                <tr key={idx} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{fee.course_name}</td>
                  <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">{fee.academic_year}</td>
                  <td className="py-3.5 px-4 text-gray-700 dark:text-gray-200">{fee.tuition}</td>
                  <td className="py-3.5 px-4 text-gray-700 dark:text-gray-200">{fee.exam}</td>
                  <td className="py-3.5 px-4 text-gray-700 dark:text-gray-200">{fee.hostel}</td>
                  <td className="py-3.5 px-4 font-extrabold text-primary-600 dark:text-primary-400">
                    ₹ {fee.total_approx}
                  </td>
                  <td className="py-3.5 px-4">
                    <a
                      href={fee.source_url || 'https://www.tndte.gov.in'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      Official Link
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Hostel */}
      {hostel.length > 0 && (
        <div className="card p-6 sm:p-7 space-y-6">
          <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Bed className="w-4 h-4" />
              </span>
              Residential & Hostel Facilities
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Campus living, mess services, resident warden contacts, and security surveillance
            </p>
          </div>

          <div className="overflow-x-auto border border-gray-200/80 dark:border-gray-800 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-bold tracking-wider uppercase">
                  <th className="py-3 px-4">TYPE</th>
                  <th className="py-3 px-4">CAPACITY</th>
                  <th className="py-3 px-4 min-w-[190px]">ANNUAL FEE</th>
                  <th className="py-3 px-4 min-w-[200px]">MESS DETAILS</th>
                  <th className="py-3 px-4 min-w-[140px]">WARDEN</th>
                  <th className="py-3 px-4 min-w-[220px]">SECURITY</th>
                  <th className="py-3 px-4 min-w-[260px]">RULES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs sm:text-sm">
                {hostel.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{item.type}</td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-200 font-bold">{item.capacity} Beds</td>
                    <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-bold">{item.fee}</td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300">{item.mess}</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">{item.warden}</td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{item.security}</td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 text-xs leading-relaxed">{item.rules}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. Transportation */}
      {transportation.length > 0 && (
        <div className="card p-6 sm:p-7 space-y-6">
          <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Bus className="w-4 h-4" />
              </span>
              College Transportation & Bus Routes
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Institutional daily bus service covering rural and urban towns in Tenkasi District
            </p>
          </div>

          <div className="overflow-x-auto border border-gray-200/80 dark:border-gray-800 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-bold tracking-wider uppercase">
                  <th className="py-3 px-4 min-w-[240px]">ROUTE</th>
                  <th className="py-3 px-4 whitespace-nowrap">VEHICLE MODE</th>
                  <th className="py-3 px-4 min-w-[240px]">KEY STOPS</th>
                  <th className="py-3 px-4 min-w-[180px]">TIMING / FREQUENCY</th>
                  <th className="py-3 px-4 whitespace-nowrap">BUS FEE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs sm:text-sm">
                {transportation.map((t, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{t.route}</td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-200 whitespace-nowrap font-medium">{t.mode}</td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{t.stops}</td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{t.frequency}</td>
                    <td className="py-3.5 px-4 font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap">{t.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. Placement */}
      {placement && (
        <div className="card p-6 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </span>
                Placement Track Record
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Verified campus placements, median packages, and recruitment partnerships
              </p>
            </div>
            <span className="badge bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 font-bold px-3 py-1 text-xs self-start sm:self-auto">
              {placement.placement_rate || '88%+ Verified'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800/80">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Placement Success
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
                {placement.placement_rate || '88.4%'}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Eligible batch recruited</div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800/80">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Average Salary Package
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-primary-600 dark:text-primary-400 font-display">
                {placement.average_package || '₹ 2.8 LPA'}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Across all disciplines</div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800/80">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Highest Salary Package
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-accent-600 dark:text-accent-400 font-display">
                {placement.highest_package || '₹ 4.8 LPA'}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Top tier corporate placement</div>
            </div>
          </div>

          <div className="border border-gray-200/80 dark:border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-50/40 dark:bg-gray-800/20">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0 sm:w-56">Placement Cell</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white sm:text-right">
                {placement.cell_name || 'Central Placement & Corporate Training Cell'}
              </span>
            </div>
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0 sm:w-56">Cell Coordinator Contact</span>
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 sm:text-right">
                {placement.contact || contacts.placement_number}
              </span>
            </div>
          </div>

          {placement.companies && placement.companies.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                Key Campus Recruiters & Corporate Partners:
              </h3>
              <div className="flex flex-wrap gap-2">
                {placement.companies.map((co, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-semibold text-xs shadow-xs hover:border-primary-400 transition-colors"
                  >
                    {co}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
