import React, { useEffect } from 'react';
import {
  MessageSquare,
  Phone,
  X,
  Sparkles,
  PhoneCall,
  Volume2,
  Maximize2,
  Minimize2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { WhatsAppChatAgent } from './WhatsAppChatAgent';
import { VoiceCallAgent } from './VoiceCallAgent';

export const InteractiveAgentWidget: React.FC = () => {
  const {
    isAgentWidgetOpen,
    setIsAgentWidgetOpen,
    agentWidgetMode,
    setAgentWidgetMode,
    selectedCategory
  } = useDemo();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAgentWidgetOpen) {
        setIsAgentWidgetOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAgentWidgetOpen, setIsAgentWidgetOpen]);

  return (
    <>
      {/* 1. Persistent Floating Launcher Button at Bottom Right */}
      {!isAgentWidgetOpen && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 group">
          {/* Informative hint badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#E3DDD3] shadow-md text-xs text-[#1E3A2F] font-medium animate-in fade-in slide-in-from-right-4 duration-300">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Active Demo: Test WhatsApp or Voice Agent</span>
          </div>

          <button
            onClick={() => setIsAgentWidgetOpen(true)}
            aria-label="Open Interactive AI Agent"
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1E3A2F] hover:bg-[#284E3F] text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all border border-[#2F5A47]"
          >
            <div className="relative">
              <div className="flex items-center -space-x-1">
                <span className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                </span>
                <span className="w-7 h-7 rounded-full bg-[#3B82F6] text-white flex items-center justify-center shadow-xs">
                  <Phone className="w-3.5 h-3.5 fill-current" />
                </span>
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-white animate-ping" />
            </div>

            <div className="text-left">
              <span className="block text-xs font-bold leading-tight tracking-tight">
                AI Agent Triage
              </span>
              <span className="block text-[10px] text-[#A5C7B7] font-mono leading-none">
                WhatsApp & Voice Call
              </span>
            </div>
          </button>
        </div>
      )}

      {/* 2. Interactive Phone Shell / Modal Drawer */}
      {isAgentWidgetOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 sm:w-[460px] sm:h-[660px] z-50 flex flex-col bg-white sm:rounded-2xl shadow-2xl border border-[#D5CEC2] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Top Switcher & Control Header */}
          <div className="bg-[#1A2521] px-4 py-2.5 flex items-center justify-between text-white border-b border-[#2B3B34]">
            {/* Mode Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#121B18] rounded-lg border border-[#26372F] text-xs">
              <button
                onClick={() => setAgentWidgetMode('whatsapp')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all ${
                  agentWidgetMode === 'whatsapp'
                    ? 'bg-[#25D366] text-[#075E54] shadow-xs'
                    : 'text-[#8EA89C] hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Chat</span>
              </button>

              <button
                onClick={() => setAgentWidgetMode('call')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all ${
                  agentWidgetMode === 'call'
                    ? 'bg-[#3B82F6] text-white shadow-xs'
                    : 'text-[#8EA89C] hover:text-white'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>AI Voice Call</span>
              </button>
            </div>

            {/* Close Button */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsAgentWidgetOpen(false)}
                title="Close Agent"
                className="p-1.5 rounded-lg text-[#8EA89C] hover:text-white hover:bg-[#25372F] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Screen Area */}
          <div className="flex-1 overflow-hidden relative">
            {agentWidgetMode === 'whatsapp' ? (
              <WhatsAppChatAgent compact />
            ) : (
              <VoiceCallAgent compact />
            )}
          </div>
        </div>
      )}
    </>
  );
};
