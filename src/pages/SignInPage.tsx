import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/auth';
import { GhumLoLogo } from '../components/layout/Navbar';
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Info,
} from 'lucide-react';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Read redirect destination if available
  const from = (location.state as any)?.from || '/my-trips';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = authService.signIn(email, password);
      setIsLoading(false);

      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMsg(res.error || 'Failed to sign in.');
      }
    }, 200);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      authService.signInDemo();
      setIsLoading(false);
      navigate(from, { replace: true });
    }, 150);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-[#E3EAF2] shadow-sm">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <GhumLoLogo size="lg" />
          </Link>
          <h2 className="text-2xl font-black text-[#142B4A] pt-1">
            Sign In with Local Profile
          </h2>
          <p className="text-xs text-[#6B7A90]">
            Access your saved itineraries, budget logs, and bucket list.
          </p>
        </div>

        {/* Clear Local Storage Transparency Notice */}
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-[11px] text-[#553C00] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#142B4A]">Local Browser Profile Only:</strong> This is a client-side offline profile simulator stored in your browser's <code>localStorage</code>. It is <strong>NOT secure cloud authentication</strong>. Do NOT enter real or sensitive passwords.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Demo Account Quick Access */}
        <div className="p-4 rounded-2xl bg-[#EAF4FF] border border-[#2878D0]/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#142B4A] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF8748]" />
              <span>Instant Test Profile</span>
            </span>
            <span className="text-[10px] text-[#2878D0] font-semibold">1-Click</span>
          </div>
          <p className="text-[11px] text-[#6B7A90]">
            Explore all features as <strong>Aarav Sharma</strong> without registering.
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-[#2878D0] hover:bg-[#1E66B6] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <span>Load Local Demo Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#E3EAF2]"></div>
          <span className="flex-shrink mx-4 text-xs text-[#6B7A90] font-medium uppercase">
            or with saved profile
          </span>
          <div className="flex-grow border-t border-[#E3EAF2]"></div>
        </div>

        {/* Main Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#142B4A] mb-1">Email Address</label>
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

          <div>
            <label className="block text-xs font-bold text-[#142B4A] mb-1">Profile Key / Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6B7A90] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-medium text-[#142B4A] focus:outline-none focus:border-[#2878D0] bg-[#F7F9FC]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white font-bold text-xs shadow-md shadow-[#FF8748]/25 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? 'Loading Profile...' : 'Sign In with Local Profile'}
          </button>
        </form>

        {/* Link to Sign Up */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#6B7A90]">
            Don't have a local profile?{' '}
            <Link to="/signup" className="text-[#2878D0] font-bold hover:underline">
              Create local profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
