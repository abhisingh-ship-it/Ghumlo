export type TravelStyle =
  | 'Adventure'
  | 'Relaxation'
  | 'Family'
  | 'Romantic'
  | 'Cultural'
  | 'Backpacking'
  | 'Luxury'
  | 'Weekend getaway';

export type DestinationCategory =
  | 'Mountains'
  | 'Beaches'
  | 'Historical Places'
  | 'Religious and Spiritual Places'
  | 'Cities'
  | 'Nature'
  | 'Adventure'
  | 'Wildlife'
  | 'Food and Culture'
  | 'Weekend Getaways';

export interface Attraction {
  name: string;
  description: string;
  estimatedTime: string;
  highlight: string;
  ticketCostINR?: number;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  country: string;
  isInternational: boolean;
  description: string;
  heroImage: string;
  gallery: string[];
  categories: DestinationCategory[];
  estimatedDailyBudget: number; // in INR
  recommendedDuration: string;
  bestTimeToVisit: string;
  travelStyles: TravelStyle[];
  attractions: Attraction[];
  recommendedExperiences: string[];
  localTransport: string[];
  culturalTips: string[];
  packingSuggestions: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type ActivityTimeOfDay = 'morning' | 'afternoon' | 'evening';

export type ActivityCategory =
  | 'sightseeing'
  | 'food'
  | 'adventure'
  | 'relaxation'
  | 'travel'
  | 'culture'
  | 'shopping';

export interface Activity {
  id: string;
  title: string;
  description: string;
  timeOfDay: ActivityTimeOfDay;
  startTime: string;
  endTime: string;
  estimatedCost: number; // 0 if free / not specified
  category: ActivityCategory;
  location: string;
  notes?: string;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date: string;
  title?: string;
  activities: Activity[];
}

export type BudgetCategoryKey =
  | 'transport'
  | 'accommodation'
  | 'food'
  | 'activities'
  | 'localTravel'
  | 'shopping'
  | 'emergency';

export interface BudgetAllocation {
  transport: number;
  accommodation: number;
  food: number;
  activities: number;
  localTravel: number;
  shopping: number;
  emergency: number;
}

export type ExpenseCategoryKey =
  | 'transport'
  | 'accommodation'
  | 'food'
  | 'activities'
  | 'localTravel'
  | 'shopping'
  | 'miscellaneous'
  | 'emergency';

export interface Expense {
  id: string;
  category: ExpenseCategoryKey;
  description: string;
  amount: number; // in INR or user currency
  date: string;
  paidBy?: string;
}

export type TripStatus = 'planning' | 'upcoming' | 'ongoing' | 'completed';
export type TripPace = 'relaxed' | 'balanced' | 'packed';

export interface Trip {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  destinationImage: string;
  departureCity: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  travellers: number;
  adults: number;
  children: number;
  travelStyle: TravelStyle;
  pace: TripPace;
  interests: string[];
  preferredTransport: string;
  accommodationType: string;
  budget: {
    total: number;
    currency: string;
    categories: BudgetAllocation;
  };
  status: TripStatus;
  itinerary: ItineraryDay[];
  expenses: Expense[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  displayName: string;
  preferredCurrency: string;
  defaultTravelStyle: TravelStyle;
  defaultTravellerCount: number;
  defaultStartingCity: string;
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  geminiApiKey?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: 'gemini-ai' | 'local-engine';
  suggestedAction?: {
    type: 'add_to_itinerary' | 'view_destination' | 'create_trip';
    payload: any;
    label: string;
  };
  quickTips?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}
