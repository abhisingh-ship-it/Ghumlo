import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DestinationCard } from '../components/destinations/DestinationCard';
import { INITIAL_DESTINATIONS } from '../data/destinations';
import { DestinationCategory, TravelStyle } from '../types';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  RotateCcw,
  Compass,
  MapPin,
  Check,
  ChevronDown,
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedScope, setSelectedScope] = useState<'all' | 'domestic' | 'international'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedTravelStyle, setSelectedTravelStyle] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<'budget-asc' | 'budget-desc' | 'name-asc'>('budget-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category from URL if query changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const allCategories: DestinationCategory[] = [
    'Mountains',
    'Beaches',
    'Historical Places',
    'Religious and Spiritual Places',
    'Cities',
    'Nature',
    'Adventure',
    'Wildlife',
    'Food and Culture',
    'Weekend Getaways',
  ];

  const allTravelStyles: TravelStyle[] = [
    'Adventure',
    'Relaxation',
    'Family',
    'Romantic',
    'Cultural',
    'Backpacking',
    'Luxury',
    'Weekend getaway',
  ];

  // Filtering and sorting logic
  const filteredDestinations = useMemo(() => {
    return INITIAL_DESTINATIONS.filter((dest) => {
      // Search query (matches name, region, country, description, attractions)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesRegion = dest.region.toLowerCase().includes(q);
        const matchesCountry = dest.country.toLowerCase().includes(q);
        const matchesDesc = dest.description.toLowerCase().includes(q);
        const matchesAttractions = dest.attractions.some((a) => a.name.toLowerCase().includes(q));
        if (!matchesName && !matchesRegion && !matchesCountry && !matchesDesc && !matchesAttractions) {
          return false;
        }
      }

      // Domestic vs International
      if (selectedScope === 'domestic' && dest.isInternational) return false;
      if (selectedScope === 'international' && !dest.isInternational) return false;

      // Category filter
      if (selectedCategory !== 'all') {
        const hasCategory = dest.categories.some(
          (c) => c.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (!hasCategory) return false;
      }

      // Travel Style filter
      if (selectedTravelStyle !== 'all') {
        const hasStyle = dest.travelStyles.some(
          (s) => s.toLowerCase() === selectedTravelStyle.toLowerCase()
        );
        if (!hasStyle) return false;
      }

      // Budget filter
      if (dest.estimatedDailyBudget > maxBudget) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'budget-asc') {
        return a.estimatedDailyBudget - b.estimatedDailyBudget;
      }
      if (sortBy === 'budget-desc') {
        return b.estimatedDailyBudget - a.estimatedDailyBudget;
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [
    searchQuery,
    selectedScope,
    selectedCategory,
    selectedTravelStyle,
    maxBudget,
    sortBy,
  ]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedScope('all');
    setSelectedCategory('all');
    setSelectedTravelStyle('all');
    setMaxBudget(15000);
    setSortBy('budget-asc');
    setSearchParams({});
  };

  const isFilterActive =
    searchQuery.trim() !== '' ||
    selectedScope !== 'all' ||
    selectedCategory !== 'all' ||
    selectedTravelStyle !== 'all' ||
    maxBudget < 15000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2878D0]">
              Discover India & Beyond
            </span>
            <h1 className="text-3xl font-extrabold text-[#142B4A] mt-1">
              Explore Destinations
            </h1>
            <p className="text-sm text-[#6B7A90] mt-1">
              Find breathtaking places, transparent indicative budgets in INR, and plan your journey.
            </p>
          </div>

          {/* Quick Scope Segmented Control */}
          <div className="flex items-center p-1 bg-[#E3EAF2]/60 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setSelectedScope('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedScope === 'all'
                  ? 'bg-white text-[#142B4A] shadow-xs'
                  : 'text-[#6B7A90] hover:text-[#142B4A]'
              }`}
            >
              All ({INITIAL_DESTINATIONS.length})
            </button>
            <button
              onClick={() => setSelectedScope('domestic')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedScope === 'domestic'
                  ? 'bg-white text-[#142B4A] shadow-xs'
                  : 'text-[#6B7A90] hover:text-[#142B4A]'
              }`}
            >
              India (Domestic)
            </button>
            <button
              onClick={() => setSelectedScope('international')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedScope === 'international'
                  ? 'bg-white text-[#142B4A] shadow-xs'
                  : 'text-[#6B7A90] hover:text-[#142B4A]'
              }`}
            >
              International
            </button>
          </div>
        </div>

        {/* Search Bar & View Controls Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#6B7A90] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, state, country or attraction (e.g. Goa, Gulmarg, Beach, Forts)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#E3EAF2] bg-white text-sm text-[#142B4A] placeholder-slate-400 focus:outline-none focus:border-[#2878D0] focus:ring-2 focus:ring-[#2878D0]/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#E3EAF2] bg-white text-xs font-semibold text-[#142B4A]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#2878D0]" />
              <span>Filters</span>
              {isFilterActive && (
                <span className="w-2 h-2 rounded-full bg-[#FF8748]" />
              )}
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-[#E3EAF2] bg-white text-xs font-semibold text-[#142B4A] focus:outline-none focus:border-[#2878D0]"
            >
              <option value="budget-asc">Budget: Low to High</option>
              <option value="budget-desc">Budget: High to Low</option>
              <option value="name-asc">Alphabetical: A to Z</option>
            </select>

            {/* Grid / List View Toggle */}
            <div className="flex items-center p-1 bg-white border border-[#E3EAF2] rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#EAF4FF] text-[#2878D0]'
                    : 'text-[#6B7A90] hover:text-[#142B4A]'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#EAF4FF] text-[#2878D0]'
                    : 'text-[#6B7A90] hover:text-[#142B4A]'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block bg-white rounded-2xl border border-[#E3EAF2] p-5 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3EAF2]">
            <h3 className="text-sm font-bold text-[#142B4A] flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#2878D0]" />
              <span>Filters</span>
            </h3>
            {isFilterActive && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#2878D0] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all</span>
              </button>
            )}
          </div>

          {/* Daily Budget Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#142B4A]">Daily Budget (INR)</span>
              <span className="text-xs font-bold text-[#2878D0]">
                Up to {formatINR(maxBudget)}
              </span>
            </div>
            <input
              type="range"
              min={2000}
              max={15000}
              step={500}
              value={maxBudget}
              onChange={(e) => setMaxBudget(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2878D0]"
            />
            <div className="flex justify-between text-[10px] text-[#6B7A90] mt-1 font-mono">
              <span>₹2,000</span>
              <span>₹15,000+</span>
            </div>
          </div>

          {/* Categories Filter */}
          <div>
            <label className="block text-xs font-bold text-[#142B4A] mb-2.5">
              Destination Category
            </label>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#EAF4FF] text-[#2878D0] font-semibold'
                    : 'text-[#6B7A90] hover:bg-[#F7F9FC]'
                }`}
              >
                <span>All Categories</span>
                {selectedCategory === 'all' && <Check className="w-3.5 h-3.5" />}
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#EAF4FF] text-[#2878D0] font-semibold'
                      : 'text-[#6B7A90] hover:bg-[#F7F9FC]'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Style Filter */}
          <div>
            <label className="block text-xs font-bold text-[#142B4A] mb-2.5">
              Travel Style
            </label>
            <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedTravelStyle('all')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                  selectedTravelStyle === 'all'
                    ? 'bg-[#EAF4FF] text-[#2878D0] font-semibold'
                    : 'text-[#6B7A90] hover:bg-[#F7F9FC]'
                }`}
              >
                <span>All Travel Styles</span>
                {selectedTravelStyle === 'all' && <Check className="w-3.5 h-3.5" />}
              </button>
              {allTravelStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedTravelStyle(style)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    selectedTravelStyle === style
                      ? 'bg-[#EAF4FF] text-[#2878D0] font-semibold'
                      : 'text-[#6B7A90] hover:bg-[#F7F9FC]'
                  }`}
                >
                  <span>{style}</span>
                  {selectedTravelStyle === style && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active filter summary bar */}
          <div className="flex items-center justify-between text-xs text-[#6B7A90]">
            <span>
              Showing <strong className="text-[#142B4A] font-bold">{filteredDestinations.length}</strong> {filteredDestinations.length === 1 ? 'destination' : 'destinations'}
            </span>

            {isFilterActive && (
              <button
                onClick={resetAllFilters}
                className="text-[#2878D0] hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear filters</span>
              </button>
            )}
          </div>

          {/* Grid / List Results */}
          {filteredDestinations.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredDestinations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-[#E3EAF2] p-12 text-center max-w-lg mx-auto my-8">
              <div className="w-16 h-16 rounded-2xl bg-[#EAF4FF] text-[#2878D0] flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#142B4A]">
                No destinations matched your criteria
              </h3>
              <p className="text-sm text-[#6B7A90] mt-2 leading-relaxed">
                Try widening your budget filter, clearing search keywords, or switching from international to domestic.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-6 px-5 py-2.5 rounded-xl bg-[#2878D0] text-white text-xs font-bold shadow-xs hover:bg-[#1E66B6] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E3EAF2]">
                <h3 className="font-bold text-[#142B4A] text-base">Filter Destinations</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scope */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-bold text-[#142B4A]">Location</label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => setSelectedScope('all')}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg ${
                      selectedScope === 'all' ? 'bg-[#2878D0] text-white' : 'bg-[#F7F9FC] text-[#6B7A90]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedScope('domestic')}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg ${
                      selectedScope === 'domestic' ? 'bg-[#2878D0] text-white' : 'bg-[#F7F9FC] text-[#6B7A90]'
                    }`}
                  >
                    India
                  </button>
                  <button
                    onClick={() => setSelectedScope('international')}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg ${
                      selectedScope === 'international' ? 'bg-[#2878D0] text-white' : 'bg-[#F7F9FC] text-[#6B7A90]'
                    }`}
                  >
                    Abroad
                  </button>
                </div>
              </div>

              {/* Budget */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Max Daily Budget</span>
                  <span className="text-[#2878D0]">{formatINR(maxBudget)}</span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={15000}
                  step={500}
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                  className="w-full accent-[#2878D0]"
                />
              </div>

              {/* Categories */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-bold text-[#142B4A]">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E3EAF2] bg-[#F7F9FC]"
                >
                  <option value="all">All Categories</option>
                  {allCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Style */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-bold text-[#142B4A]">Travel Style</label>
                <select
                  value={selectedTravelStyle}
                  onChange={(e) => setSelectedTravelStyle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E3EAF2] bg-[#F7F9FC]"
                >
                  <option value="all">All Styles</option>
                  {allTravelStyles.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E3EAF2] flex gap-2">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-semibold text-[#142B4A]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#2878D0] text-white text-xs font-bold"
              >
                Apply ({filteredDestinations.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
