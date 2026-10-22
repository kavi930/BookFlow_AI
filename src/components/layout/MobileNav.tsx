import React from 'react';
import {
  LayoutDashboard,
  Layers,
  Bot,
  Users,
  Workflow,
  TrendingUp,
  Info,
  X,
  Play,
  RotateCcw
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { NavigationTab } from '../../types';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, resetDemoData, guidedTour, setIsInterestModalOpen } = useDemo();

  if (!isOpen) return null;

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" />, desc: 'Summary & business models' },
    { id: 'demos', label: 'Business Demos', icon: <Layers className="w-4 h-4" />, desc: 'Interactive enquiry simulation' },
    { id: 'assistant', label: 'AI Assistant', icon: <Bot className="w-4 h-4" />, desc: 'Automated local response engine' },
    { id: 'pipeline', label: 'Lead Pipeline', icon: <Users className="w-4 h-4" />, desc: 'CRM lead tracking & status' },
    { id: 'workflows', label: 'Workflows', icon: <Workflow className="w-4 h-4" />, desc: 'Step-by-step automation flows' },
    { id: 'impact', label: 'Business Impact', icon: <TrendingUp className="w-4 h-4" />, desc: 'Interactive ROI & time savings' },
    { id: 'about', label: 'About BookFlow', icon: <Info className="w-4 h-4" />, desc: 'Philosophy & architecture' }
  ];

  const handleSelect = (tab: NavigationTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A1D1C]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF8F5] border-l border-[#E2DDD5] p-5 shadow-xl flex flex-col justify-between overflow-y-auto text-[#1A1D1C]">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E2DA]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#1E3A2F] flex items-center justify-center font-bold text-white text-xs">
                B
              </div>
              <span className="font-bold text-sm text-[#1A1D1C]">BookFlow AI</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#6E7B76] hover:text-[#1A1D1C]"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-4 space-y-1" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-[#EBF1EC] text-[#1E3A2F] font-semibold border border-[#CCDCD0]'
                      : 'text-[#48534F] hover:bg-[#F2EEE7] hover:text-[#1A1D1C]'
                  }`}
                >
                  <span className={isActive ? 'text-[#1E3A2F]' : 'text-[#7A8682]'}>{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">{item.label}</div>
                    <div className="text-[11px] text-[#717E79] truncate">{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#E7E2DA] space-y-2.5">
          <button
            onClick={() => {
              guidedTour.startTour();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#EBF1EC] border border-[#CCDCD0] text-xs font-semibold text-[#1E3A2F] hover:bg-[#DEE9E0] transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Walkthrough</span>
          </button>

          <button
            onClick={() => {
              resetDemoData();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#DDD6CB] text-xs font-medium text-[#56635F] hover:text-[#1A1D1C] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={() => {
              setIsInterestModalOpen(true);
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#2A4D3F] shadow-xs transition-all"
          >
            <span>Discuss Solution</span>
          </button>

          <p className="text-[10px] text-[#86928E] text-center pt-1 font-mono">
            LOCAL BROWSER DEMO
          </p>
        </div>
      </div>
    </div>
  );
};
