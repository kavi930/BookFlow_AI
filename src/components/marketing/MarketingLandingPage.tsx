import React from 'react';
import { MarketingNavbar } from './MarketingNavbar';
import { HeroSection } from './HeroSection';
import { ClinicWalkthroughSection } from './ClinicWalkthroughSection';
import { IndustriesSection } from './IndustriesSection';
import { InteractiveWorkflowDemoSection } from './InteractiveWorkflowDemoSection';
import { DemoRequestSection } from './DemoRequestSection';
import { SampleAuditReportSection } from './SampleAuditReportSection';
import { HowItWorksSection } from './HowItWorksSection';
import { FaqSection } from './FaqSection';
import { FinalCtaSection } from './FinalCtaSection';
import { FooterSection } from './FooterSection';
import { BusinessCategory } from '../../types';

interface MarketingLandingPageProps {
  onOpenSandbox?: (category?: BusinessCategory) => void;
  onExploreFeature?: (featureId: string) => void;
}

export const MarketingLandingPage: React.FC<MarketingLandingPageProps> = ({
  onOpenSandbox,
  onExploreFeature
}) => {
  const handleScrollToAudit = () => {
    const el = document.getElementById('audit');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('fullName');
        input?.focus();
      }, 500);
    }
  };

  const handleScrollToSolutions = () => {
    const el = document.getElementById('interactive-demos') || document.getElementById('solutions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToIndustries = () => {
    const el = document.getElementById('industries');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectIndustry = (cat: BusinessCategory) => {
    if (onOpenSandbox) {
      onOpenSandbox(cat);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D1C] flex flex-col font-sans selection:bg-[#1E3A2F]/15 selection:text-[#1E3A2F]">
      {/* 1. Header and Navigation */}
      <MarketingNavbar
        onBookAuditClick={handleScrollToAudit}
        onOpenDashboard={() => onOpenSandbox?.()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Homepage Hero */}
        <HeroSection
          onExploreSolutions={handleScrollToSolutions}
          onBookAuditClick={handleScrollToAudit}
          onOpenDashboard={() => onOpenSandbox?.()}
        />

        {/* 3. Featured Video Walkthrough: Clinic Appointment Booking in 4 Steps */}
        <ClinicWalkthroughSection
          onBookAuditClick={handleScrollToAudit}
          onExploreWorkflows={handleScrollToIndustries}
        />

        {/* 4. Industry Solutions (4 Selectable Cards: Clinics, Restaurants, Gyms, Salons) */}
        <IndustriesSection
          onSelectIndustry={handleSelectIndustry}
          onBookAuditClick={handleScrollToAudit}
        />

        {/* 5. Interactive Workflow Demonstration (5-step guided cycle) */}
        <InteractiveWorkflowDemoSection />

        {/* 6. Free Automation Audit Lead Magnet */}
        <DemoRequestSection
          onSuccess={() => {}}
          onOpenDashboard={() => onOpenSandbox?.()}
        />

        {/* 7. Show the Deliverable: Illustrative Sample Audit Report */}
        <SampleAuditReportSection onBookAuditClick={handleScrollToAudit} />

        {/* 8. How It Works (3 Numbered Stages) */}
        <HowItWorksSection onBookAuditClick={handleScrollToAudit} />

        {/* 9. Trust and FAQ */}
        <FaqSection onBookAuditClick={handleScrollToAudit} />

        {/* 10. Final Conversion Section */}
        <FinalCtaSection
          onBookAuditClick={handleScrollToAudit}
          onOpenDashboard={() => onOpenSandbox?.()}
        />
      </main>

      {/* Footer */}
      <FooterSection
        onOpenDashboard={() => onOpenSandbox?.()}
      />
    </div>
  );
};
