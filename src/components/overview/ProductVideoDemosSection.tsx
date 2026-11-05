import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  PhoneCall,
  Calendar,
  Users,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Zap,
  Activity
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export interface VideoDemoChapter {
  id: string;
  title: string;
  timestamp: string; // e.g., '00:06'
  startSecond: number;
  description: string;
}

export interface VideoDemoItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  icon: React.ReactNode;
  durationSeconds: number;
  sandboxTab: 'demos' | 'assistant' | 'pipeline' | 'workflows';
  chapters: VideoDemoChapter[];
}

export const VIDEO_DEMOS: VideoDemoItem[] = [
  {
    id: 'whatsapp-frontdesk',
    title: 'Frontdesk AI: Inbound WhatsApp to Booking',
    tagline: 'See how BookFlow_AI turns casual WhatsApp inquiries into verified calendar bookings in 24 seconds.',
    category: 'WhatsApp Automation',
    icon: <MessageSquare className="w-4 h-4 text-[#25D366]" />,
    durationSeconds: 24,
    sandboxTab: 'assistant',
    chapters: [
      { id: 'w1', title: 'Inbound Inquiry', timestamp: '00:00', startSecond: 0, description: 'Customer reaches out on WhatsApp requesting a Thursday consultation.' },
      { id: 'w2', title: 'Real-Time Schedule Check', timestamp: '00:06', startSecond: 6, description: 'BookFlow_AI queries provider calendar and returns real openings.' },
      { id: 'w3', title: 'Provisional Slot Lock', timestamp: '00:12', startSecond: 12, description: 'Client selects 9:30 AM; BookFlow_AI locks slot with buffer interval.' },
      { id: 'w4', title: 'CRM & Staff Dispatch', timestamp: '00:18', startSecond: 18, description: 'Dispatches lead to staff triage queue and sends instant confirmation.' }
    ]
  },
  {
    id: 'voice-reception',
    title: 'Voice Agent: Live Phone Answering & Triage',
    tagline: 'Watch our neural voice agent answer front-desk calls, transcribe clinical needs, and log appointments.',
    category: 'Voice Receptionist',
    icon: <PhoneCall className="w-4 h-4 text-[#D97706]" />,
    durationSeconds: 28,
    sandboxTab: 'demos',
    chapters: [
      { id: 'v1', title: 'Incoming Call Answering', timestamp: '00:00', startSecond: 0, description: 'Neural voice receptionist picks up within 1 ring with natural brand greeting.' },
      { id: 'v2', title: 'Ambient Speech Scribe', timestamp: '00:07', startSecond: 7, description: 'Real-time speech-to-text with medical and service intent parsing.' },
      { id: 'v3', title: 'Availability Validation', timestamp: '00:14', startSecond: 14, description: 'Agent cross-references practitioner schedules and offers morning openings.' },
      { id: 'v4', title: 'SMS Confirmation & Lead Entry', timestamp: '00:21', startSecond: 21, description: 'Call wraps with automated SMS booking link sent to caller mobile.' }
    ]
  },
  {
    id: 'calendar-sync',
    title: 'Calendar Sync: Real-Time Conflict Shield',
    tagline: 'Experience how bi-directional Google & Outlook Calendar sync eliminates accidental double-bookings.',
    category: 'Calendar Engine',
    icon: <Calendar className="w-4 h-4 text-[#3B82F6]" />,
    durationSeconds: 22,
    sandboxTab: 'workflows',
    chapters: [
      { id: 'c1', title: 'Live Calendar Roster', timestamp: '00:00', startSecond: 0, description: 'Multi-practitioner schedule linked directly to Google Calendar.' },
      { id: 'c2', title: 'Emergency Block Ingestion', timestamp: '00:05', startSecond: 5, description: 'Clinician adds unexpected calendar block; delta caught in <120ms.' },
      { id: 'c3', title: 'Instant Conflict Shield', timestamp: '00:11', startSecond: 11, description: 'Conflicting slots immediately vanish from public client booking flow.' },
      { id: 'c4', title: 'Automated Buffer Lock', timestamp: '00:16', startSecond: 16, description: '15-minute room prep and sanitization buffers inserted automatically.' }
    ]
  },
  {
    id: 'crm-pipeline',
    title: 'Lead Pipeline: Automated Staff Triage',
    tagline: 'Review how incoming customer leads are scored, categorized, and flagged for rapid front-desk follow-up.',
    category: 'CRM & Pipeline',
    icon: <Users className="w-4 h-4 text-[#8B5CF6]" />,
    durationSeconds: 26,
    sandboxTab: 'pipeline',
    chapters: [
      { id: 'p1', title: 'New Lead Ingestion', timestamp: '00:00', startSecond: 0, description: 'Incoming multi-channel lead lands in the unconfirmed queue.' },
      { id: 'p2', title: 'Policy & Safety Flagging', timestamp: '00:06', startSecond: 6, description: 'System detects high-lift color / allergy requirement; flags for staff review.' },
      { id: 'p3', title: '1-Click Staff Action', timestamp: '00:13', startSecond: 13, description: 'Coordinator opens structured lead drawer and triggers 1-click WhatsApp text.' },
      { id: 'p4', title: 'Status Transition', timestamp: '00:20', startSecond: 20, description: 'Card transitions to "Follow-up Scheduled" with automated audit history.' }
    ]
  }
];

export const ProductVideoDemosSection: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useDemo();
  const [selectedDemoId, setSelectedDemoId] = useState<string>('whatsapp-frontdesk');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSecond, setCurrentSecond] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const activeDemo = VIDEO_DEMOS.find((d) => d.id === selectedDemoId) || VIDEO_DEMOS[0];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Playback timer loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentSecond((prev) => {
          if (prev >= activeDemo.durationSeconds) {
            return 0; // loop seamlessly
          }
          return Number((prev + 0.2 * playbackSpeed).toFixed(1));
        });
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, activeDemo.durationSeconds]);

  // Reset clock when changing demo
  const handleSelectDemo = (id: string) => {
    setSelectedDemoId(id);
    setCurrentSecond(0);
    setIsPlaying(true);
  };

  const handleJumpToChapter = (startSecond: number) => {
    setCurrentSecond(startSecond);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSecond(Number(e.target.value));
  };

  const currentChapterIndex = activeDemo.chapters.findIndex((c, idx) => {
    const nextChapter = activeDemo.chapters[idx + 1];
    if (!nextChapter) return true;
    return currentSecond >= c.startSecond && currentSecond < nextChapter.startSecond;
  });

  const activeChapter = activeDemo.chapters[currentChapterIndex] || activeDemo.chapters[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <section className="space-y-6">
      {/* Header with Surgy Health styling */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#EBF1EC] text-[#1E3A2F] text-xs font-semibold tracking-wider uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A43] animate-pulse" />
            <span>Interactive Product Demonstrations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1D1C]">
            Watch BookFlow_AI in Action
          </h2>
          <p className="text-xs sm:text-sm text-[#525E5A] leading-relaxed">
            Examine how BookFlow_AI coordinates customer inquiries, real-time calendar availability, ambient voice transcription, and CRM pipeline handoffs in live simulated software runs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab(activeDemo.sandboxTab)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1E3A2F] hover:bg-[#284E3F] rounded-md transition-colors shadow-xs"
          >
            <span>Launch This in Sandbox</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Demo Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {VIDEO_DEMOS.map((demo) => {
          const isSelected = demo.id === activeDemo.id;
          return (
            <button
              key={demo.id}
              onClick={() => handleSelectDemo(demo.id)}
              className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#1E3A2F] shadow-xs ring-1 ring-[#1E3A2F]'
                  : 'bg-[#FAF8F5] border-[#E7E2DA] hover:border-[#D5CEC2] hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="p-1 rounded bg-[#EBF1EC]">{demo.icon}</span>
                <span className="text-[10px] font-mono text-[#737E7A] bg-white px-1.5 py-0.5 rounded border border-[#E7E2DA]">
                  {formatTime(demo.durationSeconds)}
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-[#1A1D1C] line-clamp-1">{demo.title}</div>
                <div className="text-[11px] text-[#63706B] line-clamp-1 mt-0.5">{demo.category}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Video Demo Showcase Frame (macOS Browser Frame) */}
      <div
        className={`bg-white border border-[#DDD5C7] rounded-2xl overflow-hidden shadow-sm transition-all ${
          isFullscreen ? 'fixed inset-4 z-50 flex flex-col justify-between shadow-2xl' : ''
        }`}
      >
        {/* Browser Top Window Bar */}
        <div className="bg-[#F4F0E8] border-b border-[#E3DDD3] px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            <span className="ml-3 font-mono text-[11px] text-[#717E79] hidden sm:inline">
              BookFlow_AI Studio · Player v2.4
            </span>
          </div>

          <div className="flex-1 max-w-md hidden md:flex items-center justify-center">
            <div className="w-full bg-white/90 border border-[#DDD5C7] px-3 py-1 rounded-md text-[11px] font-mono text-[#586460] flex items-center justify-between">
              <span className="truncate">https://app.bookflow.ai/simulated-run/{activeDemo.id}</span>
              <span className="w-2 h-2 rounded-full bg-[#2D5A43] shrink-0 ml-2" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-[#EBF1EC] text-[#1E3A2F] px-2 py-0.5 rounded font-mono text-[10px] font-semibold">
              <Activity className="w-3 h-3 text-[#2D5A43] animate-pulse" />
              <span>LIVE SIMULATION</span>
            </div>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 rounded text-[#6E7B76] hover:text-[#1A1D1C] hover:bg-[#EAE5DC]"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Video Canvas / Dynamic Screen Simulation */}
        <div className="relative min-h-[380px] sm:min-h-[460px] bg-[#FAF8F5] p-5 sm:p-8 flex flex-col justify-between overflow-hidden">
          {/* Top Stage Indicator & Active Chapter Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 z-10">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#E3DDD3] shadow-2xs">
              <span className="p-1 rounded bg-[#EBF1EC] text-[#1E3A2F]">
                {activeDemo.icon}
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#737E7A] block leading-none">
                  Stage {currentChapterIndex + 1} of {activeDemo.chapters.length}
                </span>
                <span className="text-xs font-bold text-[#1A1D1C]">
                  {activeChapter.title}
                </span>
              </div>
            </div>

            <div className="text-xs text-[#55635F] bg-white/90 backdrop-blur-xs px-3 py-1 rounded-md border border-[#E3DDD3] font-mono">
              {formatTime(currentSecond)} / {formatTime(activeDemo.durationSeconds)}
            </div>
          </div>

          {/* SIMULATION VISUAL SCREEN (Differs based on active demo) */}
          <div className="my-auto py-6 max-w-2xl mx-auto w-full">
            {/* DEMO 1: Frontdesk WhatsApp Demo */}
            {activeDemo.id === 'whatsapp-frontdesk' && (
              <div className="bg-white border border-[#E3DDD3] rounded-xl shadow-xs overflow-hidden">
                <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                      BF
                    </div>
                    <div>
                      <div className="text-xs font-semibold">CarePoint Clinic Assistant</div>
                      <div className="text-[10px] text-white/80 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                        <span>Online · Verified Meta API</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded">
                    WA-SIM-349
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-3 bg-[#EFEAE2]/40 min-h-[220px]">
                  {/* Message 1 */}
                  <div className="flex gap-2 max-w-sm mr-auto">
                    <div className="p-3 rounded-xl rounded-tl-none bg-white text-xs text-[#1A1D1C] shadow-2xs border border-[#E5E0D6] space-y-1">
                      <p>"Hi! Do you have any appointments available with Dr. Jenkins this Thursday for a routine health check?"</p>
                      <span className="text-[9px] text-[#788581] block text-right">10:14 AM</span>
                    </div>
                  </div>

                  {/* Message 2: Appears when currentSecond >= 4 */}
                  {currentSecond >= 4 && (
                    <div className="flex gap-2 max-w-sm ml-auto flex-row-reverse animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="p-3 rounded-xl rounded-tr-none bg-[#E7FFDB] text-xs text-[#0F2F20] shadow-2xs border border-[#BDE8AB] space-y-1.5">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-[#075E54]">
                          <Sparkles className="w-3 h-3" />
                          <span>BookFlow_AI Auto-Schedule</span>
                        </div>
                        <p>
                          "Hello Julian! Dr. Jenkins has two verified openings this Thursday: <strong>9:30 AM</strong> or <strong>11:15 AM</strong>. Which slot suits you best?"
                        </p>
                        <span className="text-[9px] text-[#476B55] block text-right font-mono">10:14 AM · Sent in 2.8s</span>
                      </div>
                    </div>
                  )}

                  {/* Message 3: Client confirms slot when currentSecond >= 11 */}
                  {currentSecond >= 11 && (
                    <div className="flex gap-2 max-w-sm mr-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="p-3 rounded-xl rounded-tl-none bg-white text-xs text-[#1A1D1C] shadow-2xs border border-[#E5E0D6] space-y-1">
                        <p>"Thursday 9:30 AM works perfectly for me. Thank you!"</p>
                        <span className="text-[9px] text-[#788581] block text-right">10:15 AM</span>
                      </div>
                    </div>
                  )}

                  {/* Message 4: Confirmation & Calendar Hold when currentSecond >= 17 */}
                  {currentSecond >= 17 && (
                    <div className="flex gap-2 max-w-sm ml-auto flex-row-reverse animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="p-3 rounded-xl rounded-tr-none bg-[#E7FFDB] text-xs text-[#0F2F20] shadow-2xs border border-[#BDE8AB] space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#075E54]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Hold Confirmed · Google Calendar Locked</span>
                        </div>
                        <p>
                          "Confirmed! We've held 9:30 AM on Thursday, Oct 24. A staff coordinator will verify insurance details prior to check-in."
                        </p>
                        <div className="bg-white/80 p-2 rounded text-[10px] font-mono text-[#2D5A43] border border-[#CCDCD0]">
                          TICKET #LEAD-104 · DR. JENKINS (ROOM 2B)
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DEMO 2: Voice Call Agent */}
            {activeDemo.id === 'voice-reception' && (
              <div className="bg-white border border-[#E3DDD3] rounded-xl shadow-xs p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] animate-ping" />
                    <span className="font-semibold text-xs text-[#1A1D1C]">Active Call: Front Desk Line (555-0192)</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded font-bold">
                    CALL DURATION: {formatTime(currentSecond)}
                  </span>
                </div>

                {/* Animated Speech Waveform */}
                <div className="bg-[#FAF8F5] border border-[#E7E2DA] p-4 rounded-xl flex items-center justify-center gap-1.5 h-16">
                  {[24, 45, 18, 62, 85, 30, 70, 95, 40, 80, 55, 90, 35, 65, 45, 85, 20].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-[#1E3A2F] rounded-full transition-all duration-150"
                      style={{
                        height: isPlaying ? `${Math.min(100, Math.max(15, (h * (Math.sin(currentSecond * 5 + i) + 1.2)) / 2))}%` : '20%'
                      }}
                    />
                  ))}
                </div>

                {/* Real-time Streaming Transcript */}
                <div className="space-y-2 text-xs">
                  <div className="text-[11px] font-mono text-[#737E7A] uppercase">
                    Ambient Neural Transcript:
                  </div>
                  <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-[#E7E2DA] text-[#2D3833] leading-relaxed">
                    {currentSecond < 7 && (
                      <span className="italic text-[#788581]">
                        [Agent] "Thank you for calling CarePoint Family Medicine. I am the automated booking coordinator. How may I assist you today?"
                      </span>
                    )}
                    {currentSecond >= 7 && currentSecond < 14 && (
                      <span>
                        [Caller] <em>"Hi, I was hoping to schedule an annual routine screening next week, preferably Tuesday afternoon after 2 PM."</em>
                      </span>
                    )}
                    {currentSecond >= 14 && currentSecond < 21 && (
                      <span>
                        [Agent] <em>"Understood. Checking our primary physician schedule... Dr. Alan Morales has an opening at 2:30 PM next Tuesday. May I hold that slot for your phone number ending in 8910?"</em>
                      </span>
                    )}
                    {currentSecond >= 21 && (
                      <div className="space-y-1.5">
                        <span className="font-medium text-[#1E3A2F]">
                          [Agent] "Slot held! A confirmation SMS with pre-visit intake instructions has been dispatched to your mobile. Thank you!"
                        </span>
                        <div className="mt-2 p-2 bg-[#EBF1EC] text-[#1E3A2F] font-mono text-[10px] rounded border border-[#CCDCD0] flex items-center justify-between">
                          <span>SMS DISPATCH: #SMS-8492 DELIVERED</span>
                          <span>CRM STATUS: CONTACT REQUIRED</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* DEMO 3: Calendar Sync & Conflict Prevention */}
            {activeDemo.id === 'calendar-sync' && (
              <div className="bg-white border border-[#E3DDD3] rounded-xl shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#3B82F6]" />
                    <span className="font-semibold text-xs text-[#1A1D1C]">Bi-Directional Calendar Engine</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#3B82F6] bg-[#EFF6FF] px-2 py-0.5 rounded font-bold">
                    CALDAV / GOOGLE API
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Left: Provider Google Calendar */}
                  <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-[#E7E2DA] space-y-2 text-xs">
                    <div className="font-semibold text-[#1A1D1C] flex items-center justify-between">
                      <span>Dr. Jenkins Schedule</span>
                      <span className="text-[10px] font-mono text-[#737E7A]">OCT 24</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="p-2 rounded bg-white border border-[#E2DDD5] flex justify-between text-[11px]">
                        <span>08:30 AM - Staff Huddle</span>
                        <span className="font-mono text-[#788581]">Internal</span>
                      </div>

                      <div
                        className={`p-2 rounded border transition-all text-[11px] ${
                          currentSecond >= 5
                            ? 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B] font-medium'
                            : 'bg-white border-[#E2DDD5] text-[#1A1D1C]'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>10:00 AM - {currentSecond >= 5 ? 'Urgent Hospital Rounds (Blocked)' : 'Open Slot'}</span>
                          {currentSecond >= 5 && (
                            <span className="text-[9px] font-mono bg-[#FEE2E2] px-1 py-0.2 rounded font-bold">
                              NEW DELTA
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-2 rounded bg-[#EBF1EC] border border-[#CCDCD0] text-[11px] text-[#1E3A2F]">
                        <span>11:15 AM - General Consult (Held)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Public Client Booking Window */}
                  <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-[#E7E2DA] space-y-2 text-xs">
                    <div className="font-semibold text-[#1A1D1C] flex items-center justify-between">
                      <span>Client Available Slots</span>
                      <span className="text-[10px] font-mono text-[#2D5A43]">SHIELD ACTIVE</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="p-2 rounded bg-white border border-[#E2DDD5] flex justify-between items-center text-[11px]">
                        <span>09:30 AM Available</span>
                        <span className="text-[#2D5A43] font-semibold">Ready</span>
                      </div>

                      {currentSecond < 11 ? (
                        <div className="p-2 rounded bg-white border border-[#E2DDD5] flex justify-between items-center text-[11px]">
                          <span>10:00 AM Available</span>
                          <span className="text-[#788581]">Evaluating</span>
                        </div>
                      ) : (
                        <div className="p-2 rounded bg-[#F5F2EB] border border-[#E2DDD5] flex justify-between items-center text-[11px] text-[#8C5E09]">
                          <span className="line-through text-[#788581]">10:00 AM Removed</span>
                          <span className="text-[10px] font-mono bg-[#FFFBEB] px-1.5 py-0.5 rounded text-[#B45309] font-bold">
                            CONFLICT PREVENTED
                          </span>
                        </div>
                      )}

                      <div className="p-2 rounded bg-white border border-[#E2DDD5] flex justify-between items-center text-[11px]">
                        <span>11:15 AM Available</span>
                        <span className="text-[#2D5A43] font-semibold">Ready</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#EBF1EC] text-xs text-[#1E3A2F] border border-[#CCDCD0] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
                    <span>Real-time conflict evaluation latency: <strong>84ms</strong>. Zero double-booking risk.</span>
                  </div>
                </div>
              </div>
            )}

            {/* DEMO 4: CRM Lead Pipeline & Staff Routing */}
            {activeDemo.id === 'crm-pipeline' && (
              <div className="bg-white border border-[#E3DDD3] rounded-xl shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA]">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#8B5CF6]" />
                    <span className="font-semibold text-xs text-[#1A1D1C]">BookFlow_AI CRM Pipeline Triage</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#8B5CF6] bg-[#F5F3FF] px-2 py-0.5 rounded font-bold">
                    PIPELINE DISPATCH
                  </span>
                </div>

                {/* 3 Pipeline Column Mockup */}
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  {/* Column 1: New */}
                  <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E7E2DA] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#55635F]">
                      <span>New (1)</span>
                    </div>

                    {currentSecond < 6 ? (
                      <div className="p-2 rounded bg-white border border-[#E3DDD3] shadow-2xs space-y-1">
                        <div className="font-bold text-[#1A1D1C]">Elena Rostova</div>
                        <div className="text-[10px] text-[#788581]">Balayage 3-hr Consult</div>
                        <span className="text-[9px] font-mono bg-[#EBF1EC] text-[#1E3A2F] px-1 py-0.2 rounded">
                          CHANNEL: WHATSAPP
                        </span>
                      </div>
                    ) : (
                      <div className="text-[10px] text-[#A1AAA6] italic text-center py-4">
                        Queue cleared
                      </div>
                    )}
                  </div>

                  {/* Column 2: Contact Required */}
                  <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E7E2DA] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C5E09]">
                      <span>Contact Required</span>
                    </div>

                    {currentSecond >= 6 && currentSecond < 20 && (
                      <div className="p-2 rounded bg-[#FFFBEB] border border-[#FDE68A] shadow-xs space-y-1 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1A1D1C]">Elena Rostova</span>
                          <span className="text-[9px] font-mono bg-[#FEF3C7] text-[#B45309] px-1 rounded font-bold">
                            SAFETY FLAG
                          </span>
                        </div>
                        <div className="text-[10px] text-[#78350F]">Patch test required 48h prior</div>
                        <div className="pt-1 flex gap-1">
                          <span className="text-[9px] bg-[#1E3A2F] text-white px-1.5 py-0.5 rounded font-medium">
                            1-Click Follow-up
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Column 3: Follow-up Scheduled */}
                  <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E7E2DA] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#1E3A2F]">
                      <span>Follow-up Scheduled</span>
                    </div>

                    {currentSecond >= 20 && (
                      <div className="p-2 rounded bg-[#EBF1EC] border border-[#CCDCD0] shadow-xs space-y-1 animate-in zoom-in-95 duration-200">
                        <div className="font-bold text-[#1E3A2F]">Elena Rostova</div>
                        <div className="text-[10px] text-[#2D5A43]">Stylist Chair 3 Reserved</div>
                        <div className="text-[9px] font-mono text-[#52605B]">Staff: Marcus Sterling</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#E7E2DA] text-xs text-[#525E5A] flex items-center justify-between">
                  <span>Front desk response time: <strong>4.2 minutes</strong> (Industry average: 3.8 hours).</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Interactive Video Controls & Scrub Bar */}
          <div className="bg-white/95 backdrop-blur-xs p-3 sm:p-4 rounded-xl border border-[#DDD5C7] shadow-xs space-y-3 z-10">
            {/* Scrubber Progress Bar */}
            <div className="space-y-1">
              <input
                type="range"
                min={0}
                max={activeDemo.durationSeconds}
                step={0.1}
                value={currentSecond}
                onChange={handleSeek}
                className="w-full h-1.5 bg-[#EAE5DC] rounded-lg appearance-none cursor-pointer accent-[#1E3A2F]"
              />
              <div className="flex items-center justify-between text-[10px] font-mono text-[#737E7A]">
                <span>{formatTime(currentSecond)}</span>
                <span className="font-sans font-medium text-[#1A1D1C] truncate px-2">
                  {activeChapter.title}: {activeChapter.description}
                </span>
                <span>{formatTime(activeDemo.durationSeconds)}</span>
              </div>
            </div>

            {/* Play/Pause & Speed Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#F0EBE3]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center hover:bg-[#284E3F] transition-colors shadow-2xs"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={() => setCurrentSecond(0)}
                  className="p-1.5 rounded text-[#6E7B76] hover:text-[#1A1D1C] hover:bg-[#F3EFE9]"
                  title="Replay from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-px bg-[#E2DDD5] mx-1" />

                {/* Chapter Jump Buttons */}
                <div className="hidden sm:flex items-center gap-1">
                  {activeDemo.chapters.map((ch, idx) => (
                    <button
                      key={ch.id}
                      onClick={() => handleJumpToChapter(ch.startSecond)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                        currentChapterIndex === idx
                          ? 'bg-[#1E3A2F] text-white font-bold'
                          : 'bg-[#F5F2EB] text-[#55635F] hover:bg-[#EAE5DC]'
                      }`}
                    >
                      {idx + 1}. {ch.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {/* Speed Selector */}
                <div className="flex items-center rounded-md bg-[#F5F2EB] border border-[#E0D9CD] p-0.5 text-[10px] font-mono font-medium">
                  {[1, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-1.5 py-0.5 rounded ${
                        playbackSpeed === spd ? 'bg-white text-[#1E3A2F] font-bold shadow-2xs' : 'text-[#737E7A]'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded text-[#6E7B76] hover:text-[#1A1D1C] hover:bg-[#F3EFE9]"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
