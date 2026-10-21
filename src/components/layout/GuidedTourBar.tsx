import React from 'react';
import { ArrowRight, ArrowLeft, X, Sparkles } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

const STEPS = [
  { step: 1, title: '1. Overview', desc: 'Choose a business & inspect metrics' },
  { step: 2, title: '2. AI Assistant', desc: 'Test instant customer Q&A' },
  { step: 3, title: '3. Enquiry Demo', desc: 'Submit a sample customer request' },
  { step: 4, title: '4. Lead Pipeline', desc: 'Track live captured lead record' },
  { step: 5, title: '5. Workflows', desc: 'Inspect backend trigger flow' },
  { step: 6, title: '6. Business ROI', desc: 'Calculate staff hours & cost saved' }
];

export const GuidedTourBar: React.FC = () => {
  const { guidedTour } = useDemo();

  if (!guidedTour.isActive) return null;

  return (
    <div
      role="region"
      aria-label="Guided demo walkthrough"
      className="bg-[#0C172E] border-b border-cyan-500/20 px-4 py-2.5 transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Guided Walkthrough</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">Step {guidedTour.currentStep} of 6</span>
          </div>
          <span className="hidden sm:inline text-xs text-slate-400">
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
                className={`text-xs px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  isCurrent
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-medium'
                    : isPast
                    ? 'text-slate-300 hover:text-white bg-slate-800/60'
                    : 'text-slate-500 hover:text-slate-300'
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
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Previous step"
          >
            <ArrowLeft className="w-3 h-3" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            onClick={guidedTour.nextStep}
            className="flex items-center gap-1 text-xs px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-sm transition-colors"
            aria-label="Next step"
          >
            <span>{guidedTour.currentStep === 6 ? 'Finish' : 'Next Step'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={guidedTour.dismissTour}
            className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800/80 transition-colors"
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
