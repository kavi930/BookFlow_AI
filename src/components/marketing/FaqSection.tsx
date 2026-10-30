import React, { useState } from 'react';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  onBookAuditClick: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onBookAuditClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is included in the free audit?',
      answer:
        'You receive a comprehensive review of your current customer enquiry channels (WhatsApp, website forms, and phone intake). We identify repetitive manual bottlenecks, outline a tailored automation blueprint showing slot holds and buffer rules, and provide a prioritized implementation estimate with quick wins—delivered within 24 hours.'
    },
    {
      question: 'Is the audit a live integration?',
      answer:
        'No. The free audit is an architectural and operational assessment. It evaluates your existing booking flow and maps out recommended automations without touching your live calendar, messaging tools, or patient/customer databases.'
    },
    {
      question: 'Which business types are supported?',
      answer:
        'FlowPilot AI is engineered specifically for appointment-based and customer-enquiry operations across India, primarily: Clinics & Healthcare practices, Restaurants & Hospitality dining, Gyms & Fitness studios, and Salons & Beauty services. We also support specialized consultancies.'
    },
    {
      question: 'What information is required to get started?',
      answer:
        'Only basic operational context: your business name, sector, work email or WhatsApp contact number, and a brief description of where your front-desk spends repetitive time (e.g., handling off-hours WhatsApp queries or manual appointment confirmations). No passwords, API keys, or financial credentials are ever requested.'
    },
    {
      question: 'Are integrations already connected in the demo?',
      answer:
        'The walkthroughs and simulators on this website use deterministic, simulated demo data for safe evaluation. Production deployments connect directly to your verified WhatsApp Business API, Google Calendar / Workspace accounts, and SMS dispatch gateways after you review and approve the blueprint.'
    },
    {
      question: 'What happens after submitting a request?',
      answer:
        'Our operations team reviews your intake notes, prepares your custom automation architecture diagram, and delivers the blueprint directly to your email or WhatsApp within 24 hours. There is zero sales pressure, zero auto-billing, and no lock-in contract.'
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E7E2DA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header - Zero pill discipline, clean text kicker */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2D5A43]">
            Trust & Transparent Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1D1C] leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#52605B] leading-relaxed">
            Direct, practical answers about our free audit process, data boundaries, and onboarding.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#E7E2DA] overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#1A1D1C] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#EBF1EC] text-[#1E3A2F] rotate-180' : 'bg-[#FAF8F5] text-[#717E79]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#52605B] leading-relaxed border-t border-[#FAF8F5]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Note */}
        <div className="text-center pt-2">
          <p className="text-xs sm:text-sm text-[#52605B]">
            Have a specific workflow question not covered here?{' '}
            <button
              type="button"
              onClick={onBookAuditClick}
              className="text-[#1E3A2F] font-bold hover:underline cursor-pointer"
            >
              Ask during your free audit consultation &rarr;
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
