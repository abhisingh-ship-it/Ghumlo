import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Compass,
  Calendar,
  Users,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertTriangle,
  Wallet,
  Car,
  Hotel,
  Clock,
  RotateCcw,
  Save,
  CheckCircle2,
  HelpCircle,
  IndianRupee,
} from 'lucide-react';
import { INITIAL_DESTINATIONS } from '../data/destinations';
import {
  Trip,
  TravelStyle,
  TripPace,
  BudgetAllocation,
  ItineraryDay,
} from '../types';
import { formatINR, calculateDaysCount, triggerTripCelebration } from '../utils/formatters';
import { apiService } from '../services/api';
import { storageService } from '../services/storage';

export const PlanTripPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Wizard Step (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSource, setGenerationSource] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');

  // Default dates (2 weeks ahead, 4-day trip)
  const defaultStart = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  };
  const defaultEnd = () => {
    const d = new Date();
    d.setDate(d.getDate() + 18);
    return d.toISOString().split('T')[0];
  };

  // STEP 1 Form State
  const [tripName, setTripName] = useState('My Next Epic Getaway');
  const [destination, setDestination] = useState(searchParams.get('destination') || 'Goa');
  const [destinationId, setDestinationId] = useState(searchParams.get('destinationId') || 'goa');
  const [startingCity, setStartingCity] = useState(searchParams.get('startingCity') || 'Mumbai');
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || defaultStart());
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || defaultEnd());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(
    (searchParams.get('travelStyle') as TravelStyle) || 'Adventure'
  );
  const [totalBudget, setTotalBudget] = useState<number>(
    parseInt(searchParams.get('budget') || '35000')
  );
  const [preferredTransport, setPreferredTransport] = useState('Flight');
  const [accommodationType, setAccommodationType] = useState('Standard hotel');

  // STEP 2 Form State (Preferences)
  const [pace, setPace] = useState<TripPace>('balanced');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Nature',
    'Food',
    'History',
    'Beaches',
  ]);

  // STEP 3 Form State (Budget Allocation)
  const [budgetAllocation, setBudgetAllocation] = useState<BudgetAllocation>({
    transport: 10000,
    accommodation: 12000,
    food: 6000,
    activities: 3000,
    localTravel: 2000,
    shopping: 1000,
    emergency: 1000,
  });

  // STEP 4 / 5 Form State (Generated Itinerary)
  const [generatedItinerary, setGeneratedItinerary] = useState<ItineraryDay[]>([]);
  const [generatedSummary, setGeneratedSummary] = useState('');

  // Sync destination if selected from query
  useEffect(() => {
    const qDest = searchParams.get('destination');
    if (qDest) {
      setDestination(qDest);
      setTripName(`Journey to ${qDest}`);
      const matched = INITIAL_DESTINATIONS.find(
        (d) => d.name.toLowerCase() === qDest.toLowerCase()
      );
      if (matched) {
        setDestinationId(matched.id);
        setTotalBudget(matched.estimatedDailyBudget * 4);
      }
    }
  }, [searchParams]);

  const interestOptions = [
    'Adventure',
    'Nature',
    'Beaches',
    'Food',
    'Shopping',
    'History',
    'Photography',
    'Spiritual places',
    'Nightlife',
    'Relaxation',
    'Family activities',
    'Local experiences',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Budget calculations
  const totalAllocated = Object.values(budgetAllocation).reduce((a, b) => a + (b || 0), 0);
  const unallocatedBudget = totalBudget - totalAllocated;

  // Auto-distribute budget preset
  const autoBalanceBudget = () => {
    const t = totalBudget;
    setBudgetAllocation({
      transport: Math.round(t * 0.28),
      accommodation: Math.round(t * 0.32),
      food: Math.round(t * 0.18),
      activities: Math.round(t * 0.10),
      localTravel: Math.round(t * 0.05),
      shopping: Math.round(t * 0.04),
      emergency: Math.round(t * 0.03),
    });
  };

  // STEP 1 Validation
  const validateStep1 = () => {
    if (!destination.trim()) {
      setErrorMsg('Please specify a destination.');
      return false;
    }
    if (!startDate || !endDate) {
      setErrorMsg('Please select travel dates.');
      return false;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setErrorMsg('Return date cannot be earlier than departure date.');
      return false;
    }
    if (adults < 1) {
      setErrorMsg('At least one adult traveller is required.');
      return false;
    }
    if (totalBudget < 1000) {
      setErrorMsg('Estimated budget must be at least ₹1,000.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  // STEP 2 Validation
  const validateStep2 = () => {
    if (selectedInterests.length === 0) {
      setErrorMsg('Please choose at least 1 interest.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  // Generation Handler (Step 3 -> Step 4)
  const handleGenerateItinerary = async () => {
    setIsGenerating(true);
    setErrorMsg('');
    try {
      const res = await apiService.generateItinerary({
        destination,
        departureCity: startingCity,
        startDate,
        endDate,
        travellers: adults + children,
        budget: totalBudget,
        travelStyle,
        pace,
        interests: selectedInterests,
        preferredTransport,
        accommodationType,
      });

      setGeneratedItinerary(res.itinerary || []);
      setGeneratedSummary(res.summary || '');
      setGenerationSource(res.source);
      setCurrentStep(4);
    } catch (err: any) {
      console.error('Error generating itinerary:', err);
      setErrorMsg('Something went wrong generating your itinerary. Please retry.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Save Trip to Storage (Step 5)
  const handleSaveTrip = () => {
    const matchedDest = INITIAL_DESTINATIONS.find(
      (d) => d.id === destinationId || d.name.toLowerCase() === destination.toLowerCase()
    );

    const newTrip: Trip = {
      id: `trip-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      name: tripName.trim() || `Journey to ${destination}`,
      destinationId: matchedDest?.id || 'custom',
      destinationName: destination,
      destinationImage:
        matchedDest?.heroImage ||
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      departureCity: startingCity,
      startDate,
      endDate,
      travellers: adults + children,
      adults,
      children,
      travelStyle,
      pace,
      interests: selectedInterests,
      preferredTransport,
      accommodationType,
      budget: {
        total: totalBudget,
        currency: 'INR',
        categories: budgetAllocation,
      },
      status: 'upcoming',
      itinerary: generatedItinerary,
      expenses: [],
      notes: `Planned via GhumLo AI Planner. Origin: ${startingCity}.`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = storageService.saveTrip(newTrip);
    triggerTripCelebration();
    navigate(`/trip/${saved.id}`);
  };

  const stepsList = [
    { num: 1, title: 'Trip Details' },
    { num: 2, title: 'Preferences' },
    { num: 3, title: 'Budget Math' },
    { num: 4, title: 'AI Itinerary' },
    { num: 5, title: 'Review & Save' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Page Title */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF8748]">
          GhumLo Smart Planner
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] mt-1">
          Plan Your Next Adventure
        </h1>
        <p className="text-sm text-[#6B7A90] mt-1">
          "Bas Plan Karo, Nikal Pado!" — Customized day-by-day plans in minutes.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#E3EAF2] -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-[#2878D0] -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
          />

          {stepsList.map((step) => {
            const isCompleted = step.num < currentStep;
            const isCurrent = step.num === currentStep;

            return (
              <div key={step.num} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  disabled={step.num > currentStep}
                  onClick={() => {
                    if (step.num < currentStep) setCurrentStep(step.num);
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-[#36B7A0] text-white shadow-sm'
                      : isCurrent
                      ? 'bg-[#2878D0] text-white ring-4 ring-[#2878D0]/20 shadow-md'
                      : 'bg-white border-2 border-[#E3EAF2] text-[#6B7A90]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.num}
                </button>
                <span
                  className={`mt-1.5 text-[11px] font-semibold hidden sm:block ${
                    isCurrent ? 'text-[#142B4A]' : 'text-[#6B7A90]'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Notice */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Wizard Form Cards */}
      <div className="bg-white rounded-3xl border border-[#E3EAF2] shadow-sm p-6 sm:p-10">
        {/* STEP 1: TRIP DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-[#142B4A]">Step 1: Core Trip Details</h2>
              <p className="text-xs text-[#6B7A90] mt-1">Tell us where you are headed and who is joining.</p>
            </div>

            <div className="space-y-4">
              {/* Trip Name */}
              <div>
                <label className="block text-xs font-bold text-[#142B4A] mb-1">Trip Name</label>
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  placeholder="e.g. Goa Beach & Heritage Chill, Manali Snow Escape..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] focus:outline-none focus:border-[#2878D0] focus:ring-2 focus:ring-[#2878D0]/20 bg-[#F7F9FC]"
                />
              </div>

              {/* Destination & Starting City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    list="dest-list-input"
                    placeholder="e.g. Goa, Kashmir, Manali, Jaipur..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] focus:outline-none focus:border-[#2878D0] focus:ring-2 focus:ring-[#2878D0]/20 bg-[#F7F9FC]"
                  />
                  <datalist id="dest-list-input">
                    {INITIAL_DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.name} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Starting City</label>
                  <input
                    type="text"
                    value={startingCity}
                    onChange={(e) => setStartingCity(e.target.value)}
                    placeholder="e.g. Mumbai, Delhi, Bengaluru, Pune..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] focus:outline-none focus:border-[#2878D0] focus:ring-2 focus:ring-[#2878D0]/20 bg-[#F7F9FC]"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Departure Date</label>
                  <input
                    type="date"
                    value={startDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] focus:outline-none focus:border-[#2878D0] bg-[#F7F9FC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Return Date</label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] focus:outline-none focus:border-[#2878D0] bg-[#F7F9FC]"
                  />
                  <span className="text-[11px] text-[#2878D0] font-medium mt-1 block">
                    Duration: {calculateDaysCount(startDate, endDate)} Days
                  </span>
                </div>
              </div>

              {/* Travellers (Adults & Children) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Adults (Age 12+)</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] bg-[#F7F9FC]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Adult' : 'Adults'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Children (Age 0-11)</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] bg-[#F7F9FC]"
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} Children
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget, Transport & Accommodation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-[#142B4A]">Total Budget (INR)</label>
                    <span className="text-xs font-bold text-[#2878D0]">{formatINR(totalBudget)}</span>
                  </div>
                  <input
                    type="number"
                    step={1000}
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] bg-[#F7F9FC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Preferred Transport</label>
                  <select
                    value={preferredTransport}
                    onChange={(e) => setPreferredTransport(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] bg-[#F7F9FC]"
                  >
                    <option value="Flight">Flight</option>
                    <option value="Train">Train (Railways)</option>
                    <option value="Bus">Volvo / Intercity Bus</option>
                    <option value="Car">Self-drive Car</option>
                    <option value="Bike">Motorcycle / Bike</option>
                    <option value="Mixed transport">Mixed Transport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Accommodation</label>
                  <select
                    value={accommodationType}
                    onChange={(e) => setAccommodationType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] bg-[#F7F9FC]"
                  >
                    <option value="Hostel">Hostel / Backpacker Dorm</option>
                    <option value="Budget hotel">Budget Hotel</option>
                    <option value="Standard hotel">Standard 3-Star Hotel</option>
                    <option value="Resort">Beach / Hill Resort</option>
                    <option value="Homestay">Authentic Homestay</option>
                    <option value="Luxury accommodation">Luxury 5-Star</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E3EAF2] flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setCurrentStep(2);
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Continue to Preferences</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: TRAVEL PREFERENCES */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-[#142B4A]">Step 2: Travel Preferences & Pace</h2>
              <p className="text-xs text-[#6B7A90] mt-1">Customize what you want to experience in {destination}.</p>
            </div>

            {/* Travel Pace */}
            <div>
              <label className="block text-xs font-bold text-[#142B4A] mb-3">Trip Pace & Schedule</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'relaxed', title: 'Relaxed Schedules', desc: 'Slow mornings, 2-3 calm stops per day, plenty of leisure time.' },
                  { id: 'balanced', title: 'Balanced Schedules', desc: 'Ideal sweet spot: iconic sights plus relaxing cafe afternoons.' },
                  { id: 'packed', title: 'Packed Itineraries', desc: 'High energy, wake up early, maximize every hour and landmark.' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPace(item.id as TripPace)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      pace === item.id
                        ? 'border-[#2878D0] bg-[#EAF4FF] ring-2 ring-[#2878D0]/20'
                        : 'border-[#E3EAF2] hover:bg-[#F7F9FC]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#142B4A]">{item.title}</span>
                      {pace === item.id && <Check className="w-4 h-4 text-[#2878D0]" />}
                    </div>
                    <p className="text-xs text-[#6B7A90] leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Interests checklist */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-bold text-[#142B4A]">
                  Select Interests & Activities (Pick what matters to you)
                </label>
                <span className="text-xs text-[#2878D0] font-semibold">
                  {selectedInterests.length} selected
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {interestOptions.map((interest) => {
                  const isChecked = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-[#2878D0] bg-[#EAF4FF] text-[#2878D0]'
                          : 'border-[#E3EAF2] text-[#172B4D] hover:bg-[#F7F9FC]'
                      }`}
                    >
                      <span>{interest}</span>
                      {isChecked ? (
                        <Check className="w-3.5 h-3.5 text-[#2878D0]" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E3EAF2] flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E3EAF2] text-[#142B4A] font-semibold text-xs hover:bg-[#F7F9FC]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) {
                    autoBalanceBudget();
                    setCurrentStep(3);
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Continue to Budget Math</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: BUDGET ALLOCATION */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#142B4A]">Step 3: Budget Allocation</h2>
                <p className="text-xs text-[#6B7A90] mt-1">
                  Allocate your estimated {formatINR(totalBudget)} across travel essentials.
                </p>
              </div>

              <button
                type="button"
                onClick={autoBalanceBudget}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EAF4FF] text-[#2878D0] text-xs font-bold hover:bg-[#2878D0] hover:text-white transition-all self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Auto-Balance Presets</span>
              </button>
            </div>

            {/* Dynamic Budget Summary Bar */}
            <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#E3EAF2] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="block text-[11px] text-[#6B7A90]">Total Planned</span>
                <span className="text-base font-bold text-[#142B4A]">{formatINR(totalBudget)}</span>
              </div>
              <div>
                <span className="block text-[11px] text-[#6B7A90]">Allocated</span>
                <span className="text-base font-bold text-[#36B7A0]">{formatINR(totalAllocated)}</span>
              </div>
              <div>
                <span className="block text-[11px] text-[#6B7A90]">Unallocated Balance</span>
                <span
                  className={`text-base font-bold ${
                    unallocatedBudget < 0
                      ? 'text-[#D64545]'
                      : unallocatedBudget === 0
                      ? 'text-[#36B7A0]'
                      : 'text-[#2878D0]'
                  }`}
                >
                  {formatINR(unallocatedBudget)}
                </span>
              </div>
            </div>

            {unallocatedBudget < 0 && (
              <p className="text-xs text-[#D64545] font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Allocations exceed your total budget by {formatINR(Math.abs(unallocatedBudget))}.
              </p>
            )}

            {/* Category inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'transport', label: 'Intercity Transport (Flights/Trains/Bus)' },
                { key: 'accommodation', label: 'Accommodation (Hotels/Resorts/Homestays)' },
                { key: 'food', label: 'Food & Dining (Meals, Street food, Cafes)' },
                { key: 'activities', label: 'Activities & Sightseeing (Tickets, Tours)' },
                { key: 'localTravel', label: 'Local Travel (Scooters, Auto, Cabs)' },
                { key: 'shopping', label: 'Shopping & Souvenirs' },
                { key: 'emergency', label: 'Emergency Reserve' },
              ].map((cat) => (
                <div key={cat.key} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-[#142B4A]">{cat.label}</label>
                    <span className="font-semibold text-[#2878D0]">
                      {formatINR(budgetAllocation[cat.key as keyof BudgetAllocation] || 0)}
                    </span>
                  </div>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={budgetAllocation[cat.key as keyof BudgetAllocation] || 0}
                    onChange={(e) => {
                      const val = Math.max(0, parseInt(e.target.value) || 0);
                      setBudgetAllocation({
                        ...budgetAllocation,
                        [cat.key]: val,
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EAF2] text-xs font-semibold text-[#142B4A] bg-[#F7F9FC]"
                  />
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E3EAF2] flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E3EAF2] text-[#142B4A] font-semibold text-xs hover:bg-[#F7F9FC]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGenerateItinerary}
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white font-bold text-sm shadow-lg shadow-[#FF8748]/30 transition-all hover:scale-105 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin text-base">⚙️</span>
                    <span>Crafting your custom itinerary...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Smart Itinerary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: GENERATED ITINERARY PREVIEW */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                    Local Travel Engine (Browser-Offline)
                  </span>
                  <span className="text-xs text-[#6B7A90]">
                    {generatedItinerary.length} Days Planned
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#142B4A] mt-1">
                  {generatedSummary || `Your Curated Itinerary for ${destination}`}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleGenerateItinerary}
                disabled={isGenerating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E3EAF2] text-xs font-semibold text-[#142B4A] hover:bg-[#F7F9FC] transition-colors self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
            </div>

            {/* Timeline Days */}
            <div className="space-y-6">
              {generatedItinerary.map((day) => (
                <div
                  key={day.id}
                  className="rounded-2xl border border-[#E3EAF2] bg-[#F7F9FC] p-5 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#E3EAF2]">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#2878D0] text-white flex items-center justify-center font-bold text-xs">
                        D{day.dayNumber}
                      </span>
                      <h3 className="font-bold text-[#142B4A] text-sm">{day.title}</h3>
                    </div>
                    <span className="text-xs text-[#6B7A90] font-medium">{day.date}</span>
                  </div>

                  {/* Activities list */}
                  <div className="space-y-3">
                    {day.activities.map((act) => (
                      <div
                        key={act.id}
                        className="bg-white rounded-xl p-3.5 border border-[#E3EAF2] flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2878D0]">
                              {act.startTime} - {act.endTime}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                              {act.category}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-[#142B4A]">{act.title}</h4>
                          <p className="text-xs text-[#6B7A90] mt-1 leading-relaxed">
                            {act.description}
                          </p>
                          {act.notes && (
                            <p className="text-[11px] text-[#36B7A0] mt-1 italic">
                              Tip: {act.notes}
                            </p>
                          )}
                        </div>

                        <div className="text-right sm:shrink-0">
                          <span className="text-xs font-bold text-[#142B4A]">
                            {act.estimatedCost === 0 ? 'Free' : formatINR(act.estimatedCost)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E3EAF2] flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E3EAF2] text-[#142B4A] font-semibold text-xs hover:bg-[#F7F9FC]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Adjust Budget</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Proceed to Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW AND SAVE */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-[#142B4A]">Step 5: Review & Save Your Journey</h2>
              <p className="text-xs text-[#6B7A90] mt-1">
                Confirm your trip details. You can continue refining activities and tracking expenses later.
              </p>
            </div>

            {/* Trip Summary Card */}
            <div className="p-6 rounded-2xl bg-[#EAF4FF]/60 border border-[#2878D0]/20 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2878D0]">
                    {travelStyle} · {pace} pace
                  </span>
                  <h3 className="text-2xl font-black text-[#142B4A] mt-0.5">{tripName}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#6B7A90] block">Total Planned Budget</span>
                  <span className="text-2xl font-black text-[#2878D0]">{formatINR(totalBudget)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-[#2878D0]/10 text-xs">
                <div>
                  <span className="text-[#6B7A90] block">Destination</span>
                  <span className="font-bold text-[#142B4A]">{destination}</span>
                </div>
                <div>
                  <span className="text-[#6B7A90] block">Starting City</span>
                  <span className="font-bold text-[#142B4A]">{startingCity}</span>
                </div>
                <div>
                  <span className="text-[#6B7A90] block">Dates</span>
                  <span className="font-bold text-[#142B4A]">
                    {startDate} to {endDate}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B7A90] block">Travellers</span>
                  <span className="font-bold text-[#142B4A]">{adults + children} Travellers</span>
                </div>
              </div>
            </div>

            {/* Budget allocations recap */}
            <div className="p-5 rounded-2xl bg-white border border-[#E3EAF2] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#142B4A]">
                Budget Allocations (₹ INR)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[#6B7A90] block">Transport</span>
                  <span className="font-bold text-[#142B4A]">{formatINR(budgetAllocation.transport)}</span>
                </div>
                <div>
                  <span className="text-[#6B7A90] block">Stay</span>
                  <span className="font-bold text-[#142B4A]">{formatINR(budgetAllocation.accommodation)}</span>
                </div>
                <div>
                  <span className="text-[#6B7A90] block">Food</span>
                  <span className="font-bold text-[#142B4A]">{formatINR(budgetAllocation.food)}</span>
                </div>
                <div>
                  <span className="text-[#6B7A90] block">Activities</span>
                  <span className="font-bold text-[#142B4A]">{formatINR(budgetAllocation.activities)}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E3EAF2] flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E3EAF2] text-[#142B4A] font-semibold text-xs hover:bg-[#F7F9FC]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Itinerary</span>
              </button>

              <button
                type="button"
                onClick={handleSaveTrip}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white font-bold text-sm shadow-lg shadow-[#FF8748]/30 transition-all hover:scale-105 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Trip to My Trips</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
