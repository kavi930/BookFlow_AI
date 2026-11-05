import React from 'react';
import { Menu, X, Play, RotateCcw, MessageSquare } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { NavigationTab } from '../../types';

interface NavbarProps {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  onReturnToMarketing?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileMenu,
  isMobileMenuOpen,
  onReturnToMarketing
}) => {
  const {
    activeTab,
    setActiveTab,
    resetDemoData,
    guidedTour,
    setIsInterestModalOpen,
    openAgentWidget
  } = useDemo();

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md py-1 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-xs">
              B
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
              BookFlow_AI
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => handleNavClick('overview')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'overview'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleNavClick('demos')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'demos'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Business Demos
          </button>
          <button
            onClick={() => handleNavClick('assistant')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'assistant'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Assistant
          </button>
          <button
            onClick={() => handleNavClick('pipeline')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'pipeline'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lead Pipeline
          </button>
          <button
            onClick={() => handleNavClick('workflows')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'workflows'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Workflows
          </button>
          <button
            onClick={() => handleNavClick('impact')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'impact'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Business Impact
          </button>
          <button
            onClick={() => handleNavClick('inquiries')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'inquiries'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Inquiry Desk
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'about'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            About
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onReturnToMarketing && (
            <button
              onClick={onReturnToMarketing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
              title="Return to the BookFlow_AI Marketing Website"
            >
              <span>← Marketing Website</span>
            </button>
          )}

          {!guidedTour.isActive && (
            <button
              onClick={guidedTour.startTour}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Launch step-by-step interactive demo walkthrough"
            >
              <Play className="w-3 h-3 text-blue-600 fill-current" />
              <span>Explore Demo</span>
            </button>
          )}

          <button
            onClick={resetDemoData}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Reset demo leads and state"
            aria-label="Reset demo leads"
          >
            <RotateCcw className="w-3 h-3 text-slate-500" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          <button
            onClick={() => openAgentWidget('whatsapp')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
            title="Open Interactive WhatsApp or Voice Agent"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Chat / Call Agent</span>
          </button>

          <button
            onClick={() => setIsInterestModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-sm shadow-blue-500/25 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Discuss Solution</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-1.5 text-[#545E5A] hover:text-[#1A1D1C] hover:bg-[#F3EFE9] rounded-md"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
