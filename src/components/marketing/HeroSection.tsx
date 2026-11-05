import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  User,
  MessageSquare,
  Sparkles,
  Play,
  Film,
  Layers,
  Bot,
  CalendarCheck,
  Zap,
  Check,
  ChevronRight
} from 'lucide-react';
import { CinematicVideoPlayer } from '../common/CinematicVideoPlayer';

interface HeroSectionProps {
  onExploreSolutions: () => void;
  onBookAuditClick: () => void;
  onOpenDashboard?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreSolutions,
  onBookAuditClick,
  onOpenDashboard
}) => {
  const [activeTab, setActiveTab] = useState<'interface' | 'video'>('interface');
  const [simulatedStatus, setSimulatedStatus] = useState<'received' | 'qualified' | 'booked'>('booked');

  return (
    <section id="home" className="relative pt-12 sm:pt-16 pb-20 lg:pb-28 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/80 overflow-hidden">
      {/* Subtle modern background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline, Copy, Dual CTAs, Value Indicators (6 cols) */}
          <div className="lg:col-span-6 space-y-8 text-left">
            {/* Top Subtitle Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI AUTOMATION FOR CUSTOMER OPERATIONS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
              Turn customer enquiries into{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                organised workflows.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed text-balance font-normal">
              See where automation can help your business respond faster, organise enquiries and manage follow-ups — without adding unnecessary complexity.
            </p>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onBookAuditClick}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <span>Get My Free Automation Audit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('clinic-walkthrough') || document.getElementById('walkthrough');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onExploreSolutions();
                }}
                className="px-7 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base shadow-xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-blue-600 fill-current" />
                <span>Watch the Demo</span>
              </button>
            </div>

            {/* Trust and Key Value Points */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Enquiry response 24/7</p>
              </div>

              <div>
                <div className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Supervised</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Staff confirmation control</p>
              </div>

              <div>
                <div className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Zero Code</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Connected in minutes</p>
              </div>
            </div>
          </div>

          {/* Right Column: Polished Product Interface Preview or Cinematic Video (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/70 overflow-hidden">
              {/* Card Header & Switcher */}
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between text-white border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-xs font-mono text-slate-300 ml-2">BookFlow_AI Operations Console</span>
                </div>

                <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('interface')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      activeTab === 'interface'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Workflow UI
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('video')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'video'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Watch Clip</span>
                  </button>
                </div>
              </div>

              {/* View Content */}
              {activeTab === 'interface' ? (
                <div className="p-5 sm:p-6 space-y-5 bg-white">
                  {/* Status Banner */}
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-200/80 rounded-xl px-4 py-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-blue-700 font-semibold">
                      <Bot className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Live Demo Stream: 1 New Multi-Channel Inquiry</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-blue-600 text-white px-2 py-0.5 rounded-md font-semibold">
                      DEMO DATA
                    </span>
                  </div>

                  {/* Flow Simulation Pipeline */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                          <span>WhatsApp Channel · Inbound</span>
                        </span>
                        <span className="font-mono text-[11px]">Just now</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 font-sans shadow-2xs">
                        "Hi, do you have any appointments available this Thursday afternoon for a full consultation?"
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-emerald-200/80 bg-emerald-50/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-emerald-600" />
                          <span>AI Workflow Engine · Automated Qualification</span>
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Rule Matched: Buffer Applied
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 bg-white p-2.5 rounded-lg border border-emerald-200 font-sans shadow-2xs">
                        "We have 2:30 PM and 4:00 PM open with Dr. Sarah. I've placed a provisional 15-minute hold on the 2:30 PM slot for you."
                      </p>
                    </div>

                    {/* Operational Actions */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <CalendarCheck className="w-4 h-4 text-blue-600" />
                        <span>Calendar Slot Held: <strong className="text-slate-900">Thu, 2:30 PM</strong></span>
                      </div>

                      {onOpenDashboard && (
                        <button
                          type="button"
                          onClick={onOpenDashboard}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open Full Workspace</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-950">
                  <div className="rounded-xl overflow-hidden shadow-inner">
                    <CinematicVideoPlayer
                      src="/videos/hero_demo.mp4"
                      poster="/src/assets/images/hero_business_workspace_1792996517950.jpg"
                      title="Business Owner Managing Daily Operations"
                      caption="Cinematic Business Overview: Real business owner managing seamless operations"
                      badge="CINEMATIC HERO CLIP"
                      aspectRatio="16/9"
                    />
                  </div>
                  <div className="p-3 text-xs text-slate-400 flex items-center justify-between">
                    <span>Muted 1080p inline loop with pause & restart controls</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('interface')}
                      className="text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
                    >
                      Return to UI preview
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
