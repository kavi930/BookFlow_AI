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
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" />, desc: 'Dashboard metrics & business cards' },
    { id: 'demos', label: 'Business Demos', icon: <Layers className="w-4 h-4" />, desc: 'Interactive enquiry simulation' },
    { id: 'assistant', label: 'AI Assistant', icon: <Bot className="w-4 h-4" />, desc: 'Sample automated Q&A responses' },
    { id: 'pipeline', label: 'Lead Pipeline', icon: <Users className="w-4 h-4" />, desc: 'CRM lead tracking & status' },
    { id: 'workflows', label: 'Workflows', icon: <Workflow className="w-4 h-4" />, desc: 'Step-by-step automation flows' },
    { id: 'impact', label: 'Business Impact', icon: <TrendingUp className="w-4 h-4" />, desc: 'Interactive ROI & time savings' },
    { id: 'about', label: 'About BookFlow', icon: <Info className="w-4 h-4" />, desc: 'Platform principles & solution inquiry' }
  ];

  const handleSelect = (tab: NavigationTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#0A1329] border-l border-slate-800 p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-xs">
                B
              </div>
              <span className="font-bold text-sm text-white">BookFlow AI</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white"
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
                      ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-850 hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">{item.label}</div>
                    <div className="text-[11px] text-slate-500 truncate">{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800/80 space-y-2.5">
          <button
            onClick={() => {
              guidedTour.startTour();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-cyan-950/70 border border-cyan-700/50 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/60 transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Launch Guided Walkthrough</span>
          </button>

          <button
            onClick={() => {
              resetDemoData();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={() => {
              setIsInterestModalOpen(true);
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 text-xs font-bold shadow transition-all"
          >
            <span>Discuss Solution (Demo)</span>
          </button>

          <p className="text-[10px] text-slate-500 text-center pt-1 font-mono">
            FICTIONAL CLIENT DEMO
          </p>
        </div>
      </div>
    </div>
  );
};
