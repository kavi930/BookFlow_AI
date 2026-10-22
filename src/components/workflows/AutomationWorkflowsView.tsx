import React, { useState } from 'react';
import {
  Workflow,
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  Layers,
  Code2,
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Sparkle,
  ShieldAlert
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { WORKFLOWS_DATA, BUSINESS_PROFILES } from '../../data/mockData';
import { BusinessCategory, WorkflowStep } from '../../types';

export const AutomationWorkflowsView: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useDemo();
  const steps = WORKFLOWS_DATA[selectedCategory];
  const profile = BUSINESS_PROFILES[selectedCategory];

  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [isSimulatingRun, setIsSimulatingRun] = useState(false);
  const [activeRunningStep, setActiveRunningStep] = useState<number | null>(null);

  const activeStep: WorkflowStep = steps[selectedStepIndex] || steps[0];

  const handleCategorySwitch = (cat: BusinessCategory) => {
    setSelectedCategory(cat);
    setSelectedStepIndex(0);
    setIsSimulatingRun(false);
    setActiveRunningStep(null);
  };

  const handleSimulateExecution = () => {
    if (isSimulatingRun) return;
    setIsSimulatingRun(true);
    setActiveRunningStep(0);
    setSelectedStepIndex(0);

    const stepDuration = 600;
    steps.forEach((_, idx) => {
      setTimeout(() => {
        setActiveRunningStep(idx);
        setSelectedStepIndex(idx);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsSimulatingRun(false);
            setActiveRunningStep(null);
          }, stepDuration);
        }
      }, idx * stepDuration);
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-[#1A1D1C]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E7E2DA]">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D1C] tracking-tight">
            Automation Workflows & Rules
          </h1>
          <p className="text-xs sm:text-sm text-[#5D6B66] mt-0.5">
            Step-by-step logic connecting inbound customer enquiries with your front-desk follow-up queue.
          </p>
        </div>

        {/* Business Category Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E3DDD3] rounded-lg overflow-x-auto shadow-xs">
          <button
            onClick={() => handleCategorySwitch('clinics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'clinics'
                ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinics</span>
          </button>
          <button
            onClick={() => handleCategorySwitch('restaurants')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'restaurants'
                ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Restaurants</span>
          </button>
          <button
            onClick={() => handleCategorySwitch('gyms')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'gyms'
                ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Gyms</span>
          </button>
          <button
            onClick={() => handleCategorySwitch('salons')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'salons'
                ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <Sparkle className="w-3.5 h-3.5" />
            <span>Salons</span>
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white border border-[#E3DDD3] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#EBF1EC] border border-[#D2E2D6] flex items-center justify-center text-[#1E3A2F] shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#1A1D1C]">
                {profile.businessName} Workflow
              </span>
              <span className="text-[10px] font-mono text-[#2D5A43] bg-[#EBF1EC] px-2 py-0.5 rounded border border-[#CCDCD0]">
                5 STEPS
              </span>
            </div>
            <p className="text-xs text-[#5C6A65]">
              Click any step to inspect the logic, trigger condition, and simulated payload.
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateExecution}
          disabled={isSimulatingRun}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-medium text-xs rounded-lg shadow-xs transition-colors disabled:opacity-50"
        >
          {isSimulatingRun ? (
            <>
              <RotateCcw className="w-3.5 h-3.5 animate-spin text-white" />
              <span>Simulating Execution...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-white fill-current" />
              <span>Simulate Live Execution</span>
            </>
          )}
        </button>
      </div>

      {/* Step Diagram Chain */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {steps.map((step, idx) => {
          const isSelected = selectedStepIndex === idx;
          const isCurrentlyRunning = activeRunningStep === idx;

          return (
            <div
              key={step.stepNumber}
              onClick={() => setSelectedStepIndex(idx)}
              className={`p-4 rounded-xl border cursor-pointer transition-all relative flex flex-col justify-between ${
                isCurrentlyRunning
                  ? 'bg-[#EBF1EC] border-[#1E3A2F] shadow-sm'
                  : isSelected
                  ? 'bg-white border-[#1E3A2F] shadow-xs'
                  : 'bg-white border-[#E5E0D6] hover:border-[#D5CFC5] hover:bg-[#FAF8F5]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#1E3A2F] text-white'
                        : 'bg-[#F2EEE7] text-[#55625E]'
                    }`}
                  >
                    STEP 0{step.stepNumber}
                  </span>
                  {isCurrentlyRunning ? (
                    <span className="w-2 h-2 rounded-full bg-[#1E3A2F] animate-ping" />
                  ) : (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-[#1E3A2F]' : 'text-[#A4B3AC]'
                      }`}
                    />
                  )}
                </div>

                <h3 className="text-xs font-bold text-[#1A1D1C] leading-snug line-clamp-2">
                  {step.title}
                </h3>

                <p className="text-[11px] text-[#5A6863] mt-1 line-clamp-3 leading-relaxed">
                  {step.trigger}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#EFEBE4] flex items-center justify-between text-[10px] text-[#2D5A43] font-mono">
                <span>{step.highlightKey}</span>
                <ArrowRight className="w-3 h-3 text-[#A4B3AC]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Inspector Detail Box */}
      <section
        className="bg-white border border-[#E3DDD3] rounded-xl p-6 space-y-5 shadow-xs"
        aria-label="Workflow step inspector"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#EFEBE4]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#2D5A43]">
              <span>STAGE {activeStep.stepNumber} OF 5</span>
              <span className="text-[#CCD5D1]">·</span>
              <span className="text-[#1A1D1C] font-semibold">{activeStep.highlightKey}</span>
            </div>
            <h2 className="text-lg font-bold text-[#1A1D1C] mt-1">{activeStep.title}</h2>
          </div>

          <div className="text-[11px] font-mono text-[#586661] bg-[#FAF8F5] border border-[#E5E0D6] px-3 py-1 rounded-md">
            Trigger: Client Inbound Event
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Trigger & Business Action */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#6E7D77] font-semibold block mb-1">
                Trigger Event
              </span>
              <div className="p-3 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-xs text-[#2A3531] leading-relaxed">
                {activeStep.trigger}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-[#6E7D77] font-semibold block mb-1">
                Orchestration Logic
              </span>
              <div className="p-3 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-xs text-[#2A3531] leading-relaxed">
                {activeStep.action}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-[#6E7D77] font-semibold block mb-1">
                Architecture Note
              </span>
              <div className="p-3 bg-[#EBF1EC] border border-[#CCDCD0] rounded-lg text-xs text-[#273D32] leading-relaxed">
                {activeStep.technicalDetail}
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Output Payload */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#6E7D77] font-semibold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#2D5A43]" />
                <span>Simulated Output Payload</span>
              </span>
              <span className="text-[10px] font-mono text-[#8C9B95]">
                LOCAL DEMO
              </span>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E5E0D6] rounded-lg p-4 font-mono text-xs text-[#1E3A2F] overflow-x-auto">
              <pre className="whitespace-pre-wrap leading-relaxed">
                {activeStep.simulatedOutput}
              </pre>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[11px] text-[#55635E] flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-[#8C5E09] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Explanatory simulation: This diagram models proposed business automation rules. No external webhooks or third-party messaging services are invoked.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
