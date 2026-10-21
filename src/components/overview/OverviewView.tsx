import React, { useState } from 'react';
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Sparkle,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { WEEKLY_ACTIVITY_DATA } from '../../data/mockData';
import { BusinessCategory } from '../../types';

export const OverviewView: React.FC = () => {
  const { setActiveTab, setSelectedCategory, leads, setSelectedLeadForDetail, guidedTour } = useDemo();
  const [timeRange, setTimeRange] = useState<'7d' | '14d'>('7d');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<typeof WEEKLY_ACTIVITY_DATA[0] | null>(null);

  const displayData = timeRange === '7d' ? WEEKLY_ACTIVITY_DATA.slice(-7) : WEEKLY_ACTIVITY_DATA;
  const maxTotal = Math.max(...displayData.map((d) => d.total));

  const handleExploreCategory = (category: BusinessCategory) => {
    setSelectedCategory(category);
    setActiveTab('demos');
  };

  const recentLeads = leads.slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0F1D38] to-[#0A1326] border border-cyan-900/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span className="font-semibold">SAAS CAPABILITY DEMO</span>
            <span className="text-slate-600">·</span>
            <span>MULTI-INDUSTRY INBOUND AUTOMATION</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            Turn Every Enquiry Into an Opportunity
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Explore how modern AI orchestration qualifies inbound patient, diner, member, and salon requests in seconds—routing actionable leads straight to staff before prospects slip away.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={guidedTour.startTour}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Start 6-Step Interactive Walkthrough</span>
            </button>

            <button
              onClick={() => setActiveTab('impact')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs sm:text-sm rounded-lg transition-colors"
            >
              <span>Calculate Custom ROI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Background decorative contour */}
        <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Illustrative KPI Strip */}
      <section aria-label="Illustrative metrics">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Simulated Benchmark Indicators (Sample Data)
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">
            *ILLUSTRATIVE SAMPLE VALUES ONLY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Simulated Enquiries</span>
              <MessageSquare className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
                1,420
              </span>
              <span className="text-xs text-emerald-400 font-mono">+18% sample</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 leading-snug">
              Inbound questions, trial requests, and consultation forms processed.
            </p>
          </div>

          <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Instant Response Rate</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
                98.4%
              </span>
              <span className="text-xs text-cyan-300 font-mono">&lt; 15s avg</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 leading-snug">
              Enquiries answered with accurate business hours, services, and policies.
            </p>
          </div>

          <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Follow-Up Completion</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
                94.2%
              </span>
              <span className="text-xs text-emerald-400 font-mono">0 dropped</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 leading-snug">
              Structured task handoffs logged to front-desk staff before close of business.
            </p>
          </div>

          <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Est. Staff Hours Saved</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
                312 hrs
              </span>
              <span className="text-xs text-cyan-400 font-mono">per month</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 leading-snug">
              Eliminated manual repetitive telephone triage and back-and-forth email tagging.
            </p>
          </div>
        </div>
      </section>

      {/* Four Industry Verticals Showcase */}
      <section aria-label="Target business verticals">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Tailored Automation Profiles
            </h2>
            <p className="text-xs text-slate-400">
              Select an industry to simulate customer conversations, enquiry forms, and qualification logic.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 hidden sm:inline">
            4 Tailored Blueprints
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Clinic Card */}
          <div className="bg-[#0B142A] border border-slate-800/90 hover:border-cyan-500/50 rounded-xl p-5 flex flex-col justify-between transition-all group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
                  Clinics
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  CarePoint Clinic
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  General checkups, insurance screening, non-emergency triage, and clinic hours inquiries.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Primary Flow:</span>
                  <span>Appointment Request</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Safety Guard:</span>
                  <span className="text-emerald-400">Non-Clinical Disclaimer</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleExploreCategory('clinics')}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-cyan-950/70 text-xs font-medium text-cyan-300 border border-slate-800 hover:border-cyan-700/60 rounded-lg transition-colors"
            >
              <span>Explore Clinic Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Restaurant Card */}
          <div className="bg-[#0B142A] border border-slate-800/90 hover:border-cyan-500/50 rounded-xl p-5 flex flex-col justify-between transition-all group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
                  Restaurants
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Urban Table
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  Table reservations, dietary questions, opening hours, and banquet bookings for large parties.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Primary Flow:</span>
                  <span>Table Reservation</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Rules Engine:</span>
                  <span className="text-cyan-300">Party Size Triage</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleExploreCategory('restaurants')}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-cyan-950/70 text-xs font-medium text-cyan-300 border border-slate-800 hover:border-cyan-700/60 rounded-lg transition-colors"
            >
              <span>Explore Restaurant Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Gym Card */}
          <div className="bg-[#0B142A] border border-slate-800/90 hover:border-cyan-500/50 rounded-xl p-5 flex flex-col justify-between transition-all group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
                  Gyms & Fitness
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  FitCore Studio
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  3-day trial passes, class schedules, membership terms, and coach movement screen consults.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Primary Flow:</span>
                  <span>Free Trial Pass Lead</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Handoff:</span>
                  <span className="text-cyan-300">Coach Allocation</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleExploreCategory('gyms')}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-cyan-950/70 text-xs font-medium text-cyan-300 border border-slate-800 hover:border-cyan-700/60 rounded-lg transition-colors"
            >
              <span>Explore Gym Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Salon Card */}
          <div className="bg-[#0B142A] border border-slate-800/90 hover:border-cyan-500/50 rounded-xl p-5 flex flex-col justify-between transition-all group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Sparkle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
                  Salons & Spas
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Glow & Co. Salon
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  Balayage color consultation, stylist matching, service pricing, and appointment windows.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Primary Flow:</span>
                  <span>Stylist Consultation</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Rule Engine:</span>
                  <span className="text-cyan-300">Patch Test Advisory</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleExploreCategory('salons')}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-cyan-950/70 text-xs font-medium text-cyan-300 border border-slate-800 hover:border-cyan-700/60 rounded-lg transition-colors"
            >
              <span>Explore Salon Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Activity Chart & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Activity Chart (2 cols) */}
        <section
          className="lg:col-span-2 bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 space-y-4"
          aria-label="Fictional enquiry activity chart"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-base font-bold text-white">
                Fictional Inbound Enquiry Volume
              </h2>
              <p className="text-xs text-slate-400">
                Simulated daily traffic across all 4 demo verticals.
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-lg border border-slate-800">
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  timeRange === '7d'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setTimeRange('14d')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  timeRange === '14d'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Last 14 Days
              </button>
            </div>
          </div>

          {/* SVG Bar Chart with Hover Tooltip */}
          <div className="pt-4">
            <div className="h-52 w-full flex items-end justify-between gap-1.5 sm:gap-2 px-1 relative">
              {displayData.map((d, index) => {
                const heightPercent = Math.max(15, Math.round((d.total / maxTotal) * 100));
                const isHovered = hoveredDataPoint?.date === d.date;

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    onMouseEnter={() => setHoveredDataPoint(d)}
                    onMouseLeave={() => setHoveredDataPoint(null)}
                  >
                    <div className="w-full flex flex-col items-center h-full justify-end relative">
                      {/* Bar columns */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-sm transition-all duration-200 relative ${
                          isHovered
                            ? 'bg-cyan-300 shadow-lg shadow-cyan-500/30'
                            : 'bg-gradient-to-t from-blue-700/60 to-cyan-500/80 hover:to-cyan-400'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-2 truncate max-w-[40px] text-center">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Hover Data Info Box */}
            <div className="mt-4 p-3 bg-slate-900/90 border border-slate-800 rounded-lg flex items-center justify-between text-xs flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-300 font-medium">
                  {hoveredDataPoint
                    ? `${hoveredDataPoint.day}, ${hoveredDataPoint.date}`
                    : 'Hover over any day bar above'}
                </span>
              </div>

              {hoveredDataPoint ? (
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-white font-semibold tabular-nums">
                    Total: {hoveredDataPoint.total}
                  </span>
                  <span className="text-cyan-300 tabular-nums">Clinics: {hoveredDataPoint.clinics}</span>
                  <span className="text-blue-300 tabular-nums">Restaurants: {hoveredDataPoint.restaurants}</span>
                  <span className="text-sky-300 tabular-nums">Gyms: {hoveredDataPoint.gyms}</span>
                  <span className="text-teal-300 tabular-nums">Salons: {hoveredDataPoint.salons}</span>
                </div>
              ) : (
                <span className="text-slate-400 font-mono text-[11px]">
                  Simulated aggregated volume
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Recent Demo Enquiries (1 col) */}
        <section
          className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 space-y-4 flex flex-col justify-between"
          aria-label="Recent captured leads preview"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-bold text-white">Recent Pipeline Leads</h2>
                <p className="text-xs text-slate-400">Captured in current session</p>
              </div>
              <button
                onClick={() => setActiveTab('pipeline')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <span>View All ({leads.length})</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {recentLeads.map((lead) => {
                const isNew = lead.status === 'New';
                const isContact = lead.status === 'Contact Required';

                return (
                  <div
                    key={lead.id}
                    onClick={() => {
                      setSelectedLeadForDetail(lead);
                      setActiveTab('pipeline');
                    }}
                    className="p-3 bg-slate-900/60 hover:bg-slate-850 border border-slate-800/80 rounded-lg cursor-pointer transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white group-hover:text-cyan-300 truncate">
                          {lead.leadName}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {lead.requestedService}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap ${
                          isNew
                            ? 'bg-blue-950 text-cyan-300 border border-cyan-800/60'
                            : isContact
                            ? 'bg-amber-950/70 text-amber-300 border border-amber-800/50'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span className="capitalize">{lead.category}</span>
                      <span>{lead.enquiryDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('pipeline')}
            className="w-full mt-4 py-2 text-center text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
          >
            Manage All {leads.length} Leads in Pipeline &rarr;
          </button>
        </section>
      </div>
    </div>
  );
};
