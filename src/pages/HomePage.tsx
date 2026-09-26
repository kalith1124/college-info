import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, GraduationCap, Navigation, Star, TrendingUp, Clock, Eye, ArrowRight, BookOpen, FlaskConical, Pill, Wheat, Users, Wrench, HeartPulse, Building2 } from 'lucide-react';
import { fetchColleges } from '@/lib/api';
import type { College } from '@/lib/types';
import CollegeCard from '@/components/CollegeCard';
import { CollegeCardSkeleton } from '@/components/Skeleton';

const CATEGORIES = [
  { name: 'All', icon: GraduationCap, color: 'bg-indigo-50 text-indigo-600', path: '/colleges' },
  { name: 'Arts & Science', icon: BookOpen, color: 'bg-blue-50 text-blue-600', path: '/colleges?type=Arts+%26+Science' },
  { name: 'Engineering', icon: Wrench, color: 'bg-orange-50 text-orange-600', path: '/colleges?type=Engineering' },
  { name: 'Pharmacy', icon: Pill, color: 'bg-green-50 text-green-600', path: '/colleges?type=Pharmacy' },
  { name: 'Agriculture', icon: Wheat, color: 'bg-yellow-50 text-yellow-600', path: '/colleges?type=Agriculture' },
  { name: "Women's College", icon: Users, color: 'bg-pink-50 text-pink-600', path: '/colleges?type=Women%27s+College' },
  { name: 'Polytechnic', icon: Building2, color: 'bg-purple-50 text-purple-600', path: '/colleges?type=Polytechnic' },
  { name: 'Medical / Allied Health', icon: HeartPulse, color: 'bg-red-50 text-red-600', path: '/colleges?type=Medical+%2F+Allied+Health' },
  { name: 'Other', icon: GraduationCap, color: 'bg-gray-50 text-gray-600', path: '/colleges?type=Other' },
];

const DISTRICT_HIGHLIGHTS = [
  { name: 'Tenkasi', path: '/colleges?district=Tenkasi' },
  { name: 'Puliyangudi', path: '/colleges?area=Puliyangudi' },
  { name: 'Sankarankovil', path: '/colleges?area=Sankarankovil' },
  { name: 'Vasudevanallur', path: '/colleges?area=Vasudevanallur' },
  { name: 'Kadayanallur', path: '/colleges?area=Kadayanallur' },
];

export default function HomePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchColleges()
      .then(setColleges)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const featured = colleges.filter((c) => c.is_featured).slice(0, 4);
  const recent = [...colleges].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4);
  const topRated = [...colleges].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const totalGovernment = colleges.filter((college) => college.management_type === 'Government').length;
  const totalPrivate = colleges.filter((college) => college.management_type === 'Private').length;
  const mappedColleges = colleges.filter((college) => college.latitude && college.longitude).length;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-accent-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary-300 blur-3xl" />
        </div>
        <div className="container-app relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <MapPin className="w-4 h-4 text-accent-400" />
              <span>Tenkasi District, Tamil Nadu</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Find the Right College Near You
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Explore colleges, courses, facilities, admission details and contact information in one place.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search college, course or location..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-accent-400/30"
                  />
                </div>
                <button type="submit" className="btn-accent px-6 py-3.5 text-base">
                  <Search className="w-5 h-5" /> Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link to="/colleges" className="btn-accent">
                Explore Colleges <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/map" className="btn bg-white/10 backdrop-blur-sm text-white border border-white/20 px-5 py-2.5 hover:bg-white/20">
                <Navigation className="w-4 h-4" /> Find Nearby Colleges
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-app -mt-8 relative z-10 pb-0">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="card p-5">
            <p className="text-sm text-gray-500">Total Colleges</p>
            <div className="mt-2 flex items-end justify-between">
              <h3 className="text-3xl font-bold text-primary-700">{colleges.length}</h3>
              <GraduationCap className="w-8 h-8 text-primary-200" />
            </div>
          </div>
          <div className="card p-5">
            <p className="text-sm text-gray-500">Government</p>
            <div className="mt-2 flex items-end justify-between">
              <h3 className="text-3xl font-bold text-success-600">{totalGovernment}</h3>
              <Building2 className="w-8 h-8 text-success-200" />
            </div>
          </div>
          <div className="card p-5">
            <p className="text-sm text-gray-500">Private</p>
            <div className="mt-2 flex items-end justify-between">
              <h3 className="text-3xl font-bold text-accent-600">{totalPrivate}</h3>
              <Users className="w-8 h-8 text-accent-200" />
            </div>
          </div>
          <div className="card p-5">
            <p className="text-sm text-gray-500">On Map</p>
            <div className="mt-2 flex items-end justify-between">
              <h3 className="text-3xl font-bold text-secondary-600">{mappedColleges}</h3>
              <Navigation className="w-8 h-8 text-secondary-200" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-10">
        <div className="flex items-center justify-between gap-3 mb-5">
          <h2 className="text-xl font-bold text-gray-800">Explore by Area</h2>
          <Link to="/map" className="text-sm font-medium text-secondary-600 hover:text-secondary-700">Map View</Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {DISTRICT_HIGHLIGHTS.map((area) => (
            <Link
              key={area.name}
              to={area.path}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            >
              {area.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Categories */}
      <section className="container-app py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="flex flex-col items-center gap-2 p-4 rounded-xl card-hover group"
            >
              <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="container-app py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title flex items-center gap-2">
            <Star className="w-6 h-6 text-accent-500 fill-accent-500" /> Popular Colleges
          </h2>
          <Link to="/colleges" className="text-sm text-secondary-600 hover:text-secondary-700 font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <CollegeCardSkeleton key={i} />)
            : featured.map((college) => <CollegeCard key={college.id} college={college} />)}
        </div>
      </section>

      {/* Recently Added */}
      <section className="container-app py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title flex items-center gap-2">
            <Clock className="w-6 h-6 text-secondary-500" /> Recently Added
          </h2>
          <Link to="/colleges" className="text-sm text-secondary-600 hover:text-secondary-700 font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <CollegeCardSkeleton key={i} />)
            : recent.map((college) => <CollegeCard key={college.id} college={college} />)}
        </div>
      </section>

      {/* Top Rated */}
      <section className="container-app py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-success-500" /> Top Searched Colleges
          </h2>
          <Link to="/colleges" className="text-sm text-secondary-600 hover:text-secondary-700 font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <CollegeCardSkeleton key={i} />)
            : topRated.map((college) => <CollegeCard key={college.id} college={college} />)}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-primary-600 py-12 mt-8">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { icon: GraduationCap, label: 'Colleges', value: colleges.length },
              { icon: BookOpen, label: 'Categories', value: CATEGORIES.length },
              { icon: Eye, label: 'Total Views', value: colleges.reduce((sum, c) => sum + c.view_count, 0) },
              { icon: Star, label: 'Reviews', value: colleges.reduce((sum, c) => sum + c.review_count, 0) },
            ].map((stat) => (
              <div key={stat.label}>
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent-400" />
                <div className="text-3xl font-bold font-display">{stat.value}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby CTA */}
      <section className="container-app py-12">
        <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <Navigation className="w-12 h-12 mx-auto mb-4 text-accent-400" />
          <h2 className="text-2xl font-bold mb-2">Find Colleges on the Map</h2>
          <p className="text-gray-100 mb-6 max-w-xl mx-auto">
            See all colleges plotted on an interactive map. Get directions, check distances, and find the nearest campus.
          </p>
          <Link to="/map" className="btn-accent inline-flex">
            Open Map View <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
