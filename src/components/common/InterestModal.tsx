import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const InterestModal: React.FC = () => {
  const { isInterestModalOpen, setIsInterestModalOpen, addToast } = useDemo();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    industry: 'clinics',
    monthlyInquiries: '100–300',
    primaryGoal: 'Automating after-hours customer inquiries'
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isInterestModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast({
      title: 'Consultation Inquiry Logged (Demo)',
      message: `Demo interest recorded for ${formData.businessName || 'your business'}. No external email sent.`,
      type: 'success'
    });
  };

  const handleClose = () => {
    setIsInterestModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative bg-[#0A1329] border border-cyan-500/30 rounded-xl shadow-2xl max-w-lg w-full p-6 text-slate-100 z-10">
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>CUSTOM AUTOMATION ARCHITECTURE</span>
            </div>
            <h2 id="modal-title" className="text-lg font-bold text-white">
              Discuss an Automation Solution
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800/80 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Demonstration Inquiry Recorded
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                In a live deployment, this enquiry would automatically generate a client onboarding dossier and notify your automation architect via Slack or CRM webhook.
              </p>
            </div>
            <div className="p-3 bg-cyan-950/40 border border-cyan-800/40 rounded-lg text-xs text-cyan-300 max-w-sm mx-auto">
              Notice: This is a client-side simulation. No personal contact data was submitted over the internet.
            </div>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-md text-xs transition-colors"
            >
              Back to Demo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            <div className="bg-amber-950/30 border border-amber-600/30 rounded-lg p-2.5 text-xs text-amber-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <p className="leading-snug">
                This is a local demonstration form. Submitting will not contact BookFlow AI or send any real external emails or webhook events.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Miller"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#080E1C] border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-md px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Summit Health & Wellness"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-[#080E1C] border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-md px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-600 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="jordan@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#080E1C] border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-md px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Industry Vertical
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-[#080E1C] border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-md px-3 py-1.5 text-xs text-slate-100 outline-none"
                >
                  <option value="clinics">Clinic / Medical Practice</option>
                  <option value="restaurants">Restaurant / Hospitality</option>
                  <option value="gyms">Gym / Fitness Studio</option>
                  <option value="salons">Salon / Beauty Spa</option>
                  <option value="other">Other Service Business</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Estimated Monthly Inquiries
              </label>
              <select
                value={formData.monthlyInquiries}
                onChange={(e) => setFormData({ ...formData, monthlyInquiries: e.target.value })}
                className="w-full bg-[#080E1C] border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-md px-3 py-1.5 text-xs text-slate-100 outline-none"
              >
                <option value="50–150">50 – 150 inquiries / month</option>
                <option value="150–500">150 – 500 inquiries / month</option>
                <option value="500–1500">500 – 1,500 inquiries / month</option>
                <option value="1500+">1,500+ inquiries / month</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary Automation Need
              </label>
              <textarea
                rows={2}
                value={formData.primaryGoal}
                onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                className="w-full bg-[#080E1C] border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-md px-3 py-1.5 text-xs text-slate-100 outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-3.5 py-1.5 rounded-md border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-semibold text-xs shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Simulation Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
