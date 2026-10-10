import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TripSearchHero } from '../components/home/TripSearchHero';
import { DestinationCard } from '../components/destinations/DestinationCard';
import { INITIAL_DESTINATIONS } from '../data/destinations';
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Luggage,
  ShieldCheck,
  TrendingUp,
  Heart,
  ArrowRight,
  Sun,
  Mountain,
  Palmtree,
  Car,
  Landmark,
  TreePine,
  Wallet,
  Users,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Curated popular 8 destinations for homepage
  const popularDestinations = INITIAL_DESTINATIONS.slice(0, 8);

  const moods = [
    { label: 'Mountains Calling', category: 'Mountains', icon: Mountain, color: 'text-blue-600 bg-blue-50' },
    { label: 'Beach Therapy', category: 'Beaches', icon: Palmtree, color: 'text-teal-600 bg-teal-50' },
    { label: 'Weekend Escapes', category: 'Weekend Getaways', icon: Car, color: 'text-orange-600 bg-orange-50' },
    { label: 'Heritage & Culture', category: 'Historical Places', icon: Landmark, color: 'text-amber-700 bg-amber-50' },
    { label: 'Nature Retreats', category: 'Nature', icon: TreePine, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Budget Travel', category: 'Backpacking', icon: Wallet, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Family Holidays', category: 'Family', icon: Users, color: 'text-purple-600 bg-purple-50' },
    { label: 'Spiritual Peace', category: 'Religious and Spiritual Places', icon: Sun, color: 'text-yellow-600 bg-yellow-50' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Discover Your Destination',
      desc: 'Browse curated Indian and world getaways with honest travel budgets, best seasons, and local transport advice.',
      icon: MapPin,
      color: 'bg-[#2878D0]',
    },
    {
      num: '02',
      title: 'Create Your Perfect Itinerary',
      desc: 'Our Gemini AI crafts custom day-by-day schedules with morning, afternoon, and evening timelines tailored to your pace.',
      icon: Sparkles,
      color: 'bg-[#FF8748]',
    },
    {
      num: '03',
      title: 'Pack Your Bags & Go!',
      desc: 'Track actual expenses against your INR budget, tweak activities anytime on mobile, and focus on the joy of exploring.',
      icon: Luggage,
      color: 'bg-[#36B7A0]',
    },
  ];

  const valueProps = [
    {
      title: 'AI-Assisted Itinerary Planning',
      desc: 'Smart Gemini models craft balanced timelines avoiding unrealistic rush and tourist traps.',
      icon: Sparkles,
    },
    {
      title: 'Real Indian Rupee (₹) Budgets',
      desc: 'Transparent budget breakdown across travel, stay, local auto/cabs, food, and emergency reserves.',
      icon: Wallet,
    },
    {
      title: 'Interactive Day-by-Day Editor',
      desc: 'Reorder activities, shift times, add personal discoveries, and track estimated costs dynamically.',
      icon: Calendar,
    },
    {
      title: 'Offline & Local Persistence',
      desc: 'Your plans and expense logs stay saved in your browser even without mandatory signups.',
      icon: ShieldCheck,
    },
  ];

  const featuredExperiences = [
    {
      title: 'Himalayan Ridge & High Passes',
      location: 'Himachal & Kashmir',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      tag: 'Snow & Peaks',
      link: '/destination/kashmir',
    },
    {
      title: 'Backwaters & Coastal Palms',
      location: 'Alleppey & Munnar, Kerala',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      tag: 'Waterways',
      link: '/destination/kerala',
    },
    {
      title: 'Sandstone Citadels & Royal Bazaars',
      location: 'Jaipur, Rajasthan',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      tag: 'Royalty & Heritage',
      link: '/destination/jaipur',
    },
    {
      title: 'Ganges Rafting & Tapovan Yoga',
      location: 'Rishikesh, Uttarakhand',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      tag: 'White Water & Soul',
      link: '/destination/rishikesh',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* SECTION B: Hero with Floating Search */}
      <TripSearchHero />

      {/* SECTION E: Travel by Mood */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2878D0]">Find What Moves You</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] mt-1">
            Travel by Mood & Passion
          </h2>
          <p className="text-sm text-[#6B7A90] mt-2">
            Pick a vibe, and we'll filter the perfect destinations across India and beyond.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {moods.map((mood) => {
            const Icon = mood.icon;
            return (
              <button
                key={mood.label}
                onClick={() => navigate(`/explore?category=${encodeURIComponent(mood.category)}`)}
                className="flex flex-col items-center p-4 rounded-2xl bg-white border border-[#E3EAF2] hover:border-[#2878D0]/40 hover:shadow-md transition-all group text-center"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${mood.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-[#142B4A] group-hover:text-[#2878D0]">
                  {mood.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION C: Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF8748]">Curated Escapes</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] mt-1">
              Top Trending Destinations
            </h2>
            <p className="text-sm text-[#6B7A90] mt-1">
              Handcrafted destination guides with realistic daily budget estimates in INR.
            </p>
          </div>

          <Link
            to="/explore"
            className="flex items-center gap-1.5 text-sm font-bold text-[#2878D0] hover:text-[#1E66B6] group"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} viewMode="grid" />
          ))}
        </div>
      </section>

      {/* SECTION D: How GhumLo Works */}
      <section className="bg-white py-16 lg:py-20 border-y border-[#E3EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#36B7A0]">Simple & Delightful</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] mt-1">
              How GhumLo Works
            </h2>
            <p className="text-sm text-[#6B7A90] mt-2">
              From daydreaming on your couch to landing at your dream destination in three straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="relative p-7 rounded-3xl bg-[#F7F9FC] border border-[#E3EAF2] hover:border-[#2878D0]/40 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-[#142B4A]/20">{s.num}</span>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${s.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#142B4A] mb-2">{s.title}</h3>
                    <p className="text-sm text-[#6B7A90] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white font-semibold text-sm shadow-md shadow-[#2878D0]/20 transition-all hover:scale-105"
            >
              <span>Try the Smart Trip Planner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION G: Featured Travel Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF8748]">Signature Journeys</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] mt-1">
            Featured Travel Experiences
          </h2>
          <p className="text-sm text-[#6B7A90] mt-1">
            Immersive escapes that leave an imprint on your heart and soul.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredExperiences.map((exp) => (
            <Link
              key={exp.title}
              to={exp.link}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-end p-6"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#FF8748] text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                  {exp.tag}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-[#EAF4FF] transition-colors leading-snug">
                  {exp.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#36B7A0]" />
                  <span>{exp.location}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION F: Why GhumLo? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#142B4A] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          {/* Subtle decorative background element */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#2878D0]/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#FF8748]/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF8748]">Designed for Indian Travelers</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
              Why Savvy Travelers Choose GhumLo
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              No generic cookie-cutter packages or exaggerated claims. Just honest planning tools, intelligent Gemini AI itineraries, and clear budget math.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop) => {
              const Icon = prop.icon;
              return (
                <div
                  key={prop.title}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2878D0]/30 text-[#EAF4FF] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#36B7A0]" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{prop.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{prop.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION H: Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-[#EAF4FF] via-white to-[#F4F9FF] rounded-3xl p-8 sm:p-14 border border-[#2878D0]/20 shadow-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2878D0]/10 text-[#2878D0] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>"Bas Plan Karo, Nikal Pado!"</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#142B4A] tracking-tight">
            Your Next Story Is Waiting.
          </h2>

          <p className="mt-3 text-base text-[#6B7A90] max-w-xl mx-auto leading-relaxed">
            Pick a destination, customize your timeline with AI, manage your budget in INR, and make the journey yours.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/plan"
              className="px-8 py-3.5 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white font-bold text-base shadow-lg shadow-[#FF8748]/30 transition-all hover:scale-105 active:scale-95"
            >
              Let's Plan My Trip
            </Link>
            <Link
              to="/assistant"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#142B4A] font-bold text-base border border-[#E3EAF2] shadow-xs transition-all"
            >
              Ask GhumLo Travel Buddy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
