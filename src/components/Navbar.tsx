import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GraduationCap, Search, Map as MapIcon, Bookmark, Menu, X, Shield, Home, LayoutGrid, MessageCircleQuestion } from 'lucide-react';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'text-primary-700 bg-primary-50' : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-soft border-b border-gray-100">
        <div className="container-app">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-primary-700 text-lg leading-none block">College Info Portal</span>
                <span className="text-xs text-gray-500 leading-none">Tenkasi District</span>
              </div>
            </Link>

            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search college, course or location..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all"
                />
              </div>
            </form>

            <nav className="hidden lg:flex items-center gap-1">
              <NavLink to="/" className={navLinkClass} end>
                <span className="flex items-center gap-1.5"><Home className="w-4 h-4" /> Home</span>
              </NavLink>
              <NavLink to="/colleges" className={navLinkClass}>
                <span className="flex items-center gap-1.5"><LayoutGrid className="w-4 h-4" /> Colleges</span>
              </NavLink>
              <NavLink to="/map" className={navLinkClass}>
                <span className="flex items-center gap-1.5"><MapIcon className="w-4 h-4" /> Map</span>
              </NavLink>
              <NavLink to="/saved" className={navLinkClass}>
                <span className="flex items-center gap-1.5"><Bookmark className="w-4 h-4" /> Saved</span>
              </NavLink>
              <NavLink to="/compare" className={navLinkClass}>
                Compare
              </NavLink>
              <NavLink to="/questions" className={navLinkClass}>
                <span className="flex items-center gap-1.5"><MessageCircleQuestion className="w-4 h-4" /> Questions</span>
              </NavLink>
              <NavLink to="/admin" className={navLinkClass}>
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Admin</span>
              </NavLink>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-down">
            <div className="container-app py-4 space-y-3">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search college, course or location..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-400 focus:outline-none"
                  />
                </div>
              </form>
              <div className="grid grid-cols-2 gap-2">
                <NavLink to="/" onClick={() => setMobileOpen(false)} className={navLinkClass} end>
                  <span className="flex items-center gap-1.5"><Home className="w-4 h-4" /> Home</span>
                </NavLink>
                <NavLink to="/colleges" onClick={() => setMobileOpen(false)} className={navLinkClass}>
                  <span className="flex items-center gap-1.5"><LayoutGrid className="w-4 h-4" /> Colleges</span>
                </NavLink>
                <NavLink to="/map" onClick={() => setMobileOpen(false)} className={navLinkClass}>
                  <span className="flex items-center gap-1.5"><MapIcon className="w-4 h-4" /> Map</span>
                </NavLink>
                <NavLink to="/saved" onClick={() => setMobileOpen(false)} className={navLinkClass}>
                  <span className="flex items-center gap-1.5"><Bookmark className="w-4 h-4" /> Saved</span>
                </NavLink>
                <NavLink to="/compare" onClick={() => setMobileOpen(false)} className={navLinkClass}>
                  Compare
                </NavLink>
                <NavLink to="/about" onClick={() => setMobileOpen(false)} className={navLinkClass}>
                  About
                </NavLink>
                <NavLink to="/contact" onClick={() => setMobileOpen(false)} className={navLinkClass}>
                  Contact
                </NavLink>
                <NavLink to="/questions" onClick={() => setMobileOpen(false)} className={navLinkClass}>
                  <span className="flex items-center gap-1.5"><MessageCircleQuestion className="w-4 h-4" /> Questions</span>
                </NavLink>
                <NavLink to="/admin" onClick={() => setMobileOpen(false)} className={navLinkClass}>
                  <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Admin</span>
                </NavLink>
              </div>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Background Theme:</span>
                <ThemeSwitcher showLabel />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-5">
          {[
            { to: '/', icon: Home, label: 'Home' },
            { to: '/colleges', icon: LayoutGrid, label: 'Colleges' },
            { to: '/map', icon: MapIcon, label: 'Map' },
            { to: '/saved', icon: Bookmark, label: 'Saved' },
            { to: '/menu', icon: Menu, label: 'Menu' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${
                  isActive ? 'text-primary-600' : 'text-gray-500'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
