import React from 'react';
import { Link } from 'react-router-dom';
import { GhumLoLogo } from './Navbar';
import { MapPin, Compass, Shield, Heart, Sparkles, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#142B4A] text-white pt-16 pb-12 border-t border-[#1E3E6B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E3E6B]">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block bg-white/95 px-3 py-1.5 rounded-xl">
              <GhumLoLogo size="md" />
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              India’s smart travel-planning platform designed to turn spontaneous wanderlust into unforgettable memories. Discover destinations, create day-by-day itineraries with Gemini AI, and track your expenses in INR.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-[#FF8748] border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>"Bas Plan Karo, Nikal Pado!"</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-[#FF8748] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-[#FF8748] transition-colors">Explore Destinations</Link>
              </li>
              <li>
                <Link to="/plan" className="hover:text-[#FF8748] transition-colors">Smart Trip Planner</Link>
              </li>
              <li>
                <Link to="/my-trips" className="hover:text-[#FF8748] transition-colors">My Saved Trips</Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-[#FF8748] transition-colors">Saved Bucket List</Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-[#FF8748] transition-colors flex items-center gap-1.5">
                  <span>AI Travel Buddy</span>
                  <span className="text-[10px] px-1 bg-[#FF8748] text-white rounded">NEW</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Indian Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400">Popular Escapes</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/destination/goa" className="hover:text-[#FF8748] transition-colors">Goa Beaches</Link>
              </li>
              <li>
                <Link to="/destination/manali" className="hover:text-[#FF8748] transition-colors">Manali Valley</Link>
              </li>
              <li>
                <Link to="/destination/kashmir" className="hover:text-[#FF8748] transition-colors">Kashmir & Gulmarg</Link>
              </li>
              <li>
                <Link to="/destination/jaipur" className="hover:text-[#FF8748] transition-colors">Jaipur Pink City</Link>
              </li>
              <li>
                <Link to="/destination/kerala" className="hover:text-[#FF8748] transition-colors">Kerala Backwaters</Link>
              </li>
              <li>
                <Link to="/destination/rishikesh" className="hover:text-[#FF8748] transition-colors">Rishikesh Adventure</Link>
              </li>
            </ul>
          </div>

          {/* About & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400">Company & Trust</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/about" className="hover:text-[#FF8748] transition-colors">About GhumLo</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#FF8748] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#FF8748] transition-colors">Preferences & Currency</Link>
              </li>
            </ul>
            <div className="pt-2 text-xs text-slate-400">
              <p>Currency: <strong className="text-white">Indian Rupee (₹ INR)</strong></p>
              <p className="mt-1">Built with Google Gemini AI</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} GhumLo Technologies. All rights reserved. Plan Your Journey. Explore Your World.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <span className="text-slate-500">Made with ❤️ for Indian Wanderers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
