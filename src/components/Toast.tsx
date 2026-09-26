import { useApp } from '@/context/AppContext';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const config = {
    success: { icon: CheckCircle, bg: 'bg-success-500', text: 'text-white' },
    error: { icon: XCircle, bg: 'bg-error-500', text: 'text-white' },
    info: { icon: Info, bg: 'bg-secondary-500', text: 'text-white' },
  };

  const { icon: Icon, bg, text } = config[toast.type];

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 z-[100] animate-slide-up">
      <div className={`${bg} ${text} px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm`}>
        <Icon className="w-5 h-5 shrink-0" />
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
}
