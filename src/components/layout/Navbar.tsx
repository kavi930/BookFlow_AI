import React from 'react';
import { Menu, X, Play, RotateCcw, MessageSquare } from 'lucide-react';
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
    <header className="bg-white border-b border-[#E7E2DA] sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F] rounded-md py-1"
          >
            <div className="w-7 h-7 rounded-md bg-[#1E3A2F] flex items-center justify-center font-bold text-white text-xs">
              B
            </div>
            <span className="text-base font-bold tracking-tight text-[#1A1D1C] whitespace-nowrap">
              BookFlow <span className="text-[#2D5A43] font-medium text-xs ml-0.5">AI</span>
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#4D5552]"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => handleNavClick('overview')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'overview'
                ? 'text-[#1E3A2F] font-semibold border-b-2 border-[#1E3A2F]'
                : 'text-[#505A56] hover:text-[#1A1D1C]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleNavClick('demos')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'demos'
                ? 'text-[#1E3A2F] font-semibold border-b-2 border-[#1E3A2F]'
                : 'text-[#505A56] hover:text-[#1A1D1C]'
            }`}
          >
            Business Demos
          </button>
          <button
            onClick={() => handleNavClick('assistant')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'assistant'
                ? 'text-[#1E3A2F] font-semibold border-b-2 border-[#1E3A2F]'
                : 'text-[#505A56] hover:text-[#1A1D1C]'
            }`}
          >
            AI Assistant
          </button>
          <button
            onClick={() => handleNavClick('pipeline')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'pipeline'
                ? 'text-[#1E3A2F] font-semibold border-b-2 border-[#1E3A2F]'
                : 'text-[#505A56] hover:text-[#1A1D1C]'
            }`}
          >
            Lead Pipeline
          </button>
          <button
            onClick={() => handleNavClick('workflows')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'workflows'
                ? 'text-[#1E3A2F] font-semibold border-b-2 border-[#1E3A2F]'
                : 'text-[#505A56] hover:text-[#1A1D1C]'
            }`}
          >
            Workflows
          </button>
          <button
            onClick={() => handleNavClick('impact')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'impact'
                ? 'text-[#1E3A2F] font-semibold border-b-2 border-[#1E3A2F]'
                : 'text-[#505A56] hover:text-[#1A1D1C]'
            }`}
          >
            Business Impact
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'about'
                ? 'text-[#1E3A2F] font-semibold border-b-2 border-[#1E3A2F]'
                : 'text-[#505A56] hover:text-[#1A1D1C]'
            }`}
          >
            About
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {!guidedTour.isActive && (
            <button
              onClick={guidedTour.startTour}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2D5A43] bg-[#EBF1EC] hover:bg-[#DEE9E0] border border-[#CCDCD0] rounded-md transition-colors whitespace-nowrap shrink-0"
              title="Launch step-by-step interactive demo walkthrough"
            >
              <Play className="w-3 h-3 text-[#2D5A43] fill-current" />
              <span>Explore Demo</span>
            </button>
          )}

          <button
            onClick={resetDemoData}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#5C6662] hover:text-[#1A1D1C] hover:bg-[#F3EFE9] border border-[#E0D9CD] rounded-md transition-colors whitespace-nowrap shrink-0"
            title="Reset demo leads and state"
            aria-label="Reset demo leads"
          >
            <RotateCcw className="w-3 h-3 text-[#77827E]" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          <button
            onClick={() => setIsInterestModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1E3A2F] hover:bg-[#274E3F] rounded-md shadow-xs transition-all whitespace-nowrap shrink-0"
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
