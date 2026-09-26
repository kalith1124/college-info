import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GitCompare, X, Plus, Star, MapPin, Phone, Globe, Check, Minus, Info } from 'lucide-react';
import { fetchColleges } from '@/lib/api';
import type { College } from '@/lib/types';
import { getTelUrl } from '@/lib/utils';
import { Skeleton } from '@/components/Skeleton';

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    fetchColleges()
      .then(setColleges)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const selected = colleges.filter((c) => selectedIds.includes(c.id));
  const available = colleges.filter((c) => !selectedIds.includes(c.id));

  const addCollege = (id: string) => {
    if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
      if (selectedIds.length + 1 >= 4) setShowPicker(false);
    }
  };

  const removeCollege = (id: string) => {
    setSelectedIds(selectedIds.filter((sid) => sid !== id));
  };

  const compareRows: { label: string; key: keyof College | 'rating_display'; render: (c: College) => React.ReactNode }[] = [
    { label: 'Type', key: 'college_type', render: (c) => c.college_type },
    { label: 'Location', key: 'area', render: (c) => c.area || c.district },
    { label: 'Address', key: 'address', render: (c) => c.address },
    { label: 'Rating', key: 'rating_display', render: (c) => c.rating > 0 ? `${c.rating.toFixed(1)} / 5` : 'N/A' },
    { label: 'Reviews', key: 'review_count', render: (c) => String(c.review_count) },
    { label: 'Management', key: 'management_type', render: (c) => c.management_type },
    { label: 'Established', key: 'established_year', render: (c) => c.established_year ? String(c.established_year) : 'N/A' },
    { label: 'Affiliation', key: 'affiliation', render: (c) => c.affiliation || 'Information not available' },
    { label: 'Accreditation', key: 'accreditation', render: (c) => c.accreditation || 'Information not available' },
    { label: 'Phone', key: 'phone', render: (c) => c.phone ? <a href={getTelUrl(c.phone)} className="text-secondary-600 hover:underline">{c.phone}</a> : 'N/A' },
    { label: 'Website', key: 'website', render: (c) => c.website ? <a href={c.website} target="_blank" rel="noopener noreferrer" className="text-secondary-600 hover:underline truncate block max-w-[150px]">{c.website}</a> : 'N/A' },
    { label: 'Working Hours', key: 'working_hours', render: (c) => c.working_hours },
  ];

  return (
    <div className="container-app py-6 pb-20 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-700 mb-1 flex items-center gap-2">
          <GitCompare className="w-7 h-7" /> Compare Colleges
        </h1>
        <p className="text-gray-500 text-sm">Select 2-4 colleges to compare side by side</p>
      </div>

      {loading ? (
        <Skeleton className="h-64" />
      ) : (
        <>
          {selected.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <GitCompare className="w-10 h-10 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Start Comparing</h3>
              <p className="text-sm text-gray-500 mb-4">Select colleges below to compare them side by side.</p>
              <button onClick={() => setShowPicker(true)} className="btn-primary">
                <Plus className="w-4 h-4" /> Add Colleges
              </button>
            </div>
          ) : (
            <>
              {/* Selected colleges header */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {selected.map((college) => (
                  <div key={college.id} className="card p-4 relative">
                    <button
                      onClick={() => removeCollege(college.id)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-gray-100 hover:bg-error-100 hover:text-error-600 flex items-center justify-center text-gray-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-2">
                      <span className="text-lg font-bold text-primary-600">{college.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                    </div>
                    <Link to={`/colleges/${college.slug}`} className="font-medium text-sm text-gray-800 hover:text-primary-600 line-clamp-2">
                      {college.name}
                    </Link>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" /> {college.area || college.district}
                    </div>
                  </div>
                ))}
                {selected.length < 4 && (
                  <button
                    onClick={() => setShowPicker(true)}
                    className="card p-4 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-primary-400 hover:text-primary-500 text-gray-400 min-h-[120px]"
                  >
                    <Plus className="w-8 h-8" />
                    <span className="text-sm font-medium">Add College</span>
                  </button>
                )}
              </div>

              {/* Comparison table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-3 text-sm font-semibold text-gray-700 bg-gray-50 rounded-tl-lg w-40 sticky left-0 z-10 bg-white">
                        Feature
                      </th>
                      {selected.map((college) => (
                        <th key={college.id} className="text-left p-3 text-sm font-semibold text-gray-700 bg-gray-50 min-w-[200px]">
                          <Link to={`/colleges/${college.slug}`} className="hover:text-primary-600">
                            {college.name}
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map((row, idx) => (
                      <tr key={row.label} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="p-3 text-sm font-medium text-gray-600 sticky left-0 z-10 bg-inherit">
                          {row.label}
                        </td>
                        {selected.map((college) => (
                          <td key={college.id} className="p-3 text-sm text-gray-700">
                            {row.render(college)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-start gap-2 p-4 bg-secondary-50 rounded-lg mt-4">
                <Info className="w-5 h-5 text-secondary-600 shrink-0 mt-0.5" />
                <p className="text-sm text-secondary-800">
                  Information is presented side by side for you to compare and decide. No college is automatically ranked as "best."
                </p>
              </div>
            </>
          )}

          {/* College picker modal */}
          {showPicker && (
            <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowPicker(false)}>
              <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Select a College to Compare</h3>
                  <button onClick={() => setShowPicker(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="overflow-y-auto max-h-[60vh] p-3 space-y-2">
                  {available.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">All colleges have been added.</p>
                  ) : (
                    available.map((college) => (
                      <button
                        key={college.id}
                        onClick={() => addCollege(college.id)}
                        className="w-full text-left card p-3 flex items-center gap-3 hover:shadow-card-hover transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-primary-600">{college.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-800 truncate">{college.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <MapPin className="w-3 h-3" /> {college.area || college.district}
                            {college.rating > 0 && (
                              <>
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 ml-1" />
                                {college.rating.toFixed(1)}
                              </>
                            )}
                          </div>
                        </div>
                        <Plus className="w-5 h-5 text-primary-500" />
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


