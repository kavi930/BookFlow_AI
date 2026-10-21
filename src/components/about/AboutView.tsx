import React from 'react';
import {
  ShieldCheck,
  Zap,
  Users,
  Calendar,
  MessageSquarePlus,
  ArrowRight,
  Layers,
  Sparkles,
  Lock,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AboutView: React.FC = () => {
  const { setIsInterestModalOpen, setActiveTab } = useDemo();

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Hero Intro */}
      <section className="bg-gradient-to-b from-[#0F1D38] to-[#0A1326] border border-cyan-900/30 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>ABOUT BOOKFLOW AI</span>
            <span className="text-slate-600">·</span>
            <span>SYSTEM CONSTITUTION & METHODOLOGY</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Turn Every Enquiry Into an Opportunity
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            BookFlow AI envisions custom automation workflows that bridge the gap between inbound customer interest and busy service staff. We believe modern local businesses shouldn't lose prospects to unreturned voice messages, delayed email inquiries, or disjointed calendars.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsInterestModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all"
            >
              <MessageSquarePlus className="w-4 h-4 text-slate-950" />
              <span>Discuss an Automation Solution (Demo Form)</span>
            </button>

            <button
              onClick={() => setActiveTab('demos')}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs sm:text-sm rounded-lg transition-colors"
            >
              <span>Explore Interactive Demos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* 4 Architectural Tenets */}
      <section className="space-y-4" aria-label="Core architecture pillars">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Architectural Philosophy
          </h2>
          <p className="text-xs text-slate-400">
            Four engineering principles driving our proposed automation blueprints.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">
              1. Instant Context-Aware Triage
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every inbound website inquiry, booking request, or question receives an instant, intelligent acknowledgment with verified business hours, service details, and expectations.
            </p>
          </div>

          <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-white">
              2. Safety Boundaries & Human Oversight
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never fabricate bookings or automate clinical diagnoses. High-stakes actions (such as doctor appointment confirmations or VIP dining allocations) always require front-desk confirmation.
            </p>
          </div>

          <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">
              3. Frictionless Staff Hand-off
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inquiries are structured into clean, prioritized CRM leads with clear tags (party size, fitness goal, stylist requested), reducing staff handling time from 20 minutes to under 2 minutes.
            </p>
          </div>

          <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">
              4. Tailored Industry Vertical Schemas
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              A clinic's needs differ radically from a restaurant's hearth seating or a salon's balayage duration. Our schemas adapt dynamically to the operational DNA of each trade.
            </p>
          </div>
        </div>
      </section>

      {/* Transparency & Demo State Disclosure */}
      <section className="bg-[#080E1C] border border-slate-800 rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Lock className="w-3.5 h-3.5" />
          <span>HERMETIC CLIENT-SIDE DEMO COMPLIANCE</span>
        </div>

        <h3 className="text-base font-bold text-white">
          Demonstration Environment Notice
        </h3>

        <div className="text-xs text-slate-400 leading-relaxed space-y-2">
          <p>
            This web application is an independent client-facing SaaS demonstration built for showcase and scoping purposes.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>No external third-party APIs (Make.com, n8n, WhatsApp, Google Calendar, Twilio) are connected.</li>
            <li>No real customer data is collected, stored remotely, or transmitted across the network.</li>
            <li>All metrics, leads, and responses are simulated for illustrative workflow evaluation.</li>
            <li>Custom deployment proposals are architected following formal scoping discussions.</li>
          </ul>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-slate-500 font-mono">
            BookFlow AI Demonstration Architecture v1.0
          </span>
          <button
            onClick={() => setIsInterestModalOpen(true)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Request Custom Consultation &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
