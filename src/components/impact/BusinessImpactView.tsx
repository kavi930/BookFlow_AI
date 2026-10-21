import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  DollarSign,
  Calculator,
  Info,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { ImpactParameters } from '../../types';

const BENCHMARK_PRESETS = [
  {
    name: 'CarePoint Clinic',
    category: 'Clinics',
    enquiriesPerMonth: 380,
    minutesPerEnquiry: 22,
    automationHandlingPercent: 70,
    monthlySoftwareCost: 199,
    hourlyLaborCost: 32,
    note: 'Involves routine pre-screening, doctor preference checks, and insurance co-pay questions.'
  },
  {
    name: 'Urban Table',
    category: 'Restaurants',
    enquiriesPerMonth: 550,
    minutesPerEnquiry: 12,
    automationHandlingPercent: 80,
    monthlySoftwareCost: 149,
    hourlyLaborCost: 22,
    note: 'High volume table requests, brunch hours, weekend party sizes, and dietary questions.'
  },
  {
    name: 'FitCore Studio',
    category: 'Gyms',
    enquiriesPerMonth: 290,
    minutesPerEnquiry: 18,
    automationHandlingPercent: 65,
    monthlySoftwareCost: 149,
    hourlyLaborCost: 25,
    note: 'Trial pass orientation, morning class schedule checks, and month-to-month plan FAQs.'
  },
  {
    name: 'Glow & Co. Salon',
    category: 'Salons',
    enquiriesPerMonth: 240,
    minutesPerEnquiry: 20,
    automationHandlingPercent: 60,
    monthlySoftwareCost: 129,
    hourlyLaborCost: 26,
    note: 'Balayage time allocations, stylist availability, consultation notes, and patch testing.'
  }
];

export const BusinessImpactView: React.FC = () => {
  const { setActiveTab } = useDemo();

  // Interactive ROI parameters
  const [params, setParams] = useState<ImpactParameters>({
    enquiriesPerMonth: 350,
    minutesPerEnquiry: 18,
    automationHandlingPercent: 65,
    monthlySoftwareCost: 199,
    hourlyLaborCost: 28
  });

  // Calculations
  const automatedEnquiries = Math.round(
    params.enquiriesPerMonth * (params.automationHandlingPercent / 100)
  );
  const monthlyMinutesSaved = automatedEnquiries * params.minutesPerEnquiry;
  const monthlyHoursSaved = Math.round((monthlyMinutesSaved / 60) * 10) / 10;
  const monthlyLaborValueSaved = Math.round(monthlyHoursSaved * params.hourlyLaborCost);
  const netMonthlyValue = Math.round(monthlyLaborValueSaved - params.monthlySoftwareCost);
  const annualNetValue = netMonthlyValue * 12;

  const handleApplyPreset = (preset: typeof BENCHMARK_PRESETS[0]) => {
    setParams({
      enquiriesPerMonth: preset.enquiriesPerMonth,
      minutesPerEnquiry: preset.minutesPerEnquiry,
      automationHandlingPercent: preset.automationHandlingPercent,
      monthlySoftwareCost: preset.monthlySoftwareCost,
      hourlyLaborCost: preset.hourlyLaborCost
    });
  };

  const handleResetDefaults = () => {
    setParams({
      enquiriesPerMonth: 350,
      minutesPerEnquiry: 18,
      automationHandlingPercent: 65,
      monthlySoftwareCost: 199,
      hourlyLaborCost: 28
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Calculator className="w-3.5 h-3.5" />
            <span>BUSINESS IMPACT MODEL</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Interactive ROI & Staff Time Calculator
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Model potential operational efficiency based on transparent formulas and your business metrics.
          </p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded-lg transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Assumptions</span>
        </button>
      </div>

      {/* Preset Profiles Selector */}
      <section aria-label="Industry benchmark assumptions" className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase text-slate-400">
            Industry Benchmark Presets
          </span>
          <span className="text-[11px] text-slate-400">
            Click to load realistic baseline models
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {BENCHMARK_PRESETS.map((preset) => (
            <button
              key={preset.category}
              onClick={() => handleApplyPreset(preset)}
              className="text-left p-3 rounded-lg bg-slate-900/60 hover:bg-slate-850 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-cyan-300">
                  {preset.category}
                </span>
                <span className="text-[10px] font-mono text-cyan-400">
                  {preset.enquiriesPerMonth} / mo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-snug">
                {preset.note}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid: Sliders on Left (7 cols) + Metric Results on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#0B142A] border border-slate-800/90 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Operational Assumptions</span>
            </h2>
            <span className="text-[11px] font-mono text-cyan-400">
              ADJUSTABLE PARAMETERS
            </span>
          </div>

          <div className="space-y-5">
            {/* Control 1: Enquiries per month */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-200">
                  1. Inbound Enquiries Per Month
                </label>
                <span className="font-mono text-cyan-300 font-bold tabular-nums">
                  {params.enquiriesPerMonth} enquiries
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={2000}
                step={25}
                value={params.enquiriesPerMonth}
                onChange={(e) =>
                  setParams({ ...params, enquiriesPerMonth: parseInt(e.target.value, 10) })
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>50 / mo (boutique)</span>
                <span>1,000 / mo</span>
                <span>2,000 / mo (high volume)</span>
              </div>
            </div>

            {/* Control 2: Minutes spent per enquiry */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-200">
                  2. Manual Handling Time Per Enquiry
                </label>
                <span className="font-mono text-cyan-300 font-bold tabular-nums">
                  {params.minutesPerEnquiry} minutes
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={45}
                step={1}
                value={params.minutesPerEnquiry}
                onChange={(e) =>
                  setParams({ ...params, minutesPerEnquiry: parseInt(e.target.value, 10) })
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5 mins (quick message)</span>
                <span>20 mins (scheduling call)</span>
                <span>45 mins (detailed consult)</span>
              </div>
            </div>

            {/* Control 3: Automation Percentage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-200">
                  3. Estimated Percentage Automated / Assisted
                </label>
                <span className="font-mono text-cyan-300 font-bold tabular-nums">
                  {params.automationHandlingPercent}%
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={95}
                step={5}
                value={params.automationHandlingPercent}
                onChange={(e) =>
                  setParams({
                    ...params,
                    automationHandlingPercent: parseInt(e.target.value, 10)
                  })
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>20% (basic FAQ only)</span>
                <span>65% (typical BookFlow triage)</span>
                <span>95% (full automation)</span>
              </div>
            </div>

            {/* Financial Inputs: Hourly Labor & Software Cost */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  4. Front-Desk Labor Cost ($ / hr)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">
                    $
                  </span>
                  <input
                    type="number"
                    min={15}
                    max={120}
                    value={params.hourlyLaborCost}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        hourlyLaborCost: Math.max(1, parseInt(e.target.value, 10) || 0)
                      })
                    }
                    className="w-full bg-[#080E1C] border border-slate-700 rounded-md pl-7 pr-3 py-1.5 text-xs text-white font-mono outline-none focus:border-cyan-400"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Hourly wage or loaded employee rate.
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  5. Estimated Software Cost ($ / mo)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">
                    $
                  </span>
                  <input
                    type="number"
                    min={49}
                    max={1500}
                    value={params.monthlySoftwareCost}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        monthlySoftwareCost: Math.max(0, parseInt(e.target.value, 10) || 0)
                      })
                    }
                    className="w-full bg-[#080E1C] border border-slate-700 rounded-md pl-7 pr-3 py-1.5 text-xs text-white font-mono outline-none focus:border-cyan-400"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Hypothetical SaaS operating budget.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculated Results (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0B142A] border border-cyan-900/40 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-semibold uppercase text-cyan-400">
                Calculated Business ROI
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                HYPOTHETICAL MODEL
              </span>
            </div>

            {/* Primary Net Savings Callout */}
            <div className="p-4 bg-gradient-to-br from-[#0F223D] to-[#0A162B] border border-cyan-500/30 rounded-xl space-y-1">
              <span className="text-xs font-medium text-cyan-300">
                Estimated Net Monthly Value
              </span>
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                ${netMonthlyValue.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 font-sans ml-1">
                  / month
                </span>
              </div>
              <div className="text-xs text-emerald-400 font-mono pt-1">
                Annualized Est: ${annualNetValue.toLocaleString()} / year
              </div>
            </div>

            {/* Secondary Output Metrics */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Monthly Staff Hours Saved:</span>
                </div>
                <span className="text-white font-bold font-mono text-sm tabular-nums">
                  {monthlyHoursSaved} hrs
                </span>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Staff Minutes Reclaimed:</span>
                </div>
                <span className="text-white font-bold font-mono text-sm tabular-nums">
                  {monthlyMinutesSaved.toLocaleString()} mins
                </span>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Gross Labor Value Saved:</span>
                </div>
                <span className="text-white font-bold font-mono text-sm tabular-nums">
                  ${monthlyLaborValueSaved.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Formula Transparency Card */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px] text-slate-400 font-mono">
              <span className="text-slate-300 font-semibold block">
                Transparent Formula Logic:
              </span>
              <div>• Automated inquiries: {params.enquiriesPerMonth} × {params.automationHandlingPercent}% = {automatedEnquiries}</div>
              <div>• Hours saved: ({automatedEnquiries} × {params.minutesPerEnquiry} min) ÷ 60 = {monthlyHoursSaved} hrs</div>
              <div>• Net savings: ({monthlyHoursSaved} hrs × ${params.hourlyLaborCost}) - ${params.monthlySoftwareCost} cost = ${netMonthlyValue}</div>
            </div>
          </div>

          {/* Explicit Disclaimer Notice */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>Calculation & Outcome Disclosure</span>
            </div>
            <p className="leading-relaxed">
              All outputs are hypothetical estimates for demonstration purposes only. Actual outcomes depend on real-world factors including enquiry volume variations, staff adoption, implementation fidelity, and unique business operating costs. No specific financial or operational return is guaranteed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
