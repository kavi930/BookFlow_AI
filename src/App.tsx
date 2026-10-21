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
import { ToastContainer } from './components/common/Toast';
import { InterestModal } from './components/common/InterestModal';

function MainAppContent() {
  const { activeTab, setActiveTab, resetDemoData, setIsInterestModalOpen } = useDemo();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070C18] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Persistent Unobtrusive Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 2. Optional Guided Tour Bar */}
      <GuidedTourBar />

      {/* 3. Top Navigation Bar (Adheres to Top Bar Contract) */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-full">
          {activeTab === 'overview' && <OverviewView />}
          {activeTab === 'demos' && <BusinessDemosView />}
          {activeTab === 'assistant' && <AIAssistantView />}
          {activeTab === 'pipeline' && <LeadPipelineView />}
          {activeTab === 'workflows' && <AutomationWorkflowsView />}
          {activeTab === 'impact' && <BusinessImpactView />}
          {activeTab === 'about' && <AboutView />}

          {/* Clean Quiet Footer */}
          <footer className="mt-16 pt-6 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-400">BookFlow AI</span>
              <span className="text-slate-600">·</span>
              <span>Interactive Demonstration Sandbox</span>
              <span className="text-slate-600">·</span>
              <span className="font-mono text-cyan-400 text-[10px]">FICTIONAL DATA</span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <button
                onClick={() => setActiveTab('about')}
                className="hover:text-cyan-300 transition-colors"
              >
                About Platform
              </button>
              <button
                onClick={() => setIsInterestModalOpen(true)}
                className="hover:text-cyan-300 transition-colors"
              >
                Discuss Solution
              </button>
              <button
                onClick={resetDemoData}
                className="hover:text-cyan-300 transition-colors"
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
