import { useState } from 'react';
import { Mail, MapPin, Phone, MessageCircle, Send } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ContactPage() {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    showToast('Thank you for your message. We will get back to you soon.', 'success');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container-app py-6 pb-20 lg:pb-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-700 mb-2">Contact Us</h1>
        <p className="text-gray-500 text-sm mb-8">Have a question or suggestion? We'd love to hear from you.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card p-5 text-center">
            <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Phone</h3>
            <p className="text-sm text-gray-500">Contact us for inquiries</p>
          </div>
          <div className="card p-5 text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Email</h3>
            <p className="text-sm text-gray-500">info@collegeinfoportal.in</p>
          </div>
          <div className="card p-5 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Location</h3>
            <p className="text-sm text-gray-500">Tenkasi District, Tamil Nadu</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Your Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Message</label>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-field min-h-[120px]"
              placeholder="How can we help you?"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
