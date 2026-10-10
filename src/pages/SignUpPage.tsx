import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { GhumLoLogo } from '../components/layout/Navbar';
import { triggerTripCelebration } from '../utils/formatters';
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Info,
} from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Please agree to local storage terms to continue.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = authService.signUp(name, email, password);
      setIsLoading(false);

      if (res.success) {
        triggerTripCelebration();
        navigate('/my-trips');
      } else {
        setErrorMsg(res.error || 'Failed to create profile.');
      }
    }, 200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-[#E3EAF2] shadow-sm">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <GhumLoLogo size="lg" />
          </Link>
          <h2 className="text-2xl font-black text-[#142B4A] pt-1">
            Create Local Browser Profile
          </h2>
          <p className="text-xs text-[#6B7A90]">
            "Bas Plan Karo, Nikal Pado!" — Set up an offline profile in this browser.
          </p>
        </div>

        {/* Local Storage Disclosure */}
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-[11px] text-[#553C00] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#142B4A]">Browser Profile Notice:</strong> This profile is saved locally in this browser's <code>localStorage</code> for offline convenience. It is <strong>NOT secure cloud authentication</strong>. Do NOT use sensitive passwords.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#142B4A] mb-1">Explorer Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#6B7A90] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-medium text-[#142B4A] focus:outline-none focus:border-[#2878D0] bg-[#F7F9FC]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#142B4A] mb-1">Email Identifier</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6B7A90] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-medium text-[#142B4A] focus:outline-none focus:border-[#2878D0] bg-[#F7F9FC]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#142B4A] mb-1">Local Passcode</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B7A90] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 chars"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-medium text-[#142B4A] focus:outline-none focus:border-[#2878D0] bg-[#F7F9FC]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B4A] mb-1">Confirm Passcode</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B7A90] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat passcode"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-medium text-[#142B4A] focus:outline-none focus:border-[#2878D0] bg-[#F7F9FC]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="terms-check"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded text-[#2878D0] focus:ring-[#2878D0]"
            />
            <label htmlFor="terms-check" className="text-xs text-[#6B7A90]">
              Save profile locally in this browser's storage.
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white font-bold text-xs shadow-md shadow-[#FF8748]/25 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            {isLoading ? 'Saving Profile...' : 'Create Local Profile'}
          </button>
        </form>

        {/* Link to Sign In */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#6B7A90]">
            Already have a local profile?{' '}
            <Link to="/signin" className="text-[#2878D0] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
