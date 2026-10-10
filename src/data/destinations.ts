import { Destination } from '../types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'goa',
    name: 'Goa',
    region: 'North & South Goa',
    country: 'India',
    isInternational: false,
    description: 'Sun-drenched golden beaches, Portuguese colonial architecture, vibrant beach shacks, and serene backwaters that offer everything from high-energy water sports to peaceful coastal escapes.',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    categories: ['Beaches', 'Food and Culture', 'Weekend Getaways', 'Adventure'],
    estimatedDailyBudget: 3200,
    recommendedDuration: '4-5 Days',
    bestTimeToVisit: 'November to March',
    travelStyles: ['Relaxation', 'Backpacking', 'Romantic', 'Weekend getaway', 'Adventure'],
    attractions: [
      {
        name: 'Palolem Beach & Butterfly Beach',
        description: 'Crescent bay in South Goa with calm waters, dolphin spotting boat rides, and cozy bamboo huts.',
        estimatedTime: 'Half day',
        highlight: 'Sunset kayak ride & secret cove boating',
        ticketCostINR: 600
      },
      {
        name: 'Fort Aguada & Lighthouse',
        description: '17th-century Portuguese fort overlooking the confluence of Mandovi River and the Arabian Sea.',
        estimatedTime: '2 hours',
        highlight: 'Panoramic cliffside views of Sinquerim beach',
        ticketCostINR: 50
      },
      {
        name: 'Fontainhas Latin Quarter',
        description: 'Heritage neighborhood in Panaji characterized by narrow colorful streets and Indo-Portuguese villas.',
        estimatedTime: '3 hours',
        highlight: 'Old bakery visits & street photography',
        ticketCostINR: 0
      },
      {
        name: 'Dudhsagar Waterfalls',
        description: 'Four-tiered sea of milk waterfall on the Mandovi river amidst dense Western Ghats jungle.',
        estimatedTime: '5-6 hours',
        highlight: 'Jeep safari through Mollem National Park',
        ticketCostINR: 1100
      }
    ],
    recommendedExperiences: [
      'Rent a two-wheeler to cruise coastal village roads lined with swaying coconut palms',
      'Sample authentic Goan fish curry thali with kokum sol kadhi at local family eateries',
      'Sunset catamaran cruise or kayaking along the Chapora river backwaters'
    ],
    localTransport: ['Rented scooter/Activa (₹350-500/day)', 'GoaMiles app-based cabs', 'Self-drive open top thar/car', 'Pilot motorcycle taxis'],
    culturalTips: [
      'Embrace the afternoon "susegad" (relaxed pace of life) between 1 PM and 4 PM',
      'Dress respectfully when visiting Basilica of Bom Jesus and heritage churches',
      'Support local fishermen and beach shack owners respectfully'
    ],
    packingSuggestions: ['Breathable linen and cotton clothing', 'High SPF waterproof sunscreen', 'Polarized sunglasses', 'Water shoes for rocky shores', 'Light dry bag'],
    coordinates: { lat: 15.2993, lng: 74.1240 }
  },
  {
    id: 'manali',
    name: 'Manali',
    region: 'Himachal Pradesh',
    country: 'India',
    isInternational: false,
    description: 'Majestic snow-capped Himalayan peaks, fragrant cedar forests, gushing Beas River, and the high mountain gateway to Solang Valley and Atal Tunnel.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593181824359-54359b392552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    categories: ['Mountains', 'Adventure', 'Nature', 'Weekend Getaways'],
    estimatedDailyBudget: 2800,
    recommendedDuration: '4-6 Days',
    bestTimeToVisit: 'October to June',
    travelStyles: ['Adventure', 'Backpacking', 'Romantic', 'Family'],
    attractions: [
      {
        name: 'Solang Valley & Atal Tunnel',
        description: 'Hub for alpine adventure activities like paragliding, zorbing, and entering the high-altitude Lahaul valley.',
        estimatedTime: 'Full day',
        highlight: 'World’s longest single-tube highway tunnel above 10,000 ft',
        ticketCostINR: 1500
      },
      {
        name: 'Old Manali & Hadimba Devi Temple',
        description: 'Charming wooden architecture nestled in giant deodar forest, alongside bohemian cafes and live acoustic music.',
        estimatedTime: '4 hours',
        highlight: 'Pagoda-style cedar wood architecture from 1553 CE',
        ticketCostINR: 0
      },
      {
        name: 'Jogini Waterfall Trek',
        description: 'Scenic gentle hike from Vashisht village through apple orchards overlooking snow peaks.',
        estimatedTime: '3 hours',
        highlight: 'Natural mountain stream plunge pool and serene vistas',
        ticketCostINR: 0
      }
    ],
    recommendedExperiences: [
      'Sip fresh Himachali rhododendron and apple cider by the Beas riverbanks',
      'Hike to the mountain villages of Naggar and Sethan (Igloo village in winter)',
      'Tandem paragliding over Solang Valley'
    ],
    localTransport: ['Local union taxis for Solang/Rohtang', 'Rented Royal Enfield / Himalayan bikes', 'Walking through Old Manali trails'],
    culturalTips: [
      'Remove footwear before stepping onto wooden temple sanctums',
      'Carry your own reusable water bottle to prevent single-use plastic waste in eco-sensitive hills',
      'Bargain politely at Old Manali handloom bazaars'
    ],
    packingSuggestions: ['Layered fleece jacket and windcheater', 'Thermal inners for winter', 'Sturdy trekking shoes with ankle grip', 'Lip balm and heavy moisturizer'],
    coordinates: { lat: 32.2432, lng: 77.1892 }
  },
  {
    id: 'kashmir',
    name: 'Kashmir Valley',
    region: 'Jammu & Kashmir',
    country: 'India',
    isInternational: false,
    description: 'Paradise on Earth: tranquil Shikara rides on Dal Lake, blooming saffron fields, Mughal gardens, and alpine meadows of Gulmarg and Pahalgam.',
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80'
    ],
    categories: ['Mountains', 'Nature', 'Food and Culture', 'Weekend Getaways'],
    estimatedDailyBudget: 3800,
    recommendedDuration: '5-7 Days',
    bestTimeToVisit: 'March to November (or Dec-Feb for snow)',
    travelStyles: ['Romantic', 'Family', 'Relaxation', 'Luxury'],
    attractions: [
      {
        name: 'Dal Lake & Houseboats',
        description: 'Historic wooden houseboats with carved walnut cedar paneling and morning floating vegetable markets.',
        estimatedTime: 'Evening + Overnight',
        highlight: 'Shikara glide through lotus pads at dawn',
        ticketCostINR: 800
      },
      {
        name: 'Gulmarg Gondola & Apharwat Peak',
        description: 'One of the highest cable cars in the world taking skiers and visitors to 13,780 ft altitude.',
        estimatedTime: 'Full day',
        highlight: 'Phase 2 gondola ride with views of Nanga Parbat',
        ticketCostINR: 1850
      },
      {
        name: 'Betaab Valley & Aru Valley, Pahalgam',
        description: 'Pristine pine valley bordered by the sparkling Lidder River and snow-capped peaks.',
        estimatedTime: 'Full day',
        highlight: 'Lidder river trout fishing and meadow horse trails',
        ticketCostINR: 200
      }
    ],
    recommendedExperiences: [
      'Savor warm Kashmiri Kahwa tea brewed with saffron strands, crushed almonds, and cardamom',
      'Indulge in a traditional Wazwan feast with Rogan Josh and Gushtaba',
      'Browse artisan Pashmina shawls and hand-knotted silk carpets directly from master weavers'
    ],
    localTransport: ['Pre-booked tourist registered taxis', 'Shikara boats across water channels', 'Ponies for mountain meadow trails'],
    culturalTips: [
      'Always accept Kahwa with both hands as a traditional gesture of warmth',
      'Verify government artisan GI tags on saffron and Pashmina purchases',
      'Keep valid government ID cards easily accessible for valley security checkpoints'
    ],
    packingSuggestions: ['Warm Pashmina or woollen wraps', 'Insulated boots', 'Moisturizer and sunscreen for high altitude UV', 'Power banks as battery drains faster in cold'],
    coordinates: { lat: 34.0837, lng: 74.7973 }
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    region: 'Rajasthan',
    country: 'India',
    isInternational: false,
    description: 'The iconic Pink City boasting majestic sandstone hill forts, ornate royal palaces, bustling gemstone bazaars, and rich Rajput culinary traditions.',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603288967912-349f8644e548?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80'
    ],
    categories: ['Historical Places', 'Food and Culture', 'Cities', 'Weekend Getaways'],
    estimatedDailyBudget: 2600,
    recommendedDuration: '3-4 Days',
    bestTimeToVisit: 'October to March',
    travelStyles: ['Cultural', 'Family', 'Weekend getaway', 'Backpacking'],
    attractions: [
      {
        name: 'Amer Fort & Sheesh Mahal',
        description: 'Imposing hill fort blending Rajput and Mughal architecture with stunning mirrored hall.',
        estimatedTime: '3-4 hours',
        highlight: 'Sheesh Mahal mirror reflections in candlelight',
        ticketCostINR: 100
      },
      {
        name: 'Hawa Mahal (Palace of Winds)',
        description: 'Honeycomb facade with 953 lattice windows crafted so royal women could observe street processions unobserved.',
        estimatedTime: '1.5 hours',
        highlight: 'Early morning golden-hour facade glow from rooftop cafes',
        ticketCostINR: 50
      },
      {
        name: 'City Palace & Jantar Mantar',
        description: 'Royal residence museum housing historic royal garments alongside the UNESCO World Heritage astronomical observatory.',
        estimatedTime: '3 hours',
        highlight: 'World’s largest stone sundial (Samrat Yantra)',
        ticketCostINR: 300
      },
      {
        name: 'Nahargarh Fort Sunset Point',
        description: 'Hilltop ramparts offering an epic 360-degree panorama of the Pink City lit up at night.',
        estimatedTime: '2 hours',
        highlight: 'Sunset view with Jaipur city lights turning on',
        ticketCostINR: 50
      }
    ],
    recommendedExperiences: [
      'Feast on traditional Dal Baati Churma with pure desi ghee and garlic chutney',
      'Hunt for blue pottery, block-printed quilt bedspreads, and handcrafted lac bangles in Johari Bazaar',
      'Take a sunrise hot air balloon flight over ancient forts'
    ],
    localTransport: ['E-rickshaws and auto-rickshaws inside walled city', 'Uber/Ola for longer fort commutes', 'Jaipur Metro for city segments'],
    culturalTips: [
      'Bargaining in traditional walled city bazaars is standard and done respectfully',
      'Wear slip-on shoes for frequent monument entries and temple visits',
      'Photography permits are included in monument composite tickets'
    ],
    packingSuggestions: ['Breathable cotton kurtas and tops', 'Sun hat and sunglasses', 'Comfortable walking sneakers for marble fort courtyards', 'Light evening stole'],
    coordinates: { lat: 26.9124, lng: 75.7873 }
  },
  {
    id: 'kerala',
    name: 'Kerala (Munnar & Alleppey)',
    region: 'South India',
    country: 'India',
    isInternational: false,
    description: 'God’s Own Country: emerald tea estates draping rolling Western Ghat hills, traditional kettuvallam houseboats gliding through palm-fringed lagoons, and Ayurvedic wellness retreats.',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    categories: ['Nature', 'Beaches', 'Food and Culture', 'Weekend Getaways'],
    estimatedDailyBudget: 3400,
    recommendedDuration: '5-7 Days',
    bestTimeToVisit: 'September to March (Monsoon Ayurvedic June-August)',
    travelStyles: ['Relaxation', 'Family', 'Romantic', 'Adventure'],
    attractions: [
      {
        name: 'Alleppey Backwaters Houseboat',
        description: 'Cruising through serene Vembanad Lake canals bordered by paddy fields and coconut groves.',
        estimatedTime: 'Overnight / Half Day',
        highlight: 'Fresh Karimeen Pollichathu fish prepared live onboard',
        ticketCostINR: 4500
      },
      {
        name: 'Munnar Tea Plantations & Eravikulam',
        description: 'Verdant green rolling hill carpets home to endangered Nilgiri Tahr and mist-covered tea factories.',
        estimatedTime: 'Full day',
        highlight: 'Trek to Anamudi peak viewpoint and tea tasting',
        ticketCostINR: 200
      },
      {
        name: 'Fort Kochi Heritage & Chinese Fishing Nets',
        description: 'Colonial port town with Dutch architecture, Jewish synagogue, spice markets, and cantilevered nets.',
        estimatedTime: '4 hours',
        highlight: 'Evening Kathakali and Kalaripayattu martial arts show',
        ticketCostINR: 400
      }
    ],
    recommendedExperiences: [
      'Relish a grand Kerala Sadya served on a fresh banana leaf with over 20 side dishes',
      'Rejuvenate with an authentic Abhyanga herbal oil Ayurvedic massage',
      'Canoe through narrow village backwater canals that houseboats cannot reach'
    ],
    localTransport: ['Private rental cab for Kochi-Munnar-Alleppey circuit', 'Government public water buses (only ₹15-20 per trip)', 'Auto rickshaws for town transit'],
    culturalTips: [
      'Show reverent appreciation for traditional Kathakali performers during their makeup transformation',
      'Support eco-tourism initiatives and avoid throwing trash in pristine backwater canals',
      'Tipping boat crew and homestay hosts is appreciated'
    ],
    packingSuggestions: ['Quick-dry light cottons', 'Mosquito repellent spray', 'Umbrella or light raincoat year-round', 'Slip-on sandals'],
    coordinates: { lat: 9.4981, lng: 76.3388 }
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    region: 'Uttarakhand',
    country: 'India',
    isInternational: false,
    description: 'The Yoga Capital of the World and adventure playground: white-water Ganges rafting, bungee jumping, peaceful cliffside ashrams, and the soul-stirring Ganga Aarti.',
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
    ],
    categories: ['Adventure', 'Religious and Spiritual Places', 'Mountains', 'Weekend Getaways'],
    estimatedDailyBudget: 2200,
    recommendedDuration: '3-4 Days',
    bestTimeToVisit: 'September to May',
    travelStyles: ['Adventure', 'Backpacking', 'Weekend getaway', 'Cultural'],
    attractions: [
      {
        name: 'Ganga White Water Rafting (Shivpuri to NIM Beach)',
        description: 'Exhilarating 16 km rapids like Roller Coaster, Golf Course, and Club House on the glacial Ganges.',
        estimatedTime: '3-4 hours',
        highlight: 'Cliff jumping and body surfing in crystal clear mountain water',
        ticketCostINR: 1000
      },
      {
        name: 'Triveni Ghat & Parmarth Niketan Ganga Aarti',
        description: 'Sacred evening ritual of brass lamps, Vedic chanting, and camphor flames illuminating the holy river.',
        estimatedTime: '2 hours',
        highlight: 'Floating marigold diya leaf boats into the twilight current',
        ticketCostINR: 0
      },
      {
        name: 'The Beatles Ashram (Chaurasi Kutia)',
        description: 'Forest ashram where The Beatles learned Transcendental Meditation in 1968, adorned with graffiti art and meditation domes.',
        estimatedTime: '2.5 hours',
        highlight: 'Graffiti hall and serene Rajaji National Park forest walking',
        ticketCostINR: 150
      }
    ],
    recommendedExperiences: [
      'Sunrise yoga and pranayama session on the pristine white sand banks of Tapovan',
      'Try India’s highest fixed platform bungee jump (83 meters) at Mohan Chatti',
      'Dine at open-air organic cafes overlooking the turquoise river with vegan smoothie bowls'
    ],
    localTransport: ['Rented scooters/motorbikes for Tapovan & laxman Jhula', 'Shared Vikram auto-rickshaws', 'Scenic pedestrian suspension bridges'],
    culturalTips: [
      'Rishikesh is an official holy city: meat and alcohol are strictly prohibited within city limits',
      'Maintain quiet meditation etiquette at active ashrams and ghats',
      'Watch out for mischievous rhesus monkeys on the suspension bridges'
    ],
    packingSuggestions: ['Quick-dry swim/active wear for rafting', 'Yoga trousers and modest tops', 'Teva/water sandals', 'Light fleece for riverside evenings'],
    coordinates: { lat: 30.0869, lng: 78.2676 }
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya (Shillong & Cherrapunji)',
    region: 'Northeast India',
    country: 'India',
    isInternational: false,
    description: 'The Abode of the Clouds: centuries-old bio-engineered living root bridges, crystal-clear Umngot River in Dawki, thundering waterfalls, and mystical limestone caves.',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    categories: ['Nature', 'Mountains', 'Adventure', 'Wildlife'],
    estimatedDailyBudget: 3100,
    recommendedDuration: '5-6 Days',
    bestTimeToVisit: 'October to May',
    travelStyles: ['Adventure', 'Backpacking', 'Weekend getaway', 'Romantic'],
    attractions: [
      {
        name: 'Double Decker Living Root Bridge, Nongriat',
        description: 'Trek down 3,500 stone steps to marvel at the rubber fig roots trained across streams over generations by Khasi tribes.',
        estimatedTime: 'Full day trek',
        highlight: 'Rainbow Falls natural turquoise swimming lagoon',
        ticketCostINR: 50
      },
      {
        name: 'Dawki (Umngot River) & Mawlynnong',
        description: 'Glass-clear emerald river where boats appear to float in mid-air, alongside Asia’s cleanest heritage village.',
        estimatedTime: 'Full day',
        highlight: 'Country boat ride looking straight down at the river bed pebbles',
        ticketCostINR: 800
      },
      {
        name: 'Nohkalikai Falls & Mawsmai Cave',
        description: 'India’s tallest plunge waterfall plunging 1,115 ft into a deep green pool, plus lit limestone stalactite cave exploration.',
        estimatedTime: '4 hours',
        highlight: 'Dramatically roaring canyon vista surrounded by shifting mist',
        ticketCostINR: 60
      }
    ],
    recommendedExperiences: [
      'Stroll through Shillong’s vibrant indie rock and cafe culture in Police Bazar and Laitumkhrah',
      'Taste Khasi delicacy Jadoh (rice cooked in aromatic meat broth) and bamboo shoot pickles',
      'Camp under starlit skies by the tranquil beaches of Shnongpdeng'
    ],
    localTransport: ['Hired tourist taxi from Guwahati / Shillong (essential for hilly route)', 'Shared Sumo jeeps for budget links'],
    culturalTips: [
      'Khasi society is matrilineal; show high respect to village women and matriarchs',
      'Strict zero-littering rules enforced by village councils in Mawlynnong and Dawki',
      'Always hire a local Khasi guide for deep cave spelunking'
    ],
    packingSuggestions: ['Sturdy trekking boots with deep rubber lugs', 'Rain poncho and waterproof backpack cover', 'Trekking pole for stone staircase steps', 'Cash in INR (remote ATMs are scarce)'],
    coordinates: { lat: 25.4670, lng: 91.3662 }
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    region: 'Maharashtra',
    country: 'India',
    isInternational: false,
    description: 'The City of Dreams: Victorian Gothic UNESCO railway terminus, sea-facing Marine Drive Queen’s Necklace, Bollywood magic, cutting-edge art galleries, and legendary street food.',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80'
    ],
    categories: ['Cities', 'Food and Culture', 'Historical Places', 'Weekend Getaways'],
    estimatedDailyBudget: 3500,
    recommendedDuration: '3-4 Days',
    bestTimeToVisit: 'November to February',
    travelStyles: ['Cultural', 'Weekend getaway', 'Luxury', 'Backpacking'],
    attractions: [
      {
        name: 'Gateway of India & Colaba Causeway',
        description: 'Colonial basalt arch overlooking Mumbai harbor, opposite the legendary Taj Mahal Palace Hotel.',
        estimatedTime: '3 hours',
        highlight: 'Ferry ride from Gateway jetty to ancient Elephanta rock-cut caves',
        ticketCostINR: 260
      },
      {
        name: 'Marine Drive & Chowpatty Beach',
        description: 'Iconic 3.6 km seaside promenade known as the Queen’s Necklace, perfect for sunset breezes and roasted corn.',
        estimatedTime: '2 hours',
        highlight: 'Chilled sea breeze with city skyline lights reflecting on the Arabian Sea',
        ticketCostINR: 0
      },
      {
        name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
        description: 'UNESCO World Heritage Victorian Gothic Revival railway terminus bustling with unmatched daily commuter energy.',
        estimatedTime: '1 hour',
        highlight: 'Stunning evening architectural illumination',
        ticketCostINR: 0
      }
    ],
    recommendedExperiences: [
      'Bite into a hot, crispy Vada Pav slathered with dry garlic thecha and green chilies',
      'Walk through the Kala Ghoda Art District and heritage Irani cafes for Bun Maska and Chai',
      'Watch Mumbai come alive on a dawn bicycle tour covering Sassoon Docks fish auction'
    ],
    localTransport: ['Black-and-yellow Padmini / Santro cabs (Kaali Peeli)', 'Mumbai Metro and Suburban Local Trains', 'Ola / Uber'],
    culturalTips: [
      'Avoid boarding suburban local trains during peak rush hours (8:30-10:30 AM & 6-8:30 PM)',
      'Respect heritage preservation rules at Victorian Gothic sites',
      'Street food vendors on major food khau gallis prepare fresh batches continuously'
    ],
    packingSuggestions: ['Breathable smart-casual clothes', 'Comfortable urban walking sneakers', 'Compact umbrella for monsoon', 'Small shoulder sling bag'],
    coordinates: { lat: 18.9220, lng: 72.8347 }
  },
  {
    id: 'bali',
    name: 'Bali',
    region: 'Bali Province',
    country: 'Indonesia',
    isInternational: true,
    description: 'Island of the Gods: emerald rice terraces of Tegallalang, sacred sea temples perched on cliff edges, world-class surf breaks, and serene holistic yoga sanctuaries.',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80'
    ],
    categories: ['Beaches', 'Nature', 'Food and Culture', 'Adventure'],
    estimatedDailyBudget: 4500,
    recommendedDuration: '6-8 Days',
    bestTimeToVisit: 'April to October',
    travelStyles: ['Relaxation', 'Adventure', 'Romantic', 'Backpacking'],
    attractions: [
      {
        name: 'Uluwatu Temple & Sunset Kecak Fire Dance',
        description: 'Ancient sea temple perched on a sheer 70-meter limestone cliff overlooking crashing waves.',
        estimatedTime: '3 hours',
        highlight: 'Hypnotic sunset Kecak choral chant performance',
        ticketCostINR: 850
      },
      {
        name: 'Ubud Monkey Forest & Tegallalang Rice Terraces',
        description: 'Sacred sanctuary with over 1,000 Balinese long-tailed macaques alongside tiered subak irrigation fields.',
        estimatedTime: 'Full day',
        highlight: 'Traditional bamboo jungle swings and organic coffee tasting',
        ticketCostINR: 500
      },
      {
        name: 'Nusa Penida Day Trip (Kelingking Beach)',
        description: 'Breathtaking T-Rex shaped coastal headland dropping straight into turquoise sapphire waters.',
        estimatedTime: 'Full day',
        highlight: 'Snorkeling with giant oceanic manta rays at Manta Point',
        ticketCostINR: 2800
      }
    ],
    recommendedExperiences: [
      'Sunrise hike up Mount Batur active volcano to watch the dawn break above cloud blankets',
      'Traditional Balinese spa treatment with flower petal bath and herbal scrub',
      'Feast on Nasi Campur and fresh coconut at beachfront sunset beach clubs'
    ],
    localTransport: ['Rented automatic scooters (Scoopy)', 'Grab / Gojek ride-hailing apps', 'Private day tour drivers'],
    culturalTips: [
      'Wear a traditional sarong and sash when entering Balinese Hindu temples (available at gates)',
      'Do not step on "Canang Sari" (woven palm leaf daily flower offerings) on sidewalks',
      'Visa on Arrival available for Indian passport holders with digital declaration'
    ],
    packingSuggestions: ['Modest temple scarf or sarong', 'Swimwear and rash guard', 'International driving permit if renting scooter', 'Universal power adapter (Type C/F)'],
    coordinates: { lat: -8.4095, lng: 115.1889 }
  },
  {
    id: 'dubai',
    name: 'Dubai',
    region: 'Emirate of Dubai',
    country: 'United Arab Emirates',
    isInternational: true,
    description: 'Futuristic desert metropolis: the soaring Burj Khalifa, mega malls with indoor ski slopes, golden desert dunes safari, and historic Al Fahidi heritage creeks.',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80'
    ],
    categories: ['Cities', 'Adventure', 'Food and Culture', 'Weekend Getaways'],
    estimatedDailyBudget: 8500,
    recommendedDuration: '4-5 Days',
    bestTimeToVisit: 'November to March',
    travelStyles: ['Luxury', 'Family', 'Cultural', 'Weekend getaway'],
    attractions: [
      {
        name: 'Burj Khalifa (At The Top) & Dubai Mall Fountains',
        description: 'World’s tallest architectural marvel standing at 828 meters with observation deck views across the Arabian Gulf.',
        estimatedTime: '3 hours',
        highlight: 'Evening choreographed musical fountain show',
        ticketCostINR: 3900
      },
      {
        name: 'Desert Safari with Dune Bashing & Bedouin Camp',
        description: '4x4 adventure tackling red sand dunes, camel rides, sandboarding, falconry, and barbecue dinner under stars.',
        estimatedTime: '6 hours',
        highlight: 'Sunset photos over rolling red desert ridges',
        ticketCostINR: 2800
      },
      {
        name: 'Museum of the Future & Old Dubai Abra Creek',
        description: 'Torus-shaped calligraphy architectural wonder contrasted with historic wooden abra boat crossing (1 AED).',
        estimatedTime: '4 hours',
        highlight: 'Gold Souk and Spice Souk bargaining in Deira',
        ticketCostINR: 3400
      }
    ],
    recommendedExperiences: [
      'Take a private luxury yacht cruise around Dubai Marina and Palm Jumeirah at golden hour',
      'Sample authentic Shawarma, hummus, and Karak chai in Old Deira',
      'Skyline dining with view of illuminated Burj Al Arab sail'
    ],
    localTransport: ['World-class Dubai Metro (Nol card)', 'Dubai Taxi Corporation (metered)', 'Careem and Uber apps'],
    culturalTips: [
      'Dress modestly in government buildings, heritage sites, and family shopping malls',
      'Public transport is strictly governed (no chewing gum or eating on metro trains)',
      'Tipping 10-15% is standard practice in restaurants'
    ],
    packingSuggestions: ['Breathable summer attire + light evening jacket for air-conditioned indoors', 'Sunglasses and high SPF sunscreen', 'Comfortable footwear for expansive malls'],
    coordinates: { lat: 25.2048, lng: 55.2708 }
  },
  {
    id: 'thailand',
    name: 'Thailand (Bangkok & Phuket)',
    region: 'Southeast Asia',
    country: 'Thailand',
    isInternational: true,
    description: 'The Land of Smiles: golden Buddhist temples, legendary street food night markets, limestone karst sea cliffs in Phang Nga Bay, and vibrant tropical nightlife.',
    heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80'
    ],
    categories: ['Beaches', 'Food and Culture', 'Cities', 'Adventure'],
    estimatedDailyBudget: 4200,
    recommendedDuration: '6-8 Days',
    bestTimeToVisit: 'November to early April',
    travelStyles: ['Backpacking', 'Family', 'Relaxation', 'Weekend getaway'],
    attractions: [
      {
        name: 'The Grand Palace & Wat Pho',
        description: 'Splendid ceremonial royal complex with the Emerald Buddha and the colossal 46-meter Reclining Buddha.',
        estimatedTime: '4 hours',
        highlight: 'Mother-of-pearl inlay feet of the Reclining Buddha',
        ticketCostINR: 1300
      },
      {
        name: 'Phi Phi Islands & Maya Bay Speedboat Tour',
        description: 'Iconic limestone cliffs surrounding crystal turquoise lagoon, snorkeling over coral reefs.',
        estimatedTime: 'Full day',
        highlight: 'Snorkeling with clownfish and sea turtles',
        ticketCostINR: 3200
      },
      {
        name: 'Chatuchak Weekend Market & Jodd Fairs Night Market',
        description: 'Vast open-air marketplace with over 15,000 stalls offering fashion, crafts, and delectable street bites.',
        estimatedTime: '4 hours',
        highlight: 'Mango sticky rice and volcanic spicy ribs',
        ticketCostINR: 0
      }
    ],
    recommendedExperiences: [
      'Indulge in a traditional Thai foot and body massage (Nuad Thai) after long days of exploring',
      'Hop on a long-tail boat through Bangkok’s Chao Phraya river canals (Khlongs)',
      'Watch a sunset fire show on the white sands of Patong or Kata Beach'
    ],
    localTransport: ['Bangkok BTS Skytrain & MRT subway', 'Grab app ride-hailing', 'Longtail water taxis', 'Tuk-tuks (negotiate fare upfront)'],
    culturalTips: [
      'Always dress respectfully (covered shoulders and knees) at all Buddhist temples',
      'Never touch anyone’s head or point your feet directly at a Buddha image or person',
      'Visa exemption / easy e-Visa available for Indian tourists'
    ],
    packingSuggestions: ['Slip-on shoes for temple hopping', 'Light breezy cotton or linen garments', 'Waterproof phone pouch for boat tours', 'Insect repellent'],
    coordinates: { lat: 13.7563, lng: 100.5018 }
  },
  {
    id: 'switzerland',
    name: 'Switzerland (Interlaken & Lucerne)',
    region: 'Bernese Oberland',
    country: 'Switzerland',
    isInternational: true,
    description: 'Fairy-tale Alpine wonderland: the snow-crowned Jungfraujoch "Top of Europe", glass-like mountain lakes Thun and Brienz, Swiss rail journeys, and world-famous chocolate and cheese.',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    categories: ['Mountains', 'Nature', 'Cities', 'Adventure'],
    estimatedDailyBudget: 14000,
    recommendedDuration: '6-8 Days',
    bestTimeToVisit: 'May to October (or Dec-March for skiing)',
    travelStyles: ['Luxury', 'Romantic', 'Family', 'Adventure'],
    attractions: [
      {
        name: 'Jungfraujoch — Top of Europe',
        description: 'Cognitive high-altitude railway station at 3,454 meters with panoramic ice palace and Aletsch Glacier overlook.',
        estimatedTime: 'Full day',
        highlight: 'Alpine sensation walk and walking inside a glacier ice cave',
        ticketCostINR: 18000
      },
      {
        name: 'Lake Lucerne & Chapel Bridge (Kapellbrücke)',
        description: 'Medieval 14th-century covered wooden footbridge with painted interior panels, framed by Mount Pilatus.',
        estimatedTime: 'Half day',
        highlight: 'Vintage paddle-steamer lake cruise',
        ticketCostINR: 2500
      },
      {
        name: 'Lauterbrunnen Valley of 72 Waterfalls',
        description: 'Dramatic glacial valley flanked by vertical cliff walls with Staubbach Falls tumbling right into the village.',
        estimatedTime: '4 hours',
        highlight: 'Inspiration behind Tolkien’s Rivendell and gentle alpine walking trail',
        ticketCostINR: 0
      }
    ],
    recommendedExperiences: [
      'Indulge in a hot pot of authentic Swiss Gruyère cheese fondue with rustic bread in an alpine chalet',
      'Experience the Glacier Express or GoldenPass scenic panoramic train ride',
      'Visit a traditional Lindt or artisanal chocolatier for handcrafted truffles'
    ],
    localTransport: ['Swiss Travel Pass (covers all trains, buses, boats, and mountain discounts)', 'SBB rail network (impeccable punctuality)'],
    culturalTips: [
      'Trains depart with absolute second-by-second precision; arrive at platforms early',
      'Tap water from public fountains is pure Alpine spring water and 100% drinkable',
      'Sunday is a quiet rest day with most retail shops closed'
    ],
    packingSuggestions: ['High quality windproof thermal winter jacket', 'Comfortable waterproof trekking shoes', 'Layerable merino wool inners', 'Universal plug adapter (Swiss 3-pin Type J)'],
    coordinates: { lat: 46.6863, lng: 7.8632 }
  }
];
