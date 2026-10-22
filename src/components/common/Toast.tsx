import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useDemo();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      role="region"
      aria-label="Demo notifications"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-xs transition-all duration-200 ${
              isSuccess
                ? 'bg-[#EBF1EC] border-[#CCDCD0] text-[#1A1D1C]'
                : isWarning
                ? 'bg-[#FFF9EE] border-[#F0E2C8] text-[#1A1D1C]'
                : 'bg-white border-[#E3DDD3] text-[#1A1D1C]'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-[#8C5E09]" />}
              {!isSuccess && !isWarning && <Info className="w-4 h-4 text-[#2D5A43]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold flex items-center justify-between text-[#1A1D1C]">
                <span>{toast.title}</span>
                <span className="text-[10px] text-[#71807A] font-mono">SIMULATION</span>
              </div>
              <p className="text-xs text-[#4F5D58] mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 text-[#71807A] hover:text-[#1A1D1C] p-1 rounded-md transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
