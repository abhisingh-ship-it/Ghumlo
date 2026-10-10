import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { storageService } from '../services/storage';
import { ChatMessage, Trip } from '../types';
import {
  Bot,
  Send,
  Sparkles,
  MapPin,
  Calendar,
  Wallet,
  Luggage,
  Plus,
  RefreshCw,
  User,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const AssistantPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState(searchParams.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [savedTrips, setSavedTrips] = useState<Trip[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<string>('none');
  const [toastMessage, setToastMessage] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `Namaste! I'm your **GhumLo Travel Buddy** — your personal companion for discovering extraordinary places and planning smarter journeys across India and beyond.

How can I help you today? You can ask me for:
• Budget hacks and itineraries (e.g., "Plan a 3-day trip to Goa under ₹10,000")
• Weekend escapes from Mumbai, Delhi, or Bengaluru
• Food trails, authentic thalis, and local transport options
• Rainy day backup plans or complete packing checklists!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickTips: [
        'Ask about saving on train vs flight bookings',
        'Request offbeat hidden gems for any state',
        'Convert any recommendation into a trip activity',
      ],
    },
  ]);

  const quickPrompts = [
    'Plan a 3-day trip to Goa under ₹10,000',
    'Suggest a weekend trip from Mumbai',
    'Create a family itinerary for Kerala',
    'Suggest budget-friendly places in Himachal Pradesh',
    'Recommend activities for a couple in Jaipur',
    'How can I reduce my trip expenses?',
    'What should I pack for high-altitude mountains?',
  ];

  useEffect(() => {
    const list = storageService.getTrips();
    setSavedTrips(list);

    // Auto-send query if passed in URL
    const initialQ = searchParams.get('q');
    if (initialQ) {
      sendMessage(initialQ);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const selectedTrip = savedTrips.find((t) => t.id === selectedTripId);

      const response = await apiService.sendAssistantMessage({
        messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
        tripContext: selectedTrip,
      });

      const assistantMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: response.source,
        suggestedAction: response.suggestedAction,
        quickTips: response.quickTips,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          role: 'assistant',
          content: 'I had a momentary hiccup connecting to the server. Please try asking again!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Add suggestion to itinerary
  const handleAddActionToItinerary = (payload: any) => {
    if (savedTrips.length === 0) {
      navigate(`/plan?destination=${encodeURIComponent(payload.location || 'Goa')}`);
      return;
    }

    const targetTrip = savedTrips.find((t) => t.id === selectedTripId) || savedTrips[0];
    if (targetTrip && targetTrip.itinerary && targetTrip.itinerary.length > 0) {
      const updatedDays = [...targetTrip.itinerary];
      const targetDay = updatedDays[0];
      targetDay.activities = [
        ...(targetDay.activities || []),
        {
          id: `act-${Date.now()}`,
          title: payload.title || 'Special Discovery Stop',
          description: payload.description || '',
          timeOfDay: payload.timeOfDay || 'morning',
          startTime: payload.startTime || '10:00 AM',
          endTime: payload.endTime || '12:00 PM',
          estimatedCost: payload.estimatedCost || 0,
          category: payload.category || 'culture',
          location: payload.location || targetTrip.destinationName,
        },
      ];

      storageService.saveTrip({ ...targetTrip, itinerary: updatedDays });
      setToastMessage(`Added "${payload.title}" to Day 1 of ${targetTrip.name}!`);
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B4A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-slideUp">
          <Sparkles className="w-4 h-4 text-[#FF8748]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#142B4A] to-[#2878D0] flex items-center justify-center text-white shadow-md shadow-[#2878D0]/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#142B4A]">GhumLo Travel Buddy</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                Local Engine (Browser-Offline)
              </span>
            </div>
            <p className="text-xs text-[#6B7A90] mt-0.5">
              Your personal companion for planning better journeys across India and beyond.
            </p>
          </div>
        </div>

        {/* Trip Context Selector */}
        {savedTrips.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
            <span className="text-[#6B7A90]">Active Trip Context:</span>
            <select
              value={selectedTripId}
              onChange={(e) => setSelectedTripId(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#E3EAF2] text-xs font-bold text-[#142B4A] bg-white"
            >
              <option value="none">General Inquiries</option>
              {savedTrips.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.destinationName})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-[#E3EAF2] shadow-xs p-4 sm:p-6 min-h-[460px] max-h-[580px] overflow-y-auto space-y-6">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-[#FF8748] text-white'
                    : 'bg-[#2878D0] text-white shadow-xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#2878D0] text-white rounded-tr-xs'
                    : 'bg-[#F7F9FC] text-[#172B4D] border border-[#E3EAF2] rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Quick Tips */}
                {msg.quickTips && msg.quickTips.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#E3EAF2] space-y-1 text-xs">
                    <span className="font-bold text-[#2878D0] block">Insider Tips:</span>
                    {msg.quickTips.map((tip, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[#6B7A90]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#36B7A0]" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interactive Action Button from AI */}
                {msg.suggestedAction && (
                  <div className="mt-3 pt-3 border-t border-[#E3EAF2]">
                    <button
                      onClick={() => msg.suggestedAction && handleAddActionToItinerary(msg.suggestedAction.payload)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{msg.suggestedAction.label}</span>
                    </button>
                  </div>
                )}

                <div
                  className={`mt-2.5 pt-1.5 flex items-center justify-between text-[10px] ${
                    isUser ? 'text-white/70 justify-end' : 'text-[#6B7A90] border-t border-[#E3EAF2]'
                  }`}
                >
                  {!isUser && (
                    <span className="font-semibold flex items-center gap-1">
                      {msg.source === 'gemini-ai' ? (
                        <span className="text-[#2878D0] bg-[#EAF4FF] px-1.5 py-0.5 rounded border border-[#2878D0]/30 font-bold">
                          ✨ Gemini AI
                        </span>
                      ) : (
                        <span className="text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                          ⚡ Local Engine
                        </span>
                      )}
                    </span>
                  )}
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2878D0] text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-[#F7F9FC] border border-[#E3EAF2] rounded-2xl p-4 text-xs text-[#6B7A90] flex items-center gap-2">
              <span className="animate-pulse">GhumLo Buddy is preparing recommendations...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-bold text-[#6B7A90] shrink-0">Suggestions:</span>
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-xl border border-[#E3EAF2] bg-white hover:bg-[#EAF4FF] hover:border-[#2878D0]/30 text-xs text-[#142B4A] font-medium whitespace-nowrap shrink-0 transition-colors disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleFormSubmit} className="relative flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask GhumLo Buddy anything about places, budgets in ₹ INR, or itineraries..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-2xl border border-[#E3EAF2] bg-white text-sm text-[#142B4A] placeholder-slate-400 focus:outline-none focus:border-[#2878D0] focus:ring-2 focus:ring-[#2878D0]/20 shadow-xs"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-5 py-3 rounded-2xl bg-[#2878D0] hover:bg-[#1E66B6] text-white font-bold text-sm shadow-md shadow-[#2878D0]/25 transition-all disabled:opacity-40 flex items-center gap-1.5"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
