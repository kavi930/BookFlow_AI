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
    }, 350);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-[#1A1D1C]">
      {/* Category Selection Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E7E2DA]">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D1C] tracking-tight">
            Interactive Business Demos
          </h1>
          <p className="text-xs sm:text-sm text-[#5D6B66] mt-0.5">
            Test how different trade workflows handle enquiries, preferred times, and staff hand-offs.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E3DDD3] rounded-lg overflow-x-auto shadow-xs">
          <button
            onClick={() => handleCategorySwitch('clinics')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'clinics'
                ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>1. Clinics</span>
          </button>

          <button
            onClick={() => handleCategorySwitch('restaurants')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'restaurants'
                ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>2. Restaurants</span>
          </button>

          <button
            onClick={() => handleCategorySwitch('gyms')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'gyms'
                ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>3. Gyms</span>
          </button>

          <button
            onClick={() => handleCategorySwitch('salons')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'salons'
                ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <Sparkle className="w-3.5 h-3.5" />
            <span>4. Salons</span>
          </button>
        </div>
      </div>

      {/* Business Profile Overview Banner */}
      <section className="bg-white border border-[#E3DDD3] rounded-xl p-5 sm:p-6 space-y-3.5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-[#EBF1EC] border border-[#D5E2D8] flex items-center justify-center text-[#1E3A2F] shrink-0">
              {selectedCategory === 'clinics' && <Stethoscope className="w-5 h-5" />}
              {selectedCategory === 'restaurants' && <UtensilsCrossed className="w-5 h-5" />}
              {selectedCategory === 'gyms' && <Dumbbell className="w-5 h-5" />}
              {selectedCategory === 'salons' && <Sparkle className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#1A1D1C]">{profile.businessName}</h2>
                <span className="text-[10px] font-mono text-[#2D5A43] bg-[#EBF1EC] px-2 py-0.5 rounded border border-[#CCDCD0]">
                  SAMPLE PROFILE
                </span>
              </div>
              <p className="text-xs text-[#52605B]">{profile.tagline}</p>
            </div>
          </div>

          <div className="text-xs text-[#5D6B66] md:text-right font-mono text-[11px] space-y-0.5">
            <div>Hours: {profile.fictionalHours}</div>
            <div className="text-[#76847F]">{profile.fictionalLocation}</div>
          </div>
        </div>

        {/* Safety / Simulation Notice */}
        <div className="p-3 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-xs text-[#4F5B57] flex items-start gap-2">
          <Info className="w-4 h-4 shrink-0 text-[#2D5A43] mt-0.5" />
          <p className="leading-relaxed">{profile.disclaimer}</p>
        </div>
      </section>

      {/* Main 2-Column Split: Enquiry Form + Live Simulation Pipeline Receipt */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Enquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E3DDD3] rounded-xl p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4]">
            <div>
              <h2 className="text-base font-bold text-[#1A1D1C]">
                Simulate an Inbound Enquiry
              </h2>
              <p className="text-xs text-[#5B6763]">
                Submit a sample enquiry to trigger the qualification flow and pipeline update.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePreFillSample}
              className="flex items-center gap-1.5 text-xs text-[#2D5A43] hover:text-[#1E3A2F] bg-[#EBF1EC] hover:bg-[#DEE9E0] border border-[#CCDCD0] px-2.5 py-1 rounded-md transition-colors"
              title="Pre-fill with realistic demo persona values"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Persona</span>
            </button>
          </div>

          {formErrors.length > 0 && (
            <div className="p-3 bg-[#FDF2F2] border border-[#F5C2C7] rounded-lg text-xs text-[#842029] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="w-4 h-4 text-[#842029]" />
                <span>Please complete required fields:</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5">
                {formErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Contact Name & Service Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2F3A36] mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Customer Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="e.g. Avery Bennett"
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-lg px-3 py-2 text-xs text-[#1A1D1C] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2F3A36] mb-1.5 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Requested Service</span>
                </label>
                <select
                  value={requestedService}
                  onChange={(e) => setRequestedService(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-lg px-3 py-2 text-xs text-[#1A1D1C] outline-none"
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
                <label className="block text-xs font-semibold text-[#2F3A36] mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Contact Email</span>
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="name@sample-demo.test"
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-lg px-3 py-2 text-xs text-[#1A1D1C] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2F3A36] mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Contact Phone</span>
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-lg px-3 py-2 text-xs text-[#1A1D1C] outline-none"
                />
              </div>
            </div>

            {/* Preferred Date & Time Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2F3A36] mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Preferred Date</span>
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-lg px-3 py-2 text-xs text-[#1A1D1C] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2F3A36] mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Preferred Time Window</span>
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-lg px-3 py-2 text-xs text-[#1A1D1C] outline-none"
                >
                  <option value="Morning (9:00 AM – 11:30 AM)">Morning (9:00 AM – 11:30 AM)</option>
                  <option value="Early Afternoon (12:00 PM – 2:30 PM)">Early Afternoon (12:00 PM – 2:30 PM)</option>
                  <option value="Late Afternoon (3:00 PM – 5:30 PM)">Late Afternoon (3:00 PM – 5:30 PM)</option>
                  <option value="Evening (6:00 PM – 8:30 PM)">Evening (6:00 PM – 8:30 PM)</option>
                </select>
              </div>
            </div>

            {/* Custom Business Field: Restaurant Party Size */}
            {selectedCategory === 'restaurants' && (
              <div className="p-3 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2F3A36]">Party Size</span>
                  <span className="text-[#1E3A2F] font-mono font-bold tabular-nums">
                    {partySize} {partySize === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={16}
                  value={partySize}
                  onChange={(e) => setPartySize(parseInt(e.target.value, 10))}
                  className="w-full accent-[#1E3A2F] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[10px] text-[#717E79] font-mono">
                  <span>1 Guest (Bar/Counter)</span>
                  <span>7–16 Guests (Mezzanine Banquet rules apply)</span>
                </div>
              </div>
            )}

            {/* Custom Business Field: Gym Fitness Goal */}
            {selectedCategory === 'gyms' && profile.fitnessGoals && (
              <div>
                <label className="block text-xs font-semibold text-[#2F3A36] mb-1.5">
                  Primary Fitness Focus
                </label>
                <select
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-lg px-3 py-2 text-xs text-[#1A1D1C] outline-none"
                >
                  {profile.fitnessGoals.map((goal, i) => (
                    <option key={i} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Custom Business Field: Salon Stylist Preference */}
            {selectedCategory === 'salons' && profile.staffOrProviders && (
              <div>
                <label className="block text-xs font-semibold text-[#2F3A36] mb-1.5">
                  Preferred Stylist / Specialist
                </label>
                <select
                  value={preferredProvider}
                  onChange={(e) => setPreferredProvider(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-lg px-3 py-2 text-xs text-[#1A1D1C] outline-none"
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

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#2F3A36] mb-1.5">
                Enquiry Notes & Special Requests
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specific preferences, questions, or details..."
                className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-lg px-3 py-2 text-xs text-[#1A1D1C] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-medium text-xs sm:text-sm rounded-lg shadow-xs transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Processing Simulated Enquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-white" />
                  <span>Submit Fictional Enquiry</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Simulation Receipt & Pipeline Output (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#E3DDD3] rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4]">
              <span className="text-xs font-semibold text-[#1A1D1C]">
                Simulated Pipeline Result
              </span>
              <span className="text-[10px] font-mono text-[#73827D]">
                LOCAL STATE
              </span>
            </div>

            {lastSubmittedLeadId ? (
              <div className="space-y-4">
                <div className="p-3 bg-[#EBF1EC] border border-[#CCDCD0] rounded-lg text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#1E3A2F] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
                    <span>Lead Created: {lastSubmittedLeadId}</span>
                  </div>
                  <p className="text-[#3A4843] text-[11px] leading-relaxed">
                    The enquiry was added to your local demo pipeline under status <strong className="text-[#1A1D1C]">Contact Required</strong>.
                  </p>
                </div>

                {/* Simulated Customer Receipt */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[11px] font-semibold text-[#4F5B57] block">
                    1. Instant Customer Receipt (Simulated):
                  </span>
                  <div className="p-3 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-xs text-[#2A3531] leading-relaxed space-y-1">
                    <p className="font-medium text-[#1A1D1C]">
                      "Thank you, {leadName}! We received your request for {requestedService} on {preferredDate} ({preferredTime})."
                    </p>
                    <p className="text-[11px] text-[#55635E]">
                      {selectedCategory === 'clinics' && 'Our intake nurse will contact you to confirm insurance and exact doctor slot.'}
                      {selectedCategory === 'restaurants' && `Our reservation coordinator is holding table space for ${partySize} guests pending final confirmation.`}
                      {selectedCategory === 'gyms' && 'Your guest pass guide has been queued. Our front desk coach will have your locker key ready.'}
                      {selectedCategory === 'salons' && `Elena & the team have reviewed your request for ${preferredProvider}.`}
                    </p>
                  </div>
                </div>

                {/* Simulated Staff Task */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[11px] font-semibold text-[#4F5B57] block">
                    2. Staff Task Created (Simulated):
                  </span>
                  <div className="p-3 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-xs text-[#2A3531] space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#1E3A2F]">
                      <span>Assigned: Front Desk Team</span>
                      <span className="text-[10px] font-mono text-[#8C5E09]">Action Needed</span>
                    </div>
                    <p className="text-[11px] text-[#4E5C57]">
                      Verify schedule availability and call {contactPhone || contactEmail} to confirm visit.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => setActiveTab('pipeline')}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-medium text-xs rounded-lg transition-colors"
                  >
                    <span>View Lead in Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveTab('workflows')}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-[#FAF8F5] text-[#3A4642] text-xs rounded-lg border border-[#DCD6CC] transition-colors"
                  >
                    <span>Inspect {profile.businessName} Workflow</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-2.5">
                <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#E3DDD3] flex items-center justify-center mx-auto text-[#798883]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#1A1D1C]">
                    Ready to simulate enquiry
                  </h3>
                  <p className="text-[11px] text-[#697772] max-w-xs mx-auto mt-1 leading-relaxed">
                    Submit the form on the left to see customer acknowledgment and staff task routing in real time.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Catalog Preview */}
          <div className="bg-white border border-[#E3DDD3] rounded-xl p-5 space-y-3 shadow-xs">
            <span className="text-xs font-semibold text-[#1A1D1C]">
              {profile.businessName} Service Catalog
            </span>
            <div className="space-y-2">
              {profile.services.map((svc) => (
                <div
                  key={svc.id}
                  onClick={() => setRequestedService(svc.name)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    requestedService === svc.name
                      ? 'bg-[#EBF1EC] border-[#CCDCD0] text-[#1E3A2F]'
                      : 'bg-[#FAF8F5] border-[#E8E3DA] text-[#4B5652] hover:border-[#D5CFC5]'
                  }`}
                >
                  <div className="flex items-center justify-between font-medium">
                    <span>{svc.name}</span>
                    <span className="font-mono text-[11px] text-[#2D5A43]">{svc.priceOrType}</span>
                  </div>
                  <p className="text-[11px] text-[#6E7D77] mt-0.5">{svc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
