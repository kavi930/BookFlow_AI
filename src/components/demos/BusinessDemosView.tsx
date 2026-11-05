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
  Info,
  MapPin,
  ShieldCheck,
  Check,
  Sparkles
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { BUSINESS_PROFILES } from '../../data/mockData';
import { BusinessCategory } from '../../types';

// High-resolution photography assets for each trade vertical
import clinicPhoto from '../../assets/images/solutions_clinic_practice_1792996519101.jpg';
import restaurantPhoto from '../../assets/images/solutions_restaurant_dining_1792996520484.jpg';
import gymPhoto from '../../assets/images/solutions_gym_fitness_1792996545730.jpg';
import salonPhoto from '../../assets/images/solutions_salon_styling_1792996519844.jpg';

const CATEGORY_VISUALS: Record<
  BusinessCategory,
  {
    image: string;
    caption: string;
    locationBadge: string;
    speedMetric: string;
    highlightPill: string;
  }
> = {
  clinics: {
    image: clinicPhoto,
    caption: 'Modern Primary Care & Diagnostic Suite',
    locationBadge: 'Indiranagar, Bengaluru · Karnataka',
    speedMetric: '< 15s Patient Triage Response',
    highlightPill: 'WhatsApp & Web Health Triage'
  },
  restaurants: {
    image: restaurantPhoto,
    caption: 'Artisan Wood-Fired Hearth & Dining Room',
    locationBadge: 'Bandra West, Mumbai · Maharashtra',
    speedMetric: 'Instant Table Hold & Party Routing',
    highlightPill: 'Zero Double-Booking Guarantee'
  },
  gyms: {
    image: gymPhoto,
    caption: 'High-Performance Functional Strength & Turf Lab',
    locationBadge: 'Jubilee Hills, Hyderabad · Telangana',
    speedMetric: 'Coach Assigned in < 30 Seconds',
    highlightPill: 'Free 3-Day Pass Dispatch'
  },
  salons: {
    image: salonPhoto,
    caption: 'Luxury Hair Color & Botanical Scalp Sanctuary',
    locationBadge: 'Koregaon Park, Pune · Maharashtra',
    speedMetric: 'Stylist Chair Schedule Synchronized',
    highlightPill: 'Automated 48h Patch-Test Flow'
  }
};

export const BusinessDemosView: React.FC = () => {
  const { selectedCategory, setSelectedCategory, addLead, setActiveTab } = useDemo();
  const profile = BUSINESS_PROFILES[selectedCategory];
  const activeVisual = CATEGORY_VISUALS[selectedCategory];

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
      {/* Category Selection Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3DDD3]">
        <div>
          {/* Eyebrow status badge */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EBF1EC] border border-[#CCDCD0] text-[#1E3A2F] text-[11px] font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-[#2D5A43] animate-pulse" />
            <span>TRADE WORKFLOW SANDBOX · INDIA EDITION (₹ INR)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#14261F] tracking-tight flex items-center gap-3">
            <span className="bg-gradient-to-r from-[#14261F] via-[#1E3A2F] to-[#2D5A43] bg-clip-text text-transparent">
              Interactive Business Demos
            </span>
            <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#EBF1EC] text-[#1E3A2F] border border-[#CCDCD0] hidden md:inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#2D5A43]" />
              Live Simulator
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[#4E5B56] mt-1 max-w-xl leading-relaxed">
            Test how automated WhatsApp & web booking captures enquiries, holds provider slots, and alerts your staff in real-time.
          </p>
        </div>

        {/* Tab Buttons styled with dashboard palette */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#F5F2EB] border border-[#E3DDD3] rounded-xl overflow-x-auto shadow-2xs">
          <button
            onClick={() => handleCategorySwitch('clinics')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCategory === 'clinics'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'text-[#4F5B56] hover:text-[#1A1D1C] hover:bg-white/60'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>1. Clinics</span>
          </button>

          <button
            onClick={() => handleCategorySwitch('restaurants')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCategory === 'restaurants'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'text-[#4F5B56] hover:text-[#1A1D1C] hover:bg-white/60'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>2. Restaurants</span>
          </button>

          <button
            onClick={() => handleCategorySwitch('gyms')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCategory === 'gyms'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'text-[#4F5B56] hover:text-[#1A1D1C] hover:bg-white/60'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>3. Gyms</span>
          </button>

          <button
            onClick={() => handleCategorySwitch('salons')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCategory === 'salons'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'text-[#4F5B56] hover:text-[#1A1D1C] hover:bg-white/60'
            }`}
          >
            <Sparkle className="w-4 h-4" />
            <span>4. Salons</span>
          </button>
        </div>
      </div>

      {/* Business Profile Overview Showcase Banner */}
      <section className="relative overflow-hidden bg-white border border-[#E3DDD3] rounded-2xl shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Visual Photography Column */}
          <div className="md:col-span-5 relative min-h-[180px] md:min-h-full overflow-hidden bg-[#1E3A2F]">
            <img
              src={activeVisual.image}
              alt={activeVisual.caption}
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#14261F]/90 via-[#1E3A2F]/50 to-transparent" />
            
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#14261F]/80 backdrop-blur-xs text-[#EBF1EC] text-[10px] font-mono font-medium border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#81C784] animate-pulse" />
                {activeVisual.highlightPill}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <p className="text-xs font-medium text-white/90 drop-shadow-xs">{activeVisual.caption}</p>
              <div className="flex items-center gap-1 text-[11px] text-[#A3D9B1] mt-0.5">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{activeVisual.locationBadge}</span>
              </div>
            </div>
          </div>

          {/* Profile Details Column */}
          <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF1EC] border border-[#CCDCD0] flex items-center justify-center text-[#1E3A2F] shrink-0 shadow-2xs">
                    {selectedCategory === 'clinics' && <Stethoscope className="w-5 h-5 text-[#1E3A2F]" />}
                    {selectedCategory === 'restaurants' && <UtensilsCrossed className="w-5 h-5 text-[#1E3A2F]" />}
                    {selectedCategory === 'gyms' && <Dumbbell className="w-5 h-5 text-[#1E3A2F]" />}
                    {selectedCategory === 'salons' && <Sparkle className="w-5 h-5 text-[#1E3A2F]" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-[#14261F]">{profile.businessName}</h2>
                      <span className="text-[10px] font-mono font-semibold text-[#1E3A2F] bg-[#EBF1EC] px-2 py-0.5 rounded-md border border-[#CCDCD0]">
                        INDIA PROFILE
                      </span>
                    </div>
                    <p className="text-xs text-[#52605B]">{profile.tagline}</p>
                  </div>
                </div>

                <div className="text-right text-[11px] font-mono text-[#4F5B56] space-y-0.5">
                  <div className="flex items-center md:justify-end gap-1.5 text-[#2D5A43] font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeVisual.speedMetric}</span>
                  </div>
                  <div className="text-[#76847F]">{profile.fictionalHours.split('|')[0]}</div>
                </div>
              </div>

              <p className="text-xs text-[#3E4A45] leading-relaxed pt-1">
                {profile.description}
              </p>
            </div>

            {/* Safety / Simulation Notice */}
            <div className="p-3 bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl text-xs text-[#4F5B57] flex items-start gap-2.5">
              <Info className="w-4 h-4 shrink-0 text-[#2D5A43] mt-0.5" />
              <p className="leading-relaxed text-[11px]">{profile.disclaimer}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Split: Enquiry Form + Live Simulation Pipeline Receipt (div:nth-of-type(2)) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Enquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E3DDD3] border-t-4 border-t-[#1E3A2F] rounded-2xl p-5 sm:p-7 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EFEBE4]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EBF1EC] border border-[#CCDCD0] flex items-center justify-center text-[#1E3A2F] shrink-0">
                <Send className="w-4 h-4 text-[#1E3A2F]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#14261F]">
                  Simulate Inbound Enquiry
                </h2>
                <p className="text-xs text-[#52605B]">
                  Test WhatsApp & Web intake qualification with live CRM routing
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePreFillSample}
              className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-semibold text-[#1E3A2F] hover:text-[#14261F] bg-[#EBF1EC] hover:bg-[#DEE9E0] border border-[#CCDCD0] px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
              title="Pre-fill with realistic Indian demo persona values"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#2D5A43]" />
              <span>Reset Persona</span>
            </button>
          </div>

          {formErrors.length > 0 && (
            <div className="p-3.5 bg-[#FDF2F2] border border-[#F5C2C7] rounded-xl text-xs text-[#842029] space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-[#842029]" />
                <span>Please complete required fields:</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
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
                <label className="block text-xs font-bold text-[#23312B] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Customer Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="e.g. Rahul Verma"
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D1C] outline-none transition-all placeholder:text-[#8E9B95]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#23312B] mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Requested Service (₹ INR)</span>
                </label>
                <select
                  value={requestedService}
                  onChange={(e) => setRequestedService(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D1C] outline-none transition-all font-medium"
                >
                  {profile.services.map((svc) => (
                    <option key={svc.id} value={svc.name}>
                      {svc.name} · {svc.priceOrType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email & Phone with Indian +91 Prefix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#23312B] mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Contact Email</span>
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="name@sample-demo.test"
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D1C] outline-none transition-all placeholder:text-[#8E9B95]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#23312B] mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Contact Phone (India)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D1C] outline-none transition-all font-mono placeholder:text-[#8E9B95]"
                  />
                </div>
              </div>
            </div>

            {/* Preferred Date & Time Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#23312B] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Preferred Date</span>
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D1C] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#23312B] mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Preferred Time Window</span>
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D1C] outline-none transition-all font-medium"
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
              <div className="p-4 bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#23312B]">Reserved Party Size</span>
                  <span className="text-[#1E3A2F] bg-[#EBF1EC] px-2.5 py-0.5 rounded-full font-mono font-bold tabular-nums border border-[#CCDCD0]">
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
                <div className="flex items-center justify-between text-[10px] text-[#5D6B66] font-mono">
                  <span>1–2 Guests (Bistro Counter)</span>
                  <span>7–16 Guests (Mezzanine Banquet rules)</span>
                </div>
              </div>
            )}

            {/* Custom Business Field: Gym Fitness Goal */}
            {selectedCategory === 'gyms' && profile.fitnessGoals && (
              <div>
                <label className="block text-xs font-bold text-[#23312B] mb-1.5">
                  Primary Fitness Focus & Training Goal
                </label>
                <select
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D1C] outline-none font-medium"
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
                <label className="block text-xs font-bold text-[#23312B] mb-1.5">
                  Preferred Stylist / Color Specialist
                </label>
                <select
                  value={preferredProvider}
                  onChange={(e) => setPreferredProvider(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D1C] outline-none font-medium"
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
              <label className="block text-xs font-bold text-[#23312B] mb-1.5">
                Enquiry Notes & Special Instructions
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specific preferences, questions, or visit instructions..."
                className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D1C] outline-none resize-none placeholder:text-[#8E9B95]"
              />
            </div>

            {/* Submit Button styled with dashboard primary palette */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-5 bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-sm transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Processing Inbound Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white" />
                    <span>Submit Fictional Enquiry (Live Sandbox)</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#5D6B66] flex items-center justify-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2D5A43]" />
                <span>Simulates instant WhatsApp reply + prioritized staff task creation</span>
              </p>
            </div>
          </form>
        </div>

        {/* Right Column: Simulation Receipt & Pipeline Output (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Simulated Pipeline Terminal Card */}
          <div className="bg-white border border-[#E3DDD3] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#EFEBE4]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D5A43] animate-pulse" />
                <span className="text-xs font-bold text-[#14261F] tracking-wide uppercase">
                  Simulated Pipeline Dispatch
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#1E3A2F] bg-[#EBF1EC] px-2 py-0.5 rounded border border-[#CCDCD0]">
                REAL-TIME
              </span>
            </div>

            {lastSubmittedLeadId ? (
              <div className="space-y-4 animate-fadeIn">
                {/* Lead Created Badge */}
                <div className="p-3.5 bg-[#EBF1EC] border border-[#CCDCD0] rounded-xl text-xs space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#1E3A2F] font-bold">
                      <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
                      <span>New Lead Logged: {lastSubmittedLeadId}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-[#1E3A2F] text-white px-2 py-0.5 rounded">
                      ₹ INR
                    </span>
                  </div>
                  <p className="text-[#3A4843] text-[11px] leading-relaxed">
                    Captured to your local sandbox CRM with status <strong className="text-[#14261F]">Contact Required</strong> for staff follow-up.
                  </p>
                </div>

                {/* Simulated Customer WhatsApp Receipt Bubble */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[11px] font-bold text-[#2D3A35] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                    <span>1. Instant WhatsApp Confirmation (Sent in 4s):</span>
                  </span>
                  <div className="p-3.5 bg-[#E7FFDB] border border-[#BCE8A9] rounded-xl text-xs text-[#103D27] leading-relaxed space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#075E54] font-semibold border-b border-[#BCE8A9]/60 pb-1">
                      <span>FlowPilot WhatsApp Bot</span>
                      <span>Just now · ✓✓</span>
                    </div>
                    <p className="font-semibold text-[#0A2E1C]">
                      "Namaste {leadName}! We received your request for {requestedService} on {preferredDate} ({preferredTime})."
                    </p>
                    <p className="text-[11px] text-[#144A2F]">
                      {selectedCategory === 'clinics' && 'Our intake coordinator will contact you via call/WhatsApp to confirm insurance details and finalize your doctor slot.'}
                      {selectedCategory === 'restaurants' && `Our host coordinator is holding table space for ${partySize} guests. A confirmation SMS will follow shortly.`}
                      {selectedCategory === 'gyms' && 'Your complimentary 3-day access pass has been queued. Our front desk coach will have your orientation kit ready.'}
                      {selectedCategory === 'salons' && `Elena & our master styling team have reviewed your request for ${preferredProvider}. 48h patch-test advisory sent.`}
                    </p>
                  </div>
                </div>

                {/* Simulated Staff Task Card */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[11px] font-bold text-[#2D3A35] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A2F]" />
                    <span>2. Priority Action Dispatched to Staff:</span>
                  </span>
                  <div className="p-3.5 bg-[#FFF9EE] border border-[#F0E2C8] rounded-xl text-xs text-[#2A3531] space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#1E3A2F]">
                      <span>Role: Front Desk Coordinator</span>
                      <span className="text-[10px] font-mono font-bold text-[#8C5E09] bg-[#FDEBC9] px-2 py-0.5 rounded">
                        Action Required
                      </span>
                    </div>
                    <p className="text-[11px] text-[#523A0B] leading-relaxed">
                      Verify provider slot on master calendar and call <strong className="font-mono text-[#1E3A2F]">{contactPhone || contactEmail}</strong> within 15 minutes to lock in booking.
                    </p>
                  </div>
                </div>

                {/* Direct Navigation Buttons */}
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => setActiveTab('pipeline')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    <span>View Lead in CRM Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveTab('workflows')}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-[#FAF8F5] text-[#2D3A35] font-medium text-xs rounded-xl border border-[#DCD6CC] transition-colors"
                  >
                    <span>Inspect {profile.businessName} Automation Logic</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-7 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF1EC] border border-[#CCDCD0] flex items-center justify-center mx-auto text-[#1E3A2F] shadow-2xs">
                  <Clock className="w-6 h-6 text-[#2D5A43]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#14261F]">
                    Ready to Simulate Trade Intake
                  </h3>
                  <p className="text-[11px] text-[#5D6B66] max-w-xs mx-auto mt-1 leading-relaxed">
                    Submit the form on the left to see immediate WhatsApp auto-reply generation, calendar slot hold, and front-desk task assignment.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E7E2DA] text-[10px] font-mono text-[#4F5B56]">
                  <span>Avg Triage Time:</span>
                  <strong className="text-[#1E3A2F]">3.8 seconds</strong>
                </div>
              </div>
            )}
          </div>

          {/* Catalog Preview with INR Prices */}
          <div className="bg-white border border-[#E3DDD3] rounded-2xl p-5 space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#14261F]">
                {profile.businessName} Service Menu (₹ INR)
              </span>
              <span className="text-[10px] font-mono text-[#52605B]">Click to Select</span>
            </div>
            
            <div className="space-y-2">
              {profile.services.map((svc) => (
                <div
                  key={svc.id}
                  onClick={() => setRequestedService(svc.name)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    requestedService === svc.name
                      ? 'bg-[#EBF1EC] border-[#2D5A43] text-[#1E3A2F] shadow-2xs ring-1 ring-[#2D5A43]'
                      : 'bg-[#FAF8F5] border-[#E8E3DA] text-[#4B5652] hover:border-[#CCDCD0] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span>{svc.name}</span>
                    <span className="font-mono text-[11px] font-bold text-[#1E3A2F] bg-white px-2 py-0.5 rounded border border-[#CCDCD0]">
                      {svc.priceOrType}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5E6D67] mt-1 leading-relaxed">{svc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
