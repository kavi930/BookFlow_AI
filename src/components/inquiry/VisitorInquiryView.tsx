import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Search,
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
  MessageSquare,
  PhoneCall,
  DollarSign,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  UserCheck,
  FileText,
  BadgeCheck,
  ArrowUpRight,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { INQUIRY_ARTICLES, generateInstantAnswer } from '../../data/inquiryKnowledge';
import { BusinessCategory, InquiryStatus, InquiryTopic, VisitorInquiry } from '../../types';

export const VisitorInquiryView: React.FC = () => {
  const {
    inquiries,
    submitInquiry,
    updateInquiryStatus,
    selectedInquiryForDetail,
    setSelectedInquiryForDetail,
    inquiryDraftQuestion,
    setInquiryDraftQuestion,
    setActiveTab,
    openAgentWidget
  } = useDemo();

  const [activeSubTab, setActiveSubTab] = useState<'ask' | 'topics' | 'submit' | 'tracker'>('ask');
  const [searchQuery, setSearchQuery] = useState(inquiryDraftQuestion || '');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<'all' | InquiryTopic>('all');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>('art-whatsapp');

  // Submit Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formBusiness, setFormBusiness] = useState('');
  const [formCategory, setFormCategory] = useState<BusinessCategory | 'other'>('clinics');
  const [formTopic, setFormTopic] = useState<InquiryTopic>('whatsapp');
  const [formUrgency, setFormUrgency] = useState<'exploring' | 'next_30_days' | 'urgent'>('next_30_days');
  const [formSubject, setFormSubject] = useState('');
  const [formQuestion, setFormQuestion] = useState('');
  const [justSubmittedId, setJustSubmittedId] = useState<string | null>(null);

  // Follow-up input for tracker detail
  const [followUpInput, setFollowUpInput] = useState('');

  // Sync draft question from context if provided
  useEffect(() => {
    if (inquiryDraftQuestion) {
      setSearchQuery(inquiryDraftQuestion);
      setFormQuestion(inquiryDraftQuestion);
      setFormSubject(
        inquiryDraftQuestion.length > 50
          ? `${inquiryDraftQuestion.slice(0, 47)}...`
          : inquiryDraftQuestion
      );
      // clear the draft so it doesn't continually overwrite
      setInquiryDraftQuestion('');
    }
  }, [inquiryDraftQuestion, setInquiryDraftQuestion]);

  // Compute live instant answer for live search query
  const liveAnswer = searchQuery.trim().length > 3
    ? generateInstantAnswer(searchQuery, formCategory)
    : null;

  const handlePredefinedQuestionClick = (q: string, topic?: InquiryTopic) => {
    setSearchQuery(q);
    if (topic) {
      setFormTopic(topic);
    }
    setActiveSubTab('ask');
  };

  const handleTransferToSubmit = () => {
    setFormQuestion(searchQuery);
    setFormSubject(searchQuery.length > 50 ? `${searchQuery.slice(0, 47)}...` : searchQuery);
    if (liveAnswer?.matchedTopic) {
      setFormTopic(liveAnswer.matchedTopic);
    }
    setActiveSubTab('submit');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formQuestion.trim()) return;

    const newTicketId = submitInquiry({
      visitorName: formName.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim() || undefined,
      businessName: formBusiness.trim() || undefined,
      category: formCategory,
      topic: formTopic,
      subject: formSubject.trim() || 'General Capability Inquiry',
      question: formQuestion.trim(),
      urgency: formUrgency
    });

    setJustSubmittedId(newTicketId);
    // Auto-select the newly created ticket
    const createdInquiry = inquiries.find((i) => i.id === newTicketId);
    if (createdInquiry) {
      setSelectedInquiryForDetail(createdInquiry);
    }
    setActiveSubTab('tracker');
  };

  const handleAddFollowUpNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiryForDetail || !followUpInput.trim()) return;
    updateInquiryStatus(
      selectedInquiryForDetail.id,
      selectedInquiryForDetail.status,
      `Visitor Note: ${followUpInput.trim()}`
    );
    setFollowUpInput('');
  };

  const filteredArticles = selectedTopicFilter === 'all'
    ? INQUIRY_ARTICLES
    : INQUIRY_ARTICLES.filter((a) => a.topic === selectedTopicFilter);

  const topicIconMap: Record<InquiryTopic, React.ReactNode> = {
    pricing: <DollarSign className="w-4 h-4 text-[#2D5A43]" />,
    whatsapp: <MessageSquare className="w-4 h-4 text-[#25D366]" />,
    calendar: <Calendar className="w-4 h-4 text-[#3B82F6]" />,
    voice_call: <PhoneCall className="w-4 h-4 text-[#D97706]" />,
    setup: <Layers className="w-4 h-4 text-[#8B5CF6]" />,
    security: <ShieldCheck className="w-4 h-4 text-[#059669]" />,
    custom_workflow: <RefreshCw className="w-4 h-4 text-[#0D9488]" />
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Header Zone */}
      <section className="bg-white border border-[#E7E2DA] rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#EBF1EC] text-[#1E3A2F] text-xs font-semibold tracking-wide uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Visitor Inquiry Desk & Knowledge Base</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1D1C]">
              Ask Anything About BookFlow_AI
            </h1>
            <p className="text-sm sm:text-base text-[#525E5A] leading-relaxed">
              Explore immediate architectural answers, examine calendar and WhatsApp integration specifications, or submit a custom inquiry to receive a tracked resolution and review it live in your CRM pipeline.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2.5 shrink-0">
            <button
              onClick={() => {
                setActiveSubTab('submit');
                setFormSubject('');
                setFormQuestion('');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A2F] hover:bg-[#274E3F] rounded-md transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Custom Inquiry</span>
            </button>
            <button
              onClick={() => openAgentWidget('whatsapp')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#075E54] bg-[#E7FFDB] hover:bg-[#D4F5C3] border border-[#BDE8AB] rounded-md transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Ask Live WhatsApp Agent</span>
            </button>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="mt-8 pt-4 border-t border-[#E7E2DA] flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveSubTab('ask')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${
              activeSubTab === 'ask'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-[#F5F2EB] text-[#55635F] hover:text-[#1A1D1C] hover:bg-[#EAE5DC]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Instant Q&A Engine</span>
          </button>
          <button
            onClick={() => setActiveSubTab('topics')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${
              activeSubTab === 'topics'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-[#F5F2EB] text-[#55635F] hover:text-[#1A1D1C] hover:bg-[#EAE5DC]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Topics ({INQUIRY_ARTICLES.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('submit')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${
              activeSubTab === 'submit'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-[#F5F2EB] text-[#55635F] hover:text-[#1A1D1C] hover:bg-[#EAE5DC]'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Inquiry Form</span>
          </button>
          <button
            onClick={() => setActiveSubTab('tracker')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${
              activeSubTab === 'tracker'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-[#F5F2EB] text-[#55635F] hover:text-[#1A1D1C] hover:bg-[#EAE5DC]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Tracked Inquiries</span>
            <span className="px-1.5 py-0.2 rounded bg-[#EBF1EC] text-[#1E3A2F] font-mono text-[10px]">
              {inquiries.length}
            </span>
          </button>
        </div>
      </section>

      {/* 2. SUBTAB: Instant Q&A Engine */}
      {activeSubTab === 'ask' && (
        <div className="space-y-6">
          <section className="bg-white border border-[#E7E2DA] rounded-xl p-6 sm:p-8">
            <label htmlFor="visitor-ask-input" className="block text-xs font-mono tracking-wider uppercase text-[#737E7A] font-semibold mb-2">
              Natural Language Inquirer
            </label>
            <div className="relative">
              <Search className="w-5 h-5 text-[#86928E] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="visitor-ask-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask anything (e.g. Does BookFlow_AI prevent double-booking? Can we use our existing WhatsApp number? How much does it cost?)"
                className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base bg-[#FAF8F5] border border-[#DCD5C9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:border-[#1E3A2F] text-[#1A1D1C] placeholder:text-[#8D9995]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#7B8783] hover:text-[#1A1D1C] px-2 py-1 rounded bg-[#EAE5DC]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Suggested Queries */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#737E7A] font-medium mr-1">Popular questions:</span>
              {[
                { label: 'Can we use our existing WhatsApp number?', topic: 'whatsapp' as InquiryTopic },
                { label: 'How does Google Calendar sync work?', topic: 'calendar' as InquiryTopic },
                { label: 'What is monthly pricing & setup fee?', topic: 'pricing' as InquiryTopic },
                { label: 'Can it answer phone calls after hours?', topic: 'voice_call' as InquiryTopic },
                { label: 'Is patient & customer data encrypted?', topic: 'security' as InquiryTopic }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePredefinedQuestionClick(item.label, item.topic)}
                  className="text-xs px-2.5 py-1 rounded-md bg-[#F5F2EB] hover:bg-[#EAE5DC] text-[#3F4B47] border border-[#E0D9CD] transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </section>

          {/* Live Instant Answer Output */}
          {liveAnswer && (
            <section className="bg-white border-2 border-[#1E3A2F]/20 rounded-xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#EBF1EC] text-[#1E3A2F] px-3 py-1 rounded-bl-lg text-[11px] font-mono font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Verified Resolution</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-[#EBF1EC]">
                    {topicIconMap[liveAnswer.matchedTopic]}
                  </span>
                  <h3 className="text-lg font-bold text-[#1A1D1C]">
                    {liveAnswer.headline}
                  </h3>
                </div>

                <div className="text-sm sm:text-base text-[#3A4541] leading-relaxed bg-[#FAF8F5] p-4 rounded-lg border border-[#E7E2DA]">
                  {liveAnswer.answer}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#2D5A43] bg-[#EBF1EC] px-2.5 py-1 rounded border border-[#CCDCD0]">
                      {liveAnswer.technicalBadge}
                    </span>
                    <span className="text-xs text-[#717E79]">
                      Confidence: {Math.round(liveAnswer.confidence * 100)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleTransferToSubmit}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#1E3A2F] hover:bg-[#274E3F] rounded-md transition-colors"
                    >
                      <span>Submit as Tracked Ticket</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-[#6C7974] italic pt-1">
                  💡 {liveAnswer.suggestedAction}
                </div>
              </div>
            </section>
          )}

          {/* Three Feature Highlight Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E7E2DA] rounded-lg p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#1E3A2F] font-semibold text-sm">
                <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
                <span>Zero Hallucinations</span>
              </div>
              <p className="text-xs text-[#525E5A] leading-relaxed">
                BookFlow_AI’s responses are grounded strictly in your live business rules, verified prices, and real staff availability calendars.
              </p>
            </div>

            <div className="bg-white border border-[#E7E2DA] rounded-lg p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#1E3A2F] font-semibold text-sm">
                <Calendar className="w-4 h-4 text-[#3B82F6]" />
                <span>Real-Time Calendar Holds</span>
              </div>
              <p className="text-xs text-[#525E5A] leading-relaxed">
                Before confirming any customer slot, BookFlow_AI locks time directly in Google Calendar or Outlook to prevent accidental double-booking.
              </p>
            </div>

            <div className="bg-white border border-[#E7E2DA] rounded-lg p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#1E3A2F] font-semibold text-sm">
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Human Handover Ready</span>
              </div>
              <p className="text-xs text-[#525E5A] leading-relaxed">
                Any customer request flagged as sensitive or non-standard triggers immediate staff notifications with a structured intake summary.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUBTAB: Curated Topics & Architecture */}
      {activeSubTab === 'topics' && (
        <div className="space-y-6">
          {/* Topic Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Topics' },
              { id: 'pricing', label: 'Pricing & Plans' },
              { id: 'whatsapp', label: 'WhatsApp API' },
              { id: 'calendar', label: 'Calendar Sync' },
              { id: 'voice_call', label: 'Voice Call Agent' },
              { id: 'setup', label: 'Setup & Onboarding' },
              { id: 'security', label: 'Security & Privacy' },
              { id: 'custom_workflow', label: 'Workflows & Webhooks' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTopicFilter(tab.id as 'all' | InquiryTopic)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedTopicFilter === tab.id
                    ? 'bg-[#1E3A2F] text-white'
                    : 'bg-white border border-[#E0D9CD] text-[#55635F] hover:text-[#1A1D1C] hover:bg-[#F5F2EB]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Articles Accordion List */}
          <div className="space-y-4">
            {filteredArticles.map((article) => {
              const isExpanded = expandedArticleId === article.id;
              return (
                <div
                  key={article.id}
                  className="bg-white border border-[#E7E2DA] rounded-xl overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setExpandedArticleId(isExpanded ? null : article.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-[#EBF1EC]">
                          {topicIconMap[article.topic]}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#737E7A]">
                          {article.topic.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#1A1D1C]">
                        {article.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#55635F]">
                        {article.shortSummary}
                      </p>
                    </div>

                    <div className="shrink-0 p-1 text-[#788581]">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#F0EBE3] space-y-5 bg-[#FAF8F5]/50">
                      <div className="text-sm text-[#2D3834] leading-relaxed">
                        {article.detailedResolution}
                      </div>

                      {/* Technical Specs Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-lg border border-[#E7E2DA]">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#76827E]">Architecture</div>
                          <div className="text-xs font-semibold text-[#1A1D1C] mt-0.5">{article.technicalSpecs.badge}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#76827E]">Protocol / Engine</div>
                          <div className="text-xs font-semibold text-[#1A1D1C] mt-0.5">{article.technicalSpecs.protocol}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#76827E]">Response Latency</div>
                          <div className="text-xs font-semibold text-[#2D5A43] mt-0.5">{article.technicalSpecs.latency}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#76827E]">Security Level</div>
                          <div className="text-xs font-semibold text-[#1A1D1C] mt-0.5">{article.technicalSpecs.compliance}</div>
                        </div>
                      </div>

                      {/* Sample Questions & Inquire Action */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                        <div className="space-y-1">
                          <span className="text-xs font-medium text-[#737E7A]">Visitors frequently ask:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {article.sampleQuestions.map((q, idx) => (
                              <button
                                key={idx}
                                onClick={() => handlePredefinedQuestionClick(q, article.topic)}
                                className="text-xs px-2.5 py-1 rounded bg-white hover:bg-[#EAE5DC] text-[#3D4744] border border-[#DDD5C7] transition-colors"
                              >
                                {q}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setFormTopic(article.topic);
                            setFormSubject(article.title);
                            setFormQuestion(`Inquiry regarding ${article.title}: `);
                            setActiveSubTab('submit');
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1E3A2F] hover:bg-[#274E3F] rounded-md transition-colors shrink-0"
                        >
                          <span>Ask Custom Question</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. SUBTAB: Submit Custom Inquiry Form */}
      {activeSubTab === 'submit' && (
        <section className="bg-white border border-[#E7E2DA] rounded-xl p-6 sm:p-8">
          <div className="max-w-2xl mb-6 space-y-1">
            <h2 className="text-xl font-bold text-[#1A1D1C]">Submit a Structured Visitor Inquiry</h2>
            <p className="text-xs sm:text-sm text-[#55635F]">
              Enter your specific question, integration constraint, or business volume. Our system logs a live ticket, provides an instant automated assessment, and mirrors the record to your CRM pipeline for testing.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#4B5753] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Dr. Jennifer Hayes"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DCD5C9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A2F] text-[#1A1D1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4B5753] mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="e.g. jennifer@hayesmedical.com"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DCD5C9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A2F] text-[#1A1D1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4B5753] mb-1">
                  Phone / WhatsApp (Optional for SMS test)
                </label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 345-6789"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DCD5C9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A2F] text-[#1A1D1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4B5753] mb-1">
                  Business / Practice Name
                </label>
                <input
                  type="text"
                  value={formBusiness}
                  onChange={(e) => setFormBusiness(e.target.value)}
                  placeholder="e.g. Hayes Integrative Clinic"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DCD5C9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A2F] text-[#1A1D1C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#4B5753] mb-1">
                  Business Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as BusinessCategory | 'other')}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DCD5C9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A2F] text-[#1A1D1C]"
                >
                  <option value="clinics">Clinics & Healthcare</option>
                  <option value="restaurants">Restaurants & Hospitality</option>
                  <option value="gyms">Gyms & Fitness Studios</option>
                  <option value="salons">Salons & Spas</option>
                  <option value="other">Other / Multi-Location</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4B5753] mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={formTopic}
                  onChange={(e) => setFormTopic(e.target.value as InquiryTopic)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DCD5C9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A2F] text-[#1A1D1C]"
                >
                  <option value="whatsapp">WhatsApp Business API</option>
                  <option value="calendar">Calendar Sync (Google/Outlook)</option>
                  <option value="voice_call">Voice Call Reception</option>
                  <option value="pricing">Pricing & ROI Plans</option>
                  <option value="setup">Setup & 48-Hour Onboarding</option>
                  <option value="security">Security & GDPR / HIPAA</option>
                  <option value="custom_workflow">Custom Workflows & Webhooks</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4B5753] mb-1">
                  Timeline / Urgency
                </label>
                <select
                  value={formUrgency}
                  onChange={(e) => setFormUrgency(e.target.value as 'exploring' | 'next_30_days' | 'urgent')}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DCD5C9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A2F] text-[#1A1D1C]"
                >
                  <option value="exploring">Just Exploring Options</option>
                  <option value="next_30_days">Deploy in Next 30 Days</option>
                  <option value="urgent">Immediate / High Priority</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4B5753] mb-1">
                Inquiry Subject *
              </label>
              <input
                type="text"
                required
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                placeholder="e.g. Can we connect BookFlow_AI to both our Google Calendar and Cliniko system?"
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DCD5C9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A2F] text-[#1A1D1C]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4B5753] mb-1">
                Detailed Question or Specific Requirements *
              </label>
              <textarea
                required
                rows={4}
                value={formQuestion}
                onChange={(e) => setFormQuestion(e.target.value)}
                placeholder="Describe your current enquiry volume, number of providers/chairs/tables, and any specific requirements..."
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DCD5C9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A2F] text-[#1A1D1C]"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#E7E2DA]">
              <div className="text-xs text-[#737E7A] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
                <span>Ticket is created locally, evaluated immediately, and mirrored in the CRM tab.</span>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#1E3A2F] hover:bg-[#274E3F] rounded-md shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry & Generate Ticket</span>
              </button>
            </div>
          </form>
        </section>
      )}

      {/* 5. SUBTAB: Tracked Inquiries & Ticket Details */}
      {activeSubTab === 'tracker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inquiry List Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono uppercase text-[#737E7A] font-semibold">
                Logged Tickets ({inquiries.length})
              </span>
              <button
                onClick={() => {
                  setActiveSubTab('submit');
                  setFormSubject('');
                  setFormQuestion('');
                }}
                className="text-xs text-[#1E3A2F] font-medium hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>New Inquiry</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {inquiries.map((inq) => {
                const isSelected = selectedInquiryForDetail?.id === inq.id;
                const isNew = justSubmittedId === inq.id;
                return (
                  <button
                    key={inq.id}
                    onClick={() => setSelectedInquiryForDetail(inq)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-white border-[#1E3A2F] shadow-xs ring-1 ring-[#1E3A2F]'
                        : 'bg-white border-[#E7E2DA] hover:border-[#D5CEC2]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#1E3A2F]">
                          {inq.id}
                        </span>
                        {isNew && (
                          <span className="px-1.5 py-0.5 rounded bg-[#EBF1EC] text-[#1E3A2F] font-mono text-[9px] uppercase font-bold animate-pulse">
                            Just Created
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          inq.status === 'Resolution Provided'
                            ? 'bg-[#EBF1EC] text-[#1E3A2F] border-[#CCDCD0]'
                            : inq.status === 'Follow-up Scheduled'
                            ? 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]'
                            : 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-[#1A1D1C] truncate mb-1">
                      {inq.subject}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#737E7A]">
                      <span className="truncate">{inq.visitorName}</span>
                      <span className="font-mono shrink-0">{inq.createdAt.split(' ')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inquiry Detail Column */}
          <div className="lg:col-span-7">
            {selectedInquiryForDetail ? (
              <div className="bg-white border border-[#E7E2DA] rounded-xl p-6 sm:p-7 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7E2DA]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-[#1E3A2F]">
                        {selectedInquiryForDetail.id}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#F5F2EB] text-[#55635F]">
                        {selectedInquiryForDetail.category.toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-[#1A1D1C] mt-1">
                      {selectedInquiryForDetail.subject}
                    </h2>
                  </div>

                  {/* Status Switcher (Simulated) */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-[#737E7A]">Status:</label>
                    <select
                      value={selectedInquiryForDetail.status}
                      onChange={(e) =>
                        updateInquiryStatus(
                          selectedInquiryForDetail.id,
                          e.target.value as InquiryStatus,
                          `Status changed to ${e.target.value}`
                        )
                      }
                      className="text-xs font-medium px-2.5 py-1 bg-[#FAF8F5] border border-[#DCD5C9] rounded-md focus:outline-none text-[#1A1D1C]"
                    >
                      <option value="Received">Received</option>
                      <option value="Triage Complete">Triage Complete</option>
                      <option value="Resolution Provided">Resolution Provided</option>
                      <option value="Follow-up Scheduled">Follow-up Scheduled</option>
                    </select>
                  </div>
                </div>

                {/* Visitor & Triage Metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8F5] p-3.5 rounded-lg border border-[#E7E2DA] text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#737E7A] block">Visitor</span>
                    <span className="font-medium text-[#1A1D1C] truncate block">{selectedInquiryForDetail.visitorName}</span>
                    <span className="text-[10px] text-[#717E79] truncate block">{selectedInquiryForDetail.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#737E7A] block">Assigned Lead</span>
                    <span className="font-medium text-[#1E3A2F] truncate block">{selectedInquiryForDetail.assignedSpecialist}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#737E7A] block">Turnaround SLA</span>
                    <span className="font-medium text-[#2D5A43] block">{selectedInquiryForDetail.estimatedResponseTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#737E7A] block">Urgency</span>
                    <span className="font-medium text-[#1A1D1C] capitalize block">{selectedInquiryForDetail.urgency.replace('_', ' ')}</span>
                  </div>
                </div>

                {/* The Inquiry Question */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#737E7A] font-semibold">
                    Submitted Inquiry / Requirement:
                  </span>
                  <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E7E2DA] text-xs sm:text-sm text-[#1A1D1C] leading-relaxed">
                    "{selectedInquiryForDetail.question}"
                  </div>
                </div>

                {/* Automated Architectural Resolution */}
                <div className="space-y-2 bg-[#EBF1EC]/60 border border-[#CCDCD0] p-4 sm:p-5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#2D5A43]" />
                      <span className="text-xs font-bold text-[#1E3A2F]">
                        Automated System Assessment & Resolution:
                      </span>
                    </div>
                    <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded text-[#2D5A43] border border-[#CCDCD0]">
                      {selectedInquiryForDetail.technicalBadge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2D3834] leading-relaxed">
                    {selectedInquiryForDetail.automatedAnswer}
                  </p>
                </div>

                {/* Follow-up Log / Notes */}
                {selectedInquiryForDetail.followUpNotes && selectedInquiryForDetail.followUpNotes.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-[#737E7A] font-semibold">
                      Triage Activity Log:
                    </span>
                    <div className="space-y-1.5">
                      {selectedInquiryForDetail.followUpNotes.map((note, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-[#48534F] bg-[#FAF8F5] px-3 py-2 rounded border border-[#E7E2DA] flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43] shrink-0 mt-0.5" />
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Follow-up Note Form */}
                <form onSubmit={handleAddFollowUpNote} className="pt-2 border-t border-[#E7E2DA]">
                  <label className="block text-xs font-medium text-[#4B5753] mb-1.5">
                    Add Follow-up Message or Visitor Clarification:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={followUpInput}
                      onChange={(e) => setFollowUpInput(e.target.value)}
                      placeholder="e.g. Also confirming we need integration with our existing Twilio phone line..."
                      className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DCD5C9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A2F] text-[#1A1D1C]"
                    />
                    <button
                      type="submit"
                      disabled={!followUpInput.trim()}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1E3A2F] hover:bg-[#274E3F] disabled:opacity-50 rounded-md transition-colors shrink-0"
                    >
                      Post Note
                    </button>
                  </div>
                </form>

                {/* Action Footnotes */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#737E7A]">
                  <button
                    onClick={() => setActiveTab('pipeline')}
                    className="inline-flex items-center gap-1.5 text-[#1E3A2F] font-semibold hover:underline"
                  >
                    <span>View this lead in CRM Lead Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => openAgentWidget('whatsapp')}
                    className="inline-flex items-center gap-1.5 text-[#075E54] font-semibold hover:underline"
                  >
                    <span>Discuss via WhatsApp Agent</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#E7E2DA] rounded-xl p-12 text-center text-[#737E7A] space-y-2">
                <FileText className="w-8 h-8 mx-auto text-[#B5AEA3]" />
                <p className="text-sm font-medium text-[#1A1D1C]">No Ticket Selected</p>
                <p className="text-xs">Select any inquiry ticket on the left to view the resolution and triage transcript.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
