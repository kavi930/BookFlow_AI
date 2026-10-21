import React from 'react';
import { Menu, X, Play, RotateCcw, MessageSquarePlus } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { NavigationTab } from '../../types';

interface NavbarProps {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const { activeTab, setActiveTab, resetDemoData, guidedTour, setIsInterestModalOpen } = useDemo();

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
  };

  return (
    <header className="bg-[#080E1C] border-b border-slate-800/80 sticky top-0 z-20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-2 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md py-1"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-sm shadow-sm shadow-cyan-500/20">
              B
            </div>
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              BookFlow<span className="text-cyan-400 font-semibold">AI</span>
            </span>
          </button>

          <span className="hidden xl:inline text-xs text-slate-500 pl-2 border-l border-slate-800">
            Turn Every Enquiry Into an Opportunity
          </span>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => handleNavClick('overview')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'overview'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleNavClick('demos')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'demos'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Business Demos
          </button>
          <button
            onClick={() => handleNavClick('assistant')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'assistant'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            AI Assistant
          </button>
          <button
            onClick={() => handleNavClick('pipeline')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'pipeline'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Lead Pipeline
          </button>
          <button
            onClick={() => handleNavClick('workflows')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'workflows'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Workflows
          </button>
          <button
            onClick={() => handleNavClick('impact')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'impact'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Business Impact
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'about'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            About
          </button>
        </nav>

        {/* Zone 3: Primary action + secondary controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {!guidedTour.isActive && (
            <button
              onClick={guidedTour.startTour}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 rounded-md transition-colors whitespace-nowrap shrink-0"
              title="Launch step-by-step interactive demo walkthrough"
            >
              <Play className="w-3 h-3 text-cyan-400" />
              <span>Explore Demo</span>
            </button>
          )}

          <button
            onClick={resetDemoData}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 border border-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0"
            title="Reset demo leads and state"
            aria-label="Reset demo leads"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          <button
            onClick={() => setIsInterestModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-md shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-slate-950" />
            <span>Discuss Solution</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
