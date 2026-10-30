import React, { useState } from 'react';
import {
  MessageCircle,
  CalendarCheck,
  BellRing,
  BarChart3,
  ArrowRight,
  Sparkles,
  Check,
  ChevronRight,
  ShieldCheck,
  Layers,
  Play
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

interface EcosystemFeature {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  accent: 'green' | 'purple';
  metric: string;
  sampleFlow: string;
  actionTab: 'assistant' | 'demos' | 'workflows' | 'impact';
  actionLabel: string;
}

export const EcosystemSection: React.FC = () => {
  const { setActiveTab, setIsInterestModalOpen, openAgentWidget } = useDemo();
  const [activeFeatureId, setActiveFeatureId] = useState<string>('whatsapp');

  const features: EcosystemFeature[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Enquiries',
      tagline: 'Instant Inbound Triage',
      description: 'Help customers enquire about services and start the booking process.',
      icon: <MessageCircle className="w-5 h-5 text-[#2D5A43]" />,
      accent: 'green',
      metric: '24/7 Channel Capture',
      sampleFlow: 'Enquiry received → Verified clinic/venue hours → Preferred slot noted',
      actionTab: 'assistant',
      actionLabel: 'Test in AI Assistant'
    },
    {
      id: 'scheduling',
      name: 'Smart Scheduling',
      tagline: 'Availability Coordination',
      description: 'Check appointment availability and manage bookings.',
      icon: <CalendarCheck className="w-5 h-5 text-[#6D28D9]" />,
      accent: 'purple',
      metric: 'Conflict-Free Slots',
      sampleFlow: 'Live calendar cross-check → Service duration matched → Provisional hold',
      actionTab: 'demos',
      actionLabel: 'Try Booking Demo'
    },
    {
      id: 'followups',
      name: 'Automated Follow-ups',
      tagline: 'Zero-Drop Communication',
      description: 'Coordinate booking confirmations, reminders and customer communication.',
      icon: <BellRing className="w-5 h-5 text-[#2D5A43]" />,
      accent: 'green',
      metric: 'Zero Dropped Leads',
      sampleFlow: 'Staff task created → Preparation notes sent → Timely reminder queued',
      actionTab: 'workflows',
      actionLabel: 'Inspect Workflow'
    },
    {
      id: 'insights',
      name: 'Business Insights',
      tagline: 'Operational Clarity',
      description: 'Review booking activity and lead information.',
      icon: <BarChart3 className="w-5 h-5 text-[#6D28D9]" />,
      accent: 'purple',
      metric: 'Staff Capacity & ROI',
      sampleFlow: 'Inquiry volume tracking → Staff hours saved calculated → Pipeline status',
      actionTab: 'impact',
      actionLabel: 'Calculate ROI'
    }
  ];

  const activeFeature = features.find((f) => f.id === activeFeatureId) || features[0];

  return (
    <section
      aria-labelledby="ecosystem-heading"
      className="bg-white border border-[#E3DDD3] rounded-2xl p-6 sm:p-10 space-y-10 shadow-xs relative overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E7E2DA] text-xs font-semibold tracking-wider uppercase text-[#2D5A43]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6D28D9]" />
          <span>The FlowPilot AI Ecosystem</span>
        </div>

        <h2
          id="ecosystem-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1A1D1C] text-balance"
        >
          Every booking. Connected.
        </h2>

        <p className="text-sm sm:text-base text-[#52605B] leading-relaxed text-balance max-w-2xl">
          Connect customer enquiries, appointment scheduling and follow-ups in one streamlined workflow.
        </p>
      </div>

      {/* Main Interactive Diagram Layout */}
      <div className="space-y-6">
        {/* Desktop & Tablet: Central Hub with Surrounding Feature Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch relative">
          {/* Left Column (2 Cards: WhatsApp & Follow-ups) */}
          <div className="md:col-span-4 flex flex-col justify-between gap-5">
            {/* Card 1: WhatsApp Enquiries */}
            <div
              tabIndex={0}
              role="button"
              aria-pressed={activeFeatureId === 'whatsapp'}
              onClick={() => setActiveFeatureId('whatsapp')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveFeatureId('whatsapp');
                }
              }}
              className={`p-5 rounded-xl border transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F] relative ${
                activeFeatureId === 'whatsapp'
                  ? 'bg-[#FAF8F5] border-[#2D5A43] shadow-sm ring-1 ring-[#2D5A43]/20'
                  : 'bg-white border-[#E5E0D6] hover:border-[#CCDCD0] hover:bg-[#FAF8F5]/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#EBF1EC] border border-[#D0E2D6] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-[#2D5A43]" />
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#EBF1EC] text-[#2D5A43] border border-[#CCDCD0]">
                  ENQUIRIES
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1A1D1C]">1. WhatsApp Enquiries</h3>
              <p className="text-xs text-[#52605B] mt-1 leading-relaxed">
                Help customers enquire about services and start the booking process.
              </p>
              <div className="mt-3 pt-2.5 border-t border-[#EFEBE4] flex items-center justify-between text-[11px] font-medium text-[#2D5A43]">
                <span>24/7 Channel Capture</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3: Automated Follow-ups */}
            <div
              tabIndex={0}
              role="button"
              aria-pressed={activeFeatureId === 'followups'}
              onClick={() => setActiveFeatureId('followups')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveFeatureId('followups');
                }
              }}
              className={`p-5 rounded-xl border transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F] relative ${
                activeFeatureId === 'followups'
                  ? 'bg-[#FAF8F5] border-[#2D5A43] shadow-sm ring-1 ring-[#2D5A43]/20'
                  : 'bg-white border-[#E5E0D6] hover:border-[#CCDCD0] hover:bg-[#FAF8F5]/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#EBF1EC] border border-[#D0E2D6] flex items-center justify-center shrink-0">
                  <BellRing className="w-4 h-4 text-[#2D5A43]" />
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#EBF1EC] text-[#2D5A43] border border-[#CCDCD0]">
                  FOLLOW-UPS
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1A1D1C]">3. Automated Follow-ups</h3>
              <p className="text-xs text-[#52605B] mt-1 leading-relaxed">
                Coordinate booking confirmations, reminders and customer communication.
              </p>
              <div className="mt-3 pt-2.5 border-t border-[#EFEBE4] flex items-center justify-between text-[11px] font-medium text-[#2D5A43]">
                <span>Zero Dropped Leads</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Center Column: Central FlowPilot AI Platform Card (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-center items-center">
            <div className="w-full bg-[#FAF8F5] border-2 border-[#1E3A2F] rounded-2xl p-6 shadow-sm text-center space-y-4 relative">
              {/* Central Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1EC] border border-[#CCDCD0] text-[11px] font-semibold text-[#1E3A2F]">
                <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>CENTRAL PLATFORM HUB</span>
              </div>

              {/* Hub Icon & Title */}
              <div className="space-y-1.5">
                <div className="w-14 h-14 rounded-2xl bg-[#1E3A2F] text-white flex items-center justify-center mx-auto shadow-sm">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1A1D1C] tracking-tight">
                  FlowPilot AI Platform
                </h3>
                <p className="text-xs text-[#52605B] max-w-xs mx-auto leading-relaxed">
                  The central coordination engine uniting your communication channels, staff schedules, and CRM records.
                </p>
              </div>

              {/* Active Connection Indicator */}
              <div className="p-3 bg-white border border-[#E7E2DA] rounded-xl text-left space-y-1 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#73827D]">
                  <span>ACTIVE CONNECTOR</span>
                  <span className="text-[#2D5A43] font-bold">CONNECTED</span>
                </div>
                <div className="font-semibold text-[#1A1D1C] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2D5A43]" />
                  <span>{activeFeature.name}</span>
                </div>
                <p className="text-[11px] text-[#55635F] line-clamp-1">
                  {activeFeature.tagline}
                </p>
              </div>

              {/* Security & Local Status */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#717E79]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A43]" />
                <span>Single Source of Truth</span>
              </div>
            </div>
          </div>

          {/* Right Column (2 Cards: Smart Scheduling & Business Insights) */}
          <div className="md:col-span-4 flex flex-col justify-between gap-5">
            {/* Card 2: Smart Scheduling */}
            <div
              tabIndex={0}
              role="button"
              aria-pressed={activeFeatureId === 'scheduling'}
              onClick={() => setActiveFeatureId('scheduling')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveFeatureId('scheduling');
                }
              }}
              className={`p-5 rounded-xl border transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F] relative ${
                activeFeatureId === 'scheduling'
                  ? 'bg-[#FAF8F5] border-[#6D28D9] shadow-sm ring-1 ring-[#6D28D9]/20'
                  : 'bg-white border-[#E5E0D6] hover:border-[#DDD6FE] hover:bg-[#FAF8F5]/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center shrink-0">
                  <CalendarCheck className="w-4 h-4 text-[#6D28D9]" />
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE]">
                  CALENDAR
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1A1D1C]">2. Smart Scheduling</h3>
              <p className="text-xs text-[#52605B] mt-1 leading-relaxed">
                Check appointment availability and manage bookings.
              </p>
              <div className="mt-3 pt-2.5 border-t border-[#EFEBE4] flex items-center justify-between text-[11px] font-medium text-[#6D28D9]">
                <span>Availability Coordination</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4: Business Insights */}
            <div
              tabIndex={0}
              role="button"
              aria-pressed={activeFeatureId === 'insights'}
              onClick={() => setActiveFeatureId('insights')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveFeatureId('insights');
                }
              }}
              className={`p-5 rounded-xl border transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F] relative ${
                activeFeatureId === 'insights'
                  ? 'bg-[#FAF8F5] border-[#6D28D9] shadow-sm ring-1 ring-[#6D28D9]/20'
                  : 'bg-white border-[#E5E0D6] hover:border-[#DDD6FE] hover:bg-[#FAF8F5]/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center shrink-0">
                  <BarChart3 className="w-4 h-4 text-[#6D28D9]" />
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE]">
                  ANALYTICS
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1A1D1C]">4. Business Insights</h3>
              <p className="text-xs text-[#52605B] mt-1 leading-relaxed">
                Review booking activity and lead information.
              </p>
              <div className="mt-3 pt-2.5 border-t border-[#EFEBE4] flex items-center justify-between text-[11px] font-medium text-[#6D28D9]">
                <span>Staff Capacity & ROI</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Selected Node Flow Preview Bar */}
        <div className="bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1A1D1C]">
                Connected Flow: {activeFeature.name}
              </span>
              <span className="text-[10px] font-mono text-[#2D5A43] bg-[#EBF1EC] px-2 py-0.5 rounded border border-[#CCDCD0]">
                {activeFeature.metric}
              </span>
            </div>
            <p className="text-xs text-[#52605B] leading-relaxed">
              {activeFeature.sampleFlow}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => {
                const el = document.getElementById('product-video-demos');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-[#FAF8F5] border border-[#DDD5C7] text-xs font-semibold text-[#1E3A2F] transition-colors shadow-2xs"
            >
              <Play className="w-3.5 h-3.5 fill-[#1E3A2F] text-[#1E3A2F]" />
              <span>Watch Video Demo</span>
            </button>
            <button
              onClick={() => {
                if (activeFeature.id === 'whatsapp') {
                  openAgentWidget('whatsapp');
                } else {
                  setActiveTab(activeFeature.actionTab);
                }
              }}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1E3A2F] hover:bg-[#284E3F] text-xs font-semibold text-white transition-colors shadow-xs"
            >
              <span>{activeFeature.id === 'whatsapp' ? 'Launch WhatsApp Agent' : activeFeature.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Footer with Clear "Book a Demo" CTA */}
      <div className="pt-2 border-t border-[#EFEBE4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="text-xs sm:text-sm font-bold text-[#1A1D1C]">
            Ready to streamline customer communication?
          </div>
          <div className="text-xs text-[#5B6863]">
            Experience how FlowPilot AI coordinates enquiries, calendar availability, and staff hand-offs.
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsInterestModalOpen(true)}
            className="px-5 py-2.5 rounded-lg bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
