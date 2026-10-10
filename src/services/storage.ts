import { Trip, UserPreferences, Destination } from '../types';

const STORAGE_KEYS = {
  TRIPS: 'ghumlo_trips_v1',
  FAVORITES: 'ghumlo_favorites_v1',
  PREFERENCES: 'ghumlo_user_prefs_v1',
};

const DEFAULT_PREFERENCES: UserPreferences = {
  displayName: 'Travel Explorer',
  preferredCurrency: 'INR',
  defaultTravelStyle: 'Adventure',
  defaultTravellerCount: 2,
  defaultStartingCity: 'Mumbai',
  theme: 'light',
  notificationsEnabled: true,
};

// Realistic seed trips so new visitors have immediate context to play with
const SEED_TRIPS: Trip[] = [
  {
    id: 'trip-goa-sample',
    name: 'Goa Sun, Sand & Portuguese Charm',
    destinationId: 'goa',
    destinationName: 'Goa',
    destinationImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    departureCity: 'Mumbai',
    startDate: '2026-11-15',
    endDate: '2026-11-19',
    travellers: 2,
    adults: 2,
    children: 0,
    travelStyle: 'Relaxation',
    pace: 'balanced',
    interests: ['Beaches', 'Food', 'History', 'Relaxation'],
    preferredTransport: 'Flight',
    accommodationType: 'Standard hotel',
    budget: {
      total: 35000,
      currency: 'INR',
      categories: {
        transport: 10000,
        accommodation: 12000,
        food: 6000,
        activities: 3000,
        localTravel: 2000,
        shopping: 1000,
        emergency: 1000,
      },
    },
    status: 'upcoming',
    itinerary: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2026-11-15',
        title: 'Arrival in North Goa & Coastal Sunset',
        activities: [
          {
            id: 'act-1-1',
            title: 'Arrive at Mopa / Dabolim Airport & Hotel Check-in',
            description: 'Land in Goa, pick up pre-booked scooter rental, and check into boutique hotel near Candolim.',
            timeOfDay: 'morning',
            startTime: '11:00 AM',
            endTime: '01:00 PM',
            estimatedCost: 1200,
            category: 'travel',
            location: 'Candolim, North Goa',
            notes: 'Inspect scooter and keep helmet strapped.'
          },
          {
            id: 'act-1-2',
            title: 'Lunch at Local Goan Shack',
            description: 'Feast on authentic Kingfish rawa fry, prawn curry rice, and fresh coconut water.',
            timeOfDay: 'afternoon',
            startTime: '01:30 PM',
            endTime: '03:00 PM',
            estimatedCost: 800,
            category: 'food',
            location: 'Calangute Beach Road',
            notes: 'Try Kokum sol kadhi.'
          },
          {
            id: 'act-1-3',
            title: 'Sunset at Sinquerim Beach & Fort Aguada',
            description: 'Walk along the old ramparts of Fort Aguada and watch the sun dip into the Arabian Sea.',
            timeOfDay: 'evening',
            startTime: '05:00 PM',
            endTime: '07:30 PM',
            estimatedCost: 100,
            category: 'sightseeing',
            location: 'Sinquerim',
            notes: 'Carry camera for golden-hour shots.'
          }
        ]
      },
      {
        id: 'day-2',
        dayNumber: 2,
        date: '2026-11-16',
        title: 'Heritage Fontainhas & Latin Quarter Stroll',
        activities: [
          {
            id: 'act-2-1',
            title: 'Fontainhas Walking Tour & Traditional Bakery',
            description: 'Explore pastel yellow, blue, and terracotta Portuguese houses; grab warm Poi and Bebinca at 31st January Bakery.',
            timeOfDay: 'morning',
            startTime: '09:30 AM',
            endTime: '12:30 PM',
            estimatedCost: 400,
            category: 'culture',
            location: 'Panaji Latin Quarter',
            notes: 'Early morning has fewer tourists and gentle sunlight.'
          },
          {
            id: 'act-2-2',
            title: 'Mandovi River Sunset Catamaran Cruise',
            description: 'Cruise along the estuary with Goan folk dance performances and scenic river breezes.',
            timeOfDay: 'evening',
            startTime: '05:30 PM',
            endTime: '07:00 PM',
            estimatedCost: 1000,
            category: 'relaxation',
            location: 'Panaji Jetty',
            notes: 'Boarding starts 20 minutes prior.'
          }
        ]
      },
      {
        id: 'day-3',
        dayNumber: 3,
        date: '2026-11-17',
        title: 'South Goa Tranquility & Kayaking',
        activities: [
          {
            id: 'act-3-1',
            title: 'Palolem Beach Sea Kayaking',
            description: 'Gentle paddle across the protected crescent bay of Palolem towards secluded green headlands.',
            timeOfDay: 'morning',
            startTime: '08:30 AM',
            endTime: '11:00 AM',
            estimatedCost: 600,
            category: 'adventure',
            location: 'Palolem Beach, South Goa',
            notes: 'Wear life jackets and dry bag for phone.'
          },
          {
            id: 'act-3-2',
            title: 'Seafood Dinner by the Shore with Live Music',
            description: 'Candlelight dining on the sand with grilled butter garlic tiger prawns and acoustics.',
            timeOfDay: 'evening',
            startTime: '07:30 PM',
            endTime: '10:00 PM',
            estimatedCost: 1800,
            category: 'food',
            location: 'Agonda Beach'
          }
        ]
      }
    ],
    expenses: [
      {
        id: 'exp-1',
        category: 'transport',
        description: 'Flight tickets Mumbai to Goa (Return for 2)',
        amount: 8800,
        date: '2026-10-01',
        paidBy: 'Self'
      },
      {
        id: 'exp-2',
        category: 'accommodation',
        description: 'Hotel advance deposit (3 nights)',
        amount: 6000,
        date: '2026-10-05',
        paidBy: 'Self'
      },
      {
        id: 'exp-3',
        category: 'activities',
        description: 'Advance booking for Mandovi Catamaran Cruise',
        amount: 1000,
        date: '2026-10-08',
        paidBy: 'Self'
      }
    ],
    notes: 'Remember to pack extra sunscreen and valid driving license for scooter rental.',
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-08T14:30:00Z',
  },
  {
    id: 'trip-manali-sample',
    name: 'Himalayan Highs: Manali & Solang Trek',
    destinationId: 'manali',
    destinationName: 'Manali',
    destinationImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    departureCity: 'Delhi',
    startDate: '2026-12-20',
    endDate: '2026-12-25',
    travellers: 3,
    adults: 3,
    children: 0,
    travelStyle: 'Adventure',
    pace: 'packed',
    interests: ['Adventure', 'Nature', 'Photography'],
    preferredTransport: 'Bus',
    accommodationType: 'Budget hotel',
    budget: {
      total: 42000,
      currency: 'INR',
      categories: {
        transport: 9000,
        accommodation: 14000,
        food: 8000,
        activities: 7000,
        localTravel: 2500,
        shopping: 1000,
        emergency: 500,
      },
    },
    status: 'upcoming',
    itinerary: [
      {
        id: 'day-m1',
        dayNumber: 1,
        date: '2026-12-20',
        title: 'Arrival via Volvo Bus & Old Manali Stroll',
        activities: [
          {
            id: 'act-m1-1',
            title: 'Arrive at Manali Private Bus Stand',
            description: 'Check in at riverside guesthouse in Old Manali and enjoy hot Ginger Lemon Honey tea.',
            timeOfDay: 'morning',
            startTime: '09:00 AM',
            endTime: '11:00 AM',
            estimatedCost: 300,
            category: 'travel',
            location: 'Old Manali'
          },
          {
            id: 'act-m1-2',
            title: 'Hadimba Devi Temple in Cedar Woods',
            description: 'Visit the historic pagoda temple surrounded by towering 400-year-old deodars.',
            timeOfDay: 'afternoon',
            startTime: '02:00 PM',
            endTime: '04:00 PM',
            estimatedCost: 50,
            category: 'sightseeing',
            location: 'Hadimba Temple Road'
          }
        ]
      },
      {
        id: 'day-m2',
        dayNumber: 2,
        date: '2026-12-21',
        title: 'Snow & Adventure at Solang Valley & Atal Tunnel',
        activities: [
          {
            id: 'act-m2-1',
            title: 'Drive through Atal Tunnel into Lahaul Valley',
            description: 'Cross the engineering marvel tunnel into the breathtaking snowscapes of Sissu.',
            timeOfDay: 'morning',
            startTime: '08:30 AM',
            endTime: '01:30 PM',
            estimatedCost: 2500,
            category: 'adventure',
            location: 'Atal Tunnel & Sissu'
          },
          {
            id: 'act-m2-2',
            title: 'Paragliding & Zorbing in Solang',
            description: 'Tandem paragliding flight offering aerial panoramas of snow-draped Pir Panjal range.',
            timeOfDay: 'afternoon',
            startTime: '02:30 PM',
            endTime: '05:30 PM',
            estimatedCost: 3200,
            category: 'adventure',
            location: 'Solang Valley'
          }
        ]
      }
    ],
    expenses: [
      {
        id: 'exp-m1',
        category: 'transport',
        description: 'Volvo Semi-Sleeper Bus Delhi to Manali (3 tickets)',
        amount: 5400,
        date: '2026-10-02',
        paidBy: 'Aman'
      }
    ],
    notes: 'Pack thermal base layers and waterproof snow gloves.',
    createdAt: '2026-10-02T11:00:00Z',
    updatedAt: '2026-10-02T11:00:00Z',
  }
];

export const storageService = {
  // Trips
  getTrips(): Trip[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRIPS);
      if (!data) {
        // Initialize with seed trips on first load
        localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(SEED_TRIPS));
        return SEED_TRIPS;
      }
      return JSON.parse(data) as Trip[];
    } catch (err) {
      console.error('Error reading trips from localStorage:', err);
      return SEED_TRIPS;
    }
  },

  getTrip(id: string): Trip | undefined {
    const trips = this.getTrips();
    return trips.find((t) => t.id === id);
  },

  saveTrip(trip: Trip): Trip {
    const trips = this.getTrips();
    const existingIndex = trips.findIndex((t) => t.id === trip.id);
    const updatedTrip: Trip = {
      ...trip,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      trips[existingIndex] = updatedTrip;
    } else {
      trips.unshift(updatedTrip);
    }

    try {
      localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
    } catch (err) {
      console.error('Error saving trip to localStorage:', err);
    }
    return updatedTrip;
  },

  deleteTrip(id: string): boolean {
    try {
      const trips = this.getTrips().filter((t) => t.id !== id);
      localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
      return true;
    } catch (err) {
      console.error('Error deleting trip:', err);
      return false;
    }
  },

  duplicateTrip(id: string): Trip | null {
    const trip = this.getTrip(id);
    if (!trip) return null;

    const duplicated: Trip = {
      ...trip,
      id: `trip-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: `${trip.name} (Copy)`,
      status: 'planning',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Fresh IDs for days and activities
      itinerary: trip.itinerary.map((day, idx) => ({
        ...day,
        id: `day-${Date.now()}-${idx}`,
        activities: day.activities.map((act, aIdx) => ({
          ...act,
          id: `act-${Date.now()}-${idx}-${aIdx}`
        }))
      })),
      expenses: [], // Reset expenses for a fresh copied trip
    };

    return this.saveTrip(duplicated);
  },

  // Favorites
  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (!data) {
        // Default favorites
        const defaults = ['goa', 'manali', 'kashmir'];
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(defaults));
        return defaults;
      }
      return JSON.parse(data) as string[];
    } catch (err) {
      console.error('Error reading favorites:', err);
      return ['goa', 'manali'];
    }
  },

  isFavorite(destinationId: string): boolean {
    const favs = this.getFavorites();
    return favs.includes(destinationId);
  },

  toggleFavorite(destinationId: string): boolean {
    try {
      let favs = this.getFavorites();
      let isFav = false;
      if (favs.includes(destinationId)) {
        favs = favs.filter((id) => id !== destinationId);
        isFav = false;
      } else {
        favs.push(destinationId);
        isFav = true;
      }
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
      // Dispatch custom event for cross-component sync
      window.dispatchEvent(new Event('ghumlo_favorites_changed'));
      return isFav;
    } catch (err) {
      console.error('Error toggling favorite:', err);
      return false;
    }
  },

  // User Preferences
  getUserPreferences(): UserPreferences {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (!data) return DEFAULT_PREFERENCES;
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(data) };
    } catch (err) {
      console.error('Error reading user preferences:', err);
      return DEFAULT_PREFERENCES;
    }
  },

  saveUserPreferences(prefs: Partial<UserPreferences>): UserPreferences {
    try {
      const current = this.getUserPreferences();
      const updated = { ...current, ...prefs };
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
      window.dispatchEvent(new Event('ghumlo_preferences_changed'));
      return updated;
    } catch (err) {
      console.error('Error saving user preferences:', err);
      return DEFAULT_PREFERENCES;
    }
  },

  // Reset or reseed data
  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.TRIPS);
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
    window.location.reload();
  }
};
