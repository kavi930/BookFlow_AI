import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_LEADS } from '../data/mockData';
import { BusinessCategory, LeadRecord, LeadStatus, NavigationTab } from '../types';

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
}

const STORAGE_KEY = 'bookflow_demo_leads_v2';

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

  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory>('clinics');
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | BusinessCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all');
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<LeadRecord | null>(null);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);

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
    } catch {
      // ignore
    }
    setLeads(INITIAL_LEADS);
    setSelectedLeadForDetail(null);
    addToast({
      title: 'Demo Data Reset',
      message: 'Restored original 8 sample leads. Local modifications cleared.',
      type: 'info'
    });
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
        message: 'You have explored all 6 stages of the BookFlow AI demo!',
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
        setIsInterestModalOpen
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
