import { BusinessCategory, InquiryTopic, VisitorInquiry } from '../types';

export interface InquiryArticle {
  id: string;
  topic: InquiryTopic;
  title: string;
  shortSummary: string;
  detailedResolution: string;
  technicalSpecs: {
    badge: string;
    protocol: string;
    latency: string;
    compliance: string;
  };
  sampleQuestions: string[];
  suggestedAction: string;
}

export const INQUIRY_ARTICLES: InquiryArticle[] = [
  {
    id: 'art-pricing',
    topic: 'pricing',
    title: 'Commercial Model, Tiers & Implementation Costs',
    shortSummary: 'Straightforward monthly licensing with no per-conversation gouging or lock-in contracts.',
    detailedResolution:
      'FlowPilot AI operates on a predictable monthly subscription in Indian Rupees (INR) structured around active monthly enquiry volume rather than penalizing you for talking to customers. Standard plans start at ₹4,999/mo for single-location clinics, restaurants, and salons handling up to 500 automated conversations per month. Multi-branch practices and high-volume gyms utilize the Professional tier (₹9,999/mo) which includes voice call screening, multi-staff calendar routing, and custom CRM webhook dispatch. GST invoices provided with zero termination penalties or hidden data egress fees.',
    technicalSpecs: {
      badge: 'Transparent INR SaaS',
      protocol: 'Razorpay / UPI / Monthly or Annual (-20%)',
      latency: 'Instant provisioning',
      compliance: 'SOC 2 Type II partner billing'
    },
    sampleQuestions: [
      'How much does FlowPilot AI cost per month?',
      'Are there setup fees or onboarding charges?',
      'Can we cancel or pause during low seasons?'
    ],
    suggestedAction: 'Calculate your exact monthly labor savings in the Business Impact tab.'
  },
  {
    id: 'art-whatsapp',
    topic: 'whatsapp',
    title: 'WhatsApp Business API & Customer Communication',
    shortSummary: 'Native Meta Cloud API integration with your existing business telephone number.',
    detailedResolution:
      'FlowPilot AI connects directly to the official Meta Cloud WhatsApp Business API. You do not need to purchase a secondary phone number or discard your established brand contact; we facilitate number migration or connect via standard Cloud API credentials. The system supports 24/7 conversational availability, interactive quick-reply buttons, service catalogs, appointment booking carousels, and seamless human operator takeover whenever complex or sensitive inquiries occur.',
    technicalSpecs: {
      badge: 'Meta Cloud API v19.0',
      protocol: 'Webhooks + REST API',
      latency: '< 450ms automated response',
      compliance: 'Meta Business Verified & End-to-End Encrypted'
    },
    sampleQuestions: [
      'Can we keep our existing WhatsApp business phone number?',
      'What happens when a customer requests to speak with a human?',
      'Can it send automated booking reminders 24 hours prior?'
    ],
    suggestedAction: 'Test the live interactive WhatsApp agent from the floating widget or Overview.'
  },
  {
    id: 'art-calendar',
    topic: 'calendar',
    title: 'Two-Way Calendar Sync & Real-Time Availability Checking',
    shortSummary: 'Prevents double-bookings by checking actual provider schedules in real-time.',
    detailedResolution:
      'Rather than presenting static booking forms that result in scheduling conflicts, FlowPilot queries your live calendar API in real-time before offering available slots to clients. We support Google Calendar (Google Workspace), Microsoft 365 / Outlook, Apple iCloud Calendar, as well as specialized practice management tools like Cliniko, Mindbody, Fresha, and Toast via secure webhooks. Whenever a booking is confirmed, calendar holds are created immediately with customized buffer intervals.',
    technicalSpecs: {
      badge: 'Real-Time Bi-Directional',
      protocol: 'OAuth 2.0 / CalDAV / Google & Microsoft APIs',
      latency: '< 120ms conflict evaluation',
      compliance: 'Read/Write scoped tokens, no raw password storage'
    },
    sampleQuestions: [
      'Does FlowPilot work with our Google Workspace calendar?',
      'How does the system prevent double-booking our providers?',
      'Can staff members maintain individual schedules and break buffers?'
    ],
    suggestedAction: 'Explore the Clinics or Salons demo to view simulated calendar slots.'
  },
  {
    id: 'art-voice',
    topic: 'voice_call',
    title: 'Voice Call Agent, Automated Reception & After-Hours Intake',
    shortSummary: 'Natural voice answering with intelligent transcription, DTMF keypad support, and call forwarding.',
    detailedResolution:
      'For businesses receiving high inbound phone call volume during treatment hours or dinner rushes, FlowPilot provides a low-latency voice intake agent. Callers can verify opening hours, ask specific service questions, schedule a consultation, or request an urgent receptionist callback. The voice agent automatically transcribes caller requests, creates structured CRM pipeline records, and can dispatch instant SMS confirmations directly to the caller’s mobile.',
    technicalSpecs: {
      badge: 'Neural Speech Engine',
      protocol: 'WebRTC / SIP Trunking / Web Speech API',
      latency: '< 300ms audio turnaround',
      compliance: 'Zero voice recording retention without explicit caller consent'
    },
    sampleQuestions: [
      'Can FlowPilot answer our front-desk phone when staff are busy?',
      'How does the voice agent handle background noise or accents?',
      'Can urgent calls be forwarded immediately to a manager’s mobile?'
    ],
    suggestedAction: 'Click "Chat / Call Agent" in the navbar to test voice synthesis and call audio.'
  },
  {
    id: 'art-setup',
    topic: 'setup',
    title: 'Onboarding Timeline, Configuration & Custom Training',
    shortSummary: 'Turnkey deployment within 48 to 72 hours with full custom knowledge base ingestion.',
    detailedResolution:
      'Onboarding requires zero engineering overhead from your team. During setup, our team ingests your service menu, pricing tables, provider schedules, cancellation policies, and business FAQs. We configure your automated messaging tone to mirror your brand voice perfectly. Most single-location businesses go live within 48 hours following a brief 20-minute alignment walk-through.',
    technicalSpecs: {
      badge: '48-Hour Turnkey Deployment',
      protocol: 'Assisted Setup & Zero Code Required',
      latency: '20-min staff training session',
      compliance: 'Dedicated onboarding specialist assigned'
    },
    sampleQuestions: [
      'How long does it take from signup to live deployment?',
      'Do we need developers or technical staff on our end?',
      'Can we update our prices and opening hours anytime?'
    ],
    suggestedAction: 'Submit an inquiry below with your business details to request a deployment estimate.'
  },
  {
    id: 'art-security',
    topic: 'security',
    title: 'Data Privacy, Security Architecture & Regulatory Compliance',
    shortSummary: 'Hermetic data isolation, end-to-end encryption, and strict GDPR/HIPAA alignment.',
    detailedResolution:
      'FlowPilot AI does not train public foundation models on private client records or customer messages. All customer inquiries, contact details, and booking logs are encrypted at rest using AES-256 and transmitted exclusively over TLS 1.3. For clinics, medical screening workflows are kept strictly non-diagnostic to ensure compliance with healthcare safety boundaries. Automated data retention and deletion schedules can be configured based on your jurisdiction.',
    technicalSpecs: {
      badge: 'Zero AI Model Training',
      protocol: 'AES-256 / TLS 1.3 / Strict RBAC',
      latency: 'Continuous audit logging',
      compliance: 'GDPR Article 28 DPA & HIPAA Security Principles'
    },
    sampleQuestions: [
      'Are customer conversations used to train AI models?',
      'Is patient data handled according to medical privacy regulations?',
      'Can we export or permanently delete customer data upon request?'
    ],
    suggestedAction: 'Review the Security & Reliability section on the Overview page.'
  },
  {
    id: 'art-workflow',
    topic: 'custom_workflow',
    title: 'Custom Automation Workflows & Webhook Dispatch',
    shortSummary: 'Deep integration with Make.com, Zapier, Webhooks, and proprietary ERPs.',
    detailedResolution:
      'Every event in FlowPilot—from an incoming WhatsApp message to a completed booking or cancellation—emits clean, standardized JSON webhooks. This enables custom integrations with your existing Point-of-Sale (Toast, Square, Clover), CRM (HubSpot, Salesforce), or automation hubs (Make.com, Zapier). Custom conditional routing rules can be tailored to dispatch SMS alerts to managers when high-value VIP leads submit requests.',
    technicalSpecs: {
      badge: 'Extensible Webhooks',
      protocol: 'HMAC-SHA256 Signed JSON Webhooks',
      latency: '< 200ms dispatch reliability',
      compliance: 'Automated retry mechanism with exponential backoff'
    },
    sampleQuestions: [
      'Can FlowPilot send leads to our existing CRM or Slack channel?',
      'Does it work with Make.com or Zapier automations?',
      'Can custom booking deposit rules be triggered before confirmation?'
    ],
    suggestedAction: 'Visit the Workflows tab to inspect simulated 5-step automation pipelines.'
  }
];

export const INITIAL_VISITOR_INQUIRIES: VisitorInquiry[] = [
  {
    id: 'INQ-9241',
    visitorName: 'Dr. Marcus Vance',
    email: 'm.vance@vancemedical.com',
    phone: '+1 (555) 438-9921',
    businessName: 'Vance Integrative Family Health',
    category: 'clinics',
    topic: 'calendar',
    subject: 'Multi-practitioner Google Calendar sync and patient intake screening',
    question:
      'We have 4 physicians and 2 nurse practitioners with distinct room assignments. Can FlowPilot check individual doctor calendars in real-time and ensure patients select only available routine checkup slots without medical advice risks?',
    urgency: 'next_30_days',
    status: 'Resolution Provided',
    automatedAnswer:
      'Yes, FlowPilot fully supports multi-provider calendar routing. Each clinician links their specific Google Workspace or Cliniko calendar. The intake engine filters available times by physician specialty and applies standard 15-minute sanitization buffers between appointments. All conversational intake adheres to non-diagnostic administrative screening.',
    assignedSpecialist: 'Rachel Vance (Healthcare Solutions)',
    createdAt: '2026-10-22 14:30',
    estimatedResponseTime: 'Resolution Provided',
    technicalBadge: 'Bi-Directional CalSync & Multi-Staff Routing',
    followUpNotes: [
      'Provider calendar mapping schema sent to Dr. Vance.',
      'Confirmed interest in 30-day sandbox pilot for 4 physicians.'
    ]
  },
  {
    id: 'INQ-8812',
    visitorName: 'Elena Rostova',
    email: 'elena@atelierhudson.com',
    phone: '+1 (555) 712-4091',
    businessName: 'Atelier Hudson Hair & Color Studio',
    category: 'salons',
    topic: 'whatsapp',
    subject: 'High-ticket balayage consultation intake via WhatsApp',
    question:
      'We require new clients to submit current hair photos and previous chemical history before booking 3-hour color appointments. Can the WhatsApp system prompt for images and hold tentative slots?',
    urgency: 'urgent',
    status: 'Follow-up Scheduled',
    automatedAnswer:
      'Absolutely. For salon workflows, FlowPilot prompts the client for hair length and service goal, asks for an optional reference photo, and flags high-lift chemical treatments for mandatory 48-hour patch test verification. The appointment is logged as "Contact Required" so senior colorists approve the time allocation before final confirmation.',
    assignedSpecialist: 'Marcus Sterling (Hospitality & Lifestyle)',
    createdAt: '2026-10-23 09:15',
    estimatedResponseTime: 'Follow-up Call: Today at 3:00 PM EST',
    technicalBadge: 'WhatsApp Media Ingestion & Rule-Based Routing',
    followUpNotes: [
      'Demo scheduled for salon manager on WhatsApp Business Cloud setup.',
      'Custom intake flow prepared for Balayage & Extension services.'
    ]
  },
  {
    id: 'INQ-7504',
    visitorName: 'David Chen',
    email: 'dchen@ironcoregyms.com',
    phone: '+1 (555) 321-8890',
    businessName: 'IronCore Strength & Performance',
    category: 'gyms',
    topic: 'pricing',
    subject: 'Enterprise tier pricing for 3 gym branch locations',
    question:
      'We operate 3 boutique strength facilities across the city with about 1,800 monthly trial inquiries. What is the licensing structure and can front desk trainers be alerted on Slack when someone requests a trial pass?',
    urgency: 'exploring',
    status: 'Triage Complete',
    automatedAnswer:
      'For a 3-location gym network handling ~1,800 monthly inquiries, our Multi-Location Professional tier covers all branches under a single unified dashboard with branch-specific WhatsApp routing. Webhooks dispatch new trial pass requests instantly to your team Slack channel or CRM within 200ms.',
    assignedSpecialist: 'Julian Croft (Enterprise Onboarding)',
    createdAt: '2026-10-23 11:45',
    estimatedResponseTime: 'Within 2 hours',
    technicalBadge: 'Multi-Branch Routing & Webhook Dispatch',
    followUpNotes: [
      'Proposal for 3 locations drafted (₹14,999/mo combined with dedicated webhook dispatcher).'
    ]
  }
];

export function generateInstantAnswer(query: string, category?: BusinessCategory | 'other'): {
  headline: string;
  answer: string;
  matchedTopic: InquiryTopic;
  technicalBadge: string;
  suggestedAction: string;
  confidence: number;
} {
  const q = query.toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('tier') || q.includes('subscription') || q.includes('how much') || q.includes('plan')) {
    return {
      headline: 'Simple, Transparent Subscription Pricing in INR',
      answer:
        'FlowPilot AI starts at ₹4,999/month for single locations (handling up to 500 automated conversations) and ₹9,999/month for multi-provider or high-volume facilities with voice screening. All plans include 24/7 WhatsApp automation, real-time calendar synchronization, and lead pipeline tracking with zero contract lock-ins.',
      matchedTopic: 'pricing',
      technicalBadge: 'Predictable Monthly INR SaaS · No Per-Message Fees',
      suggestedAction: 'You can test the interactive ROI & labor savings calculator in the Business Impact tab.',
      confidence: 0.95
    };
  }

  if (q.includes('whatsapp') || q.includes('chat') || q.includes('number') || q.includes('meta') || q.includes('message') || q.includes('text')) {
    return {
      headline: 'Official WhatsApp Business Cloud API Integration',
      answer:
        'FlowPilot connects directly to your verified Meta Business account and existing phone number. Customers message you naturally on WhatsApp, where FlowPilot checks real-time availability, answers routine questions, collects appointment preferences, and notifies your staff immediately.',
      matchedTopic: 'whatsapp',
      technicalBadge: 'Meta Cloud API v19.0 · 24/7 Availability',
      suggestedAction: 'Try the live WhatsApp conversation agent using the floating widget in the bottom right corner.',
      confidence: 0.94
    };
  }

  if (q.includes('calendar') || q.includes('google') || q.includes('outlook') || q.includes('schedule') || q.includes('slot') || q.includes('double') || q.includes('conflict')) {
    return {
      headline: 'Bi-Directional Calendar Synchronization & Conflict Prevention',
      answer:
        'FlowPilot links directly with Google Calendar, Microsoft Outlook / 365, and industry practice management tools. Before offering appointment slots to clients, the engine queries your live calendar in real-time, respecting custom buffer times and provider working hours to eliminate double-bookings.',
      matchedTopic: 'calendar',
      technicalBadge: 'Bi-Directional CalSync · <120ms Conflict Engine',
      suggestedAction: 'Explore the Business Demos view to see how slots are generated for clinics, salons, and gyms.',
      confidence: 0.96
    };
  }

  if (q.includes('call') || q.includes('voice') || q.includes('phone') || q.includes('speak') || q.includes('audio') || q.includes('reception')) {
    return {
      headline: 'Voice Call Agent & After-Hours Phone Intake',
      answer:
        'When front-desk staff are occupied or during after-hours, FlowPilot’s voice agent answers incoming calls, transcribes caller needs, verifies basic service details, and automatically logs the request into your lead pipeline with an immediate SMS confirmation to the caller.',
      matchedTopic: 'voice_call',
      technicalBadge: 'Low-Latency Neural Speech · DTMF & Call Forwarding',
      suggestedAction: 'Switch to the "Call Agent" tab in the interactive widget to test interactive audio calls.',
      confidence: 0.92
    };
  }

  if (q.includes('privacy') || q.includes('security') || q.includes('hipaa') || q.includes('gdpr') || q.includes('safe') || q.includes('encrypt') || q.includes('train')) {
    return {
      headline: 'Enterprise Data Security & Strict Privacy Boundaries',
      answer:
        'Your client conversations and business data are never used to train public foundation models. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). For medical clinics, the assistant maintains non-diagnostic triage boundaries to ensure patient safety and regulatory compliance.',
      matchedTopic: 'security',
      technicalBadge: 'AES-256 Encrypted · Zero Public Model Training · GDPR Aligned',
      suggestedAction: 'Check the Security & Reliability section on our Overview page for technical details.',
      confidence: 0.93
    };
  }

  if (q.includes('how long') || q.includes('setup') || q.includes('onboard') || q.includes('deploy') || q.includes('start') || q.includes('timeline')) {
    return {
      headline: 'Turnkey 48-Hour Onboarding & Zero Technical Overhead',
      answer:
        'Getting started takes 48 to 72 hours. Our onboarding team configures your service offerings, custom operating hours, calendar connections, and brand tone. Your staff only needs a 20-minute walkthrough to start managing inquiries in the clean web dashboard.',
      matchedTopic: 'setup',
      technicalBadge: '48-Hour Setup · Zero Code Required · Specialist Assigned',
      suggestedAction: 'Submit your inquiry below with your business details to reserve an onboarding window.',
      confidence: 0.91
    };
  }

  if (q.includes('crm') || q.includes('webhook') || q.includes('make') || q.includes('zapier') || q.includes('toast') || q.includes('cliniko') || q.includes('integration')) {
    return {
      headline: 'Universal Webhooks, Make.com & Practice Management Integrations',
      answer:
        'FlowPilot dispatches standardized JSON webhooks on every booking or inquiry update. It connects effortlessly to Make.com, Zapier, HubSpot, Slack, Toast POS, Mindbody, and Cliniko without requiring custom server infrastructure.',
      matchedTopic: 'custom_workflow',
      technicalBadge: 'HMAC Webhooks · Make.com Ready · REST API',
      suggestedAction: 'Check out the Workflows tab to view the step-by-step automation execution trace.',
      confidence: 0.9
    };
  }

  // Fallback answer tailored to category if provided
  const categoryLabel = category && category !== 'other' ? category : 'appointment-based';
  return {
    headline: 'Tailored Automation for Appointment-Driven Businesses',
    answer:
      `FlowPilot AI helps ${categoryLabel} businesses coordinate incoming customer inquiries across WhatsApp, phone calls, and web forms into confirmed bookings. Every request is verified against real provider schedules, saved into your CRM pipeline, and answered instantly without front-desk fatigue.`,
    matchedTopic: 'custom_workflow',
    technicalBadge: 'FlowPilot Unified Coordination Engine',
    suggestedAction: 'Submit a specific question below or click any of the curated topics to explore technical details.',
    confidence: 0.8
  };
}
