import React, { useState } from 'react';
import {
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Play,
  Film,
  X,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Users,
  Check
} from 'lucide-react';
import { CinematicVideoPlayer } from '../common/CinematicVideoPlayer';
import { BusinessCategory } from '../../types';

interface IndustriesSectionProps {
  onSelectIndustry?: (industry: BusinessCategory) => void;
  onBookAuditClick?: () => void;
}

interface IndustryData {
  id: BusinessCategory;
  title: string;
  tag: string;
  icon: React.ReactNode;
  description: string;
  coreWorkflows: {
    enquiry: string;
    booking: string;
    followup: string;
  };
  sampleScenario: {
    client: string;
    city: string;
    incoming: string;
    automatedResponse: string;
    status: string;
    bufferRule: string;
  };
  videoSrc: string;
  videoPoster: string;
  videoCaption: string;
  videoBadge: string;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onSelectIndustry,
  onBookAuditClick
}) => {
  const [activeTab, setActiveTab] = useState<BusinessCategory>('clinics');
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    videoSrc: string;
    posterSrc: string;
    caption: string;
    badge: string;
  } | null>(null);

  const industries: IndustryData[] = [
    {
      id: 'clinics',
      title: 'Clinics & Healthcare',
      tag: 'Practice Automation',
      icon: <Stethoscope className="w-5 h-5 text-[#2D5A43]" />,
      description:
        'Coordinate routine consultations, specialist appointments, and triage rules with strict patient privacy standards.',
      coreWorkflows: {
        enquiry: 'Appointment enquiries: 24/7 symptom & department triage via WhatsApp',
        booking: 'Booking requests: Doctor availability check with 15-min sanitization buffers',
        followup: 'Follow-ups: Automated 24h & 2h pre-visit reminders + fasting instructions'
      },
      sampleScenario: {
        client: 'Apex Care Clinic',
        city: 'Indiranagar, Bengaluru',
        incoming: '"Hello, do you have an opening for Dr. Sarah tomorrow around 3:00 PM for a dental examination?"',
        automatedResponse: '"Dr. Sarah has 3:00 PM open tomorrow. A 15-minute hold has been reserved for you. Would you like to confirm?"',
        status: 'Provisional Hold · Confirmed',
        bufferRule: '15-min Doctor Sanitization Buffer'
      },
      videoSrc: '/videos/solutions_clinic.mp4',
      videoPoster: '/src/assets/images/solutions_clinic_practice_1792996519101.jpg',
      videoCaption: 'Healthcare consultation room: physician coordinating patient intake',
      videoBadge: 'CLINICAL CARE VIDEO'
    },
    {
      id: 'restaurants',
      title: 'Restaurants & Hospitality',
      tag: 'Table & Guest Management',
      icon: <UtensilsCrossed className="w-5 h-5 text-[#2D5A43]" />,
      description:
        'Manage table reservation requests, seating thresholds, and dietary notes without tedious phone tag during rush hours.',
      coreWorkflows: {
        enquiry: 'Table enquiries: Instant party size and seating time confirmation',
        booking: 'Reservations: Dynamic threshold check with large-group (8+) host alerts',
        followup: 'Customer follow-ups: 2-hour arrival confirmation & dietary notes request'
      },
      sampleScenario: {
        client: 'Urban Table Bistro',
        city: 'Bandra West, Mumbai',
        incoming: '"Can we reserve an outdoor table for 4 guests this Friday at 8:30 PM for a birthday celebration?"',
        automatedResponse: '"Table for 4 at 8:30 PM this Friday is reserved. We have noted the birthday occasion for complimentary dessert!"',
        status: 'Table Reserved · Host Notified',
        bufferRule: '15-min Seating Turn Buffer'
      },
      videoSrc: '/videos/solutions_restaurant.mp4',
      videoPoster: '/src/assets/images/solutions_restaurant_dining_1792996520484.jpg',
      videoCaption: 'Dining floor: manager coordinating seating arrangements and guest preferences',
      videoBadge: 'HOSPITALITY DINING VIDEO'
    },
    {
      id: 'gyms',
      title: 'Gyms & Fitness',
      tag: 'Class & Member Scheduling',
      icon: <Dumbbell className="w-5 h-5 text-[#2D5A43]" />,
      description:
        'Streamline trial passes, personal training bookings, and recurring class sign-ups with zero administrative friction.',
      coreWorkflows: {
        enquiry: 'Membership enquiries: Instant pass & trainer specialization details',
        booking: 'Trial requests: 1-tap trial session pass booking with capacity cap checks',
        followup: 'Reminders: Automated 1-hour workout alert & locker key pass instructions'
      },
      sampleScenario: {
        client: 'Pulse Fitness Studio',
        city: 'Jubilee Hills, Hyderabad',
        incoming: '"Hi, I want to book a free trial pass for the CrossFit class tomorrow at 7:00 AM."',
        automatedResponse: '"Tomorrow 7:00 AM CrossFit has 3 open spots. Your trial pass QR code is generated. Arrive 10 min early!"',
        status: 'Trial Pass Issued · Roster Synced',
        bufferRule: 'Class Cap Limit Enforced (16/16)'
      },
      videoSrc: '/videos/solutions_gym.mp4',
      videoPoster: '/src/assets/images/solutions_gym_fitness_1792996545730.jpg',
      videoCaption: 'Fitness facility: coach welcoming member and reviewing schedule',
      videoBadge: 'FITNESS STUDIO VIDEO'
    },
    {
      id: 'salons',
      title: 'Salons & Beauty',
      tag: 'Stylist & Service Operations',
      icon: <Sparkles className="w-5 h-5 text-[#2D5A43]" />,
      description:
        'Fill specialist chairs, manage variable appointment lengths, and eliminate last-minute cancellations gracefully.',
      coreWorkflows: {
        enquiry: 'Service enquiries: Pricing, duration estimates, and stylist portfolio highlights',
        booking: 'Appointment requests: Multi-service length calculation (color + cut = 90 min)',
        followup: 'Rebooking follow-ups: 4-week automated maintenance check-in & aftercare tips'
      },
      sampleScenario: {
        client: 'Aura Studio & Spa',
        city: 'Koregaon Park, Pune',
        incoming: '"Can I book a haircut and keratin treatment with Priya this Saturday afternoon?"',
        automatedResponse: '"Priya has Saturday 02:00 PM available for Haircut + Keratin (90 min window held). Would you like to confirm?"',
        status: 'Stylist Slot Held · 90m Duration',
        bufferRule: 'Stylist Workstation Buffer Enforced'
      },
      videoSrc: '/videos/solutions_salon.mp4',
      videoPoster: '/src/assets/images/solutions_salon_reception_1792996547631.jpg',
      videoCaption: 'Styling studio: stylist reviewing customer booking details',
      videoBadge: 'BEAUTY SALON VIDEO'
    }
  ];

  const current = industries.find((i) => i.id === activeTab) || industries[0];

  return (
    <section id="industries" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header - Zero pill, clean text kicker */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2D5A43]">
            Tailored Industry Workflows
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D1C] leading-tight">
            Select Your Industry to Explore Custom Workflows
          </h2>
          <p className="text-sm sm:text-base text-[#52605B] leading-relaxed max-w-2xl mx-auto">
            Choose a sector below to see how FlowPilot AI coordinates customer enquiries, booking requests, and automated follow-ups for your specific operational rules.
          </p>
        </div>

        {/* 4 Interactive Selectable Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {industries.map((ind) => {
            const isSelected = activeTab === ind.id;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => {
                  setActiveTab(ind.id);
                  if (onSelectIndustry) onSelectIndustry(ind.id);
                }}
                className={`p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F] ${
                  isSelected
                    ? 'bg-white border-[#1E3A2F] shadow-md ring-2 ring-[#1E3A2F]/10'
                    : 'bg-white/80 border-[#E7E2DA] hover:border-[#CCDCD0] hover:bg-white'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#1E3A2F] text-white' : 'bg-[#EBF1EC] text-[#2D5A43]'
                      }`}
                    >
                      {ind.icon}
                    </div>
                    <span className="text-[11px] font-mono uppercase text-[#717E79]">
                      {ind.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#1A1D1C]">{ind.title}</h3>
                    <p className="text-xs text-[#52605B] mt-1.5 leading-relaxed line-clamp-3">
                      {ind.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EFEBE4] flex items-center justify-between text-xs">
                  <span
                    className={`font-semibold ${
                      isSelected ? 'text-[#1E3A2F]' : 'text-[#717E79]'
                    }`}
                  >
                    {isSelected ? 'Viewing Live Preview' : 'Select to inspect'}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#1E3A2F] translate-x-1' : 'text-[#8C9C95]'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Workflow Preview Pane for the Selected Industry */}
        <div className="bg-white rounded-3xl border border-[#E7E2DA] p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFEBE4]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D5A43]">
                <span>{current.title} Workflow Model</span>
                <span aria-hidden="true">·</span>
                <span>Fictional Sample Case</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D1C]">
                Automated operations for {current.sampleScenario.client} ({current.sampleScenario.city})
              </h3>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() =>
                  setSelectedVideo({
                    title: current.title,
                    videoSrc: current.videoSrc,
                    posterSrc: current.videoPoster,
                    caption: current.videoCaption,
                    badge: current.videoBadge
                  })
                }
                className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFE9] border border-[#DCD6CC] text-[#2F3A36] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#2D5A43]" />
                <span>Watch Real-World Video</span>
              </button>

              {onBookAuditClick && (
                <button
                  type="button"
                  onClick={onBookAuditClick}
                  className="px-4 py-2 rounded-xl bg-[#1E3A2F] hover:bg-[#26493B] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Audit This Workflow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3-Core Workflows breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E2DA] space-y-2">
              <span className="text-[11px] font-mono uppercase font-bold text-[#2D5A43] block">
                01 · Intake & Enquiry
              </span>
              <p className="text-xs text-[#1A1D1C] font-medium leading-relaxed">
                {current.coreWorkflows.enquiry}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E2DA] space-y-2">
              <span className="text-[11px] font-mono uppercase font-bold text-[#2D5A43] block">
                02 · Booking & Schedule
              </span>
              <p className="text-xs text-[#1A1D1C] font-medium leading-relaxed">
                {current.coreWorkflows.booking}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E2DA] space-y-2">
              <span className="text-[11px] font-mono uppercase font-bold text-[#2D5A43] block">
                03 · Follow-Up & Retention
              </span>
              <p className="text-xs text-[#1A1D1C] font-medium leading-relaxed">
                {current.coreWorkflows.followup}
              </p>
            </div>
          </div>

          {/* Live Simulated Conversation & Action Panel */}
          <div className="rounded-2xl border border-[#CCDCD0] bg-[#FAF8F5] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-[#E7E2DA]">
              <span className="font-bold text-[#1A1D1C] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#2D5A43]" />
                <span>Simulated WhatsApp Dialogue & Roster Synchronization</span>
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#EBF1EC] text-[#1E3A2F] px-2 py-0.5 rounded font-bold">
                FICTIONAL SAMPLE DATA
              </span>
            </div>

            <div className="space-y-3">
              {/* Customer message */}
              <div className="bg-white border border-[#E7E2DA] p-3.5 rounded-2xl rounded-tl-sm max-w-lg text-xs space-y-1 shadow-2xs">
                <span className="text-[10px] font-mono text-[#717E79] block">Incoming Customer Enquiry</span>
                <p className="text-[#1A1D1C] font-sans leading-relaxed">{current.sampleScenario.incoming}</p>
              </div>

              {/* Bot / Automation Response */}
              <div className="bg-[#EBF1EC] border border-[#CCDCD0] p-3.5 rounded-2xl rounded-tr-sm max-w-lg ml-auto text-xs space-y-1 shadow-2xs">
                <div className="flex items-center justify-between text-[10px] text-[#2D5A43] font-semibold">
                  <span>FlowPilot AI Supervised Agent</span>
                  <span>Instant Response</span>
                </div>
                <p className="text-[#1E3A2F] font-sans leading-relaxed">{current.sampleScenario.automatedResponse}</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#52605B] border-t border-[#EFEBE4]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0" />
                <span>Enforced Operational Rule: <strong>{current.sampleScenario.bufferRule}</strong></span>
              </div>
              <span className="font-mono text-[11px] text-[#1E3A2F] font-bold">{current.sampleScenario.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Preview if requested */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl max-w-2xl w-full p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-white">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#81C784] fill-current" />
                <h3 className="font-bold text-sm text-white">{selectedVideo.title} — Real-World Footage</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="text-stone-400 hover:text-white p-1 rounded hover:bg-stone-800 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-black shadow-inner">
              <CinematicVideoPlayer
                src={selectedVideo.videoSrc}
                poster={selectedVideo.posterSrc}
                title={selectedVideo.title}
                caption={selectedVideo.caption}
                badge={selectedVideo.badge}
                aspectRatio="16/9"
              />
            </div>

            <div className="pt-1 flex items-center justify-between text-xs text-stone-400">
              <span>{selectedVideo.caption}</span>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="text-[#81C784] hover:underline cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
