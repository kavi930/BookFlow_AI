import { BusinessCategory, BusinessProfile, LeadRecord, WorkflowStep } from '../types';

export const BUSINESS_PROFILES: Record<BusinessCategory, BusinessProfile> = {
  clinics: {
    category: 'clinics',
    businessName: 'CarePoint Clinic',
    tagline: 'Family Medicine & Preventive Wellness Care',
    description: 'A multi-provider primary health and wellness center providing routine physicals, preventative screenings, and specialist referrals.',
    fictionalHours: 'Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 1:00 PM | Sunday: Closed',
    fictionalLocation: '420 Meadowview Lane, Suite 200 (Fictional Demo Address)',
    disclaimer: 'SAFETY NOTICE: This is an illustrative simulation. No clinical diagnosis, medical advice, or real patient data is handled. Appointments require formal manual verification by clinic staff.',
    services: [
      { id: 'c1', name: 'General Consultation', priceOrType: '$120 / self-pay or co-pay', duration: '30 mins', description: 'Comprehensive checkup for non-emergency symptoms and routine health checks.' },
      { id: 'c2', name: 'Annual Preventive Screening', priceOrType: '$180 standard screening', duration: '45 mins', description: 'Biometric vitals, routine metabolic blood panel order, and lifestyle review.' },
      { id: 'c3', name: 'Blood Pressure & Diabetes Review', priceOrType: '$95 monitoring visit', duration: '20 mins', description: 'Ongoing chronic condition medication checks and vitals review.' },
      { id: 'c4', name: 'Travel Immunization Consult', priceOrType: '$85 + vaccine costs', duration: '25 mins', description: 'Destination-based advisory and vaccination scheduling advice.' },
    ],
    staffOrProviders: ['Dr. Sarah Jenkins (Family Medicine)', 'Dr. Alan Morales (Internal Medicine)', 'Nurse Practitioner Rachel Vance'],
    sampleQuestions: [
      {
        question: 'What are your weekend opening hours for urgent visits?',
        answer: 'CarePoint Clinic is open Saturdays from 9:00 AM to 1:00 PM for non-emergency routine appointments. We are closed on Sundays. If you are experiencing an acute medical emergency, please call 911 or your local emergency hospital.',
        intent: 'clinic_hours'
      },
      {
        question: 'How do I schedule an annual wellness checkup?',
        answer: 'You can submit your preferred date, morning/afternoon preference, and contact information through this enquiry portal. A clinic intake coordinator will review the schedule and contact you to confirm the exact slot.',
        intent: 'booking_process'
      },
      {
        question: 'Do you accept major private insurance plans?',
        answer: 'CarePoint Clinic works with standard regional PPO networks and Medicare. During the simulated intake follow-up, our patient coordinator cross-checks your provider details before your visit.',
        intent: 'insurance'
      },
      {
        question: 'Can you provide a medical diagnosis over chat?',
        answer: 'For your safety, our automated enquiry system does not provide diagnoses or prescribe medication. We only capture routine appointment preferences so medical staff can evaluate your needs during an in-person or telehealth consultation.',
        intent: 'safety_policy'
      }
    ],
    sampleLeadDefaults: {
      service: 'General Consultation',
      sampleName: 'Julian Croft',
      sampleEmail: 'julian.croft@sample-demo.test',
      samplePhone: '(555) 234-8910',
      sampleNotes: 'Interested in routine cholesterol screening and scheduling afternoon checkup.'
    }
  },

  restaurants: {
    category: 'restaurants',
    businessName: 'Urban Table',
    tagline: 'Modern Contemporary Bistro & Hearth Dining',
    description: 'Seasonal wood-fired bistro specializing in local organic produce, craft cocktails, and intimate celebratory group dining.',
    fictionalHours: 'Tuesday – Thursday: 5:00 PM – 10:00 PM | Friday – Saturday: 5:00 PM – 11:30 PM | Sunday Brunch: 10:30 AM – 3:00 PM',
    fictionalLocation: '188 Warehouse District Row (Fictional Demo Address)',
    disclaimer: 'DEMO NOTICE: This is an illustrative restaurant enquiry simulation. Submitting a request does not book a physical table or debit any card.',
    services: [
      { id: 'r1', name: 'Standard Dining Reservation', priceOrType: 'A la carte menu', duration: '90 mins dining window', description: 'Table in main dining room for couples or parties up to 6.' },
      { id: 'r2', name: 'Chef’s Tasting Counter (5-Course)', priceOrType: '$95 per guest', duration: '2 hours', description: 'Front-row hearth seating with seasonal menu pairings.' },
      { id: 'r3', name: 'Private Mezzanine Dining (8–18 Guests)', priceOrType: 'Custom preset menu', duration: '3 hours', description: 'Dedicated server and customized celebratory multi-course menu.' },
      { id: 'r4', name: 'Weekend Patio Hearth Brunch', priceOrType: 'A la carte brunch', duration: '75 mins', description: 'Heated open-air terrace seating featuring specialty pastries and mimosas.' },
    ],
    sampleQuestions: [
      {
        question: 'What are your hours for Friday evening dinner?',
        answer: 'Urban Table is open for dinner on Friday evenings from 5:00 PM until 11:30 PM (kitchen closes at 10:30 PM). Hearth cocktail lounge remains open until midnight.',
        intent: 'restaurant_hours'
      },
      {
        question: 'Do you have vegan and gluten-free dietary options?',
        answer: 'Yes! Urban Table features dedicated vegan and celiac-friendly courses, including our house wild mushroom risotto and wood-roasted cauliflower steaks. Please note dietary preferences when requesting your table.',
        intent: 'dietary_menu'
      },
      {
        question: 'What is the deposit policy for large parties of 8 or more?',
        answer: 'Parties of 8 or more are seated in our semi-private mezzanine with a pre-selected seasonal tasting menu. Our events host reviews availability and contacts you directly regarding timing and menu selections.',
        intent: 'large_party'
      },
      {
        question: 'Is there parking available near the restaurant?',
        answer: 'Valet parking is available at our entrance beginning at 5:00 PM on Thursday, Friday, and Saturday evenings. Public metered street parking and the 4th Street Garage are also within one block.',
        intent: 'parking'
      }
    ],
    sampleLeadDefaults: {
      service: 'Standard Dining Reservation',
      sampleName: 'Sophia Lin',
      sampleEmail: 'sophia.lin@sample-demo.test',
      samplePhone: '(555) 345-6789',
      sampleNotes: 'Table for anniversary dinner. Request quiet corner booth if possible.'
    }
  },

  gyms: {
    category: 'gyms',
    businessName: 'FitCore Studio',
    tagline: 'High-Performance Functional Fitness & Conditioning',
    description: 'State-of-the-art strength lab, functional interval conditioning, and guided small-group athletic training.',
    fictionalHours: 'Monday – Friday: 5:30 AM – 9:30 PM | Saturday – Sunday: 7:00 AM – 6:00 PM',
    fictionalLocation: '880 Olympic Boulevard (Fictional Demo Address)',
    disclaimer: 'DEMO NOTICE: This is a fictional fitness trial enquiry demonstration. No actual gym pass or membership contract is issued.',
    services: [
      { id: 'g1', name: 'Complimentary 3-Day Trial Pass', priceOrType: 'Free 3-Day Intro', duration: '3 Consecutive Days', description: 'Full facility access including one coach-led HIIT or conditioning class.' },
      { id: 'g2', name: 'Unlimited Monthly All-Access', priceOrType: '$149 / month', duration: 'Month-to-month', description: 'Unlimited turf access, open gym floor, cold plunges, and recovery sauna.' },
      { id: 'g3', name: '10-Class Athletic Punch Card', priceOrType: '$190 (valid 90 days)', duration: '10 sessions', description: 'Flexible access to all coach-guided group strength and conditioning classes.' },
      { id: 'g4', name: 'Personal Coaching Assessment (1:1)', priceOrType: '$85 intro consult', duration: '60 mins', description: 'Movement screen, baseline biometric assessment, and custom training roadmap.' },
    ],
    fitnessGoals: [
      'Functional Strength & Muscle Tone',
      'Cardiovascular Endurance & Stamina',
      'Athletic Mobility & Injury Prevention',
      'Healthy Weight Management & Habit Building'
    ],
    sampleQuestions: [
      {
        question: 'What is included in the complimentary trial pass?',
        answer: 'The complimentary trial pass includes 3 consecutive days of open facility access, use of the recovery amenities, and one reservation for a coach-guided group conditioning class.',
        intent: 'trial_pass'
      },
      {
        question: 'What types of classes do you run in the morning?',
        answer: 'We run 6:00 AM and 7:15 AM High-Intensity Conditioning, 8:30 AM Olympic Barbell & Strength, and 9:30 AM Mobility & Core recovery sessions Monday through Friday.',
        intent: 'class_schedule'
      },
      {
        question: 'Are memberships tied to a 12-month lock-in contract?',
        answer: 'No. FitCore Studio operates on transparent month-to-month memberships with a simple 14-day cancellation notice prior to billing. There are no initiation fees or lock-in terms.',
        intent: 'membership_contract'
      },
      {
        question: 'Do you have shower facilities and locker rooms?',
        answer: 'Yes, our locker rooms feature rainfall private showers, towel service, Malin+Goetz toiletries, dry eucalyptus saunas, and daily keyless lockers.',
        intent: 'amenities'
      }
    ],
    sampleLeadDefaults: {
      service: 'Complimentary 3-Day Trial Pass',
      sampleName: 'Marcus Bradley',
      sampleEmail: 'marcus.b@sample-demo.test',
      samplePhone: '(555) 456-7891',
      sampleNotes: 'Interested in early morning 6:30am group training classes.'
    }
  },

  salons: {
    category: 'salons',
    businessName: 'Glow & Co. Salon',
    tagline: 'Artisanal Color, Hair Care & Botanical Aesthetic Studio',
    description: 'Boutique hair and wellness sanctuary specializing in dimensional balayage, botanical scalp treatments, and tailored precision haircuts.',
    fictionalHours: 'Tuesday – Saturday: 9:00 AM – 7:00 PM | Sunday: 10:00 AM – 4:00 PM | Monday: Closed',
    fictionalLocation: '52 Atelier Avenue (Fictional Demo Address)',
    disclaimer: 'DEMO NOTICE: Fictional appointment demonstration only. Submitting an enquiry does not hold real salon chair time.',
    services: [
      { id: 's1', name: 'Dimensional Balayage & Gloss', priceOrType: 'From $240', duration: '3.0 hours', description: 'Hand-painted bespoke sunlit highlights, customized tonal gloss, and blowout.' },
      { id: 's2', name: 'Precision Haircut & Style', priceOrType: '$95 – $120', duration: '60 mins', description: 'Tailored dry or wet precision scissor cut, botanical wash, and signature blowout.' },
      { id: 's3', name: 'Botanical Scalp & Steam Therapy', priceOrType: '$85', duration: '45 mins', description: 'Purifying Japanese head spa massage, organic botanical oil infusion, and scalp detox.' },
      { id: 's4', name: 'Full Single-Process Color & Trim', priceOrType: 'From $165', duration: '2.0 hours', description: 'Root retouch or all-over single tone color with nourishing moisture mask.' },
    ],
    staffOrProviders: [
      'Elena Vance (Master Balayage Stylist)',
      'Marcus Reed (Creative Color Director)',
      'Chloe Dubois (Texture & Cutting Specialist)'
    ],
    sampleQuestions: [
      {
        question: 'How long does a full dimensional balayage appointment take?',
        answer: 'A full dimensional balayage service usually takes between 2.5 to 3.5 hours depending on your hair density, current color history, and desired lightness level.',
        intent: 'balayage_duration'
      },
      {
        question: 'Do I need a patch test before my color appointment?',
        answer: 'For first-time color clients or dramatic transformations, we recommend a complimentary 10-minute patch and strand test at least 48 hours before your booked service.',
        intent: 'patch_test'
      },
      {
        question: 'Can I request a specific stylist like Elena Vance?',
        answer: 'Yes! Our booking enquiry form allows you to select your preferred stylist. If your chosen stylist is fully booked, our coordinator will suggest the nearest available match.',
        intent: 'stylist_request'
      },
      {
        question: 'What is your salon cancellation policy?',
        answer: 'We request 24 hours advance notice for routine haircuts and 48 hours for intensive color transformations so we can offer the slot to clients on our waitlist.',
        intent: 'cancellation_policy'
      }
    ],
    sampleLeadDefaults: {
      service: 'Dimensional Balayage & Gloss',
      sampleName: 'Avery Morgan',
      sampleEmail: 'avery.m@sample-demo.test',
      samplePhone: '(555) 567-8902',
      sampleNotes: 'First time coloring dark blonde hair. Interested in subtle honey highlights.'
    }
  }
};

export const INITIAL_LEADS: LeadRecord[] = [
  {
    id: 'LEAD-101',
    leadName: 'David K. Henderson',
    contactEmail: 'david.h@sample-demo.test',
    contactPhone: '(555) 812-4091',
    category: 'clinics',
    requestedService: 'Annual Preventive Screening',
    enquiryDate: '2026-10-19',
    preferredDate: '2026-10-24',
    preferredTime: 'Morning (9:30 AM)',
    status: 'Contact Required',
    leadSource: 'Clinic Web Form',
    notes: 'Requested routine preventive blood panel and fasting check. No urgent symptoms.',
    fictionalStaffNote: 'Coordinator assigned to verify insurance network and call back by 4 PM.',
    createdAt: '2026-10-19T09:14:00Z'
  },
  {
    id: 'LEAD-102',
    leadName: 'Camilla Valenzuela',
    contactEmail: 'camilla.v@sample-demo.test',
    contactPhone: '(555) 671-8823',
    category: 'restaurants',
    requestedService: 'Private Mezzanine Dining (8–18 Guests)',
    enquiryDate: '2026-10-20',
    preferredDate: '2026-10-28',
    preferredTime: 'Evening (7:30 PM)',
    partySize: 12,
    status: 'New',
    leadSource: 'Website Reservation Widget',
    notes: '30th birthday dinner celebration. 2 vegetarian guests in party.',
    fictionalStaffNote: 'Simulated AI tagged party size >8 as VIP Event Lead. Flagged for Event Manager.',
    createdAt: '2026-10-20T14:22:00Z'
  },
  {
    id: 'LEAD-103',
    leadName: 'Liam Chen',
    contactEmail: 'liam.c@sample-demo.test',
    contactPhone: '(555) 940-1129',
    category: 'gyms',
    requestedService: 'Complimentary 3-Day Trial Pass',
    enquiryDate: '2026-10-18',
    preferredDate: '2026-10-21',
    preferredTime: 'Morning (6:30 AM)',
    fitnessGoal: 'Cardiovascular Endurance & Stamina',
    status: 'Follow-up',
    leadSource: 'Instagram Ad Campaign',
    notes: 'Wants to test morning conditioning HIIT classes before joining annual pass.',
    fictionalStaffNote: 'Welcome intro email drafted. Sent notification to floor coach Liam.',
    createdAt: '2026-10-18T18:40:00Z'
  },
  {
    id: 'LEAD-104',
    leadName: 'Nadia Rostova',
    contactEmail: 'nadia.r@sample-demo.test',
    contactPhone: '(555) 438-9901',
    category: 'salons',
    requestedService: 'Dimensional Balayage & Gloss',
    enquiryDate: '2026-10-17',
    preferredDate: '2026-10-23',
    preferredTime: 'Afternoon (2:00 PM)',
    preferredProvider: 'Elena Vance (Master Balayage Stylist)',
    status: 'Completed',
    leadSource: 'Google Maps Profile',
    notes: 'Prior customer consultation notes logged. Preferred Elena Vance confirmed.',
    fictionalStaffNote: 'Simulated consultation notes saved. Appointment reminder queued.',
    createdAt: '2026-10-17T11:05:00Z'
  },
  {
    id: 'LEAD-105',
    leadName: 'Rachel O’Connor',
    contactEmail: 'rachel.oc@sample-demo.test',
    contactPhone: '(555) 319-7754',
    category: 'clinics',
    requestedService: 'General Consultation',
    enquiryDate: '2026-10-20',
    preferredDate: '2026-10-22',
    preferredTime: 'Early Afternoon (1:30 PM)',
    status: 'New',
    leadSource: 'Web Chatbot Assistant',
    notes: 'Seasonal allergy prescription check & routine vitals checkup.',
    fictionalStaffNote: 'Automated triage confirmed non-emergency. Placed in nurse practitioner queue.',
    createdAt: '2026-10-20T16:45:00Z'
  },
  {
    id: 'LEAD-106',
    leadName: 'Dr. Gregory Thorne',
    contactEmail: 'gregory.t@sample-demo.test',
    contactPhone: '(555) 551-9233',
    category: 'restaurants',
    requestedService: 'Chef’s Tasting Counter (5-Course)',
    enquiryDate: '2026-10-19',
    preferredDate: '2026-10-25',
    preferredTime: 'Evening (8:00 PM)',
    partySize: 2,
    status: 'Follow-up',
    leadSource: 'Organic Search',
    notes: 'Anniversary couple. Requested wine pairing information in advance.',
    fictionalStaffNote: 'Host responded with seasonal pairing sample menu.',
    createdAt: '2026-10-19T19:10:00Z'
  },
  {
    id: 'LEAD-107',
    leadName: 'Maya Patel',
    contactEmail: 'maya.p@sample-demo.test',
    contactPhone: '(555) 203-7711',
    category: 'gyms',
    requestedService: 'Personal Coaching Assessment (1:1)',
    enquiryDate: '2026-10-16',
    preferredDate: '2026-10-22',
    preferredTime: 'Evening (5:30 PM)',
    fitnessGoal: 'Functional Strength & Muscle Tone',
    status: 'Contact Required',
    leadSource: 'Referral From Member',
    notes: 'Returning to exercise after running hiatus; wants strength assessment.',
    fictionalStaffNote: 'Head trainer matched; waiting on calendar slot confirmation call.',
    createdAt: '2026-10-16T15:30:00Z'
  },
  {
    id: 'LEAD-108',
    leadName: 'Hannah Kim',
    contactEmail: 'hannah.k@sample-demo.test',
    contactPhone: '(555) 672-1099',
    category: 'salons',
    requestedService: 'Botanical Scalp & Steam Therapy',
    enquiryDate: '2026-10-20',
    preferredDate: '2026-10-24',
    preferredTime: 'Morning (11:00 AM)',
    preferredProvider: 'Chloe Dubois (Texture & Cutting Specialist)',
    status: 'New',
    leadSource: 'TikTok Video Link',
    notes: 'Inquired about Japanese scalp detox steam bath experience.',
    fictionalStaffNote: 'AI provided treatment overview. Follow-up task created for front desk.',
    createdAt: '2026-10-20T17:15:00Z'
  }
];

export const WORKFLOWS_DATA: Record<BusinessCategory, WorkflowStep[]> = {
  clinics: [
    {
      stepNumber: 1,
      title: 'Inbound Website Enquiry',
      category: 'clinics',
      trigger: 'Patient visits CarePoint website and submits general consult or checkup form.',
      action: 'Ingest payload via secure API endpoint with zero public medical record exposure.',
      simulatedOutput: 'Enquiry payload: { service: "Annual Checkup", date: "2026-10-24", source: "Web" }',
      technicalDetail: 'Sanitizes contact input, strips potential PHI tokens, and checks for non-emergency keyword indicators.',
      highlightKey: 'Inbound Capture'
    },
    {
      stepNumber: 2,
      title: 'Safety Check & Field Validation',
      category: 'clinics',
      trigger: 'Payload received by workflow engine.',
      action: 'Validates non-emergency status, phone number format, and provider specialty matching.',
      simulatedOutput: 'Validation status: PASSED (Non-emergency classification: ROUTINE)',
      technicalDetail: 'If emergency keywords (e.g. chest pain, shortness of breath) were detected, immediately triggers an urgent redirect to 911/ER.',
      highlightKey: 'Safety Validation'
    },
    {
      stepNumber: 3,
      title: 'Simulated Lead Record Created',
      category: 'clinics',
      trigger: 'Validation passed successfully.',
      action: 'Creates fictional CRM record with status: "New" or "Contact Required".',
      simulatedOutput: 'Record: LEAD-109 generated. Status: Contact Required.',
      technicalDetail: 'Stores in client pipeline state with metadata tags for provider schedule matching.',
      highlightKey: 'Lead Pipeline Integration'
    },
    {
      stepNumber: 4,
      title: 'Generate Contextual Response',
      category: 'clinics',
      trigger: 'CRM lead recorded.',
      action: 'Generates helpful automated message confirming receipt and explaining clinic hours and preparation steps.',
      simulatedOutput: 'Response preview: "Thank you for contacting CarePoint Clinic. Our intake coordinator will call you to confirm your slot."',
      technicalDetail: 'Appends safety disclaimers: formal confirmation is required before any visit is considered scheduled.',
      highlightKey: 'Instant AI Message'
    },
    {
      stepNumber: 5,
      title: 'Staff Follow-up Task Assignment',
      category: 'clinics',
      trigger: 'Automated receipt dispatched.',
      action: 'Queues high-priority follow-up item on reception dashboard for nurse or intake coordinator.',
      simulatedOutput: 'Task: "Call Julian Croft (555-234-8910) to confirm Dr. Jenkins consult availability."',
      technicalDetail: 'Ensures human clinical oversight is never bypassed for patient scheduling.',
      highlightKey: 'Staff Task Hand-off'
    }
  ],

  restaurants: [
    {
      stepNumber: 1,
      title: 'Reservation Request Ingestion',
      category: 'restaurants',
      trigger: 'Guest submits reservation request with party size, desired time, and dining notes.',
      action: 'Captures booking intent and maps against Urban Table fictional reservation rules.',
      simulatedOutput: 'Enquiry payload: { partySize: 8, date: "2026-10-25", time: "7:30 PM", seating: "Mezzanine" }',
      technicalDetail: 'Distinguishes between standard 2-4 person tables and large party banquet inquiries (>6 guests).',
      highlightKey: 'Inbound Reservation Request'
    },
    {
      stepNumber: 2,
      title: 'Rules & Table Availability Check',
      category: 'restaurants',
      trigger: 'Payload ingested by workflow engine.',
      action: 'Evaluates opening hours, party size thresholds, and dietary preparation notes.',
      simulatedOutput: 'Rules Check: Friday evening dinner within standard service window. Large party event rule applied.',
      technicalDetail: 'Parties of 8+ automatically route to Private Event coordinator instead of instant automated slot.',
      highlightKey: 'Business Rules Engine'
    },
    {
      stepNumber: 3,
      title: 'Simulated Request Creation',
      category: 'restaurants',
      trigger: 'Rules engine pass.',
      action: 'Logs simulated lead in pipeline with status: "New" and tags: "Party Size: 8".',
      simulatedOutput: 'Record: LEAD-110 stored in CRM. Source: Website Widget.',
      technicalDetail: 'Ensures no phantom booking occurs on third-party POS or table management software.',
      highlightKey: 'Pipeline Logging'
    },
    {
      stepNumber: 4,
      title: 'Instant Guest Acknowledgment',
      category: 'restaurants',
      trigger: 'Lead stored in system.',
      action: 'Prepares instant confirmation acknowledgment with parking information and dietary options summary.',
      simulatedOutput: 'Guest Message: "We received your request for 8 guests on Oct 25. Our host will confirm table placement shortly."',
      technicalDetail: 'Includes clear notice: "No real table is held until host confirmation."',
      highlightKey: 'Automated Guest Notice'
    },
    {
      stepNumber: 5,
      title: 'Host Stand Confirmation Queue',
      category: 'restaurants',
      trigger: 'Message sent.',
      action: 'Adds reservation request to front-of-house host stand queue with one-click approval simulation.',
      simulatedOutput: 'Host Action: "Verify table turn on Mezzanine Table 14; call guest to finalize preset menu."',
      technicalDetail: 'Prevents overbooking while maintaining a 3-minute turnaround for inbound inquiries.',
      highlightKey: 'Host Stand Triage'
    }
  ],

  gyms: [
    {
      stepNumber: 1,
      title: 'Trial Pass or Membership Inquiry',
      category: 'gyms',
      trigger: 'Prospective member submits trial pass request with chosen fitness interest.',
      action: 'Captures contact details and selected fitness goals (e.g. Strength, HIIT, Endurance).',
      simulatedOutput: 'Enquiry payload: { goal: "Endurance", preferredClass: "6:30 AM Conditioning", pass: "3-Day Trial" }',
      technicalDetail: 'Associates goal taxonomy with coach specializations for smart trainer routing.',
      highlightKey: 'Inbound Lead Triage'
    },
    {
      stepNumber: 2,
      title: 'Goal Mapping & Lead Scoring',
      category: 'gyms',
      trigger: 'Enquiry ingested.',
      action: 'Evaluates intent urgency (e.g. wants to begin this week vs general pricing question).',
      simulatedOutput: 'Lead Priority: HIGH (Urgent pass request for tomorrow morning).',
      technicalDetail: 'Automated workflow tags the lead for immediate same-day coach follow-up.',
      highlightKey: 'Intent Classification'
    },
    {
      stepNumber: 3,
      title: 'Simulated Lead Record Generation',
      category: 'gyms',
      trigger: 'Scoring complete.',
      action: 'Saves lead to FitCore Studio pipeline under "Contact Required" status.',
      simulatedOutput: 'Record: LEAD-111 created in local pipeline. Tagged: Morning HIIT Coach Queue.',
      technicalDetail: 'Stores in client-side state without external gym CRM API transmissions.',
      highlightKey: 'Member Pipeline Update'
    },
    {
      stepNumber: 4,
      title: 'Automated Welcome & Pass Guide',
      category: 'gyms',
      trigger: 'Lead saved.',
      action: 'Drafts simulated welcome SMS/email with locker room amenities, class schedule link, and arrival tips.',
      simulatedOutput: 'Message preview: "Welcome to FitCore Studio! Your 3-day trial request is received. Check out our morning schedule..."',
      technicalDetail: 'Explains what to bring (training shoes, water bottle) and how to check in at front desk.',
      highlightKey: 'Automated Onboarding'
    },
    {
      stepNumber: 5,
      title: 'Coach Assignment & Tour Scheduling',
      category: 'gyms',
      trigger: 'Welcome message drafted.',
      action: 'Assigns coach to conduct facility walk-through and 10-minute movement orientation.',
      simulatedOutput: 'Coach Task: "Coach Sarah notified. Prepare guest pass lanyard for Liam on Oct 21."',
      technicalDetail: 'Converts cold web visitor into high-engagement member touchpoint.',
      highlightKey: 'Coach Assignment'
    }
  ],

  salons: [
    {
      stepNumber: 1,
      title: 'Service & Stylist Consultation Inquiry',
      category: 'salons',
      trigger: 'Client selects service (e.g. Dimensional Balayage), preferred stylist, and target day.',
      action: 'Captures hair service type, estimated duration (e.g. 3 hours), and consultation notes.',
      simulatedOutput: 'Payload: { service: "Balayage", stylist: "Elena Vance", date: "2026-10-24", time: "2:00 PM" }',
      technicalDetail: 'Calculates block requirements (180 mins) against stylist specialty profiles.',
      highlightKey: 'Service Ingestion'
    },
    {
      stepNumber: 2,
      title: 'Stylist Availability & Patch Test Check',
      category: 'salons',
      trigger: 'Payload processed.',
      action: 'Evaluates requested stylist schedule and flags required patch test for major color transformations.',
      simulatedOutput: 'Rule triggered: High-lift color requires 48-hr patch test note for first-time guest.',
      technicalDetail: 'Ensures salon standards and allergen safety protocols are automatically highlighted.',
      highlightKey: 'Safety & Scheduling Rules'
    },
    {
      stepNumber: 3,
      title: 'Simulated Lead Record Creation',
      category: 'salons',
      trigger: 'Rules checked.',
      action: 'Creates lead record in pipeline with status: "New" or "Contact Required".',
      simulatedOutput: 'Record: LEAD-112 logged. Stylist: Elena Vance. Status: Contact Required.',
      technicalDetail: 'Populates salon appointment dashboard queue with requested time window.',
      highlightKey: 'Pipeline Insertion'
    },
    {
      stepNumber: 4,
      title: 'Personalized Consultation Preview',
      category: 'salons',
      trigger: 'Lead logged.',
      action: 'Generates automated message with styling preparation guidelines (e.g. arrive with clean dry hair, bring reference photos).',
      simulatedOutput: 'Message preview: "Hi Avery, Elena received your Balayage request! Please bring 2-3 inspiration photos..."',
      technicalDetail: 'Clearly states: "Appointment tentative pending stylist schedule confirmation."',
      highlightKey: 'Pre-Visit Consultation'
    },
    {
      stepNumber: 5,
      title: 'Front Desk Chair Allocation',
      category: 'salons',
      trigger: 'Notification drafted.',
      action: 'Prompts salon reception to finalize chair allocation and text guest to confirm exact start time.',
      simulatedOutput: 'Staff Queue: "Elena Vance chair 3 reserved tentatively. Call guest to confirm 2:00 PM appointment."',
      technicalDetail: 'Minimizes no-shows through structured automated reminders and personal outreach.',
      highlightKey: 'Front Desk Handoff'
    }
  ]
};

export const WEEKLY_ACTIVITY_DATA = [
  { day: 'Mon', date: 'Oct 07', total: 64, clinics: 22, restaurants: 18, gyms: 14, salons: 10 },
  { day: 'Tue', date: 'Oct 08', total: 78, clinics: 26, restaurants: 22, gyms: 18, salons: 12 },
  { day: 'Wed', date: 'Oct 09', total: 85, clinics: 31, restaurants: 24, gyms: 16, salons: 14 },
  { day: 'Thu', date: 'Oct 10', total: 92, clinics: 30, restaurants: 28, gyms: 20, salons: 14 },
  { day: 'Fri', date: 'Oct 11', total: 114, clinics: 34, restaurants: 42, gyms: 22, salons: 16 },
  { day: 'Sat', date: 'Oct 12', total: 128, clinics: 20, restaurants: 56, gyms: 28, salons: 24 },
  { day: 'Sun', date: 'Oct 13', total: 95, clinics: 12, restaurants: 48, gyms: 21, salons: 14 },
  { day: 'Mon', date: 'Oct 14', total: 72, clinics: 28, restaurants: 16, gyms: 16, salons: 12 },
  { day: 'Tue', date: 'Oct 15', total: 84, clinics: 30, restaurants: 24, gyms: 18, salons: 12 },
  { day: 'Wed', date: 'Oct 16', total: 90, clinics: 32, restaurants: 26, gyms: 18, salons: 14 },
  { day: 'Thu', date: 'Oct 17', total: 99, clinics: 33, restaurants: 31, gyms: 21, salons: 14 },
  { day: 'Fri', date: 'Oct 18', total: 122, clinics: 38, restaurants: 46, gyms: 22, salons: 16 },
  { day: 'Sat', date: 'Oct 19', total: 136, clinics: 22, restaurants: 60, gyms: 30, salons: 24 },
  { day: 'Sun', date: 'Oct 20', total: 104, clinics: 15, restaurants: 52, gyms: 22, salons: 15 }
];
