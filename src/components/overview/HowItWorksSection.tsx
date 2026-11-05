import React, { useState } from 'react';
import {
  MessageSquare,
  CalendarCheck,
  Clock,
  CheckCircle2,
  BellRing,
  ArrowRight,
  ShieldAlert,
  Smartphone,
  ChevronRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

interface JourneyStep {
  stepNumber: string;
  title: string;
  shortSummary: string;
  detail: string;
  customerExperience: string;
  backendAction: string;
  badge: string;
  icon: React.ReactNode;
  timeframe: string;
}

export const HowItWorksSection: React.FC = () => {
  const { setActiveTab } = useDemo();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const steps: JourneyStep[] = [
    {
      stepNumber: '01',
      title: 'Inbound Enquiry Received',
      shortSummary: 'Multi-channel message capture 24/7',
      detail:
        'A prospective client reaches out through WhatsApp, the website booking widget, or direct message outside of normal trading hours.',
      customerExperience:
        '"Hi, I need to book a dental consultation for next Thursday morning if Dr. Vance is available."',
      backendAction:
        'BookFlow_AI captures message payload, identifies the customer phone/channel, and parses intent (service: Consultation, requested time: Thursday AM).',
      badge: 'Multichannel Ingestion',
      icon: <MessageSquare className="w-4 h-4 text-[#1E3A2F]" />,
      timeframe: 'Immediate (< 2s)'
    },
    {
      stepNumber: '02',
      title: 'Availability & Safety Screening',
      shortSummary: 'Schedule matching and rule evaluation',
      detail:
        'The system cross-references clinician or chair availability, required service duration (45 mins), and verifies non-emergency safety constraints.',
      customerExperience:
        '"Dr. Vance has two openings this Thursday: 9:15 AM or 11:30 AM. Would either of those suit you?"',
      backendAction:
        'Evaluates calendar conflict matrix. Verifies non-emergency triage flag before proceeding to booking.',
      badge: 'Real-Time Schedule Matrix',
      icon: <CalendarCheck className="w-4 h-4 text-[#2D5A43]" />,
      timeframe: 'Processed in < 4s'
    },
    {
      stepNumber: '03',
      title: 'Provisional Hold & Details Capture',
      shortSummary: 'Temporary slot reservation without double-booking',
      detail:
        'Once the client chooses 9:15 AM, BookFlow_AI places a provisional 15-minute hold on the practitioner roster and collects intake notes.',
      customerExperience:
        'Client selects 9:15 AM and confirms their full name and contact email for the clinic record.',
      backendAction:
        'Lead record created in CRM pipeline under "In Follow-up" with parsed service tags, avoiding duplicate concurrent holds.',
      badge: 'Conflict Prevention',
      icon: <Clock className="w-4 h-4 text-[#8C5E09]" />,
      timeframe: 'Instant Slot Lock'
    },
    {
      stepNumber: '04',
      title: 'Structured Confirmation & Intake',
      shortSummary: 'Instant booking receipt and arrival instructions',
      detail:
        'The appointment is verified. Both client and clinic front-desk receive instant, formatted notifications with location and preparation guidelines.',
      customerExperience:
        'WhatsApp confirmation arrives: "Your visit with Dr. Vance is confirmed for Thursday at 9:15 AM. Please arrive 5 minutes early with photo ID."',
      backendAction:
        'Calendar event marked confirmed. Status updated in staff dashboard. Intake checklist dispatched.',
      badge: 'Two-Way Sync',
      icon: <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />,
      timeframe: 'Dispatched in 6s'
    },
    {
      stepNumber: '05',
      title: 'Context-Aware Follow-Up & Review',
      shortSummary: 'Automated 24h reminders and post-visit loops',
      detail:
        'Prior to the appointment, BookFlow_AI sends a friendly reminder with directions. Following the appointment, it triggers a feedback request and rebooking reminder.',
      customerExperience:
        '24h reminder: "See you tomorrow at 9:15 AM! Reply RESCHEDULE if your plans changed." + post-visit review link.',
      backendAction:
        'Zero front-desk manual SMS drafting. Automatic reschedule detection triggers pipeline status update.',
      badge: 'Retention Engine',
      icon: <BellRing className="w-4 h-4 text-[#6D28D9]" />,
      timeframe: 'Scheduled Automation'
    }
  ];

  const currentStep = steps[activeStepIndex];

  return (
    <section className="bg-white border border-[#E3DDD3] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EFEBE4]">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E7E2DA] text-xs font-semibold tracking-wider uppercase text-[#2D5A43]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2F]" />
            <span>Operational Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1D1C]">
            How BookFlow_AI coordinates the entire journey.
          </h2>
          <p className="text-xs sm:text-sm text-[#52605B] leading-relaxed">
            Follow a customer enquiry from first contact to appointment confirmation and post-visit follow-up.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('workflows')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#D8D2C5] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#1E3A2F] transition-colors shrink-0"
        >
          <span>View full workflow library</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5-Step Horizontal Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isCompleted = idx < activeStepIndex;

          return (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-xl text-left border transition-all relative ${
                isActive
                  ? 'bg-[#FAF8F5] border-[#1E3A2F] shadow-xs'
                  : 'bg-white border-[#E8E3DA] hover:border-[#D0C8BC] hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[11px] font-mono font-bold ${
                    isActive ? 'text-[#1E3A2F]' : 'text-[#8A9791]'
                  }`}
                >
                  STEP {step.stepNumber}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive
                      ? 'bg-[#1E3A2F]'
                      : isCompleted
                      ? 'bg-[#89A595]'
                      : 'bg-[#DDD6C9]'
                  }`}
                />
              </div>
              <div
                className={`text-xs font-semibold line-clamp-1 ${
                  isActive ? 'text-[#1A1D1C]' : 'text-[#505D58]'
                }`}
              >
                {step.title}
              </div>
              <div className="text-[10px] text-[#788782] line-clamp-1 mt-0.5">
                {step.shortSummary}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Interactive Step View (Surgy-style Editorial Card) */}
      <div className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E2D8]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#DCD5C9] flex items-center justify-center shrink-0">
              {currentStep.icon}
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#2D5A43] font-semibold">
                Step {currentStep.stepNumber} · {currentStep.badge}
              </span>
              <h3 className="text-lg font-bold text-[#1A1D1C]">
                {currentStep.title}
              </h3>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white border border-[#E0D9CD] text-[11px] font-mono text-[#586661] self-start sm:self-auto">
            <Clock className="w-3 h-3 text-[#2D5A43]" />
            <span>Response velocity: {currentStep.timeframe}</span>
          </div>
        </div>

        <p className="text-sm text-[#3E4A45] leading-relaxed">
          {currentStep.detail}
        </p>

        {/* 2-Column Split: Customer Interaction vs Business Automation System */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Customer Facing Side */}
          <div className="bg-white border border-[#E3DDD3] rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-[#EFEBE4]">
              <span className="font-semibold text-[#1A1D1C] flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#2D5A43]" />
                <span>Customer Perspective</span>
              </span>
              <span className="font-mono text-[10px] text-[#778580] bg-[#FAF8F5] px-1.5 py-0.5 rounded">
                WHATSAPP / SMS
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC] text-[#242F2A] leading-relaxed italic">
              {currentStep.customerExperience}
            </div>
            <p className="text-[11px] text-[#697772]">
              Customers communicate naturally without downloading new apps or filling out rigid static forms.
            </p>
          </div>

          {/* Business System Side */}
          <div className="bg-white border border-[#E3DDD3] rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-[#EFEBE4]">
              <span className="font-semibold text-[#1A1D1C] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#2D5A43]" />
                <span>BookFlow_AI Backend Process</span>
              </span>
              <span className="font-mono text-[10px] text-[#2D5A43] bg-[#EBF1EC] px-1.5 py-0.5 rounded font-semibold">
                AUTOMATED SYNC
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC] text-[#242F2A] leading-relaxed">
              {currentStep.backendAction}
            </div>
            <p className="text-[11px] text-[#697772]">
              Staff are kept informed in real time with pre-filled CRM records, eliminating manual data entry.
            </p>
          </div>
        </div>

        {/* Navigation buttons between steps */}
        <div className="pt-2 flex items-center justify-between text-xs">
          <button
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              activeStepIndex === 0
                ? 'opacity-40 cursor-not-allowed border-[#E5E0D6] text-[#93A19B]'
                : 'border-[#D0C9BD] bg-white hover:bg-[#FAF8F5] text-[#1A1D1C]'
            }`}
          >
            &larr; Previous Stage
          </button>

          <span className="font-mono text-[11px] text-[#6E7B76]">
            Stage {activeStepIndex + 1} of {steps.length}
          </span>

          <button
            onClick={() =>
              setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))
            }
            disabled={activeStepIndex === steps.length - 1}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              activeStepIndex === steps.length - 1
                ? 'opacity-40 cursor-not-allowed border-[#E5E0D6] text-[#93A19B]'
                : 'border-[#1E3A2F] bg-[#1E3A2F] hover:bg-[#284E3F] text-white'
            }`}
          >
            Next Stage &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
