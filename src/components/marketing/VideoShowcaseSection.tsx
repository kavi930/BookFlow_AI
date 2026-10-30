import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Smartphone,
  Video,
  Layers,
  MessageSquare,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

import heroPoster from '../../assets/images/hero_business_workspace_1792996517950.jpg';

interface VideoShowcaseSectionProps {
  videoSrc?: string;
  posterSrc?: string;
}

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({
  videoSrc = '/assets/aistudio/gemini_generated_video_e6044bf1_b4af1371.mp4',
  posterSrc = heroPoster
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(9);
  const [activeTab, setActiveTab] = useState<'featured-video' | 'interactive-flow'>('featured-video');

  // Ensure autoplay on mount with muted fallback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Autoplay prevented by browser:', err);
            setIsPlaying(false);
          });
      }
    }
  }, [videoSrc]);

  // Video time update handler
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {
          // Fallback if autoplay policy blocks
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Jump to timestamp
  const jumpToSecond = (sec: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = sec;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    const s = Math.floor(secs % 60);
    const m = Math.floor(secs / 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const videoSteps = [
    {
      time: 0,
      label: 'Clinic Appointment Intro',
      narration: '"Clinic appointment booking dekhiye..."',
      description: 'The presenter introduces the streamlined FlowPilot AI booking interface on a clinic desktop.'
    },
    {
      time: 2,
      label: 'Date & Time Slot Selection',
      narration: '"Date, Time slot..."',
      description: 'Customer chooses a suitable clinic calendar date and picks an open appointment window.'
    },
    {
      time: 4,
      label: 'Visitor Details Intake',
      narration: '"Details..."',
      description: 'Client enters name, email, phone number, and special health insurance or preparation notes.'
    },
    {
      time: 6,
      label: 'Booking Confirmed & Sync',
      narration: '"aur Booking Confirm!"',
      description: 'Slot is immediately locked with turnaround buffer, and an automated confirmation ticket is generated.'
    },
    {
      time: 8,
      label: 'Live Demo Invitation',
      narration: '"FlowPilot AI ka live demo abhi book karein."',
      description: 'Invite to schedule a personalized walkthrough for your practice or appointment business.'
    }
  ];

  return (
    <section id="video-showcase" className="py-16 sm:py-24 bg-white border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold tracking-wider text-[#2D5A43] uppercase block font-mono">
            Product Video Demonstration
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1D1C]">
            Watch FlowPilot AI in action.
          </h2>
          <p className="text-base sm:text-lg text-[#52605B] leading-relaxed">
            See how effortless appointment scheduling is with FlowPilot AI: date selection, verified time slots, visitor details, and instant confirmation in seconds.
          </p>
        </div>

        {/* Video Showcase Container: 2-Column Editorial Presentation */}
        <div className="bg-[#FAF8F5] border border-[#E3DDD3] rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: High-Fidelity Video Player (5 cols on desktop) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              {/* Smartphone / Bezel Frame for Portrait 9:16 Video */}
              <div className="relative w-full max-w-[340px] sm:max-w-[360px] bg-[#111312] border-4 sm:border-[6px] border-[#2A332F] rounded-[36px] shadow-2xl overflow-hidden aspect-[9/16] flex flex-col justify-between">
                {/* Speaker Notch & Camera Pin */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#1A1D1C] rounded-full z-30 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2F3A35] ml-auto mr-3" />
                </div>

                {/* Video Element with Poster Fallback */}
                <div className="relative w-full h-full flex-1 bg-black overflow-hidden flex items-center justify-center">
                  {!hasError ? (
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      playsInline
                      autoPlay
                      loop
                      muted={isMuted}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onError={() => setHasError(true)}
                      onClick={togglePlay}
                      className="w-full h-full object-cover cursor-pointer"
                      aria-label="FlowPilot AI Product Video Demonstration"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={posterSrc}
                        alt="FlowPilot AI Product Demonstration"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                      <div className="absolute bottom-16 left-4 right-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded bg-[#1E3A2F]/90 text-white text-[10px] font-mono font-semibold">
                          Cinematic Demo Preview · 9s Loop
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Frosted Play Overlay when Paused */}
                  {(!isPlaying || hasError) && (
                    <div
                      onClick={togglePlay}
                      className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center cursor-pointer z-20"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#1E3A2F]/90 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                        <Play className="w-8 h-8 fill-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Audio Mute / Unmute Indicator Overlay */}
                  <div className="absolute top-8 right-3 z-20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="px-2.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20 shadow-md"
                      title={isMuted ? 'Click to unmute video audio' : 'Mute audio'}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-[#E57373]" />
                          <span className="text-[10px] font-medium text-white">Unmute Sound</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#81C784]" />
                          <span className="text-[10px] font-medium text-white">Sound On</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Watermark Tag */}
                  <div className="absolute top-8 left-3 z-20 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/10">
                      FlowPilot AI · Demo
                    </span>
                  </div>
                </div>

                {/* Bottom Custom Video Controls */}
                <div className="p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-20 text-white space-y-1.5">
                  {/* Timeline Scrubber */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#CCDCD0] tabular-nums">
                      {formatTime(currentTime)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={duration || 9}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1 accent-[#81C784] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                      aria-label="Video scrubber"
                    />
                    <span className="text-[10px] font-mono text-[#9EA9A4] tabular-nums">
                      {formatTime(duration)}
                    </span>
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between pt-0.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="p-1 rounded text-white hover:text-[#81C784] transition-colors cursor-pointer"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>

                      <button
                        type="button"
                        onClick={handleRestart}
                        className="p-1 rounded text-white hover:text-[#81C784] transition-colors cursor-pointer"
                        aria-label="Restart video"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="p-1 rounded text-white hover:text-[#81C784] transition-colors cursor-pointer"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={handleFullscreen}
                        className="p-1 rounded text-white hover:text-[#81C784] transition-colors cursor-pointer"
                        aria-label="Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Note */}
              <div className="mt-3 text-center text-xs text-[#6F7C77]">
                <span>Tap video to play / pause · Unmute for audio walkthrough</span>
              </div>
            </div>

            {/* Right Column: Step-by-Step Breakdown Synchronized with the Video (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-[#2D5A43] font-semibold">
                  Walkthrough Sequence
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1D1C]">
                  Clinic Appointment Booking in 4 Steps
                </h3>
                <p className="text-sm text-[#52605B] leading-relaxed">
                  As shown in the video demonstration, FlowPilot AI provides a frictionless booking journey designed for healthcare clinics, dental offices, and medical practices.
                </p>
              </div>

              {/* Interactive Chapters Matching the Video Timestamps */}
              <div className="space-y-2.5">
                {videoSteps.map((step, idx) => {
                  const isActive =
                    currentTime >= step.time &&
                    (idx === videoSteps.length - 1 || currentTime < videoSteps[idx + 1].time);

                  return (
                    <div
                      key={idx}
                      onClick={() => jumpToSecond(step.time)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isActive
                          ? 'bg-white border-[#1E3A2F] shadow-xs ring-1 ring-[#1E3A2F]'
                          : 'bg-white/70 border-[#E5E0D6] hover:bg-white hover:border-[#D5CEC2]'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                          isActive
                            ? 'bg-[#1E3A2F] text-white'
                            : 'bg-[#EBF1EC] text-[#2D5A43]'
                        }`}
                      >
                        0{idx + 1}
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs sm:text-sm text-[#1A1D1C]">
                            {step.label}
                          </span>
                          <span className="font-mono text-[10px] text-[#2D5A43] bg-[#EBF1EC] px-1.5 py-0.5 rounded">
                            {formatTime(step.time)}
                          </span>
                        </div>

                        <p className="text-xs font-medium text-[#2D5A43] italic">
                          {step.narration}
                        </p>

                        <p className="text-xs text-[#52605B] pt-0.5 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Call to Action Directly Matching the Video's Final Line */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#demo-request"
                  className="px-6 py-3 rounded-lg bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-medium text-sm shadow-xs transition-colors flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F]"
                >
                  <span>FlowPilot AI ka Live Demo Book Karein</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('solutions');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-3 rounded-lg border border-[#D8D2C5] bg-white hover:bg-[#F5F2EB] text-[#2D3833] font-medium text-xs sm:text-sm text-center transition-colors cursor-pointer"
                >
                  Explore Clinic & Other Workflows
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Architecture Note */}
        <div className="p-4 bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl text-xs text-[#52605B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0" />
            <span>
              <strong>Authentic Product Walkthrough:</strong> Video recorded using FlowPilot AI’s appointment booking calendar and patient intake workflow.
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#2D5A43] font-semibold whitespace-nowrap">
            LOCAL ASSET EMBEDDED
          </span>
        </div>
      </div>
    </section>
  );
};
