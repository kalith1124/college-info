import { Link } from 'react-router-dom';

interface Props {
  title: string;
  icon?: string;
  count?: number;
}

export default function EmptyState({ title, icon = 'No results found', count = 0 }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{count === 0 ? icon : `Try adjusting your filters or search terms.`}</p>
      <Link to="/colleges" className="btn-outline text-sm">
        Browse All Colleges
      </Link>
    </div>
  );
}
