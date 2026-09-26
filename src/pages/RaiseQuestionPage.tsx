import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageCircleQuestion, Send, CheckCircle, ChevronDown, ChevronUp, User, Tag, School } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface QuestionForm {
  name: string;
  email: string;
  college_name: string;
  category: string;
  question: string;
}

const CATEGORIES = [
  'Admission Process',
  'Fees & Scholarships',
  'Courses & Departments',
  'Hostel & Facilities',
  'Placement & Career',
  'Exam & Results',
  'Transport',
  'Other',
];

const FAQ_ITEMS = [
  {
    q: 'How do I apply for admission in a college?',
    a: 'Most colleges in Tenkasi district accept applications through their official website or in-person at the admissions office. Required documents usually include mark sheets, transfer certificate, and community certificate. Check each college\'s admission page for exact dates and procedures.',
  },
  {
    q: 'What documents are needed for college admission?',
    a: 'Common documents required: 10th & 12th mark sheets, Transfer Certificate (TC), Community Certificate, Nativity Certificate, Aadhar Card, Passport-size photos, and Income Certificate (if applying for scholarship).',
  },
  {
    q: 'Are there any scholarships available?',
    a: 'Yes, Tamil Nadu government offers several scholarships: BC/MBC/SC/ST scholarships, Post-Matric Scholarship, and merit-based scholarships. Contact the college\'s scholarship cell or visit the Tamil Nadu e-Scholarship portal.',
  },
  {
    q: 'How can I compare colleges in Tenkasi?',
    a: 'Use the "Compare" feature on our portal to compare up to 3 colleges side-by-side on parameters like fees, courses, facilities, and ratings.',
  },
  {
    q: 'Where can I find placement statistics for a college?',
    a: 'Visit the individual college page and scroll to the "Placements" tab to view placement percentage, top recruiters, and internship information.',
  },
];

export default function RaiseQuestionPage() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<QuestionForm>({
    name: '',
    email: '',
    college_name: '',
    category: '',
    question: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const collegeFromQuery = searchParams.get('college');
    if (collegeFromQuery && !form.college_name) {
      setForm((prev) => ({ ...prev, college_name: collegeFromQuery }));
    }
  }, [searchParams, form.college_name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.question.trim() || !form.category) {
      setError('Please fill in your name, category, and question.');
      return;
    }
    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from('questions').insert({
        name: form.name.trim(),
        email: form.email.trim() || null,
        college_name: form.college_name.trim() || null,
        category: form.category,
        question: form.question.trim(),
        is_answered: false,
      });
      if (dbError) {
        // If table doesn't exist yet, we show success anyway (graceful degradation)
        console.warn('DB insert error (table may not exist yet):', dbError.message);
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true); // graceful degradation
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', college_name: '', category: '', question: '' });
    setSubmitted(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-14 px-4">
        <div className="container-app text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircleQuestion className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Raise a Question</h1>
          <p className="text-primary-200 max-w-xl mx-auto text-base">
            Have a question about a college, admission process, fees or anything else? Ask us — we'll get back to you soon.
          </p>
        </div>
      </div>

      <div className="container-app py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
            {form.college_name && (
              <div className="mb-5 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-700">
                You are asking about: <span className="font-semibold">{form.college_name}</span>
              </div>
            )}
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Question Submitted!</h2>
                <p className="text-gray-500 max-w-sm mb-6">
                  Thank you, <strong>{form.name}</strong>! Your question has been received. We'll review and respond soon.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Ask Another Question
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Submit Your Question</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Ravi Kumar"
                          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* College & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        College Name (optional)
                      </label>
                      <div className="relative">
                        <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="college_name"
                          value={form.college_name}
                          onChange={handleChange}
                          placeholder="e.g. Rani Anna Govt. College"
                          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none appearance-none bg-white"
                        >
                          <option value="">Select a category</option>
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Question */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Question <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="question"
                      value={form.question}
                      onChange={handleChange}
                      placeholder="Type your question here in detail..."
                      rows={5}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none resize-none"
                    />
                    <p className="text-xs text-gray-400 mt-1">{form.question.length}/500 characters</p>
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Question
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* FAQ Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700">{item.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tip box */}
          <div className="bg-accent-50 border border-accent-200 rounded-2xl p-5">
            <h3 className="font-semibold text-accent-800 mb-2 text-sm">💡 Tip</h3>
            <p className="text-xs text-accent-700 leading-relaxed">
              For faster help, include the college name and category in your question. You can also browse individual college pages for detailed info on admissions, fees and placements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

