import { ItineraryDay, ActivityCategory, ActivityTimeOfDay } from '../types';
import { INITIAL_DESTINATIONS } from '../data/destinations';
import { storageService } from './storage';
import { GoogleGenAI } from '@google/genai';

export interface GenerateItineraryParams {
  destination: string;
  departureCity: string;
  startDate: string;
  endDate: string;
  travellers: number;
  budget: number;
  travelStyle: string;
  pace: string;
  interests: string[];
  preferredTransport: string;
  accommodationType: string;
}

export interface GenerateItineraryResponse {
  source: 'local-engine' | 'gemini-ai';
  summary: string;
  itinerary: ItineraryDay[];
}

export interface AssistantChatParams {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  tripContext?: any;
}

export interface AssistantChatResponse {
  role: 'assistant';
  content: string;
  suggestedAction?: any;
  quickTips?: string[];
  source: 'local-engine' | 'gemini-ai';
}

/**
 * Retrieves the optional Gemini API key provided by the user in browser storage
 * or via build-time environment variable. Never exposes a secret in code.
 */
function getOptionalGeminiKey(): string | undefined {
  try {
    const prefs = storageService.getUserPreferences();
    if (prefs.geminiApiKey && prefs.geminiApiKey.trim()) {
      return prefs.geminiApiKey.trim();
    }
  } catch {
    // Ignore storage errors
  }
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (envKey && typeof envKey === 'string' && envKey !== 'MY_GEMINI_API_KEY') {
    return envKey.trim();
  }
  return undefined;
}

// 100% Client-Side Itinerary Generation Engine
function generateLocalItinerary(params: GenerateItineraryParams): ItineraryDay[] {
  const { destination, startDate, endDate, budget, pace, interests } = params;

  let numDays = 4;
  try {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    numDays = Math.max(1, Math.min(diff, 14));
  } catch {
    numDays = 4;
  }

  // Find if destination has curated attractions
  const matchedDest = INITIAL_DESTINATIONS.find(
    (d) =>
      d.name.toLowerCase() === destination.toLowerCase() ||
      d.id.toLowerCase() === destination.toLowerCase() ||
      destination.toLowerCase().includes(d.name.toLowerCase())
  );

  const dailyBudget = Math.round(budget / Math.max(1, numDays));
  const days: ItineraryDay[] = [];
  const signatureAttractions = matchedDest?.attractions || [];

  for (let i = 0; i < numDays; i++) {
    const dateObj = new Date(startDate);
    dateObj.setDate(dateObj.getDate() + i);
    const dateFormatted = dateObj.toISOString().split('T')[0];

    const attIndex = i % (signatureAttractions.length || 1);
    const specificAttraction = signatureAttractions[attIndex];

    const dayActivities = [];

    // Morning Activity
    if (i === 0) {
      dayActivities.push({
        id: `act-loc-${i + 1}-1-${Date.now() + i * 10}`,
        title: `Arrival in ${destination} & Check-in`,
        description: `Arrive via ${params.preferredTransport}, transfer to ${params.accommodationType}, unpack, and freshen up.`,
        timeOfDay: 'morning' as ActivityTimeOfDay,
        startTime: '10:00 AM',
        endTime: '12:30 PM',
        estimatedCost: Math.round(dailyBudget * 0.15),
        category: 'travel' as ActivityCategory,
        location: destination,
        notes: 'Check hotel amenities and rent two-wheeler or local cab if needed.',
      });
    } else if (specificAttraction) {
      dayActivities.push({
        id: `act-loc-${i + 1}-1-${Date.now() + i * 10}`,
        title: specificAttraction.name,
        description: specificAttraction.description,
        timeOfDay: 'morning' as ActivityTimeOfDay,
        startTime: '09:00 AM',
        endTime: '12:00 PM',
        estimatedCost: specificAttraction.ticketCostINR || Math.round(dailyBudget * 0.1),
        category: 'sightseeing' as ActivityCategory,
        location: destination,
        notes: `Highlight: ${specificAttraction.highlight}. ${specificAttraction.estimatedTime}.`,
      });
    } else {
      dayActivities.push({
        id: `act-loc-${i + 1}-1-${Date.now() + i * 10}`,
        title: `Morning Scenic Landmark Exploration`,
        description: `Explore the top viewpoints and heritage paths of ${destination}. Beat the midday rush.`,
        timeOfDay: 'morning' as ActivityTimeOfDay,
        startTime: '09:00 AM',
        endTime: '12:00 PM',
        estimatedCost: Math.round(dailyBudget * 0.1),
        category: 'sightseeing' as ActivityCategory,
        location: destination,
        notes: 'Carry sun protection, comfortable sneakers, and camera.',
      });
    }

    // Afternoon Activity
    dayActivities.push({
      id: `act-loc-${i + 1}-2-${Date.now() + i * 10 + 1}`,
      title: `Authentic Local Dining & Artisan Markets`,
      description: `Savor regional dishes at a popular local institution, followed by local bazaar discovery for authentic crafts and specialties.`,
      timeOfDay: 'afternoon' as ActivityTimeOfDay,
      startTime: '01:00 PM',
      endTime: '04:00 PM',
      estimatedCost: Math.round(dailyBudget * 0.2),
      category: 'food' as ActivityCategory,
      location: destination,
      notes: `Ask locals for recommended regional dishes.`,
    });

    // Evening Activity
    if (pace === 'relaxed') {
      dayActivities.push({
        id: `act-loc-${i + 1}-3-${Date.now() + i * 10 + 2}`,
        title: `Golden Hour Relaxation & Leisure Cafe`,
        description: `Unwind at a scenic sunset point or cozy cafe. Enjoy refreshing drinks and regional treats.`,
        timeOfDay: 'evening' as ActivityTimeOfDay,
        startTime: '05:30 PM',
        endTime: '08:00 PM',
        estimatedCost: Math.round(dailyBudget * 0.15),
        category: 'relaxation' as ActivityCategory,
        location: destination,
        notes: 'Arrive 30 minutes before sunset for the prime viewpoint.',
      });
    } else {
      dayActivities.push({
        id: `act-loc-${i + 1}-3-${Date.now() + i * 10 + 2}`,
        title: `Evening Night Market & Cultural Discovery`,
        description: `Walk through illuminated street bazaars, tasting fresh regional bites and absorbing the lively nightlife.`,
        timeOfDay: 'evening' as ActivityTimeOfDay,
        startTime: '06:00 PM',
        endTime: '09:00 PM',
        estimatedCost: Math.round(dailyBudget * 0.2),
        category: 'food' as ActivityCategory,
        location: destination,
        notes: 'Keep local cash handy for street vendors.',
      });
    }

    days.push({
      id: `day-loc-${i + 1}-${Date.now() + i}`,
      dayNumber: i + 1,
      date: dateFormatted,
      title: `Day ${i + 1}: ${
        i === 0
          ? `Arrival & First Impressions of ${destination}`
          : i === numDays - 1
          ? `Signature Highlights & Farewell to ${destination}`
          : `Exploring the Charm of ${destination}`
      }`,
      activities: dayActivities,
    });
  }

  return days;
}

// 100% Client-Side Travel Buddy Assistant
function generateLocalAssistantResponse(lastQuery: string, tripContext?: any): AssistantChatResponse {
  const q = lastQuery.toLowerCase();

  if (q.includes('goa') || (tripContext?.destinationName || '').toLowerCase().includes('goa')) {
    return {
      role: 'assistant',
      content: `Goa is a fantastic destination! Here is advice from the **GhumLo Local Travel Engine**:
• **North Goa:** Best for beach shacks, lively markets (Anjuna, Arpora), water sports, and historic forts (Aguada, Chapora).
• **South Goa:** Best for pristine tranquil beaches (Palolem, Agonda, Butterfly Beach), wildlife sanctuaries, and peaceful sunsets.
• **Budget estimate:** Around ₹2,500–₹3,500/day per person for comfortable budget travel including scooter rental (₹400/day) and beach shack thalis (₹250–₹400).
• **Local tip:** Don't miss exploring the Latin Quarter of Fontainhas in Panaji for pastel Portuguese villas and traditional bakeries!`,
      quickTips: [
        'Rent a scooter (Activa) for beach hopping',
        'Try local Kokum Sol Kadhi with fish thali',
        'Catch the sunset from Fort Aguada or Chapora Fort',
      ],
      suggestedAction: {
        type: 'add_to_itinerary',
        label: 'Add Fontainhas Walk to Itinerary',
        payload: {
          title: 'Fontainhas Latin Quarter Heritage Walk',
          description: 'Stroll among colorful Portuguese villas and sample fresh Bebinca.',
          timeOfDay: 'morning',
          startTime: '09:30 AM',
          endTime: '12:00 PM',
          estimatedCost: 350,
          category: 'culture',
          location: 'Panaji, Goa',
        },
      },
      source: 'local-engine',
    };
  }

  if (q.includes('manali') || (tripContext?.destinationName || '').toLowerCase().includes('manali')) {
    return {
      role: 'assistant',
      content: `Manali is breathtaking! Here are key recommendations from the **GhumLo Local Travel Engine**:
• **Old Manali vs Mall Road:** Stay in Old Manali for apple orchards, cozy riverside cafes, and live acoustic music.
• **Solang Valley & Atal Tunnel:** Experience snow sports, paragliding, and drive across Atal Tunnel to Sissu for waterfall views.
• **Budget estimate:** Around ₹2,000–₹3,200/day per person for accommodation, local cabs, and delicious Himachali siddu.
• **Packing tip:** Layering is essential! Carry thermal base layers and windbreakers even during shoulder seasons.`,
      quickTips: [
        'Visit Hadimba Temple early at 8:30 AM to avoid crowds',
        'Try steamed Siddu served with ghee at local stalls',
        'Book Rohtang / Atal Tunnel passes 1 day in advance',
      ],
      suggestedAction: {
        type: 'add_to_itinerary',
        label: 'Add Solang Adventure to Itinerary',
        payload: {
          title: 'Solang Valley & Atal Tunnel Excursion',
          description: 'Paragliding and scenic snow viewpoints through the engineering marvel tunnel.',
          timeOfDay: 'morning',
          startTime: '08:30 AM',
          endTime: '01:30 PM',
          estimatedCost: 2200,
          category: 'adventure',
          location: 'Solang Valley, Manali',
        },
      },
      source: 'local-engine',
    };
  }

  if (q.includes('kashmir') || (tripContext?.destinationName || '').toLowerCase().includes('kashmir')) {
    return {
      role: 'assistant',
      content: `Kashmir — "Paradise on Earth"! Highlights from the **GhumLo Local Travel Engine**:
• **Srinagar:** Sunset Shikara ride on Dal Lake, stay in a heritage wooden houseboat, and walk through Mughal Gardens (Nishat & Shalimar).
• **Gulmarg & Pahalgam:** Take the Gulmarg Gondola Phase 2 to Apharwat Peak, and visit Betaab Valley & Aru Valley in Pahalgam.
• **Food:** Savor traditional Wazwan dishes (Rogan Josh, Gushtaba) and warm Kashmiri Kahwa with saffron and crushed almonds.`,
      quickTips: [
        'Book Gulmarg Gondola tickets online in advance',
        'Drink Kahwa tea to stay warm and acclimated',
        'Negotiate Shikara rides using government-approved rate cards',
      ],
      source: 'local-engine',
    };
  }

  if (q.includes('budget') || q.includes('save') || q.includes('cost') || q.includes('expense')) {
    return {
      role: 'assistant',
      content: `Here are 4 smart ways to maximize your travel budget:
1. **Travel by Train or Sleeper Bus:** Opt for Indian Railways (AC 3-Tier/Vande Bharat) or overnight Volvos to save on hotel room nights and peak flight fares.
2. **Homestays & Hostels:** Stay at authentic family homestays or backpacker hostels for genuine hospitality and insider guidance.
3. **Regional Thalis:** Local family-run messes and thali joints offer delicious, authentic meals at a fraction of tourist restaurant prices.
4. **Negotiate Multi-day Rentals:** Rental scooters or local cabs offer 20–30% discounts when booked for 3+ consecutive days.`,
      quickTips: [
        'Track daily expenses in the GhumLo Budget Planner',
        'Carry a reusable water bottle with purifier filter',
        'Use state transport buses for intercity links',
      ],
      source: 'local-engine',
    };
  }

  if (q.includes('pack') || q.includes('checklist')) {
    return {
      role: 'assistant',
      content: `Essential Indian Travel Packing Checklist:
• **Documents:** Original Govt ID (Aadhaar / Voter ID / Passport) + digital copies stored on phone.
• **Electronics:** High-capacity power bank (10,000–20,000 mAh), charging cables, and offline maps.
• **Health & First Aid:** ORS hydration sachets, motion sickness pills (for mountain twisties), basic analgesics, hand sanitizer.
• **Apparel:** Modest clothing for temple and monument visits, slip-on shoes for frequent monument entries, and a light stole/shawl.`,
      quickTips: [
        'Keep emergency cash in ₹500 and ₹100 notes',
        'Download offline Google Maps for your destinations',
        'Carry a compact rain poncho',
      ],
      source: 'local-engine',
    };
  }

  return {
    role: 'assistant',
    content: `Namaste! I'm your **GhumLo Travel Buddy**, running client-side right in your browser. Whether you're planning a mountain trek, beach escape, or cultural getaway:
• Ask for destination tips and budget breakdowns in ₹ INR
• Inquire about local transport and travel pace
• Request packing checklists and budget-saving hacks
• Convert any suggested activity directly into your trip itinerary!

What destination or travel idea would you like to explore?`,
    quickTips: [
      'Plan a 3-day trip to Goa under ₹12,000',
      'Weekend getaways from Mumbai or Delhi',
      'Packing checklist for mountain journeys',
    ],
    source: 'local-engine',
  };
}

export const apiService = {
  // Pure Client-Side Implementation (No backend required)
  async checkHealth(): Promise<{ status: string; hasGeminiKey: boolean }> {
    const hasKey = Boolean(getOptionalGeminiKey());
    return { status: 'client-offline-ready', hasGeminiKey: hasKey };
  },

  async generateItinerary(params: GenerateItineraryParams): Promise<GenerateItineraryResponse> {
    const apiKey = getOptionalGeminiKey();

    // If an optional API key was provided by the user in preferences or build env, try calling Gemini directly
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are GhumLo AI, an expert travel planner. Generate a structured ${params.pace} day-by-day travel itinerary for ${params.destination} departing from ${params.departureCity}.
Travel dates: ${params.startDate} to ${params.endDate}.
Travellers: ${params.travellers}. Total Budget: ₹${params.budget} INR.
Style: ${params.travelStyle}. Transport: ${params.preferredTransport}. Accommodation: ${params.accommodationType}.
Interests: ${params.interests.join(', ')}.

Respond ONLY with valid JSON having this structure:
{
  "summary": "Short 1-2 sentence compelling summary",
  "days": [
    {
      "dayNumber": 1,
      "date": "${params.startDate}",
      "title": "Day title",
      "activities": [
        {
          "title": "Activity Name",
          "description": "Short description",
          "timeOfDay": "morning",
          "startTime": "09:00 AM",
          "endTime": "12:00 PM",
          "estimatedCost": 500,
          "category": "sightseeing",
          "location": "Location name",
          "notes": "Helpful tip"
        }
      ]
    }
  ]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text?.trim();
        if (text) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed.days) && parsed.days.length > 0) {
            const formattedDays: ItineraryDay[] = parsed.days.map((day: any, idx: number) => ({
              id: `day-ai-${idx + 1}-${Date.now()}`,
              dayNumber: day.dayNumber || idx + 1,
              date: day.date || params.startDate,
              title: day.title || `Day ${idx + 1}`,
              activities: (day.activities || []).map((act: any, aIdx: number) => ({
                id: `act-ai-${idx + 1}-${aIdx + 1}-${Date.now()}`,
                title: act.title || 'Sightseeing stop',
                description: act.description || '',
                timeOfDay: (act.timeOfDay || 'morning') as ActivityTimeOfDay,
                startTime: act.startTime || '10:00 AM',
                endTime: act.endTime || '12:00 PM',
                estimatedCost: typeof act.estimatedCost === 'number' ? act.estimatedCost : 500,
                category: (act.category || 'sightseeing') as ActivityCategory,
                location: act.location || params.destination,
                notes: act.notes || '',
              })),
            }));

            return {
              source: 'gemini-ai',
              summary: parsed.summary || `Personalized ${formattedDays.length}-day trip to ${params.destination} crafted with Gemini AI`,
              itinerary: formattedDays,
            };
          }
        }
      } catch (err) {
        console.warn('Gemini direct API attempt encountered an issue. Falling back to local travel engine:', err);
      }
    }

    // High quality offline local fallback
    const clientItinerary = generateLocalItinerary(params);
    return {
      source: 'local-engine',
      summary: `Tailored ${clientItinerary.length}-day journey for ${params.destination} crafted with GhumLo Local Travel Engine`,
      itinerary: clientItinerary,
    };
  },

  async sendAssistantMessage(params: AssistantChatParams): Promise<AssistantChatResponse> {
    const lastMsg = params.messages[params.messages.length - 1]?.content || 'Hello';
    const apiKey = getOptionalGeminiKey();

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are GhumLo Travel Buddy, an enthusiastic, knowledgeable travel advisor specialized in Indian and international travel.
Provide helpful, concise, well-structured travel advice. Use INR (₹) for currency amounts. Provide specific local tips and cost estimates.`;

        const chatPrompt = `${systemPrompt}\n\nUser asked: "${lastMsg}"`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: chatPrompt,
        });

        const text = response.text?.trim();
        if (text) {
          return {
            role: 'assistant',
            content: text,
            source: 'gemini-ai',
            quickTips: [
              'Save activities to your trip itinerary',
              'Check budget breakdown in the budget planner',
            ],
          };
        }
      } catch (err) {
        console.warn('Gemini chat attempt encountered an issue. Falling back to local engine:', err);
      }
    }

    return generateLocalAssistantResponse(lastMsg, params.tripContext);
  },
};
