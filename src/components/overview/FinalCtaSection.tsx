import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Calendar, ShieldCheck } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const FinalCtaSection: React.FC = () => {
  const { setIsInterestModalOpen, guidedTour } = useDemo();

  return (
    <section className="bg-[#1E3A2F] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
      {/* Subtle organic background pattern accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D5A43] opacity-20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#142921] opacity-40 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#284E3F] border border-[#3A6B56] text-xs font-medium text-[#C8E0D2]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]" />
          <span>Experience BookFlow_AI in Action</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
          Turn every enquiry into a confirmed appointment.
        </h2>

        <p className="text-sm sm:text-base text-[#D4E2DA] leading-relaxed max-w-2xl mx-auto">
          See firsthand how automated WhatsApp triage, calendar availability checks, and scheduled reminders remove front-desk delays and keep your schedule full.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsInterestModalOpen(true)}
            className="px-6 py-3 rounded-lg bg-white hover:bg-[#F3EFE9] text-[#1E3A2F] font-semibold text-sm transition-all shadow-sm flex items-center gap-2 group"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-4 h-4 text-[#1E3A2F] group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={guidedTour.startTour}
            className="px-5 py-3 rounded-lg bg-[#284E3F] hover:bg-[#32604E] text-white border border-[#406E5A] font-medium text-sm transition-colors"
          >
            Explore Guided Tour
          </button>
        </div>

        {/* Factual, credible trust bullets */}
        <div className="pt-6 border-t border-[#2F5445] flex flex-wrap items-center justify-center gap-6 text-xs text-[#BED2C7]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#6EE7B7]" />
            <span>Interactive sandbox preview</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#6EE7B7]" />
            <span>Tailored for clinics, restaurants & studios</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#6EE7B7]" />
            <span>Zero configuration required</span>
          </span>
        </div>
      </div>
    </section>
  );
};
