import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MessageSquare,
  CheckCircle2,
  Clock,
  RotateCcw,
  Play,
  ArrowRight,
  ShieldCheck,
  BellRing,
  Smartphone,
  ChevronRight,
  Send,
  UserCheck
} from 'lucide-react';

export const AnimatedDemonstrationsSection: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<'slot' | 'progression' | 'chat' | 'notification'>('slot');

  // Demo 1 State: Slot Selection
  const [selectedSlot, setSelectedSlot] = useState<string>('11:00 AM');
  const [isSlotLocked, setIsSlotLocked] = useState<boolean>(true);

  // Demo 2 State: Booking Progression
  const [progressionStep, setProgressionStep] = useState<number>(2); // 0 to 3

  // Demo 3 State: WhatsApp Conversation
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    { sender: 'user', text: 'Hi! Do you have any openings for a dental checkup this Thursday morning?', time: '10:14 AM' },
    { sender: 'bot', text: 'Hello! Dr. Alan Morales has Thursday 09:30 AM or 11:00 AM available. Would you like me to hold 09:30 AM for you?', time: '10:14 AM' }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Demo 4 State: Push Notification
  const [notificationDispatched, setNotificationDispatched] = useState<boolean>(true);
  const [notificationType, setNotificationType] = useState<'24h' | '2h'>('24h');

  // Handle WhatsApp prompt triggers
  const handleSendPrompt = (promptText: string, botReply: string) => {
    const userMsg = { sender: 'user' as const, text: promptText, time: '10:15 AM' };
    setChatMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot' as const, text: botReply, time: '10:15 AM' }
      ]);
    }, 800);
  };

  const handleResetChat = () => {
    setChatMessages([
      { sender: 'user', text: 'Hi! Do you have any openings for a dental checkup this Thursday morning?', time: '10:14 AM' },
      { sender: 'bot', text: 'Hello! Dr. Alan Morales has Thursday 09:30 AM or 11:00 AM available. Would you like me to hold 09:30 AM for you?', time: '10:14 AM' }
    ]);
  };

  return (
    <section id="interactive-demos" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#2D5A43] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A43]" />
            <span>Interactive Product Demonstrations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1D1C]">
            Experience BookFlow_AI in action.
          </h2>
          <p className="text-base sm:text-lg text-[#52605B] leading-relaxed">
            Test the live interactions below. Select slots, trigger automated responses, progress booking states, and inspect notification dispatches in real time.
          </p>
        </div>

        {/* Tab Controls for 4 Demonstrations */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E7E2DA]">
          <button
            type="button"
            onClick={() => setActiveDemo('slot')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F] ${
              activeDemo === 'slot'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-white text-[#52605B] border border-[#E3DDD3] hover:text-[#1A1D1C]'
            }`}
          >
            1. Slot Selection & Lock
          </button>

          <button
            type="button"
            onClick={() => setActiveDemo('progression')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F] ${
              activeDemo === 'progression'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-white text-[#52605B] border border-[#E3DDD3] hover:text-[#1A1D1C]'
            }`}
          >
            2. Booking Progression
          </button>

          <button
            type="button"
            onClick={() => setActiveDemo('chat')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F] ${
              activeDemo === 'chat'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-white text-[#52605B] border border-[#E3DDD3] hover:text-[#1A1D1C]'
            }`}
          >
            3. WhatsApp Assistant
          </button>

          <button
            type="button"
            onClick={() => setActiveDemo('notification')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F] ${
              activeDemo === 'notification'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-white text-[#52605B] border border-[#E3DDD3] hover:text-[#1A1D1C]'
            }`}
          >
            4. Notification Dispatch
          </button>
        </div>

        {/* Demonstration Container */}
        <div className="bg-white border border-[#E3DDD3] rounded-2xl p-6 sm:p-10 shadow-sm">
          {/* DEMO 1: Slot Selection & Lock */}
          {activeDemo === 'slot' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono uppercase text-[#2D5A43] font-semibold">Demo 01 · Immediate Slot Locking</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D1C]">
                  Select an available slot to trigger a provisional lock.
                </h3>
                <p className="text-xs sm:text-sm text-[#52605B] leading-relaxed">
                  When a customer picks an appointment slot, BookFlow_AI locks it for 15 minutes and appends the necessary sanitization buffer so no double-booking can occur while they enter their details.
                </p>
                <div className="pt-2 text-xs text-[#52605B] space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
                    <span>Selected Window: <strong>{selectedSlot} (45 mins)</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
                    <span>State: <strong className="text-[#1E3A2F]">Provisional Hold Active</strong></span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA] text-xs">
                  <span className="font-semibold text-[#1A1D1C]">Appointment Booking Simulator</span>
                  <span className="font-mono text-[10px] text-[#2D5A43] bg-[#EBF1EC] px-2 py-0.5 rounded font-bold">
                    TAP A SLOT BELOW
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {['09:30 AM', '11:00 AM', '02:30 PM'].map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedSlot(slot);
                          setIsSlotLocked(true);
                        }}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1E3A2F] text-white border-[#1E3A2F] shadow-sm'
                            : 'bg-white text-[#1A1D1C] border-[#E2DDD5] hover:border-[#1E3A2F]'
                        }`}
                      >
                        <span className="font-mono font-bold block text-sm">{slot}</span>
                        <span className={`text-[10px] mt-1 block ${isSelected ? 'text-[#C0D2C8]' : 'text-[#788882]'}`}>
                          {isSelected ? 'Held for you' : 'Available'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {isSlotLocked && (
                  <div className="p-4 bg-white border border-[#CCDCD0] rounded-xl space-y-2 animate-fade-in">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1E3A2F] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
                        <span>Slot Reserved: {selectedSlot}</span>
                      </span>
                      <span className="font-mono text-[11px] text-[#8C5E09] bg-[#FAF0E6] px-2 py-0.5 rounded border border-[#E8D4BE]">
                        Hold expires in 14:58
                      </span>
                    </div>
                    <div className="p-2 rounded bg-[#FAF8F5] border border-dashed border-[#D5CEC2] text-[11px] font-mono text-[#55635F] text-center">
                      + 15-Minute Sanitization & Provider Break Buffer Protected
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DEMO 2: Booking Status Progression */}
          {activeDemo === 'progression' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono uppercase text-[#2D5A43] font-semibold">Demo 02 · Lifecycle Progression</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D1C]">
                  Follow a booking through its complete verification cycle.
                </h3>
                <p className="text-xs sm:text-sm text-[#52605B] leading-relaxed">
                  Every appointment transitions smoothly from raw customer inquiry to verified calendar hold, confirmation dispatch, and post-visit completion.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setProgressionStep((prev) => (prev < 3 ? prev + 1 : 0))}
                    className="px-4 py-2 bg-[#1E3A2F] hover:bg-[#284E3F] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Advance Status Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setProgressionStep(0)}
                    className="px-3 py-2 border border-[#E3DDD3] hover:bg-[#FAF8F5] text-[#52605B] rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA] text-xs">
                  <span className="font-semibold text-[#1A1D1C]">Booking State Machine · Stage {progressionStep + 1} of 4</span>
                  <span className="font-mono text-[10px] text-[#2D5A43] bg-[#EBF1EC] px-2 py-0.5 rounded font-bold">
                    STEP #{progressionStep + 1}
                  </span>
                </div>

                {/* 4-Step Visual Track */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {[
                    { title: 'Inquiry', desc: 'WhatsApp Ingest' },
                    { title: 'Verified', desc: 'Roster Check' },
                    { title: 'Slot Locked', desc: '15m Buffer' },
                    { title: 'Confirmed', desc: 'Staff Notified' }
                  ].map((s, idx) => {
                    const isPassed = idx <= progressionStep;
                    const isCurrent = idx === progressionStep;
                    return (
                      <div
                        key={s.title}
                        onClick={() => setProgressionStep(idx)}
                        className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#1E3A2F] text-white border-[#1E3A2F] shadow-xs'
                            : isPassed
                            ? 'bg-[#EBF1EC] text-[#1E3A2F] border-[#CCDCD0]'
                            : 'bg-white text-[#788882] border-[#E2DDD5]'
                        }`}
                      >
                        <span className="font-bold block text-[11px]">{s.title}</span>
                        <span className={`text-[9px] mt-0.5 block ${isCurrent ? 'text-[#C0D2C8]' : 'text-[#717E79]'}`}>
                          {s.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Current Stage Context Card */}
                <div className="p-4 bg-white border border-[#E2DDD5] rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1A1D1C]">Active State Detail:</span>
                    <span className="font-mono text-[10px] text-[#2D5A43]">TRANSITION VALIDATED</span>
                  </div>
                  <p className="text-xs text-[#52605B] leading-relaxed">
                    {progressionStep === 0 && 'Inbound inquiry received from patient. Natural language parsing extracts preferred doctor and Thursday morning preference.'}
                    {progressionStep === 1 && 'System verifies Dr. Morales schedule against Google Calendar. Confirms Thursday 09:30 AM is completely free.'}
                    {progressionStep === 2 && 'Provisional lock placed on 09:30 AM. 15-minute sanitization buffer held in provider schedule.'}
                    {progressionStep === 3 && 'Booking confirmed. Automated intake instructions dispatched via SMS; front desk notified with lead dossier.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DEMO 3: WhatsApp Assistant */}
          {activeDemo === 'chat' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono uppercase text-[#2D5A43] font-semibold">Demo 03 · Conversational Assistant</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D1C]">
                  Test realistic customer conversation scenarios.
                </h3>
                <p className="text-xs sm:text-sm text-[#52605B] leading-relaxed">
                  Click a customer question prompt to watch how BookFlow_AI provides immediate answers, checks clinic rules, and holds calendar slots.
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono text-[#788882] uppercase block">Click a sample customer message:</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleSendPrompt(
                        'Do you accept dental insurance?',
                        'Yes, we accept major private insurance providers including Bupa, AXA, and Allianz. We can provide an itemized receipt for direct claiming.'
                      )
                    }
                    className="w-full text-left p-2.5 rounded-lg border border-[#E3DDD3] bg-white hover:bg-[#FAF8F5] text-xs text-[#1A1D1C] font-medium transition-colors cursor-pointer"
                  >
                    "Do you accept dental insurance?"
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleSendPrompt(
                        'What is your cancellation policy?',
                        'You can reschedule or cancel with 24 hours notice at no fee directly through your confirmation link. We also offer one-tap rescheduling on WhatsApp!'
                      )
                    }
                    className="w-full text-left p-2.5 rounded-lg border border-[#E3DDD3] bg-white hover:bg-[#FAF8F5] text-xs text-[#1A1D1C] font-medium transition-colors cursor-pointer"
                  >
                    "What is your cancellation policy?"
                  </button>

                  <button
                    type="button"
                    onClick={handleResetChat}
                    className="text-xs text-[#1E3A2F] hover:underline flex items-center gap-1 pt-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset conversation</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E2DA] text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#2D5A43]" />
                    <span className="font-semibold text-[#1A1D1C]">WhatsApp Live Simulation</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#717E79]">DEMO MODE</span>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 text-xs">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 max-w-sm ${msg.sender === 'user' ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          msg.sender === 'user' ? 'bg-[#334E68] text-white' : 'bg-[#1E3A2F] text-white'
                        }`}
                      >
                        {msg.sender === 'user' ? 'C' : 'B'}
                      </div>
                      <div
                        className={`p-3 rounded-xl space-y-1 shadow-2xs ${
                          msg.sender === 'user'
                            ? 'bg-white border border-[#E2DDD5] text-[#1A1D1C] rounded-tl-none'
                            : 'bg-[#1E3A2F] text-white rounded-tr-none'
                        }`}
                      >
                        <p className="leading-snug">{msg.text}</p>
                        <span className={`text-[9px] font-mono block ${msg.sender === 'user' ? 'text-[#7C8B85]' : 'text-[#C0D2C8] text-right'}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2 max-w-xs ml-auto flex-row-reverse">
                      <div className="w-6 h-6 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        B
                      </div>
                      <div className="p-3 rounded-xl rounded-tr-none bg-[#1E3A2F] text-white shadow-2xs">
                        <span className="inline-block animate-pulse">Typing reply...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* DEMO 4: Notification Dispatch */}
          {activeDemo === 'notification' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono uppercase text-[#2D5A43] font-semibold">Demo 04 · Proactive Follow-ups</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D1C]">
                  Simulate timely SMS & WhatsApp alerts for appointments.
                </h3>
                <p className="text-xs sm:text-sm text-[#52605B] leading-relaxed">
                  BookFlow_AI automatically dispatches reminders before the visit with pre-visit instructions (fasting, parking, arrival code) and 1-tap confirmation.
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNotificationType('24h');
                      setNotificationDispatched(true);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      notificationType === '24h'
                        ? 'bg-[#1E3A2F] text-white'
                        : 'bg-white border border-[#E3DDD3] text-[#52605B]'
                    }`}
                  >
                    Simulate 24-Hour Alert
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNotificationType('24h');
                      setNotificationType('2h');
                      setNotificationDispatched(true);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      notificationType === '2h'
                        ? 'bg-[#1E3A2F] text-white'
                        : 'bg-white border border-[#E3DDD3] text-[#52605B]'
                    }`}
                  >
                    Simulate 2-Hour Alert
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA] text-xs">
                  <span className="font-semibold text-[#1A1D1C]">Client Smartphone Lock Screen Preview</span>
                  <span className="font-mono text-[10px] text-[#2D5A43] bg-[#EBF1EC] px-2 py-0.5 rounded font-bold">
                    PUSH DISPATCHED
                  </span>
                </div>

                {/* iPhone Notification Card */}
                <div className="max-w-md mx-auto bg-white border border-[#E2DDD5] rounded-2xl p-4 shadow-md space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#52605B]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-[#1E3A2F] text-white flex items-center justify-center text-[10px] font-bold">
                        B
                      </div>
                      <span className="font-bold text-[#1A1D1C]">CarePoint Practice</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#788882]">Just Now</span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold text-[#1A1D1C]">
                      {notificationType === '24h'
                        ? 'Appointment Tomorrow at 10:00 AM (Dr. Morales)'
                        : 'Upcoming Visit in 2 Hours · Parking Pin & Check-in'}
                    </h4>
                    <p className="text-[#52605B] leading-relaxed text-[11px]">
                      {notificationType === '24h'
                        ? 'Please arrive 10 mins early. Fasting required for blood vitals from midnight. Tap below to confirm or reschedule.'
                        : 'Room 2B ready. Reserved parking bay #14 available behind clinic. Tap to check in digitally.'}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="flex-1 py-1.5 rounded-lg bg-[#1E3A2F] text-white text-[11px] font-semibold text-center cursor-pointer hover:bg-[#284E3F]"
                    >
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg border border-[#E3DDD3] text-[#52605B] text-[11px] font-medium text-center hover:bg-[#FAF8F5] cursor-pointer"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
