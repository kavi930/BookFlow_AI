import React, { useState } from 'react';
import { DemoProvider, useDemo } from './context/DemoContext';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { GuidedTourBar } from './components/layout/GuidedTourBar';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { OverviewView } from './components/overview/OverviewView';
import { BusinessDemosView } from './components/demos/BusinessDemosView';
import { AIAssistantView } from './components/assistant/AIAssistantView';
import { LeadPipelineView } from './components/pipeline/LeadPipelineView';
import { AutomationWorkflowsView } from './components/workflows/AutomationWorkflowsView';
import { BusinessImpactView } from './components/impact/BusinessImpactView';
import { AboutView } from './components/about/AboutView';
import { VisitorInquiryView } from './components/inquiry/VisitorInquiryView';
import { ToastContainer } from './components/common/Toast';
import { InterestModal } from './components/common/InterestModal';
import { InteractiveAgentWidget } from './components/agent/InteractiveAgentWidget';
import { MarketingLandingPage } from './components/marketing/MarketingLandingPage';
import { NavigationTab, BusinessCategory } from './types';

function MainAppContent() {
  const { activeTab, setActiveTab, setSelectedCategory, resetDemoData, setIsInterestModalOpen } = useDemo();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'marketing' | 'sandbox'>('marketing');

  const handleOpenSandbox = (category?: BusinessCategory, tab?: NavigationTab) => {
    setViewMode('sandbox');
    if (tab) setActiveTab(tab);
    else setActiveTab('demos');
    if (category) setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToMarketing = () => {
    setViewMode('marketing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreFeature = (featureId: string) => {
    setViewMode('sandbox');
    if (featureId === 'booking' || featureId === 'calendar') {
      setActiveTab('demos');
    } else if (featureId === 'whatsapp') {
      setActiveTab('assistant');
    } else if (featureId === 'followups') {
      setActiveTab('workflows');
    } else if (featureId === 'pipeline') {
      setActiveTab('pipeline');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'marketing') {
    return (
      <>
        <MarketingLandingPage
          onOpenSandbox={(category) => handleOpenSandbox(category, 'demos')}
          onExploreFeature={handleExploreFeature}
        />
        {/* Global Modals & Notifications */}
        <InterestModal />
        <ToastContainer />
        <InteractiveAgentWidget />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D1C] flex flex-col font-sans selection:bg-[#1E3A2F]/15 selection:text-[#1E3A2F]">
      {/* 1. Persistent Unobtrusive Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 2. Optional Guided Tour Bar */}
      <GuidedTourBar />

      {/* 3. Top Navigation Bar */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onReturnToMarketing={handleReturnToMarketing}
      />

      {/* 4. Mobile Drawer Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* 5. Main Body with Sidebar & Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <Sidebar />

        {/* Primary Viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-full bg-[#FAF8F5]">
          {activeTab === 'overview' && <OverviewView />}
          {activeTab === 'demos' && <BusinessDemosView />}
          {activeTab === 'assistant' && <AIAssistantView />}
          {activeTab === 'pipeline' && <LeadPipelineView />}
          {activeTab === 'workflows' && <AutomationWorkflowsView />}
          {activeTab === 'impact' && <BusinessImpactView />}
          {activeTab === 'inquiries' && <VisitorInquiryView />}
          {activeTab === 'about' && <AboutView />}

          {/* Clean Quiet Footer */}
          <footer className="mt-16 pt-6 border-t border-[#E7E2DA] text-xs text-[#6C7A75] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#1A1D1C]">FlowPilot AI</span>
              <span className="text-[#C6BEB2]">·</span>
              <span>Local Demonstration Sandbox</span>
              <span className="text-[#C6BEB2]">·</span>
              <span className="font-mono text-[#2D5A43] text-[10px]">FICTIONAL DATA</span>
            </div>

            <div className="flex items-center gap-4 text-[#55635F]">
              <button
                onClick={handleReturnToMarketing}
                className="hover:text-[#1E3A2F] transition-colors font-medium cursor-pointer"
              >
                Marketing Website
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className="hover:text-[#1E3A2F] transition-colors cursor-pointer"
              >
                About Platform
              </button>
              <button
                onClick={() => setIsInterestModalOpen(true)}
                className="hover:text-[#1E3A2F] transition-colors cursor-pointer"
              >
                Discuss Solution
              </button>
              <button
                onClick={resetDemoData}
                className="hover:text-[#1E3A2F] transition-colors cursor-pointer"
              >
                Reset Demo
              </button>
            </div>
          </footer>
        </main>
      </div>

      {/* Global Interactive Elements */}
      <InterestModal />
      <ToastContainer />
      <InteractiveAgentWidget />
    </div>
  );
}

export default function App() {
  return (
    <DemoProvider>
      <MainAppContent />
    </DemoProvider>
  );
}
