import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-gray-300 mt-16 pb-16 lg:pb-0">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-lg block leading-none">College Info Portal</span>
                <span className="text-xs text-gray-400 leading-none">Tenkasi District</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop directory for colleges in and around Puliyangudi, Vasudevanallur, Sankarankovil and nearby areas in Tenkasi district, Tamil Nadu.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-accent-400 transition-colors">Home</Link></li>
              <li><Link to="/colleges" className="hover:text-accent-400 transition-colors">All Colleges</Link></li>
              <li><Link to="/map" className="hover:text-accent-400 transition-colors">Map View</Link></li>
              <li><Link to="/compare" className="hover:text-accent-400 transition-colors">Compare Colleges</Link></li>
              <li><Link to="/saved" className="hover:text-accent-400 transition-colors">Saved Colleges</Link></li>
              <li><Link to="/questions" className="hover:text-accent-400 transition-colors">Raise a Question</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/colleges?type=Engineering" className="hover:text-accent-400 transition-colors">Engineering</Link></li>
              <li><Link to="/colleges?type=Arts+%26+Science" className="hover:text-accent-400 transition-colors">Arts & Science</Link></li>
              <li><Link to="/colleges?type=Pharmacy" className="hover:text-accent-400 transition-colors">Pharmacy</Link></li>
              <li><Link to="/colleges?type=Agriculture" className="hover:text-accent-400 transition-colors">Agriculture</Link></li>
              <li><Link to="/colleges?type=Women%27s+College" className="hover:text-accent-400 transition-colors">Women's College</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-accent-400 shrink-0" />
                <span>Tenkasi District, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-400 shrink-0" />
                <a href="tel:+91" className="hover:text-accent-400 transition-colors">Contact us</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-400 shrink-0" />
                <a href="mailto:info@collegeinfoportal.in" className="hover:text-accent-400 transition-colors">info@collegeinfoportal.in</a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-6 text-sm text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>&copy; {new Date().getFullYear()} College Info Portal - Tenkasi. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-accent-400 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-accent-400 transition-colors">Contact</Link>
            <Link to="/admin" className="hover:text-accent-400 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
