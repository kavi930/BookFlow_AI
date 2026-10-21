import React, { useState } from 'react';
import {
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Sparkle,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  Send,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Info
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { BUSINESS_PROFILES } from '../../data/mockData';
import { BusinessCategory } from '../../types';

export const BusinessDemosView: React.FC = () => {
  const { selectedCategory, setSelectedCategory, addLead, setActiveTab } = useDemo();
  const profile = BUSINESS_PROFILES[selectedCategory];

  // Form State
  const [leadName, setLeadName] = useState(profile.sampleLeadDefaults.sampleName);
  const [contactEmail, setContactEmail] = useState(profile.sampleLeadDefaults.sampleEmail);
  const [contactPhone, setContactPhone] = useState(profile.sampleLeadDefaults.samplePhone);
  const [requestedService, setRequestedService] = useState(profile.services[0].name);
  const [preferredDate, setPreferredDate] = useState('2026-10-25');
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM)');
  const [notes, setNotes] = useState(profile.sampleLeadDefaults.sampleNotes);

  // Business-specific custom fields
  const [partySize, setPartySize] = useState(4);
  const [fitnessGoal, setFitnessGoal] = useState(profile.fitnessGoals ? profile.fitnessGoals[0] : '');
  const [preferredProvider, setPreferredProvider] = useState(
    profile.staffOrProviders ? profile.staffOrProviders[0] : ''
  );

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedLeadId, setLastSubmittedLeadId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // When changing category, synchronize default field values
  const handleCategorySwitch = (cat: BusinessCategory) => {
    setSelectedCategory(cat);
    const newProfile = BUSINESS_PROFILES[cat];
    setLeadName(newProfile.sampleLeadDefaults.sampleName);
    setContactEmail(newProfile.sampleLeadDefaults.sampleEmail);
    setContactPhone(newProfile.sampleLeadDefaults.samplePhone);
    setRequestedService(newProfile.services[0].name);
    setNotes(newProfile.sampleLeadDefaults.sampleNotes);
    if (newProfile.fitnessGoals) {
      setFitnessGoal(newProfile.fitnessGoals[0]);
    }
    if (newProfile.staffOrProviders) {
      setPreferredProvider(newProfile.staffOrProviders[0]);
    }
    setLastSubmittedLeadId(null);
    setFormErrors([]);
  };

  const handlePreFillSample = () => {
    setLeadName(profile.sampleLeadDefaults.sampleName);
    setContactEmail(profile.sampleLeadDefaults.sampleEmail);
    setContactPhone(profile.sampleLeadDefaults.samplePhone);
    setRequestedService(profile.services[0].name);
    setNotes(profile.sampleLeadDefaults.sampleNotes);
    setFormErrors([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!leadName.trim()) errors.push('Please provide a contact name.');
    if (!contactEmail.trim() && !contactPhone.trim()) {
      errors.push('Please provide at least an email or phone number.');
    }
    if (!requestedService) errors.push('Please select a service or enquiry type.');

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
    setIsSubmitting(true);

    // Simulate rapid automation pipeline processing
    setTimeout(() => {
      const todayStr = new Date().toISOString().split('T')[0];

      let generatedStaffNote = '';
      if (selectedCategory === 'clinics') {
        generatedStaffNote = `Simulated automated triage: Evaluated non-emergency routine consult. Assigned to Dr. Jenkins intake schedule review.`;
      } else if (selectedCategory === 'restaurants') {
        generatedStaffNote = `Simulated reservation triage: Party size ${partySize} flagged for dining room host table allocation.`;
      } else if (selectedCategory === 'gyms') {
        generatedStaffNote = `Simulated member onboarding: Goal '${fitnessGoal}' matched to morning coach orientation.`;
      } else if (selectedCategory === 'salons') {
        generatedStaffNote = `Simulated stylist chair review: Requested ${preferredProvider}. 48-hr consultation guidelines sent.`;
      }

      const newId = addLead({
        leadName: leadName.trim(),
        contactEmail: contactEmail.trim(),
        contactPhone: contactPhone.trim(),
        category: selectedCategory,
        requestedService,
        enquiryDate: todayStr,
        preferredDate,
        preferredTime,
        partySize: selectedCategory === 'restaurants' ? partySize : undefined,
        fitnessGoal: selectedCategory === 'gyms' ? fitnessGoal : undefined,
        preferredProvider: selectedCategory === 'salons' ? preferredProvider : undefined,
        status: 'Contact Required',
        leadSource: 'Interactive Business Demo Form',
        notes: notes.trim(),
        fictionalStaffNote: generatedStaffNote
      });

      setIsSubmitting(false);
      setLastSubmittedLeadId(newId);
    }, 450);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Category Selection Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Business Enquiry Demonstrations
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Switch between 4 industry archetypes to test custom enquiry forms and simulated staff follow-ups.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-lg overflow-x-auto">
          <button
            onClick={() => handleCategorySwitch('clinics')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'clinics'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>1. Clinics</span>
          </button>

          <button
            onClick={() => handleCategorySwitch('restaurants')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'restaurants'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>2. Restaurants</span>
          </button>

          <button
            onClick={() => handleCategorySwitch('gyms')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'gyms'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>3. Gyms</span>
          </button>

          <button
            onClick={() => handleCategorySwitch('salons')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'salons'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkle className="w-3.5 h-3.5" />
            <span>4. Salons</span>
          </button>
        </div>
      </div>

      {/* Business Profile Banner */}
      <section className="bg-[#0B142A] border border-cyan-900/30 rounded-xl p-5 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
              {selectedCategory === 'clinics' && <Stethoscope className="w-6 h-6" />}
              {selectedCategory === 'restaurants' && <UtensilsCrossed className="w-6 h-6" />}
              {selectedCategory === 'gyms' && <Dumbbell className="w-6 h-6" />}
              {selectedCategory === 'salons' && <Sparkle className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{profile.businessName}</h2>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/50 px-2 py-0.5 rounded">
                  DEMO PROFILE
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{profile.tagline}</p>
            </div>
          </div>

          <div className="text-xs text-slate-400 md:text-right font-mono text-[11px] space-y-0.5">
            <div>Hours: {profile.fictionalHours}</div>
            <div className="text-slate-400">{profile.fictionalLocation}</div>
          </div>
        </div>

        {/* Safety / Simulation Notice */}
        <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-lg text-xs text-cyan-300/90 flex items-start gap-2">
          <Info className="w-4 h-4 shrink-0 text-cyan-400 mt-0.5" />
          <p className="leading-relaxed">{profile.disclaimer}</p>
        </div>
      </section>

      {/* Main 2-Column Split: Enquiry Form + Live Simulation Pipeline Receipt */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Enquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">
                Simulated Inbound Enquiry
              </h2>
              <p className="text-xs text-slate-400">
                Submit a realistic customer enquiry to trigger the automation flow.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePreFillSample}
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/40 border border-cyan-800/50 px-2.5 py-1 rounded transition-colors"
              title="Pre-fill with realistic demo persona values"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Load Sample Persona</span>
            </button>
          </div>

          {formErrors.length > 0 && (
            <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-lg text-xs text-red-300 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-red-200">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>Validation required:</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5">
                {formErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact Name & Service Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Customer Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="e.g. Avery Bennett"
                  className="w-full bg-[#080E1C] border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Requested Service</span>
                </label>
                <select
                  value={requestedService}
                  onChange={(e) => setRequestedService(e.target.value)}
                  className="w-full bg-[#080E1C] border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none"
                >
                  {profile.services.map((svc) => (
                    <option key={svc.id} value={svc.name}>
                      {svc.name} ({svc.priceOrType})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Contact Email</span>
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="name@sample-demo.test"
                  className="w-full bg-[#080E1C] border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Contact Phone</span>
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full bg-[#080E1C] border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 outline-none"
                />
              </div>
            </div>

            {/* Preferred Date & Time Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Preferred Date</span>
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#080E1C] border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Preferred Time Window</span>
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-[#080E1C] border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none"
                >
                  <option value="Morning (9:00 AM – 11:30 AM)">Morning (9:00 AM – 11:30 AM)</option>
                  <option value="Early Afternoon (12:00 PM – 2:30 PM)">Early Afternoon (12:00 PM – 2:30 PM)</option>
                  <option value="Late Afternoon (3:00 PM – 5:30 PM)">Late Afternoon (3:00 PM – 5:30 PM)</option>
                  <option value="Evening (6:00 PM – 8:30 PM)">Evening (6:00 PM – 8:30 PM)</option>
                </select>
              </div>
            </div>

            {/* Business Specific Field 1: Restaurant Party Size */}
            {selectedCategory === 'restaurants' && (
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">Party Size</span>
                  <span className="text-cyan-300 font-mono font-bold tabular-nums">
                    {partySize} {partySize === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={16}
                  value={partySize}
                  onChange={(e) => setPartySize(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>1 Guest (Bar/Counter)</span>
                  <span>7–16 Guests (Mezzanine Banquet rules apply)</span>
                </div>
              </div>
            )}

            {/* Business Specific Field 2: Gym Fitness Goal */}
            {selectedCategory === 'gyms' && profile.fitnessGoals && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Primary Fitness Focus
                </label>
                <select
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  className="w-full bg-[#080E1C] border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none"
                >
                  {profile.fitnessGoals.map((goal, i) => (
                    <option key={i} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Business Specific Field 3: Salon Stylist Preference */}
            {selectedCategory === 'salons' && profile.staffOrProviders && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Preferred Stylist / Specialist
                </label>
                <select
                  value={preferredProvider}
                  onChange={(e) => setPreferredProvider(e.target.value)}
                  className="w-full bg-[#080E1C] border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none"
                >
                  {profile.staffOrProviders.map((st, i) => (
                    <option key={i} value={st}>
                      {st}
                    </option>
                  ))}
                  <option value="First Available Senior Specialist">
                    First Available Senior Specialist
                  </option>
                </select>
              </div>
            )}

            {/* Notes & Special Requests */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Enquiry Notes & Specific Questions
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specific requirements, dietary notes, or preferences..."
                className="w-full bg-[#080E1C] border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Processing Simulated Pipeline...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Submit Fictional Enquiry</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Simulated Pipeline & Staff Follow-up Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-semibold uppercase text-cyan-400">
                Automated Pipeline Status
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                CLIENT-SIDE ENGINE
              </span>
            </div>

            {lastSubmittedLeadId ? (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Lead Generated: {lastSubmittedLeadId}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    The enquiry was successfully added to your local pipeline state with status <span className="font-semibold text-white">Contact Required</span>.
                  </p>
                </div>

                {/* Simulated Customer Receipt Preview */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-400">
                    1. Instant Customer Receipt (Simulated):
                  </span>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 leading-relaxed space-y-1">
                    <p className="font-medium text-white">
                      "Thank you, {leadName}! We received your request for {requestedService} on {preferredDate} ({preferredTime})."
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {selectedCategory === 'clinics' && 'Our intake nurse will contact you to confirm insurance and exact doctor slot.'}
                      {selectedCategory === 'restaurants' && `Our reservation coordinator is holding table space for ${partySize} guests pending final confirmation.`}
                      {selectedCategory === 'gyms' && 'Your guest pass guide has been queued. Our front desk coach will have your locker key ready.'}
                      {selectedCategory === 'salons' && `Elena & the team have reviewed your request for ${preferredProvider}.`}
                    </p>
                    <div className="pt-1 text-[10px] font-mono text-cyan-400">
                      [SIMULATED MESSAGE — NOT TRANSMITTED EXTERNALLY]
                    </div>
                  </div>
                </div>

                {/* Simulated Staff Task Preview */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-400">
                    2. Front Desk Task Handoff (Simulated):
                  </span>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-medium text-cyan-300">
                      <span>Assigned: Reception Team</span>
                      <span className="text-[10px] text-amber-300 font-mono">PRIORITY: HIGH</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Verify slot availability and phone {contactPhone || contactEmail} to confirm.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => setActiveTab('pipeline')}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-lg transition-colors"
                  >
                    <span>View Lead in Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveTab('workflows')}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800 transition-colors"
                  >
                    <span>Inspect {profile.businessName} Workflow</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <Clock className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-200">
                    Awaiting Simulated Enquiry
                  </h3>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                    Submit the form on the left to see the instant qualification, customer receipt, and staff task generation in real time.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Business Services Menu Preview */}
          <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-5 space-y-3">
            <span className="text-xs font-mono font-semibold uppercase text-slate-400">
              {profile.businessName} Catalog
            </span>
            <div className="space-y-2">
              {profile.services.map((svc) => (
                <div
                  key={svc.id}
                  onClick={() => setRequestedService(svc.name)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    requestedService === svc.name
                      ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-medium">
                    <span>{svc.name}</span>
                    <span className="font-mono text-[11px] text-cyan-400">{svc.priceOrType}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{svc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
