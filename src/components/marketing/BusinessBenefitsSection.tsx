import React from 'react';
import {
  Clock,
  Layers,
  ShieldCheck,
  Eye,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface BusinessBenefitsSectionProps {
  onBookAuditClick?: () => void;
}

export const BusinessBenefitsSection: React.FC<BusinessBenefitsSectionProps> = ({
  onBookAuditClick
}) => {
  const benefits = [
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: 'Reduced Manual Follow-Up',
      description:
        'Eliminate repetitive phone tag, manual appointment reminders, and back-and-forth time-slot exchanges so your team can focus on in-person client service.',
      highlights: [
        'Automated pre-visit preparation notifications',
        'Direct calendar slot self-selection',
        'Fewer missed calls during peak operating hours'
      ]
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      title: 'Organized Customer Enquiries',
      description:
        'Capture and structure every inquiry from WhatsApp, website forms, and social channels into a single unified workspace with full client context.',
      highlights: [
        'Zero inquiries dropped or left unanswered',
        'Structured patient/client notes attached automatically',
        'Clear categorization by service interest'
      ]
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: 'Consistent Workflows',
      description:
        'Enforce consistent operational rules, room sanitization buffers, deposit policies, and qualification standards across your entire staff.',
      highlights: [
        'Automatic 15-minute buffers between appointments',
        'Standardized intake questions for every client',
        'Reliable policy enforcement without staff guesswork'
      ]
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      title: 'Improved Visibility',
      description:
        'Gain immediate operational clarity into weekly booking trends, peak inquiry hours, and team workload to make informed staffing decisions.',
      highlights: [
        'Transparent status tracking across all leads',
        'Clear visibility into confirmed vs pending requests',
        'Real-time operational overview for business owners'
      ]
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide">
            <span>Operational Advantages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Built for Practical Everyday Impact
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Practical automation that removes friction from your daily schedule while keeping your staff firmly in control.
          </p>
        </div>

        {/* 4 Benefit Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-[#F8FAFC] rounded-2xl border border-slate-200/90 p-8 hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-xs border border-slate-200/80 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {benefit.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 space-y-2">
                  {benefit.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                <span>Core Value 0{index + 1}</span>
                <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  Verified workflow
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Ready to streamline your business operations?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              We build custom workflow maps tailored to your exact service offerings, staff size, and scheduling constraints.
            </p>
          </div>

          {onBookAuditClick && (
            <button
              type="button"
              onClick={onBookAuditClick}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <span>Book a Free Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
