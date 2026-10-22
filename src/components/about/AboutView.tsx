import React from 'react';
import {
  ShieldCheck,
  Zap,
  Users,
  Calendar,
  MessageSquare,
  ArrowRight,
  Lock
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AboutView: React.FC = () => {
  const { setIsInterestModalOpen, setActiveTab } = useDemo();

  return (
    <div className="space-y-10 max-w-4xl mx-auto text-[#1A1D1C]">
      {/* Hero Intro */}
      <section className="bg-white border border-[#E3DDD3] rounded-2xl p-6 sm:p-10 space-y-4 shadow-xs">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EBF1EC] text-[#1E3A2F] text-xs font-medium">
          <span>About BookFlow AI</span>
          <span className="text-[#A4B3AC]">·</span>
          <span>Software Philosophy</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1D1C] tracking-tight">
          Spend less time chasing enquiries.
        </h1>

        <p className="text-sm sm:text-base text-[#4E5B56] leading-relaxed max-w-2xl">
          BookFlow AI envisions simple, organic automation workflows that bridge the gap between inbound customer interest and busy service teams. We believe service businesses shouldn't lose prospects to unreturned messages, delayed email inquiries, or disjointed calendars.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsInterestModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-medium text-xs sm:text-sm rounded-lg shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>Discuss an Automation Solution</span>
          </button>

          <button
            onClick={() => setActiveTab('demos')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#FAF8F5] border border-[#D8D2C5] text-[#2F3A35] font-medium text-xs sm:text-sm rounded-lg transition-colors"
          >
            <span>Explore Interactive Demos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4 Architectural Tenets */}
      <section className="space-y-4" aria-label="Core architecture principles">
        <div>
          <h2 className="text-lg font-bold text-[#1A1D1C] tracking-tight">
            Our Core Principles
          </h2>
          <p className="text-xs text-[#5E6C67]">
            Four architectural guidelines behind our business automation workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-[#E3DDD3] rounded-xl p-5 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#EBF1EC] border border-[#D2E2D6] flex items-center justify-center text-[#1E3A2F]">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#1A1D1C]">
              1. Prompt, Relevant Triage
            </h3>
            <p className="text-xs text-[#52605B] leading-relaxed">
              Every inbound website inquiry or question receives an instant, intelligent acknowledgment with verified operating hours, service details, and next steps.
            </p>
          </div>

          <div className="bg-white border border-[#E3DDD3] rounded-xl p-5 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#EBF1EC] border border-[#D2E2D6] flex items-center justify-center text-[#1E3A2F]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#1A1D1C]">
              2. Safety Boundaries & Human Oversight
            </h3>
            <p className="text-xs text-[#52605B] leading-relaxed">
              We never fabricate bookings or automate clinical diagnoses. Critical actions (such as doctor appointment confirmations or VIP dining table allocation) always require staff sign-off.
            </p>
          </div>

          <div className="bg-white border border-[#E3DDD3] rounded-xl p-5 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#EBF1EC] border border-[#D2E2D6] flex items-center justify-center text-[#1E3A2F]">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#1A1D1C]">
              3. Practical Staff Task Hand-offs
            </h3>
            <p className="text-xs text-[#52605B] leading-relaxed">
              Inquiries are structured into clean, prioritized CRM leads with clear tags (party size, fitness goal, stylist requested), reducing staff handling time significantly.
            </p>
          </div>

          <div className="bg-white border border-[#E3DDD3] rounded-xl p-5 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#EBF1EC] border border-[#D2E2D6] flex items-center justify-center text-[#1E3A2F]">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#1A1D1C]">
              4. Trade-Specific Workflows
            </h3>
            <p className="text-xs text-[#52605B] leading-relaxed">
              A clinic's needs differ radically from a restaurant's hearth seating or a salon's balayage duration. Our schemas adapt dynamically to the operational cadence of each trade.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance & Demo State Disclosure */}
      <section className="bg-white border border-[#E3DDD3] rounded-xl p-6 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono text-[#2D5A43]">
          <Lock className="w-3.5 h-3.5" />
          <span>LOCAL DEMONSTRATION NOTICE</span>
        </div>

        <h3 className="text-base font-bold text-[#1A1D1C]">
          Demonstration Environment Transparency
        </h3>

        <div className="text-xs text-[#55635F] leading-relaxed space-y-2">
          <p>
            This website is an independent client-facing SaaS demonstration built for workflow review and project scoping.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#3C4944]">
            <li>No external third-party APIs (Make.com, n8n, WhatsApp, Google Calendar, Twilio) are connected.</li>
            <li>No real customer data is collected, stored remotely, or transmitted across external networks.</li>
            <li>All metrics, leads, and responses are simulated for illustrative workflow evaluation.</li>
            <li>Custom deployment proposals are architected following formal scoping discussions.</li>
          </ul>
        </div>

        <div className="pt-3 border-t border-[#EFEBE4] flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-[#7A8883] font-mono">
            BookFlow AI Prototype
          </span>
          <button
            onClick={() => setIsInterestModalOpen(true)}
            className="text-xs font-semibold text-[#1E3A2F] hover:underline transition-colors"
          >
            Discuss an Automation Solution &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
