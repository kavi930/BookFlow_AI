import React from 'react';
import { Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <aside
      aria-label="Simulation disclaimer"
      className="bg-[#F3EFE7] border-b border-[#E3DCcf] text-[#4A5350] py-2 px-4 sticky top-0 z-30 flex items-center justify-between gap-4 flex-wrap text-xs"
    >
      <div className="flex items-center gap-2 font-medium text-[#1E3A2F]">
        <Info className="w-3.5 h-3.5 shrink-0 text-[#2D5A43]" />
        <span className="font-semibold text-xs tracking-wide">INTERACTIVE DEMO</span>
        <span className="text-[#B3AAA0]">·</span>
        <span className="text-[#5B6662] text-[11px]">FICTIONAL SAMPLE DATA</span>
      </div>
      <p className="text-[11px] text-[#5F6864]">
        All enquiries, conversations, and metrics are simulated for demonstration. No real emails, texts, or appointments are sent.
      </p>
    </aside>
  );
};
