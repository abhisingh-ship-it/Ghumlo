# GhumLo — AI-Powered Travel Planner

> **"Bas Plan Karo, Nikal Pado!"**  
> *Plan Your Journey. Explore Your World.*

GhumLo is an Indian travel-planning web application designed to turn wanderlust into reality. Discover hand-picked destinations across India and beyond, build day-by-day itineraries, allocate and track travel budgets in Indian Rupees (₹ INR), manage activities on an interactive timeline, and save your bucket-list places.

The project is built as a **100% frontend-only static application** configured for **GitHub Pages**. It runs entirely in the browser with zero backend or database server runtime requirements.

---

## 🌟 Key Features

1. **Brand Identity & Travel Design System**
   - Distinctive travel logo and Hindi motto *"Bas Plan Karo, Nikal Pado!"*.
   - Color palette: Primary Navy (`#142B4A`), Travel Blue (`#2878D0`), Adventure Orange (`#FF8748`), Fresh Teal (`#36B7A0`), and Clean Surface (`#F7F9FC`).
   - Clean typography using *Plus Jakarta Sans*.

2. **Homepage & Floating Trip Search**
   - Scenic hero photography with instant search panel (Destination, Origin City, Dates, Travellers, Budget, Style).
   - "Travel by Mood" quick filter cards (Mountains Calling, Beach Therapy, Weekend Escapes, Heritage & Culture, etc.).
   - Curated popular destinations (Goa, Manali, Kashmir, Jaipur, Kerala, Rishikesh, Meghalaya, Mumbai, Bali, Dubai, Thailand, Switzerland).
   - "How GhumLo Works" 3-step visual guide.

3. **Explore Destinations**
   - Full search by destination name, state, country, or specific attractions.
   - Multi-facet filters: Domestic vs International, Budget range slider (INR), Travel Styles, Categories.
   - Sort by budget (low-to-high, high-to-low) or alphabetical.
   - Grid and List view toggle.
   - Instant favorite bookmarking with real-time UI synchronization.

4. **Destination Detail Guides**
   - High-resolution photo galleries.
   - Comprehensive overviews, best seasons, and recommended durations.
   - Must-visit attractions with entry ticket costs in INR.
   - Signature experiences, local transport options, cultural etiquette, and packing checklists.
   - Direct shortcuts: "Plan a Trip Here", "Ask AI Buddy for Hacks", and Google Maps links.

5. **Smart 5-Step Trip Planner Wizard**
   - **Step 1: Core Trip Details** (Origin, Destination, Travel Dates, Adults & Children, Budget, Transport, Hotel type).
   - **Step 2: Travel Preferences** (Pace: Relaxed, Balanced, Packed; Multi-select interests).
   - **Step 3: Budget Math** (Dynamic allocation across Transport, Stay, Food, Activities, Local Travel, Shopping, Emergency Reserve with auto-balance presets).
   - **Step 4: Smart Itinerary Generation** (Powered by the client-side Local Travel Engine with optional Gemini AI integration).
   - **Step 5: Review & Save** (Trip summary and instant saving to your dashboard with celebration animations).

6. **My Trips Dashboard**
   - Metric cards: Total Trips, Upcoming Trips, Completed Trips, Combined Planned Budget.
   - Trip cards with status tags (`Planning`, `Upcoming`, `Ongoing`, `Completed`).
   - Actions: Duplicate trip, Delete trip with confirmation dialog, open Itinerary Editor, manage expenses.

7. **Interactive Itinerary Editor**
   - Day-by-day interactive timeline.
   - Add new activities with custom timings, locations, costs, and tips.
   - Edit, delete, and reorder activities (Move Up / Down).
   - Move activities between days with single-click transfer.
   - Dynamic recalculation of daily and total itinerary costs.

8. **Budget & Expense Manager**
   - All financial calculations in Indian Rupees (₹ INR).
   - Budget consumption progress bar with automatic over-budget warnings.
   - Category-wise spending breakdown vs. original plan.
   - Add, edit, and delete actual expense transactions.
   - Cost per traveller calculation.

9. **GhumLo Travel Buddy (AI Assistant)**
   - Client-side travel advisor running in browser JavaScript with curated knowledge for Indian & international routes.
   - Quick prompts for budget hacks, family itineraries, weekend getaways, and packing lists.
   - Context-aware answers attached to your active saved trips.
   - "Add to Itinerary" action buttons for suggested stops.
   - Clear badge labeling distinguishing `⚡ Local Travel Engine` from `✨ Gemini AI`.

10. **Profile & Local Persistence**
    - Configurable display name, preferred currency, default traveller count, and default origin city.
    - Transparent storage disclosure: saved in browser `localStorage`.
    - Local test profile simulator for testing without registration.
    - One-click reset and reseed utility.

---

## 🛠️ Architecture & Tech Stack

- **Frontend Framework:** React 19, TypeScript
- **Bundler & Dev Server:** Vite 6 / Vite 8
- **Styling:** Tailwind CSS v4
- **Routing:** React Router (`HashRouter`) — guarantees 100% URL route compatibility on GitHub Pages and static subpaths without 404 rewrite issues.
- **Base Path:** Configured as `base: './'` in `vite.config.ts` for relative asset referencing on any repository name.
- **Persistence:** Browser `localStorage` (Trips, Favorites, Preferences, Local Profiles).
- **Zero Backend Runtime:** No Express server or Node backend is required. Everything runs in the user's browser.
- **Automated CI/CD:** `.github/workflows/deploy.yml` compiles and deploys to GitHub Pages upon push to `main`.

---

## 🚀 How to Publish to GitHub Pages

### Method 1: Using the Included GitHub Actions Workflow (Recommended)

1. Create a new repository on GitHub (e.g. `ghumlo` or `my-travel-planner`).
2. Clone or push this project code to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of GhumLo static application"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.
4. The workflow file at `.github/workflows/deploy.yml` will automatically trigger, build the static site, and deploy it to:
   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```

### Method 2: Manual Upload of `dist/`

1. Run the build command:
   ```bash
   npm run build
   ```
2. The complete production-ready static site is generated inside the `dist/` folder.
3. You can deploy the `dist/` directory directly to GitHub Pages (via `gh-pages` branch), Vercel, Netlify, or Cloudflare Pages.

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Vite Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Test Production Bundle
```bash
npm run build
npm run preview
```

---

## 📦 Project Structure

```
ghumlo/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow for GitHub Pages
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   ├── destinations/     # DestinationCard component
│   │   ├── home/             # TripSearchHero floating search panel
│   │   └── layout/           # Navbar & Footer with GhumLo branding
│   ├── data/
│   │   └── destinations.ts   # 12 Curated Indian & International destinations
│   ├── pages/
│   │   ├── HomePage.tsx               # Landing page with mood filters & value props
│   │   ├── ExplorePage.tsx            # Multi-facet search and filter
│   │   ├── DestinationDetailPage.tsx # Destination guide and photo gallery
│   │   ├── PlanTripPage.tsx           # 5-Step trip planner wizard
│   │   ├── MyTripsPage.tsx            # Trip dashboard with status tags
│   │   ├── TripDetailPage.tsx         # Trip hub
│   │   ├── ItineraryEditorPage.tsx    # Interactive day-by-day editor
│   │   ├── BudgetPlannerPage.tsx      # INR budget & expense tracker
│   │   ├── FavoritesPage.tsx          # Saved bucket list
│   │   ├── AssistantPage.tsx          # GhumLo Travel Buddy AI chat
│   │   ├── ProfilePage.tsx            # User settings & optional key config
│   │   ├── SignInPage.tsx             # Local demo profile sign-in
│   │   ├── SignUpPage.tsx             # Local demo profile sign-up
│   │   ├── AboutPage.tsx              # Brand story
│   │   └── PrivacyPolicyPage.tsx      # Privacy statement & offline notice
│   ├── services/
│   │   ├── api.ts            # Client-side itinerary & chat service (Zero backend)
│   │   ├── auth.ts           # Local profile demo service
│   │   └── storage.ts        # Modular localStorage service with seed data
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── utils/
│   │   └── formatters.ts     # INR currency, dates, and celebrations
│   ├── App.tsx               # HashRouter & page routes
│   ├── index.css             # Tailwind v4 theme tokens
│   └── main.tsx              # DOM root mount
├── .env.example
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts            # Configured with base: './' for GitHub Pages
```

---

## 🔒 Security & Offline Transparency

- **Zero Secret Exposure:** No API keys are bundled or exposed in client code.
- **Offline Reliability:** All trip planning, itinerary creation, budget breakdowns, and assistant answers run client-side.
- **Optional Real AI:** Users can optionally input their personal Gemini API key in their local Profile settings; it is stored solely in their browser's `localStorage`.
- **Local Storage Disclosure:** Profile management is clearly designated as a browser-only demo/simulator, not secure cloud authentication.
