import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneOff,
  PhoneCall,
  PhoneForwarded,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Grid,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Sparkle
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { BUSINESS_PROFILES } from '../../data/mockData';
import { BusinessCategory } from '../../types';
import { playRingTone, playDtmfTone, speakAloud, stopSpeaking } from './audioService';

interface TranscriptItem {
  id: string;
  speaker: 'agent' | 'caller';
  text: string;
  time: string;
  leadId?: string;
}

export const VoiceCallAgent: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { selectedCategory, setSelectedCategory, addLead, addToast, setActiveTab } = useDemo();
  const profile = BUSINESS_PROFILES[selectedCategory];

  // Call states
  const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'connected' | 'ended'>('connected');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [isOnHold, setIsOnHold] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [callerInputText, setCallerInputText] = useState('');

  // Speech Recognition instance ref
  const recognitionRef = useRef<any>(null);
  const transcriptBottomRef = useRef<HTMLDivElement>(null);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);

  // Initialize call with greeting
  const startCall = () => {
    stopSpeaking();
    setCallStatus('ringing');
    setCallDuration(0);
    playRingTone();

    setTimeout(() => {
      setCallStatus('connected');
      const greetingText = `Thank you for calling ${profile.businessName}. I am your automated AI booking agent. How can I help you today? You can ask to schedule an appointment, check opening times, or inquire about our services.`;
      
      const initItem: TranscriptItem = {
        id: `t-init-${Date.now()}`,
        speaker: 'agent',
        text: greetingText,
        time: '00:00'
      };
      setTranscript([initItem]);

      if (speakerEnabled) {
        setIsAiSpeaking(true);
        speakAloud(greetingText, () => setIsAiSpeaking(false));
      }
    }, 1400);
  };

  // End call
  const endCall = () => {
    stopSpeaking();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setCallStatus('ended');
    setIsAiSpeaking(false);
    setIsListening(false);
  };

  // Trigger call on mount or category change
  useEffect(() => {
    startCall();
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, [selectedCategory]);

  // Call timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (callStatus === 'connected' && !isOnHold) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [callStatus, isOnHold]);

  // Scroll transcript
  useEffect(() => {
    transcriptBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, isAiSpeaking]);

  // Speech Recognition setup (Web Speech API)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
        recognition.onresult = (event: any) => {
          const spokenText = event.results[0][0].transcript;
          if (spokenText) {
            handleCallerSpoke(spokenText);
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, [selectedCategory, callDuration]);

  const toggleMicListening = () => {
    if (!recognitionRef.current) {
      addToast({
        title: 'Microphone Not Available',
        message: 'Your browser does not support Web Speech Recognition. You can click the spoken prompt chips below or type your response.',
        type: 'info'
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      stopSpeaking();
      try {
        recognitionRef.current.start();
      } catch {
        recognitionRef.current.stop();
      }
    }
  };

  // Generate Voice Agent Response
  const processAgentVoiceResponse = (spoken: string) => {
    const lower = spoken.toLowerCase().trim();
    const prof = BUSINESS_PROFILES[selectedCategory];

    // Clinical emergency check
    if (selectedCategory === 'clinics' && (
      lower.includes('emergency') || lower.includes('chest pain') || lower.includes('heart') || lower.includes('stroke') || lower.includes('911')
    )) {
      return {
        reply: 'Emergency warning: If you are experiencing chest pain, acute distress, or an emergency, please hang up immediately and dial 999 or 911. CarePoint Clinic provides routine scheduled care only.',
        createLead: false
      };
    }

    // Booking intent
    if (
      lower.includes('book') ||
      lower.includes('appointment') ||
      lower.includes('reserve') ||
      lower.includes('table') ||
      lower.includes('schedule') ||
      lower.includes('friday') ||
      lower.includes('thursday') ||
      lower.includes('tomorrow') ||
      lower.includes('morning') ||
      lower.includes('afternoon')
    ) {
      const serviceName = prof.services[0]?.name || 'Standard Service';
      const preferredTime = lower.includes('morning') ? '10:00 AM' : '2:30 PM';
      const preferredDate = 'This Friday';

      const newLeadId = addLead({
        leadName: 'Phone Call Caller',
        contactPhone: '+44 20 7946 0912',
        contactEmail: 'caller.phone@example.com',
        category: selectedCategory,
        requestedService: serviceName,
        enquiryDate: 'Today (Phone Call)',
        preferredDate,
        preferredTime,
        status: 'Contact Required',
        leadSource: 'AI Inbound Voice Agent',
        notes: `Appointment agreed via Voice Call Agent: "${spoken}"`
      });

      addToast({
        title: 'Call Booking Registered',
        message: `Appointment for ${serviceName} logged in pipeline (Lead ${newLeadId}).`,
        type: 'success'
      });

      return {
        reply: `I have placed a provisional hold for you for ${serviceName} on ${preferredDate} at ${preferredTime}. I have created Lead reference ${newLeadId} and routed this to our reception team. You will receive an SMS confirmation shortly. Is there anything else I can assist with?`,
        createLead: true,
        leadId: newLeadId
      };
    }

    // Opening hours / address
    if (lower.includes('hour') || lower.includes('open') || lower.includes('close') || lower.includes('address') || lower.includes('where') || lower.includes('location')) {
      return {
        reply: `${prof.businessName} is located at ${prof.fictionalLocation}. Our hours are ${prof.fictionalHours}. Would you like me to book an appointment for you?`,
        createLead: false
      };
    }

    // Prices / services
    if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('how much') || lower.includes('service')) {
      const firstTwo = prof.services.slice(0, 2).map((s) => `${s.name} at ${s.priceOrType}`).join(', and ');
      return {
        reply: `Our standard pricing includes ${firstTwo}. Full pricing breakdown can be sent to your mobile phone. Would you like to schedule a slot?`,
        createLead: false
      };
    }

    // Transfer to human staff
    if (lower.includes('human') || lower.includes('staff') || lower.includes('person') || lower.includes('operator') || lower.includes('transfer')) {
      const newLeadId = addLead({
        leadName: 'Live Call Transfer Request',
        contactPhone: '+44 20 7946 0912',
        contactEmail: 'transfer.request@example.com',
        category: selectedCategory,
        requestedService: 'Priority Staff Callback',
        enquiryDate: 'Today',
        status: 'Contact Required',
        leadSource: 'Voice Call Agent Escalate',
        notes: `Caller asked for human transfer during voice call: "${spoken}"`
      });

      return {
        reply: `Understood. I am transferring your caller record to the duty receptionist. Lead ticket ${newLeadId} has been flagged with high priority. A team member will pick up or call you back immediately.`,
        createLead: true,
        leadId: newLeadId
      };
    }

    // Default polite response
    return {
      reply: `Thank you for that. At ${profile.businessName}, we can schedule an appointment, check upcoming openings, or answer pricing questions. What date or service works best for you?`,
      createLead: false
    };
  };

  const handleCallerSpoke = (spokenText: string) => {
    if (!spokenText.trim() || callStatus !== 'connected' || isOnHold) return;

    const callerItem: TranscriptItem = {
      id: `t-caller-${Date.now()}`,
      speaker: 'caller',
      text: spokenText.trim(),
      time: formatDuration(callDuration)
    };

    setTranscript((prev) => [...prev, callerItem]);
    setCallerInputText('');

    // AI Agent processes response
    setTimeout(() => {
      const res = processAgentVoiceResponse(spokenText);
      const agentItem: TranscriptItem = {
        id: `t-agent-${Date.now()}`,
        speaker: 'agent',
        text: res.reply,
        time: formatDuration(callDuration + 1),
        leadId: res.leadId
      };

      setTranscript((prev) => [...prev, agentItem]);

      if (speakerEnabled) {
        setIsAiSpeaking(true);
        speakAloud(res.reply, () => setIsAiSpeaking(false));
      }
    }, 600);
  };

  const handleKeypadPress = (digit: string) => {
    playDtmfTone(digit);
    if (digit === '1') {
      handleCallerSpoke('I would like to book an appointment please.');
    } else if (digit === '2') {
      handleCallerSpoke('What are your opening hours and address?');
    } else if (digit === '0') {
      handleCallerSpoke('Please transfer me to human front desk reception.');
    }
  };

  const spokenPrompts = [
    { label: '📅 "I\'d like to book this Friday"', text: 'Hi, I would like to book an appointment for this Friday morning.' },
    { label: '⏰ "What are your hours?"', text: 'Could you tell me your opening hours and location?' },
    { label: '💲 "What are your prices?"', text: 'How much are your standard services and consultations?' },
    { label: '👤 "Transfer to human staff"', text: 'Can you transfer me to a human staff member please?' },
    ...(selectedCategory === 'clinics' ? [{ label: '🚨 "Emergency triage test"', text: 'I am experiencing chest pain and shortness of breath.' }] : [])
  ];

  return (
    <div className="flex flex-col h-full bg-[#1A2320] text-white rounded-2xl overflow-hidden border border-[#2D3F37] shadow-lg font-sans">
      {/* 1. Category Switcher Bar */}
      <div className="bg-[#121916] px-4 py-2 flex items-center justify-between text-xs border-b border-[#24332D]">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
          <span className="text-[11px] text-[#7A9188] mr-1 hidden sm:inline">Active Business:</span>
          {(['clinics', 'restaurants', 'gyms', 'salons'] as BusinessCategory[]).map((cat) => {
            const isSel = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-all whitespace-nowrap ${
                  isSel
                    ? 'bg-[#1E3A2F] text-white font-semibold border border-[#3A6B56]'
                    : 'bg-[#18231F] text-[#8DA69C] hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <button
          onClick={startCall}
          title="Restart Call"
          className="p-1 rounded hover:bg-[#1E3A2F] text-[#8DA69C] hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Caller Header & Status */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-[#1E2B25] to-[#16201C] border-b border-[#263730] flex flex-col items-center text-center relative">
        <div className="relative mb-2">
          {/* Pulsing ring indicator */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              callStatus === 'connected'
                ? isAiSpeaking
                  ? 'bg-[#2D5A43] ring-4 ring-[#3D785A] shadow-md shadow-[#2D5A43]/40'
                  : 'bg-[#1E3A2F] ring-2 ring-[#2F5243]'
                : 'bg-[#293832]'
            }`}
          >
            {selectedCategory === 'clinics' && <Stethoscope className="w-6 h-6 text-[#A3D3C9]" />}
            {selectedCategory === 'restaurants' && <UtensilsCrossed className="w-6 h-6 text-[#A3D3C9]" />}
            {selectedCategory === 'gyms' && <Dumbbell className="w-6 h-6 text-[#A3D3C9]" />}
            {selectedCategory === 'salons' && <Sparkle className="w-6 h-6 text-[#A3D3C9]" />}
          </div>

          {callStatus === 'connected' && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-[#16201C]" />
          )}
        </div>

        <h3 className="font-bold text-base text-white tracking-tight">
          {profile.businessName} AI Call Agent
        </h3>
        <p className="text-xs text-[#8BA298] font-mono mt-0.5">
          +44 20 7946 0912 · Inbound Voice Desk
        </p>

        {/* Call Status Badge & Timer */}
        <div className="mt-2 flex items-center gap-2">
          {callStatus === 'ringing' && (
            <span className="text-xs text-[#FBBF24] font-medium animate-pulse flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>Ringing...</span>
            </span>
          )}

          {callStatus === 'connected' && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#203D31] border border-[#2D5A43] text-xs font-mono text-[#6EE7B7]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>{isOnHold ? 'CALL ON HOLD' : `Connected · ${formatDuration(callDuration)}`}</span>
              </span>

              {isAiSpeaking && (
                <span className="text-[11px] font-mono text-[#A3D3C9] bg-[#162921] px-2 py-0.5 rounded border border-[#284E3F] animate-pulse">
                  Agent Speaking...
                </span>
              )}
            </div>
          )}

          {callStatus === 'ended' && (
            <span className="text-xs text-[#F87171] font-mono">
              Call Disconnected
            </span>
          )}
        </div>

        {/* Audio Wave Visualizer Simulation */}
        {callStatus === 'connected' && !isOnHold && (
          <div className="mt-3 flex items-center justify-center gap-1 h-5">
            {[40, 75, 55, 90, 65, 80, 50, 85, 60, 45, 70, 95, 40].map((h, i) => {
              const activeHeight = isAiSpeaking || isListening ? `${h}%` : '20%';
              return (
                <span
                  key={i}
                  style={{ height: activeHeight }}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isAiSpeaking
                      ? 'bg-[#10B981]'
                      : isListening
                      ? 'bg-[#3B82F6]'
                      : 'bg-[#3B4F47]'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Live Transcript & Subtitles Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[220px] max-h-[380px] bg-[#141C19]">
        <div className="text-center">
          <span className="text-[10px] font-mono text-[#6B8077] bg-[#1B2723] px-2.5 py-0.5 rounded border border-[#263730]">
            REAL-TIME CALL TRANSCRIPT & AUTOMATION AUDIT
          </span>
        </div>

        {transcript.map((item) => {
          const isAgent = item.speaker === 'agent';
          return (
            <div
              key={item.id}
              className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[10px] text-[#7A8E85] font-mono">
                <span>{isAgent ? 'AI Agent (Voice)' : 'You (Caller)'}</span>
                <span>·</span>
                <span>{item.time}</span>
              </div>

              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed shadow-xs ${
                  isAgent
                    ? 'bg-[#1E2E27] text-[#E3ECE7] border border-[#2A4438] rounded-tl-none'
                    : 'bg-[#233B31] text-white border border-[#375A4B] rounded-tr-none'
                }`}
              >
                <p>{item.text}</p>

                {/* If lead was generated on the call */}
                {item.leadId && (
                  <div className="mt-2 pt-2 border-t border-[#2D4A3D] flex items-center justify-between text-[11px] text-[#6EE7B7]">
                    <span className="flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Pipeline Record: {item.leadId}</span>
                    </span>
                    <button
                      onClick={() => setActiveTab('pipeline')}
                      className="text-white hover:underline flex items-center gap-0.5 font-semibold text-[10px]"
                    >
                      <span>View</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div ref={transcriptBottomRef} />
      </div>

      {/* Keypad Drawer (Collapsible) */}
      {showKeypad && callStatus === 'connected' && (
        <div className="bg-[#121916] p-3 border-t border-[#263730] grid grid-cols-3 gap-2 max-w-xs mx-auto animate-in fade-in duration-150">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleKeypadPress(digit)}
              className="py-2 rounded-lg bg-[#1B2723] hover:bg-[#283C35] text-white text-sm font-semibold active:scale-95 transition-all text-center border border-[#293B33]"
            >
              {digit}
            </button>
          ))}
        </div>
      )}

      {/* 4. Spoken Prompt Suggestions Chips */}
      {callStatus === 'connected' && !isOnHold && (
        <div className="bg-[#16201C] px-3 py-2 border-t border-[#263730] overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
          {spokenPrompts.map((sp, idx) => (
            <button
              key={idx}
              onClick={() => handleCallerSpoke(sp.text)}
              disabled={isAiSpeaking}
              className="px-2.5 py-1 rounded-full bg-[#1F2C27] hover:bg-[#284137] text-[#A5C0B5] hover:text-white border border-[#2C3F37] text-[11px] font-medium whitespace-nowrap transition-colors shadow-2xs shrink-0"
            >
              {sp.label}
            </button>
          ))}
        </div>
      )}

      {/* 5. In-Call Controls Bar */}
      <div className="bg-[#101714] p-3 border-t border-[#22312A] space-y-2">
        {/* Text Input fallback for typing what to say */}
        {callStatus === 'connected' && !isOnHold && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={callerInputText}
              onChange={(e) => setCallerInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && callerInputText.trim()) {
                  handleCallerSpoke(callerInputText);
                }
              }}
              placeholder="Speak via mic or type response to agent..."
              disabled={isAiSpeaking}
              className="flex-1 bg-[#17231E] border border-[#283C34] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#3A6B56] placeholder:text-[#677F74]"
            />
            <button
              onClick={() => {
                if (callerInputText.trim()) handleCallerSpoke(callerInputText);
              }}
              disabled={!callerInputText.trim() || isAiSpeaking}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                callerInputText.trim() && !isAiSpeaking
                  ? 'bg-[#1E3A2F] hover:bg-[#284E3F] text-white border border-[#3A6B56]'
                  : 'bg-[#18231E] text-[#556960] cursor-not-allowed'
              }`}
            >
              Say
            </button>
          </div>
        )}

        {/* Call Action Buttons */}
        <div className="flex items-center justify-around pt-1">
          {callStatus === 'connected' ? (
            <>
              {/* Mic toggle */}
              <button
                onClick={toggleMicListening}
                title={isListening ? 'Stop listening' : 'Speak into microphone'}
                className={`p-2.5 rounded-full transition-all ${
                  isListening
                    ? 'bg-[#3B82F6] text-white ring-4 ring-[#3B82F6]/30 animate-pulse'
                    : 'bg-[#1C2923] hover:bg-[#283C34] text-[#A2BEB2]'
                }`}
              >
                {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Speaker Audio toggle */}
              <button
                onClick={() => {
                  if (speakerEnabled) {
                    stopSpeaking();
                    setSpeakerEnabled(false);
                  } else {
                    setSpeakerEnabled(true);
                  }
                }}
                title={speakerEnabled ? 'Mute AI voice audio' : 'Turn on AI voice audio'}
                className={`p-2.5 rounded-full transition-colors ${
                  speakerEnabled
                    ? 'bg-[#1C2923] hover:bg-[#283C34] text-[#A2BEB2]'
                    : 'bg-[#7F1D1D] text-white'
                }`}
              >
                {speakerEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Keypad toggle */}
              <button
                onClick={() => setShowKeypad(!showKeypad)}
                title="Dial Keypad"
                className={`p-2.5 rounded-full transition-colors ${
                  showKeypad
                    ? 'bg-[#1E3A2F] text-white'
                    : 'bg-[#1C2923] hover:bg-[#283C34] text-[#A2BEB2]'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>

              {/* Hold toggle */}
              <button
                onClick={() => {
                  stopSpeaking();
                  setIsOnHold(!isOnHold);
                }}
                title={isOnHold ? 'Resume Call' : 'Hold Call'}
                className={`p-2.5 rounded-full transition-colors text-xs font-semibold ${
                  isOnHold
                    ? 'bg-[#FBBF24] text-[#1A2320]'
                    : 'bg-[#1C2923] hover:bg-[#283C34] text-[#A2BEB2]'
                }`}
              >
                {isOnHold ? 'Resume' : 'Hold'}
              </button>

              {/* End Call Button */}
              <button
                onClick={endCall}
                title="End Call"
                className="p-3 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white transition-all shadow-md active:scale-95"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </>
          ) : (
            /* Start Call Button if ended or idle */
            <button
              onClick={startCall}
              className="px-6 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-md active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Call FlowPilot AI Agent</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
