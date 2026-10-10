import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  IndianRupee,
  Navigation,
} from 'lucide-react';
import { INITIAL_DESTINATIONS } from '../../data/destinations';
import { TravelStyle } from '../../types';

export const TripSearchHero: React.FC = () => {
  const navigate = useNavigate();

  // Search form state
  const [destination, setDestination] = useState('');
  const [startingCity, setStartingCity] = useState('Mumbai');
  const [departureDate, setDepartureDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 18);
    return d.toISOString().split('T')[0];
  });
  const [travellers, setTravellers] = useState(2);
  const [budget, setBudget] = useState(30000);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('Adventure');
  const [errorMsg, setErrorMsg] = useState('');

  const travelStylesList: TravelStyle[] = [
    'Adventure',
    'Relaxation',
    'Family',
    'Romantic',
    'Cultural',
    'Backpacking',
    'Luxury',
    'Weekend getaway',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!destination.trim()) {
      setErrorMsg('Please enter or select a destination you wish to explore.');
      return;
    }

    if (new Date(returnDate) < new Date(departureDate)) {
      setErrorMsg('Return date must be on or after your departure date.');
      return;
    }

    // Find destinationId if matches
    const matched = INITIAL_DESTINATIONS.find(
      (d) => d.name.toLowerCase() === destination.trim().toLowerCase()
    );

    const queryParams = new URLSearchParams({
      destination: destination.trim(),
      destinationId: matched ? matched.id : '',
      startingCity: startingCity.trim(),
      startDate: departureDate,
      endDate: returnDate,
      travellers: travellers.toString(),
      budget: budget.toString(),
      travelStyle: travelStyle,
    });

    navigate(`/plan?${queryParams.toString()}`);
  };

  return (
    <section className="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Photography with warm natural Indian mountain & coastal landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
          alt="Scenic travel mountains"
          className="w-full h-full object-cover object-center filter brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#142B4A]/80 via-[#142B4A]/50 to-[#142B4A]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Brand Tagline Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium mb-6 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#FF8748]" />
          <span className="font-bold text-[#FF8748] tracking-wide">"Bas Plan Karo, Nikal Pado!"</span>
          <span className="text-white/40">|</span>
          <span className="text-slate-200">Plan Your Journey. Explore Your World.</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto drop-shadow-md">
          Your Next Adventure Is Just a Plan Away.
        </h1>

        {/* Supporting Description */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
          Discover amazing places across India & beyond, build day-by-day itineraries with Gemini AI, and manage your travel budget effortlessly.
        </p>

        {/* Hero Quick CTA Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/plan"
            className="px-6 py-3 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white font-semibold text-sm sm:text-base shadow-lg shadow-[#FF8748]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Plan My Trip Now
          </Link>
          <Link
            to="/explore"
            className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold text-sm sm:text-base border border-white/20 transition-all"
          >
            Explore Destinations
          </Link>
        </div>

        {/* Floating Trip Search Panel */}
        <div className="mt-10 bg-white rounded-3xl shadow-2xl p-5 sm:p-7 text-left border border-white/40">
          <form onSubmit={handleSearchSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Destination */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#142B4A] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2878D0]" />
                  Where do you want to go?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Goa, Manali, Jaipur..."
                    list="destinations-datalist"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] placeholder-slate-400 focus:outline-none focus:border-[#2878D0] focus:ring-2 focus:ring-[#2878D0]/20 bg-[#F7F9FC]"
                  />
                  <datalist id="destinations-datalist">
                    {INITIAL_DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.name} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Starting City */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#142B4A] flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#36B7A0]" />
                  Starting City
                </label>
                <input
                  type="text"
                  value={startingCity}
                  onChange={(e) => setStartingCity(e.target.value)}
                  placeholder="e.g. Mumbai, Delhi, Bengaluru"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] placeholder-slate-400 focus:outline-none focus:border-[#2878D0] focus:ring-2 focus:ring-[#2878D0]/20 bg-[#F7F9FC]"
                />
              </div>

              {/* Departure Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#142B4A] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#2878D0]" />
                  Departure Date
                </label>
                <input
                  type="date"
                  value={departureDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] focus:outline-none focus:border-[#2878D0] focus:ring-2 focus:ring-[#2878D0]/20 bg-[#F7F9FC]"
                />
              </div>

              {/* Return Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#142B4A] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#2878D0]" />
                  Return Date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  min={departureDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] focus:outline-none focus:border-[#2878D0] focus:ring-2 focus:ring-[#2878D0]/20 bg-[#F7F9FC]"
                />
              </div>
            </div>

            {/* Row 2: Travellers, Budget, Style, Search CTA */}
            <div className="mt-4 pt-4 border-t border-[#E3EAF2] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* Travellers count */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#142B4A] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#2878D0]" />
                  Travellers
                </label>
                <select
                  value={travellers}
                  onChange={(e) => setTravellers(parseInt(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] focus:outline-none focus:border-[#2878D0] focus:ring-2 focus:ring-[#2878D0]/20 bg-[#F7F9FC]"
                >
                  <option value={1}>1 Solo Explorer</option>
                  <option value={2}>2 Travellers (Couple / Duo)</option>
                  <option value={3}>3 Travellers</option>
                  <option value={4}>4 Travellers (Family / Group)</option>
                  <option value={5}>5+ Travellers</option>
                </select>
              </div>

              {/* Budget Slider / Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#142B4A] flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-[#36B7A0]" />
                    Budget (INR)
                  </label>
                  <span className="text-xs font-bold text-[#2878D0]">₹{budget.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={200000}
                  step={5000}
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2878D0] my-2"
                />
              </div>

              {/* Travel Style */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#142B4A] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#FF8748]" />
                  Travel Style
                </label>
                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value as TravelStyle)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] focus:outline-none focus:border-[#2878D0] focus:ring-2 focus:ring-[#2878D0]/20 bg-[#F7F9FC]"
                >
                  {travelStylesList.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white text-sm font-bold shadow-md shadow-[#2878D0]/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  <span>Build My Itinerary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="mt-3 text-xs text-[#D64545] font-medium flex items-center gap-1">
                ⚠️ {errorMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
