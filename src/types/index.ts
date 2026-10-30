export type BusinessCategory = 'clinics' | 'restaurants' | 'gyms' | 'salons';

export type LeadStatus = 'New' | 'Contact Required' | 'Follow-up' | 'Completed';

export interface LeadRecord {
  id: string;
  leadName: string;
  contactEmail: string;
  contactPhone: string;
  category: BusinessCategory;
  requestedService: string;
  enquiryDate: string;
  preferredDate?: string;
  preferredTime?: string;
  partySize?: number;
  fitnessGoal?: string;
  preferredProvider?: string;
  status: LeadStatus;
  leadSource: string;
  notes: string;
  fictionalStaffNote?: string;
  createdAt: string;
}

export interface BusinessService {
  id: string;
  name: string;
  priceOrType: string;
  duration?: string;
  description: string;
}

export interface BusinessProfile {
  category: BusinessCategory;
  businessName: string;
  tagline: string;
  description: string;
  fictionalHours: string;
  fictionalLocation: string;
  disclaimer: string;
  services: BusinessService[];
  staffOrProviders?: string[];
  fitnessGoals?: string[];
  sampleQuestions: {
    question: string;
    answer: string;
    intent: string;
  }[];
  sampleLeadDefaults: {
    service: string;
    sampleName: string;
    sampleEmail: string;
    samplePhone: string;
    sampleNotes: string;
  };
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  category: BusinessCategory;
  trigger: string;
  action: string;
  simulatedOutput: string;
  technicalDetail: string;
  highlightKey: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category: BusinessCategory;
  matchedIntent?: string;
}

export type NavigationTab =
  | 'overview'
  | 'demos'
  | 'assistant'
  | 'pipeline'
  | 'workflows'
  | 'impact'
  | 'inquiries'
  | 'about';

export interface ImpactParameters {
  enquiriesPerMonth: number;
  minutesPerEnquiry: number;
  automationHandlingPercent: number;
  monthlySoftwareCost: number;
  hourlyLaborCost: number;
}

export type InquiryStatus = 'Received' | 'Triage Complete' | 'Resolution Provided' | 'Follow-up Scheduled';

export type InquiryTopic =
  | 'pricing'
  | 'whatsapp'
  | 'calendar'
  | 'voice_call'
  | 'setup'
  | 'security'
  | 'custom_workflow';

export interface VisitorInquiry {
  id: string; // e.g. INQ-4819
  visitorName: string;
  email: string;
  phone?: string;
  businessName?: string;
  category: BusinessCategory | 'other';
  topic: InquiryTopic | 'general';
  subject: string;
  question: string;
  urgency: 'exploring' | 'next_30_days' | 'urgent';
  status: InquiryStatus;
  automatedAnswer: string;
  assignedSpecialist: string;
  createdAt: string;
  estimatedResponseTime: string;
  technicalBadge: string;
  followUpNotes?: string[];
}

