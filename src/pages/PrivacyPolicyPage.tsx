import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7A90] hover:text-[#2878D0]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#2878D0]">Legal & Security</span>
        <h1 className="text-3xl font-extrabold text-[#142B4A] mt-1">Privacy Policy</h1>
        <p className="text-xs text-[#6B7A90] mt-1">Last updated: October 2026</p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E3EAF2] p-8 space-y-6 text-xs sm:text-sm text-[#172B4D] leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#142B4A]">1. Data Storage & Local Persistence</h2>
          <p>
            GhumLo stores your created itineraries, saved bucket list destinations, expense entries, and user preferences locally in your browser's <code>localStorage</code>. We do not sell your personal itinerary data or track your offline spending.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#142B4A]">2. AI Integration with Google Gemini</h2>
          <p>
            When you request itinerary generation or interact with the GhumLo Travel Buddy, your chosen destination, travel dates, style, and question are processed securely by Google Gemini API through our protected server endpoints. Secret API keys are never exposed to the client browser.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#142B4A]">3. Currency & Pricing Transparency</h2>
          <p>
            Budget indicators are displayed in Indian Rupees (₹ INR) as indicative guidance for independent travellers. GhumLo is not an airline or hotel booking reseller and does not warrant live availability unless an authorized booking provider is integrated.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#142B4A]">4. Managing Your Data</h2>
          <p>
            You can clear or reset all your stored trips and preferences at any time from the <Link to="/profile" className="text-[#2878D0] underline">Profile & Preferences</Link> settings page or through your browser's data settings.
          </p>
        </section>
      </div>
    </div>
  );
};
