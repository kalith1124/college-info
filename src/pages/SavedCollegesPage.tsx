import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { fetchColleges } from '@/lib/api';
import type { College } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import CollegeCard from '@/components/CollegeCard';
import EmptyState from '@/components/EmptyState';
import { CollegeCardSkeleton } from '@/components/Skeleton';

export default function SavedCollegesPage() {
  const { savedCollegeIds, recentlyViewed } = useApp();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchColleges()
      .then(setColleges)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const saved = colleges.filter((c) => savedCollegeIds.includes(c.id));
  const recent = colleges.filter((c) => recentlyViewed.includes(c.id));
  const recentSorted = recent.sort((a, b) => recentlyViewed.indexOf(a.id) - recentlyViewed.indexOf(b.id));

  return (
    <div className="container-app py-6 pb-20 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-700 mb-1">Saved Colleges</h1>
        <p className="text-gray-500 text-sm">Colleges you've bookmarked for later</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => <CollegeCardSkeleton key={i} />)}
        </div>
      ) : saved.length === 0 ? (
        <EmptyState title="No saved colleges yet" icon="Tap the bookmark icon on any college to save it here." />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">{saved.length} saved college{saved.length !== 1 ? 's' : ''}</span>
            <Link to="/colleges" className="text-sm text-secondary-600 hover:text-secondary-700 font-medium flex items-center gap-1">
              Browse More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {saved.map((college) => <CollegeCard key={college.id} college={college} />)}
          </div>
        </>
      )}

      {/* Recently viewed */}
      {recentSorted.length > 0 && (
        <div className="mt-12">
          <h2 className="section-title mb-4">Recently Viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentSorted.slice(0, 4).map((college) => <CollegeCard key={college.id} college={college} />)}
          </div>
        </div>
      )}
    </div>
  );
}
