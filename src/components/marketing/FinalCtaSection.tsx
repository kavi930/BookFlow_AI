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
    <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      {/* Subtle modern background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.25)_0%,transparent_75%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>START WITH ZERO RISK</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-balance">
          Find the next workflow worth automating.
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
          Stop losing customer enquiries to manual follow-up delays. Get a custom audit and interactive blueprint tailored to your business in Indian Rupees.
        </p>

        {/* Dual CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onBookAuditClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-blue-50 text-slate-900 font-bold text-base shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Get My Free Automation Audit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-600" />
          </button>

          {onOpenDashboard && (
            <button
              type="button"
              onClick={onOpenDashboard}
              className="w-full sm:w-auto px-7 py-4 rounded-xl border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Request a Live Demo</span>
            </button>
          )}
        </div>

        {/* Reassurance Badges */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Free Initial Audit</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>24-Hour Blueprint Delivery</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero Sales Lock-in or Pressure</span>
          </div>
        </div>
      </div>
    </section>
  );
};
