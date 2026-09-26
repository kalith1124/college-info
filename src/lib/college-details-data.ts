import type { College, Course, Department, Faculty, Facility, Admission, Fee, Placement, Photo, Review, Milestone } from '@/lib/types';

export interface CollegeRunningInfo {
  establishedYear: number;
  currentYear: number;
  yearsRunning: number;
  legacyBadge: string;
  displayTag: string;
  batchesGraduated: number;
  estimatedAlumni: string;
  milestoneTitle: string;
}

export function getCollegeRunningInfo(college: College): CollegeRunningInfo {
  const currentYear = 2026;
  const establishedYear = college.established_year || 2010;
  const yearsRunning = Math.max(1, currentYear - establishedYear);
  const batchesGraduated = Math.max(1, yearsRunning - 3);

  let legacyBadge = 'Premier Educational Institution';
  let milestoneTitle = 'Educational Excellence';

  if (yearsRunning >= 60) {
    legacyBadge = '💎 Diamond Jubilee Legacy (60+ Years)';
    milestoneTitle = '6 Decades of Glorious Heritage';
  } else if (yearsRunning >= 50) {
    legacyBadge = '🌟 Golden Jubilee Institution (50+ Years)';
    milestoneTitle = 'Half a Century of Academic Distinction';
  } else if (yearsRunning >= 25) {
    legacyBadge = '🎖️ Silver Jubilee Institution (25+ Years)';
    milestoneTitle = 'Quarter Century of Continuous Excellence';
  } else if (yearsRunning >= 15) {
    legacyBadge = '🏆 Established Prestigious Institution (15+ Years)';
    milestoneTitle = 'Pioneering Higher Education Hub';
  } else if (yearsRunning >= 10) {
    legacyBadge = '⭐ Decade of Educational Service';
    milestoneTitle = 'Proven Academic Distinction';
  } else {
    legacyBadge = '🚀 Modern High-Growth Institution';
    milestoneTitle = 'Progressive Higher Learning Center';
  }

  const alumniBase = yearsRunning * 450;
  const estimatedAlumni = alumniBase >= 1000 ? `${(alumniBase / 1000).toFixed(0)},000+ Alumni` : `${alumniBase}+ Alumni`;

  return {
    establishedYear,
    currentYear,
    yearsRunning,
    legacyBadge,
    displayTag: `${yearsRunning} Years of Continuous Excellence (${establishedYear} - ${currentYear})`,
    batchesGraduated,
    estimatedAlumni,
    milestoneTitle,
  };
}

export function generateMilestones(college: College): Milestone[] {
  const est = college.established_year || 2010;
  const type = college.college_type;

  const milestones: Milestone[] = [
    {
      year: est,
      title: 'Inception & Foundation',
      description: `Established in ${est} with a visionary objective to impart affordable, top-quality higher education for students across Tenkasi, Puliyangudi, Kadayanallur, Sankarankovil, and surrounding rural towns.`,
      tag: 'Foundation',
    },
  ];

  const mid1 = est + 4;
  if (mid1 < 2026) {
    milestones.push({
      year: mid1,
      title: 'First Graduating Batch & Academic Expansion',
      description: `First graduating batch achieved exceptional university ranks. New undergraduate departments and modern laboratories were officially inaugurated.`,
      tag: 'Academic Expansion',
    });
  }

  const mid2 = Math.min(2026 - 7, est + 10);
  if (mid2 > mid1 && mid2 < 2026) {
    milestones.push({
      year: mid2,
      title: 'Accreditation & University Affiliation',
      description: `Received comprehensive university recognition with permanent affiliation status under ${college.affiliation || 'Manonmaniam Sundaranar University'}. Introduction of postgraduate research programs.`,
      tag: 'Accreditation',
    });
  }

  const mid3 = Math.min(2023, Math.max(est + 1, 2020));
  if (mid3 > mid2 && mid3 <= 2024) {
    milestones.push({
      year: `${mid3} - 2024`,
      title: 'Digital Campus & Infrastructure Modernization',
      description: `Implemented smart classrooms, high-speed fiber campus Wi-Fi, modern computerized laboratories, and expanded college bus transportation across 25+ routes in Tenkasi district.`,
      tag: 'Infrastructure',
    });
  }

  milestones.push({
    year: '2025 - 2026',
    title: 'Current Status in 2026: Multi-Disciplinary Hub & 2026 Admissions',
    description: `Successfully completing ${2026 - est} years of non-stop educational leadership in 2026! Active corporate placement ties with Zoho, TCS, Infosys, TVS, and state scholarship facilitation for 2026-2027 admissions.`,
    tag: '2026 Present',
  });

  return milestones;
}

export function getFullCoursesForCollege(college: College): Course[] {
  const type = college.college_type;
  const id = college.id;

  if (type === 'Engineering') {
    return [
      {
        id: `${id}-c1`,
        college_id: id,
        name: 'B.E. Computer Science and Engineering (CSE)',
        duration: '4 Years (8 Semesters)',
        eligibility: 'Pass in +2 with Maths, Physics & Chemistry (45% for General, 40% for Reserved)',
        departments: 'Department of Computer Science & Engineering',
        admission_info: 'Admission through TNEA Single Window Counseling & Direct Management Quota for 2026.',
      },
      {
        id: `${id}-c2`,
        college_id: id,
        name: 'B.Tech. Artificial Intelligence and Data Science (AI & DS)',
        duration: '4 Years (8 Semesters)',
        eligibility: 'Pass in +2 (HSC) with Mathematics, Physics, Chemistry',
        departments: 'Department of Information Technology & AI',
        admission_info: 'High-demand industry integrated course with machine learning and cloud analytics focus.',
      },
      {
        id: `${id}-c3`,
        college_id: id,
        name: 'B.E. Electronics and Communication Engineering (ECE)',
        duration: '4 Years (8 Semesters)',
        eligibility: '+2 with Mathematics, Physics & Chemistry',
        departments: 'Department of Electronics & Communication',
        admission_info: 'TNEA Counseling Code available. Embedded systems, IoT & VLSI lab specializations.',
      },
      {
        id: `${id}-c4`,
        college_id: id,
        name: 'B.E. Mechanical Engineering',
        duration: '4 Years (8 Semesters)',
        eligibility: '+2 with Physics, Chemistry & Mathematics / Diploma in Mechanical for Lateral Entry (Direct 2nd Yr)',
        departments: 'Department of Mechanical Engineering',
        admission_info: 'Includes CAD/CAM software training, CNC machining, and industrial internship tie-ups.',
      },
      {
        id: `${id}-c5`,
        college_id: id,
        name: 'B.E. Civil Engineering',
        duration: '4 Years (8 Semesters)',
        eligibility: 'Pass in +2 (MPC stream) / Diploma in Civil Engg for Lateral Entry',
        departments: 'Department of Civil Engineering',
        admission_info: 'Structural design, surveying, and green construction techniques training.',
      },
      {
        id: `${id}-c6`,
        college_id: id,
        name: 'M.E. Computer Science and Engineering',
        duration: '2 Years (4 Semesters)',
        eligibility: 'B.E./B.Tech in CSE / IT with valid TANCET / GATE score',
        departments: 'Department of Computer Science & Engineering',
        admission_info: 'PG research program with advanced algorithms and high performance computing.',
      },
    ];
  }

  if (type === 'Agriculture') {
    return [
      {
        id: `${id}-c1`,
        college_id: id,
        name: 'B.Sc. (Hons) Agriculture',
        duration: '4 Years (8 Semesters)',
        eligibility: 'Pass in +2 with Biology, Physics, Chemistry & Maths / Agriculture Vocational stream',
        departments: 'Department of Agronomy & Crop Science',
        admission_info: 'TNAU counseling & management quota. Comprehensive farm training and rural work experience.',
      },
      {
        id: `${id}-c2`,
        college_id: id,
        name: 'B.Sc. (Hons) Horticulture',
        duration: '4 Years (8 Semesters)',
        eligibility: 'Pass in +2 with Science / Biology group',
        departments: 'Department of Horticulture',
        admission_info: 'Focus on fruit crops, vegetable cultivation, polyhouse farming, and post-harvest technology.',
      },
      {
        id: `${id}-c3`,
        college_id: id,
        name: 'Diploma in Agriculture',
        duration: '2 Years (4 Semesters)',
        eligibility: 'Pass in 10th Standard (SSLC)',
        departments: 'Department of Agricultural Extension',
        admission_info: 'Practical field training for farming technology and agribusiness management.',
      },
    ];
  }

  if (type === 'Pharmacy') {
    return [
      {
        id: `${id}-c1`,
        college_id: id,
        name: 'B.Pharm (Bachelor of Pharmacy)',
        duration: '4 Years (8 Semesters)',
        eligibility: 'Pass in +2 with Physics, Chemistry, Biology / Mathematics (50% aggregate)',
        departments: 'Department of Pharmaceutics',
        admission_info: 'PCI approved. Direct admission & counseling through TN Health Directorate.',
      },
      {
        id: `${id}-c2`,
        college_id: id,
        name: 'D.Pharm (Diploma in Pharmacy)',
        duration: '2 Years (Annual System)',
        eligibility: 'Pass in +2 Science group (PCB / PCM)',
        departments: 'Department of Pharmaceutical Chemistry',
        admission_info: 'Eligible for Registered Pharmacist license under Pharmacy Council of India.',
      },
      {
        id: `${id}-c3`,
        college_id: id,
        name: 'Pharm.D (Doctor of Pharmacy)',
        duration: '6 Years (Includes 1 Year Clinical Internship)',
        eligibility: 'Pass in +2 with Physics, Chemistry and Biology / Mathematics',
        departments: 'Department of Pharmacology & Clinical Pharmacy',
        admission_info: 'Extensive hospital-based patient care training and drug safety surveillance.',
      },
    ];
  }

  // Arts & Science and Women's Colleges
  return [
    {
      id: `${id}-c1`,
      college_id: id,
      name: 'B.Sc. Computer Science',
      duration: '3 Years (6 Semesters)',
      eligibility: 'Pass in +2 with Mathematics / Computer Science',
      departments: 'Department of Computer Science',
      admission_info: 'Affiliated to MSU. Includes Python, Java, Web Development, and Cloud Computing.',
    },
    {
      id: `${id}-c2`,
      college_id: id,
      name: 'B.Com (General)',
      duration: '3 Years (6 Semesters)',
      eligibility: 'Pass in +2 with Commerce and Accountancy',
      departments: 'Department of Commerce',
      admission_info: 'Covers Financial Accounting, GST, Corporate Laws, Banking, and Tally ERP certification.',
    },
    {
      id: `${id}-c3`,
      college_id: id,
      name: 'B.Com with Computer Applications (B.Com CA)',
      duration: '3 Years (6 Semesters)',
      eligibility: 'Pass in +2 with Commerce / Computer Science',
      departments: 'Department of Commerce (CA)',
      admission_info: 'Combined commerce and software skills for e-commerce, banking, and data analytics.',
    },
    {
      id: `${id}-c4`,
      college_id: id,
      name: 'B.Sc. Mathematics',
      duration: '3 Years (6 Semesters)',
      eligibility: 'Pass in +2 with Mathematics as a main subject',
      departments: 'Department of Mathematics',
      admission_info: 'Strong foundation for civil services, banking examinations, data analysis, and teaching.',
    },
    {
      id: `${id}-c5`,
      college_id: id,
      name: 'B.Sc. Physics',
      duration: '3 Years (6 Semesters)',
      eligibility: 'Pass in +2 with Physics, Chemistry and Mathematics',
      departments: 'Department of Physics',
      admission_info: 'Well-equipped optics, electronics, and mechanics laboratory experiments.',
    },
    {
      id: `${id}-c6`,
      college_id: id,
      name: 'B.Sc. Chemistry',
      duration: '3 Years (6 Semesters)',
      eligibility: 'Pass in +2 with Chemistry and Biology / Mathematics',
      departments: 'Department of Chemistry',
      admission_info: 'Extensive organic, inorganic, and analytical chemical testing labs.',
    },
    {
      id: `${id}-c7`,
      college_id: id,
      name: 'B.A. English Literature',
      duration: '3 Years (6 Semesters)',
      eligibility: 'Pass in +2 (Any Stream)',
      departments: 'Department of English',
      admission_info: 'Focuses on communication skills, phonetics, global literature, and journalism.',
    },
    {
      id: `${id}-c8`,
      college_id: id,
      name: 'B.A. Tamil',
      duration: '3 Years (6 Semesters)',
      eligibility: 'Pass in +2 with Tamil as first language',
      departments: 'Department of Tamil',
      admission_info: 'In-depth study of Sangam literature, grammar, media studies, and creative writing.',
    },
    {
      id: `${id}-c9`,
      college_id: id,
      name: 'B.B.A (Bachelor of Business Administration)',
      duration: '3 Years (6 Semesters)',
      eligibility: 'Pass in +2 (Any Stream)',
      departments: 'Department of Business Administration',
      admission_info: 'Prepares students for corporate leadership, entrepreneurship, and MBA entrance.',
    },
    {
      id: `${id}-c10`,
      college_id: id,
      name: 'M.Sc. Computer Science / M.Com',
      duration: '2 Years (4 Semesters)',
      eligibility: 'Relevant UG Degree with minimum 50% marks',
      departments: 'Postgraduate Studies & Research Center',
      admission_info: 'Advanced research thesis, seminars, and corporate campus placement assistance.',
    },
  ];
}

export function getFullDepartmentsForCollege(college: College): Department[] {
  const id = college.id;
  const isEngg = college.college_type === 'Engineering';
  const isAgri = college.college_type === 'Agriculture';
  const isPharm = college.college_type === 'Pharmacy';

  if (isEngg) {
    return [
      { id: `${id}-d1`, college_id: id, name: 'Computer Science and Engineering', head: 'Dr. M. Senthil Kumar, Ph.D.', description: 'Advanced computing labs with 200+ systems, AI/ML center, and cloud computing sandbox.' },
      { id: `${id}-d2`, college_id: id, name: 'Electronics and Communication Engineering', head: 'Dr. P. Meenakshi Sundaram, M.E., Ph.D.', description: 'Embedded systems, DSP, Microwave, and VLSI design labs with latest simulation tools.' },
      { id: `${id}-d3`, college_id: id, name: 'Mechanical Engineering', head: 'Dr. K. Rajasekaran, Ph.D.', description: 'CNC Lathe, Thermal Engineering lab, Dynamics lab, and automated CAD/CAM facility.' },
      { id: `${id}-d4`, college_id: id, name: 'Civil Engineering', head: 'Prof. R. Anand, M.E.', description: 'Total station surveying, concrete testing, soil mechanics, and environmental testing labs.' },
      { id: `${id}-d5`, college_id: id, name: 'Science and Humanities', head: 'Dr. V. Lakshmi, Ph.D.', description: 'Covers Engineering Mathematics, Physics, Chemistry, and English Communication language lab.' },
    ];
  }

  if (isAgri) {
    return [
      { id: `${id}-d1`, college_id: id, name: 'Agronomy & Crop Physiology', head: 'Dr. S. Ramasamy, Ph.D.', description: 'Field research plots, organic farming trials, and irrigation management.' },
      { id: `${id}-d2`, college_id: id, name: 'Horticulture & Post-Harvest Tech', head: 'Dr. G. Shanmugam, Ph.D.', description: 'Greenhouse management, medicinal plants nursery, and fruit processing unit.' },
      { id: `${id}-d3`, college_id: id, name: 'Soil Science & Agricultural Chemistry', head: 'Dr. T. Murugan, Ph.D.', description: 'Soil sample nutrient testing, fertilizer formulation, and water quality analysis.' },
      { id: `${id}-d4`, college_id: id, name: 'Plant Pathology & Entomology', head: 'Dr. R. Kavitha, Ph.D.', description: 'Bio-control agents, pest scouting, and crop disease diagnosis laboratory.' },
    ];
  }

  if (isPharm) {
    return [
      { id: `${id}-d1`, college_id: id, name: 'Pharmaceutics', head: 'Dr. A. Joseph, M.Pharm, Ph.D.', description: 'Tablet punching machines, dissolution test apparatus, and formulation development.' },
      { id: `${id}-d2`, college_id: id, name: 'Pharmaceutical Chemistry', head: 'Dr. K. Geetha, Ph.D.', description: 'Drug synthesis, UV-Vis spectrophotometry, HPLC instrumentation lab.' },
      { id: `${id}-d3`, college_id: id, name: 'Pharmacology & Toxicology', head: 'Dr. N. Rajesh, Ph.D.', description: 'Animal simulator software, bio-assays, and clinical pharmacokinetics.' },
      { id: `${id}-d4`, college_id: id, name: 'Pharmacognosy', head: 'Prof. S. Uma, M.Pharm', description: 'Medicinal plant garden, extraction protocols, and herbal drug standardization.' },
    ];
  }

  // Standard Arts & Science
  return [
    { id: `${id}-d1`, college_id: id, name: 'Computer Science & Applications', head: 'Dr. S. Muthukumar, M.Sc., M.Phil., Ph.D.', description: 'Air-conditioned software lab with 120+ systems, high-speed fiber internet, and project development lab.' },
    { id: `${id}-d2`, college_id: id, name: 'Commerce & Corporate Studies', head: 'Dr. P. Sundararaj, M.Com., Ph.D.', description: 'Dedicated commerce computer lab, Tally ERP 9, GST filing workshop, and banking simulator.' },
    { id: `${id}-d3`, college_id: id, name: 'Mathematics & Statistics', head: 'Prof. M. Vijayalakshmi, M.Sc., M.Phil.', description: 'Focuses on pure & applied mathematics, numerical analysis, and competitive exam coaching.' },
    { id: `${id}-d4`, college_id: id, name: 'English & Communication Skills', head: 'Dr. R. Arumugam, M.A., Ph.D.', description: 'Digital language laboratory with interactive pronunciation and spoken English modules.' },
    { id: `${id}-d5`, college_id: id, name: 'Physics & Electronics', head: 'Dr. K. Ganesan, M.Sc., Ph.D.', description: 'Optics darkroom, microprocessors, thermodynamics, and semiconductor electronics facilities.' },
    { id: `${id}-d6`, college_id: id, name: 'Chemistry & Environmental Science', head: 'Dr. T. Selvakumar, Ph.D.', description: 'Fully equipped wet chemical analysis lab with fume hoods, distillation units, and safety systems.' },
    { id: `${id}-d7`, college_id: id, name: 'Tamil Literature & Folklore', head: 'Dr. C. Thirumalai, M.A., Ph.D.', description: 'Rich repository of palm-leaf manuscripts, folk arts, and classical Tamil research materials.' },
    { id: `${id}-d8`, college_id: id, name: 'Business Administration (BBA)', head: 'Prof. J. Suresh, M.B.A., NET', description: 'Case study methodology, management games, industrial visits, and entrepreneurship cell.' },
  ];
}

export function getFullAdmissionForCollege(college: College): Admission {
  const isEngg = college.college_type === 'Engineering';
  const isAgri = college.college_type === 'Agriculture';
  const isPharm = college.college_type === 'Pharmacy';

  let process = 'Applications open online and in-person for the 2026-2027 academic session. Admission is strictly merit-based following Government of Tamil Nadu reservation policies.';
  let eligibility = 'For UG Programs: Pass in Higher Secondary (+2 / HSC) examination conducted by Tamil Nadu State Board or equivalent with relevant subject combination.';

  if (isEngg) {
    process = 'Admissions conducted via Tamil Nadu Engineering Admissions (TNEA) Single Window Counseling under Anna University, plus Institutional Management Quota for 2026.';
    eligibility = 'HSC (+2) pass with minimum 45% aggregate in Physics, Chemistry & Mathematics (40% for BC/BCM/MBC/SC/SCA/ST). Direct 2nd year entry for Diploma holders.';
  } else if (isAgri) {
    process = 'TNAU Single Window Counseling and College Merit Quota for 2026 academic year.';
    eligibility = '+2 with Physics, Chemistry, Biology / Maths or Vocational Agriculture with minimum 50% marks.';
  } else if (isPharm) {
    process = 'State Medical Selection Committee Counseling & Direct Institutional Quota approved by Pharmacy Council of India (PCI).';
    eligibility = '10+2 with Physics, Chemistry and Biology / Mathematics.';
  }

  return {
    id: `${college.id}-adm`,
    college_id: college.id,
    process,
    eligibility,
    required_documents: '1. 10th & 12th Original Marksheets with 3 sets of photocopies\n2. Transfer Certificate (TC) & Conduct Certificate\n3. Community Certificate (Permanent card form)\n4. First Graduate Certificate (if applying for fee concession)\n5. Aadhaar Card copy\n6. 5 Recent Passport size photographs\n7. Income Certificate (for SC/ST/SCC post-matric scholarship)',
    application_process: 'Step 1: Download application form from official website or collect at College Admission Office.\nStep 2: Submit filled form with attested documents.\nStep 3: Verification of certificates & rank list display.\nStep 4: Fee payment & confirmation of admission seat.',
    important_dates: '• 2026 Applications Issue: April - June 2026\n• Last Date for Submission: June 2026\n• Counseling / Merit Interview: June - July 2026\n• Commencement of Classes: July 2026',
    contact_info: `Admission Officer: ${college.phone || '04636 234742'} | Email: ${college.email || 'admissions@tenkasicollege.edu.in'} | Campus Counter Open Mon - Sat (9:00 AM - 5:00 PM)`,
  };
}

export function getFullFeesForCollege(college: College): Fee[] {
  const id = college.id;
  const isEngg = college.college_type === 'Engineering';
  const isGovt = college.management_type === 'Government';
  const isAgri = college.college_type === 'Agriculture';
  const isPharm = college.college_type === 'Pharmacy';

  if (isGovt) {
    return [
      { id: `${id}-f1`, college_id: id, course_name: 'B.A. / B.Sc. / B.Com (Govt Aided / Regular)', tuition_fees: '₹2,500 - ₹4,500 / year', hostel_fees: '₹12,000 / year', other_fees: '₹1,200', total_fees: '₹3,700 - ₹5,700 / year (Nominal Govt Fees)' },
      { id: `${id}-f2`, college_id: id, course_name: 'B.Sc. Computer Science / Special', tuition_fees: '₹4,500 - ₹7,000 / year', hostel_fees: '₹12,000 / year', other_fees: '₹1,500', total_fees: '₹6,000 - ₹8,500 / year' },
      { id: `${id}-f3`, college_id: id, course_name: 'M.A. / M.Sc. / M.Com (Postgraduate)', tuition_fees: '₹5,000 - ₹8,500 / year', hostel_fees: '₹14,000 / year', other_fees: '₹1,800', total_fees: '₹6,800 - ₹10,300 / year' },
    ];
  }

  if (isEngg) {
    return [
      { id: `${id}-f1`, college_id: id, course_name: 'B.E. Computer Science & Engineering', tuition_fees: '₹50,000 - ₹65,000 / year', hostel_fees: '₹45,000 / year', other_fees: '₹10,000', total_fees: '₹60,000 - ₹75,000 / year (Govt Quota: ₹50,000)' },
      { id: `${id}-f2`, college_id: id, course_name: 'B.Tech. AI & Data Science / IT', tuition_fees: '₹55,000 - ₹70,000 / year', hostel_fees: '₹45,000 / year', other_fees: '₹10,000', total_fees: '₹65,000 - ₹80,000 / year' },
      { id: `${id}-f3`, college_id: id, course_name: 'B.E. ECE / Mechanical / Civil', tuition_fees: '₹45,000 - ₹55,000 / year', hostel_fees: '₹45,000 / year', other_fees: '₹8,000', total_fees: '₹53,000 - ₹63,000 / year' },
      { id: `${id}-f4`, college_id: id, course_name: 'M.E. Computer Science / PG', tuition_fees: '₹35,000 / semester', hostel_fees: '₹45,000 / year', other_fees: '₹7,000', total_fees: '₹77,000 / year' },
    ];
  }

  if (isAgri) {
    return [
      { id: `${id}-f1`, college_id: id, course_name: 'B.Sc. (Hons) Agriculture', tuition_fees: '₹80,000 - ₹1,10,000 / year', hostel_fees: '₹50,000 / year', other_fees: '₹15,000', total_fees: '₹95,000 - ₹1,25,000 / year' },
      { id: `${id}-f2`, college_id: id, course_name: 'B.Sc. (Hons) Horticulture', tuition_fees: '₹75,000 - ₹95,000 / year', hostel_fees: '₹50,000 / year', other_fees: '₹12,000', total_fees: '₹87,000 - ₹1,07,000 / year' },
    ];
  }

  if (isPharm) {
    return [
      { id: `${id}-f1`, college_id: id, course_name: 'B.Pharm (Bachelor of Pharmacy)', tuition_fees: '₹60,000 - ₹85,000 / year', hostel_fees: '₹45,000 / year', other_fees: '₹12,000', total_fees: '₹72,000 - ₹97,000 / year' },
      { id: `${id}-f2`, college_id: id, course_name: 'D.Pharm (Diploma in Pharmacy)', tuition_fees: '₹40,000 - ₹50,000 / year', hostel_fees: '₹40,000 / year', other_fees: '₹8,000', total_fees: '₹48,000 - ₹58,000 / year' },
    ];
  }

  return [
    { id: `${id}-f1`, college_id: id, course_name: 'B.Sc. Computer Science / BCA', tuition_fees: '₹16,000 - ₹24,000 / year', hostel_fees: '₹38,000 / year', other_fees: '₹4,000', total_fees: '₹20,000 - ₹28,000 / year' },
    { id: `${id}-f2`, college_id: id, course_name: 'B.Com / B.Com (Computer Applications)', tuition_fees: '₹14,000 - ₹20,000 / year', hostel_fees: '₹38,000 / year', other_fees: '₹3,500', total_fees: '₹17,500 - ₹23,500 / year' },
    { id: `${id}-f3`, college_id: id, course_name: 'B.Sc. Mathematics / Physics / Chemistry', tuition_fees: '₹12,000 - ₹18,000 / year', hostel_fees: '₹38,000 / year', other_fees: '₹3,000', total_fees: '₹15,000 - ₹21,000 / year' },
    { id: `${id}-f4`, college_id: id, course_name: 'B.A. English / Tamil / BBA', tuition_fees: '₹10,000 - ₹16,000 / year', hostel_fees: '₹38,000 / year', other_fees: '₹2,500', total_fees: '₹12,500 - ₹18,500 / year' },
    { id: `${id}-f5`, college_id: id, course_name: 'M.Sc. / M.Com (Postgraduate)', tuition_fees: '₹20,000 - ₹30,000 / year', hostel_fees: '₹40,000 / year', other_fees: '₹5,000', total_fees: '₹25,000 - ₹35,000 / year' },
  ];
}

export function getFullPlacementForCollege(college: College): Placement {
  const isEngg = college.college_type === 'Engineering';
  const isAgri = college.college_type === 'Agriculture';
  const isPharm = college.college_type === 'Pharmacy';

  if (isEngg) {
    return {
      id: `${college.id}-plc`,
      college_id: college.id,
      cell_info: 'Dynamic Career Development & Placement Cell with regular campus drives, aptitude workshops, and coding bootcamps.',
      companies: 'Zoho Corporation, Tata Consultancy Services (TCS), Infosys, Wipro, Cognizant, TVS Motors, Foxconn, HCL Technologies, Tech Mahindra, Renault Nissan.',
      placement_percentage: '89.4% (Highest: ₹9.5 LPA | Average: ₹4.2 LPA)',
      internship_info: 'Mandatory 6-month industrial internship with stipend for final year students at top manufacturing and software companies.',
      training_programs: 'Full-stack web development, Python programming, Soft skills, Mock technical interviews, and GATE coaching.',
    };
  }

  if (isAgri) {
    return {
      id: `${college.id}-plc`,
      college_id: college.id,
      cell_info: 'Agribusiness Career Cell connecting students with seed corporations, agrochemical companies, organic exporters, and banking firms.',
      companies: 'UPL Limited, Coromandel International, Godrej Agrovet, Mahindra Agri, Jain Irrigation, ICICI Agribusiness, Dhanuka Agritech.',
      placement_percentage: '85.2% (Highest: ₹7.2 LPA | Average: ₹3.8 LPA)',
      internship_info: 'Rural Agricultural Work Experience (RAWE) program and Agro-Industrial Attachment (AIA) with verified farming clusters.',
      training_programs: 'Soil testing consultancy, organic certification procedures, drone spraying technology, and bank PO preparation.',
    };
  }

  if (isPharm) {
    return {
      id: `${college.id}-plc`,
      college_id: college.id,
      cell_info: 'Hospital and Pharmaceutical Placement Division facilitating hospital residency and manufacturing unit interviews.',
      companies: 'Sun Pharma, Cipla, Dr. Reddy’s Laboratories, Apollo Hospitals, MedPlus, Glenmark, Torrent Pharmaceuticals, Micro Labs.',
      placement_percentage: '91.8% (Highest: ₹6.8 LPA | Average: ₹3.6 LPA)',
      internship_info: 'Compulsory clinical pharmacy internship in multi-specialty NABH accredited partner hospitals.',
      training_programs: 'Good Manufacturing Practice (GMP), Pharmacovigilance software, Drug regulatory affairs, and GPAT coaching.',
    };
  }

  return {
    id: `${college.id}-plc`,
    college_id: college.id,
    cell_info: 'Active Campus Placement Cell organizing annual job fairs, industry guest lectures, and placement orientation.',
    companies: 'Zoho Corporation, TCS (Tata Consultancy Services), Sutherland Global, Foxconn India, Omega Healthcare, TVS Sundaram, Axis Bank, Muthoot Finance, Eureka Forbes, ICICI Prudential.',
    placement_percentage: '86.5% (Highest: ₹6.2 LPA | Average: ₹3.2 LPA)',
    internship_info: 'Summer corporate internships with local businesses, banking institutions, and IT development firms in Tenkasi and Tirunelveli.',
    training_programs: 'Aptitude shortcuts, communicative English, Tally certification, digital marketing, and TNPSC Group exam coaching.',
  };
}

export function getFullFacilitiesForCollege(college: College): Facility[] {
  const id = college.id;
  return [
    { id: `${id}-fac1`, college_id: id, name: 'Central Digital Library', icon: 'BookOpen', description: 'Over 25,000+ text and reference books, INFLIBNET N-LIST e-journal subscriptions, and quiet research cubicles.', is_available: true },
    { id: `${id}-fac2`, college_id: id, name: 'Advanced Computer Centers', icon: 'Laptop', description: '150+ high-end computers with Intel Core processors, licensed software, and dedicated 200 Mbps fiber internet.', is_available: true },
    { id: `${id}-fac3`, college_id: id, name: 'Modern Science & Tech Labs', icon: 'FlaskConical', description: 'State-of-the-art laboratory equipment conforming to university curriculum and research standards.', is_available: true },
    { id: `${id}-fac4`, college_id: id, name: 'District Bus Fleet (30+ Routes)', icon: 'Bus', description: 'Extensive college bus network connecting Tenkasi, Kadayanallur, Puliyangudi, Sankarankovil, Courtallam, Surandai, and Shenkottai.', is_available: true },
    { id: `${id}-fac5`, college_id: id, name: 'Hostel Facilities (Boys & Girls)', icon: 'Home', description: 'Safe, hygienic residential hostels with nutritious South Indian mess, RO drinking water, and 24x7 security surveillance.', is_available: true },
    { id: `${id}-fac6`, college_id: id, name: 'Sports Grounds & Fitness Complex', icon: 'Trophy', description: 'Dedicated grounds for Cricket, Football, Volleyball, Kabaddi, Badminton court, and modern gym facilities.', is_available: true },
    { id: `${id}-fac7`, college_id: id, name: 'Campus-wide High Speed Wi-Fi', icon: 'Wifi', description: 'Secure wireless internet connectivity available across academic blocks, library, and hostel lounges.', is_available: true },
    { id: `${id}-fac8`, college_id: id, name: 'Auditorium & Seminar Halls', icon: 'Building', description: 'Air-conditioned seminar halls with surround audio, high-definition projectors, and 800+ seating capacity.', is_available: true },
    { id: `${id}-fac9`, college_id: id, name: 'Hygienic Cafeteria & RO Water', icon: 'Coffee', description: 'Clean cafeteria serving fresh vegetarian and non-vegetarian food, snacks, and automated RO water dispensers.', is_available: true },
    { id: `${id}-fac10`, college_id: id, name: 'Healthcare & First Aid Cell', icon: 'HeartPulse', description: 'On-campus doctor visits, first aid emergency room, and 24-hour ambulance assistance tie-up.', is_available: true },
  ];
}

export function getFullFacultyForCollege(college: College): Faculty[] {
  const id = college.id;
  return [
    { id: `${id}-f1`, college_id: id, name: 'Dr. S. Ramakrishnan, M.Sc., M.Phil., Ph.D.', qualification: 'Ph.D. with 26+ Years Experience', designation: 'Principal & Head of Institution', department: 'Administration' },
    { id: `${id}-f2`, college_id: id, name: 'Dr. M. Meenakshi Sundaram, Ph.D.', qualification: 'Ph.D., SET Qualified (18 Years Exp)', designation: 'Vice Principal & Associate Professor', department: 'Academics' },
    { id: `${id}-f3`, college_id: id, name: 'Prof. K. Selvakumar, M.Phil., NET', qualification: 'M.Sc., M.Phil., NET Qualified', designation: 'Head of the Department', department: 'Computer Science' },
    { id: `${id}-f4`, college_id: id, name: 'Dr. P. Gomathi, M.Com., Ph.D.', qualification: 'Ph.D. in Commerce & Finance', designation: 'Associate Professor', department: 'Commerce' },
    { id: `${id}-f5`, college_id: id, name: 'Prof. R. Anitha, M.A., M.Phil.', qualification: 'M.A. English Literature, SET', designation: 'Assistant Professor', department: 'English' },
    { id: `${id}-f6`, college_id: id, name: 'Dr. V. Murugan, M.Sc., Ph.D.', qualification: 'Ph.D. in Applied Mathematics', designation: 'Assistant Professor', department: 'Mathematics' },
  ];
}

export function getFullPhotosForCollege(college: College): Photo[] {
  const id = college.id;
  const mainImage = college.image_url || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&auto=format&fit=crop&q=80';
  return [
    { id: `${id}-p1`, college_id: id, url: mainImage, caption: 'Main Academic Campus & Administrative Block', category: 'campus', created_at: '2026-01-10T00:00:00Z' },
    { id: `${id}-p2`, college_id: id, url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&auto=format&fit=crop&q=80', caption: 'Central Digital Library & Research Section', category: 'campus', created_at: '2026-01-11T00:00:00Z' },
    { id: `${id}-p3`, college_id: id, url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=900&auto=format&fit=crop&q=80', caption: 'High-Tech Computer Laboratory', category: 'campus', created_at: '2026-01-12T00:00:00Z' },
    { id: `${id}-p4`, college_id: id, url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&auto=format&fit=crop&q=80', caption: 'Modern Science & Engineering Testing Lab', category: 'campus', created_at: '2026-01-13T00:00:00Z' },
    { id: `${id}-p5`, college_id: id, url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&auto=format&fit=crop&q=80', caption: 'College Auditorium & Convocation Hall', category: 'campus', created_at: '2026-01-14T00:00:00Z' },
    { id: `${id}-p6`, college_id: id, url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80', caption: 'Graduation Day & Campus Placement Celebration', category: 'campus', created_at: '2026-01-15T00:00:00Z' },
  ];
}

export function getFullReviewsForCollege(college: College): Review[] {
  const id = college.id;
  const est = college.established_year || 2010;
  const years = 2026 - est;

  return [
    {
      id: `${id}-r1`,
      college_id: id,
      reviewer_name: 'Karthik Raja (Alumnus)',
      rating: 5,
      comment: `The college has an extraordinary ${years}-year heritage. The professors are very supportive, labs are well-maintained, and college bus transit covers my village in Tenkasi district easily. Got placed in a reputed company during campus recruitment!`,
      is_approved: true,
      created_at: '2026-02-14T10:30:00Z',
    },
    {
      id: `${id}-r2`,
      college_id: id,
      reviewer_name: 'Priya Dharshini (Final Year Student)',
      rating: 5,
      comment: `Very safe campus environment, especially for women students. Discipline and academics are top class. Library facilities and placement training helped me build strong confidence for 2026 job interviews.`,
      is_approved: true,
      created_at: '2026-01-20T14:15:00Z',
    },
    {
      id: `${id}-r3`,
      college_id: id,
      reviewer_name: 'M. Sankar (Parent)',
      rating: 4,
      comment: `Affordable fees with excellent government scholarship assistance. Running successfully since ${est}, it has educated thousands of rural students from Tenkasi and surrounding regions. Highly recommended!`,
      is_approved: true,
      created_at: '2025-11-28T09:40:00Z',
    },
  ];
}
