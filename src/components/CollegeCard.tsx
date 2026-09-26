import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, Globe, Navigation, Eye, Bookmark, BookmarkCheck } from 'lucide-react';
import type { College } from '@/lib/types';
import { getDirectionsUrl, getTelUrl, isCollegeOpen, getInitials } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

interface Props {
  college: College;
  distance?: string;
}

export default function CollegeCard({ college, distance }: Props) {
  const { isSaved, toggleSave } = useApp();
  const saved = isSaved(college.id);
  const open = isCollegeOpen(college.working_hours);

  return (
    <div className="card-hover overflow-hidden group flex flex-col">
      <div className="relative h-44 bg-gradient-to-br from-primary-600 to-secondary-600 overflow-hidden">
        {college.image_url ? (
          <img src={college.image_url} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-display font-bold text-white/30">{getInitials(college.name)}</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="badge bg-white/90 text-primary-700 font-semibold">{college.college_type}</span>
          {college.established_year && (
            <span className="badge bg-primary-800 text-white font-semibold shadow-sm">
              {2026 - college.established_year} Yrs ({college.established_year} - 2026)
            </span>
          )}
          {college.is_featured && (
            <span className="badge bg-accent-500 text-white font-semibold">Featured</span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSave(college.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
          aria-label={saved ? 'Remove from saved' : 'Save college'}
        >
          {saved ? <BookmarkCheck className="w-5 h-5 text-accent-500" /> : <Bookmark className="w-5 h-5 text-gray-600" />}
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="badge bg-white/90 text-gray-700 font-semibold">
            <span className={`w-2 h-2 rounded-full ${open ? 'bg-success-500' : 'bg-error-500'}`} />
            {open ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary-700 mb-1">
          <span>Est. {college.established_year || 2010}</span>
          <span className="text-gray-300">•</span>
          <span className="text-secondary-600 bg-secondary-50 px-2 py-0.5 rounded-full">
            {2026 - (college.established_year || 2010)} Years of Excellence
          </span>
        </div>

        <Link to={`/colleges/${college.slug}`}>
          <h3 className="font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
            {college.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{college.area || college.district}</span>
          {distance && <span className="text-gray-400">• {distance}</span>}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
            <span className="text-sm font-semibold text-gray-700">{college.rating > 0 ? college.rating.toFixed(1) : 'N/A'}</span>
          </div>
          <span className="text-xs text-gray-400">({college.review_count} reviews)</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Eye className="w-3.5 h-3.5" />
          <span>{college.view_count} views</span>
        </div>

        <div className="mt-auto flex items-center gap-2 flex-wrap">
          {college.phone && (
            <a
              href={getTelUrl(college.phone)}
              className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-success-100 hover:text-success-600 transition-colors text-gray-600"
              title="Call"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
          {college.website && (
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-secondary-100 hover:text-secondary-600 transition-colors text-gray-600"
              title="Website"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
          <a
            href={getDirectionsUrl(college.latitude, college.longitude, college.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-primary-100 hover:text-primary-600 transition-colors text-gray-600"
            title="Directions"
          >
            <Navigation className="w-4 h-4" />
          </a>
          <Link
            to={`/colleges/${college.slug}`}
            className="btn-primary text-sm px-4 py-2 ml-auto"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
