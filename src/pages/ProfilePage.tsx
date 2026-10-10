import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storage';
import { authService } from '../services/auth';
import { UserPreferences, TravelStyle, User } from '../types';
import {
  User as UserIcon,
  Settings,
  Wallet,
  Compass,
  Users,
  MapPin,
  Save,
  RotateCcw,
  Sparkles,
  Shield,
  Info,
  LogIn,
  LogOut,
  CheckCircle2,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(() => authService.getCurrentUser());
  const [preferences, setPreferences] = useState<UserPreferences>(() =>
    storageService.getUserPreferences()
  );
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    const handleAuth = () => {
      setCurrentUser(authService.getCurrentUser());
    };
    window.addEventListener('ghumlo_auth_changed', handleAuth);
    return () => window.removeEventListener('ghumlo_auth_changed', handleAuth);
  }, []);

  const travelStylesList: TravelStyle[] = [
    'Adventure',
    'Relaxation',
    'Family',
    'Romantic',
    'Cultural',
    'Backpacking',
    'Luxury',
    'Weekend getaway',
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveUserPreferences(preferences);
    setToastMessage('Preferences saved successfully!');
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleSignOut = () => {
    authService.signOut();
    setCurrentUser(null);
    setToastMessage('Signed out successfully.');
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all stored trips, favorites, and preferences to defaults? This cannot be undone.'
      )
    ) {
      storageService.resetAllData();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B4A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-slideUp">
          <Sparkles className="w-4 h-4 text-[#FF8748]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#2878D0]">
          Personalization & Account
        </span>
        <h1 className="text-3xl font-extrabold text-[#142B4A] mt-1">Profile & Preferences</h1>
        <p className="text-sm text-[#6B7A90] mt-1">
          Manage your GhumLo member account and travel planning preferences.
        </p>
      </div>

      {/* Account Status Card */}
      {currentUser ? (
        <div className="bg-white rounded-3xl border border-[#E3EAF2] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#2878D0] text-white flex items-center justify-center text-xl font-bold uppercase overflow-hidden shadow-sm">
              {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                currentUser.name.charAt(0)
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#142B4A]">{currentUser.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                  Active Member
                </span>
              </div>
              <p className="text-xs text-[#6B7A90] mt-0.5">{currentUser.email}</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Joined: {new Date(currentUser.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors self-start sm:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E3EAF2] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                Guest Mode
              </span>
            </div>
            <h3 className="text-base font-bold text-[#142B4A] mt-1">Sign in to save your travel identity</h3>
            <p className="text-xs text-[#6B7A90] mt-0.5">
              Sync your trips and preferences with your personal GhumLo account.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/signin"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white text-xs font-bold shadow-xs transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-xl border border-[#E3EAF2] text-[#142B4A] hover:bg-[#F7F9FC] text-xs font-bold transition-all"
            >
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      )}

      {/* Browser Storage Notice */}
      <div className="p-4 rounded-2xl bg-[#EAF4FF] border border-[#2878D0]/20 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#2878D0] shrink-0 mt-0.5" />
        <div className="text-xs text-[#142B4A] leading-relaxed">
          <strong className="block font-bold mb-0.5">Local Browser Storage Notice</strong>
          GhumLo saves your trip plans, favorites, and preferences directly inside your browser’s localStorage. No external cloud database setup was configured, ensuring your data remains private on this machine.
        </div>
      </div>

      {/* Preferences Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#E3EAF2] p-6 sm:p-8 space-y-6">
        <div className="space-y-4">
          {/* Display Name */}
          <div>
            <label className="block text-xs font-bold text-[#142B4A] mb-1">Display Name</label>
            <input
              type="text"
              value={preferences.displayName}
              onChange={(e) => setPreferences({ ...preferences, displayName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] bg-[#F7F9FC]"
            />
          </div>

          {/* Preferred Currency & Starting City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#142B4A] mb-1">
                Preferred Currency
              </label>
              <select
                value={preferences.preferredCurrency}
                onChange={(e) => setPreferences({ ...preferences, preferredCurrency: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] bg-[#F7F9FC]"
              >
                <option value="INR">₹ INR (Indian Rupee)</option>
                <option value="USD">$ USD (US Dollar)</option>
                <option value="EUR">€ EUR (Euro)</option>
                <option value="GBP">£ GBP (British Pound)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B4A] mb-1">
                Default Starting City
              </label>
              <input
                type="text"
                value={preferences.defaultStartingCity}
                onChange={(e) =>
                  setPreferences({ ...preferences, defaultStartingCity: e.target.value })
                }
                placeholder="e.g. Mumbai, Delhi, Bengaluru"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] bg-[#F7F9FC]"
              />
            </div>
          </div>

          {/* Default Travel Style & Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#142B4A] mb-1">
                Default Travel Style
              </label>
              <select
                value={preferences.defaultTravelStyle}
                onChange={(e) =>
                  setPreferences({ ...preferences, defaultTravelStyle: e.target.value as TravelStyle })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] bg-[#F7F9FC]"
              >
                {travelStylesList.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B4A] mb-1">
                Default Travellers Count
              </label>
              <select
                value={preferences.defaultTravellerCount}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    defaultTravellerCount: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-sm text-[#142B4A] bg-[#F7F9FC]"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Solo Traveller' : 'Travellers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Gemini AI API Key (Stored in LocalStorage only) */}
          <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#E3EAF2] space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#142B4A]">
                Optional Google Gemini API Key
              </label>
              <span className="text-[10px] font-semibold text-[#6B7A90] bg-slate-100 px-2 py-0.5 rounded">
                Optional
              </span>
            </div>
            <p className="text-[11px] text-[#6B7A90] leading-relaxed">
              GhumLo runs 100% offline out-of-the-box using the built-in <strong>Local Travel Engine</strong>. If you wish to connect your own Google Gemini API key, enter it below. It is stored exclusively in your browser's <code>localStorage</code> and never transmitted to any third-party server.
            </p>
            <input
              type="password"
              value={preferences.geminiApiKey || ''}
              onChange={(e) => setPreferences({ ...preferences, geminiApiKey: e.target.value })}
              placeholder="AIzaSy... (Leave empty to use built-in offline engine)"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-mono text-[#142B4A] bg-white"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-[#E3EAF2] flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetData}
            className="text-xs text-[#D64545] hover:underline flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Stored Data</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white text-xs font-bold shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
