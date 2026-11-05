import React from 'react';
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  Calendar,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface SampleAuditReportSectionProps {
  onBookAuditClick: () => void;
}

export const SampleAuditReportSection: React.FC<SampleAuditReportSectionProps> = ({
  onBookAuditClick
}) => {
  return (
    <section id="sample-deliverable" className="py-20 sm:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>Audit Deliverable Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            See What Your Free Audit Includes
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We don’t send generic sales pitch decks. Here is an authentic look at the prioritized operational blueprint delivered to your inbox within 24 hours.
          </p>
        </div>

        {/* Deliverable Mock Document Container */}
        <div className="max-w-5xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Watermark / Sample Indicator */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-blue-500/30">
                B
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-slate-500 tracking-wider block">
                  BOOKFLOW_AI · OPERATIONAL AUDIT REPORT
                </span>
                <span className="text-sm font-bold text-slate-900">
                  Reference Case #BF-BLR-0482
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-mono font-bold">
              <span>ILLUSTRATIVE SAMPLE REPORT</span>
            </div>
          </div>

          {/* Report Body */}
          <div className="py-8 space-y-8">
            {/* 1. Client Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-xs">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block">Business Profile</span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">Apex Care Clinic</span>
                <span className="text-xs text-slate-500">Indiranagar, Bengaluru</span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block">Audited Channels</span>
                <span className="text-xs font-semibold text-slate-900 mt-1 block">
                  WhatsApp Business + Website Inquiry Form
                </span>
                <span className="text-xs text-slate-500">Avg. 38 inbound queries/day</span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block">Current Bottleneck Severity</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-bold text-amber-800">High Leakage in Off-Hours</span>
                </div>
                <span className="text-xs text-slate-500">35% unanswered &gt; 8 hours</span>
              </div>
            </div>

            {/* 2. Key Findings & The Workflow Bottleneck */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Finding / Problem */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Identified Workflow Bottleneck</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  Evening enquiry lag causes patient drop-off to competing local clinics.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  35% of all WhatsApp inquiries arrive between 7:00 PM and 10:30 PM after clinic reception closes. Front-desk staff spend 2.2 hours the following morning typing repetitive slot options, by which time 40% of leads have already booked elsewhere.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-600">
                  Estimated Missed Inquiries: <strong className="text-slate-900">12–15 patients/week</strong>
                </div>
              </div>

              {/* Solution / Recommended Automation */}
              <div className="bg-white rounded-2xl border border-blue-200 p-5 sm:p-6 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Recommended Automation Architecture</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  24/7 Supervised WhatsApp Assistant with Dynamic Slot Holds.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Deploy BookFlow_AI on your WhatsApp Business number. Immediately answers routine questions (fees, doctor availability, location) and holds open calendar slots with a 15-minute verification buffer, sending morning summary alerts to staff.
                </p>
                <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-900 font-medium flex items-center justify-between">
                  <span>Implementation Effort: <strong>Low (2–3 business days)</strong></span>
                  <span className="font-mono text-[11px] text-blue-700 font-semibold">Zero code required</span>
                </div>
              </div>
            </div>

            {/* 3. Priority, Implementation Effort & Suggested Next Action */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                Audit Assessment & Priority Breakdown
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                    Automation Priority
                  </span>
                  <span className="text-base font-extrabold text-blue-700 block">
                    High (Immediate Quick Win)
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Addresses direct off-hours patient drop-off with minimal technical overhead.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                    Implementation Effort
                  </span>
                  <span className="text-base font-extrabold text-slate-900 block">
                    Low (2–3 Days)
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Uses existing calendar and verified WhatsApp Business API without codebase modifications.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold block">
                    Suggested Next Action
                  </span>
                  <span className="text-base font-extrabold text-emerald-700 block">
                    Sandbox Buffer Verification
                  </span>
                  <p className="text-[11px] text-emerald-900">
                    Review practitioner 15-minute sanitization rules with clinical staff in safe preview mode.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Actionable Next Steps */}
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wide block">
                  Ready for your business's custom report?
                </span>
                <p className="text-xs text-slate-600">
                  Submit your workflow details to receive your personalized audit within 24 hours.
                </p>
              </div>

              <button
                type="button"
                onClick={onBookAuditClick}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <span>Request My Free Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
