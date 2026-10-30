import React from 'react';
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onBookAuditClick: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onBookAuditClick }) => {
  const plans = [
    {
      name: 'Starter Workflow',
      tagline: 'Ideal for independent Indian clinics & boutique studios',
      price: '₹4,999',
      period: 'per month',
      description:
        'Essential automated customer enquiry capture and calendar slot booking for growing local businesses.',
      features: [
        'AI website inquiry assistant (24/7 in English & Hinglish)',
        'Google & Outlook calendar two-way sync',
        'Automated slot booking with buffer rules',
        'Standard email & SMS appointment confirmations',
        'Centralized inquiry inbox for clinic/salon staff'
      ],
      popular: false,
      ctaText: 'Request Starter Audit'
    },
    {
      name: 'Professional',
      tagline: 'Most popular for busy clinics, gyms & multi-chair salons',
      price: '₹9,999',
      period: 'per month',
      description:
        'Complete multi-channel intake with official WhatsApp automation and custom doctor/practitioner buffers.',
      features: [
        'Everything in Starter',
        'WhatsApp Business automated conversation engine',
        '15-minute sanitization & buffer rule enforcement',
        'Automated 24h & 2h pre-visit reminders on WhatsApp',
        'Staff supervisor lead pipeline & manual override',
        'Operational volume & response time analytics'
      ],
      popular: true,
      badge: 'MOST POPULAR IN INDIA',
      ctaText: 'Book a Free Audit'
    },
    {
      name: 'Multi-Location Enterprise',
      tagline: 'For hospital chains, group clinics & franchise gyms',
      price: 'Custom',
      period: 'tailored INR scope',
      description:
        'Multi-practitioner scheduling with custom policy rules, multi-city branch routing, and dedicated onboarding.',
      features: [
        'Everything in Professional',
        'Unlimited staff calendars & branch locations',
        'Custom intake screening & clinical triage questionnaires',
        'Priority SLA support & dedicated Indian account manager',
        'Custom EHR, HMS & billing software integration consultation'
      ],
      popular: false,
      ctaText: 'Contact for Enterprise Scope'
    }
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1EC] border border-[#CCDCD0] text-[#1E3A2F] text-xs font-semibold tracking-wide">
            <span>Transparent Pricing in INR (₹)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D1C] leading-tight">
            Transparent Pricing Built for Indian Businesses
          </h2>
          <p className="text-base sm:text-lg text-[#52605B] leading-relaxed max-w-2xl mx-auto">
            Every plan begins with a 100% free automation audit and custom operational blueprint. GST-compliant invoicing with zero lock-in.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 relative ${
                plan.popular
                  ? 'bg-white border-2 border-[#1E3A2F] shadow-xl shadow-[#1E3A2F]/10 scale-100 lg:-translate-y-2'
                  : 'bg-white border border-[#E7E2DA] shadow-xs hover:shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1E3A2F] text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-xs whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1A1D1C]">{plan.name}</h3>
                  <p className="text-xs text-[#717E79] mt-1">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1.5 pb-4 border-b border-[#EFEBE4]">
                  <span className="text-4xl font-extrabold text-[#1A1D1C]">{plan.price}</span>
                  <span className="text-xs text-[#717E79] font-medium">/{plan.period}</span>
                </div>

                <p className="text-xs text-[#52605B] leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-bold text-[#2F3A36] uppercase tracking-wider block">
                    What's Included:
                  </span>
                  <ul className="space-y-2 text-xs text-[#52605B]">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[#EFEBE4]">
                <button
                  type="button"
                  onClick={onBookAuditClick}
                  className={`w-full py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-[#1E3A2F] hover:bg-[#26493B] text-white shadow-sm hover:shadow-[#1E3A2F]/20'
                      : 'bg-white hover:bg-[#FAF8F5] text-[#1A1D1C] border border-[#DCD6CC]'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Audit Guarantee Note */}
        <div className="p-4 rounded-xl bg-[#EBF1EC] border border-[#CCDCD0] text-center max-w-2xl mx-auto text-xs text-[#1E3A2F] flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2D5A43] shrink-0" />
          <span>All plans in INR (₹). GST invoice provided. Includes a 30-day evaluation sandbox with dedicated WhatsApp and phone support.</span>
        </div>
      </div>
    </section>
  );
};
