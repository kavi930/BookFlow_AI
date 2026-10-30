import React, { useState } from 'react';
import {
  Calendar,
  MessageSquare,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  BellRing,
  BarChart3,
  User,
  AlertCircle,
  CalendarCheck,
  Video,
  Laptop
} from 'lucide-react';
import { CinematicVideoPlayer } from '../common/CinematicVideoPlayer';
import featuresPoster from '../../assets/images/features_laptop_interaction_1792996825773.jpg';

interface ProductShowcaseSectionProps {
  onExploreFeature: (featureId: string) => void;
  onBookDemoClick: () => void;
}

export const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  onExploreFeature,
  onBookDemoClick
}) => {
  // Section A: View Mode (Simulator vs Cinematic Video)
  const [capabilityAView, setCapabilityAView] = useState<'simulator' | 'video'>('simulator');

  // Section A: Interactive Slot Demo State
  const [selectedSlotA, setSelectedSlotA] = useState<string>('11:00 AM');
  const [bookingConfirmedA, setBookingConfirmedA] = useState<boolean>(false);

  // Section C: Calendar View Mode State
  const [calendarViewC, setCalendarViewC] = useState<'day' | 'week'>('day');

  return (
    <section id="product-showcase" className="py-16 sm:py-24 bg-white border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#2D5A43] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A43]" />
            <span>Product Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1D1C]">
            Engineered for clarity. Designed for real workflows.
          </h2>
          <p className="text-base sm:text-lg text-[#52605B] leading-relaxed">
            Discover how FlowPilot AI replaces fragmented messaging, missed calls, and manual calendars with an integrated, verified workflow.
          </p>
        </div>

        {/* ============================================================== */}
        {/* CAPABILITY A: Smart Appointment Booking (Text Left, Visual Right) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3A2F] uppercase tracking-wider">
              <CalendarCheck className="w-4 h-4 text-[#2D5A43]" />
              <span>A. Smart Appointment Booking</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1D1C] leading-snug">
              Frictionless booking that fills schedules without manual waiting.
            </h3>

            <p className="text-sm sm:text-base text-[#52605B] leading-relaxed">
              Customers choose available appointment times directly from your verified schedule. Real-time availability checks eliminate double-bookings and ensure clients never wait hours for manual confirmation.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#4E5854]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Clear Availability States:</strong> Explicit display of open, held, and filled appointment windows with no guesswork.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Instant Client Confirmation:</strong> Sends immediate digital appointment tickets with preparatory instructions.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Turnaround Buffers:</strong> Enforces room sanitization, intake setup, and staff breathers between clients.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onExploreFeature('booking')}
                className="px-5 py-2.5 rounded-lg bg-[#1E3A2F] hover:bg-[#284E3F] text-white text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F]"
              >
                <span>Explore Booking Engine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Product Visual: Realistic Slot Selection Interface or Natural Laptop Video */}
          <div className="lg:col-span-7 space-y-3">
            {/* View Mode Switcher */}
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-mono text-[#52605B] uppercase font-semibold">
                Feature Demonstration
              </span>
              <div className="inline-flex items-center gap-1 p-1 bg-[#EAE5DC]/70 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setCapabilityAView('simulator')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    capabilityAView === 'simulator'
                      ? 'bg-white text-[#1E3A2F] shadow-xs font-semibold'
                      : 'text-[#52605B] hover:text-[#1A1D1C]'
                  }`}
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Interactive Simulator</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCapabilityAView('video')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    capabilityAView === 'video'
                      ? 'bg-white text-[#1E3A2F] shadow-xs font-semibold'
                      : 'text-[#52605B] hover:text-[#1A1D1C]'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Natural Laptop Video</span>
                </button>
              </div>
            </div>

            {capabilityAView === 'video' ? (
              <CinematicVideoPlayer
                src="/videos/features_laptop.mp4"
                poster={featuresPoster}
                title="Natural Interaction: Laptop Booking Interface"
                badge="REALISTIC WORKFLOW VIDEO"
                aspectRatio="16/9"
                caption="Business manager naturally reviewing schedule availability, customer booking requests, and calendar buffers on a laptop in a calm workspace"
                autoPlay={true}
                loop={true}
              />
            ) : (
              <div className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">
                {/* Card Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA] text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1E3A2F]" />
                    <span className="font-semibold text-[#1A1D1C]">Appointment Slot Selector · Demonstration</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#2D5A43] bg-[#EBF1EC] px-2 py-0.5 rounded font-semibold border border-[#CCDCD0]">
                    SIMULATED INTERACTION
                  </span>
                </div>

                {/* Service Details Card */}
                <div className="bg-white border border-[#E7E2DA] rounded-xl p-4 space-y-1">
                  <span className="text-[11px] font-mono text-[#788882] uppercase">Selected Service</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1A1D1C]">Comprehensive Dental Hygiene & Polish</span>
                    <span className="text-xs font-mono font-semibold text-[#1E3A2F] bg-[#FAF8F5] px-2 py-1 rounded border border-[#E3DDD3]">45 mins</span>
                  </div>
                  <p className="text-xs text-[#52605B]">Provider: Dr. Alan Morales · Clinic Room 2B</p>
                </div>

                {/* Interactive Date & Slot Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#52605B]">
                    <span className="font-semibold text-[#1A1D1C]">Thursday, October 24</span>
                    <span className="text-[11px] text-[#2D5A43] font-mono">3 Openings Available</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                    {/* Slot 1: Open */}
                    <button
                      type="button"
                      onClick={() => { setSelectedSlotA('9:30 AM'); setBookingConfirmedA(false); }}
                      className={`p-3 rounded-lg border transition-all text-left cursor-pointer ${
                        selectedSlotA === '9:30 AM'
                          ? 'bg-[#EBF1EC] border-2 border-[#1E3A2F] text-[#1E3A2F]'
                          : 'bg-white border-[#E2DDD5] text-[#2F3A35] hover:border-[#1E3A2F]'
                      }`}
                    >
                      <span className="font-mono font-bold block">09:30 AM</span>
                      <span className="text-[10px] text-[#55635F] mt-0.5 block">Morning Slot</span>
                    </button>

                    {/* Slot 2: Selected */}
                    <button
                      type="button"
                      onClick={() => { setSelectedSlotA('11:00 AM'); setBookingConfirmedA(false); }}
                      className={`p-3 rounded-lg border transition-all text-left cursor-pointer ${
                        selectedSlotA === '11:00 AM'
                          ? 'bg-[#EBF1EC] border-2 border-[#1E3A2F] text-[#1E3A2F]'
                          : 'bg-white border-[#E2DDD5] text-[#2F3A35] hover:border-[#1E3A2F]'
                      }`}
                    >
                      <span className="font-mono font-bold block">11:00 AM</span>
                      <span className="text-[10px] text-[#2D5A43] font-medium mt-0.5 block">Selected</span>
                    </button>

                    {/* Slot 3: Booked / Filled */}
                    <div className="p-3 rounded-lg border border-[#EAE5DC] bg-[#F5F2EC] text-[#9EA9A4] text-left opacity-75 cursor-not-allowed">
                      <span className="font-mono font-medium line-through block">02:15 PM</span>
                      <span className="text-[10px] text-[#A5B1AC] mt-0.5 block">Reserved</span>
                    </div>
                  </div>
                </div>

                {/* Slot Confirmation Action */}
                <div className="p-4 bg-white border border-[#E3DDD3] rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#52605B]">Selected Window: <strong className="text-[#1A1D1C] font-mono">{selectedSlotA} (45 mins)</strong></span>
                    <span className="text-[11px] font-mono text-[#2D5A43] flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Conflict Guard Active
                    </span>
                  </div>

                  {bookingConfirmedA ? (
                    <div className="p-3 rounded-lg bg-[#EBF1EC] border border-[#CCDCD0] flex items-center justify-between text-xs text-[#1E3A2F]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
                        <span className="font-semibold">Simulated Hold Placed for {selectedSlotA}</span>
                      </div>
                      <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-[#CCDCD0]">
                        DEMO #BF-882
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setBookingConfirmedA(true)}
                      className="w-full py-2.5 rounded-lg bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-medium text-xs transition-colors cursor-pointer"
                    >
                      Place Demonstration Hold on {selectedSlotA}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* CAPABILITY B: WhatsApp Customer Assistant (Visual Left, Text Right) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-8 border-t border-[#EFEBE4]">
          {/* Left Product Visual: WhatsApp Conversation Mockup */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA] text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center font-bold text-xs">
                    W
                  </div>
                  <div>
                    <span className="font-semibold text-[#1A1D1C] block">WhatsApp Customer Assistant</span>
                    <span className="text-[10px] text-[#2D5A43]">Simulated Conversation · Interactive</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-[#EBF1EC] text-[#1E3A2F] px-2 py-0.5 rounded border border-[#CCDCD0]">
                  HUMAN HANDOFF READY
                </span>
              </div>

              {/* Dialogue Transcript */}
              <div className="space-y-3 text-xs max-w-lg mx-auto">
                {/* 1. Customer inquiry */}
                <div className="flex gap-2.5 max-w-sm mr-auto">
                  <div className="w-6 h-6 rounded-full bg-[#334E68] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    C
                  </div>
                  <div className="p-3 rounded-xl rounded-tl-none bg-white border border-[#E2DDD5] text-[#1A1D1C] space-y-1 shadow-2xs">
                    <p className="leading-relaxed">"Hello! Do you have any openings for a general health check this Thursday morning?"</p>
                    <span className="text-[10px] text-[#7C8B85] block font-mono">10:14 AM</span>
                  </div>
                </div>

                {/* 2. Automated assistant response */}
                <div className="flex gap-2.5 max-w-sm ml-auto flex-row-reverse">
                  <div className="w-6 h-6 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    B
                  </div>
                  <div className="p-3 rounded-xl rounded-tr-none bg-[#1E3A2F] text-white space-y-1 shadow-2xs">
                    <p className="leading-relaxed text-[11px]">
                      "Hi David! Dr. Morales has <strong>9:30 AM</strong> and <strong>11:00 AM</strong> open this Thursday. Both slots include routine vitals and charting. Would you like me to hold one?"
                    </p>
                    <span className="text-[9px] text-[#C0D2C8] block font-mono text-right">
                      10:14 AM · FlowPilot Assistant
                    </span>
                  </div>
                </div>

                {/* 3. Customer specific question */}
                <div className="flex gap-2.5 max-w-sm mr-auto">
                  <div className="w-6 h-6 rounded-full bg-[#334E68] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    C
                  </div>
                  <div className="p-3 rounded-xl rounded-tl-none bg-white border border-[#E2DDD5] text-[#1A1D1C] space-y-1 shadow-2xs">
                    <p className="leading-relaxed">"I have private insurance through Bupa. Do I need to bring my policy card with me?"</p>
                    <span className="text-[10px] text-[#7C8B85] block font-mono">10:15 AM</span>
                  </div>
                </div>

                {/* 4. Assistant Policy Answer + Handoff Note */}
                <div className="flex gap-2.5 max-w-sm ml-auto flex-row-reverse">
                  <div className="w-6 h-6 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    B
                  </div>
                  <div className="p-3 rounded-xl rounded-tr-none bg-[#1E3A2F] text-white space-y-1 shadow-2xs">
                    <p className="leading-relaxed text-[11px]">
                      "Yes, please bring your Bupa card or member ID. I have also flagged your note for our front-desk reception coordinator, Emily, so she can verify your coverage prior to arrival."
                    </p>
                    <span className="text-[9px] text-[#C0D2C8] block font-mono text-right">
                      10:15 AM · Automated Triage
                    </span>
                  </div>
                </div>
              </div>

              {/* Staff Escalation Drawer Pill */}
              <div className="p-3 rounded-lg bg-white border border-[#E2DDD5] flex items-center justify-between text-xs">
                <span className="text-[#52605B] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#1E3A2F]" />
                  <span>Escalation: Reception Coordinator Notified</span>
                </span>
                <span className="font-mono text-[10px] text-[#2D5A43] font-bold">STATUS: HUMAN IN LOOP</span>
              </div>

              {/* Explicit Integration Disclaimer */}
              <div className="p-2.5 rounded-lg bg-[#F5F2EB] border border-[#E5E0D6] text-[11px] text-[#697671] flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#2D5A43] shrink-0 mt-0.5" />
                <p>
                  <strong>Implementation Notice:</strong> Simulated sample conversation. Live WhatsApp connectivity requires your own verified Meta Cloud API account and server webhook credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3A2F] uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-[#2D5A43]" />
              <span>B. WhatsApp Customer Assistant</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1D1C] leading-snug">
              Every customer conversation handled in seconds. Even after hours.
            </h3>

            <p className="text-sm sm:text-base text-[#52605B] leading-relaxed">
              Prospective clients expect answers immediately. FlowPilot parses inbound inquiries on WhatsApp, checks operating hours and service requirements, and coordinates bookings with natural language.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#4E5854]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">24/7 After-Hours Triage:</strong> Captures booking interest outside normal phone hours without delay.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Non-Emergency Safety Rules:</strong> Restricts urgent clinical queries and routes non-standard requests safely.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Supervised Human Handoff:</strong> When complex questions arise, conversations seamlessly transition to front-desk staff.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onExploreFeature('whatsapp')}
                className="px-5 py-2.5 rounded-lg bg-[#1E3A2F] hover:bg-[#284E3F] text-white text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F]"
              >
                <span>Explore WhatsApp Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CAPABILITY C: Calendar and Scheduling (Text Left, Visual Right) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-8 border-t border-[#EFEBE4]">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3A2F] uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-[#2D5A43]" />
              <span>C. Calendar & Scheduling Engine</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1D1C] leading-snug">
              Complete calendar availability with zero double-bookings.
            </h3>

            <p className="text-sm sm:text-base text-[#52605B] leading-relaxed">
              FlowPilot syncs bi-directionally with Google Calendar and Microsoft Outlook in production. Changes made on personal or staff calendars immediately block external availability, protecting your time and preventing scheduling overlaps.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#4E5854]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Bi-Directional Sync Architecture:</strong> External calendar edits propagate to your public availability rules.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Multi-Staff Roster Routing:</strong> Dispatches bookings to the appropriate practitioner based on service skill set.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Configurable Notice Windows:</strong> Prevents last-minute surprises by enforcing minimum lead time rules.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onExploreFeature('calendar')}
                className="px-5 py-2.5 rounded-lg bg-[#1E3A2F] hover:bg-[#284E3F] text-white text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F]"
              >
                <span>Explore Calendar Rules</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Product Visual: Calendar Roster */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA] text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1E3A2F]" />
                  <span className="font-semibold text-[#1A1D1C]">Provider Schedule Grid · Demo View</span>
                </div>
                <div className="flex items-center gap-1 bg-white p-0.5 rounded border border-[#E3DDD3] text-[11px]">
                  <button
                    type="button"
                    onClick={() => setCalendarViewC('day')}
                    className={`px-2 py-0.5 rounded cursor-pointer ${calendarViewC === 'day' ? 'bg-[#1E3A2F] text-white font-medium' : 'text-[#52605B]'}`}
                  >
                    Day
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarViewC('week')}
                    className={`px-2 py-0.5 rounded cursor-pointer ${calendarViewC === 'week' ? 'bg-[#1E3A2F] text-white font-medium' : 'text-[#52605B]'}`}
                  >
                    Week
                  </button>
                </div>
              </div>

              {/* Roster Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Provider 1 */}
                <div className="p-3.5 bg-white border border-[#E7E2DA] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1A1D1C]">Dr. Alan Morales</span>
                    <span className="text-[10px] font-mono text-[#2D5A43] bg-[#EBF1EC] px-1.5 py-0.5 rounded">General</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="p-2 rounded bg-[#FAF8F5] border border-[#E5E0D6] flex justify-between items-center text-[11px]">
                      <span>09:00 – Marcus V.</span>
                      <span className="font-mono text-[#2D5A43]">Confirmed</span>
                    </div>
                    <div className="p-1 rounded bg-[#F3F0EA] border border-dashed border-[#D5CEC2] text-center text-[10px] font-mono text-[#788882]">
                      15m Sanitization Buffer
                    </div>
                    <div className="p-2 rounded bg-[#EBF1EC] border border-[#CCDCD0] flex justify-between items-center text-[11px] font-semibold text-[#1E3A2F]">
                      <span>11:00 – Open Booking</span>
                      <span className="font-mono">Available</span>
                    </div>
                  </div>
                </div>

                {/* Provider 2 */}
                <div className="p-3.5 bg-white border border-[#E7E2DA] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1A1D1C]">Dr. Sarah Jenkins</span>
                    <span className="text-[10px] font-mono text-[#8C5E09] bg-[#FFF9EE] px-1.5 py-0.5 rounded">Orthodontics</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="p-2 rounded bg-[#FAF0E6] border border-[#E8D4BE] flex justify-between items-center text-[11px] text-[#8C5E09]">
                      <span>09:15 – Sarah Lin</span>
                      <span className="font-mono font-semibold">Hold (12m)</span>
                    </div>
                    <div className="p-1 rounded bg-[#F3F0EA] border border-dashed border-[#D5CEC2] text-center text-[10px] font-mono text-[#788882]">
                      15m Chair Prep Buffer
                    </div>
                    <div className="p-2 rounded bg-[#FAF8F5] border border-[#E5E0D6] flex justify-between items-center text-[11px]">
                      <span>10:30 – David Miller</span>
                      <span className="font-mono text-[#2D5A43]">Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conflict Guard Callout */}
              <div className="p-3 bg-white border border-[#E2DDD5] rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
                  <span className="font-medium text-[#1A1D1C]">Conflict Guard: Verified</span>
                </div>
                <span className="font-mono text-[10px] text-[#717E79]">SIMULATED CALENDAR DATA</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CAPABILITY D: Automated Follow-ups (Visual Left, Text Right) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-8 border-t border-[#EFEBE4]">
          {/* Left Product Visual: 3-Stage Sequence */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA] text-xs">
                <div className="flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-[#1E3A2F]" />
                  <span className="font-semibold text-[#1A1D1C]">Automated Follow-up Sequence Engine</span>
                </div>
                <span className="font-mono text-[10px] text-[#2D5A43] bg-[#EBF1EC] px-2 py-0.5 rounded font-semibold border border-[#CCDCD0]">
                  3 WORKFLOW STAGES
                </span>
              </div>

              {/* Sequence Steps */}
              <div className="space-y-2.5 text-xs">
                {/* Step 1: Immediate */}
                <div className="p-3 bg-white border border-[#E7E2DA] rounded-xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EBF1EC] text-[#2D5A43] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1A1D1C]">Booking Confirmation & Preparation Guide</span>
                      <span className="font-mono text-[10px] text-[#2D5A43]">Dispatched Instantly</span>
                    </div>
                    <p className="text-[11px] text-[#52605B]">
                      Includes calendar .ICS file, venue address pin, and pre-visit fasting or preparation instructions.
                    </p>
                  </div>
                </div>

                {/* Step 2: 24h Prior */}
                <div className="p-3 bg-white border border-[#E7E2DA] rounded-xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EBF1EC] text-[#2D5A43] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1A1D1C]">24-Hour Reminder with 1-Tap Confirmation</span>
                      <span className="font-mono text-[10px] text-[#52605B]">T-24 Hours</span>
                    </div>
                    <p className="text-[11px] text-[#52605B]">
                      Prompts client with one-click confirm or reschedule options to protect capacity.
                    </p>
                  </div>
                </div>

                {/* Step 3: 2h Prior */}
                <div className="p-3 bg-white border border-[#E7E2DA] rounded-xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FAF8F5] text-[#55635F] border border-[#E2DDD5] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1A1D1C]">2-Hour Arrival Check-in & Parking Pin</span>
                      <span className="font-mono text-[10px] text-[#52605B]">T-2 Hours</span>
                    </div>
                    <p className="text-[11px] text-[#52605B]">
                      Provides building access code, reserved parking bay details, and digital waiting room check-in.
                    </p>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-2.5 rounded-lg bg-[#F5F2EB] border border-[#E5E0D6] text-[11px] text-[#697671] flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#2D5A43] shrink-0 mt-0.5" />
                <p>
                  <strong>Simulated Previews:</strong> Messages shown are sample demonstration templates. In production, emails and SMS dispatch via your configured SMTP or SMS gateway accounts.
                </p>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3A2F] uppercase tracking-wider">
              <BellRing className="w-4 h-4 text-[#2D5A43]" />
              <span>D. Automated Email & WhatsApp Follow-ups</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1D1C] leading-snug">
              Keep clients prepared and drastically lower no-shows.
            </h3>

            <p className="text-sm sm:text-base text-[#52605B] leading-relaxed">
              Unprepared clients and missed appointments erode business revenue. FlowPilot sends timed reminders with clear instructions (e.g., fasting requirements or patch test notes) and one-click rescheduling options.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#4E5854]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Pre-Visit Preparation Guidelines:</strong> Automatically attaches service-specific instructions to eliminate arrival surprises.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">1-Tap Client Rescheduling:</strong> Allows clients to adjust times easily, reopening the cancelled slot to others.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Zero-Drop Follow-up Queue:</strong> Flags unconfirmed visits for reception staff so no customer slips through the cracks.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onExploreFeature('followups')}
                className="px-5 py-2.5 rounded-lg bg-[#1E3A2F] hover:bg-[#284E3F] text-white text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F]"
              >
                <span>Explore Notification Workflows</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CAPABILITY E: Business Lead & Booking Management (Text Left, Visual Right) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-8 border-t border-[#EFEBE4]">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3A2F] uppercase tracking-wider">
              <BarChart3 className="w-4 h-4 text-[#2D5A43]" />
              <span>E. Business Lead & Booking Management</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1D1C] leading-snug">
              Complete operational oversight over leads, staff tasks, and capacity.
            </h3>

            <p className="text-sm sm:text-base text-[#52605B] leading-relaxed">
              When enquiries are scattered across personal inboxes and phone logs, follow-ups get missed. FlowPilot brings every prospect, unconfirmed request, and scheduled appointment into a structured pipeline.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#4E5854]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Structured Pipeline Stages:</strong> Track leads from New Inbound → Contact Required → Follow-up Scheduled → Confirmed.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Front-Desk Action Queue:</strong> Staff receive clear action items with full customer transcript context.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1D1C]">Capacity & Resolution Tracking:</strong> Track lead resolution velocity and triage task status in a central dashboard.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onExploreFeature('pipeline')}
                className="px-5 py-2.5 rounded-lg bg-[#1E3A2F] hover:bg-[#284E3F] text-white text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F]"
              >
                <span>Explore Lead Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Product Visual: CRM Kanban Board Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA] text-xs">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#1E3A2F]" />
                  <span className="font-semibold text-[#1A1D1C]">Operational Lead Pipeline · Demonstration View</span>
                </div>
                <span className="font-mono text-[10px] text-[#2D5A43] bg-[#EBF1EC] px-2 py-0.5 rounded font-semibold border border-[#CCDCD0]">
                  FICTIONAL DEMO RECORDS
                </span>
              </div>

              {/* Illustrative Pipeline Rows */}
              <div className="space-y-2 text-xs">
                {/* Lead 1 */}
                <div className="p-3 bg-white border border-[#E7E2DA] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1A1D1C]">Camilla Valenzuela</span>
                      <span className="text-[10px] font-mono text-[#717E79]">WhatsApp</span>
                    </div>
                    <span className="text-[11px] text-[#55635F] block">Orthodontic Consult (Dr. Jenkins)</span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#FEF3E2] text-[#8C5E09] border border-[#F3DFC1]">
                    Contact Required
                  </span>
                </div>

                {/* Lead 2 */}
                <div className="p-3 bg-white border border-[#E7E2DA] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1A1D1C]">Liam Chen</span>
                      <span className="text-[10px] font-mono text-[#717E79]">Web Chat</span>
                    </div>
                    <span className="text-[11px] text-[#55635F] block">Comprehensive Dental Hygiene & Polish</span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#F0F4F8] text-[#334E68] border border-[#D9E2EC]">
                    Follow-up Scheduled
                  </span>
                </div>

                {/* Lead 3 */}
                <div className="p-3 bg-white border border-[#E7E2DA] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1A1D1C]">Marcus Vance</span>
                      <span className="text-[10px] font-mono text-[#717E79]">Direct Booking</span>
                    </div>
                    <span className="text-[11px] text-[#55635F] block">Annual Health Evaluation (Dr. Morales)</span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#EBF1EC] text-[#2D5A43] border border-[#CCDCD0]">
                    Confirmed
                  </span>
                </div>
              </div>

              {/* Operational Intelligence Card (Honest illustrative example without unsubstantiated 312-hours claim) */}
              <div className="p-3 bg-white border border-[#E2DDD5] rounded-xl flex items-center justify-between text-xs">
                <span className="text-[#52605B]">Front-Desk Capacity Analytics:</span>
                <span className="text-[11px] font-mono text-[#2D5A43] bg-[#EBF1EC] px-2.5 py-0.5 rounded border border-[#CCDCD0] font-semibold">
                  ILLUSTRATIVE CONCEPT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
