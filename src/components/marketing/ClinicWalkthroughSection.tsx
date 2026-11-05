import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Phone,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface ClinicWalkthroughSectionProps {
  onBookAuditClick: () => void;
  onExploreWorkflows?: () => void;
}

const TOTAL_DURATION = 9.0; // 9-second walkthrough

interface Milestone {
  time: number;
  id: string;
  label: string;
  title: string;
  timestamp: string;
  voiceText: string;
  subtitles: {
    hinglish: string;
    english: string;
  };
}

const MILESTONES: Milestone[] = [
  {
    time: 0.0,
    id: 'intro',
    label: 'Intro',
    title: 'Clinic appointment introduction',
    timestamp: '00:00',
    voiceText: 'Clinic appointment booking dekhiye.',
    subtitles: {
      hinglish: 'Clinic appointment booking dekhiye.',
      english: 'Watch seamless clinic appointment booking in action.'
    }
  },
  {
    time: 2.0,
    id: 'slots',
    label: 'Date & Slot',
    title: 'Date and time slot selection',
    timestamp: '00:02',
    voiceText: 'Date aur time slot select karein,',
    subtitles: {
      hinglish: 'Date aur time slot select karein,',
      english: 'Select date and preferred slot with 15-min doctor buffer rules.'
    }
  },
  {
    time: 4.0,
    id: 'intake',
    label: 'Patient Intake',
    title: 'Visitor details intake',
    timestamp: '00:04',
    voiceText: 'apni details enter karein,',
    subtitles: {
      hinglish: 'apni details enter karein,',
      english: 'Enter patient details with instant WhatsApp contact verification.'
    }
  },
  {
    time: 6.0,
    id: 'confirm',
    label: 'Confirmation',
    title: 'Booking confirmation',
    timestamp: '00:06',
    voiceText: 'aur booking confirm.',
    subtitles: {
      hinglish: 'aur booking confirm.',
      english: 'Booking confirmed with automated reminder scheduling.'
    }
  },
  {
    time: 8.0,
    id: 'demo',
    label: 'Live Demo',
    title: 'Live demo invitation',
    timestamp: '00:08',
    voiceText: 'BookFlow_AI ka live demo abhi book karein.',
    subtitles: {
      hinglish: 'BookFlow_AI ka live demo abhi book karein.',
      english: 'Book your live BookFlow_AI demonstration today.'
    }
  }
];

export const ClinicWalkthroughSection: React.FC<ClinicWalkthroughSectionProps> = ({
  onBookAuditClick,
  onExploreWorkflows
}) => {
  const [currentTime, setCurrentTime] = useState<number>(0.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [soundSupported, setSoundSupported] = useState<boolean>(true);
  const [audioFeedback, setAudioFeedback] = useState<string>('');
  const [activeMode, setActiveMode] = useState<'video' | 'walkthrough'>('video');
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const lastSpokenIndexRef = useRef<number>(-1);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Determine current active milestone index (0 to 4)
  const getActiveMilestoneIndex = useCallback((time: number) => {
    if (time >= 8.0) return 4;
    if (time >= 6.0) return 3;
    if (time >= 4.0) return 2;
    if (time >= 2.0) return 1;
    return 0;
  }, []);

  const activeIndex = getActiveMilestoneIndex(currentTime);
  const currentMilestone = MILESTONES[activeIndex];
  const isEndScreen = currentTime >= 8.0;

  // Web Audio chime generator for haptic audible cues
  const playChime = useCallback((type: 'select' | 'confirm' | 'cta') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'select') {
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'confirm') {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'cta') {
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.2); // E5
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch {
      // AudioContext unavailable or blocked
    }
  }, [isMuted]);

  // Speech synthesis voiceover trigger
  const speakMilestone = useCallback((index: number) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const milestone = MILESTONES[index];
      const utterance = new SpeechSynthesisUtterance(milestone.voiceText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.lang = 'hi-IN';

      // Pick Indian voice if available
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(
        (v) =>
          v.lang === 'hi-IN' ||
          v.lang === 'en-IN' ||
          v.name.toLowerCase().includes('india') ||
          v.name.toLowerCase().includes('hindi')
      );
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onstart = () => {
        setAudioFeedback('Playing voiceover (Hindi-English)...');
      };
      utterance.onend = () => {
        setAudioFeedback('');
      };
      utterance.onerror = () => {
        setAudioFeedback('');
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      setSoundSupported(false);
    }
  }, [isMuted]);

  // Trigger audio cue and voice whenever milestone index advances
  useEffect(() => {
    if (activeIndex !== lastSpokenIndexRef.current) {
      lastSpokenIndexRef.current = activeIndex;
      if (!isMuted && isPlaying) {
        speakMilestone(activeIndex);
        if (activeIndex === 1) playChime('select');
        if (activeIndex === 3) playChime('confirm');
        if (activeIndex === 4) playChime('cta');
      }
    }
  }, [activeIndex, isMuted, isPlaying, speakMilestone, playChime]);

  // Main animation timer loop for simulated walkthrough
  useEffect(() => {
    if (activeMode !== 'walkthrough' || !isPlaying) {
      lastTimestampRef.current = null;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    const step = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const delta = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      setCurrentTime((prev) => {
        const next = prev + delta;
        if (next >= TOTAL_DURATION) {
          setIsPlaying(false);
          return TOTAL_DURATION;
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, activeMode]);

  // Handle Play / Pause toggle
  const togglePlay = () => {
    if (activeMode === 'video' && videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        if (currentTime >= TOTAL_DURATION) {
          videoRef.current.currentTime = 0;
          setCurrentTime(0);
        }
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }

    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
      lastSpokenIndexRef.current = -1;
      setIsPlaying(true);
    } else {
      const nextPlay = !isPlaying;
      setIsPlaying(nextPlay);
      if (!nextPlay && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  // Handle Mute / Unmute toggle
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }

    if (nextMuted) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setAudioFeedback('Audio Muted');
      setTimeout(() => setAudioFeedback(''), 1500);
    } else {
      setAudioFeedback('Sound Enabled (Hindi-English Voiceover)');
      setTimeout(() => setAudioFeedback(''), 2500);
      if (activeMode === 'walkthrough') {
        speakMilestone(activeIndex);
      }
    }
  };

  // Handle Jump to Milestone
  const handleSeek = (time: number) => {
    setCurrentTime(time);
    lastSpokenIndexRef.current = -1;

    if (activeMode === 'video' && videoRef.current) {
      videoRef.current.currentTime = time;
      if (!isPlaying) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      if (!isPlaying) {
        setIsPlaying(true);
      }
    }
  };

  // Handle Restart
  const handleRestart = () => {
    setCurrentTime(0);
    lastSpokenIndexRef.current = -1;

    if (activeMode === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      setIsPlaying(true);
    }
  };

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const s = Math.min(TOTAL_DURATION, Math.max(0, seconds));
    const sec = Math.floor(s);
    return `00:0${sec}`;
  };

  return (
    <section
      id="clinic-walkthrough"
      className="py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide shadow-xs">
            <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Healthcare Walkthrough</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Clinic Appointment Booking in 4 Steps
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Experience our 9-second automated patient scheduling workflow built for Indian clinics, diagnostic centers, and multi-specialty practices.
          </p>
        </div>

        {/* Video / Animated Walkthrough Main Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            {/* Top SaaS Window Header */}
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px] sm:text-xs">
                  <span className="text-cyan-400 font-bold">BookFlow_AI</span>
                  <span>/</span>
                  <span className="truncate">Apollo Care Clinic · Dr. Ananya Sharma</span>
                </div>
              </div>

              {/* Top controls: Walkthrough vs Video Clip */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-800 p-0.5 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveMode('walkthrough')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      activeMode === 'walkthrough'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Walkthrough
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMode('video')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                      activeMode === 'video'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Video Clip</span>
                  </button>
                </div>

                <span className="inline-flex items-center gap-1.5 bg-blue-950/80 border border-blue-500/40 text-blue-300 text-[10px] font-mono uppercase px-2 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SIMULATED DEMO</span>
                </span>
              </div>
            </div>

            {/* Interactive Screen Display (Aspect 16/9) */}
            <div className="relative aspect-video w-full bg-[#FAF8F5] flex flex-col justify-between overflow-hidden">
              {activeMode === 'video' ? (
                <div className="relative w-full h-full bg-[#070B09] flex items-center justify-center overflow-hidden group select-none">
                  {/* Cinematic emerald ambient backglow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,90,67,0.4)_0%,transparent_72%)] pointer-events-none z-0" />

                  {/* Corner branding watermark */}
                  <div className="absolute top-3.5 left-4 z-20 flex items-center gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>BookFlow_AI Clinic Workflow</span>
                    </span>
                  </div>

                  {/* Top-right active milestone tracker pill */}
                  <div className="absolute top-3.5 right-4 z-20 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-[#81C784]/30 text-[#A5D6A7] font-mono text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                      <span className="text-[#81C784] font-bold">0{activeIndex + 1}/05</span>
                      <span>·</span>
                      <span className="text-white">{MILESTONES[activeIndex].label}</span>
                    </span>
                  </div>

                  {/* The actual video element */}
                  <video
                    ref={videoRef}
                    src="/assets/aistudio/clinic-appointment-booking-demo_9fbec01f.mp4"
                    poster="/src/assets/images/solutions_clinic_practice_1792996519101.jpg"
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    onTimeUpdate={(e) => {
                      const t = e.currentTarget.currentTime;
                      setCurrentTime(t);
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => {
                      setIsPlaying(false);
                      setCurrentTime(TOTAL_DURATION);
                    }}
                    onClick={togglePlay}
                    className="w-full h-full object-contain relative z-10 cursor-pointer shadow-2xl transition-all duration-300"
                  />

                  {/* Center Play Overlay when paused or ended */}
                  {!isPlaying && (
                    <div
                      onClick={togglePlay}
                      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[2px] cursor-pointer transition-all duration-200 hover:bg-black/25"
                    >
                      <div className="relative group/btn flex items-center justify-center">
                        {/* Outer ambient glow pulse */}
                        <div className="absolute -inset-3 rounded-full bg-[#81C784]/25 blur-xl animate-pulse" />
                        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#1E3A2F] via-[#2D5A43] to-[#1E3A2F] border-2 border-[#81C784] text-white flex items-center justify-center shadow-[0_0_35px_rgba(45,90,67,0.7)] group-hover/btn:scale-110 group-hover/btn:shadow-[0_0_50px_rgba(129,199,132,0.8)] transition-all duration-300">
                          <Play className="w-8 h-8 fill-white translate-x-0.5 text-white" />
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col items-center gap-1">
                        <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg">
                          Click to Play 9-Second Clinic Booking Demo
                        </span>
                        <span className="text-[11px] font-mono text-[#A5D6A7] bg-[#14231B]/80 px-2 py-0.5 rounded border border-[#2D5A43]/60">
                          {isMuted ? 'Muted by default · Click Unmute below for Hindi-English audio' : 'Hindi-English voiceover active'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
              {/* Step 1: Clinic appointment introduction (00:00 - 00:02) */}
              {activeIndex === 0 && (
                <div className="p-6 sm:p-8 h-full flex flex-col justify-between animate-fadeIn">
                  {/* Doctor Profile Banner */}
                  <div className="bg-white rounded-xl p-5 border border-[#E7E2DA] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#1E3A2F] text-white flex items-center justify-center font-bold text-xl shadow-md shadow-[#1E3A2F]/20">
                        <Stethoscope className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-[#1A1D1C]">Dr. Ananya Sharma, MD</h4>
                          <span className="bg-[#EBF1EC] text-[#1E3A2F] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#CCDCD0]">
                            Available Today
                          </span>
                        </div>
                        <p className="text-xs text-[#5D6B66] mt-0.5">
                          Senior Consultant Cardiologist & General Physician · 14 yrs exp
                        </p>
                        <p className="text-[11px] text-[#73827D] mt-0.5">
                          Apex Heart & Wellness Clinic, South Delhi
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#EFEBE4]">
                      <span className="text-xs text-[#5D6B66] block">Consultation Fee</span>
                      <span className="text-xl font-extrabold text-[#1A1D1C]">₹800</span>
                      <span className="text-[11px] text-[#2D5A43] block font-medium">WhatsApp Booking Active</span>
                    </div>
                  </div>

                  {/* Consultation Mode Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#EBF1EC]/70 border-2 border-[#1E3A2F] rounded-xl p-4 shadow-xs relative">
                      <div className="absolute top-3 right-3 text-[#1E3A2F]">
                        <CheckCircle2 className="w-5 h-5 fill-[#1E3A2F] text-white" />
                      </div>
                      <span className="text-xs font-semibold text-[#1E3A2F] block">In-Clinic Consultation</span>
                      <span className="text-xs text-[#52605B] mt-1 block">
                        Apex Clinic, Main Ring Road, New Delhi
                      </span>
                      <span className="text-[11px] text-[#2D5A43] font-medium mt-2 inline-block">
                        Next slot: Today, 02:15 PM
                      </span>
                    </div>

                    <div className="bg-white border border-[#E7E2DA] rounded-xl p-4 opacity-75">
                      <span className="text-xs font-semibold text-[#2F3A36] block">Online Video Consultation</span>
                      <span className="text-xs text-[#717E79] mt-1 block">
                        Encrypted HD Video via WhatsApp link
                      </span>
                      <span className="text-[11px] text-[#717E79] font-medium mt-2 inline-block">
                        Slot: Tomorrow, 11:00 AM
                      </span>
                    </div>
                  </div>

                  {/* BookFlow_AI Automation Rule Note */}
                  <div className="bg-white rounded-lg px-3 py-2 text-[11px] text-[#52605B] flex items-center justify-between border border-[#E7E2DA]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#2D5A43] shrink-0" />
                      <span>Step 1 of 4: Patient selects consultation channel & doctor profile.</span>
                    </div>
                    <span className="font-mono text-[#717E79] text-[10px]">TIMESTAMP 00:00</span>
                  </div>
                </div>
              )}

              {/* Step 2: Date and time slot selection (00:02 - 00:04) */}
              {activeIndex === 1 && (
                <div className="p-6 sm:p-8 h-full flex flex-col justify-between animate-fadeIn">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold text-[#1A1D1C] flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#2D5A43]" />
                          <span>Select Appointment Date & Time Slot</span>
                        </h4>
                        <p className="text-xs text-[#5D6B66] mt-0.5">
                          Enforcing mandatory 15-minute sanitization & record-review buffer
                        </p>
                      </div>
                      <span className="text-xs font-medium text-[#2F3A36] bg-white px-3 py-1 rounded-lg border border-[#E7E2DA] shadow-2xs">
                        October 2026
                      </span>
                    </div>

                    {/* Date Bar */}
                    <div className="flex gap-2.5 overflow-x-auto pb-1">
                      <div className="bg-[#1E3A2F] text-white rounded-xl px-4 py-2 text-center shrink-0 shadow-sm cursor-pointer">
                        <span className="text-[10px] uppercase font-bold tracking-wider block text-[#A5D6A7]">TODAY</span>
                        <span className="text-base font-extrabold block">28 OCT</span>
                      </div>
                      <div className="bg-white border border-[#E7E2DA] rounded-xl px-4 py-2 text-center shrink-0 opacity-80">
                        <span className="text-[10px] uppercase font-semibold text-[#717E79] block">WED</span>
                        <span className="text-base font-bold text-[#2F3A36] block">29 OCT</span>
                      </div>
                      <div className="bg-white border border-[#E7E2DA] rounded-xl px-4 py-2 text-center shrink-0 opacity-80">
                        <span className="text-[10px] uppercase font-semibold text-[#717E79] block">THU</span>
                        <span className="text-base font-bold text-[#2F3A36] block">30 OCT</span>
                      </div>
                    </div>

                    {/* Time Slot Chips */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-[#2F3A36] uppercase tracking-wider block">
                        Available Afternoon Slots:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="bg-white border border-[#E7E2DA] rounded-xl p-2.5 text-center text-xs font-medium text-[#52605B]">
                          10:30 AM
                        </div>

                        {/* Selected Slot with active animation */}
                        <div className="bg-[#EBF1EC] border-2 border-[#1E3A2F] rounded-xl p-2.5 text-center relative shadow-xs ring-2 ring-[#1E3A2F]/20">
                          <span className="text-xs font-bold text-[#1E3A2F] block">02:15 PM</span>
                          <span className="text-[9px] text-[#2D5A43] font-semibold block mt-0.5">
                            Selected · 15m Buffer
                          </span>
                        </div>

                        <div className="bg-white border border-[#E7E2DA] rounded-xl p-2.5 text-center text-xs font-medium text-[#52605B]">
                          04:45 PM
                        </div>

                        <div className="bg-white border border-[#E7E2DA] rounded-xl p-2.5 text-center text-xs font-medium text-[#52605B]">
                          06:30 PM
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#EBF1EC] rounded-lg px-3 py-2 text-[11px] text-[#1E3A2F] flex items-center justify-between border border-[#CCDCD0]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43] shrink-0" />
                      <span>Step 2 of 4: Real-time doctor calendar lock applied for 15 minutes.</span>
                    </div>
                    <span className="font-mono text-[#2D5A43] text-[10px]">TIMESTAMP 00:02</span>
                  </div>
                </div>
              )}

              {/* Step 3: Visitor details intake (00:04 - 00:06) */}
              {activeIndex === 2 && (
                <div className="p-6 sm:p-8 h-full flex flex-col justify-between animate-fadeIn">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold text-[#1A1D1C] flex items-center gap-2">
                          <User className="w-4 h-4 text-[#2D5A43]" />
                          <span>Patient Information Intake</span>
                        </h4>
                        <p className="text-xs text-[#5D6B66] mt-0.5">
                          Auto-extracted from WhatsApp or web chat inquiry
                        </p>
                      </div>
                      <span className="text-[10px] bg-[#EBF1EC] text-[#1E3A2F] border border-[#CCDCD0] font-semibold px-2.5 py-1 rounded-md">
                        Auto-Filled
                      </span>
                    </div>

                    {/* Mock Form */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#2F3A36]">Patient Full Name</label>
                        <div className="bg-white border border-[#DCD6CC] rounded-lg px-3 py-2 text-[#1A1D1C] font-medium flex items-center justify-between shadow-2xs">
                          <span>Rahul Verma</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43]" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#2F3A36]">WhatsApp Mobile Number</label>
                        <div className="bg-white border border-[#DCD6CC] rounded-lg px-3 py-2 text-[#1A1D1C] font-medium flex items-center justify-between shadow-2xs">
                          <span>+91 98765 43210</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43]" />
                        </div>
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[11px] font-semibold text-[#2F3A36]">Reason for Consultation</label>
                        <div className="bg-white border border-[#DCD6CC] rounded-lg px-3 py-2 text-[#1A1D1C] font-medium flex items-center justify-between shadow-2xs">
                          <span>Follow-up BP Check & Routine Cardiac Evaluation</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43]" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#52605B] pt-1">
                      <div className="w-4 h-4 rounded bg-[#1E3A2F] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                      <span>Send instant appointment confirmation & location pin via WhatsApp</span>
                    </div>
                  </div>

                  <div className="bg-[#EBF1EC] rounded-lg px-3 py-2 text-[11px] text-[#1E3A2F] flex items-center justify-between border border-[#CCDCD0]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A43] shrink-0" />
                      <span>Step 3 of 4: Patient details collected with Indian mobile (+91) format.</span>
                    </div>
                    <span className="font-mono text-[#2D5A43] text-[10px]">TIMESTAMP 00:04</span>
                  </div>
                </div>
              )}

              {/* Step 4: Booking confirmation (00:06 - 00:08) */}
              {activeIndex === 3 && (
                <div className="p-6 sm:p-8 h-full flex flex-col justify-between animate-fadeIn">
                  <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-md space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          Appointment Slot Successfully Confirmed
                        </h4>
                        <p className="text-xs text-emerald-700 font-medium">
                          Token #FP-DEL-8921 · Calendar Hold Verified
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl text-xs border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Doctor</span>
                        <span className="font-bold text-slate-800">Dr. Ananya Sharma</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Date & Time</span>
                        <span className="font-bold text-slate-800">Today, 02:15 PM</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Patient</span>
                        <span className="font-bold text-slate-800">Rahul Verma (+91)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>Automated WhatsApp reminder scheduled 2 hours before visit</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-lg px-3 py-2 text-[11px] text-emerald-800 flex items-center justify-between border border-emerald-200">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Step 4 of 4: Booking synchronized to clinic staff dashboard.</span>
                    </div>
                    <span className="font-mono text-emerald-600 text-[10px]">TIMESTAMP 00:06</span>
                  </div>
                </div>
              )}

              {/* Step 5: Live demo invitation (00:08 - End Screen) */}
              {isEndScreen && (
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950 text-white p-6 sm:p-10 flex flex-col justify-between animate-fadeIn z-20">
                  <div className="space-y-3 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                      <Sparkles className="w-3 h-3 text-blue-400" />
                      <span>End Screen · Walkthrough Complete</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      Clinic Appointment Booking in 4 Steps
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      Transform your clinic front desk with BookFlow_AI. Automatically handle appointment inquiries, prevent calendar clashes, and send automated WhatsApp reminders across India.
                    </p>
                  </div>

                  {/* Dual Calls to Action */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                      <button
                        type="button"
                        onClick={onBookAuditClick}
                        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      >
                        <span>BookFlow_AI ka Live Demo Book Karein</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {onExploreWorkflows ? (
                        <button
                          type="button"
                          onClick={onExploreWorkflows}
                          className="px-5 py-3.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Explore Clinic & Other Workflows</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#81C784]" />
                        </button>
                      ) : (
                        <a
                          href="#industries"
                          className="px-5 py-3.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center"
                        >
                          <span>Explore Clinic & Other Workflows</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#81C784]" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={handleRestart}
                        className="p-3.5 rounded-xl border border-white/10 hover:bg-white/10 text-stone-300 hover:text-white transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                        title="Replay 9-second walkthrough"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Watch Again</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-400">
                      * Simulated demonstration. Production deployments connect directly to your Google/Outlook calendar and official WhatsApp Business account.
                    </p>
                  </div>
                </div>
              )}
                </>
              )}
            </div>

            {/* Live Subtitles & Hindi-English Captions Bar (Selector 2) */}
            <div className="relative bg-gradient-to-r from-[#0C120F] via-[#14231B] to-[#0C120F] border-t border-[#233A2D] px-4 sm:px-6 py-3.5 flex items-center justify-between text-xs gap-4 overflow-hidden shadow-inner">
              {/* Illuminated top rim accent line */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#81C784]/60 to-transparent pointer-events-none" />

              <div className="flex items-center gap-3.5 min-w-0">
                {/* Audio visualizer wave */}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#192B21] border border-[#2E4A3A] shrink-0 shadow-xs">
                  <div className="flex items-end gap-0.5 h-3.5 w-3.5 justify-center">
                    <span className={`w-0.5 rounded-full bg-[#81C784] transition-all duration-150 ${isPlaying && !isMuted ? 'h-3 animate-pulse' : 'h-1.5 opacity-60'}`} />
                    <span className={`w-0.5 rounded-full bg-[#81C784] transition-all duration-150 ${isPlaying && !isMuted ? 'h-3.5 animate-bounce' : 'h-2.5 opacity-80'}`} />
                    <span className={`w-0.5 rounded-full bg-[#81C784] transition-all duration-150 ${isPlaying && !isMuted ? 'h-2 animate-pulse' : 'h-1 opacity-50'}`} />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#A5D6A7] font-bold tracking-wider hidden sm:inline">
                    {isPlaying && !isMuted ? 'Narration' : isMuted ? 'Audio Muted' : 'Voiceover'}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#81C784] tracking-wider">
                      Step 0{activeIndex + 1} of 5
                    </span>
                    <span className="text-stone-600">·</span>
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                      {currentMilestone.title}
                    </span>
                  </div>
                  <p className="text-white font-bold text-sm sm:text-base leading-snug tracking-tight truncate mt-0.5">
                    "{currentMilestone.subtitles.hinglish}"
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#A1B5AC] truncate mt-0.5">
                    {currentMilestone.subtitles.english}
                  </p>
                </div>
              </div>

              {/* Sound status feedback & timer badge */}
              <div className="flex items-center gap-2 shrink-0">
                {audioFeedback ? (
                  <span className="text-[10px] font-mono text-[#A5D6A7] bg-[#1E3A2F]/80 border border-[#2D5A43] px-2.5 py-1 rounded-md font-semibold hidden md:inline">
                    {audioFeedback}
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-[#81C784] bg-black/40 border border-[#263D30] px-2.5 py-1 rounded-md font-bold hidden sm:inline">
                    {currentMilestone.timestamp} / 00:09
                  </span>
                )}
              </div>
            </div>

            {/* Scrubbable 9-Second Timeline & Controls Ribbon */}
            <div className="bg-[#0B0F0D] p-4 sm:p-5 border-t border-stone-800/90 space-y-3.5">
              {/* Progress Slider */}
              <div className="space-y-1.5">
                <div
                  className="relative h-2 w-full bg-stone-800 rounded-full cursor-pointer overflow-hidden group shadow-inner"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = Math.max(0, Math.min(1, clickX / rect.width));
                    handleSeek(pct * TOTAL_DURATION);
                  }}
                  title="Click or drag to scrub walkthrough"
                >
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 rounded-full transition-[width] duration-75 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                    style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
                  />
                  {/* Visual marker notches on timeline */}
                  {MILESTONES.map((m) => (
                    <div
                      key={m.id}
                      className="absolute top-0 bottom-0 w-0.5 bg-stone-600/80 pointer-events-none"
                      style={{ left: `${(m.time / TOTAL_DURATION) * 100}%` }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span className="text-cyan-400 font-semibold">{formatTime(currentTime)}</span>
                  <span className="text-stone-500">Duration: 00:09</span>
                </div>
              </div>

              {/* Milestone Step Buttons (5 timeline markers - Selector 4 and 3) */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                {MILESTONES.map((milestone, idx) => {
                  const isActive = activeIndex === idx;
                  const isPassed = currentTime >= milestone.time;

                  return (
                    <button
                      key={milestone.id}
                      type="button"
                      onClick={() => handleSeek(milestone.time)}
                      className={`p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer text-xs border relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                        isActive
                          ? 'bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 border-2 border-blue-400 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.35)] ring-1 ring-blue-400/60 -translate-y-0.5'
                          : isPassed
                          ? 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-blue-400/60 hover:bg-slate-800 hover:text-white'
                          : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-mono font-bold block ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                          0{idx + 1} · {milestone.timestamp}
                        </span>
                        {isActive ? (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                          </span>
                        ) : isPassed ? (
                          <span className="text-[10px] text-emerald-400 font-bold">✓</span>
                        ) : (
                          <span className="text-[9px] text-slate-600 font-mono">STEP</span>
                        )}
                      </div>
                      <span className={`text-xs font-bold truncate block mt-1 leading-tight ${isActive ? 'text-white' : 'text-slate-200'}`}>
                        {milestone.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal truncate block mt-0.5 hidden sm:block">
                        {idx === 0 && 'Doctor profile'}
                        {idx === 1 && '15m buffer rule'}
                        {idx === 2 && 'Patient details'}
                        {idx === 3 && 'Slot hold lock'}
                        {idx === 4 && 'Live invitation'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Accessible Controls Bar (Play/Pause, Unmute Sound, Restart, CTA) */}
              <div className="pt-2.5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800/80">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-2 sm:px-3 sm:py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 shadow-sm"
                    aria-label={isPlaying ? 'Pause walkthrough' : 'Play walkthrough'}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 text-cyan-300" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white text-white" />
                        <span>Play</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleRestart}
                    className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
                    title="Restart from beginning"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Restart</span>
                  </button>
                </div>

                {/* Visible Unmute / Mute Control & Transcript Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="px-2.5 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {showTranscript ? 'Hide Transcript' : 'Transcript'}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
                      isMuted
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                    }`}
                    aria-label={isMuted ? 'Unmute voiceover sound' : 'Mute voiceover sound'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-amber-400" />
                        <span>Unmute Sound</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span>Sound On</span>
                      </>
                    )}
                  </button>

                  {/* Prominent CTA below video */}
                  <button
                    type="button"
                    onClick={onBookAuditClick}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border border-blue-400/40 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5 cursor-pointer ml-1"
                  >
                    <span>Book Your Live Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
                  </button>
                </div>
              </div>

              {/* Accessible Transcript Drawer */}
              {showTranscript && (
                <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-2">
                  <span className="text-[11px] font-mono uppercase text-cyan-400 block font-semibold">
                    Hindi-English Audio Transcript & Timeline
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    {MILESTONES.map((m) => (
                      <div key={m.id} className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="font-mono text-cyan-400 font-bold mr-2">{m.timestamp}</span>
                        <span className="text-white font-medium">{m.title}: </span>
                        <span className="text-slate-300 italic">"{m.subtitles.hinglish}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4 Steps Feature Grid Breakdown below video */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all rounded-2xl p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center border border-blue-100">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900">Multi-Channel Patient Intake</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accepts booking requests via website chat, WhatsApp, or Google Business profile 24/7.
            </p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all rounded-2xl p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center border border-blue-100">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900">Doctor Buffer Enforcement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Applies 15-minute sanitization gaps and practitioner specialization filters automatically.
            </p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all rounded-2xl p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center border border-blue-100">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900">Pre-Visit Health Screening</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gathers symptoms, fasting status, and Indian phone numbers (+91) before confirming calendar slots.
            </p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all rounded-2xl p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center border border-blue-100">
              04
            </div>
            <h3 className="text-sm font-bold text-slate-900">Automated WhatsApp Reminders</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sends automated visit reminders 24 hours and 2 hours prior to cut clinic no-shows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
