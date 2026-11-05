import React from 'react';
import { ShieldCheck, Users, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onBookAuditClick?: () => void;
  onOpenDashboard?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onBookAuditClick,
  onOpenDashboard
}) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
            <span>Our Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            About BookFlow_AI
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We build practical, human-supervised automation workflows that connect customer enquiries directly to your schedule without unnecessary complexity.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Human-in-the-Loop Supervision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              AI should handle repetitive intake questions and calendar checks, while your experienced staff retains ultimate control over patient triage, table reservations, and complex requests.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Reliable Buffer & Policy Rules</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We encode your exact business rules—such as mandatory 15-minute sanitization breaks, cancellation cutoffs, and practitioner specialties—into transparent, unvarying workflows.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Zero Technical Overhead</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No complicated codebases, custom servers, or fragile third-party automations. We deliver a verified, turnkey operational architecture ready to evaluate immediately.
            </p>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {onBookAuditClick && (
            <button
              type="button"
              onClick={onBookAuditClick}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Book a Free Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {onOpenDashboard && (
            <button
              type="button"
              onClick={onOpenDashboard}
              className="px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm transition-all cursor-pointer shadow-xs"
            >
              <span>Open Evaluation Dashboard</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
