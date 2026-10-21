import React from 'react';
import { AlertCircle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <aside
      aria-label="Simulation disclaimer"
      className="bg-[#091122] border-b border-cyan-900/30 text-xs text-slate-300 py-1.5 px-4 sticky top-0 z-30 flex items-center justify-between gap-4 flex-wrap"
    >
      <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-cyan-400">
        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
        <span className="font-semibold text-cyan-300">INTERACTIVE DEMO</span>
        <span className="text-slate-500">·</span>
        <span className="text-slate-400">FICTIONAL DATA ONLY</span>
      </div>
      <p className="text-[11px] text-slate-400">
        All businesses, conversations, metrics, and leads are simulated. No actual emails, messages, or calendar appointments are created.
      </p>
    </aside>
  );
};
