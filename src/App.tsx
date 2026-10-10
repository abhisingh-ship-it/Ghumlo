import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { PlanTripPage } from './pages/PlanTripPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { TripDetailPage } from './pages/TripDetailPage';
import { ItineraryEditorPage } from './pages/ItineraryEditorPage';
import { BudgetPlannerPage } from './pages/BudgetPlannerPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AssistantPage } from './pages/AssistantPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { storageService } from './services/storage';

// Helper component to scroll to top on page change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export function App() {
  // Ensure default seed data is initialized on app mount
  useEffect(() => {
    try {
      storageService.getTrips();
      storageService.getFavorites();
      storageService.getUserPreferences();
    } catch (err) {
      console.warn('Initial storage load warning:', err);
    }
  }, []);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#172B4D] selection:bg-[#2878D0]/20 selection:text-[#142B4A]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/destination/:id" element={<DestinationDetailPage />} />
            <Route path="/plan" element={<PlanTripPage />} />
            <Route path="/my-trips" element={<MyTripsPage />} />
            <Route path="/trip/:id" element={<TripDetailPage />} />
            <Route path="/trip/:id/itinerary" element={<ItineraryEditorPage />} />
            <Route path="/trip/:id/budget" element={<BudgetPlannerPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
