import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Heart, Shield, MapPin, ArrowRight } from 'lucide-react';
import { GhumLoLogo } from '../components/layout/Navbar';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-block bg-white px-3 py-1.5 rounded-2xl shadow-xs border border-[#E3EAF2]">
          <GhumLoLogo size="lg" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#142B4A]">
          About GhumLo
        </h1>
        <p className="text-base text-[#6B7A90] max-w-xl mx-auto leading-relaxed">
          "Bas Plan Karo, Nikal Pado!" — Built by travelers, for travelers across India and beyond.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E3EAF2] p-8 sm:p-10 space-y-6 leading-relaxed text-sm text-[#172B4D]">
        <h2 className="text-xl font-bold text-[#142B4A]">Our Story & Purpose</h2>
        <p>
          Traveling in India has always been rich, vibrant, and full of spontaneous wonders. Yet planning a trip often felt overwhelming: scattered blogs with outdated prices, confusing packages, and itineraries that ignored realistic Indian transit times and budgets.
        </p>
        <p>
          We created <strong>GhumLo</strong> to simplify modern travel planning. Whether you're a college student taking a budget Volvo to Manali, a couple seeking tranquil backwater lagoons in Alleppey, or a family exploring the royal palaces of Jaipur, GhumLo gives you the tools to explore freely and smartly.
        </p>

        <h2 className="text-xl font-bold text-[#142B4A] pt-4">Our Core Philosophy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E3EAF2]">
            <h3 className="font-bold text-[#142B4A] mb-1">Authenticity First</h3>
            <p className="text-xs text-[#6B7A90]">Honest indicative costs in INR, genuine local transport advice, and cultural respect.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E3EAF2]">
            <h3 className="font-bold text-[#142B4A] mb-1">Smart AI Technology</h3>
            <p className="text-xs text-[#6B7A90]">Powered by Google Gemini AI to build tailored timelines based on your pace and style.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E3EAF2]">
            <h3 className="font-bold text-[#142B4A] mb-1">You Are in Control</h3>
            <p className="text-xs text-[#6B7A90]">Edit any day, move stops, and track real expenses without locked-in agency sales.</p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E3EAF2] flex justify-center">
          <Link
            to="/plan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white text-xs font-bold shadow-md shadow-[#FF8748]/30 transition-all hover:scale-105"
          >
            <span>Plan Your Journey with GhumLo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
