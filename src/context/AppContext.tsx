import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { getSessionId } from '@/lib/utils';
import { toggleSavedCollege, fetchSavedColleges } from '@/lib/api';

export type ThemeMode = 'slate' | 'midnight' | 'navy' | 'emerald' | 'amber' | 'pure';

export interface ThemeOption {
  id: ThemeMode;
  name: string;
  bgColor: string;
  cardColor: string;
  textColor: string;
  accentColor: string;
  icon: string;
  description: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'slate', name: 'Modern Slate', bgColor: '#f0f4f8', cardColor: '#ffffff', textColor: '#0f172a', accentColor: '#2563eb', icon: '🌟', description: 'Cool modern academic slate' },
  { id: 'midnight', name: 'Deep Midnight', bgColor: '#0a0f1d', cardColor: '#111827', textColor: '#f9fafb', accentColor: '#38bdf8', icon: '🌌', description: 'Sleek luxury dark mode' },
  { id: 'navy', name: 'Royal Navy', bgColor: '#0a1428', cardColor: '#162238', textColor: '#f8fafc', accentColor: '#60a5fa', icon: '🌊', description: 'Prestigious Oxford navy' },
  { id: 'emerald', name: 'Campus Emerald', bgColor: '#eef9f2', cardColor: '#ffffff', textColor: '#064e3b', accentColor: '#059669', icon: '🌿', description: 'Fresh soothing academic mint' },
  { id: 'amber', name: 'Warm Ivory', bgColor: '#faf5ed', cardColor: '#ffffff', textColor: '#451a03', accentColor: '#d97706', icon: '🌅', description: 'Classic university parchment' },
  { id: 'pure', name: 'Pure White', bgColor: '#ffffff', cardColor: '#ffffff', textColor: '#18181b', accentColor: '#4f46e5', icon: '💎', description: 'Crisp minimalist white' },
];

interface AppContextValue {
  sessionId: string;
  savedCollegeIds: string[];
  toggleSave: (collegeId: string) => Promise<void>;
  isSaved: (collegeId: string) => boolean;
  recentlyViewed: string[];
  addToRecentlyViewed: (collegeId: string) => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  themeOptions: ThemeOption[];
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [sessionId] = useState(() => getSessionId());
  const [savedCollegeIds, setSavedCollegeIds] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('cip-theme') as ThemeMode;
    return saved && THEME_OPTIONS.some((t) => t.id === saved) ? saved : 'slate';
  });

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('cip-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    fetchSavedColleges(sessionId).then(setSavedCollegeIds).catch(() => {});

    const stored = localStorage.getItem('cip-recently-viewed');
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, [sessionId]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const toggleSave = useCallback(
    async (collegeId: string) => {
      try {
        const isNowSaved = await toggleSavedCollege(collegeId, sessionId);
        setSavedCollegeIds((prev) =>
          isNowSaved ? [...prev, collegeId] : prev.filter((id) => id !== collegeId)
        );
        showToast(isNowSaved ? 'College saved to your list' : 'College removed from your list', 'info');
      } catch {
        showToast('Could not save college. Please try again.', 'error');
      }
    },
    [sessionId, showToast]
  );

  const isSaved = useCallback((collegeId: string) => savedCollegeIds.includes(collegeId), [savedCollegeIds]);

  const addToRecentlyViewed = useCallback((collegeId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== collegeId);
      const updated = [collegeId, ...filtered].slice(0, 10);
      localStorage.setItem('cip-recently-viewed', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        sessionId,
        savedCollegeIds,
        toggleSave,
        isSaved,
        recentlyViewed,
        addToRecentlyViewed,
        toast,
        showToast,
        theme,
        setTheme,
        themeOptions: THEME_OPTIONS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}


