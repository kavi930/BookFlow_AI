import React, { useState } from 'react';
import {
  MessageCircle,
  CalendarCheck,
  BellRing,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  ShieldCheck,
  User,
  Send,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const ProductShowcase: React.FC = () => {
  const { setActiveTab } = useDemo();

  return (
    <div className="space-y-16">
      {/* Section Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E7E2DA] text-xs font-semibold tracking-wider uppercase text-[#2D5A43]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2F]" />
          <span>Product Capabilities</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1D1C]">
          Engineered for operational clarity.
        </h2>
        <p className="text-sm sm:text-base text-[#52605B] leading-relaxed max-w-2xl">
          Discover how BookFlow_AI replaces fragmented messaging and manual scheduling with an integrated, reliable system.
        </p>
      </div>

      {/* Feature 1: WhatsApp & Multichannel Enquiries (Text Left, UI Right) */}
      <section className="bg-white border border-[#E3DDD3] rounded-2xl p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Storytelling */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EBF1EC] text-[#1E3A2F] text-xs font-semibold">
              <MessageCircle className="w-3.5 h-3.5 text-[#2D5A43]" />
              <span>Inbound Capture & Triage</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D1C] tracking-tight">
              Turn inbound WhatsApp & web messages into structured bookings.
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-[#4E5B56] leading-relaxed">
              <p>
                <strong className="text-[#1A1D1C]">The Problem:</strong> Customers reach out after hours, on weekends, or during lunch rushes. When replies take hours, over 60% of prospective clients contact a competitor instead.
              </p>
              <p>
                <strong className="text-[#1A1D1C]">How BookFlow_AI Works:</strong> Inbound messages are parsed in real time. The system validates operating hours, matches requested services, checks non-emergency safety rules, and asks clarifying questions immediately.
              </p>
              <p>
                <strong className="text-[#1A1D1C]">Practical Benefit:</strong> Immediate engagement in under 15 seconds, converting casual inquiries into qualified appointments with zero manual front-desk typing.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('assistant')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3A2F] hover:text-[#284E3F] transition-colors"
              >
                <span>Test conversational AI assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Authentic Product UI Representation */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl p-5 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2D5A43]" />
                  <span className="font-semibold text-[#1A1D1C]">WhatsApp Enquiry Simulation</span>
                </div>
                <span className="font-mono text-[10px] text-[#717E79] bg-white border border-[#E0D9CD] px-2 py-0.5 rounded">
                  CHANNEL: WHATSAPP
                </span>
              </div>

              {/* Message 1: Client */}
              <div className="flex gap-2.5 max-w-sm mr-auto">
                <div className="w-6 h-6 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                  C
                </div>
                <div className="p-3 rounded-xl rounded-tl-none bg-white border border-[#E2DDD5] text-[#1A1D1C] space-y-1">
                  <p>"Hello! Do you have any openings for a general checkup this Thursday morning?"</p>
                  <span className="text-[10px] text-[#7C8B85] block font-mono">10:14 AM</span>
                </div>
              </div>

              {/* Message 2: System Qualification */}
              <div className="flex gap-2.5 max-w-sm ml-auto flex-row-reverse">
                <div className="w-6 h-6 rounded-full bg-[#2D5A43] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                  B
                </div>
                <div className="p-3 rounded-xl rounded-tr-none bg-[#1E3A2F] text-white space-y-1">
                  <p>
                    "Hi David! We have 10:00 AM open with Dr. Jenkins this Thursday. Would you like us to hold that slot?"
                  </p>
                  <span className="text-[10px] text-[#C0D2C8] block font-mono text-right">
                    10:14 AM · Automated Response
                  </span>
                </div>
              </div>

              {/* Pipeline Notification Pill */}
              <div className="p-2.5 rounded-lg bg-[#EBF1EC] border border-[#CCDCD0] flex items-center justify-between text-[11px] text-[#1E3A2F]">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Lead captured in pipeline (ID: LEAD-105)</span>
                </span>
                <span className="font-mono text-[10px] font-bold">CONTACT REQUIRED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Smart Scheduling & Availability (UI Left, Text Right) */}
      <section className="bg-white border border-[#E3DDD3] rounded-2xl p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Authentic Product UI Representation */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl p-5 shadow-xs space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#6D28D9]" />
                  <span className="font-semibold text-[#1A1D1C]">Live Slot Availability Engine</span>
                </div>
                <span className="font-mono text-[10px] text-[#6D28D9] bg-[#F5F3FF] border border-[#DDD6FE] px-2 py-0.5 rounded">
                  BUFFER: 15 MIN
                </span>
              </div>

              {/* Slot Grid preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#55635F]">
                  <span>Thursday, Oct 24 · Provider: Dr. Alan Morales</span>
                  <span className="font-mono text-[#2D5A43]">3 Available</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2.5 rounded-lg bg-white border border-[#E2DDD5] text-[#2F3A35] font-semibold hover:border-[#1E3A2F] cursor-pointer">
                    9:30 AM
                    <span className="block text-[9px] text-[#788882] font-normal">Available</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#EBF1EC] border-2 border-[#1E3A2F] text-[#1E3A2F] font-bold">
                    11:00 AM
                    <span className="block text-[9px] text-[#2D5A43] font-medium">Selected</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F5F2EC] text-[#9EA9A4] border border-[#EAE5DC] cursor-not-allowed">
                    2:30 PM
                    <span className="block text-[9px] text-[#A5B1AC] font-normal">Booked</span>
                  </div>
                </div>
              </div>

              {/* Conflict Guard Badge */}
              <div className="p-3 rounded-lg bg-white border border-[#E3DDD3] space-y-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#1A1D1C]">
                  <span>Conflict Guard Activated</span>
                  <span className="text-[10px] font-mono text-[#2D5A43]">VERIFIED</span>
                </div>
                <p className="text-[11px] text-[#5B6863] leading-relaxed">
                  Provisional hold placed for 30 minutes. Prevents overlapping chair allocation during customer response window.
                </p>
              </div>
            </div>
          </div>

          {/* Text Storytelling */}
          <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#F5F3FF] text-[#6D28D9] text-xs font-semibold">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Availability & Conflict Prevention</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D1C] tracking-tight">
              Real-time scheduling without calendar ping-pong.
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-[#4E5B56] leading-relaxed">
              <p>
                <strong className="text-[#1A1D1C]">The Problem:</strong> Back-and-forth emails proposing dates result in double-bookings, missed buffer times, or clients dropping out mid-thread.
              </p>
              <p>
                <strong className="text-[#1A1D1C]">How BookFlow_AI Works:</strong> Checks provider rosters and service durations (30 min routine consult vs 3-hour balayage). Applies necessary setup and buffer windows before proposing valid appointment slots.
              </p>
              <p>
                <strong className="text-[#1A1D1C]">Practical Benefit:</strong> 100% schedule alignment, eliminating administrative phone calls and protecting team breaks.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('demos')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3A2F] hover:text-[#284E3F] transition-colors"
              >
                <span>Try interactive booking demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Automated Confirmations & Follow-ups (Text Left, UI Right) */}
      <section className="bg-white border border-[#E3DDD3] rounded-2xl p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Storytelling */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EBF1EC] text-[#1E3A2F] text-xs font-semibold">
              <BellRing className="w-3.5 h-3.5 text-[#2D5A43]" />
              <span>Zero-Drop Follow-ups</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D1C] tracking-tight">
              Keep clients prepared and drastically lower no-shows.
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-[#4E5B56] leading-relaxed">
              <p>
                <strong className="text-[#1A1D1C]">The Problem:</strong> Clients forget appointments, arrive without required documentation, or skip patch tests, resulting in lost revenue and empty chairs.
              </p>
              <p>
                <strong className="text-[#1A1D1C]">How BookFlow_AI Works:</strong> Sends structured appointment confirmations with specific preparation guidelines (e.g. fasting blood tests, patch-test warnings). Queues automated 24-hour reminders with one-click rescheduling options.
              </p>
              <p>
                <strong className="text-[#1A1D1C]">Practical Benefit:</strong> Reduces client no-shows by up to 40% and ensures clients arrive informed and on time.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('workflows')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3A2F] hover:text-[#284E3F] transition-colors"
              >
                <span>Inspect automation workflows</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Authentic Product UI Representation */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl p-5 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA]">
                <span className="font-semibold text-[#1A1D1C]">Automated Follow-up Sequence</span>
                <span className="font-mono text-[10px] text-[#2D5A43] bg-[#EBF1EC] px-2 py-0.5 rounded border border-[#CCDCD0]">
                  3-STAGE SEQUENCE
                </span>
              </div>

              {/* Stage 1 */}
              <div className="p-3 bg-white border border-[#E3DDD3] rounded-lg flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EBF1EC] text-[#2D5A43] flex items-center justify-center shrink-0 font-bold text-[10px]">
                  ✓
                </div>
                <div>
                  <div className="font-semibold text-[#1A1D1C]">Instant Confirmation</div>
                  <p className="text-[11px] text-[#55635F] mt-0.5">
                    "Visit logged for Oct 24 at 11:00 AM. Fasting required 8 hours prior."
                  </p>
                  <span className="text-[10px] font-mono text-[#788882] mt-1 block">Delivered immediately</span>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="p-3 bg-white border border-[#E3DDD3] rounded-lg flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EBF1EC] text-[#2D5A43] flex items-center justify-center shrink-0 font-bold text-[10px]">
                  2
                </div>
                <div>
                  <div className="font-semibold text-[#1A1D1C]">24-Hour Preparation Alert</div>
                  <p className="text-[11px] text-[#55635F] mt-0.5">
                    Includes clinic address, parking instructions, and simple cancellation link.
                  </p>
                  <span className="text-[10px] font-mono text-[#2D5A43] mt-1 block">Scheduled for Oct 23, 11:00 AM</span>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="p-3 bg-white border border-[#E3DDD3] rounded-lg flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#F5F2EB] text-[#717E79] flex items-center justify-center shrink-0 font-bold text-[10px]">
                  3
                </div>
                <div>
                  <div className="font-semibold text-[#1A1D1C]">2-Hour Arrival Check-in</div>
                  <p className="text-[11px] text-[#55635F] mt-0.5">
                    Quick digital sign-in link before entering waiting area.
                  </p>
                  <span className="text-[10px] font-mono text-[#788882] mt-1 block">Scheduled for Oct 24, 9:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Business Insights & CRM Pipeline (UI Left, Text Right) */}
      <section className="bg-white border border-[#E3DDD3] rounded-2xl p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Authentic Product UI Representation */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl p-5 shadow-xs space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA]">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#6D28D9]" />
                  <span className="font-semibold text-[#1A1D1C]">Pipeline Overview</span>
                </div>
                <span className="font-mono text-[10px] text-[#6D28D9] bg-[#F5F3FF] border border-[#DDD6FE] px-2 py-0.5 rounded">
                  SESSION CRM
                </span>
              </div>

              {/* Micro CRM Row Preview */}
              <div className="space-y-2">
                <div className="p-3 bg-white border border-[#E3DDD3] rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#1A1D1C]">Camilla Valenzuela</span>
                    <span className="text-[11px] text-[#64746F] block">Mezzanine Banquet (12 guests)</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FEF3E2] text-[#8C5E09] border border-[#F3DFC1]">
                    Contact Required
                  </span>
                </div>

                <div className="p-3 bg-white border border-[#E3DDD3] rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#1A1D1C]">Liam Chen</span>
                    <span className="text-[11px] text-[#64746F] block">3-Day Trial Pass (HIIT focus)</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0F4F8] text-[#334E68] border border-[#D9E2EC]">
                    Follow-up
                  </span>
                </div>

                <div className="p-3 bg-white border border-[#E3DDD3] rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#1A1D1C]">Nadia Rostova</span>
                    <span className="text-[11px] text-[#64746F] block">Balayage & Gloss (Elena Vance)</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EBF1EC] text-[#2D5A43] border border-[#CCDCD0]">
                    Completed
                  </span>
                </div>
              </div>

              {/* Reclaimed Staff Hours Indicator */}
              <div className="p-3 rounded-lg bg-white border border-[#E3DDD3] flex items-center justify-between text-[11px]">
                <span className="text-[#52605B]">Staff Time Saved This Month:</span>
                <span className="font-bold text-[#1E3A2F] font-mono text-sm tabular-nums">
                  ~312 Hours
                </span>
              </div>
            </div>
          </div>

          {/* Text Storytelling */}
          <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#F5F3FF] text-[#6D28D9] text-xs font-semibold">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Operational Intelligence</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D1C] tracking-tight">
              Complete oversight over your enquiry pipeline and staff hours.
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-[#4E5B56] leading-relaxed">
              <p>
                <strong className="text-[#1A1D1C]">The Problem:</strong> When customer enquiries sit in personal inboxes or WhatsApp chats, business owners have no visibility into lead velocity, unanswered requests, or staff workloads.
              </p>
              <p>
                <strong className="text-[#1A1D1C]">How BookFlow_AI Works:</strong> Centralizes every enquiry into an organized CRM pipeline with status indicators (New, Contact Required, Follow-up, Completed) and automates staff task handoffs.
              </p>
              <p>
                <strong className="text-[#1A1D1C]">Practical Benefit:</strong> Accurate staffing capacity planning, zero missed opportunities, and clear visibility into reclaimed labor hours.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('pipeline')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3A2F] hover:text-[#284E3F] transition-colors"
              >
                <span>Explore the lead pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
