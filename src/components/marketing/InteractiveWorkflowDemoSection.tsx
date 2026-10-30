import React, { useState } from 'react';
import {
  MessageSquare,
  UserCheck,
  CheckCircle2,
  CalendarCheck,
  Send,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Clock,
  Check,
  Bot,
  Layers,
  FileCheck
} from 'lucide-react';

interface StepData {
  step: number;
  label: string;
  badge: string;
  title: string;
  summary: string;
  details: {
    channel: string;
    timestamp: string;
    status: string;
    systemNote: string;
  };
}

const DEMO_STEPS: StepData[] = [
  {
    step: 1,
    label: '1. Enquiry Received',
    badge: 'Channel Ingest',
    title: 'Customer enquiry arrives via WhatsApp or Web',
    summary:
      'A prospective patient or customer sends an inquiry outside typical office hours. FlowPilot automatically intercepts and logs the raw message within milliseconds.',
    details: {
      channel: 'WhatsApp Business API (Encrypted)',
      timestamp: 'Today · 08:42 PM (After Hours)',
      status: 'Ingested & Parsed',
      systemNote: 'Zero staff intervention needed for initial receipt.'
    }
  },
  {
    step: 2,
    label: '2. Details Captured',
    badge: 'Entity Extraction',
    title: 'Key customer & scheduling details captured',
    summary:
      'Natural language processing extracts the customer’s name, requested doctor, date/time preference, and contact credentials without requiring manual form entry.',
    details: {
      channel: 'Automated Intake Pipeline',
      timestamp: 'Today · 08:42 PM (+2 sec)',
      status: 'Data Validated',
      systemNote: 'Entity extractor validates phone format (+91) and slot specificity.'
    }
  },
  {
    step: 3,
    label: '3. Request Categorised',
    badge: 'Rules & Calendar Engine',
    title: 'Request categorised & checked against live schedule',
    summary:
      'FlowPilot checks practitioner Google Calendar availability. Verifies room allocation, applies mandatory 15-minute sanitization buffer, and confirms no scheduling overlap.',
    details: {
      channel: 'Calendar Sync Connector',
      timestamp: 'Today · 08:43 PM',
      status: 'Availability Confirmed',
      systemNote: 'Thursday 03:00 PM is verified free + 15m buffer enforced.'
    }
  },
  {
    step: 4,
    label: '4. Response Prepared',
    badge: 'Smart Communication',
    title: 'Suggested response or staff action prepared',
    summary:
      'An intelligent, polite confirmation message is drafted matching your business tone, holding the appointment slot provisionally for 15 minutes while awaiting visitor confirmation.',
    details: {
      channel: 'Supervised Assistant Engine',
      timestamp: 'Today · 08:43 PM',
      status: 'Draft Approved',
      systemNote: 'Complies with clinic policy boundaries; human supervisor can override anytime.'
    }
  },
  {
    step: 5,
    label: '5. Outcome & Logged',
    badge: 'Audit & Dispatch',
    title: 'Outcome recorded & follow-up status logged',
    summary:
      'Calendar hold finalized, confirmation token generated, automated 24-hour reminder scheduled, and lead record logged in the staff operations pipeline.',
    details: {
      channel: 'Operations Log & Dispatch',
      timestamp: 'Today · 08:43 PM',
      status: 'Completed & Synced',
      systemNote: 'Front-desk morning dashboard updated with full inquiry context.'
    }
  }
];

export const InteractiveWorkflowDemoSection: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const step = DEMO_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
  };

  return (
    <section id="interactive-demo" className="py-20 sm:py-28 bg-white border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2D5A43]">
            Guided Workflow Simulation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D1C] leading-tight">
            How an Enquiry Moves Through FlowPilot
          </h2>
          <p className="text-sm sm:text-base text-[#52605B] leading-relaxed max-w-2xl mx-auto">
            Explore our self-contained, 5-step automation cycle below. Click through the steps to see how incoming messages become organized, confirmed calendar slots.
          </p>
        </div>

        {/* 5-Step Horizontal Navigation Bar */}
        <div className="bg-[#FAF8F5] border border-[#E7E2DA] rounded-2xl p-2 sm:p-2.5">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {DEMO_STEPS.map((s, idx) => {
              const isActive = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F] ${
                    isActive
                      ? 'bg-[#1E3A2F] text-white shadow-sm'
                      : isPast
                      ? 'bg-[#EBF1EC] text-[#1E3A2F] hover:bg-[#DCE7DE]'
                      : 'bg-white text-[#52605B] hover:text-[#1A1D1C] border border-[#E7E2DA]'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono uppercase font-semibold ${isActive ? 'text-[#C0D2C8]' : 'text-[#717E79]'}`}>
                      Stage 0{s.step}
                    </span>
                    {isPast && (
                      <Check className="w-3.5 h-3.5 text-[#2D5A43] shrink-0" />
                    )}
                  </div>
                  <span className="text-xs font-bold leading-snug line-clamp-1">
                    {s.label.replace(/^\d\.\s*/, '')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Visual Display Console (2 Columns) */}
        <div className="bg-[#FAF8F5] border border-[#E7E2DA] rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Step Description & Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D5A43]">
                  <span>Step {step.step} of 5</span>
                  <span aria-hidden="true">·</span>
                  <span>{step.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1D1C] leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-[#52605B] leading-relaxed pt-1">
                  {step.summary}
                </p>
              </div>

              {/* Step Metadata Card */}
              <div className="bg-white rounded-xl border border-[#E7E2DA] p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#EFEBE4]">
                  <span className="text-[#717E79]">Active Channel:</span>
                  <strong className="text-[#1A1D1C] font-mono">{step.details.channel}</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#EFEBE4]">
                  <span className="text-[#717E79]">Status:</span>
                  <span className="text-[#1E3A2F] font-bold">{step.details.status}</span>
                </div>
                <div className="pt-1 text-[11px] text-[#52605B] leading-relaxed">
                  <strong>System Note:</strong> {step.details.systemNote}
                </div>
              </div>

              {/* Step Traversal Buttons */}
              <div className="pt-2 flex items-center gap-3">
                {currentStepIndex > 0 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2.5 rounded-xl border border-[#DCD6CC] bg-white hover:bg-[#FAF8F5] text-[#2F3A36] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                )}

                {currentStepIndex < DEMO_STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#26493B] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next Step ({currentStepIndex + 2} of 5)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="px-5 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#26493B] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restart Demonstration</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleRestart}
                  className="text-xs text-[#717E79] hover:text-[#1A1D1C] underline underline-offset-2 ml-auto cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Right: Realistic Interface Simulation Frame (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#E3DDD3] bg-white shadow-md overflow-hidden">
                {/* Console Bar */}
                <div className="px-4 py-3 bg-[#141715] flex items-center justify-between text-white border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-xs font-mono text-[#D2DDD6] ml-2">
                      workflow.engine · step_0{step.step}.json
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase bg-[#2D5A43] text-white px-2 py-0.5 rounded font-semibold">
                    SIMULATED DEMO DATA
                  </span>
                </div>

                {/* State-Specific Preview Canvas */}
                <div className="p-6 bg-[#FAF8F5] min-h-[340px] flex flex-col justify-between">
                  {/* STEP 1 PREVIEW: Raw Incoming Message */}
                  {step.step === 1 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-[#717E79] pb-2 border-b border-[#E7E2DA]">
                        <span className="flex items-center gap-1.5 font-semibold text-[#1A1D1C]">
                          <MessageSquare className="w-4 h-4 text-[#2D5A43]" />
                          <span>Inbound WhatsApp Stream</span>
                        </span>
                        <span className="font-mono text-[11px]">8:42 PM</span>
                      </div>

                      <div className="bg-[#DCF8C6]/80 border border-emerald-200 rounded-2xl rounded-tl-sm p-4 text-xs space-y-2 max-w-md shadow-2xs">
                        <div className="flex items-center justify-between text-[11px] text-[#2D5A43] font-bold">
                          <span>Sender: +91 98765 43210</span>
                          <span className="text-[#717E79] font-normal">via WhatsApp</span>
                        </div>
                        <p className="text-slate-900 leading-relaxed font-sans text-xs sm:text-sm">
                          "Hello Dr. Sarah's clinic! Do you have an open appointment slot this Thursday around 3:00 PM for a dental examination? My name is Rahul Verma."
                        </p>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-[#CCDCD0] text-xs text-[#1E3A2F] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
                          <span>Inquiry packet ingested & assigned ticket <strong>#WAP-DEL-4091</strong></span>
                        </div>
                        <span className="font-mono text-[10px] text-[#2D5A43]">ACKNOWLEDGED</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 2 PREVIEW: Entity Extraction */}
                  {step.step === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-[#717E79] pb-2 border-b border-[#E7E2DA]">
                        <span className="flex items-center gap-1.5 font-semibold text-[#1A1D1C]">
                          <UserCheck className="w-4 h-4 text-[#2D5A43]" />
                          <span>Extracted Customer & Booking Entities</span>
                        </span>
                        <span className="font-mono text-[10px] text-[#2D5A43] font-bold">100% PARSED</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-white rounded-xl p-3 border border-[#E7E2DA] space-y-1">
                          <span className="text-[10px] font-mono text-[#717E79] uppercase">Customer Name</span>
                          <span className="font-bold text-[#1A1D1C] block">Rahul Verma</span>
                        </div>

                        <div className="bg-white rounded-xl p-3 border border-[#E7E2DA] space-y-1">
                          <span className="text-[10px] font-mono text-[#717E79] uppercase">Requested Doctor</span>
                          <span className="font-bold text-[#1A1D1C] block">Dr. Sarah Nair</span>
                        </div>

                        <div className="bg-white rounded-xl p-3 border border-[#E7E2DA] space-y-1">
                          <span className="text-[10px] font-mono text-[#717E79] uppercase">Requested Time Window</span>
                          <span className="font-bold text-[#1E3A2F] block">Thursday · 03:00 PM</span>
                        </div>

                        <div className="bg-white rounded-xl p-3 border border-[#E7E2DA] space-y-1">
                          <span className="text-[10px] font-mono text-[#717E79] uppercase">Enquiry Service Type</span>
                          <span className="font-bold text-[#1A1D1C] block">Dental Examination</span>
                        </div>
                      </div>

                      <div className="p-3 bg-[#EBF1EC] rounded-xl border border-[#CCDCD0] text-xs text-[#1E3A2F] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0" />
                        <span>All mandatory fields present. Ready for availability verification.</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 PREVIEW: Schedule & Buffer Validation */}
                  {step.step === 3 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-[#717E79] pb-2 border-b border-[#E7E2DA]">
                        <span className="flex items-center gap-1.5 font-semibold text-[#1A1D1C]">
                          <CalendarCheck className="w-4 h-4 text-[#2D5A43]" />
                          <span>Google Calendar Sync & Rule Verification</span>
                        </span>
                        <span className="font-mono text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                          CONFLICT-FREE
                        </span>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-[#E7E2DA] space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1A1D1C]">Dr. Sarah Nair · Thursday Schedule</span>
                          <span className="text-[11px] text-[#717E79]">Buffer Rule: +15 mins</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="p-2.5 rounded-lg border border-[#E7E2DA] bg-[#FAF8F5] text-[#8C9C95]">
                            <span className="block font-bold">02:00 PM</span>
                            <span className="text-[10px]">Occupied</span>
                          </div>

                          <div className="p-2.5 rounded-lg border-2 border-[#1E3A2F] bg-[#EBF1EC] text-[#1E3A2F] font-bold shadow-xs">
                            <span className="block">03:00 PM</span>
                            <span className="text-[10px] text-[#2D5A43]">Available · Hold</span>
                          </div>

                          <div className="p-2.5 rounded-lg border border-[#E7E2DA] bg-[#FAF8F5] text-[#8C9C95]">
                            <span className="block font-bold">04:00 PM</span>
                            <span className="text-[10px]">Buffer Held</span>
                          </div>
                        </div>

                        <div className="p-2 bg-[#FAF8F5] rounded border border-dashed border-[#CCDCD0] text-[11px] text-[#52605B] text-center font-mono">
                          Provisional 15-minute slot lock initiated for Rahul Verma (+91 98765 43210)
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4 PREVIEW: Suggested Response */}
                  {step.step === 4 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-[#717E79] pb-2 border-b border-[#E7E2DA]">
                        <span className="flex items-center gap-1.5 font-semibold text-[#1A1D1C]">
                          <Bot className="w-4 h-4 text-[#2D5A43]" />
                          <span>Prepared Supervised Response</span>
                        </span>
                        <span className="font-mono text-[10px] text-[#2D5A43] font-bold">TEMPLATE VERIFIED</span>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-[#CCDCD0] space-y-2.5 text-xs shadow-2xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-[#1E3A2F]">Outgoing WhatsApp Message (Draft):</span>
                          <span className="text-[#717E79] font-mono">Ready to dispatch</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#DCF8C6]/60 border border-emerald-200/60 text-slate-800 leading-relaxed font-sans">
                          "Hello Rahul, Dr. Sarah Nair has Thursday at 03:00 PM open for your dental examination. We have placed a 15-minute provisional hold on this slot for you. Reply with '1' or tap below to confirm your booking!"
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px] text-[#717E79]">
                          <span>Staff Override: Always Available</span>
                          <span className="text-[#2D5A43] font-semibold">1-Click Auto Dispatch</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5 PREVIEW: Logged Outcome */}
                  {step.step === 5 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-[#717E79] pb-2 border-b border-[#E7E2DA]">
                        <span className="flex items-center gap-1.5 font-semibold text-[#1A1D1C]">
                          <FileCheck className="w-4 h-4 text-[#2D5A43]" />
                          <span>Operations Dashboard Log & Confirmation</span>
                        </span>
                        <span className="font-mono text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                          LOGGED
                        </span>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-[#CCDCD0] space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1A1D1C]">Booking Reference #FP-2026-8941</span>
                          <span className="bg-[#EBF1EC] text-[#1E3A2F] text-[10px] font-bold px-2 py-0.5 rounded">
                            CONFIRMED
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#52605B]">
                          <div>Patient: <strong>Rahul Verma</strong></div>
                          <div>Doctor: <strong>Dr. Sarah Nair</strong></div>
                          <div>Date & Time: <strong>Thu, 28 Oct · 03:00 PM</strong></div>
                          <div>Reminder: <strong>Automated T-2h SMS & WhatsApp</strong></div>
                        </div>

                        <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E7E2DA] flex items-center justify-between text-[11px] text-[#2F3A36]">
                          <span>Staff alert dispatched to front desk console</span>
                          <span className="font-mono text-[#2D5A43] font-bold">SYNC OK</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Operational Footer Disclaimer */}
                  <div className="pt-3 border-t border-[#E7E2DA] flex items-center justify-between text-[11px] text-[#717E79]">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A43]" />
                      <span>Deterministic simulation · Safe visitor evaluation</span>
                    </span>
                    <span>No third-party messages or calendar events created</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
