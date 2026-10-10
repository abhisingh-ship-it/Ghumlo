import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Calendar, Clock, IndianRupee, ArrowRight, MapPin } from 'lucide-react';
import { Destination } from '../../types';
import { formatINR } from '../../utils/formatters';
import { storageService } from '../../services/storage';

interface DestinationCardProps {
  destination: Destination;
  viewMode?: 'grid' | 'list';
  onFavoriteToggle?: (isFav: boolean) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  viewMode = 'grid',
  onFavoriteToggle,
}) => {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(() => storageService.isFavorite(destination.id));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = storageService.toggleFavorite(destination.id);
    setIsFav(newStatus);
    if (onFavoriteToggle) onFavoriteToggle(newStatus);
  };

  const handlePlanClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/plan?destination=${encodeURIComponent(destination.name)}&destinationId=${destination.id}`);
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl border border-[#E3EAF2] hover:border-[#2878D0]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col md:flex-row">
        <div className="relative md:w-72 h-52 md:h-auto shrink-0 overflow-hidden">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-transform active:scale-90 ${
              isFav
                ? 'bg-rose-50 text-rose-500 shadow-md'
                : 'bg-white/80 backdrop-blur-md text-[#172B4D] hover:bg-white'
            }`}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            aria-label="Toggle favorite"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-xs text-[#2878D0] font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{destination.region}, {destination.country}</span>
              </div>
              <span className="text-xs text-[#6B7A90]">
                {destination.recommendedDuration}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#142B4A] group-hover:text-[#2878D0] transition-colors">
              <Link to={`/destination/${destination.id}`}>
                {destination.name}
              </Link>
            </h3>

            <p className="mt-2 text-sm text-[#6B7A90] line-clamp-2 leading-relaxed">
              {destination.description}
            </p>

            {/* Quiet metadata */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#6B7A90]">
              <span className="font-medium text-[#172B4D]">Best: {destination.bestTimeToVisit}</span>
              <span aria-hidden="true">·</span>
              <span>{destination.categories.slice(0, 3).join(', ')}</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#E3EAF2] flex items-center justify-between gap-4">
            <div>
              <span className="block text-[11px] text-[#6B7A90]">Indicative budget</span>
              <span className="text-base font-bold text-[#142B4A]">
                ~{formatINR(destination.estimatedDailyBudget)} <span className="text-xs font-normal text-[#6B7A90]">/ day</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/destination/${destination.id}`}
                className="px-3.5 py-2 rounded-xl border border-[#E3EAF2] hover:bg-[#F7F9FC] text-xs font-semibold text-[#172B4D] transition-colors"
              >
                View Details
              </Link>
              <button
                onClick={handlePlanClick}
                className="px-4 py-2 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white text-xs font-semibold shadow-xs hover:shadow-sm transition-all"
              >
                Plan Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="group bg-white rounded-2xl border border-[#E3EAF2] hover:border-[#2878D0]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      {/* Image container */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-transform active:scale-90 ${
            isFav
              ? 'bg-rose-50 text-rose-500 shadow-md'
              : 'bg-white/85 backdrop-blur-md text-[#172B4D] hover:bg-white'
          }`}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
          aria-label="Toggle favorite"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Region & Tag on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-200">
            <MapPin className="w-3 h-3 text-[#FF8748]" />
            <span>{destination.region}, {destination.country}</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white mt-0.5 drop-shadow-sm">
            {destination.name}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-[#6B7A90] line-clamp-2 leading-relaxed">
            {destination.description}
          </p>

          <div className="mt-3 flex items-center justify-between text-xs text-[#6B7A90] py-2 border-y border-[#E3EAF2]">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#2878D0]" />
              <span>{destination.recommendedDuration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#36B7A0]" />
              <span className="truncate max-w-[120px]">{destination.bestTimeToVisit}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-1 flex items-center justify-between">
          <div>
            <span className="block text-[10px] text-[#6B7A90] uppercase tracking-wider">Est. Budget</span>
            <span className="text-sm font-bold text-[#142B4A]">
              ~{formatINR(destination.estimatedDailyBudget)}
              <span className="text-[10px] font-normal text-[#6B7A90]"> /day</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/destination/${destination.id}`}
              className="p-2 rounded-xl text-[#2878D0] hover:bg-[#EAF4FF] transition-colors"
              title="View destination guide"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handlePlanClick}
              className="px-3.5 py-1.5 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white text-xs font-semibold shadow-xs hover:shadow-sm transition-all"
            >
              Plan Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
