import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { storageService } from '../services/storage';
import { Trip, TripStatus } from '../types';
import { formatINR, formatDateRange, getStatusLabel } from '../utils/formatters';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  ArrowLeft,
  Edit3,
  Wallet,
  Sparkles,
  Luggage,
  CheckCircle2,
  Trash2,
  Share2,
  Copy,
  Plus,
  Compass,
} from 'lucide-react';

export const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const loadTrip = () => {
    if (id) {
      const found = storageService.getTrip(id);
      if (found) {
        setTrip(found);
      }
    }
  };

  useEffect(() => {
    loadTrip();
  }, [id]);

  if (!trip) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-[#142B4A]">Trip Not Found</h2>
        <p className="text-xs text-[#6B7A90] mt-1">The trip may have been removed or deleted.</p>
        <Link
          to="/my-trips"
          className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2878D0] text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Trips</span>
        </Link>
      </div>
    );
  }

  const totalSpent = (trip.expenses || []).reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const remainingBudget = (trip.budget?.total || 0) - totalSpent;
  const totalActivities = (trip.itinerary || []).reduce(
    (acc, day) => acc + (day.activities?.length || 0),
    0
  );

  const handleStatusChange = (newStatus: TripStatus) => {
    const updated = { ...trip, status: newStatus };
    storageService.saveTrip(updated);
    setTrip(updated);
    setToastMessage(`Trip status updated to "${getStatusLabel(newStatus)}"`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B4A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-slideUp">
          <Sparkles className="w-4 h-4 text-[#FF8748]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          to="/my-trips"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7A90] hover:text-[#2878D0] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Trips</span>
        </Link>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-[#6B7A90]">Status:</span>
          <select
            value={trip.status}
            onChange={(e) => handleStatusChange(e.target.value as TripStatus)}
            className="px-3 py-1.5 rounded-xl border border-[#E3EAF2] text-xs font-bold text-[#142B4A] bg-white shadow-xs focus:outline-none focus:border-[#2878D0]"
          >
            <option value="planning">In Planning</option>
            <option value="upcoming">Upcoming Trip</option>
            <option value="ongoing">Ongoing Adventure</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Hero Trip Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-md">
        <div className="relative h-64 sm:h-80 w-full">
          <img
            src={trip.destinationImage}
            alt={trip.destinationName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#FF8748] font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>{trip.destinationName} · From {trip.departureCity}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">
                {trip.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-200">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#2878D0]" />
                  <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#36B7A0]" />
                  <span>{trip.travellers} Travellers</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>{trip.travelStyle}</span>
              </div>
            </div>

            {/* Hub Action Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={`/trip/${trip.id}/itinerary`}
                className="px-4 py-2.5 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Edit3 className="w-4 h-4" />
                <span>Itinerary Timeline</span>
              </Link>
              <Link
                to={`/trip/${trip.id}/budget`}
                className="px-4 py-2.5 rounded-xl bg-white text-[#142B4A] hover:bg-slate-50 text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Wallet className="w-4 h-4 text-[#36B7A0]" />
                <span>Budget & Expenses</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E3EAF2]">
          <span className="block text-[11px] text-[#6B7A90] font-semibold uppercase">Total Budget</span>
          <span className="text-xl font-black text-[#142B4A] mt-0.5 block">
            {formatINR(trip.budget?.total || 0)}
          </span>
          <span className="text-[11px] text-[#6B7A90] mt-1 block">Planned in INR</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3EAF2]">
          <span className="block text-[11px] text-[#6B7A90] font-semibold uppercase">Actual Spent</span>
          <span className="text-xl font-black text-[#36B7A0] mt-0.5 block">
            {formatINR(totalSpent)}
          </span>
          <span className="text-[11px] text-[#6B7A90] mt-1 block">{trip.expenses?.length || 0} expenses logged</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3EAF2]">
          <span className="block text-[11px] text-[#6B7A90] font-semibold uppercase">Remaining Balance</span>
          <span
            className={`text-xl font-black mt-0.5 block ${
              remainingBudget < 0 ? 'text-[#D64545]' : 'text-[#2878D0]'
            }`}
          >
            {formatINR(remainingBudget)}
          </span>
          <span className="text-[11px] text-[#6B7A90] mt-1 block">
            {remainingBudget < 0 ? 'Budget exceeded' : 'Available to spend'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3EAF2]">
          <span className="block text-[11px] text-[#6B7A90] font-semibold uppercase">Itinerary Stops</span>
          <span className="text-xl font-black text-[#FF8748] mt-0.5 block">
            {totalActivities}
          </span>
          <span className="text-[11px] text-[#6B7A90] mt-1 block">Across {trip.itinerary?.length || 0} days</span>
        </div>
      </div>

      {/* Quick Itinerary Preview & Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Days Snapshot */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#142B4A]">Day-by-Day Overview</h2>
            <Link
              to={`/trip/${trip.id}/itinerary`}
              className="text-xs font-bold text-[#2878D0] hover:underline flex items-center gap-1"
            >
              <span>Full Interactive Editor</span>
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {trip.itinerary?.map((day) => (
              <div
                key={day.id}
                className="p-5 rounded-2xl bg-white border border-[#E3EAF2] space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#E3EAF2]">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#EAF4FF] text-[#2878D0] font-bold text-xs">
                      Day {day.dayNumber}
                    </span>
                    <h3 className="font-bold text-sm text-[#142B4A]">{day.title}</h3>
                  </div>
                  <span className="text-xs text-[#6B7A90]">{day.date}</span>
                </div>

                <div className="space-y-2">
                  {day.activities?.map((act) => (
                    <div
                      key={act.id}
                      className="flex items-start justify-between gap-3 text-xs p-2 rounded-lg bg-[#F7F9FC]"
                    >
                      <div>
                        <span className="font-bold text-[#142B4A]">{act.title}</span>
                        <p className="text-[#6B7A90] mt-0.5">{act.description}</p>
                      </div>
                      <span className="font-semibold text-[#2878D0] shrink-0">
                        {act.estimatedCost === 0 ? 'Free' : formatINR(act.estimatedCost)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: AI Assistant & Trip Notes */}
        <div className="space-y-6">
          {/* Ask AI Travel Buddy regarding this specific trip */}
          <div className="bg-[#142B4A] text-white p-6 rounded-3xl space-y-4 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF8748] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>GhumLo Travel Buddy</span>
            </div>
            <h3 className="text-lg font-bold">Have Questions About This Trip?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ask about rainy day options, local food recs in {trip.destinationName}, or packing tips.
            </p>
            <Link
              to={`/assistant?q=${encodeURIComponent(`Give me top tips and off-beat spots for my trip to ${trip.destinationName}`)}`}
              className="w-full py-2.5 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white font-bold text-xs text-center block transition-all"
            >
              Ask AI Buddy
            </Link>
          </div>

          {/* Budget Quick Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3EAF2] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#142B4A]">Budget Allocations</h3>
              <Link to={`/trip/${trip.id}/budget`} className="text-xs text-[#2878D0] font-bold hover:underline">
                Manage
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {Object.entries(trip.budget?.categories || {}).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1 border-b border-[#E3EAF2]/60 capitalize">
                  <span className="text-[#6B7A90]">{key}</span>
                  <span className="font-bold text-[#142B4A]">{formatINR(val as number)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
