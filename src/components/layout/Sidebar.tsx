import React from 'react';
import {
  LayoutDashboard,
  Layers,
  Bot,
  Users,
  Workflow,
  TrendingUp,
  Info,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { NavigationTab } from '../../types';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, leads } = useDemo();

  const newLeadsCount = leads.filter((l) => l.status === 'New' || l.status === 'Contact Required').length;

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'demos', label: 'Business Demos', icon: <Layers className="w-4 h-4" />, badge: '4 Industries' },
    { id: 'assistant', label: 'AI Assistant', icon: <Bot className="w-4 h-4" />, badge: 'Live Test' },
    { id: 'pipeline', label: 'Lead Pipeline', icon: <Users className="w-4 h-4" />, badge: `${newLeadsCount} active` },
    { id: 'workflows', label: 'Workflows', icon: <Workflow className="w-4 h-4" /> },
    { id: 'impact', label: 'Business Impact', icon: <TrendingUp className="w-4 h-4" />, badge: 'ROI Calc' },
    { id: 'about', label: 'About BookFlow', icon: <Info className="w-4 h-4" /> }
  ];

  return (
    <aside
      className="hidden lg:flex flex-col justify-between w-64 bg-[#091122] border-r border-slate-800/80 p-4 shrink-0"
      aria-label="Sidebar Navigation"
    >
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400 px-3">
            Navigation
          </span>
          <nav className="mt-2 space-y-1" aria-label="Desktop Sidebar Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 font-semibold border border-cyan-500/25 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-700/50'
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight
                      className={`w-3 h-3 transition-opacity ${
                        isActive ? 'opacity-100 text-cyan-400' : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Business Categories Quick Switch */}
        <div className="pt-2">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
              Target Verticals
            </span>
            <span className="text-[10px] text-slate-400">4 Demos</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 px-1 text-xs">
            <button
              onClick={() => {
                setActiveTab('demos');
              }}
              className="px-2.5 py-2 rounded-md bg-slate-900/60 hover:bg-slate-850 border border-slate-800/80 text-left text-slate-300 hover:text-white transition-colors"
            >
              <div className="text-[11px] font-medium">Clinics</div>
              <div className="text-[10px] text-slate-400">CarePoint</div>
            </button>
            <button
              onClick={() => {
                setActiveTab('demos');
              }}
              className="px-2.5 py-2 rounded-md bg-slate-900/60 hover:bg-slate-850 border border-slate-800/80 text-left text-slate-300 hover:text-white transition-colors"
            >
              <div className="text-[11px] font-medium">Restaurants</div>
              <div className="text-[10px] text-slate-400">Urban Table</div>
            </button>
            <button
              onClick={() => {
                setActiveTab('demos');
              }}
              className="px-2.5 py-2 rounded-md bg-slate-900/60 hover:bg-slate-850 border border-slate-800/80 text-left text-slate-300 hover:text-white transition-colors"
            >
              <div className="text-[11px] font-medium">Gyms</div>
              <div className="text-[10px] text-slate-400">FitCore Studio</div>
            </button>
            <button
              onClick={() => {
                setActiveTab('demos');
              }}
              className="px-2.5 py-2 rounded-md bg-slate-900/60 hover:bg-slate-850 border border-slate-800/80 text-left text-slate-300 hover:text-white transition-colors"
            >
              <div className="text-[11px] font-medium">Salons</div>
              <div className="text-[10px] text-slate-400">Glow & Co.</div>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Footer Info */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <div className="bg-[#0C162E] border border-cyan-900/30 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sandbox Protocol</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Zero external network calls. Fictional local state storage only.
          </p>
        </div>

        <div className="text-[10px] text-slate-400 flex items-center justify-between px-1">
          <span>BookFlow AI v1.0</span>
          <span className="font-mono text-cyan-400">DEMO MODE</span>
        </div>
      </div>
    </aside>
  );
};
