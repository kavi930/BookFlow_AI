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
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1EC] border border-[#CCDCD0] text-[#1E3A2F] text-xs font-semibold tracking-wide">
            <span>Seamless 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D1C] leading-tight">
            How FlowPilot AI Works
          </h2>
          <p className="text-base sm:text-lg text-[#52605B] leading-relaxed max-w-2xl mx-auto">
            From initial business assessment to connected, reliable automation in three straightforward steps.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowVideo(!showVideo)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#DCD6CC] hover:border-[#CCDCD0] text-[#2F3A36] hover:text-[#1E3A2F] text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#2D5A43]" />
              <span>{showVideo ? 'Hide Workflow Video' : 'Watch Realistic Workflow Video'}</span>
            </button>
          </div>
        </div>

        {/* Optional Collapsible Video Clip */}
        {showVideo && (
          <div className="max-w-4xl mx-auto bg-[#141715] p-3 sm:p-4 rounded-2xl shadow-xl border border-stone-800 animate-in fade-in slide-in-from-top-4 duration-300">
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
            <div className="p-3 text-xs text-stone-300 flex items-center justify-between">
              <span>Realistic business operations in action: customer enquiry to calendar hold</span>
              <button
                type="button"
                onClick={() => setShowVideo(false)}
                className="text-[#81C784] hover:text-[#A5D6A7] font-medium cursor-pointer"
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
              className="bg-white rounded-2xl border border-[#E7E2DA] p-7 sm:p-8 shadow-xs hover:shadow-md transition-all duration-200 relative flex flex-col justify-between group hover:border-[#CCDCD0]"
            >
              <div className="space-y-5">
                {/* Step Number & Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#EBF1EC] text-[#1E3A2F] font-extrabold text-lg flex items-center justify-center border border-[#CCDCD0] group-hover:bg-[#1E3A2F] group-hover:text-white transition-colors shadow-xs">
                    {step.number}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737E7A]">
                    {step.tagline}
                  </span>
                </div>

                {/* Step Title & Description */}
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold text-[#1A1D1C] leading-snug group-hover:text-[#1E3A2F] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#52605B] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bulleted Details */}
                <div className="pt-4 border-t border-[#EFEBE4] space-y-2.5 text-xs text-[#52605B]">
                  {step.details.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom accent indicator */}
              <div className="pt-6 mt-6 border-t border-[#FAF8F5] flex items-center justify-between text-xs text-[#737E7A]">
                <span>Step {idx + 1} of 3</span>
                <span className="font-mono text-[#737E7A]">Phase 0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Operational Note */}
        <div className="p-4 rounded-xl bg-white border border-[#E7E2DA] max-w-3xl mx-auto flex items-center justify-between gap-4 text-xs text-[#52605B]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#2D5A43] shrink-0" />
            <span>
              <strong>Implementation Note:</strong> Actual live deployment timeline depends on your workflow requirements, API credentials, account permissions, and security testing.
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#717E79] shrink-0 uppercase">Verified Onboarding</span>
        </div>

        {/* Callout Footer */}
        {onBookAuditClick && (
          <div className="text-center pt-2">
            <p className="text-sm text-[#52605B]">
              Ready to see how this applies to your specific business?{' '}
              <button
                type="button"
                onClick={onBookAuditClick}
                className="text-[#1E3A2F] hover:text-[#2D5A43] font-semibold underline underline-offset-4 cursor-pointer"
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
