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
    { id: 'demos', label: 'Business Demos', icon: <Layers className="w-4 h-4" />, badge: '4 Trades' },
    { id: 'assistant', label: 'AI Assistant', icon: <Bot className="w-4 h-4" />, badge: 'Local Q&A' },
    { id: 'pipeline', label: 'Lead Pipeline', icon: <Users className="w-4 h-4" />, badge: `${newLeadsCount} active` },
    { id: 'workflows', label: 'Workflows', icon: <Workflow className="w-4 h-4" /> },
    { id: 'impact', label: 'Business Impact', icon: <TrendingUp className="w-4 h-4" />, badge: 'ROI Calc' },
    { id: 'about', label: 'About BookFlow', icon: <Info className="w-4 h-4" /> }
  ];

  return (
    <aside
      className="hidden lg:flex flex-col justify-between w-64 bg-[#F5F2EB] border-r border-[#E5E0D6] p-4 shrink-0 text-[#1A1D1C]"
      aria-label="Sidebar Navigation"
    >
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#737E7A] px-3 font-semibold">
            Navigation
          </span>
          <nav className="mt-2 space-y-1" aria-label="Desktop Sidebar Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-white text-[#1E3A2F] font-semibold border border-[#D8D2C5] shadow-xs'
                      : 'text-[#55605C] hover:text-[#1A1D1C] hover:bg-[#EAE5DC]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={isActive ? 'text-[#1E3A2F]' : 'text-[#7A8682] group-hover:text-[#1A1D1C]'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#EBF1EC] text-[#1E3A2F] border border-[#CCDCD0]'
                          : 'bg-[#E5DFD4] text-[#5A6662] group-hover:text-[#1A1D1C]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight
                      className={`w-3 h-3 transition-opacity ${
                        isActive ? 'opacity-100 text-[#1E3A2F]' : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Business Categories Quick Switch */}
        <div className="pt-2 border-t border-[#E5E0D6]">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#737E7A] font-semibold">
              Verticals
            </span>
            <span className="text-[10px] text-[#7A8682]">4 Profiles</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 px-1 text-xs">
            <button
              onClick={() => setActiveTab('demos')}
              className="px-2.5 py-2 rounded-md bg-white hover:bg-[#EAE5DC] border border-[#E0DACF] text-left text-[#3D4744] hover:text-[#1A1D1C] transition-colors"
            >
              <div className="text-[11px] font-medium text-[#1E3A2F]">Clinics</div>
              <div className="text-[10px] text-[#727D79]">CarePoint</div>
            </button>
            <button
              onClick={() => setActiveTab('demos')}
              className="px-2.5 py-2 rounded-md bg-white hover:bg-[#EAE5DC] border border-[#E0DACF] text-left text-[#3D4744] hover:text-[#1A1D1C] transition-colors"
            >
              <div className="text-[11px] font-medium text-[#1E3A2F]">Restaurants</div>
              <div className="text-[10px] text-[#727D79]">Urban Table</div>
            </button>
            <button
              onClick={() => setActiveTab('demos')}
              className="px-2.5 py-2 rounded-md bg-white hover:bg-[#EAE5DC] border border-[#E0DACF] text-left text-[#3D4744] hover:text-[#1A1D1C] transition-colors"
            >
              <div className="text-[11px] font-medium text-[#1E3A2F]">Gyms</div>
              <div className="text-[10px] text-[#727D79]">FitCore</div>
            </button>
            <button
              onClick={() => setActiveTab('demos')}
              className="px-2.5 py-2 rounded-md bg-white hover:bg-[#EAE5DC] border border-[#E0DACF] text-left text-[#3D4744] hover:text-[#1A1D1C] transition-colors"
            >
              <div className="text-[11px] font-medium text-[#1E3A2F]">Salons</div>
              <div className="text-[10px] text-[#727D79]">Glow & Co.</div>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Footer Info */}
      <div className="pt-4 border-t border-[#E5E0D6] space-y-3">
        <div className="bg-white border border-[#E0D9CD] rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3A2F] mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A43]" />
            <span>Local Evaluation</span>
          </div>
          <p className="text-[11px] text-[#586460] leading-relaxed">
            Zero external tracking. Client state stored locally in browser session.
          </p>
        </div>

        <div className="text-[10px] text-[#75817D] flex items-center justify-between px-1 font-mono">
          <span>BookFlow AI</span>
          <span className="text-[#2D5A43] font-semibold">LOCAL DEMO</span>
        </div>
      </div>
    </aside>
  );
};
