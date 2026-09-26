import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, MapPin, Star } from 'lucide-react';
import { fetchColleges } from '@/lib/api';
import type { College } from '@/lib/types';
import { COLLEGE_TYPES, AREAS, DISTRICTS } from '@/lib/types';
import CollegeCard from '@/components/CollegeCard';
import EmptyState from '@/components/EmptyState';
import { CollegeCardSkeleton } from '@/components/Skeleton';

type SortOption = 'name-az' | 'rating' | 'most-reviewed';

export default function CollegesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const q = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type') || '';
  const districtFilter = searchParams.get('district') || '';
  const areaFilter = searchParams.get('area') || '';
  const managementFilter = searchParams.get('management') || '';
  const sort = (searchParams.get('sort') as SortOption) || 'name-az';

  const [searchInput, setSearchInput] = useState(q);

  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  useEffect(() => {
    fetchColleges()
      .then(setColleges)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = [...colleges];

    if (q) {
      const query = q.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.area?.toLowerCase().includes(query) ||
          c.address.toLowerCase().includes(query) ||
          c.college_type.toLowerCase().includes(query) ||
          c.district.toLowerCase().includes(query)
      );
    }
    if (typeFilter) result = result.filter((c) => c.college_type === typeFilter);
    if (districtFilter) result = result.filter((c) => c.district === districtFilter);
    if (areaFilter) result = result.filter((c) => c.area === areaFilter);
    if (managementFilter) result = result.filter((c) => c.management_type === managementFilter);

    switch (sort) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'most-reviewed':
        result.sort((a, b) => b.review_count - a.review_count);
        break;
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [colleges, q, typeFilter, districtFilter, areaFilter, managementFilter, sort]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam('q', searchInput);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchInput('');
  };

  const hasFilters = q || typeFilter || districtFilter || areaFilter || managementFilter;

  return (
    <div className="container-app py-6 pb-20 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-700 mb-1">All Colleges</h1>
        <p className="text-gray-500 text-sm">Browse and filter colleges in Tenkasi district</p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search college, course or location..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all"
          />
        </div>
      </form>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters - desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="card p-5 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </h3>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-error-500 hover:text-error-600 font-medium">
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">College Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => updateParam('type', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">All Types</option>
                  {COLLEGE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">District</label>
                <select
                  value={districtFilter}
                  onChange={(e) => updateParam('district', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">All Districts</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Location / Area</label>
                <select
                  value={areaFilter}
                  onChange={(e) => updateParam('area', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">All Areas</option>
                  {AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Management</label>
                <select
                  value={managementFilter}
                  onChange={(e) => updateParam('management', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">All</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="Aided">Aided</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          {/* Sort + filter toggle */}
          <div className="flex items-center justify-between mb-4 gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn-outline text-sm py-2"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <span className="text-sm text-gray-500">
                {loading ? 'Loading...' : `${filtered.length} college${filtered.length !== 1 ? 's' : ''} found`}
              </span>
            </div>
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="input-field text-sm w-auto"
            >
              <option value="name-az">Name A-Z</option>
              <option value="rating">Highest Rated</option>
              <option value="most-reviewed">Most Reviewed</option>
            </select>
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="lg:hidden card p-4 mb-4 space-y-4 animate-slide-down">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </h3>
                <button onClick={() => setShowFilters(false)} className="text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">College Type</label>
                <select value={typeFilter} onChange={(e) => updateParam('type', e.target.value)} className="input-field text-sm">
                  <option value="">All Types</option>
                  {COLLEGE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">District</label>
                <select value={districtFilter} onChange={(e) => updateParam('district', e.target.value)} className="input-field text-sm">
                  <option value="">All Districts</option>
                  {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Location / Area</label>
                <select value={areaFilter} onChange={(e) => updateParam('area', e.target.value)} className="input-field text-sm">
                  <option value="">All Areas</option>
                  {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Management</label>
                <select value={managementFilter} onChange={(e) => updateParam('management', e.target.value)} className="input-field text-sm">
                  <option value="">All</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="Aided">Aided</option>
                </select>
              </div>
              {hasFilters && (
                <button onClick={clearFilters} className="btn-outline w-full text-sm py-2">Clear All Filters</button>
              )}
            </div>
          )}

          {/* Active filter chips */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {q && (
                <span className="badge bg-primary-50 text-primary-700 gap-1">
                  <Search className="w-3 h-3" /> "{q}"
                  <button onClick={() => updateParam('q', '')} className="ml-1"><X className="w-3 h-3" /></button>
                </span>
              )}
              {typeFilter && (
                <span className="badge bg-secondary-50 text-secondary-700 gap-1">
                  {typeFilter}
                  <button onClick={() => updateParam('type', '')} className="ml-1"><X className="w-3 h-3" /></button>
                </span>
              )}
              {areaFilter && (
                <span className="badge bg-accent-50 text-accent-700 gap-1">
                  <MapPin className="w-3 h-3" /> {areaFilter}
                  <button onClick={() => updateParam('area', '')} className="ml-1"><X className="w-3 h-3" /></button>
                </span>
              )}
              {managementFilter && (
                <span className="badge bg-success-50 text-success-700 gap-1">
                  {managementFilter}
                  <button onClick={() => updateParam('management', '')} className="ml-1"><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <CollegeCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState title="No colleges found" icon="Try adjusting your filters or search terms." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((college) => <CollegeCard key={college.id} college={college} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
