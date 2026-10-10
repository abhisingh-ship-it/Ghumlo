import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storage';
import { Trip, TripStatus } from '../types';
import { formatINR, formatDateRange, getStatusLabel } from '../utils/formatters';
import {
  Luggage,
  Plus,
  Calendar,
  Users,
  Search,
  Trash2,
  Copy,
  Edit3,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  TrendingUp,
  AlertCircle,
  MoreVertical,
  CheckCircle2,
} from 'lucide-react';

export const MyTripsPage: React.FC = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | TripStatus>('all');
  const [sortBy, setSortBy] = useState<'date-asc' | 'date-desc' | 'budget-desc'>('date-asc');
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null);
  const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null);

  const loadTrips = () => {
    const list = storageService.getTrips();
    setTrips(list);
  };

  useEffect(() => {
    loadTrips();
  }, []);

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = trips.length;
    const upcoming = trips.filter((t) => t.status === 'upcoming').length;
    const completed = trips.filter((t) => t.status === 'completed').length;
    const totalBudget = trips.reduce((sum, t) => sum + (t.budget?.total || 0), 0);

    return { total, upcoming, completed, totalBudget };
  }, [trips]);

  // Filter & Sort
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = trip.name.toLowerCase().includes(q);
        const matchesDest = trip.destinationName.toLowerCase().includes(q);
        if (!matchesName && !matchesDest) return false;
      }
      if (statusFilter !== 'all' && trip.status !== statusFilter) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      }
      if (sortBy === 'date-desc') {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
      if (sortBy === 'budget-desc') {
        return (b.budget?.total || 0) - (a.budget?.total || 0);
      }
      return 0;
    });
  }, [trips, searchQuery, statusFilter, sortBy]);

  const handleDeleteTrip = () => {
    if (tripToDelete) {
      storageService.deleteTrip(tripToDelete.id);
      setTripToDelete(null);
      loadTrips();
    }
  };

  const handleDuplicateTrip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActionMenuOpenId(null);
    const duplicated = storageService.duplicateTrip(id);
    if (duplicated) {
      loadTrips();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2878D0]">
            Travel Dashboard
          </span>
          <h1 className="text-3xl font-extrabold text-[#142B4A] mt-1">My Saved Trips</h1>
          <p className="text-sm text-[#6B7A90] mt-1">
            Manage your itineraries, edit activities, and track travel expenses in INR.
          </p>
        </div>

        <Link
          to="/plan"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white text-sm font-bold shadow-md shadow-[#FF8748]/25 transition-all hover:scale-105 active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Plan a New Trip</span>
        </Link>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E3EAF2] p-5">
          <span className="text-xs font-semibold text-[#6B7A90] block">Total Trips</span>
          <span className="text-2xl font-black text-[#142B4A] mt-1 block">{metrics.total}</span>
          <span className="text-[11px] text-[#2878D0] font-medium mt-1 block">Saved in browser</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E3EAF2] p-5">
          <span className="text-xs font-semibold text-[#6B7A90] block">Upcoming Trips</span>
          <span className="text-2xl font-black text-[#36B7A0] mt-1 block">{metrics.upcoming}</span>
          <span className="text-[11px] text-[#6B7A90] font-medium mt-1 block">Ready to explore</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E3EAF2] p-5">
          <span className="text-xs font-semibold text-[#6B7A90] block">Completed Trips</span>
          <span className="text-2xl font-black text-[#6B7A90] mt-1 block">{metrics.completed}</span>
          <span className="text-[11px] text-[#6B7A90] font-medium mt-1 block">Memories made</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E3EAF2] p-5">
          <span className="text-xs font-semibold text-[#6B7A90] block">Total Planned Budget</span>
          <span className="text-2xl font-black text-[#2878D0] mt-1 block">
            {formatINR(metrics.totalBudget)}
          </span>
          <span className="text-[11px] text-[#6B7A90] font-medium mt-1 block">INR combined</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl border border-[#E3EAF2] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#6B7A90] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trips by name or destination..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E3EAF2] text-xs text-[#142B4A] placeholder-slate-400 focus:outline-none focus:border-[#2878D0] bg-[#F7F9FC]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Status Filter */}
          <div className="flex items-center gap-1 text-xs">
            {(['all', 'planning', 'upcoming', 'ongoing', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-all ${
                  statusFilter === status
                    ? 'bg-[#EAF4FF] text-[#2878D0]'
                    : 'text-[#6B7A90] hover:text-[#142B4A]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg border border-[#E3EAF2] text-xs font-semibold text-[#142B4A] bg-[#F7F9FC]"
          >
            <option value="date-asc">Date: Soonest First</option>
            <option value="date-desc">Date: Latest First</option>
            <option value="budget-desc">Budget: Highest</option>
          </select>
        </div>
      </div>

      {/* Trips Grid */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => {
            const isMenuOpen = actionMenuOpenId === trip.id;
            return (
              <div
                key={trip.id}
                className="group bg-white rounded-3xl border border-[#E3EAF2] hover:border-[#2878D0]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                {/* Header Image with Status */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={trip.destinationImage}
                    alt={trip.destinationName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Status Tag */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs ${
                        trip.status === 'upcoming'
                          ? 'bg-[#2878D0]/90 text-white'
                          : trip.status === 'ongoing'
                          ? 'bg-[#36B7A0]/90 text-white'
                          : trip.status === 'completed'
                          ? 'bg-slate-700/90 text-white'
                          : 'bg-amber-500/90 text-white'
                      }`}
                    >
                      {getStatusLabel(trip.status)}
                    </span>
                  </div>

                  {/* Action Dropdown Toggle */}
                  <div className="absolute top-3 right-3 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActionMenuOpenId(isMenuOpen ? null : trip.id);
                      }}
                      className="p-1.5 rounded-full bg-white/80 hover:bg-white text-[#142B4A] shadow-md transition-transform active:scale-95"
                      aria-label="Trip actions"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 top-8 z-30 w-44 bg-white rounded-xl shadow-xl border border-[#E3EAF2] py-1.5 text-xs font-semibold animate-fadeIn">
                        <button
                          onClick={(e) => handleDuplicateTrip(trip.id, e)}
                          className="w-full px-3 py-2 text-left text-[#142B4A] hover:bg-[#F7F9FC] flex items-center gap-2"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#2878D0]" />
                          <span>Duplicate Trip</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActionMenuOpenId(null);
                            navigate(`/trip/${trip.id}/itinerary`);
                          }}
                          className="w-full px-3 py-2 text-left text-[#142B4A] hover:bg-[#F7F9FC] flex items-center gap-2"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#36B7A0]" />
                          <span>Edit Itinerary</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActionMenuOpenId(null);
                            setTripToDelete(trip);
                          }}
                          className="w-full px-3 py-2 text-left text-[#D64545] hover:bg-rose-50 flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Trip</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Trip Title & Destination */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-semibold text-slate-200 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FF8748]" />
                      <span>{trip.destinationName}</span>
                    </span>
                    <h3 className="text-lg font-bold text-white drop-shadow-sm truncate mt-0.5">
                      {trip.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5 text-xs text-[#6B7A90]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#2878D0]" />
                        <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#36B7A0]" />
                        <span>{trip.travellers} {trip.travellers === 1 ? 'Person' : 'People'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E3EAF2]">
                      <div>
                        <span className="text-[10px] uppercase text-[#6B7A90] block font-medium">Planned Budget</span>
                        <span className="text-sm font-bold text-[#142B4A]">
                          {formatINR(trip.budget?.total || 0)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase text-[#6B7A90] block font-medium">Activities</span>
                        <span className="text-sm font-bold text-[#2878D0]">
                          {trip.itinerary?.reduce((acc, d) => acc + (d.activities?.length || 0), 0) || 0} stops
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action shortcuts */}
                  <div className="pt-2 flex items-center gap-2">
                    <Link
                      to={`/trip/${trip.id}`}
                      className="flex-1 py-2.5 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white text-xs font-bold text-center transition-colors"
                    >
                      Trip Hub
                    </Link>
                    <Link
                      to={`/trip/${trip.id}/itinerary`}
                      className="px-3.5 py-2.5 rounded-xl border border-[#E3EAF2] hover:bg-[#F7F9FC] text-xs font-bold text-[#142B4A] transition-colors"
                      title="Edit Itinerary Timeline"
                    >
                      Itinerary
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-[#E3EAF2] p-12 text-center max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-[#EAF4FF] text-[#2878D0] flex items-center justify-center mx-auto mb-4">
            <Luggage className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#142B4A]">No Saved Trips Found</h3>
          <p className="text-sm text-[#6B7A90] mt-2 leading-relaxed">
            {searchQuery
              ? 'No trips matched your search filter.'
              : 'You have not created any trips yet. Discover a destination and build your first personalized itinerary!'}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-xl border border-[#E3EAF2] text-xs font-semibold text-[#142B4A]"
              >
                Clear Search
              </button>
            )}
            <Link
              to="/plan"
              className="px-5 py-2.5 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white text-xs font-bold shadow-md shadow-[#FF8748]/25 transition-all"
            >
              Plan Your First Trip
            </Link>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {tripToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-[#E3EAF2] space-y-4">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#142B4A]">Delete Trip?</h3>
              <p className="text-xs text-[#6B7A90] mt-1 leading-relaxed">
                Are you sure you want to delete <strong className="text-[#142B4A]">"{tripToDelete.name}"</strong>? This will permanently remove its itinerary and recorded expenses.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setTripToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-semibold text-[#142B4A] hover:bg-[#F7F9FC]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTrip}
                className="flex-1 py-2.5 rounded-xl bg-[#D64545] hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
