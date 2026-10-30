import React, { useState } from 'react';
import {
  Bot,
  UserCheck,
  MessageCircle,
  CalendarCheck,
  Mail,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Send,
  Calendar,
  Layers,
  ChevronRight,
  ShieldAlert,
  Play
} from 'lucide-react';
import { CinematicVideoPlayer } from '../common/CinematicVideoPlayer';

interface SolutionsSectionProps {
  onOpenDashboard?: () => void;
  onBookAuditClick?: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  onOpenDashboard,
  onBookAuditClick
}) => {
  const [activeSolution, setActiveSolution] = useState<number>(0);
  const [showVideo, setShowVideo] = useState(false);

  const solutions = [
    {
      id: 'chatbot',
      name: 'AI Website Chatbot',
      icon: <Bot className="w-5 h-5" />,
      tagline: '24/7 Front-Desk Intelligence',
      headline: 'Engage website visitors and answer routine questions instantly.',
      description:
        'Responds to inquiries about services, operating hours, pricing structures, and practitioner credentials without forcing prospects to wait for office hours.',
      keyCapabilities: [
        'Natural conversation answering FAQs accurately',
        'Direct booking link recommendations',
        'Automatic handoff to staff when questions require clinical/custom answers',
        'Respects business tone and policy boundaries'
      ],
      previewType: 'chat'
    },
    {
      id: 'lead-capture',
      name: 'Lead Capture & Qualification',
      icon: <UserCheck className="w-5 h-5" />,
      tagline: 'Zero-Leak Intake Funnel',
      headline: 'Capture every prospect inquiry and score intent automatically.',
      description:
        'Eliminates lost leads across email, web forms, and chats by gathering essential contact details, budget/urgency requirements, and organizing them in a structured pipeline.',
      keyCapabilities: [
        'Automatic contact detail extraction & validation',
        'Intent tagging (routine vs priority consultations)',
        'Custom qualification questions tailored to your field',
        'Centralized lead pipeline with full activity history'
      ],
      previewType: 'lead'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Automation',
      icon: <MessageCircle className="w-5 h-5" />,
      tagline: 'High-Response Messaging',
      headline: 'Meet customers on their preferred channel with smart workflows.',
      description:
        'Handle appointment requests, send instant acknowledgments, and manage rescheduling inquiries directly over WhatsApp with human supervision always available.',
      keyCapabilities: [
        'Instant response times reducing lead churn',
        'Structured template messages for time-slot selection',
        'Human supervisor takeover with one click',
        'Simulated preview environment for thorough testing'
      ],
      previewType: 'whatsapp'
    },
    {
      id: 'scheduling',
      name: 'Appointment Scheduling',
      icon: <CalendarCheck className="w-5 h-5" />,
      tagline: 'Conflict-Free Calendar Booking',
      headline: 'Let clients book confirmed slots with automatic buffer enforcement.',
      description:
        'Synchronize schedules, enforce 15-minute preparation/sanitization buffers between appointments, and prevent costly double-bookings automatically.',
      keyCapabilities: [
        'Live availability inspection with buffer rules',
        'Provisional hold placement while waiting for confirmations',
        'Multi-staff and room resource allocation',
        'Custom cancellation and rescheduling windows'
      ],
      previewType: 'schedule'
    },
    {
      id: 'email-followups',
      name: 'Email Follow-Ups',
      icon: <Mail className="w-5 h-5" />,
      tagline: 'Timely Pre & Post-Visit Engagement',
      headline: 'Send automated preparation reminders and post-care follow-ups.',
      description:
        'Ensure patients and guests arrive on time with necessary documents or preparation instructions, and nurture client relationships after each visit.',
      keyCapabilities: [
        '24-hour and 2-hour pre-visit automated reminders',
        'Personalized preparation instructions (fasting, parking, paperwork)',
        'Post-service follow-up and review requests',
        'Zero manual drafting required from your front desk'
      ],
      previewType: 'email'
    },
    {
      id: 'analytics',
      name: 'Workflow Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      tagline: 'Operational Visibility',
      headline: 'Clear visibility into enquiry volumes, booking rates, and response times.',
      description:
        'Track daily operational metrics to see which days receive the most enquiries, how fast inquiries are resolved, and where staff spend administrative time.',
      keyCapabilities: [
        'Real-time inquiry status breakdowns',
        'Channel distribution analytics (Web, WhatsApp, Forms)',
        'Average response time tracking',
        'Clear reporting for team resource planning'
      ],
      previewType: 'analytics'
    }
  ];

  const current = solutions[activeSolution];

  return (
    <section id="solutions" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1EC] border border-[#CCDCD0] text-[#1E3A2F] text-xs font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A43]" />
            <span>Core Product Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D1C] leading-tight">
            Six Intelligent Workflow Solutions
          </h2>
          <p className="text-base sm:text-lg text-[#52605B] leading-relaxed max-w-2xl mx-auto">
            Practical automation modules engineered to solve daily operational bottlenecks without replacing human judgment.
          </p>

          <div className="pt-1 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowVideo(!showVideo)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E3DDD3] hover:border-[#CCDCD0] text-[#2F3A36] hover:text-[#1E3A2F] text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#2D5A43]" />
              <span>{showVideo ? 'Hide Feature Footage' : 'Watch Feature Video Clip'}</span>
            </button>
          </div>
        </div>

        {/* Feature Video Player (Collapsible) */}
        {showVideo && (
          <div className="max-w-4xl mx-auto bg-stone-900 p-3 sm:p-4 rounded-2xl shadow-xl border border-stone-800 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="rounded-xl overflow-hidden">
              <CinematicVideoPlayer
                src="/videos/features_laptop.mp4"
                poster="/src/assets/images/features_laptop_interaction_1792996825773.jpg"
                title="Staff Interacting with Booking Interface and Pipeline"
                caption="Natural business interaction: team member navigating appointment booking console"
                badge="INTERFACE FOOTAGE"
                aspectRatio="16/9"
              />
            </div>
            <div className="p-3 text-xs text-stone-300 flex items-center justify-between">
              <span>Authentic interaction with booking interface & customer inquiry pipeline</span>
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

        {/* Solutions Grid Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {solutions.map((sol, index) => {
            const isActive = activeSolution === index;
            return (
              <button
                key={sol.id}
                type="button"
                onClick={() => setActiveSolution(index)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between gap-3 ${
                  isActive
                    ? 'bg-[#1E3A2F] text-white border-[#1E3A2F] shadow-md shadow-[#1E3A2F]/20'
                    : 'bg-white text-[#2F3A36] border-[#E7E2DA] hover:border-[#CCDCD0] hover:bg-[#FAF8F5]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EBF1EC] text-[#2D5A43]'
                  }`}
                >
                  {sol.icon}
                </div>
                <div>
                  <span
                    className={`text-[10px] font-mono uppercase block ${
                      isActive ? 'text-[#C0D2C8]' : 'text-[#7C8B85]'
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold block leading-tight mt-0.5">
                    {sol.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Solution Showcase: Text Left, Interactive Live Product Preview Right */}
        <div className="bg-white rounded-3xl border border-[#E7E2DA] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Solution Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2D5A43] uppercase tracking-wider">
                  <span>{current.tagline}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1D1C] leading-tight">
                  {current.headline}
                </h3>
                <p className="text-sm sm:text-base text-[#52605B] leading-relaxed pt-1">
                  {current.description}
                </p>
              </div>

              {/* Key Capabilities */}
              <div className="space-y-2.5 pt-2 border-t border-[#EFEBE4]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2F3A36] block">
                  Workflow Features:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[#52605B]">
                  {current.keyCapabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center gap-4">
                {onBookAuditClick && (
                  <button
                    type="button"
                    onClick={onBookAuditClick}
                    className="px-5 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#26493B] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Get Workflow Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {onOpenDashboard && (
                  <button
                    type="button"
                    onClick={onOpenDashboard}
                    className="text-xs sm:text-sm font-semibold text-[#2F3A36] hover:text-[#1E3A2F] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore Full Dashboard</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Polished Product Interface Preview (Clearly Labeled DEMO DATA) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-slate-900 shadow-xl overflow-hidden">
                {/* Console Bar */}
                <div className="px-4 py-3 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-xs font-mono text-slate-300 ml-2">
                      preview · {current.id}.workflow
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md">
                      SIMULATED DEMO DATA
                    </span>
                  </div>
                </div>

                {/* Console Content based on active previewType */}
                <div className="p-5 bg-white text-slate-800 min-h-[300px] flex flex-col justify-between">
                  {current.previewType === 'chat' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-100">
                        <span>Customer Website Widget</span>
                        <span className="font-mono text-emerald-600 font-semibold">Live Assistant Online</span>
                      </div>
                      <div className="flex gap-2.5 items-start">
                        <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                          U
                        </div>
                        <div className="bg-slate-100 text-slate-800 p-3 rounded-2xl rounded-tl-sm text-xs max-w-sm">
                          "Hello! What are your consultation hours for Thursday, and can I book Dr. Sarah directly?"
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-start justify-end">
                        <div className="bg-[#EBF1EC] border border-[#CCDCD0] text-[#1E3A2F] p-3 rounded-2xl rounded-tr-sm text-xs max-w-sm space-y-1.5">
                          <p>
                            "Dr. Sarah is seeing patients this Thursday between 9:00 AM and 5:00 PM. We currently have 11:30 AM and 3:15 PM available!"
                          </p>
                          <div className="pt-1 flex gap-2">
                            <span className="inline-block px-2 py-0.5 rounded bg-[#1E3A2F] text-white font-medium text-[11px]">
                              Select 11:30 AM
                            </span>
                            <span className="inline-block px-2 py-0.5 rounded bg-[#D1E2D7] text-[#1E3A2F] font-medium text-[11px]">
                              Select 3:15 PM
                            </span>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-xs font-bold shrink-0">
                          B
                        </div>
                      </div>
                    </div>
                  )}

                  {current.previewType === 'lead' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-100">
                        <span>Lead Pipeline Stream</span>
                        <span className="font-mono text-[#2D5A43] font-semibold">Priority: High</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">Dr. Robert Vance (Specialist Consultation)</span>
                          <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded text-[10px]">
                            QUALIFIED
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                          <div>Channel: <strong>Web Form + SMS</strong></div>
                          <div>Preferred Date: <strong>Tomorrow, 2:00 PM</strong></div>
                        </div>
                        <div className="p-2 bg-white rounded border border-slate-100 text-[11px] text-slate-600">
                          Qualification Note: Returning patient requiring comprehensive review. 15-minute sanitization buffer allocated.
                        </div>
                      </div>
                    </div>
                  )}

                  {current.previewType === 'whatsapp' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-100">
                        <span>WhatsApp Business API Simulated Channel</span>
                        <span className="font-mono text-[#2D5A43] font-semibold">Encrypted Protocol</span>
                      </div>
                      <div className="bg-[#DCF8C6]/60 border border-emerald-200/60 p-3 rounded-xl text-xs space-y-1 text-slate-800 max-w-md">
                        <div className="font-bold text-emerald-900 text-[11px]">FlowPilot Supervised Agent</div>
                        <p>
                          "Hi Emma, your appointment request for Friday at 10:00 AM has been received and verified against Dr. Sarah's live schedule. Would you like to confirm this slot?"
                        </p>
                        <div className="text-[10px] text-slate-400 text-right">09:42 AM · Delivered</div>
                      </div>
                    </div>
                  )}

                  {current.previewType === 'schedule' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-100">
                        <span>Calendar Engine & Buffer Rules</span>
                        <span className="font-mono text-[#2D5A43] font-semibold">Sync: Active</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-400">
                          <div className="font-bold">10:00 AM</div>
                          <div className="text-[10px]">Booked</div>
                        </div>
                        <div className="p-2.5 rounded-lg border border-[#1E3A2F] bg-[#EBF1EC] text-[#1E3A2F] font-bold shadow-xs">
                          <div>11:30 AM</div>
                          <div className="text-[10px] text-[#2D5A43]">Held Slot</div>
                        </div>
                        <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700">
                          <div className="font-bold">02:00 PM</div>
                          <div className="text-[10px] text-emerald-600">Open</div>
                        </div>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-600 flex items-center justify-between">
                        <span>Enforced Rule: <strong>15m buffer after appointment</strong></span>
                        <span className="text-[#2D5A43] font-bold text-[11px]">Validated</span>
                      </div>
                    </div>
                  )}

                  {current.previewType === 'email' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-100">
                        <span>Automated Dispatch Engine</span>
                        <span className="font-mono text-[#2D5A43] font-semibold">T-24h Dispatch</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                        <div className="font-semibold text-slate-800">
                          Subject: Reminder: Your appointment tomorrow at 11:30 AM + Fasting Guide
                        </div>
                        <p className="text-slate-600 text-[11px]">
                          Dear David, this is a friendly reminder for your routine consultation. Please remember to arrive 10 minutes early and bring your valid photo ID.
                        </p>
                      </div>
                    </div>
                  )}

                  {current.previewType === 'analytics' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-100">
                        <span>Weekly Operations Overview</span>
                        <span className="font-mono text-emerald-600 font-semibold">Live Snapshot</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-lg font-extrabold text-slate-900">48</div>
                          <div className="text-[10px] text-slate-500 uppercase font-semibold">Enquiries Logged</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-lg font-extrabold text-blue-600">94%</div>
                          <div className="text-[10px] text-slate-500 uppercase font-semibold">Auto-Responded</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-lg font-extrabold text-emerald-600">&lt; 45s</div>
                          <div className="text-[10px] text-slate-500 uppercase font-semibold">Average Response</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Verification Notice */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Interactive client-side evaluation model</span>
                    </span>
                    <span>No live third-party API dispatched</span>
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
