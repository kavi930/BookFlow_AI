import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  RotateCcw,
  CheckCheck,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Sparkle,
  ArrowRight,
  ShieldAlert,
  Volume2,
  VolumeX,
  Calendar,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { BUSINESS_PROFILES } from '../../data/mockData';
import { BusinessCategory } from '../../types';
import { playMessageChime } from './audioService';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
  leadCreatedId?: string;
  isQuickAction?: boolean;
}

export const WhatsAppChatAgent: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { selectedCategory, setSelectedCategory, addLead, addToast, setActiveTab } = useDemo();
  const profile = BUSINESS_PROFILES[selectedCategory];

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getInitialMessages = (cat: BusinessCategory): Message[] => {
    const prof = BUSINESS_PROFILES[cat];
    return [
      {
        id: 'init-1',
        sender: 'agent',
        text: `Hello! 👋 Welcome to ${prof.businessName}. I'm your automated WhatsApp booking assistant.\n\nI can check availability, confirm appointments, or answer any questions about our services. How may I assist you today?`,
        time: formatCurrentTime()
      }
    ];
  };

  const [messages, setMessages] = useState<Message[]>(() => getInitialMessages(selectedCategory));

  useEffect(() => {
    setMessages(getInitialMessages(selectedCategory));
  }, [selectedCategory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleReset = () => {
    setMessages(getInitialMessages(selectedCategory));
    setInputText('');
  };

  const handleCategorySwitch = (cat: BusinessCategory) => {
    setSelectedCategory(cat);
  };

  // Generate intelligent contextual response
  const processUserMessage = (text: string) => {
    const lower = text.toLowerCase().trim();
    const prof = BUSINESS_PROFILES[selectedCategory];
    const timeNow = formatCurrentTime();

    // 1. Emergency Safety Guard (for clinics)
    if (selectedCategory === 'clinics' && (
      lower.includes('emergency') || lower.includes('chest pain') || lower.includes('shortness of breath') || lower.includes('bleeding') || lower.includes('911')
    )) {
      return {
        reply: `⚠️ CLINICAL SAFETY ALERT: If you or someone you are inquiring for is experiencing chest pain, acute shortness of breath, severe bleeding, or any life-threatening symptoms, please call 999 / 911 or visit the nearest emergency department immediately.\n\n${prof.businessName} provides scheduled outpatient care only.`,
        createLead: false
      };
    }

    // 2. Booking / Scheduling Intent
    if (
      lower.includes('book') ||
      lower.includes('appointment') ||
      lower.includes('reserve') ||
      lower.includes('table') ||
      lower.includes('class') ||
      lower.includes('schedule') ||
      lower.includes('friday') ||
      lower.includes('thursday') ||
      lower.includes('tomorrow') ||
      lower.includes('slot')
    ) {
      // Pick a sample service
      const serviceName = prof.services[0]?.name || 'Standard Service';
      const preferredTime = lower.includes('morning') ? '10:00 AM' : lower.includes('evening') ? '6:30 PM' : '2:15 PM';
      const preferredDate = 'This Friday';

      // Automatically register a lead into the demo CRM
      const newLeadId = addLead({
        leadName: 'WhatsApp Prospect',
        contactPhone: '+44 7700 900' + Math.floor(100 + Math.random() * 899),
        contactEmail: 'whatsapp.client@example.com',
        category: selectedCategory,
        requestedService: serviceName,
        enquiryDate: 'Today',
        preferredDate,
        preferredTime,
        status: 'Contact Required',
        leadSource: 'WhatsApp Business Agent',
        notes: `Automated booking request via interactive WhatsApp agent: "${text}"`
      });

      addToast({
        title: 'New Lead in Pipeline',
        message: `${serviceName} request recorded for ${prof.businessName} (ID: ${newLeadId}).`,
        type: 'success'
      });

      return {
        reply: `✅ Provisional hold secured!\n\nI've reserved a tentative slot for you for **${serviceName}** on **${preferredDate} at ${preferredTime}** at ${prof.businessName}.\n\nOur front desk has received your request and logged Lead **#${newLeadId}** in the staff pipeline. You'll receive a confirmation SMS with arrival details shortly!`,
        createLead: true,
        leadId: newLeadId
      };
    }

    // 3. Opening hours / location
    if (lower.includes('hour') || lower.includes('open') || lower.includes('close') || lower.includes('address') || lower.includes('where') || lower.includes('location')) {
      return {
        reply: `📍 **${prof.businessName}**\n\n• Location: ${prof.fictionalLocation}\n• Hours: ${prof.fictionalHours}\n\nWould you like me to reserve an appointment time for you?`,
        createLead: false
      };
    }

    // 4. Pricing / Services
    if (lower.includes('price') || lower.includes('cost') || lower.includes('service') || lower.includes('rate') || lower.includes('how much') || lower.includes('menu')) {
      const list = prof.services.map((s) => `• ${s.name} (${s.priceOrType}): ${s.description}`).join('\n');
      return {
        reply: `Here are our popular services at **${prof.businessName}**:\n\n${list}\n\nWhich service would you like to schedule?`,
        createLead: false
      };
    }

    // 5. Human Staff / Callback
    if (lower.includes('human') || lower.includes('speak') || lower.includes('agent') || lower.includes('reception') || lower.includes('phone') || lower.includes('call me')) {
      const newLeadId = addLead({
        leadName: 'WhatsApp Caller Inquiry',
        contactPhone: '+44 7700 900' + Math.floor(100 + Math.random() * 899),
        contactEmail: 'reception.request@example.com',
        category: selectedCategory,
        requestedService: 'Staff Callback Request',
        enquiryDate: 'Today',
        status: 'Contact Required',
        leadSource: 'WhatsApp Triage',
        notes: `Customer requested direct staff contact via WhatsApp: "${text}"`
      });

      addToast({
        title: 'Staff Escalation Notified',
        message: `Front desk alerted for human follow-up (Lead ${newLeadId}).`,
        type: 'info'
      });

      return {
        reply: `Certainly! I've escalated your conversation to our front-desk coordinator at ${prof.businessName}. A team member will follow up with you on this WhatsApp number shortly.`,
        createLead: true,
        leadId: newLeadId
      };
    }

    // Default polite conversational reply with business context
    return {
      reply: `Thank you for your message! At ${prof.businessName}, we can help you with appointments, operating hours (${prof.fictionalHours}), or service details.\n\nReply with your preferred date/time or tap one of the quick suggestions below.`,
      createLead: false
    };
  };

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      time: formatCurrentTime()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate realistic WhatsApp typing delay
    setTimeout(() => {
      const result = processUserMessage(textToSend);
      const agentMsg: Message = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: result.reply,
        time: formatCurrentTime(),
        leadCreatedId: result.leadId
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);

      if (soundEnabled) {
        playMessageChime();
      }
    }, 850);
  };

  const quickPrompts = [
    { label: '📅 Book this Friday', prompt: 'Hi, I would like to book an appointment for this Friday afternoon.' },
    { label: '⏰ Hours & Location', prompt: 'What are your opening hours and where are you located?' },
    { label: '💲 Service Pricing', prompt: 'Could you give me a list of your services and pricing?' },
    { label: '👤 Speak to Staff', prompt: 'Can I please speak with a human staff member?' },
    ...(selectedCategory === 'clinics' ? [{ label: '🚨 Emergency Triage Test', prompt: 'I have severe chest pain and dizziness, can I book?' }] : [])
  ];

  return (
    <div className="flex flex-col h-full bg-[#EFEAE2] rounded-2xl overflow-hidden border border-[#D1CBC2] shadow-sm font-sans">
      {/* 1. Category Switcher Bar */}
      <div className="bg-[#054D44] px-4 py-2 flex items-center justify-between text-xs text-white border-b border-[#043B34]">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
          <span className="text-[11px] text-[#A2C7C1] mr-1 hidden sm:inline">Active Demo:</span>
          {(['clinics', 'restaurants', 'gyms', 'salons'] as BusinessCategory[]).map((cat) => {
            const isSel = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySwitch(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-all whitespace-nowrap ${
                  isSel
                    ? 'bg-[#128C7E] text-white font-semibold shadow-xs'
                    : 'bg-[#075E54]/70 text-[#C9DFDB] hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute chimes' : 'Unmute chimes'}
            className="p-1 rounded hover:bg-[#075E54] text-[#C9DFDB] hover:text-white transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleReset}
            title="Reset Chat"
            className="p-1 rounded hover:bg-[#075E54] text-[#C9DFDB] hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. WhatsApp Official Header */}
      <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between text-white shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#128C7E] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-xs border border-white/20">
            {selectedCategory === 'clinics' && <Stethoscope className="w-4 h-4" />}
            {selectedCategory === 'restaurants' && <UtensilsCrossed className="w-4 h-4" />}
            {selectedCategory === 'gyms' && <Dumbbell className="w-4 h-4" />}
            {selectedCategory === 'salons' && <Sparkle className="w-4 h-4" />}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm tracking-tight text-white leading-tight">
                {profile.businessName}
              </span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#25D366] text-[#075E54] text-[9px] font-bold" title="Verified WhatsApp Business">
                ✓
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#A3D3C9]">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>FlowPilot AI Assistant · Online</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:block text-right">
          <span className="text-[10px] font-mono text-[#A3D3C9] uppercase bg-[#054D44] px-2 py-0.5 rounded border border-[#043B34]">
            LIVE SANDBOX
          </span>
        </div>
      </div>

      {/* 3. Message Stream (Authentic WhatsApp wallpaper pattern simulation) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[460px] bg-[#EFEAE2]">
        {/* Date Stamp Pill */}
        <div className="flex justify-center">
          <span className="text-[10px] font-medium bg-[#E1DDD5] text-[#55635F] px-2.5 py-0.5 rounded-md shadow-xs">
            TODAY
          </span>
        </div>

        {/* Security notice banner */}
        <div className="bg-[#FFF9EE] border border-[#F0E2C8] rounded-lg p-2 text-center text-[10px] text-[#8C5E09] space-y-0.5 max-w-sm mx-auto shadow-xs">
          <p className="font-medium">🔒 End-to-End Automated Demonstration</p>
          <p className="text-[#A2731B]">All appointments created here sync to your demo Lead Pipeline in real time.</p>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-3.5 py-2.5 shadow-xs text-xs leading-relaxed whitespace-pre-line relative ${
                  isUser
                    ? 'bg-[#E7FFDB] text-[#111B21] rounded-tr-none'
                    : 'bg-white text-[#111B21] rounded-tl-none border border-[#E3DDD4]'
                }`}
              >
                <div>{msg.text}</div>

                {/* If a lead was created during this message */}
                {msg.leadCreatedId && (
                  <div className="mt-2 pt-2 border-t border-[#E8E2D8] flex items-center justify-between text-[11px] text-[#1E3A2F] font-medium">
                    <span className="flex items-center gap-1 text-[#2D5A43]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43]" />
                      <span>Pipeline Record: {msg.leadCreatedId}</span>
                    </span>
                    <button
                      onClick={() => setActiveTab('pipeline')}
                      className="text-[#1E3A2F] font-semibold hover:underline flex items-center gap-0.5 text-[10px]"
                    >
                      <span>View</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#667781]">
                  <span>{msg.time}</span>
                  {isUser && <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 max-w-[120px] bg-white border border-[#E3DDD4] px-3 py-2 rounded-2xl rounded-tl-none shadow-xs text-xs text-[#667781]">
            <span className="text-[11px] italic text-[#54656F]">Typing</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#128C7E] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#128C7E] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#128C7E] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Quick Suggested Prompt Chips */}
      <div className="bg-[#F0F2F5] px-3 py-2 border-t border-[#E2DDD5] overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(qp.prompt)}
            disabled={isTyping}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-[#E7FFDB] hover:border-[#25D366] text-[#3B4A54] border border-[#DAD3C7] text-[11px] font-medium whitespace-nowrap transition-colors shadow-2xs shrink-0"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* 5. Input Bar */}
      <div className="bg-[#F0F2F5] p-2.5 border-t border-[#D9D3C7] flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          placeholder="Type a message or booking request..."
          disabled={isTyping}
          className="flex-1 bg-white border border-[#DDD6CB] rounded-full px-4 py-2 text-xs text-[#111B21] focus:outline-none focus:ring-1 focus:ring-[#128C7E] placeholder:text-[#8696A0]"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isTyping}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors shrink-0 shadow-xs ${
            inputText.trim() && !isTyping
              ? 'bg-[#128C7E] hover:bg-[#075E54]'
              : 'bg-[#B0C3BD] cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
