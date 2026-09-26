import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useApp, type ThemeMode } from '@/context/AppContext';

interface Props {
  compact?: boolean;
  showLabel?: boolean;
}

export default function ThemeSwitcher({ compact = false, showLabel = true }: Props) {
  const { theme, setTheme, themeOptions } = useApp();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentTheme = themeOptions.find((t) => t.id === theme) || themeOptions[0];

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 flex-wrap p-1.5 rounded-xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm">
        <span className="text-xs font-semibold text-gray-500 pl-1.5 flex items-center gap-1">
          <Palette className="w-3.5 h-3.5 text-primary-600" /> Theme:
        </span>
        {themeOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setTheme(opt.id)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              theme === opt.id
                ? 'bg-primary-600 text-white shadow-sm scale-105'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
            }`}
            title={opt.description}
          >
            <span
              className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
              style={{ backgroundColor: opt.bgColor }}
            />
            <span>{opt.name}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium transition-all shadow-sm"
        title="Change Background Color Theme"
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-inner"
          style={{ backgroundColor: currentTheme.bgColor }}
        />
        <Palette className="w-4 h-4 text-primary-600" />
        {showLabel && <span className="hidden sm:inline">{currentTheme.name}</span>}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 p-3 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fade-in">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-primary-600" />
              Choose Background Color
            </span>
            <span className="text-[11px] text-gray-400">Live Preview</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {themeOptions.map((opt) => {
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTheme(opt.id);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50/50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg border border-black/10 shadow-sm flex items-center justify-center shrink-0"
                      style={{ backgroundColor: opt.bgColor }}
                    >
                      <span className="text-xs">{opt.icon}</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-800">{opt.name}</div>
                      <div className="text-[11px] text-gray-500">{opt.description}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-primary-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
