import { GraduationCap, Target, Eye, Heart, Users, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container-app py-6 pb-20 lg:pb-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-700 mb-2">About College Info Portal</h1>
        <p className="text-gray-500 text-sm mb-8">Tenkasi District, Tamil Nadu</p>

        <div className="card p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                College Info Portal - Tenkasi is a centralized platform designed to help students, parents,
                and the public easily find complete information about colleges in and around
                Puliyangudi, Vasudevanallur, Sankarankovil, and nearby areas in Tenkasi district, Tamil Nadu.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="card p-5">
            <Target className="w-8 h-8 text-secondary-500 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">Our Goal</h3>
            <p className="text-sm text-gray-600">
              Provide one place where anyone can search, explore, and compare colleges with full details
              on courses, facilities, admissions, fees, and contact information.
            </p>
          </div>
          <div className="card p-5">
            <Eye className="w-8 h-8 text-accent-500 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">Our Vision</h3>
            <p className="text-sm text-gray-600">
              Make college discovery simple and transparent for every student in the Tenkasi district,
              bridging the information gap between institutions and aspiring learners.
            </p>
          </div>
        </div>

        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">What We Offer</h2>
          <div className="space-y-3">
            {[
              { icon: GraduationCap, text: 'Comprehensive college directory with detailed profiles' },
              { icon: Users, text: 'Course, department, and faculty information' },
              { icon: MapPin, text: 'Interactive map to find colleges near you' },
              { icon: Heart, text: 'Save and compare colleges side by side' },
              { icon: Target, text: 'Admission details, fee structures, and placement info' },
              { icon: Eye, text: 'Reviews and ratings from students and parents' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-primary-600" />
                </div>
                <p className="text-sm text-gray-600 pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 bg-primary-50 border border-primary-100">
          <h3 className="font-semibold text-primary-700 mb-2">Important Note</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            The information on this portal is provided for reference purposes. Ratings and review counts
            shown are based on initial data collection and should not be considered live ratings. For the
            most accurate and up-to-date information, please contact the colleges directly. Information
            not yet available will be displayed as "Information not available" until verified and updated
            by the college administration.
          </p>
        </div>
      </div>
    </div>
  );
}
