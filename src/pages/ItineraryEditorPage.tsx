import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storageService } from '../services/storage';
import { Trip, ItineraryDay, Activity, ActivityCategory, ActivityTimeOfDay } from '../types';
import { formatINR, formatDate } from '../utils/formatters';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit2,
  ChevronUp,
  ChevronDown,
  ArrowRightLeft,
  Sparkles,
  Save,
  Check,
  X,
  MapPin,
  Utensils,
  Car,
  Compass,
  AlertCircle,
} from 'lucide-react';

export const ItineraryEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Activity Edit / Add Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingDayIndex, setEditingDayIndex] = useState<number>(0);
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeOfDay, setTimeOfDay] = useState<ActivityTimeOfDay>('morning');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('11:30 AM');
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [category, setCategory] = useState<ActivityCategory>('sightseeing');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

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
        <Link
          to="/my-trips"
          className="mt-4 inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#2878D0] text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Trips</span>
        </Link>
      </div>
    );
  }

  const days = trip.itinerary || [];
  const currentDay = days[selectedDayIndex] || days[0];

  // Daily and total cost calculations
  const calculateDayCost = (day: ItineraryDay) => {
    return (day.activities || []).reduce((sum, a) => sum + (a.estimatedCost || 0), 0);
  };

  const totalItineraryCost = days.reduce((sum, d) => sum + calculateDayCost(d), 0);

  const saveUpdatedTrip = (updatedTrip: Trip, message: string = 'Changes saved') => {
    storageService.saveTrip(updatedTrip);
    setTrip(updatedTrip);
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Open modal for adding activity
  const handleOpenAddModal = (dayIndex: number) => {
    setModalMode('add');
    setEditingDayIndex(dayIndex);
    setEditingActivityId(null);
    setTitle('');
    setDescription('');
    setTimeOfDay('morning');
    setStartTime('10:00 AM');
    setEndTime('12:00 PM');
    setEstimatedCost(0);
    setCategory('sightseeing');
    setLocation(trip.destinationName);
    setNotes('');
    setIsModalOpen(true);
  };

  // Open modal for editing activity
  const handleOpenEditModal = (dayIndex: number, act: Activity) => {
    setModalMode('edit');
    setEditingDayIndex(dayIndex);
    setEditingActivityId(act.id);
    setTitle(act.title);
    setDescription(act.description);
    setTimeOfDay(act.timeOfDay || 'morning');
    setStartTime(act.startTime);
    setEndTime(act.endTime);
    setEstimatedCost(act.estimatedCost || 0);
    setCategory(act.category || 'sightseeing');
    setLocation(act.location || '');
    setNotes(act.notes || '');
    setIsModalOpen(true);
  };

  // Submit Modal Form
  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newActivity: Activity = {
      id: editingActivityId || `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: title.trim(),
      description: description.trim(),
      timeOfDay,
      startTime,
      endTime,
      estimatedCost: Number(estimatedCost) || 0,
      category,
      location: location.trim() || trip.destinationName,
      notes: notes.trim(),
    };

    const newDays = [...days];
    const targetDay = newDays[editingDayIndex];

    if (modalMode === 'add') {
      targetDay.activities = [...(targetDay.activities || []), newActivity];
    } else {
      targetDay.activities = (targetDay.activities || []).map((a) =>
        a.id === editingActivityId ? newActivity : a
      );
    }

    const updatedTrip: Trip = { ...trip, itinerary: newDays };
    saveUpdatedTrip(updatedTrip, modalMode === 'add' ? 'Activity added!' : 'Activity updated!');
    setIsModalOpen(false);
  };

  // Delete Activity
  const handleDeleteActivity = (dayIndex: number, activityId: string) => {
    const newDays = [...days];
    newDays[dayIndex].activities = newDays[dayIndex].activities.filter((a) => a.id !== activityId);
    const updatedTrip: Trip = { ...trip, itinerary: newDays };
    saveUpdatedTrip(updatedTrip, 'Activity removed');
  };

  // Reorder Activities (Move Up/Down)
  const handleMoveActivity = (dayIndex: number, actIndex: number, direction: 'up' | 'down') => {
    const newDays = [...days];
    const activities = [...newDays[dayIndex].activities];
    const targetIndex = direction === 'up' ? actIndex - 1 : actIndex + 1;

    if (targetIndex < 0 || targetIndex >= activities.length) return;

    const temp = activities[actIndex];
    activities[actIndex] = activities[targetIndex];
    activities[targetIndex] = temp;

    newDays[dayIndex].activities = activities;
    saveUpdatedTrip({ ...trip, itinerary: newDays }, 'Activity order updated');
  };

  // Move activity to a different day
  const handleMoveToDay = (currentDayIdx: number, actId: string, targetDayIdx: number) => {
    if (currentDayIdx === targetDayIdx) return;
    const newDays = [...days];
    const activityToMove = newDays[currentDayIdx].activities.find((a) => a.id === actId);
    if (!activityToMove) return;

    newDays[currentDayIdx].activities = newDays[currentDayIdx].activities.filter((a) => a.id !== actId);
    newDays[targetDayIdx].activities.push(activityToMove);

    saveUpdatedTrip(
      { ...trip, itinerary: newDays },
      `Activity moved to Day ${targetDayIdx + 1}`
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B4A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-slideUp">
          <Sparkles className="w-4 h-4 text-[#FF8748]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to={`/trip/${trip.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7A90] hover:text-[#2878D0] mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {trip.name} Hub</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A]">
            Interactive Itinerary Editor
          </h1>
          <p className="text-xs text-[#6B7A90] mt-0.5">
            Drag, edit, reorder activities, adjust timings, and estimate activity expenses in INR.
          </p>
        </div>

        {/* Cost Summary Header */}
        <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#E3EAF2] shadow-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#6B7A90] block">Itinerary Total</span>
            <span className="text-base font-black text-[#2878D0] block">
              {formatINR(totalItineraryCost)}
            </span>
          </div>
          <div className="h-8 w-px bg-[#E3EAF2]" />
          <div>
            <span className="text-[10px] uppercase font-bold text-[#6B7A90] block">Planned Budget</span>
            <span className="text-base font-black text-[#142B4A] block">
              {formatINR(trip.budget?.total || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Days Tabs Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          const dayCost = calculateDayCost(day);

          return (
            <button
              key={day.id}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-4 py-3 rounded-2xl border transition-all text-left shrink-0 min-w-[140px] ${
                isSelected
                  ? 'border-[#2878D0] bg-[#EAF4FF] shadow-xs'
                  : 'border-[#E3EAF2] bg-white hover:bg-[#F7F9FC]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${isSelected ? 'text-[#2878D0]' : 'text-[#142B4A]'}`}>
                  Day {day.dayNumber}
                </span>
                <span className="text-[10px] text-[#6B7A90] font-mono">
                  {day.activities?.length || 0} stops
                </span>
              </div>
              <span className="text-[11px] text-[#6B7A90] block mt-0.5 truncate max-w-[130px]">
                {formatDate(day.date)}
              </span>
              <span className="text-[11px] font-semibold text-[#142B4A] block mt-1">
                {dayCost === 0 ? 'Free' : formatINR(dayCost)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Timeline View */}
      {currentDay ? (
        <div className="bg-white rounded-3xl border border-[#E3EAF2] p-6 sm:p-8 space-y-6">
          {/* Day Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3EAF2] gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#2878D0] text-white text-xs font-bold">
                  Day {currentDay.dayNumber}
                </span>
                <span className="text-xs text-[#6B7A90] font-medium">{formatDate(currentDay.date)}</span>
              </div>
              <h2 className="text-lg font-bold text-[#142B4A] mt-1">{currentDay.title}</h2>
            </div>

            <button
              onClick={() => handleOpenAddModal(selectedDayIndex)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white text-xs font-bold shadow-xs transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Activity</span>
            </button>
          </div>

          {/* Activities Timeline */}
          {currentDay.activities && currentDay.activities.length > 0 ? (
            <div className="space-y-4">
              {currentDay.activities.map((act, actIdx) => (
                <div
                  key={act.id}
                  className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E3EAF2] hover:border-[#2878D0]/40 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  {/* Left: Timing & Details */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#EAF4FF] text-[#2878D0]">
                        {act.startTime} – {act.endTime}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-700 capitalize">
                        {act.category}
                      </span>
                      {act.location && (
                        <span className="text-xs text-[#6B7A90] flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#FF8748]" />
                          <span>{act.location}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-[#142B4A]">{act.title}</h3>
                    <p className="text-xs sm:text-sm text-[#6B7A90] leading-relaxed">
                      {act.description}
                    </p>

                    {act.notes && (
                      <p className="text-xs text-[#36B7A0] font-medium flex items-center gap-1 pt-1">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>{act.notes}</span>
                      </p>
                    )}
                  </div>

                  {/* Right: Cost & Controls */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E3EAF2]">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase text-[#6B7A90] block">Estimated Cost</span>
                      <span className="text-sm font-bold text-[#142B4A]">
                        {act.estimatedCost === 0 ? (
                          <span className="text-[#36B7A0]">Free Entry</span>
                        ) : (
                          formatINR(act.estimatedCost)
                        )}
                      </span>
                    </div>

                    {/* Action icons */}
                    <div className="flex items-center gap-1">
                      {/* Move Up */}
                      <button
                        disabled={actIdx === 0}
                        onClick={() => handleMoveActivity(selectedDayIndex, actIdx, 'up')}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#142B4A] hover:bg-white disabled:opacity-30"
                        title="Move up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>

                      {/* Move Down */}
                      <button
                        disabled={actIdx === currentDay.activities.length - 1}
                        onClick={() => handleMoveActivity(selectedDayIndex, actIdx, 'down')}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#142B4A] hover:bg-white disabled:opacity-30"
                        title="Move down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => handleOpenEditModal(selectedDayIndex, act)}
                        className="p-1.5 rounded-lg text-[#2878D0] hover:bg-white"
                        title="Edit activity"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteActivity(selectedDayIndex, act.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                        title="Delete activity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Move to another day selector */}
                    {days.length > 1 && (
                      <div className="flex items-center gap-1 text-[11px] text-[#6B7A90]">
                        <ArrowRightLeft className="w-3 h-3 text-[#6B7A90]" />
                        <select
                          value={selectedDayIndex}
                          onChange={(e) =>
                            handleMoveToDay(selectedDayIndex, act.id, parseInt(e.target.value))
                          }
                          className="bg-transparent border-0 text-[11px] font-semibold text-[#2878D0] focus:ring-0 cursor-pointer"
                        >
                          {days.map((d, dIdx) => (
                            <option key={d.id} value={dIdx}>
                              Move to Day {d.dayNumber}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center border-2 border-dashed border-[#E3EAF2] rounded-2xl">
              <Compass className="w-8 h-8 text-[#6B7A90] mx-auto mb-2 opacity-50" />
              <h4 className="text-sm font-bold text-[#142B4A]">No activities scheduled for this day</h4>
              <p className="text-xs text-[#6B7A90] mt-1">Add a sight, meal, or relaxation stop.</p>
              <button
                onClick={() => handleOpenAddModal(selectedDayIndex)}
                className="mt-4 px-4 py-2 rounded-xl bg-[#2878D0] text-white text-xs font-bold"
              >
                Add First Activity
              </button>
            </div>
          )}
        </div>
      ) : null}

      {/* Add / Edit Activity Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-[#E3EAF2] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3EAF2]">
              <h3 className="text-lg font-bold text-[#142B4A]">
                {modalMode === 'add' ? `Add Activity to Day ${editingDayIndex + 1}` : 'Edit Activity'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveActivity} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-[#142B4A] mb-1">Activity Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sunrise Yoga at Tapovan, Seafood Feast at Curlies..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E3EAF2] text-xs font-semibold text-[#142B4A] bg-[#F7F9FC]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142B4A] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What will you see, do, or taste here?"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E3EAF2] text-xs text-[#142B4A] bg-[#F7F9FC]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Time of Day</label>
                  <select
                    value={timeOfDay}
                    onChange={(e) => setTimeOfDay(e.target.value as ActivityTimeOfDay)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EAF2] text-xs bg-[#F7F9FC]"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ActivityCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EAF2] text-xs bg-[#F7F9FC]"
                  >
                    <option value="sightseeing">Sightseeing</option>
                    <option value="food">Food & Dining</option>
                    <option value="adventure">Adventure</option>
                    <option value="relaxation">Relaxation</option>
                    <option value="travel">Travel / Transit</option>
                    <option value="culture">Culture / Heritage</option>
                    <option value="shopping">Shopping</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Start Time</label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="e.g. 09:30 AM"
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EAF2] text-xs bg-[#F7F9FC]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">End Time</label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="e.g. 12:00 PM"
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EAF2] text-xs bg-[#F7F9FC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">
                    Est. Cost (INR, 0 if free)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={estimatedCost}
                    onChange={(e) => setEstimatedCost(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EAF2] text-xs bg-[#F7F9FC]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Location / Venue</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Candolim, Old Manali..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EAF2] text-xs bg-[#F7F9FC]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142B4A] mb-1">Insider Note / Tip</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Carry camera; try the Kokum soda."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E3EAF2] text-xs bg-[#F7F9FC]"
                />
              </div>

              <div className="pt-4 border-t border-[#E3EAF2] flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-semibold text-[#142B4A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white text-xs font-bold shadow-sm"
                >
                  {modalMode === 'add' ? 'Add Activity' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
