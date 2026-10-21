import React, { useState } from 'react';
import {
  Workflow,
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Layers,
  Code2,
  FileCode,
  Sparkles,
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

    const stepDuration = 700;
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Workflow className="w-3.5 h-3.5" />
            <span>ORCHESTRATION ARCHITECTURE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Automation Workflows & Triggers
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Inspect the 5-step automated lifecycle connecting public front-ends, business rules, and staff queues.
          </p>
        </div>

        {/* Business Category Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-lg overflow-x-auto">
          <button
            onClick={() => handleCategorySwitch('clinics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'clinics'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinics</span>
          </button>
          <button
            onClick={() => handleCategorySwitch('restaurants')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'restaurants'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Restaurants</span>
          </button>
          <button
            onClick={() => handleCategorySwitch('gyms')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'gyms'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Gyms</span>
          </button>
          <button
            onClick={() => handleCategorySwitch('salons')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'salons'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkle className="w-3.5 h-3.5" />
            <span>Salons</span>
          </button>
        </div>
      </div>

      {/* Blueprint Control Bar */}
      <div className="bg-[#0B142A] border border-cyan-900/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                {profile.businessName} Flow
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/50 px-2 py-0.5 rounded">
                5 STAGES
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive diagram: click any step to inspect the logic and simulated payload.
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateExecution}
          disabled={isSimulatingRun}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-all disabled:opacity-50"
        >
          {isSimulatingRun ? (
            <>
              <RotateCcw className="w-3.5 h-3.5 animate-spin text-slate-950" />
              <span>Simulating Pipeline Execution...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-slate-950 fill-current" />
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
                  ? 'bg-cyan-950/90 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                  : isSelected
                  ? 'bg-[#0E1B38] border-cyan-500/60 shadow-md'
                  : 'bg-[#0B142A] border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    STEP 0{step.stepNumber}
                  </span>
                  {isCurrentlyRunning ? (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  ) : (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-cyan-400' : 'text-slate-600'
                      }`}
                    />
                  )}
                </div>

                <h3 className="text-xs font-bold text-white leading-snug line-clamp-2">
                  {step.title}
                </h3>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                  {step.trigger}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-cyan-400 font-mono">
                <span>{step.highlightKey}</span>
                <ArrowRight className="w-3 h-3 text-slate-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Inspector Detail Box */}
      <section
        className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-6 space-y-5"
        aria-label="Workflow step inspector"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>INSPECTOR: STAGE {activeStep.stepNumber} OF 5</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-semibold">{activeStep.highlightKey}</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">{activeStep.title}</h2>
          </div>

          <div className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded">
            Trigger: Client Inbound Event
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Sub-column: Trigger & Business Action */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Trigger Event
              </span>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 leading-relaxed">
                {activeStep.trigger}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Orchestration Logic
              </span>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 leading-relaxed">
                {activeStep.action}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Architecture Note
              </span>
              <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-lg text-xs text-cyan-300/90 leading-relaxed">
                {activeStep.technicalDetail}
              </div>
            </div>
          </div>

          {/* Right Sub-column: Simulated Output Payload */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulated Output Payload</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                JSON SIMULATION
              </span>
            </div>

            <div className="bg-[#070D1A] border border-slate-800 rounded-lg p-4 font-mono text-xs text-cyan-300 overflow-x-auto">
              <pre className="whitespace-pre-wrap leading-relaxed">
                {activeStep.simulatedOutput}
              </pre>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-lg text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Explanatory simulation: This workflow diagram models proposed business automation rules. No webhooks, Make.com scenarios, or external messaging APIs are invoked.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
