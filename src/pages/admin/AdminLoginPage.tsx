import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff, KeyRound, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const { session, signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (session) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const fillDemoCredentials = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
    setError(null);
  };

  const handleQuickLogin = async () => {
    setError(null);
    setSubmitting(true);
    const { error } = await signIn('admin@example.com', 'admin123');
    if (error) {
      setError(error);
      setSubmitting(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
      setSubmitting(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary-500/25 border border-white/20">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display" style={{ color: 'var(--app-text, #0f172a)' }}>
            Admin Login
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sign in to manage college portal information & inquiries
          </p>
        </div>

        {/* Credentials Info Box with Instant Auto-Fill & Quick Login */}
        <div className="rounded-2xl p-5 mb-5 border shadow-lg backdrop-blur-md bg-white/80 dark:bg-slate-900/90 border-primary-500/30 dark:border-primary-500/40">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-primary-500" /> Default Admin Credentials
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Ready to use
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs mb-3">
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700/80">
              <span className="text-gray-500 dark:text-gray-400 block text-[11px] font-medium mb-0.5">Admin ID / Email:</span>
              <strong className="text-gray-900 dark:text-white select-all font-mono font-bold text-xs sm:text-sm">
                admin@example.com
              </strong>
              <span className="block text-[10px] text-gray-400 mt-0.5">(or just: <code className="text-primary-500">admin</code>)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700/80">
              <span className="text-gray-500 dark:text-gray-400 block text-[11px] font-medium mb-0.5">Password:</span>
              <strong className="text-gray-900 dark:text-white select-all font-mono font-bold text-xs sm:text-sm">
                admin123
              </strong>
              <span className="block text-[10px] text-gray-400 mt-0.5">(or: <code className="text-primary-500">admin</code>)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickLogin}
              disabled={submitting}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-primary-500/20 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {submitting ? 'Logging in...' : '1-Click Quick Login'}
            </button>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 font-medium text-xs transition-all border border-gray-300 dark:border-slate-600"
            >
              Auto Fill Form
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4 shadow-xl border border-gray-200/60 dark:border-slate-800">
          {error && (
            <div className="bg-error-500/10 border border-error-500/30 text-error-600 dark:text-error-400 text-sm rounded-xl p-3">
              {error}
            </div>
          )}
          <div>
            <label className="text-sm font-medium mb-1.5 block text-gray-700 dark:text-gray-300">
              Admin ID / Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10 h-11"
                placeholder="admin@example.com or admin"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10 pr-10 h-11"
                placeholder="Enter admin password (admin123)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full py-3 text-sm font-semibold rounded-xl">
            {submitting ? 'Signing in...' : 'Sign In as Administrator'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
          Access restricted to authorized administrators.
        </p>
      </div>
    </div>
  );
}
