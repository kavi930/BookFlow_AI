import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface MarketingNavbarProps {
  onBookAuditClick: () => void;
  onOpenDashboard?: () => void;
  onOpenAbout?: () => void;
}

export const MarketingNavbar: React.FC<MarketingNavbarProps> = ({
  onBookAuditClick,
  onOpenDashboard,
  onOpenAbout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === 'about' && onOpenAbout) {
      onOpenAbout();
      return;
    }
    let targetId = id;
    if (id === 'solutions') targetId = 'industries';
    if (id === 'walkthrough') targetId = 'clinic-walkthrough';

    const element = document.getElementById(targetId) || document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80'
          : 'bg-white border-b border-slate-200/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand Logo & Wordmark (Left) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg py-1 cursor-pointer"
          >
            {/* BookFlow_AI geometric icon in eye-catching gradient royal blue */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-center font-bold text-base shadow-sm shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <span className="tracking-tighter">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                BookFlow<span className="text-blue-600 font-extrabold">_AI</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 -mt-1 hidden sm:block">
                Intelligent Workflows
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Links: Solutions, How It Works, Live Demo, Free Automation Audit */}
        <nav
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600"
          aria-label="Main Navigation"
        >
          <button
            type="button"
            onClick={() => scrollTo('solutions')}
            className="hover:text-blue-600 transition-colors cursor-pointer py-1"
          >
            Solutions
          </button>
          <button
            type="button"
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-blue-600 transition-colors cursor-pointer py-1"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => scrollTo('walkthrough')}
            className="hover:text-blue-600 transition-colors cursor-pointer py-1 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-800 hover:text-blue-600">Live Demo</span>
          </button>
          <button
            type="button"
            onClick={() => scrollTo('audit')}
            className="hover:text-blue-600 transition-colors cursor-pointer py-1"
          >
            Free Automation Audit
          </button>
        </nav>

        {/* Actions: Secondary Dashboard/Login + Primary "Get My Free Audit" CTA (Right) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {onOpenDashboard && (
            <button
              type="button"
              onClick={onOpenDashboard}
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Open the interactive operations workspace"
            >
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Dashboard</span>
            </button>
          )}

          <button
            type="button"
            onClick={onBookAuditClick}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-blue-500/25 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 flex items-center gap-2 group"
          >
            <span>Get My Free Audit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-1 text-sm font-medium text-slate-700">
            <button
              type="button"
              onClick={() => scrollTo('solutions')}
              className="text-left py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-blue-600"
            >
              Solutions
            </button>
            <button
              type="button"
              onClick={() => scrollTo('how-it-works')}
              className="text-left py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-blue-600"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => scrollTo('walkthrough')}
              className="text-left py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 flex items-center justify-between"
            >
              <span>Live Demo</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo('audit')}
              className="text-left py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-blue-600"
            >
              Free Automation Audit
            </button>
          </nav>

          <div className="pt-2 flex flex-col gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookAuditClick();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold text-center shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get My Free Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenDashboard && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-sm font-medium text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Open Dashboard</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
