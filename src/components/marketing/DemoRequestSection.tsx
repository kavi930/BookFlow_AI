import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  Mail,
  Phone,
  User,
  Sparkles,
  HelpCircle,
  Clock,
  ShieldCheck,
  ArrowRight,
  Play
} from 'lucide-react';
import { CinematicVideoPlayer } from '../common/CinematicVideoPlayer';
import { useDemo } from '../../context/DemoContext';
import { BusinessCategory } from '../../types';

interface DemoRequestSectionProps {
  onSuccess?: () => void;
  onOpenDashboard?: () => void;
}

export const DemoRequestSection: React.FC<DemoRequestSectionProps> = ({ onSuccess, onOpenDashboard }) => {
  const { addLead } = useDemo();
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    businessType: 'clinics',
    workEmail: '',
    phoneNumber: '',
    automationGoals: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedTicketId, setSubmittedTicketId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeMediaTab, setActiveMediaTab] = useState<'benefits' | 'video'>('benefits');

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (at least 2 characters).';
    }

    if (!formData.businessName.trim()) {
      errs.businessName = 'Please enter your business or practice name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.workEmail.trim() || !emailRegex.test(formData.workEmail.trim())) {
      errs.workEmail = 'Please provide a valid work email address.';
    }

    const phoneDigits = formData.phoneNumber.replace(/\D/g, '');
    if (!formData.phoneNumber.trim() || phoneDigits.length < 7) {
      errs.phoneNumber = 'Please provide a valid phone or WhatsApp number (at least 7 digits).';
    }

    if (!formData.automationGoals.trim() || formData.automationGoals.trim().length < 10) {
      errs.automationGoals = 'Please describe what you would like to automate (at least 10 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `FP-AUDIT-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicketId(generatedId);

      const effectiveCategory: BusinessCategory =
        formData.businessType === 'other' ? 'clinics' : (formData.businessType as BusinessCategory);

      addLead({
        leadName: formData.fullName,
        contactEmail: formData.workEmail,
        contactPhone: formData.phoneNumber,
        category: effectiveCategory,
        requestedService: `Free Automation Audit (${formData.businessName})`,
        enquiryDate: new Date().toISOString().split('T')[0],
        status: 'New',
        leadSource: 'Free Automation Audit Form',
        notes: `[Ticket ${generatedId}] Business: ${formData.businessName}. Daily Bottlenecks: ${formData.automationGoals}`
      });

      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 450);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      businessName: '',
      businessType: 'clinics',
      workEmail: '',
      phoneNumber: '',
      automationGoals: ''
    });
    setErrors({});
    setSubmittedTicketId('');
    setSubmitted(false);
  };

  return (
    <section id="audit" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>Free Operational Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Get Your Free Automation Audit
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Tell us about your current enquiry workflow. We’ll map your customer intake, identify missed bookings, and prepare a tailored automation blueprint within 24 hours.
          </p>
        </div>

        {/* 2-Column Container: Form Left, Deliverables/Video Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Audit Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-700">
                    <span>Ticket #{submittedTicketId || 'FP-AUDIT-REGISTERED'}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Audit Request Received & Logged
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your intake submission for <strong className="text-slate-900">{formData.businessName}</strong> has been received and queued in our operations review pipeline.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs text-slate-600 max-w-md mx-auto space-y-2.5">
                  <div className="font-semibold text-slate-900">What happens next:</div>
                  <div className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Our operations specialist examines your enquiry channels and buffer constraints.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>A tailored blueprint PDF will be dispatched to <strong>{formData.workEmail}</strong> within 24 hours.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>A confirmation dispatch was verified for phone <strong>{formData.phoneNumber}</strong>.</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    Submit Another Audit Request
                  </button>

                  {onOpenDashboard && (
                    <button
                      type="button"
                      onClick={onOpenDashboard}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                    >
                      View in Operations Dashboard
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="block text-xs font-bold text-slate-700">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Dr. Sarah Nair"
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Business Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="businessName" className="block text-xs font-bold text-slate-700">
                      Business or Practice Name *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        id="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="Apex Care Clinic (Indiranagar)"
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                          errors.businessName
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100'
                        }`}
                      />
                    </div>
                    {errors.businessName && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.businessName}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Business Type */}
                  <div className="space-y-1.5">
                    <label htmlFor="businessType" className="block text-xs font-bold text-slate-700">
                      Industry Sector *
                    </label>
                    <select
                      id="businessType"
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:border-blue-600 focus:ring-blue-100 transition-all cursor-pointer"
                    >
                      <option value="clinics">Clinics & Healthcare</option>
                      <option value="restaurants">Restaurants & Hospitality</option>
                      <option value="gyms">Gyms & Fitness Studios</option>
                      <option value="salons">Salons & Beauty Services</option>
                      <option value="other">Other Appointment-Based Business</option>
                    </select>
                  </div>

                  {/* Work Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="workEmail" className="block text-xs font-bold text-slate-700">
                      Work Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        id="workEmail"
                        type="email"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="sarah@apexclinic.in"
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                          errors.workEmail
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100'
                        }`}
                      />
                    </div>
                    {errors.workEmail && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.workEmail}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1.5">
                  <label htmlFor="phoneNumber" className="block text-xs font-bold text-slate-700">
                    Phone / WhatsApp Number (for Blueprint Delivery) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                        errors.phoneNumber
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100'
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-[11px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phoneNumber}</span>
                    </p>
                  )}
                </div>

                {/* Automation Goals */}
                <div className="space-y-1.5">
                  <label htmlFor="automationGoals" className="block text-xs font-bold text-slate-700">
                    What daily operational tasks or bottlenecks would you like to automate? *
                  </label>
                  <textarea
                    id="automationGoals"
                    rows={3}
                    value={formData.automationGoals}
                    onChange={(e) => setFormData({ ...formData, automationGoals: e.target.value })}
                    placeholder="E.g., We get 30+ WhatsApp enquiries daily asking for doctor slots, and front desk spends 2 hours answering repetitive pricing and booking questions..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.automationGoals
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100'
                    }`}
                  />
                  {errors.automationGoals && (
                    <p className="text-[11px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.automationGoals}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-sm sm:text-base shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    {isSubmitting ? (
                      <span>Preparing your audit submission...</span>
                    ) : (
                      <>
                        <span>Get Your Free Automation Audit</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2.5">
                    100% Free · No obligation · Includes tailored operational blueprint within 24h
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Deliverables & Assurance Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  What You Receive in Your Free Audit
                </span>
                <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveMediaTab('benefits')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      activeMediaTab === 'benefits'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Deliverables
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMediaTab('video')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                      activeMediaTab === 'video'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Video Clip</span>
                  </button>
                </div>
              </div>

              {activeMediaTab === 'benefits' ? (
                <div className="space-y-3.5">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <span>1. Review of Current Enquiry Channels</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Comprehensive mapping of your WhatsApp, website form, and phone booking flows to detect leakage points.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>2. Identification of Repetitive Bottlenecks</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pinpoint where staff spend hours manually answering repetitive questions, slot holds, or sending reminders.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>3. Tailored Automation Roadmap & Blueprint</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A clear architecture diagram showing how AI triage, slot locking, and automated notifications fit into your workflow.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>4. Implementation Estimate & Quick Wins</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A prioritized breakdown of high-impact automations that can be deployed in 2 to 5 days without disrupting staff.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl overflow-hidden bg-slate-900 shadow-md">
                  <CinematicVideoPlayer
                    src="/videos/final_cta.mp4"
                    poster="/src/assets/images/final_cta_welcome_1792996549234.jpg"
                    title="Business Owner Greeting Customer in Welcoming Environment"
                    caption="Reclaimed Focus: Business owner welcoming customer in confident environment"
                    badge="FINAL WORKFLOW CLIP"
                    aspectRatio="16/9"
                  />
                </div>
              )}
            </div>

            {/* Quick Guarantees */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs text-slate-600 shadow-xs">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Zero sales pressure or lock-in contracts</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400 font-semibold">24h turnaround</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
