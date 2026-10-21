import React, { useState } from 'react';
import {
  Send,
  RotateCcw,
  Bot,
  User,
  Sparkles,
  Info,
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Sparkle,
  ArrowRight
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { BUSINESS_PROFILES } from '../../data/mockData';
import { BusinessCategory, ChatMessage } from '../../types';

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
    title: 'Weekend Urgent Hours (Clinic)',
    userPrompt: 'What are your weekend opening hours for urgent visits?'
  },
  {
    id: 'sc2',
    category: 'restaurants',
    title: 'Large Group Reservation (Restaurant)',
    userPrompt: 'What is the deposit policy for large parties of 8 or more?'
  },
  {
    id: 'sc3',
    category: 'gyms',
    title: 'Trial Pass & Morning Classes (Gym)',
    userPrompt: 'What is included in the complimentary trial pass?'
  },
  {
    id: 'sc4',
    category: 'salons',
    title: 'Balayage & Stylist Request (Salon)',
    userPrompt: 'Can I request a specific stylist like Elena Vance?'
  }
];

export const AIAssistantView: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setActiveTab } = useDemo();
  const profile = BUSINESS_PROFILES[selectedCategory];

  const getInitialMessages = (cat: BusinessCategory): ChatMessage[] => {
    const prof = BUSINESS_PROFILES[cat];
    return [
      {
        id: 'msg-init',
        sender: 'assistant',
        text: `Hello! I am the automated demonstration assistant for ${prof.businessName}. You can ask about our service catalog, opening hours, booking policies, or pricing. How may I help you today?`,
        timestamp: 'Just now',
        category: cat,
        matchedIntent: 'greeting'
      }
    ];
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages(selectedCategory));
  const [inputQuestion, setInputQuestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Switch category and reset greeting
  const handleCategoryChange = (cat: BusinessCategory) => {
    setSelectedCategory(cat);
    setMessages(getInitialMessages(cat));
    setInputQuestion('');
  };

  // Deterministic local response matcher
  const generateSimulatedResponse = (query: string, cat: BusinessCategory): string => {
    const lower = query.toLowerCase().trim();
    const prof = BUSINESS_PROFILES[cat];

    // Check exact or partial sample question matches
    for (const sq of prof.sampleQuestions) {
      if (lower.includes(sq.question.toLowerCase().slice(0, 20))) {
        return sq.answer;
      }
    }

    // Keyword taxonomy per business
    if (lower.includes('hour') || lower.includes('open') || lower.includes('close') || lower.includes('time') || lower.includes('when')) {
      return `${prof.businessName} operating hours are: ${prof.fictionalHours}. We are located at ${prof.fictionalLocation}.`;
    }

    if (lower.includes('where') || lower.includes('location') || lower.includes('address') || lower.includes('parking')) {
      return `${prof.businessName} is located at ${prof.fictionalLocation}. Dedicated parking and transit directions are provided upon request confirmation.`;
    }

    if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('fee')) {
      const servicesList = prof.services.map((s) => `• ${s.name}: ${s.priceOrType}`).join('\n');
      return `Here is our current pricing overview:\n\n${servicesList}\n\nPlease submit an enquiry if you would like to proceed with a booking.`;
    }

    // Category specific rules
    if (cat === 'clinics') {
      if (lower.includes('emergency') || lower.includes('chest pain') || lower.includes('severe') || lower.includes('911')) {
        return 'CRITICAL SAFETY NOTICE: If you or someone you know is experiencing a life-threatening medical emergency, please call 911 or visit the nearest hospital emergency room immediately. CarePoint Clinic provides routine outpatient and preventive care only.';
      }
      if (lower.includes('insurance') || lower.includes('medicare') || lower.includes('copay')) {
        return 'CarePoint Clinic accepts major PPO insurance plans and Medicare. Our patient intake team verifies coverage details during your scheduled consultation.';
      }
      if (lower.includes('appointment') || lower.includes('book') || lower.includes('checkup') || lower.includes('doctor')) {
        return 'To request a consultation with Dr. Jenkins or Dr. Morales, select your preferred date and time on our Business Demos tab. An intake coordinator will confirm your visit.';
      }
      if (lower.includes('symptom') || lower.includes('diagnos') || lower.includes('pain') || lower.includes('prescription')) {
        return 'For your safety, our automated enquiry system does not diagnose symptoms or prescribe medication online. Please submit an appointment request so our physicians can evaluate your care in person.';
      }
    }

    if (cat === 'restaurants') {
      if (lower.includes('vegan') || lower.includes('vegetarian') || lower.includes('gluten') || lower.includes('allergy') || lower.includes('menu')) {
        return 'Urban Table offers seasonal wood-fired cuisine with dedicated gluten-free and vegan selections, including our popular wild mushroom risotto. Please note dietary preferences when requesting a table.';
      }
      if (lower.includes('reservation') || lower.includes('table') || lower.includes('party') || lower.includes('book') || lower.includes('dinner')) {
        return 'Tables for 1 to 6 guests can be requested through our booking form. For parties of 8 or more, our events host coordinates customized private mezzanine seating.';
      }
      if (lower.includes('deposit') || lower.includes('cancel')) {
        return 'Reservations can be modified or canceled up to 24 hours prior without fee. Large private dining events require a refundable hold deposit.';
      }
    }

    if (cat === 'gyms') {
      if (lower.includes('trial') || lower.includes('free') || lower.includes('pass')) {
        return 'FitCore Studio offers a complimentary 3-day trial pass that includes full facility access, recovery amenities, and one coach-guided group training class.';
      }
      if (lower.includes('class') || lower.includes('schedule') || lower.includes('hiit') || lower.includes('strength')) {
        return 'Our class roster includes 6:00 AM & 7:15 AM High-Intensity Conditioning, 8:30 AM Olympic Barbell & Strength, and 9:30 AM Mobility & Recovery Monday through Friday.';
      }
      if (lower.includes('contract') || lower.includes('cancel') || lower.includes('membership')) {
        return 'We operate on transparent month-to-month memberships at $149/mo with no long-term lock-in contracts and a simple 14-day cancellation policy.';
      }
    }

    if (cat === 'salons') {
      if (lower.includes('balayage') || lower.includes('highlight') || lower.includes('blonde')) {
        return 'Our signature Dimensional Balayage & Gloss service starts at $240 and typically takes 3 hours. It includes customized hand-painted highlights, gloss tone, and signature blowout.';
      }
      if (lower.includes('stylist') || lower.includes('elena') || lower.includes('marcus') || lower.includes('chloe')) {
        return 'You can request master stylists Elena Vance, Marcus Reed, or Chloe Dubois. Our booking system pairs your desired service duration directly with their chair calendar.';
      }
      if (lower.includes('patch') || lower.includes('test') || lower.includes('allergy')) {
        return 'We recommend a complimentary 10-minute patch test 48 hours prior to any intensive color transformation for first-time clients.';
      }
    }

    // Graceful Fallback for unknown questions
    return `This demonstration assistant is operating on client-side simulation rules for ${prof.businessName}. While I do not have a pre-configured response for "${query}", you can ask about: \n• Operating hours & location\n• Service catalog & pricing\n• Booking & cancellation policies\n• Or click any suggested question below!`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputQuestion).trim();
    if (!text || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text,
      timestamp: 'Just now',
      category: selectedCategory
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsProcessing(true);

    // Fast deterministic delay to feel natural without sluggishness
    setTimeout(() => {
      const responseText = generateSimulatedResponse(text, selectedCategory);
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        sender: 'assistant',
        text: responseText,
        timestamp: 'Just now',
        category: selectedCategory,
        matchedIntent: 'sample_response'
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsProcessing(false);
    }, 350);
  };

  const handleResetChat = () => {
    setMessages(getInitialMessages(selectedCategory));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLIENT-SIDE RESPONSE ENGINE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Interactive AI Assistant
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Test deterministic enquiry handling with instant business rules. No external language model APIs called.
          </p>
        </div>

        {/* Business Category Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-lg overflow-x-auto">
          <button
            onClick={() => handleCategoryChange('clinics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'clinics'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinic</span>
          </button>
          <button
            onClick={() => handleCategoryChange('restaurants')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'restaurants'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Restaurant</span>
          </button>
          <button
            onClick={() => handleCategoryChange('gyms')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'gyms'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Gym</span>
          </button>
          <button
            onClick={() => handleCategoryChange('salons')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'salons'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkle className="w-3.5 h-3.5" />
            <span>Salon</span>
          </button>
        </div>
      </div>

      {/* Preset Scenarios Strip */}
      <section aria-label="Example scenarios" className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase text-slate-400">
            Quick Scenarios
          </span>
          <span className="text-[11px] text-slate-400">
            Click to simulate instant client inquiry
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
              className="text-left p-2.5 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 rounded-lg text-xs transition-colors group"
            >
              <div className="text-[11px] font-medium text-cyan-300 group-hover:text-cyan-200 truncate">
                {sc.title}
              </div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5">
                "{sc.userPrompt}"
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Chat Container */}
      <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl flex flex-col h-[520px] overflow-hidden">
        {/* Chat Header Bar */}
        <div className="p-3.5 bg-[#091124] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>{profile.businessName} Assistant</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-1.5 py-0.2 rounded">
                  SIMULATED AI RESPONSE
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Rule-based conversational demo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Chat</span>
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
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
                  className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                    isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-cyan-950 text-cyan-300 border border-cyan-800/60'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div
                    className={`p-3.5 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div
                    className={`flex items-center gap-2 text-[10px] text-slate-400 font-mono ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <span className="text-cyan-400 font-semibold">
                        · Simulated AI Response
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isProcessing && (
            <div className="flex items-center gap-3 text-xs text-slate-400 mr-auto">
              <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-400 font-mono ml-1">
                  Evaluating business rules...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions Bar */}
        <div className="px-4 py-2 bg-[#091124] border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-mono text-slate-400 shrink-0">
            Suggested:
          </span>
          {profile.sampleQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(sq.question)}
              className="text-[11px] px-2.5 py-1 rounded bg-slate-800/70 hover:bg-slate-750 text-cyan-300 border border-slate-700/60 whitespace-nowrap hover:border-cyan-500/40 transition-colors"
            >
              {sq.question}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#080E1C] border-t border-slate-800">
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
              className="flex-1 bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 outline-none"
            />
            <button
              type="submit"
              disabled={!inputQuestion.trim() || isProcessing}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3 text-cyan-400" />
              <span>Client-side simulation. No live LLM or external API calls are made.</span>
            </span>
            <button
              onClick={() => setActiveTab('demos')}
              className="text-cyan-400 hover:underline flex items-center gap-1 font-medium"
            >
              <span>Submit Formal Enquiry</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
