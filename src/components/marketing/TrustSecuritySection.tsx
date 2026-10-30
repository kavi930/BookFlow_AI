import React from 'react';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  FileCheck2,
  Server,
  AlertCircle,
  EyeOff
} from 'lucide-react';

export const TrustSecuritySection: React.FC = () => {
  const principles = [
    {
      title: 'Server-Side Credential Isolation',
      tagline: 'Zero Secrets in Browser',
      description:
        'All API keys, access tokens, and webhook secrets (e.g. Meta WhatsApp, Google Calendar, Twilio) are held exclusively in protected server environments and are never bundled into client-side JavaScript.',
      icon: <KeyRound className="w-5 h-5 text-[#2D5A43]" />
    },
    {
      title: 'Cryptographic Webhook Verification',
      tagline: 'Signature Validation',
      description:
        'Inbound payloads from external messaging channels are authenticated via HMAC SHA-256 signatures to reject unverified requests and prevent replay attacks.',
      icon: <Lock className="w-5 h-5 text-[#2D5A43]" />
    },
    {
      title: 'Customer Data Minimization',
      tagline: 'Restricted Payload Scope',
      description:
        'We capture only the minimum contact and scheduling details necessary to book the appointment and coordinate reminders. No sensitive medical charting is stored on marketing layers.',
      icon: <EyeOff className="w-5 h-5 text-[#2D5A43]" />
    },
    {
      title: 'Explicit Integration Boundaries',
      tagline: 'Transparent Architecture',
      description:
        'We explicitly distinguish operational sandbox features from external production integrations, ensuring your engineering team knows exactly what requires credentials before deployment.',
      icon: <Server className="w-5 h-5 text-[#2D5A43]" />
    }
  ];

  return (
    <section id="trust-security" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#2D5A43] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A43]" />
            <span>Architecture & Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1D1C]">
            Built with strict credential isolation and data hygiene.
          </h2>
          <p className="text-base sm:text-lg text-[#52605B] leading-relaxed">
            We follow standard security engineering practices: keeping credentials on the server, validating all incoming webhooks, and protecting your customer relationships.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {principles.map((p, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E3DDD3] rounded-2xl p-6 sm:p-7 shadow-sm space-y-4 hover:border-[#1E3A2F]/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#EBF1EC] text-[#2D5A43]">
                  {p.icon}
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#2D5A43] font-semibold block">{p.tagline}</span>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1D1C]">{p.title}</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#52605B] leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Factual Disclaimer Card */}
        <div className="p-4 bg-white border border-[#E7E2DA] rounded-xl text-xs text-[#52605B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#2D5A43] shrink-0" />
            <span>
              <strong>Factual Notice:</strong> We do not make unsubstantiated claims of certifications or audit seals. Our security stems from clean server-side separation and explicit data boundaries.
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#717E79] whitespace-nowrap">AUDIT HYGIENE</span>
        </div>
      </div>
    </section>
  );
};
