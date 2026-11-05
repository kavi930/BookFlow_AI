import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  AlertTriangle,
  FileCheck2,
  Cpu,
  CheckCircle2,
  Terminal,
  HelpCircle
} from 'lucide-react';

export const SecurityReliabilitySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'principles' | 'audit'>('principles');

  const pillars = [
    {
      id: 'sandbox',
      icon: <Lock className="w-5 h-5 text-[#1E3A2F]" />,
      title: 'Hermetic Client Sandbox Isolation',
      category: 'Data Privacy',
      description:
        'All demo interactions, customer records, and pipeline modifications execute strictly within your local browser memory and localStorage. No external telemetry or remote databases store your entries.',
      points: [
        'Zero tracking cookies or cross-site fingerprinting',
        'Session data stays on your device and can be reset with 1-click',
        'Independent of third-party analytics scripts'
      ]
    },
    {
      id: 'clinical-triage',
      icon: <AlertTriangle className="w-5 h-5 text-[#8C5E09]" />,
      title: 'Non-Clinical Triage Guardrails',
      category: 'Healthcare Safety',
      description:
        'When operating in healthcare and clinical modes, BookFlow_AI enforces strict non-diagnostic boundaries. It never recommends treatments, interprets symptoms, or provides medical advice.',
      points: [
        'Immediate escalation prompt for red-flag acute symptoms (chest pain, breathing difficulty)',
        'Clear emergency hotline referral (999 / 911 / 112)',
        'Restricted solely to administrative scheduling and front-desk logistics'
      ]
    },
    {
      id: 'human-in-the-loop',
      icon: <UserCheck className="w-5 h-5 text-[#6D28D9]" />,
      title: 'Human-in-the-Loop Verification',
      category: 'Operational Integrity',
      description:
        'Automated workflows prepare provisional bookings and draft responses, but operational control remains with business staff. Unfamiliar requests flag for manual front-desk sign-off.',
      points: [
        'High-value or edge-case enquiries route to "Contact Required"',
        'Staff can override, adjust, or cancel provisional holds instantly',
        'Full audit trail of AI-generated responses and staff notes'
      ]
    },
    {
      id: 'sanitization',
      icon: <FileCheck2 className="w-5 h-5 text-[#2D5A43]" />,
      title: 'Typed Schema Validation & Sanitization',
      category: 'System Reliability',
      description:
        'All conversational inputs, phone numbers, and reservation requests are filtered through strict type checks and sanitized against prompt injection and malformed inputs.',
      points: [
        'Strict schema checks on date, time window, and party size',
        'Rejection of malicious instruction injection prompts',
        'Deterministic calendar conflict detection engine'
      ]
    }
  ];

  return (
    <section className="bg-white border border-[#E3DDD3] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EFEBE4]">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E7E2DA] text-xs font-semibold tracking-wider uppercase text-[#2D5A43]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A2F]" />
            <span>Integrity & Governance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1D1C]">
            Reliability built on transparent engineering.
          </h2>
          <p className="text-xs sm:text-sm text-[#52605B] leading-relaxed">
            Factual safeguards designed for real-world practices. No fabricated compliance badges or exaggerated claims.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center p-1 bg-[#FAF8F5] border border-[#E3DDD3] rounded-lg text-xs self-start md:self-auto">
          <button
            onClick={() => setActiveTab('principles')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'principles'
                ? 'bg-white text-[#1E3A2F] shadow-xs font-semibold'
                : 'text-[#62716B] hover:text-[#1A1D1C]'
            }`}
          >
            Engineering Safeguards
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'audit'
                ? 'bg-white text-[#1E3A2F] shadow-xs font-semibold'
                : 'text-[#62716B] hover:text-[#1A1D1C]'
            }`}
          >
            Live Architecture Specs
          </button>
        </div>
      </div>

      {activeTab === 'principles' ? (
        /* 4 Pillars Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl p-5 sm:p-6 space-y-4 hover:border-[#D0C8BC] transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#DDD6C9] flex items-center justify-center shrink-0">
                  {pillar.icon}
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-[#E0D9CD] text-[#55635E]">
                  {pillar.category}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#1A1D1C]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#52605B] mt-1.5 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#EAE4D9] space-y-1.5">
                {pillar.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#2A3631]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Live Architecture & Technical Spec View */
        <div className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#1E3A2F]" />
              <span className="text-xs font-semibold text-[#1A1D1C]">
                Security Matrix & Runtime Boundary Rules
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#2D5A43] bg-[#EBF1EC] px-2 py-0.5 rounded font-semibold">
              ACTIVE SANDBOX POLICY: ENFORCED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white border border-[#E5E0D6] rounded-lg p-4 space-y-2">
              <span className="font-mono text-[11px] text-[#6F7D78] uppercase">
                1. Boundary Verification
              </span>
              <p className="font-semibold text-[#1A1D1C]">Non-Diagnostic Assertion</p>
              <p className="text-[#4F5B57] leading-relaxed">
                Rules parser automatically intercepts any health-related advice queries, replying with front-desk booking triage only.
              </p>
            </div>

            <div className="bg-white border border-[#E5E0D6] rounded-lg p-4 space-y-2">
              <span className="font-mono text-[11px] text-[#6F7D78] uppercase">
                2. Data Locality
              </span>
              <p className="font-semibold text-[#1A1D1C]">Zero External Telemetry</p>
              <p className="text-[#4F5B57] leading-relaxed">
                Applet does not transmit visitor identifiers, phone numbers, or conversation content to third-party ad networks or brokers.
              </p>
            </div>

            <div className="bg-white border border-[#E5E0D6] rounded-lg p-4 space-y-2">
              <span className="font-mono text-[11px] text-[#6F7D78] uppercase">
                3. Concurrency Safety
              </span>
              <p className="font-semibold text-[#1A1D1C]">15-Min Slot Hold Lock</p>
              <p className="text-[#4F5B57] leading-relaxed">
                Prevents double-booking collisions by creating a timestamped lock until confirmed by front-desk or released on timeout.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white border border-[#E3DDD3] flex items-start gap-3 text-xs text-[#4F5D58]">
            <HelpCircle className="w-4 h-4 text-[#8C5E09] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#1A1D1C]">Production Deployment Note:</strong> When connected to live clinic EHRs or salon POS systems in production environments, BookFlow_AI integrates via encrypted scoped OAuth connectors, maintaining complete tenant isolation and audit logs.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
