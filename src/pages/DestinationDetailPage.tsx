import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { INITIAL_DESTINATIONS } from '../data/destinations';
import { storageService } from '../services/storage';
import { formatINR } from '../utils/formatters';
import {
  MapPin,
  Calendar,
  Clock,
  Heart,
  ArrowLeft,
  Luggage,
  Sparkles,
  Bus,
  CheckCircle2,
  Compass,
  ExternalLink,
  ShieldAlert,
  Info,
  DollarSign,
  Share2,
} from 'lucide-react';

export const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const destination = INITIAL_DESTINATIONS.find(
    (d) => d.id === id || d.name.toLowerCase() === id?.toLowerCase()
  );

  const [isFav, setIsFav] = useState(false);
  const [activeImage, setActiveImage] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    if (destination) {
      setIsFav(storageService.isFavorite(destination.id));
      setActiveImage(destination.heroImage);
    }
  }, [destination]);

  if (!destination) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#142B4A]">Destination Not Found</h2>
        <p className="mt-2 text-sm text-[#6B7A90]">The destination guide you are looking for does not exist.</p>
        <Link
          to="/explore"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2878D0] text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    const status = storageService.toggleFavorite(destination.id);
    setIsFav(status);
    setToastMessage(status ? 'Saved to Favorites bucket list!' : 'Removed from Favorites.');
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${destination.name} - GhumLo Travel Guide`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(''), 2500);
    }
  };

  const handlePlanTrip = () => {
    navigate(`/plan?destination=${encodeURIComponent(destination.name)}&destinationId=${destination.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B4A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-slideUp">
          <Sparkles className="w-4 h-4 text-[#FF8748]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7A90] hover:text-[#2878D0] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all destinations</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-[#E3EAF2] bg-white text-[#142B4A] hover:bg-[#F7F9FC] transition-colors"
            title="Share guide"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleToggleFavorite}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border transition-all text-xs font-semibold ${
              isFav
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-[#E3EAF2] text-[#142B4A] hover:bg-[#F7F9FC]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
            <span>{isFav ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Hero Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-3xl overflow-hidden bg-slate-900 shadow-md">
        <div className="lg:col-span-2 relative h-[380px] sm:h-[480px]">
          <img
            src={activeImage}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-1.5 text-xs text-[#FF8748] font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              <span>{destination.region}, {destination.country}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-sm">
              {destination.name}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-200 max-w-xl line-clamp-2">
              {destination.description}
            </p>
          </div>
        </div>

        {/* Thumbnail gallery */}
        <div className="hidden lg:flex flex-col gap-3 p-4 bg-[#142B4A]/90 justify-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Photo Gallery
          </h4>
          <div className="space-y-3">
            {[destination.heroImage, ...(destination.gallery || [])].slice(0, 3).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-full h-28 rounded-xl overflow-hidden border-2 transition-all block ${
                  activeImage === img ? 'border-[#FF8748] scale-[1.02]' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${destination.name} ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout: Details + Sticky Trip Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left 2 Cols: Comprehensive Guide */}
        <div className="lg:col-span-2 space-y-10">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-[#E3EAF2]">
            <div>
              <span className="block text-[11px] text-[#6B7A90] font-medium uppercase">Best Season</span>
              <span className="text-sm font-bold text-[#142B4A] mt-0.5 block">{destination.bestTimeToVisit}</span>
            </div>
            <div>
              <span className="block text-[11px] text-[#6B7A90] font-medium uppercase">Ideal Duration</span>
              <span className="text-sm font-bold text-[#142B4A] mt-0.5 block">{destination.recommendedDuration}</span>
            </div>
            <div>
              <span className="block text-[11px] text-[#6B7A90] font-medium uppercase">Est. Daily Budget</span>
              <span className="text-sm font-bold text-[#2878D0] mt-0.5 block">~{formatINR(destination.estimatedDailyBudget)} /day</span>
            </div>
            <div>
              <span className="block text-[11px] text-[#6B7A90] font-medium uppercase">Ideal For</span>
              <span className="text-sm font-bold text-[#142B4A] mt-0.5 block">{destination.travelStyles[0] || 'Explorers'}</span>
            </div>
          </div>

          {/* Destination Overview */}
          <section className="bg-white rounded-3xl border border-[#E3EAF2] p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-[#142B4A]">About {destination.name}</h2>
            <p className="text-sm sm:text-base text-[#172B4D] leading-relaxed">
              {destination.description}
            </p>
            <div className="pt-3 flex flex-wrap gap-2 text-xs text-[#6B7A90]">
              <span className="font-semibold text-[#142B4A]">Categories:</span>
              {destination.categories.map((c, i) => (
                <span key={c} className="bg-[#F7F9FC] px-2.5 py-1 rounded-md border border-[#E3EAF2] text-[#142B4A]">
                  {c}
                </span>
              ))}
            </div>
          </section>

          {/* Top Attractions & Sights */}
          <section className="bg-white rounded-3xl border border-[#E3EAF2] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#142B4A]">Must-Visit Attractions & Sights</h2>
                <p className="text-xs text-[#6B7A90] mt-0.5">Indicative entry ticket prices in INR</p>
              </div>
            </div>

            <div className="space-y-4">
              {destination.attractions.map((att, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#F7F9FC] border border-[#E3EAF2] hover:border-[#2878D0]/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-bold text-[#142B4A] text-base">{att.name}</h3>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#EAF4FF] text-[#2878D0]">
                        {att.estimatedTime}
                      </span>
                      {att.ticketCostINR !== undefined && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                          {att.ticketCostINR === 0 ? 'Free Entry' : `Ticket ~₹${att.ticketCostINR}`}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B7A90] mt-2 leading-relaxed">
                    {att.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#36B7A0] font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Highlight: {att.highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Signature Experiences */}
          <section className="bg-white rounded-3xl border border-[#E3EAF2] p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-[#142B4A]">Curated Experiences</h2>
            <div className="space-y-3">
              {destination.recommendedExperiences.map((exp, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-[#172B4D]">
                  <CheckCircle2 className="w-5 h-5 text-[#36B7A0] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{exp}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Practical Tips: Local Transport, Culture & Packing */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Local Transport */}
            <div className="bg-white rounded-3xl border border-[#E3EAF2] p-6 space-y-3">
              <h3 className="text-base font-bold text-[#142B4A] flex items-center gap-2">
                <Bus className="w-4 h-4 text-[#2878D0]" />
                <span>Local Getting Around</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#6B7A90]">
                {destination.localTransport.map((trans, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2878D0]" />
                    <span>{trans}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cultural Information */}
            <div className="bg-white rounded-3xl border border-[#E3EAF2] p-6 space-y-3">
              <h3 className="text-base font-bold text-[#142B4A] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#FF8748]" />
                <span>Culture & Etiquette</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#6B7A90]">
                {destination.culturalTips.map((tip, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8748]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Packing suggestions */}
          <section className="bg-white rounded-3xl border border-[#E3EAF2] p-6 space-y-3">
            <h3 className="text-base font-bold text-[#142B4A] flex items-center gap-2">
              <Luggage className="w-4 h-4 text-[#36B7A0]" />
              <span>Recommended Packing List</span>
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {destination.packingSuggestions.map((pack, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF2] text-xs text-[#142B4A]"
                >
                  ✓ {pack}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sticky Card: Plan Trip Here & AI Assistant CTA */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl border border-[#E3EAF2] p-6 sm:p-7 shadow-lg space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF8748]">
                Ready for {destination.name}?
              </span>
              <h3 className="text-2xl font-black text-[#142B4A] mt-1">
                Plan Your Journey
              </h3>
              <p className="text-xs text-[#6B7A90] mt-1.5 leading-relaxed">
                Let GhumLo's Gemini AI create a day-by-day customized itinerary with budgeting in ₹ INR.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#EAF4FF] border border-[#2878D0]/20 space-y-2 text-xs text-[#142B4A]">
              <div className="flex justify-between">
                <span className="text-[#6B7A90]">Recommended duration:</span>
                <span className="font-bold">{destination.recommendedDuration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7A90]">Indicative budget:</span>
                <span className="font-bold text-[#2878D0]">~{formatINR(destination.estimatedDailyBudget)} / day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7A90]">Best weather:</span>
                <span className="font-bold">{destination.bestTimeToVisit}</span>
              </div>
            </div>

            <button
              onClick={handlePlanTrip}
              className="w-full py-3.5 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white font-bold text-sm shadow-md shadow-[#FF8748]/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan a Trip Here</span>
            </button>

            {/* AI Assistant shortcut */}
            <Link
              to={`/assistant?q=${encodeURIComponent(`Plan a 4-day trip to ${destination.name} under ₹${destination.estimatedDailyBudget * 4}`)}`}
              className="w-full py-3 rounded-xl bg-white border border-[#2878D0] text-[#2878D0] hover:bg-[#EAF4FF] font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Buddy for Hacks</span>
            </Link>

            {/* External Google Maps shortcut */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${destination.name}, ${destination.country}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-center text-xs text-[#6B7A90] hover:text-[#142B4A] flex items-center justify-center gap-1 transition-colors"
            >
              <span>View {destination.name} on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="text-[11px] text-[#6B7A90] border-t border-[#E3EAF2] pt-4">
              <span className="font-semibold text-[#142B4A]">Transparency Note:</span> Daily budget estimates are indicative guides for independent travellers, not guaranteed commercial quotes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
