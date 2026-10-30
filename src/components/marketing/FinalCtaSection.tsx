import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Layers, Sparkles, Clock } from 'lucide-react';

interface FinalCtaSectionProps {
  onBookAuditClick: () => void;
  onOpenDashboard?: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onBookAuditClick,
  onOpenDashboard
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#1E3A2F] text-white relative overflow-hidden">
      {/* Subtle modern background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#2D5A43_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#C0D2C8] text-xs font-semibold tracking-wide backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#81C784]" />
          <span>START WITH ZERO RISK</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-balance">
          Find the next workflow worth automating.
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-[#CCDCD0] max-w-2xl mx-auto leading-relaxed text-balance">
          Stop losing customer enquiries to manual follow-up delays. Get a custom audit and interactive blueprint tailored to your business in Indian Rupees.
        </p>

        {/* Dual CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onBookAuditClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1E3A2F] font-bold text-base shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Get My Free Automation Audit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#1E3A2F]" />
          </button>

          {onOpenDashboard && (
            <button
              type="button"
              onClick={onOpenDashboard}
              className="w-full sm:w-auto px-7 py-4 rounded-xl border border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Layers className="w-4 h-4 text-[#81C784]" />
              <span>Request a Live Demo</span>
            </button>
          )}
        </div>

        {/* Reassurance Badges */}
        <div className="pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#CCDCD0]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#81C784] shrink-0" />
            <span>100% Free Initial Audit</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#81C784] shrink-0" />
            <span>24-Hour Blueprint Delivery</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#81C784] shrink-0" />
            <span>Zero Sales Lock-in or Pressure</span>
          </div>
        </div>
      </div>
    </section>
  );
};
