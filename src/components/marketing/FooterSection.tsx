import React, { useState } from 'react';
import {
  FileText,
  X,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface FooterSectionProps {
  onOpenAbout?: () => void;
  onOpenDashboard?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenAbout,
  onOpenDashboard
}) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollTo = (id: string) => {
    if (id === 'about' && onOpenAbout) {
      onOpenAbout();
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">
                <span>B</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                BookFlow<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">_AI</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Turn customer enquiries into organised workflows. Automate enquiries, appointments, follow-ups, and scheduling with human supervision. Built for Indian businesses.
            </p>

            <div className="pt-2 flex items-center gap-2 text-slate-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Operations Workflow Platform · INR Pricing · 100% Secure</span>
            </div>
          </div>

          {/* Navigation Links Column (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-xs block">
              Quick Navigation
            </span>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('home')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('solutions')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Solutions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('industries')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Industries & Verticals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('how-it-works')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('walkthrough')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Clinic Walkthrough
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('audit')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Free Automation Audit
                </button>
              </li>
              {onOpenDashboard && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenDashboard}
                    className="hover:text-blue-300 text-blue-400 transition-colors cursor-pointer flex items-center gap-1 font-medium"
                  >
                    <span>Operations Dashboard</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Solutions Column (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-xs block">
              Industries
            </span>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('industries')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Clinics & Healthcare
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('industries')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Restaurants & Dining
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('industries')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Gyms & Fitness
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('industries')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Salons & Beauty
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Legal Column (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-xs block">
              Contact & Location
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have questions about your operations or custom integrations in India?
            </p>

            <div className="space-y-2 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-mono text-white">hello@bookflow.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-white">+91 80 4920 1800</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="text-slate-400">Indiranagar, Bengaluru, Karnataka 560038</span>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3 text-xs">
              <button
                type="button"
                onClick={() => setModalType('privacy')}
                className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer text-slate-400"
              >
                Privacy Policy
              </button>
              <span className="text-slate-600">·</span>
              <button
                type="button"
                onClick={() => setModalType('terms')}
                className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer text-slate-400"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 BookFlow_AI. All rights reserved. Intelligent operations workflow platform.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Simulated Evaluation Mode · All demo data clearly labeled</span>
          </div>
        </div>
      </div>

      {/* Privacy / Terms Modal Dialog */}
      {modalType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white text-slate-900 border border-slate-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  {modalType === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-800 font-semibold">
                NOTICE: This document governs the BookFlow_AI evaluation platform and operational blueprints.
              </div>

              {modalType === 'privacy' ? (
                <>
                  <p>
                    <strong>Data Protection & Integrity:</strong> BookFlow_AI respects client confidential operational data. All customer inquiries, appointment requests, and contact submissions provided during demonstration evaluation are kept strictly private.
                  </p>
                  <p>
                    <strong>No Third-Party Reselling:</strong> We do not sell or monetize personal or business data. Production deployments use dedicated, customer-controlled database endpoints.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Service Scope:</strong> BookFlow_AI provides software workflow automation and diagnostic evaluation tools. All demo data shown is illustrative for workflow mapping.
                  </p>
                  <p>
                    <strong>Human Supervision:</strong> Automated appointments and communication workflows maintain human supervisor control checkpoints.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-xs hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
