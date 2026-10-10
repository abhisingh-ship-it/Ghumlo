import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storage';
import { INITIAL_DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';
import { DestinationCard } from '../components/destinations/DestinationCard';
import { Heart, Compass, ArrowRight, Sparkles } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const [favoriteDestinations, setFavoriteDestinations] = useState<Destination[]>([]);

  const loadFavorites = () => {
    const favIds = storageService.getFavorites();
    const matched = INITIAL_DESTINATIONS.filter((d) => favIds.includes(d.id));
    setFavoriteDestinations(matched);
  };

  useEffect(() => {
    loadFavorites();
    const handleSync = () => loadFavorites();
    window.addEventListener('ghumlo_favorites_changed', handleSync);
    return () => window.removeEventListener('ghumlo_favorites_changed', handleSync);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF8748]">
            Wishlist & Bucket List
          </span>
          <h1 className="text-3xl font-extrabold text-[#142B4A] mt-1">Saved Favorites</h1>
          <p className="text-sm text-[#6B7A90] mt-1">
            Destinations you've bookmarked for your next Indian or international adventure.
          </p>
        </div>

        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E3EAF2] text-[#142B4A] hover:bg-[#F7F9FC] text-xs font-bold transition-colors self-start sm:self-auto"
        >
          <span>Explore More Places</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {favoriteDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              viewMode="grid"
              onFavoriteToggle={() => loadFavorites()}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E3EAF2] p-12 text-center max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#142B4A]">Your Bucket List is Empty</h3>
          <p className="text-sm text-[#6B7A90] mt-2 leading-relaxed">
            Click the heart icon on any destination card to save places you'd love to visit.
          </p>
          <Link
            to="/explore"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white text-xs font-bold shadow-sm transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Destinations</span>
          </Link>
        </div>
      )}
    </div>
  );
};
