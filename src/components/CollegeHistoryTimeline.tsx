import { Calendar, Award, GraduationCap, Building2, TrendingUp, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import type { College, Milestone } from '@/lib/types';
import { getCollegeRunningInfo, generateMilestones } from '@/lib/college-details-data';

interface Props {
  college: College;
}

export default function CollegeHistoryTimeline({ college }: Props) {
  const runningInfo = getCollegeRunningInfo(college);
  const milestones: Milestone[] = college.milestones && college.milestones.length > 0
    ? college.milestones
    : generateMilestones(college);

  return (
    <div className="space-y-6">
      {/* Years of Excellence Highlight Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs sm:text-sm font-semibold text-accent-300 border border-white/10">
              <Sparkles className="w-4 h-4 text-accent-400" />
              {runningInfo.legacyBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
              Running Successfully for {runningInfo.yearsRunning} Years
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl">
              Established in <span className="text-white font-semibold">{runningInfo.establishedYear}</span>, continuous academic operation up to{' '}
              <span className="text-accent-400 font-semibold">{runningInfo.currentYear}</span>. Educating and empowering students of Tenkasi District for over {runningInfo.yearsRunning} years.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 sm:border-l sm:border-white/15 sm:pl-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-accent-400 font-display">
                {runningInfo.yearsRunning}+
              </div>
              <div className="text-xs text-gray-300 uppercase tracking-wider font-medium">Years Active</div>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                {runningInfo.batchesGraduated}+
              </div>
              <div className="text-xs text-gray-300 uppercase tracking-wider font-medium">Batches Graduated</div>
            </div>
          </div>
        </div>

        {/* Quick Legacy Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent-400 shrink-0" />
            <span><strong className="text-white">Est. Year:</strong> {runningInfo.establishedYear}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-400 shrink-0" />
            <span><strong className="text-white">Span:</strong> {runningInfo.establishedYear} - {runningInfo.currentYear}</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-accent-400 shrink-0" />
            <span><strong className="text-white">Alumni:</strong> {college.alumni_count || runningInfo.estimatedAlumni}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-accent-400 shrink-0" />
            <span><strong className="text-white">Campus:</strong> {college.campus_size || '25+ Acres'}</span>
          </div>
        </div>
      </div>

      {/* Historical Milestones Timeline (From Inception to 2026) */}
      <div className="card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-gray-100">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-display flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              Complete Journey & Timeline ({runningInfo.establishedYear} – {runningInfo.currentYear})
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Historical evolution, growth milestones, and academic achievements from the foundation year up to 2026.
            </p>
          </div>
          <div className="badge bg-primary-100 text-primary-800 font-semibold px-3 py-1 self-start sm:self-auto">
            {runningInfo.milestoneTitle}
          </div>
        </div>

        <div className="relative mt-8 pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary-600 before:via-primary-400 before:to-accent-500">
          {milestones.map((item, index) => {
            const isLast = index === milestones.length - 1;
            return (
              <div key={index} className="relative group">
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ring-4 ring-white shadow-md transition-all ${
                    isLast
                      ? 'bg-accent-600 text-white animate-pulse'
                      : 'bg-primary-600 text-white group-hover:scale-110'
                  }`}
                >
                  {isLast ? (
                    <Sparkles className="w-3.5 h-3.5" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                </div>

                <div className="card p-5 hover:shadow-card-hover transition-all border border-gray-100/80">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-primary-700 text-base sm:text-lg">
                        Year {item.year}
                      </span>
                      {item.tag && (
                        <span className="badge bg-primary-50 text-primary-700 font-medium">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    {isLast && (
                      <span className="badge bg-accent-500 text-white font-bold animate-bounce">
                        Current Status 2026
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vision, Mission & Institutional Strengths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-800 text-base">Vision & Heritage</h4>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {college.vision ||
              'To empower rural and town youth of Tenkasi with high ethical values, innovative modern technical skills, and holistic higher education for self-reliance and global employability.'}
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-secondary-100 text-secondary-700 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-800 text-base">Mission & 2026 Goals</h4>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {college.mission ||
              'Provide affordable, industry-aligned higher education with dedicated corporate placement training, state scholarship facilitation, and research development for 2026-2027.'}
          </p>
        </div>
      </div>

      {/* Highlights & Accolades */}
      {college.highlights && college.highlights.length > 0 && (
        <div className="card p-6">
          <h4 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-500" />
            Key Institutional Highlights
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {college.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-success-600 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
