import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, MapPin, Star, Phone, Globe, Navigation, Home, LayoutGrid, Bookmark, Map as MapIcon, Info } from 'lucide-react';

export default function MenuPage() {
  const items = [
    { to: '/', icon: Home, label: 'Home', desc: 'Homepage with search and featured colleges' },
    { to: '/colleges', icon: LayoutGrid, label: 'Colleges', desc: 'Browse all colleges with filters' },
    { to: '/map', icon: MapIcon, label: 'Map', desc: 'View colleges on an interactive map' },
    { to: '/saved', icon: Bookmark, label: 'Saved Colleges', desc: 'Your bookmarked colleges' },
    { to: '/compare', icon: GraduationCap, label: 'Compare Colleges', desc: 'Compare up to 4 colleges side by side' },
    { to: '/about', icon: Info, label: 'About Us', desc: 'Learn about the portal' },
    { to: '/contact', icon: Phone, label: 'Contact Us', desc: 'Get in touch with us' },
  ];

  return (
    <div className="container-app py-6 pb-20 lg:pb-6">
      <h1 className="text-2xl font-bold text-primary-700 mb-6">Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="card p-4 flex items-center gap-4 hover:shadow-card-hover transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-100 transition-colors shrink-0">
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">{item.label}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
