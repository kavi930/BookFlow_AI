import React, { useState } from 'react';
import {
  Send,
  RotateCcw,
  Bot,
  User,
  Info,
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Sparkle,
  ArrowRight,
  MessageSquare,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { BUSINESS_PROFILES } from '../../data/mockData';
import { BusinessCategory, ChatMessage } from '../../types';
import { WhatsAppChatAgent } from '../agent/WhatsAppChatAgent';
import { VoiceCallAgent } from '../agent/VoiceCallAgent';

interface PresetScenario {
  id: string;
  category: BusinessCategory;
  title: string;
  userPrompt: string;
}

const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'sc1',
    category: 'clinics',
    title: 'Weekend Hours (Clinic)',
    userPrompt: 'What are your weekend opening hours for urgent visits?'
  },
  {
    id: 'sc2',
    category: 'restaurants',
    title: 'Group Reservation (Restaurant)',
    userPrompt: 'What is the deposit policy for large parties of 8 or more?'
  },
  {
    id: 'sc3',
    category: 'gyms',
    title: 'Trial Pass (Gym)',
    userPrompt: 'What is included in the complimentary trial pass?'
  },
  {
    id: 'sc4',
    category: 'salons',
    title: 'Stylist Request (Salon)',
    userPrompt: 'Can I request a specific stylist like Elena Vance?'
  }
];

export const AIAssistantView: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setActiveTab } = useDemo();
  const profile = BUSINESS_PROFILES[selectedCategory];

  // Channel tab: whatsapp, call, web
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'call' | 'web'>('whatsapp');

  const getInitialMessages = (cat: BusinessCategory): ChatMessage[] => {
    const prof = BUSINESS_PROFILES[cat];
    return [
      {
        id: 'msg-init',
        sender: 'assistant',
        text: `Hello! I am the automated demonstration assistant for ${prof.businessName}. You can ask about our services, opening hours, booking policies, or pricing. How can I help you today?`,
        timestamp: 'Just now',
        category: cat,
        matchedIntent: 'greeting'
      }
    ];
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages(selectedCategory));
  const [inputQuestion, setInputQuestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCategoryChange = (cat: BusinessCategory) => {
    setSelectedCategory(cat);
    setMessages(getInitialMessages(cat));
    setInputQuestion('');
  };

  // Deterministic local response matcher for Web FAQ
  const generateSimulatedResponse = (query: string, cat: BusinessCategory): string => {
    const lower = query.toLowerCase().trim();
    const prof = BUSINESS_PROFILES[cat];

    for (const sq of prof.sampleQuestions) {
      if (lower.includes(sq.question.toLowerCase().slice(0, 20))) {
        return sq.answer;
      }
    }

    if (lower.includes('hour') || lower.includes('open') || lower.includes('close') || lower.includes('time') || lower.includes('when')) {
      return `${prof.businessName} operating hours are: ${prof.fictionalHours}. We are located at ${prof.fictionalLocation}.`;
    }

    if (lower.includes('where') || lower.includes('location') || lower.includes('address') || lower.includes('parking')) {
      return `${prof.businessName} is located at ${prof.fictionalLocation}. Parking details and transit options are provided upon request confirmation.`;
    }

    if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('fee')) {
      const servicesList = prof.services.map((s) => `• ${s.name}: ${s.priceOrType}`).join('\n');
      return `Here is our current pricing overview:\n\n${servicesList}\n\nPlease submit an enquiry if you would like to proceed with an appointment or reservation.`;
    }

    if (cat === 'clinics') {
      if (lower.includes('emergency') || lower.includes('chest pain') || lower.includes('severe') || lower.includes('911')) {
        return 'SAFETY NOTICE: If you are experiencing a life-threatening medical emergency, please call 911 or visit the nearest hospital emergency room immediately. CarePoint Clinic provides routine outpatient and preventive care only.';
      }
      if (lower.includes('insurance') || lower.includes('medicare') || lower.includes('copay')) {
        return 'CarePoint Clinic accepts major PPO insurance plans and Medicare. Our patient intake team verifies coverage details during your scheduled consultation.';
      }
      if (lower.includes('appointment') || lower.includes('book') || lower.includes('checkup') || lower.includes('doctor')) {
        return 'To request a consultation with Dr. Jenkins or Dr. Morales, select your preferred date and time on our Business Demos tab. An intake coordinator will confirm your visit.';
      }
      if (lower.includes('symptom') || lower.includes('diagnos') || lower.includes('pain') || lower.includes('prescription')) {
        return 'For patient safety, our automated enquiry system does not diagnose symptoms or prescribe medication online. Please submit an appointment request so our physicians can evaluate your care in person.';
      }
    }

    return `Thank you for your question. As the automated assistant for ${prof.businessName}, I can help schedule appointments, answer questions regarding ${prof.fictionalHours}, or provide pricing information. What else would you like to know?`;
  };

  const handleSendMessage = (customQuery?: string) => {
    const questionText = customQuery || inputQuestion;
    if (!questionText.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: questionText.trim(),
      timestamp: 'Just now',
      category: selectedCategory
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsProcessing(true);

    setTimeout(() => {
      const responseText = generateSimulatedResponse(questionText, selectedCategory);
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: 'Just now',
        category: selectedCategory
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsProcessing(false);
    }, 450);
  };

  const handleResetChat = () => {
    setMessages(getInitialMessages(selectedCategory));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-[#1A1D1C]">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E2DA]">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E7E2DA] text-xs font-semibold tracking-wider uppercase text-[#2D5A43] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2F]" />
            <span>Multi-Channel Communication Sandbox</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1D1C] tracking-tight">
            Interactive AI Chat & Voice Agent
          </h1>
          <p className="text-xs sm:text-sm text-[#5D6B66] mt-0.5">
            Test live WhatsApp customer chat and AI phone call answering with instant pipeline integration.
          </p>
        </div>

        {/* Channel Mode Switcher */}
        <div className="flex items-center p-1 bg-white border border-[#E3DDD3] rounded-xl shadow-xs self-start md:self-auto">
          <button
            onClick={() => setActiveChannel('whatsapp')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeChannel === 'whatsapp'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp Agent</span>
          </button>

          <button
            onClick={() => setActiveChannel('call')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeChannel === 'call'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Voice Call Agent</span>
          </button>

          <button
            onClick={() => setActiveChannel('web')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeChannel === 'web'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'text-[#586460] hover:text-[#1A1D1C]'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Web FAQ</span>
          </button>
        </div>
      </div>

      {/* Render Active Channel */}
      {activeChannel === 'whatsapp' && (
        <div className="max-w-3xl mx-auto min-h-[580px]">
          <WhatsAppChatAgent />
        </div>
      )}

      {activeChannel === 'call' && (
        <div className="max-w-2xl mx-auto min-h-[580px]">
          <VoiceCallAgent />
        </div>
      )}

      {activeChannel === 'web' && (
        <div className="space-y-6">
          {/* Business Category Switcher */}
          <div className="flex items-center justify-between gap-4 p-1 bg-white border border-[#E3DDD3] rounded-xl overflow-x-auto shadow-xs">
            <span className="text-xs font-semibold text-[#52605B] ml-3 hidden sm:inline">
              Select Vertical:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleCategoryChange('clinics')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === 'clinics'
                    ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                    : 'text-[#586460] hover:text-[#1A1D1C]'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Clinic</span>
              </button>
              <button
                onClick={() => handleCategoryChange('restaurants')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === 'restaurants'
                    ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                    : 'text-[#586460] hover:text-[#1A1D1C]'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Restaurant</span>
              </button>
              <button
                onClick={() => handleCategoryChange('gyms')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === 'gyms'
                    ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                    : 'text-[#586460] hover:text-[#1A1D1C]'
                }`}
              >
                <Dumbbell className="w-3.5 h-3.5" />
                <span>Gym</span>
              </button>
              <button
                onClick={() => handleCategoryChange('salons')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === 'salons'
                    ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                    : 'text-[#586460] hover:text-[#1A1D1C]'
                }`}
              >
                <Sparkle className="w-3.5 h-3.5" />
                <span>Salon</span>
              </button>
            </div>
          </div>

          {/* Preset Scenarios Strip */}
          <section aria-label="Example scenarios" className="bg-white border border-[#E3DDD3] rounded-xl p-4 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1A1D1C]">
                Example Customer Questions
              </span>
              <span className="text-[11px] text-[#6E7D77]">
                Click any question to simulate instant response
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {PRESET_SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    if (selectedCategory !== sc.category) {
                      handleCategoryChange(sc.category);
                    }
                    handleSendMessage(sc.userPrompt);
                  }}
                  className="text-left p-2.5 bg-[#FAF8F5] hover:bg-[#F3EFE9] border border-[#E7E2DA] rounded-lg text-xs transition-colors group"
                >
                  <div className="text-[11px] font-semibold text-[#1E3A2F] group-hover:underline truncate">
                    {sc.title}
                  </div>
                  <div className="text-[11px] text-[#55635F] truncate mt-0.5">
                    "{sc.userPrompt}"
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Chat Container */}
          <div className="bg-white border border-[#E3DDD3] rounded-xl flex flex-col h-[520px] overflow-hidden shadow-xs">
            {/* Chat Header Bar */}
            <div className="p-3.5 bg-[#FAF8F5] border-b border-[#E7E2DA] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#1E3A2F] flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A1D1C] flex items-center gap-2">
                    <span>{profile.businessName} Automated Assistant</span>
                    <span className="text-[10px] font-mono text-[#2D5A43] bg-[#EBF1EC] border border-[#CCDCD0] px-1.5 py-0.2 rounded">
                      SIMULATED RESPONSE
                    </span>
                  </div>
                  <span className="text-[11px] text-[#697872]">
                    Rule-based local demonstration
                  </span>
                </div>
              </div>

              <button
                onClick={handleResetChat}
                className="flex items-center gap-1 text-xs text-[#52605B] hover:text-[#1A1D1C] px-2.5 py-1 rounded-md bg-white border border-[#DCD6CC] hover:bg-[#F3EFE9] transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF8F5]">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 max-w-2xl ${
                      isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center text-xs ${
                        isUser
                          ? 'bg-[#1E3A2F] text-white'
                          : 'bg-white text-[#1E3A2F] border border-[#D5D0C5]'
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`p-3.5 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                          isUser
                            ? 'bg-[#1E3A2F] text-white rounded-tr-none shadow-xs'
                            : 'bg-white text-[#1A1D1C] border border-[#E3DDD3] rounded-tl-none shadow-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div
                        className={`flex items-center gap-2 text-[10px] text-[#788782] font-mono ${
                          isUser ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {!isUser && (
                          <span className="text-[#2D5A43] font-semibold">
                            · Simulated response
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isProcessing && (
                <div className="flex items-center gap-3 text-xs text-[#5A6863] mr-auto">
                  <div className="w-7 h-7 rounded-md bg-white border border-[#D5D0C5] flex items-center justify-center text-[#1E3A2F]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E3DDD3] text-[#3E4945] flex items-center gap-2 shadow-xs">
                    <span className="inline-block w-1.5 h-1.5 bg-[#2D5A43] rounded-full animate-bounce" />
                    <span className="inline-block w-1.5 h-1.5 bg-[#2D5A43] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="inline-block w-1.5 h-1.5 bg-[#2D5A43] rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] text-[#697672] font-mono ml-1">
                      Checking business rules...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions Bar */}
            <div className="px-4 py-2 bg-white border-t border-[#E7E2DA] flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-semibold text-[#5A6863] shrink-0">
                Suggested:
              </span>
              {profile.sampleQuestions.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sq.question)}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-[#FAF8F5] hover:bg-[#F2EEE7] text-[#2D5A43] border border-[#E2DDD5] whitespace-nowrap transition-colors"
                >
                  {sq.question}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-[#E7E2DA]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuestion}
                  onChange={(e) => setInputQuestion(e.target.value)}
                  placeholder={`Ask ${profile.businessName} about hours, services, bookings, or policies...`}
                  className="flex-1 bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-lg px-3.5 py-2 text-xs text-[#1A1D1C] placeholder:text-[#7A8783] outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputQuestion.trim() || isProcessing}
                  className="px-4 py-2 bg-[#1E3A2F] hover:bg-[#284E3F] disabled:opacity-40 text-white font-medium text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#697772]">
                <span className="flex items-center gap-1">
                  <Info className="w-3 h-3 text-[#2D5A43]" />
                  <span>Client-side simulation. No live external API calls are made.</span>
                </span>
                <button
                  onClick={() => setActiveTab('demos')}
                  className="text-[#1E3A2F] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Submit Formal Enquiry</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
