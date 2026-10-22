import React from 'react';
import { ArrowRight, ArrowLeft, X, Sparkles } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

const STEPS = [
  { step: 1, title: '1. Overview', desc: 'Summary & business models' },
  { step: 2, title: '2. AI Assistant', desc: 'Sample automated Q&A' },
  { step: 3, title: '3. Enquiry Demo', desc: 'Submit a sample customer request' },
  { step: 4, title: '4. Lead Pipeline', desc: 'Track captured lead record' },
  { step: 5, title: '5. Workflows', desc: 'Inspect automation flow' },
  { step: 6, title: '6. Impact', desc: 'Calculate time & cost saved' }
];

export const GuidedTourBar: React.FC = () => {
  const { guidedTour } = useDemo();

  if (!guidedTour.isActive) return null;

  return (
    <div
      role="region"
      aria-label="Guided demo walkthrough"
      className="bg-[#EBF1ED] border-b border-[#D5E1D8] px-4 py-2.5 transition-all text-[#1A1D1C]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3A2F]">
            <Sparkles className="w-3.5 h-3.5 text-[#2D5A43]" />
            <span>Guided Walkthrough</span>
            <span className="text-[#8B9892]">·</span>
            <span className="text-[#3A4A42] font-normal">Step {guidedTour.currentStep} of 6</span>
          </div>
          <span className="hidden sm:inline text-xs text-[#52635B]">
            {STEPS[guidedTour.currentStep - 1]?.desc}
          </span>
        </div>

        {/* Step indicator buttons */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {STEPS.map((s) => {
            const isCurrent = s.step === guidedTour.currentStep;
            const isPast = s.step < guidedTour.currentStep;

            return (
              <button
                key={s.step}
                onClick={() => guidedTour.goToStep(s.step)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[#1E3A2F] text-white font-medium shadow-xs'
                    : isPast
                    ? 'text-[#2D5A43] bg-[#DEE9E0] hover:bg-[#D4E2D7]'
                    : 'text-[#64756D] hover:text-[#1A1D1C] hover:bg-[#DEE9E0]'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={guidedTour.prevStep}
            disabled={guidedTour.currentStep === 1}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border border-[#C5D4C9] text-[#2F3D36] hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Previous step"
          >
            <ArrowLeft className="w-3 h-3" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            onClick={guidedTour.nextStep}
            className="flex items-center gap-1 text-xs px-3 py-1 rounded-md bg-[#1E3A2F] hover:bg-[#2A4D3F] text-white font-medium shadow-xs transition-colors"
            aria-label="Next step"
          >
            <span>{guidedTour.currentStep === 6 ? 'Finish' : 'Next Step'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={guidedTour.dismissTour}
            className="text-[#5F7168] hover:text-[#1A1D1C] p-1 rounded-md hover:bg-[#DEE9E0] transition-colors"
            aria-label="Close guided walkthrough"
            title="Exit Walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
