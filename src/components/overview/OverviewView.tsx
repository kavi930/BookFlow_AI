import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  ExternalLink,
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Sparkle,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Play
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { WEEKLY_ACTIVITY_DATA } from '../../data/mockData';
import { BusinessCategory } from '../../types';
import { EcosystemSection } from './EcosystemSection';
import { ProductVideoDemosSection } from './ProductVideoDemosSection';
import { ProductShowcase } from './ProductShowcase';
import { HowItWorksSection } from './HowItWorksSection';
import { SecurityReliabilitySection } from './SecurityReliabilitySection';
import { FinalCtaSection } from './FinalCtaSection';


export const OverviewView: React.FC = () => {
  const {
    setActiveTab,
    setSelectedCategory,
    leads,
    setSelectedLeadForDetail,
    guidedTour,
    setIsInterestModalOpen,
    openAgentWidget,
    openInquiryWithQuestion
  } = useDemo();


  // Active vertical in the business selector tab
  const [selectedVertical, setSelectedVertical] = useState<BusinessCategory>('clinics');
  const [timeRange, setTimeRange] = useState<'7d' | '14d'>('7d');

  const displayData = timeRange === '7d' ? WEEKLY_ACTIVITY_DATA.slice(-7) : WEEKLY_ACTIVITY_DATA;
  const maxTotal = Math.max(...displayData.map((d) => d.total));

  // Business-specific breakdown for the compact content area
  const verticalDetails: Record<
    BusinessCategory,
    {
      title: string;
      businessName: string;
      commonEnquiry: string;
      proposedWorkflow: string;
      ownerNextStep: string;
      simulatedNotice: string;
    }
  > = {
    clinics: {
      title: 'Clinics & Healthcare Practices',
      businessName: 'CarePoint Clinic',
      commonEnquiry:
        '"Do you have any appointments available with Dr. Jenkins this Thursday for a routine health check?"',
      proposedWorkflow:
        'Instantly checks clinic hours, verifies non-emergency status, records preferred morning/afternoon slot, and drafts an intake acknowledgment.',
      ownerNextStep:
        'Reception staff see an unconfirmed lead in the pipeline with patient notes, ready for insurance verification and final booking call.',
      simulatedNotice:
        'Simulated triage: Does not diagnose medical conditions or write directly to a real electronic health record.'
    },
    restaurants: {
      title: 'Restaurants & Hospitality',
      businessName: 'Urban Table',
      commonEnquiry:
        '"Can we reserve a table for 8 on Saturday evening around 7:30 PM? We have two vegetarians in our party."',
      proposedWorkflow:
        'Evaluates party-size thresholds (routes large parties of 8+ to private dining), logs dietary notes, and acknowledges seating availability.',
      ownerNextStep:
        'The floor manager reviews the reservation request and holds table space before calling the guest to finalize table placement.',
      simulatedNotice:
        'Simulated reservation: Does not debit credit cards or create real table holds in external POS systems.'
    },
    gyms: {
      title: 'Gyms & Fitness Studios',
      businessName: 'FitCore Studio',
      commonEnquiry:
        '"I want to try your morning conditioning class tomorrow. What is included in the 3-day trial pass?"',
      proposedWorkflow:
        'Captures member training goals (endurance, strength, mobility), details morning class times, and prepares a welcome guide with arrival tips.',
      ownerNextStep:
        'Head coach receives a notification to prepare a guest pass and greet the prospective member 10 minutes prior to class.',
      simulatedNotice: 'Simulated pass: No membership contract is created or billed.'
    },
    salons: {
      title: 'Salons & Spas',
      businessName: 'Glow & Co. Salon',
      commonEnquiry:
        '"I would like to book a dimensional balayage with Elena next week. How long does the appointment take?"',
      proposedWorkflow:
        'Explains estimated 3-hour duration, checks stylist chair windows, notes 48-hour patch test guidelines, and records desired times.',
      ownerNextStep:
        'Front desk coordinator verifies chair availability on Elena’s schedule and reaches out to confirm the appointment.',
      simulatedNotice: 'Simulated booking: No live salon calendar slot is altered.'
    }
  };

  const currentVertical = verticalDetails[selectedVertical];

  const handleLaunchDemo = (cat: BusinessCategory) => {
    setSelectedCategory(cat);
    setActiveTab('demos');
  };

  // Follow-ups requiring immediate attention (status: 'Contact Required')
  const followUpsRequired = leads.filter((l) => l.status === 'Contact Required');
  // Recent leads
  const recentLeads = leads.slice(0, 5);

  // Status counts
  const countNew = leads.filter((l) => l.status === 'New').length;
  const countContact = leads.filter((l) => l.status === 'Contact Required').length;
  const countFollowup = leads.filter((l) => l.status === 'Follow-up').length;
  const countCompleted = leads.filter((l) => l.status === 'Completed').length;

  return (
    <div className="space-y-16 max-w-6xl mx-auto text-[#1A1D1C] pb-8">
      {/* 1. Concise, Organic Hero Section */}
      <section className="pt-4 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EBF1EC] text-[#1E3A2F] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A43]" />
              <span>Intelligent Inbound & Appointment Coordination</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#1A1D1C] leading-[1.15] text-balance">
              Spend less time chasing enquiries. Keep schedules full.
            </h1>

            <p className="text-base sm:text-lg text-[#4E5854] leading-relaxed max-w-xl text-balance">
              FlowPilot AI connects customer WhatsApp messaging, live calendar scheduling, and automated reminders in one unified, human-supervised workflow.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsInterestModalOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-semibold text-sm shadow-xs transition-colors flex items-center gap-2 group"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('product-video-demos');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2.5 rounded-lg border border-[#C8DFCD] bg-[#F1F7F2] hover:bg-[#E3EEE5] text-[#1E3A2F] font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-[#1E3A2F] text-[#1E3A2F]" />
                <span>Watch Video Demos</span>
              </button>

              <button
                onClick={() => openAgentWidget('whatsapp')}
                className="px-4 py-2.5 rounded-lg border border-[#25D366]/40 bg-[#E7FFDB] hover:bg-[#D5F5C4] text-[#075E54] font-semibold text-sm transition-colors flex items-center gap-2 shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#075E54]" />
                <span>Test WhatsApp / Call Agent</span>
              </button>

              <button
                onClick={guidedTour.startTour}
                className="px-4 py-2.5 rounded-lg border border-[#D8D2C5] bg-white hover:bg-[#FAF8F5] text-[#2D3833] font-medium text-sm transition-colors"
              >
                Interactive Tour
              </button>

              <button
                onClick={() => setActiveTab('workflows')}
                className="text-xs font-semibold text-[#1E3A2F] hover:underline px-2 py-2 flex items-center gap-1"
              >
                <span>See how it works</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="pt-2 text-xs text-[#6F7C77] flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43]" />
                <span>Zero configuration required</span>
              </span>
              <span className="text-[#C6BEB2]">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43]" />
                <span>Client-side private sandbox</span>
              </span>
              <span className="text-[#C6BEB2]">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43]" />
                <span>Human staff in the loop</span>
              </span>
            </div>
          </div>

          {/* Right Column: Authentic Product Interface Preview */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E3DDD3] rounded-2xl p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1E3A2F]" />
                  <span className="text-xs font-semibold text-[#1A1D1C]">Live Workflow Preview</span>
                </div>
                <span className="text-[11px] font-mono text-[#2D5A43] bg-[#EBF1EC] px-2 py-0.5 rounded font-semibold">
                  INBOUND TRIAGE
                </span>
              </div>

              {/* Step 1: Customer enquiry */}
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EBE6DD] space-y-1">
                <div className="flex items-center justify-between text-[11px] text-[#697671]">
                  <span className="font-semibold text-[#2E3A35]">Customer WhatsApp Enquiry</span>
                  <span className="font-mono text-[10px]">2 mins ago</span>
                </div>
                <p className="text-xs text-[#1A1D1C] italic">
                  "Hi! Do you have any appointments available with Dr. Jenkins this Thursday for a routine health check?"
                </p>
              </div>

              {/* Step 2: Instant qualification response */}
              <div className="p-3 rounded-lg bg-[#EBF1EC] border border-[#D2E2D6] space-y-1">
                <div className="flex items-center justify-between text-[11px] text-[#2D5A43]">
                  <span className="font-semibold">Automated Response</span>
                  <span className="text-[10px] uppercase font-mono font-bold">Sent in 4s</span>
                </div>
                <p className="text-xs text-[#23352D] leading-relaxed">
                  "Hello! Dr. Jenkins has Thursday 9:30 AM or 11:15 AM available. We've placed a provisional hold on 9:30 AM for you."
                </p>
              </div>

              {/* Step 3: Staff follow-up task */}
              <div className="p-3 rounded-lg bg-[#FFF9EE] border border-[#F0E2C8] space-y-1">
                <div className="flex items-center justify-between text-[11px] text-[#8C5E09]">
                  <span className="font-semibold">Action Created for Front Desk</span>
                  <span className="font-mono text-[10px] font-bold">High Priority</span>
                </div>
                <p className="text-xs text-[#523A0B]">
                  Task: Review Dr. Jenkins Thursday roster and verify patient intake details before final booking confirmation.
                </p>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-[#788581]">
                <span>Status: <strong className="text-[#1E3A2F]">Contact Required</strong></span>
                <button
                  onClick={() => openAgentWidget('whatsapp')}
                  className="text-xs font-semibold text-[#1E3A2F] hover:underline flex items-center gap-1"
                >
                  <span>Test this in WhatsApp</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Connected FlowPilot AI Ecosystem */}
      <EcosystemSection />

      {/* 2b. Interactive Product Video Demos (Surgy Health style animated software player) */}
      <div id="product-video-demos">
        <ProductVideoDemosSection />
      </div>

      {/* 3. Product Showcase (Editorial Deep-Dive per Capability) */}
      <ProductShowcase />

      {/* 4. How It Works (Authentic 5-Stage Customer Journey) */}
      <HowItWorksSection />

      {/* 5. Tailored Business Need Selector (Compact Selector + One Clear Content Area) */}
      <section className="bg-white border border-[#E3DDD3] rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="max-w-2xl space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E7E2DA] text-xs font-semibold tracking-wider uppercase text-[#2D5A43]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2F]" />
            <span>Vertical Adaptation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1D1C]">
            Tailored to how your business actually works
          </h2>
          <p className="text-xs sm:text-sm text-[#55615D]">
            Select an industry below to examine the specific customer enquiry, automated response logic, and staff hand-off.
          </p>
        </div>

        {/* Compact Business Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl">
          <button
            onClick={() => setSelectedVertical('clinics')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
              selectedVertical === 'clinics'
                ? 'bg-white text-[#1E3A2F] font-semibold shadow-xs border border-[#D9D3C7]'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinics</span>
          </button>

          <button
            onClick={() => setSelectedVertical('restaurants')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
              selectedVertical === 'restaurants'
                ? 'bg-white text-[#1E3A2F] font-semibold shadow-xs border border-[#D9D3C7]'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Restaurants</span>
          </button>

          <button
            onClick={() => setSelectedVertical('gyms')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
              selectedVertical === 'gyms'
                ? 'bg-white text-[#1E3A2F] font-semibold shadow-xs border border-[#D9D3C7]'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Gyms</span>
          </button>

          <button
            onClick={() => setSelectedVertical('salons')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
              selectedVertical === 'salons'
                ? 'bg-white text-[#1E3A2F] font-semibold shadow-xs border border-[#D9D3C7]'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <Sparkle className="w-3.5 h-3.5" />
            <span>Salons</span>
          </button>
        </div>

        {/* Single Clear Content Area */}
        <div className="bg-[#FAF8F5] border border-[#E5E0D6] rounded-xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E3DA]">
            <div>
              <span className="text-[11px] font-mono text-[#2D5A43] font-semibold uppercase">
                {currentVertical.businessName} Blueprint
              </span>
              <h3 className="text-base font-bold text-[#1A1D1C]">
                {currentVertical.title}
              </h3>
            </div>

            <button
              onClick={() => handleLaunchDemo(selectedVertical)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1E3A2F] hover:bg-[#2A4E40] text-white text-xs font-semibold transition-colors shrink-0"
            >
              <span>Try {currentVertical.businessName} demo</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Column 1: Customer Enquiry */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E0D6] space-y-2">
              <span className="font-semibold text-[#1A1D1C] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#2D5A43]" />
                <span>1. Common Customer Enquiry</span>
              </span>
              <p className="text-[#3E4945] italic leading-relaxed">
                {currentVertical.commonEnquiry}
              </p>
            </div>

            {/* Column 2: Proposed Response */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E0D6] space-y-2">
              <span className="font-semibold text-[#1A1D1C] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43]" />
                <span>2. Proposed Workflow</span>
              </span>
              <p className="text-[#3E4945] leading-relaxed">
                {currentVertical.proposedWorkflow}
              </p>
            </div>

            {/* Column 3: What Owner Sees Next */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E0D6] space-y-2">
              <span className="font-semibold text-[#1A1D1C] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#2D5A43]" />
                <span>3. What Staff See Next</span>
              </span>
              <p className="text-[#3E4945] leading-relaxed">
                {currentVertical.ownerNextStep}
              </p>
            </div>
          </div>

          {/* Simulation disclaimer note */}
          <div className="flex items-start gap-2 pt-1 text-[11px] text-[#697672]">
            <AlertCircle className="w-3.5 h-3.5 text-[#7F8F87] shrink-0 mt-0.5" />
            <p>{currentVertical.simulatedNotice}</p>
          </div>
        </div>
      </section>

      {/* 6. Security and Reliability Safeguards */}
      <SecurityReliabilitySection />

      {/* 7. Simplified, Calm Dashboard Overview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2 border-b border-[#E7E2DA]">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1A1D1C]">
              Demo Dashboard Overview
            </h2>
            <p className="text-xs text-[#5D6B66]">
              A calm view of simulated enquiries, active follow-ups, and daily traffic.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#76857F]">
            *SAMPLE DEMO METRICS
          </span>
        </div>

        {/* 4 Clean Lead Status Summary Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-white border border-[#E5E0D6] shadow-xs">
            <span className="text-[#64726D] font-medium text-[11px]">New Enquiries</span>
            <div className="text-2xl font-bold text-[#1A1D1C] font-mono mt-1 tabular-nums">
              {countNew}
            </div>
            <p className="text-[10px] text-[#7C8B85] mt-0.5">Awaiting first review</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E5E0D6] shadow-xs">
            <span className="text-[#8C5E09] font-medium text-[11px]">Contact Required</span>
            <div className="text-2xl font-bold text-[#8C5E09] font-mono mt-1 tabular-nums">
              {countContact}
            </div>
            <p className="text-[10px] text-[#7C8B85] mt-0.5">Staff callback needed</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E5E0D6] shadow-xs">
            <span className="text-[#334E68] font-medium text-[11px]">In Follow-up</span>
            <div className="text-2xl font-bold text-[#334E68] font-mono mt-1 tabular-nums">
              {countFollowup}
            </div>
            <p className="text-[10px] text-[#7C8B85] mt-0.5">In communication</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E5E0D6] shadow-xs">
            <span className="text-[#2D5A43] font-medium text-[11px]">Completed</span>
            <div className="text-2xl font-bold text-[#2D5A43] font-mono mt-1 tabular-nums">
              {countCompleted}
            </div>
            <p className="text-[10px] text-[#7C8B85] mt-0.5">Confirmed or finalized</p>
          </div>
        </div>

        {/* 2-Column Section: Follow-ups Requiring Attention & Small Activity Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Follow-ups Requiring Attention (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5E0D6] rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4]">
              <div>
                <h3 className="text-sm font-bold text-[#1A1D1C]">
                  Follow-ups Requiring Attention ({followUpsRequired.length})
                </h3>
                <p className="text-[11px] text-[#697772]">
                  Enquiries where client requested a specific slot or custom arrangement.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('pipeline')}
                className="text-xs font-semibold text-[#1E3A2F] hover:underline flex items-center gap-1"
              >
                <span>Pipeline</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {followUpsRequired.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => {
                    setSelectedLeadForDetail(lead);
                    setActiveTab('pipeline');
                  }}
                  className="p-3 rounded-lg bg-[#FAF8F5] hover:bg-[#F3EFE9] border border-[#E8E3DA] cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-[#1A1D1C] hover:text-[#1E3A2F]">
                        {lead.leadName}
                      </span>
                      <span className="text-[11px] text-[#677570] ml-2 font-mono">
                        · {lead.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FEF3E2] text-[#8C5E09] border border-[#F3DFC1]">
                      Contact Required
                    </span>
                  </div>

                  <p className="text-xs text-[#4A5551] mt-1 line-clamp-1">
                    {lead.requestedService} ({lead.preferredTime || 'Standard time'})
                  </p>

                  <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#788782] font-mono">
                    <span>{lead.contactPhone || lead.contactEmail}</span>
                    <span>Received {lead.enquiryDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Small, Meaningful Activity Chart (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E5E0D6] rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4]">
              <div>
                <h3 className="text-sm font-bold text-[#1A1D1C]">Sample Daily Enquiry Activity</h3>
                <p className="text-[11px] text-[#697772]">Recent daily fictional volumes</p>
              </div>

              <div className="flex items-center gap-1 p-0.5 bg-[#FAF8F5] border border-[#E5E0D6] rounded-md text-[11px]">
                <button
                  onClick={() => setTimeRange('7d')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    timeRange === '7d'
                      ? 'bg-white text-[#1E3A2F] font-semibold shadow-xs'
                      : 'text-[#677570] hover:text-[#1A1D1C]'
                  }`}
                >
                  7d
                </button>
                <button
                  onClick={() => setTimeRange('14d')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    timeRange === '14d'
                      ? 'bg-white text-[#1E3A2F] font-semibold shadow-xs'
                      : 'text-[#677570] hover:text-[#1A1D1C]'
                  }`}
                >
                  14d
                </button>
              </div>
            </div>

            {/* Clean, calm monochrome/forest bars */}
            <div className="pt-2">
              <div className="h-40 flex items-end justify-between gap-1.5 px-1">
                {displayData.map((d, index) => {
                  const heightPercent = Math.max(12, Math.round((d.total / maxTotal) * 100));

                  return (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center h-full justify-end group"
                      title={`${d.day}, ${d.date}: ${d.total} simulated enquiries`}
                    >
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full rounded-t-sm bg-[#386641] hover:bg-[#1E3A2F] transition-colors"
                      />
                      <span className="text-[10px] font-mono text-[#7D8C86] mt-1.5 truncate">
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-[#EFEBE4] flex items-center justify-between text-[11px] text-[#687671]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Illustrative daily flow</span>
                </span>
                <span className="font-mono text-[#2D5A43]">~85 / day sample avg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Enquiries Table (Full-width clean table) */}
        <div className="bg-white border border-[#E5E0D6] rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#EFEBE4]">
            <div>
              <h3 className="text-sm font-bold text-[#1A1D1C]">Recent Demo Enquiries</h3>
              <p className="text-[11px] text-[#697772]">Current session leads in the pipeline</p>
            </div>
            <button
              onClick={() => setActiveTab('pipeline')}
              className="text-xs font-semibold text-[#1E3A2F] hover:underline"
            >
              View All ({leads.length}) &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#EAE5DC] text-[#697772] font-mono text-[11px]">
                  <th className="py-2.5 px-4 font-semibold">Lead Name</th>
                  <th className="py-2.5 px-4 font-semibold">Vertical</th>
                  <th className="py-2.5 px-4 font-semibold">Requested Service</th>
                  <th className="py-2.5 px-4 font-semibold">Date</th>
                  <th className="py-2.5 px-4 font-semibold">Simulated Status</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFEBE4]">
                {recentLeads.map((lead) => {
                  const isNew = lead.status === 'New';
                  const isContact = lead.status === 'Contact Required';
                  const isFollowup = lead.status === 'Follow-up';

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => {
                        setSelectedLeadForDetail(lead);
                        setActiveTab('pipeline');
                      }}
                      className="hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4 font-semibold text-[#1A1D1C]">
                        {lead.leadName}
                      </td>
                      <td className="py-3 px-4 capitalize text-[#4C5854]">
                        {lead.category}
                      </td>
                      <td className="py-3 px-4 text-[#3C4743] truncate max-w-[200px]">
                        {lead.requestedService}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-[#6D7B75]">
                        {lead.enquiryDate}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            isNew
                              ? 'bg-[#EBF1EC] text-[#1E3A2F] border border-[#CCDCD0]'
                              : isContact
                              ? 'bg-[#FEF3E2] text-[#8C5E09] border border-[#F3DFC1]'
                              : isFollowup
                              ? 'bg-[#F0F4F8] text-[#334E68] border border-[#D9E2EC]'
                              : 'bg-[#EBF1EC] text-[#2D5A43] border border-[#D5E1D8]'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-xs font-medium text-[#1E3A2F] hover:underline">
                          View details
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7b. Visitor Inquiry Desk Callout */}
      <section className="bg-white border border-[#E7E2DA] rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EBF1EC] text-[#1E3A2F] text-[11px] font-semibold tracking-wide uppercase font-mono">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Visitor Inquiry System</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D1C]">
              Have a Question Before Trying the Demo?
            </h2>
            <p className="text-xs sm:text-sm text-[#55635F] leading-relaxed">
              Ask our inquiry engine about calendar integrations, WhatsApp compliance, multi-provider rosters, or customized webhook dispatch. Get an instant verified technical resolution or submit a tracked ticket.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => setActiveTab('inquiries')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1E3A2F] hover:bg-[#274E3F] rounded-md transition-colors shadow-xs w-full sm:w-auto"
            >
              <span>Explore Visitor Inquiry Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => openAgentWidget('whatsapp')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#075E54] bg-[#E7FFDB] hover:bg-[#D4F5C3] border border-[#BDE8AB] rounded-md transition-colors w-full sm:w-auto"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Ask Live WhatsApp Agent</span>
            </button>
          </div>
        </div>

        {/* Quick query chips */}
        <div className="mt-6 pt-4 border-t border-[#EAE5DC] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#737E7A] font-medium mr-1">Sample inquiries:</span>
          {[
            'Can FlowPilot use our existing WhatsApp business phone number?',
            'How does 2-way Google & Outlook Calendar sync prevent double-booking?',
            'What is the pricing tier for a 3-location clinic?',
            'Can it route after-hours voice phone calls?'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => openInquiryWithQuestion(prompt)}
              className="px-2.5 py-1 rounded bg-[#FAF8F5] hover:bg-[#EAE5DC] border border-[#DDD5C7] text-[#3D4744] hover:text-[#1A1D1C] transition-colors text-left"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </section>

      {/* 8. Final Conversion CTA Section */}
      <FinalCtaSection />
    </div>
  );
};
