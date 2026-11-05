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
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { NavigationTab } from '../../types';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, leads, inquiries } = useDemo();

  const newLeadsCount = leads.filter((l) => l.status === 'New' || l.status === 'Contact Required').length;

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'demos', label: 'Business Demos', icon: <Layers className="w-4 h-4" />, badge: '4 Trades' },
    { id: 'assistant', label: 'AI Assistant', icon: <Bot className="w-4 h-4" />, badge: 'Local Q&A' },
    { id: 'pipeline', label: 'Lead Pipeline', icon: <Users className="w-4 h-4" />, badge: `${newLeadsCount} active` },
    { id: 'workflows', label: 'Workflows', icon: <Workflow className="w-4 h-4" /> },
    { id: 'impact', label: 'Business Impact', icon: <TrendingUp className="w-4 h-4" />, badge: 'ROI Calc' },
    { id: 'inquiries', label: 'Inquiry Desk', icon: <HelpCircle className="w-4 h-4" />, badge: `${inquiries.length} tickets` },
    { id: 'about', label: 'About BookFlow_AI', icon: <Info className="w-4 h-4" /> }
  ];


  return (
    <aside
      className="hidden lg:flex flex-col justify-between w-64 bg-slate-50 border-r border-slate-200 p-4 shrink-0 text-slate-900"
      aria-label="Sidebar Navigation"
    >
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-mono tracking-wider uppercase text-slate-500 px-3 font-semibold">
            Navigation
          </span>
          <nav className="mt-2 space-y-1" aria-label="Desktop Sidebar Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-white text-blue-700 font-semibold border border-blue-200/80 shadow-xs ring-1 ring-blue-500/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-800'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-200/60 text-slate-600 group-hover:text-slate-900'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight
                      className={`w-3 h-3 transition-opacity ${
                        isActive ? 'opacity-100 text-blue-600' : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Business Categories Quick Switch */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[11px] font-mono tracking-wider uppercase text-slate-500 font-semibold">
              Verticals
            </span>
            <span className="text-[10px] text-slate-400">4 Profiles</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 px-1 text-xs">
            <button
              onClick={() => setActiveTab('demos')}
              className="px-2.5 py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-left text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
            >
              <div className="text-[11px] font-semibold text-blue-700">Clinics</div>
              <div className="text-[10px] text-slate-500">CarePoint</div>
            </button>
            <button
              onClick={() => setActiveTab('demos')}
              className="px-2.5 py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-left text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
            >
              <div className="text-[11px] font-semibold text-blue-700">Restaurants</div>
              <div className="text-[10px] text-slate-500">Urban Table</div>
            </button>
            <button
              onClick={() => setActiveTab('demos')}
              className="px-2.5 py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-left text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
            >
              <div className="text-[11px] font-semibold text-blue-700">Gyms</div>
              <div className="text-[10px] text-slate-500">FitCore</div>
            </button>
            <button
              onClick={() => setActiveTab('demos')}
              className="px-2.5 py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-left text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
            >
              <div className="text-[11px] font-semibold text-blue-700">Salons</div>
              <div className="text-[10px] text-slate-500">Glow & Co.</div>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Footer Info */}
      <div className="pt-4 border-t border-slate-200 space-y-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Local Evaluation</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Zero external tracking. Client state stored locally in browser session.
          </p>
        </div>

        <div className="text-[10px] text-slate-500 flex items-center justify-between px-1 font-mono">
          <span>BookFlow_AI</span>
          <span className="text-blue-600 font-semibold">LOCAL DEMO</span>
        </div>
      </div>
    </aside>
  );
};
