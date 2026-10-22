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
    primaryGoal: 'Organising after-hours customer enquiries'
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 text-[#1A1D1C]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A1D1C]/50 backdrop-blur-xs"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative bg-white border border-[#E3DDD3] rounded-xl shadow-2xl max-w-lg w-full p-6 z-10 space-y-4">
        <div className="flex items-start justify-between pb-3 border-b border-[#EFEBE4]">
          <div>
            <div className="flex items-center gap-1.5 text-[#2D5A43] text-xs font-semibold mb-0.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>PROJECT SCOPING</span>
            </div>
            <h2 id="modal-title" className="text-lg font-bold text-[#1A1D1C]">
              Discuss an Automation Solution
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-[#717E79] hover:text-[#1A1D1C] p-1 rounded-md hover:bg-[#FAF8F5] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 bg-[#EBF1EC] border border-[#CCDCD0] rounded-full flex items-center justify-center mx-auto text-[#1E3A2F]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1A1D1C]">
                Demo Interest Recorded
              </h3>
              <p className="text-xs text-[#52605B] mt-1 max-w-sm mx-auto leading-relaxed">
                In a production deployment, this enquiry would automatically generate a client onboarding dossier and notify your account lead.
              </p>
            </div>
            <div className="p-3 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-xs text-[#52605B] max-w-sm mx-auto">
              Notice: This is a client-side demo form. No real contact data was transmitted over the internet.
            </div>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-medium rounded-lg text-xs transition-colors"
            >
              Back to Demo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div className="bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg p-2.5 text-xs text-[#4F5B57] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#2D5A43] mt-0.5" />
              <p className="leading-snug">
                This is a local demonstration form. Submitting will not send emails or contact external services.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#2F3A36] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Miller"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-md px-3 py-1.5 text-xs text-[#1A1D1C] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2F3A36] mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Summit Health & Wellness"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-md px-3 py-1.5 text-xs text-[#1A1D1C] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#2F3A36] mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="jordan@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-md px-3 py-1.5 text-xs text-[#1A1D1C] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2F3A36] mb-1">
                  Industry Vertical
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-md px-3 py-1.5 text-xs text-[#1A1D1C] outline-none"
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
              <label className="block font-semibold text-[#2F3A36] mb-1">
                Estimated Monthly Inquiries
              </label>
              <select
                value={formData.monthlyInquiries}
                onChange={(e) => setFormData({ ...formData, monthlyInquiries: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-md px-3 py-1.5 text-xs text-[#1A1D1C] outline-none"
              >
                <option value="50–150">50 – 150 inquiries / month</option>
                <option value="150–500">150 – 500 inquiries / month</option>
                <option value="500–1500">500 – 1,500 inquiries / month</option>
                <option value="1500+">1,500+ inquiries / month</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#2F3A36] mb-1">
                Primary Automation Need
              </label>
              <textarea
                rows={2}
                value={formData.primaryGoal}
                onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-md px-3 py-1.5 text-xs text-[#1A1D1C] outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#EFEBE4]">
              <button
                type="button"
                onClick={handleClose}
                className="px-3.5 py-1.5 rounded-md border border-[#DCD6CC] hover:bg-[#FAF8F5] text-xs text-[#55635F] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-medium text-xs shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Demo Interest</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
