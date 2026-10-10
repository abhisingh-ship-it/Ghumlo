import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Calendar,
  Heart,
  Bot,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  Luggage,
  LogIn,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { storageService } from '../../services/storage';
import { authService } from '../../services/auth';
import { User } from '../../types';

export const GhumLoLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className="flex items-center gap-2.5 group select-none">
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#142B4A] via-[#1E3E6B] to-[#2878D0] shadow-md shadow-[#2878D0]/15 transition-transform duration-200 group-hover:scale-105 ${
          isSm ? 'w-8 h-8' : isLg ? 'w-11 h-11' : 'w-9 h-9'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-white ${isSm ? 'w-4 h-4' : isLg ? 'w-6 h-6' : 'w-5 h-5'}`}
        >
          <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" />
          <circle cx="12" cy="9" r="2.5" className="fill-[#FF8748] stroke-[#FF8748]" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8748] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF8748]"></span>
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span
            className={`font-black tracking-tight text-[#142B4A] ${
              isSm ? 'text-lg' : isLg ? 'text-2xl' : 'text-xl'
            }`}
          >
            Ghum<span className="text-[#2878D0]">Lo</span>
          </span>
          <span className="text-[#FF8748] font-black text-xs ml-0.5">•</span>
        </div>
        <span
          className={`text-[#6B7A90] font-medium leading-none tracking-wider uppercase ${
            isSm ? 'text-[8px]' : 'text-[9px]'
          }`}
        >
          Bas Plan Karo, Nikal Pado!
        </span>
      </div>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [savedTripsCount, setSavedTripsCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<User | null>(() => authService.getCurrentUser());

  const updateState = () => {
    try {
      const trips = storageService.getTrips();
      setSavedTripsCount(trips.length);
      const favs = storageService.getFavorites();
      setFavoritesCount(favs.length);
      setCurrentUser(authService.getCurrentUser());
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    updateState();

    const handleSync = () => updateState();
    window.addEventListener('ghumlo_favorites_changed', handleSync);
    window.addEventListener('ghumlo_auth_changed', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener('ghumlo_favorites_changed', handleSync);
      window.removeEventListener('ghumlo_auth_changed', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [location.pathname]);

  const handleSignOut = () => {
    authService.signOut();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: Compass },
    { to: '/explore', label: 'Explore', icon: MapPin },
    {
      to: '/my-trips',
      label: 'My Trips',
      icon: Luggage,
      badge: savedTripsCount > 0 ? savedTripsCount : null,
    },
    {
      to: '/favorites',
      label: 'Favorites',
      icon: Heart,
      badge: favoritesCount > 0 ? favoritesCount : null,
    },
    { to: '/assistant', label: 'AI Buddy', icon: Bot, isAi: true },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E3EAF2] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <GhumLoLogo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'text-[#2878D0] bg-[#EAF4FF] font-semibold'
                      : 'text-[#172B4D] hover:text-[#2878D0] hover:bg-[#F7F9FC]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#2878D0]' : 'text-[#6B7A90]'}`} />
                  <span>{link.label}</span>
                  {link.badge !== null && link.badge !== undefined && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#EAF4FF] text-[#2878D0] border border-[#2878D0]/30">
                      {link.badge}
                    </span>
                  )}
                  {link.isAi && (
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-gradient-to-r from-emerald-50 to-teal-50 text-teal-700 border border-teal-200">
                      <Sparkles className="w-2.5 h-2.5 text-teal-600" />
                      Smart
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              /* Logged In User Pill with Dropdown */
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-[#E3EAF2] hover:border-[#2878D0]/40 bg-[#F7F9FC] transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#2878D0] text-white flex items-center justify-center text-xs font-bold uppercase overflow-hidden">
                    {currentUser.avatarUrl ? (
                      <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      currentUser.name.charAt(0)
                    )}
                  </div>
                  <span className="text-xs font-bold text-[#142B4A] max-w-[100px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B7A90]" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-12 z-50 w-52 bg-white rounded-2xl shadow-xl border border-[#E3EAF2] py-2 text-xs font-medium animate-fadeIn">
                    <div className="px-4 py-2 border-b border-[#E3EAF2]/80">
                      <p className="font-bold text-[#142B4A] truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-[#6B7A90] truncate">{currentUser.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-[#142B4A] hover:bg-[#F7F9FC] transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-[#6B7A90]" />
                      <span>Profile & Settings</span>
                    </Link>

                    <Link
                      to="/my-trips"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-[#142B4A] hover:bg-[#F7F9FC] transition-colors"
                    >
                      <Luggage className="w-4 h-4 text-[#6B7A90]" />
                      <span>My Saved Trips ({savedTripsCount})</span>
                    </Link>

                    <div className="h-px bg-[#E3EAF2] my-1" />

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Not Logged In -> Sign In button */
              <Link
                to="/signin"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#142B4A] hover:text-[#2878D0] hover:bg-[#F7F9FC] transition-colors border border-transparent hover:border-[#E3EAF2]"
              >
                <LogIn className="w-4 h-4 text-[#2878D0]" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Primary Action Button */}
            <Link
              to="/plan"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white text-sm font-semibold shadow-sm shadow-[#FF8748]/30 transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan My Trip</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {!currentUser && (
              <Link
                to="/signin"
                className="px-2.5 py-1.5 rounded-lg border border-[#E3EAF2] text-[#142B4A] text-xs font-semibold"
              >
                Sign In
              </Link>
            )}
            <Link
              to="/plan"
              className="px-3 py-1.5 rounded-lg bg-[#FF8748] text-white text-xs font-semibold"
            >
              Plan Trip
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#172B4D] hover:bg-[#F7F9FC] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E3EAF2] bg-white px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
          {currentUser && (
            <div className="p-3 mb-3 rounded-2xl bg-[#EAF4FF] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#2878D0] text-white flex items-center justify-center font-bold text-xs uppercase">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#142B4A]">{currentUser.name}</p>
                  <p className="text-[10px] text-[#6B7A90]">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="text-xs text-rose-600 font-semibold hover:underline"
              >
                Sign Out
              </button>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    active
                      ? 'bg-[#EAF4FF] text-[#2878D0] font-semibold'
                      : 'text-[#172B4D] hover:bg-[#F7F9FC]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#6B7A90]" />
                    <span>{link.label}</span>
                    {link.isAi && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-teal-700 font-semibold border border-teal-200">
                        Smart
                      </span>
                    )}
                  </div>
                  {link.badge !== null && link.badge !== undefined && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#2878D0] text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="h-px bg-[#E3EAF2] my-2" />

            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#172B4D] hover:bg-[#F7F9FC]"
            >
              <UserIcon className="w-4 h-4 text-[#6B7A90]" />
              <span>Profile & Preferences</span>
            </Link>

            {!currentUser ? (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link
                  to="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#E3EAF2] text-[#142B4A] font-bold text-xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#2878D0]" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 rounded-xl bg-[#2878D0] text-white font-bold text-xs"
                >
                  <span>Sign Up</span>
                </Link>
              </div>
            ) : null}

            <Link
              to="/plan"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#FF8748] text-white font-semibold text-sm shadow-md shadow-[#FF8748]/25"
            >
              <Calendar className="w-4 h-4" />
              <span>Start Planning a Trip</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
