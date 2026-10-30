import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_LEADS } from '../data/mockData';
import { INITIAL_VISITOR_INQUIRIES, generateInstantAnswer } from '../data/inquiryKnowledge';
import {
  BusinessCategory,
  InquiryStatus,
  InquiryTopic,
  LeadRecord,
  LeadStatus,
  NavigationTab,
  VisitorInquiry
} from '../types';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface DemoContextType {
  leads: LeadRecord[];
  selectedCategory: BusinessCategory;
  setSelectedCategory: (category: BusinessCategory) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: 'all' | BusinessCategory;
  setCategoryFilter: (cat: 'all' | BusinessCategory) => void;
  statusFilter: 'all' | LeadStatus;
  setStatusFilter: (status: 'all' | LeadStatus) => void;
  selectedLeadForDetail: LeadRecord | null;
  setSelectedLeadForDetail: (lead: LeadRecord | null) => void;
  addLead: (newLead: Omit<LeadRecord, 'id' | 'createdAt'>) => string;
  updateLeadStatus: (id: string, status: LeadStatus, fictionalStaffNote?: string) => void;
  deleteLead: (id: string) => void;
  resetDemoData: () => void;

  // Visitor Inquiry System
  inquiries: VisitorInquiry[];
  submitInquiry: (inquiryData: {
    visitorName: string;
    email: string;
    phone?: string;
    businessName?: string;
    category: BusinessCategory | 'other';
    topic: InquiryTopic | 'general';
    subject: string;
    question: string;
    urgency: 'exploring' | 'next_30_days' | 'urgent';
  }) => string;
  updateInquiryStatus: (id: string, status: InquiryStatus, note?: string) => void;
  selectedInquiryForDetail: VisitorInquiry | null;
  setSelectedInquiryForDetail: (inquiry: VisitorInquiry | null) => void;
  inquiryDraftQuestion: string;
  setInquiryDraftQuestion: (q: string) => void;
  openInquiryWithQuestion: (q: string, topic?: InquiryTopic) => void;

  guidedTour: {
    isActive: boolean;
    currentStep: number;
    startTour: () => void;
    nextStep: () => void;
    prevStep: () => void;
    dismissTour: () => void;
    goToStep: (stepNumber: number) => void;
  };
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
  isInterestModalOpen: boolean;
  setIsInterestModalOpen: (open: boolean) => void;
  isAgentWidgetOpen: boolean;
  setIsAgentWidgetOpen: (open: boolean) => void;
  agentWidgetMode: 'whatsapp' | 'call';
  setAgentWidgetMode: (mode: 'whatsapp' | 'call') => void;
  openAgentWidget: (mode?: 'whatsapp' | 'call') => void;
}

const STORAGE_KEY = 'bookflow_demo_leads_v2';
const INQUIRIES_STORAGE_KEY = 'bookflow_visitor_inquiries_v1';


const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<LeadRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // localStorage may fail in hermetic sandboxes; gracefully fallback
    }
    return INITIAL_LEADS;
  });

  const [inquiries, setInquiries] = useState<VisitorInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback gracefully
    }
    return INITIAL_VISITOR_INQUIRIES;
  });

  const [selectedInquiryForDetail, setSelectedInquiryForDetail] = useState<VisitorInquiry | null>(null);
  const [inquiryDraftQuestion, setInquiryDraftQuestion] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory>('clinics');
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | BusinessCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all');
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<LeadRecord | null>(null);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [isAgentWidgetOpen, setIsAgentWidgetOpen] = useState(false);
  const [agentWidgetMode, setAgentWidgetMode] = useState<'whatsapp' | 'call'>('whatsapp');

  const openAgentWidget = (mode?: 'whatsapp' | 'call') => {
    if (mode) setAgentWidgetMode(mode);
    setIsAgentWidgetOpen(true);
  };

  // Guided Walkthrough state (6 steps)
  const [guidedTourActive, setGuidedTourActive] = useState(false);
  const [guidedStep, setGuidedStep] = useState(1);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch {
      // Ignore storage errors safely
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
    } catch {
      // Ignore storage errors safely
    }
  }, [inquiries]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };


  const addLead = (leadData: Omit<LeadRecord, 'id' | 'createdAt'>): string => {
    const newId = `LEAD-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord: LeadRecord = {
      ...leadData,
      id: newId,
      createdAt: new Date().toISOString()
    };

    setLeads((prev) => [newRecord, ...prev]);
    addToast({
      title: 'Simulated Lead Captured',
      message: `${newRecord.leadName} added to Lead Pipeline (${newRecord.requestedService}).`,
      type: 'success'
    });

    return newId;
  };

  const updateLeadStatus = (id: string, status: LeadStatus, fictionalStaffNote?: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === id) {
          const updated = {
            ...lead,
            status,
            fictionalStaffNote: fictionalStaffNote || lead.fictionalStaffNote
          };
          if (selectedLeadForDetail?.id === id) {
            setSelectedLeadForDetail(updated);
          }
          return updated;
        }
        return lead;
      })
    );
    addToast({
      title: 'Status Updated (Simulated)',
      message: `Lead ${id} marked as "${status}".`,
      type: 'info'
    });
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (selectedLeadForDetail?.id === id) {
      setSelectedLeadForDetail(null);
    }
    addToast({
      title: 'Lead Removed (Demo)',
      message: `Simulated record ${id} removed from session view.`,
      type: 'warning'
    });
  };

  const resetDemoData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(INQUIRIES_STORAGE_KEY);
    } catch {
      // ignore
    }
    setLeads(INITIAL_LEADS);
    setInquiries(INITIAL_VISITOR_INQUIRIES);
    setSelectedLeadForDetail(null);
    setSelectedInquiryForDetail(null);
    addToast({
      title: 'Demo Data Reset',
      message: 'Restored original leads and sample visitor inquiries.',
      type: 'info'
    });
  };

  const submitInquiry = (inquiryData: {
    visitorName: string;
    email: string;
    phone?: string;
    businessName?: string;
    category: BusinessCategory | 'other';
    topic: InquiryTopic | 'general';
    subject: string;
    question: string;
    urgency: 'exploring' | 'next_30_days' | 'urgent';
  }): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `INQ-${randomNum}`;

    const instantAns = generateInstantAnswer(inquiryData.question, inquiryData.category);

    const specialists = [
      'Rachel Vance (Senior Solutions Architect)',
      'Julian Croft (Enterprise Onboarding Lead)',
      'Marcus Sterling (Operations & Workflow Architecture)',
      'Dr. Elena Rostova (Practice Integration)'
    ];
    const specialist = specialists[Math.floor(Math.random() * specialists.length)];

    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newInquiry: VisitorInquiry = {
      id: newId,
      ...inquiryData,
      status: 'Triage Complete',
      automatedAnswer: instantAns.answer,
      assignedSpecialist: specialist,
      createdAt: dateFormatted,
      estimatedResponseTime: inquiryData.urgency === 'urgent' ? 'Under 1 hour' : 'Under 4 hours',
      technicalBadge: instantAns.technicalBadge,
      followUpNotes: [
        `Inquiry received and triaged via Visitor Inquiry Desk.`,
        `Assigned to ${specialist}. Automated preliminary resolution generated.`
      ]
    };

    setInquiries((prev) => [newInquiry, ...prev]);

    // Mirror to Lead Pipeline
    const effectiveCategory: BusinessCategory = inquiryData.category === 'other' ? 'clinics' : inquiryData.category;
    addLead({
      leadName: inquiryData.visitorName,
      contactEmail: inquiryData.email,
      contactPhone: inquiryData.phone || '(555) 019-2831',
      category: effectiveCategory,
      requestedService: `Inquiry: ${inquiryData.subject.slice(0, 32)}`,
      enquiryDate: dateFormatted.split(' ')[0],
      status: 'New',
      leadSource: 'Visitor Inquiry Desk',
      notes: `[Ticket ${newId}] Topic: ${inquiryData.topic}. Visitor Question: ${inquiryData.question}`
    });

    addToast({
      title: 'Inquiry Registered',
      message: `Ticket ${newId} logged. View the automated analysis and tracking status.`,
      type: 'success'
    });

    return newId;
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus, note?: string) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          const notes = inq.followUpNotes ? [...inq.followUpNotes] : [];
          if (note) {
            notes.push(`[${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}] ${note}`);
          }
          const updated = { ...inq, status, followUpNotes: notes };
          if (selectedInquiryForDetail?.id === id) {
            setSelectedInquiryForDetail(updated);
          }
          return updated;
        }
        return inq;
      })
    );
    addToast({
      title: 'Inquiry Updated',
      message: `Ticket ${id} status set to "${status}".`,
      type: 'info'
    });
  };

  const openInquiryWithQuestion = (q: string, _topic?: InquiryTopic) => {
    setInquiryDraftQuestion(q);
    setActiveTab('inquiries');
  };

  const startTour = () => {
    setGuidedTourActive(true);
    setGuidedStep(1);
    setActiveTab('overview');
  };

  const dismissTour = () => {
    setGuidedTourActive(false);
  };

  const goToStep = (stepNumber: number) => {
    setGuidedStep(stepNumber);
    switch (stepNumber) {
      case 1:
        setActiveTab('overview');
        break;
      case 2:
        setActiveTab('assistant');
        break;
      case 3:
        setActiveTab('demos');
        break;
      case 4:
        setActiveTab('pipeline');
        break;
      case 5:
        setActiveTab('workflows');
        break;
      case 6:
        setActiveTab('impact');
        break;
      default:
        break;
    }
  };

  const nextStep = () => {
    if (guidedStep < 6) {
      goToStep(guidedStep + 1);
    } else {
      setGuidedTourActive(false);
      addToast({
        title: 'Walkthrough Completed',
        message: 'You have explored all 6 stages of the FlowPilot AI demo!',
        type: 'success'
      });
    }
  };

  const prevStep = () => {
    if (guidedStep > 1) {
      goToStep(guidedStep - 1);
    }
  };

  return (
    <DemoContext.Provider
      value={{
        leads,
        selectedCategory,
        setSelectedCategory,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        statusFilter,
        setStatusFilter,
        selectedLeadForDetail,
        setSelectedLeadForDetail,
        addLead,
        updateLeadStatus,
        deleteLead,
        resetDemoData,
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        selectedInquiryForDetail,
        setSelectedInquiryForDetail,
        inquiryDraftQuestion,
        setInquiryDraftQuestion,
        openInquiryWithQuestion,
        guidedTour: {
          isActive: guidedTourActive,
          currentStep: guidedStep,
          startTour,
          nextStep,
          prevStep,
          dismissTour,
          goToStep
        },
        toasts,
        addToast,
        dismissToast,
        isInterestModalOpen,
        setIsInterestModalOpen,
        isAgentWidgetOpen,
        setIsAgentWidgetOpen,
        agentWidgetMode,
        setAgentWidgetMode,
        openAgentWidget
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
