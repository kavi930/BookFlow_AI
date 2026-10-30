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
    <section id="sample-deliverable" className="py-20 sm:py-28 bg-white border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1EC] border border-[#CCDCD0] text-[#1E3A2F] text-xs font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A43]" />
            <span>Audit Deliverable Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D1C] leading-tight">
            See What Your Free Audit Includes
          </h2>
          <p className="text-base sm:text-lg text-[#52605B] leading-relaxed max-w-2xl mx-auto">
            We don’t send generic sales pitch decks. Here is an authentic look at the prioritized operational blueprint delivered to your inbox within 24 hours.
          </p>
        </div>

        {/* Deliverable Mock Document Container */}
        <div className="max-w-5xl mx-auto bg-[#FAF8F5] border border-[#E7E2DA] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Watermark / Sample Indicator */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E7E2DA]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A2F] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                F
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-[#717E79] tracking-wider block">
                  FLOWPILOT AI · OPERATIONAL AUDIT REPORT
                </span>
                <span className="text-sm font-bold text-[#1A1D1C]">
                  Reference Case #FP-BLR-0482
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] border border-[#E8D4BE] text-[#8C5E09] text-[11px] font-mono font-bold">
              <span>ILLUSTRATIVE SAMPLE REPORT</span>
            </div>
          </div>

          {/* Report Body */}
          <div className="py-8 space-y-8">
            {/* 1. Client Profile Card */}
            <div className="bg-white rounded-2xl border border-[#E7E2DA] p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-[#717E79] block">Business Profile</span>
                <span className="text-sm font-bold text-[#1A1D1C] mt-1 block">Apex Care Clinic</span>
                <span className="text-xs text-[#52605B]">Indiranagar, Bengaluru</span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-[#717E79] block">Audited Channels</span>
                <span className="text-xs font-semibold text-[#1A1D1C] mt-1 block">
                  WhatsApp Business + Website Inquiry Form
                </span>
                <span className="text-xs text-[#52605B]">Avg. 38 inbound queries/day</span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-[#717E79] block">Current Bottleneck Severity</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-xs font-bold text-amber-800">High Leakage in Off-Hours</span>
                </div>
                <span className="text-xs text-[#52605B]">35% unanswered &gt; 8 hours</span>
              </div>
            </div>

            {/* 2. Key Findings & The Workflow Bottleneck */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Finding / Problem */}
              <div className="bg-white rounded-2xl border border-[#E7E2DA] p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Identified Workflow Bottleneck</span>
                </div>
                <h3 className="text-base font-bold text-[#1A1D1C] leading-snug">
                  Evening enquiry lag causes patient drop-off to competing local clinics.
                </h3>
                <p className="text-xs sm:text-sm text-[#52605B] leading-relaxed">
                  35% of all WhatsApp inquiries arrive between 7:00 PM and 10:30 PM after clinic reception closes. Front-desk staff spend 2.2 hours the following morning typing repetitive slot options, by which time 40% of leads have already booked elsewhere.
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E7E2DA] text-xs font-mono text-[#52605B]">
                  Estimated Missed Inquiries: <strong className="text-[#1A1D1C]">12–15 patients/week</strong>
                </div>
              </div>

              {/* Solution / Recommended Automation */}
              <div className="bg-white rounded-2xl border border-[#CCDCD0] p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2 text-[#2D5A43] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#2D5A43] shrink-0" />
                  <span>Recommended Automation Architecture</span>
                </div>
                <h3 className="text-base font-bold text-[#1A1D1C] leading-snug">
                  24/7 Supervised WhatsApp Assistant with Dynamic Slot Holds.
                </h3>
                <p className="text-xs sm:text-sm text-[#52605B] leading-relaxed">
                  Deploy FlowPilot AI on your WhatsApp Business number. Immediately answers routine questions (fees, doctor availability, location) and holds open calendar slots with a 15-minute verification buffer, sending morning summary alerts to staff.
                </p>
                <div className="p-3 bg-[#EBF1EC] rounded-xl border border-[#CCDCD0] text-xs text-[#1E3A2F] font-medium flex items-center justify-between">
                  <span>Implementation Effort: <strong>Low (2–3 business days)</strong></span>
                  <span className="font-mono text-[11px] text-[#2D5A43]">Zero code required</span>
                </div>
              </div>
            </div>

            {/* 3. Priority, Implementation Effort & Suggested Next Action */}
            <div className="bg-white rounded-2xl border border-[#E7E2DA] p-5 sm:p-6 space-y-4">
              <span className="text-xs font-mono uppercase text-[#717E79] font-semibold block">
                Audit Assessment & Priority Breakdown
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#717E79] font-bold block">
                    Automation Priority
                  </span>
                  <span className="text-base font-extrabold text-[#1E3A2F] block">
                    High (Immediate Quick Win)
                  </span>
                  <p className="text-[11px] text-[#52605B]">
                    Addresses direct off-hours patient drop-off with minimal technical overhead.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#717E79] font-bold block">
                    Implementation Effort
                  </span>
                  <span className="text-base font-extrabold text-[#1E3A2F] block">
                    Low (2–3 Days)
                  </span>
                  <p className="text-[11px] text-[#52605B]">
                    Uses existing calendar and verified WhatsApp Business API without codebase modifications.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#CCDCD0] bg-[#EBF1EC]/50 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#2D5A43] font-bold block">
                    Suggested Next Action
                  </span>
                  <span className="text-base font-extrabold text-[#2D5A43] block">
                    Sandbox Buffer Verification
                  </span>
                  <p className="text-[11px] text-[#1E3A2F]">
                    Review practitioner 15-minute sanitization rules with clinical staff in safe preview mode.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Actionable Next Steps */}
            <div className="p-4 bg-[#EBF1EC]/60 rounded-2xl border border-[#CCDCD0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wide block">
                  Ready for your business's custom report?
                </span>
                <p className="text-xs text-[#52605B]">
                  Submit your workflow details to receive your personalized audit within 24 hours.
                </p>
              </div>

              <button
                type="button"
                onClick={onBookAuditClick}
                className="px-5 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#26493B] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
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
