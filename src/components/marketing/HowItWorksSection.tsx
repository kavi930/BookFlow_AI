import React, { useState } from 'react';
import {
  FileText,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Play,
  Layers,
  Sparkles,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { CinematicVideoPlayer } from '../common/CinematicVideoPlayer';

interface HowItWorksSectionProps {
  onBookAuditClick?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onBookAuditClick }) => {
  const [showVideo, setShowVideo] = useState(false);

  const steps = [
    {
      number: '01',
      title: 'Share your workflow or business challenge',
      tagline: 'Initial Intake',
      description:
        'Tell us about your customer intake channels (WhatsApp, website forms, phone), your scheduling preferences, and the repetitive daily tasks taking up staff time.',
      details: [
        'Identify high-volume repetitive enquiries',
        'Map existing booking & calendar setup',
        'Review staff buffer and handoff needs'
      ]
    },
    {
      number: '02',
      title: 'Review the recommended automation plan',
      tagline: 'Custom Architecture',
      description:
        'Receive a tailored operational blueprint detailing the automated triage flow, calendar buffer rules, response templates, and staff supervisor checkpoints.',
      details: [
        'Clear step-by-step workflow architecture',
        'Supervisor review and override options',
        'Prioritized quick wins & effort estimates'
      ]
    },
    {
      number: '03',
      title: 'Agree on the implementation and integrations',
      tagline: 'Deployment & Setup',
      description:
        'Finalize the integration scope, connect your official WhatsApp Business and calendar accounts, and run a safe team walkthrough before going live.',
      details: [
        'Secure API & credential configuration',
        'Zero interruption to daily operations',
        'Deployment depends on credentials & testing'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Seamless 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            How BookFlow_AI Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From initial business assessment to connected, reliable automation in three straightforward steps.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowVideo(!showVideo)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-600 text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-blue-600" />
              <span>{showVideo ? 'Hide Workflow Video' : 'Watch Realistic Workflow Video'}</span>
            </button>
          </div>
        </div>

        {/* Optional Collapsible Video Clip */}
        {showVideo && (
          <div className="max-w-4xl mx-auto bg-slate-900 p-3 sm:p-4 rounded-2xl shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="rounded-xl overflow-hidden">
              <CinematicVideoPlayer
                src="/videos/how_it_works.mp4"
                poster="/src/assets/images/how_it_works_receptionist_1792996517616.jpg"
                title="Customer Enquiry and Appointment Organization Workflow"
                caption="Realistic Customer Intake: Enquiry arrival, business review, and appointment scheduling"
                badge="WORKFLOW VIDEO"
                aspectRatio="16/9"
              />
            </div>
            <div className="p-3 text-xs text-slate-300 flex items-center justify-between">
              <span>Realistic business operations in action: customer enquiry to calendar hold</span>
              <button
                type="button"
                onClick={() => setShowVideo(false)}
                className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                Close video
              </button>
            </div>
          </div>
        )}

        {/* 3 Numbered Aligned Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-7 sm:p-8 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-200 relative flex flex-col justify-between group hover:border-blue-400 hover:-translate-y-1"
            >
              <div className="space-y-5">
                {/* Step Number & Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 font-extrabold text-lg flex items-center justify-center border border-blue-200 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all shadow-xs">
                    {step.number}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {step.tagline}
                  </span>
                </div>

                {/* Step Title & Description */}
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bulleted Details */}
                <div className="pt-4 border-t border-slate-200 space-y-2.5 text-xs text-slate-600">
                  {step.details.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom accent indicator */}
              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
                <span>Step {idx + 1} of 3</span>
                <span className="font-mono text-slate-500 font-semibold">Phase 0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Operational Note */}
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 max-w-3xl mx-auto flex items-center justify-between gap-4 text-xs text-slate-700 shadow-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Implementation Note:</strong> Actual live deployment timeline depends on your workflow requirements, API credentials, account permissions, and security testing.
            </span>
          </div>
          <span className="font-mono text-[10px] text-blue-700 shrink-0 uppercase font-semibold">Verified Onboarding</span>
        </div>

        {/* Callout Footer */}
        {onBookAuditClick && (
          <div className="text-center pt-2">
            <p className="text-sm text-slate-600">
              Ready to see how this applies to your specific business?{' '}
              <button
                type="button"
                onClick={onBookAuditClick}
                className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 cursor-pointer"
              >
                Request a personalized automation blueprint
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
