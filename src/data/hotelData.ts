export interface RoomItem {
  id: string;
  name: string;
  category: 'private' | 'family' | 'dorm';
  categoryLabel: string;
  pricePerNight: number;
  originalPrice?: number;
  sizeSqm: number;
  maxGuests: number;
  bedConfig: string;
  image: string;
  shortDesc: string;
  facilities: string[];
  cancellation: string;
}

export interface OfferPackage {
  id: string;
  code: string;
  typeLabel: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  minStayNights: number;
  occupancyLimit: string;
  validUntil: string;
  conditions: string;
  includedBenefits: string[];
  ctaText: string;
  available: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  companyOrOrigin: string;
  serviceCategory: string;
  rating: number;
  verified: boolean;
  quote: string;
  stayOrProjectDate: string;
  initials: string;
  avatarBg: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Suites' | 'Social Spaces' | 'Family Rooms' | 'Terrace & Views';
  caption: string;
  image: string;
  aspect: string;
}

export const HOTEL_INFO = {
  name: 'TOC Hostel Madrid',
  address: 'Pl. de Celenque, 3, Centro, 28013 Madrid, Spain',
  phoneDisplay: '+34 915 32 13 04',
  phoneClean: '34915321304',
  whatsappUrl: 'https://wa.me/34915321304',
  email: 'madrid@tochostels.com',
  checkIn: '15:00',
  checkOut: '11:00',
  googleReviewsUrl:
    'https://www.google.com/maps/search/?api=1&query=TOC+Hostel+Madrid+Pl.+de+Celenque+3+28013+Madrid+Spain',
  trustpilotUrl: 'https://www.trustpilot.com/search?query=TOC+Hostel+Madrid',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=TOC%20Hostel%20Madrid,%20Pl.%20de%20Celenque,%203,%20Centro,%2028013%20Madrid,%20Spain&t=&z=16&ie=UTF8&iwloc=&output=embed',
  heroVideoUrl:
    'https://res.cloudinary.com/k7og2ybq/video/upload/v1793007379/hero-background.mp4.mp4',
};

export const IMAGES = {
  hero: '/src/assets/images/hero_toc_madrid_1793004517903.jpg',
  privateSuite: '/src/assets/images/room_private_suite_1793004518155.jpg',
  familyQuad: '/src/assets/images/room_family_quad_1793004520045.jpg',
  deluxePenthouse: '/src/assets/images/room_deluxe_penthouse_1793004520664.jpg',
  loungeBar: '/src/assets/images/gallery_lounge_bar_1793004520487.jpg',
  biometricLock: '/src/assets/images/facility_biometric_lock_1793005156315.jpg',
  coworkingAtrium: '/src/assets/images/facility_coworking_atrium_1793005157311.jpg',
  kitchenCinema: '/src/assets/images/facility_kitchen_cinema_1793005158515.jpg',
  madridCentro: '/src/assets/images/facility_madrid_centro_1793005158506.jpg',
};

export const ROOMS_DATA: RoomItem[] = [
  {
    id: 'superior-double-suite',
    name: 'Superior Private Double Suite',
    category: 'private',
    categoryLabel: 'Private Suite',
    pricePerNight: 118,
    originalPrice: 138,
    sizeSqm: 24,
    maxGuests: 2,
    bedConfig: '1 Queen Bed (Organic Cotton Linens)',
    image: IMAGES.privateSuite,
    shortDesc:
      'Soundproofed private suite overlooking Plaza de Celenque with custom oak cabinetry, French balcony windows, and biometric fingertip lock access.',
    facilities: [
      'Fingerprint Keyless Entry',
      'Private En-Suite Rain Shower',
      'French Balcony View',
      'High-Speed Wi-Fi 6',
      'Smart TV & Work Desk',
      'Espresso Machine',
    ],
    cancellation: 'Free cancellation up to 48 hours before check-in',
  },
  {
    id: 'deluxe-rooftop-terrace',
    name: 'Deluxe Penthouse Terrace Suite',
    category: 'private',
    categoryLabel: 'Penthouse Suite',
    pricePerNight: 165,
    originalPrice: 195,
    sizeSqm: 34,
    maxGuests: 2,
    bedConfig: '1 King Bed + Private Outdoor Lounge Terrace',
    image: IMAGES.deluxePenthouse,
    shortDesc:
      'Top-floor sanctuary featuring an expansive private wooden terrace with views across historic central Madrid rooftops near Puerta del Sol.',
    facilities: [
      'Private Furnished Terrace',
      'King Plush Mattress',
      'Fingerprint Keyless Entry',
      'Complimentary Mini-Bar',
      'Luxury Bathrobe & Amenities',
      'Late Check-Out Priority',
    ],
    cancellation: 'Free cancellation up to 48 hours before check-in',
  },
  {
    id: 'family-quad-suite',
    name: 'Family & Friends Quadruple Suite',
    category: 'family',
    categoryLabel: 'Family & Group',
    pricePerNight: 154,
    originalPrice: 180,
    sizeSqm: 36,
    maxGuests: 4,
    bedConfig: '4 Custom Architectural Timber Bunk Beds',
    image: IMAGES.familyQuad,
    shortDesc:
      'Designed for families or small groups of four seeking privacy and style in Madrid Centro, featuring bespoke oak beds, private bath, and lounge area.',
    facilities: [
      'Sleeps Up to 4 Guests',
      'Private Dual-Sink Bathroom',
      'Individual Reading Lamps & Safes',
      'Fingerprint Keyless Entry',
      'Seating Lounge Nook',
      'High-Speed Wi-Fi 6',
    ],
    cancellation: 'Free cancellation up to 72 hours before check-in',
  },
  {
    id: 'six-bed-design-suite',
    name: '6-Bed Boutique Shared Design Suite',
    category: 'dorm',
    categoryLabel: 'Design Dorm',
    pricePerNight: 39,
    originalPrice: 46,
    sizeSqm: 42,
    maxGuests: 1,
    bedConfig: '1 Custom Privacy Pod Bed in 6-Bed Suite',
    image: IMAGES.loungeBar,
    shortDesc:
      'Elevated boutique hostel living with acoustic privacy curtains, personal biometric locker, USB-C charging station, and en-suite bathroom.',
    facilities: [
      'Biometric Under-Bed Locker',
      'En-Suite Bathroom Inside Room',
      'Privacy Curtain & Reading Light',
      'Fresh Towels & Linens Included',
      '24/7 Social Atrium Access',
      'High-Speed Wi-Fi 6',
    ],
    cancellation: 'Flexible 24-hour modification policy',
  },
];

export const OFFERS_DATA: OfferPackage[] = [
  {
    id: 'weekend-getaway',
    code: 'A. Weekend Getaway',
    typeLabel: 'Friday – Sunday Stay',
    title: 'Madrid Centro Weekend Escape',
    subtitle: 'Two nights steps away from Puerta del Sol, Plaza Mayor, and Royal Palace.',
    description:
      'Unwind in a Superior Private Double Suite with daily Mediterranean buffet breakfast, welcome Spanish tapas & sangria at the TOC Bar, and guaranteed 13:00 late check-out on Sunday.',
    image: IMAGES.privateSuite,
    originalPrice: 276,
    discountedPrice: 229,
    discountPercent: 17,
    minStayNights: 2,
    occupancyLimit: 'Up to 2 Adults (Private Suite)',
    validUntil: 'Valid through December 31, 2026',
    conditions: 'Valid for Friday and Saturday check-ins. Free date changes up to 48h prior.',
    includedBenefits: [
      '2 Nights in Superior Private Suite',
      'Daily Buffet Breakfast for 2',
      'Welcome Tapas & Drink at TOC Bar',
      'Guaranteed 13:00 Late Check-Out',
    ],
    ctaText: 'Explore Offer',
    available: true,
  },
  {
    id: 'extended-stay',
    code: 'B. Extended Stay Package',
    typeLabel: 'Minimum 4 Nights',
    title: 'Longer Madrid Stay & Remote Work Rate',
    subtitle: 'Special reduced nightly rates for guests staying 4+ nights in central Madrid.',
    description:
      'Ideal for slow travellers and cultural explorers. Enjoy 22% off standard nightly rates, unlimited access to the sunlit co-working atrium, complimentary laundry credits, and daily housekeeping.',
    image: IMAGES.hero,
    originalPrice: 472,
    discountedPrice: 368,
    discountPercent: 22,
    minStayNights: 4,
    occupancyLimit: '1–2 Guests (Private Suite or Design Pod)',
    validUntil: 'Available Year-Round (Subject to Allocation)',
    conditions: 'Minimum 4 consecutive nights required. Partial refund up to 72h before arrival.',
    includedBenefits: [
      '22% Verified Multi-Night Rate Reduction',
      '24/7 High-Speed Fiber Co-Working Access',
      '2 Complimentary Laundry Tokens',
      'Daily Artisan Coffee Voucher',
    ],
    ctaText: 'View Package',
    available: true,
  },
  {
    id: 'romantic-stay',
    code: 'C. Romantic Stay Package',
    typeLabel: 'Couples Experience',
    title: 'Rooftop Sunset & Private Terrace Retreat',
    subtitle: 'Intimate celebration in our top-floor Deluxe Penthouse Terrace Suite.',
    description:
      'Celebrate a special occasion overlooking Madrid’s historic domes. Includes a chilled bottle of Spanish Cava on arrival, bespoke floral room accents, breakfast in bed or on the terrace, and 14:00 late check-out.',
    image: IMAGES.deluxePenthouse,
    originalPrice: 390,
    discountedPrice: 325,
    discountPercent: 17,
    minStayNights: 2,
    occupancyLimit: '2 Adults (Deluxe Terrace Suite)',
    validUntil: 'Valid All Week · Advance Reservation Required',
    conditions: '48-hour advance notice required for room preparation and Cava service.',
    includedBenefits: [
      'Private Rooftop Terrace Suite',
      'Chilled Bottle of Reserva Cava & Artisan Chocolates',
      'Continental Breakfast Served on Terrace',
      'Priority 14:00 Late Check-Out',
    ],
    ctaText: 'Discover Package',
    available: true,
  },
  {
    id: 'family-stay',
    code: 'D. Family Stay Package',
    typeLabel: 'Families & Groups of 4',
    title: 'Madrid Family & Friends Quad Adventure',
    subtitle: 'Private 4-bed architectural suite with breakfast and museum pass assistance.',
    description:
      'Keep the whole family together in our spacious 36 m² Quadruple Suite. Features four bespoke solid-oak beds, a private dual-sink bathroom, kids-eat-free breakfast benefit (under 12), and shared kitchen access.',
    image: IMAGES.familyQuad,
    originalPrice: 360,
    discountedPrice: 298,
    discountPercent: 17,
    minStayNights: 2,
    occupancyLimit: 'Up to 4 Guests (Adults & Children)',
    validUntil: 'Valid for School Holidays & Weekends 2026',
    conditions: 'Price shown for 2 nights for up to 4 guests in a Private Quadruple Suite.',
    includedBenefits: [
      'Private 4-Bed Family Suite (36 m²)',
      'Complimentary Breakfast for Children Under 12',
      'Access to Guest Kitchen & Game Lounge',
      'Early Baggage Drop & Lockers Included',
    ],
    ctaText: 'Explore Family Offer',
    available: true,
  },
  {
    id: 'business-stay',
    code: 'E. Business Stay Package',
    typeLabel: 'Corporate & Solo Executive',
    title: 'Executive Centro Work & Stay Pass',
    subtitle: 'Quiet private suite with ergonomic desk, fiber Wi-Fi, and express breakfast.',
    description:
      'Located 2 minutes from Sol Metro & Cercanías station for direct airport and Chamartín rail access. Includes a quiet courtyard-facing Private Suite, early 07:00 express breakfast, and meeting table booking.',
    image: IMAGES.loungeBar,
    originalPrice: 138,
    discountedPrice: 112,
    discountPercent: 19,
    minStayNights: 1,
    occupancyLimit: '1 Adult (Single Corporate Occupancy)',
    validUntil: 'Monday – Thursday Corporate Stays',
    conditions: 'Includes automated VAT invoice generation at check-out.',
    includedBenefits: [
      'Quiet Courtyard-Facing Private Suite',
      'Dedicated 600 Mbps Symmetric Wi-Fi',
      'Early 07:00 Express Breakfast & Espresso',
      'Complimentary garment steamer & printing',
    ],
    ctaText: 'Book Business Stay',
    available: true,
  },
  {
    id: 'seasonal-special',
    code: 'F. Seasonal Special Offers',
    typeLabel: 'Autumn / Winter 2026 Promotion',
    title: 'Madrid Golden Season Cultural Package',
    subtitle: '3 nights for the price of 2.5 during Madrid’s premier autumn exhibition season.',
    description:
      'Experience the Prado, Reina Sofía, and Gran Vía theatres at the most pleasant time of year. Book 3 consecutive nights in any room category and receive a verified 15% seasonal discount plus welcome churros con chocolate.',
    image: IMAGES.hero,
    originalPrice: 354,
    discountedPrice: 299,
    discountPercent: 15,
    minStayNights: 3,
    occupancyLimit: '1–4 Guests (All Room Categories)',
    validUntil: 'Valid October 15 – December 20, 2026',
    conditions: 'Subject to seasonal room allocation. Direct website or WhatsApp bookings only.',
    includedBenefits: [
      '3 Nights Stay with 15% Seasonal Reduction',
      'Traditional Madrileño Welcome Voucher',
      'Fingerprint Keyless Access & Late Luggage Storage',
      'No Hidden Booking Fees',
    ],
    ctaText: 'Claim Seasonal Offer',
    available: true,
  },
];

export const RATING_BREAKDOWN = {
  overallRating: 4.9,
  totalReviews: 2840,
  googleRating: 4.8,
  googleCount: 1920,
  trustpilotRating: 4.9,
  trustpilotCount: 920,
  stars: [
    { star: 5, percent: 86, count: 2442 },
    { star: 4, percent: 10, count: 284 },
    { star: 3, percent: 3, count: 85 },
    { star: 2, percent: 1, count: 29 },
    { star: 1, percent: 0, count: 0 },
  ],
};

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'rev-1',
    name: 'Elena Rostova',
    role: 'Creative Director & Hospitality Reviewer',
    companyOrOrigin: 'Studio Nord · Berlin',
    serviceCategory: 'Boutique Suite & Interior Architecture',
    rating: 5,
    verified: true,
    quote:
      'TOC Hostel Madrid redefines what a central Madrid stay looks like. Our Superior Private Suite at Plaza de Celenque was quieter and better designed than many 4-star hotels, and the fingerprint entry meant never worrying about keycards.',
    stayOrProjectDate: 'October 2026',
    initials: 'ER',
    avatarBg: 'bg-indigo-950 text-indigo-100',
  },
  {
    id: 'rev-2',
    name: 'Marcus Vance',
    role: 'Head of Digital Product',
    companyOrOrigin: 'Vance Interactive · London',
    serviceCategory: 'Website UX & Direct Booking Experience',
    rating: 5,
    verified: true,
    quote:
      'From the seamless online booking interface and instant WhatsApp concierge response to our check-in at Plaza de Celenque 3, every touchpoint felt effortless. The co-working bar speed and ambiance are unmatched in Madrid Centro.',
    stayOrProjectDate: 'September 2026',
    initials: 'MV',
    avatarBg: 'bg-purple-950 text-purple-100',
  },
  {
    id: 'rev-3',
    name: 'Sofía Mendoza',
    role: 'Founder & Brand Strategist',
    companyOrOrigin: 'Atelier Mendoza · Barcelona',
    serviceCategory: 'Family Quad Suite & Brand Identity',
    rating: 5,
    verified: true,
    quote:
      'We booked the Family Quadruple Suite for four adults during Madrid Design Week. The custom timber beds, generous storage, and two-minute walk to Puerta del Sol made it our favorite hospitality discovery in Spain.',
    stayOrProjectDate: 'October 2026',
    initials: 'SM',
    avatarBg: 'bg-slate-900 text-slate-100',
  },
  {
    id: 'rev-4',
    name: 'Lucas Meyer',
    role: 'Senior E-Commerce Architect',
    companyOrOrigin: 'Kraft Commerce · Zurich',
    serviceCategory: 'Executive Business Package & Speed',
    rating: 5,
    verified: true,
    quote:
      'Stayed four nights on the Extended Stay & Remote Work package. 600 Mbps Wi-Fi held up through back-to-back video calls, and stepping right out into Plaza Mayor for evening tapas was extraordinary.',
    stayOrProjectDate: 'August 2026',
    initials: 'LM',
    avatarBg: 'bg-amber-950 text-amber-100',
  },
  {
    id: 'rev-5',
    name: 'Claire Dubois',
    role: 'Digital Marketing Lead',
    companyOrOrigin: 'Lumière Media · Paris',
    serviceCategory: 'Romantic Rooftop Terrace Package',
    rating: 5,
    verified: true,
    quote:
      'The Deluxe Penthouse Terrace Suite overlooking Madrid rooftops at dusk is pure magic. Having chilled Cava waiting on arrival and late check-out arranged via WhatsApp made our anniversary unforgettable.',
    stayOrProjectDate: 'September 2026',
    initials: 'CD',
    avatarBg: 'bg-emerald-950 text-emerald-100',
  },
  {
    id: 'rev-6',
    name: 'David Alverez',
    role: 'Full-Stack Engineering Manager',
    companyOrOrigin: 'Nexa Cloud · Madrid',
    serviceCategory: 'Group Events & Social Lounge',
    rating: 5,
    verified: true,
    quote:
      'We hosted our visiting international engineering team at TOC Hostel Madrid. Between the spotless private suites, 24/7 reception at Pl. de Celenque 3, and transparent group rates, our team rated it 10/10.',
    stayOrProjectDate: 'October 2026',
    initials: 'DA',
    avatarBg: 'bg-stone-900 text-stone-100',
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Plaza de Celenque Courtyard & Lobby',
    category: 'Social Spaces',
    caption: 'Warm architectural reception and sunlit inner courtyard at Pl. de Celenque, 3.',
    image: IMAGES.hero,
    aspect: 'col-span-1 md:col-span-2',
  },
  {
    id: 'gal-2',
    title: 'Superior Private Double Suite',
    category: 'Suites',
    caption: 'Soundproofed French balcony windows overlooking historic central Madrid.',
    image: IMAGES.privateSuite,
    aspect: 'col-span-1',
  },
  {
    id: 'gal-3',
    title: 'Deluxe Penthouse Rooftop Terrace',
    category: 'Terrace & Views',
    caption: 'Private evening lounge terrace with panoramic views toward Gran Vía and Royal Palace.',
    image: IMAGES.deluxePenthouse,
    aspect: 'col-span-1',
  },
  {
    id: 'gal-4',
    title: 'Artisanal Café Bar & Co-Working Atrium',
    category: 'Social Spaces',
    caption: 'Terrazzo bar counter, specialty espresso, craft cocktails, and high-speed workspaces.',
    image: IMAGES.loungeBar,
    aspect: 'col-span-1 md:col-span-2',
  },
  {
    id: 'gal-5',
    title: 'Family & Friends Quadruple Suite',
    category: 'Family Rooms',
    caption: 'Custom solid-oak quadruple suite sleeping up to 4 guests in complete privacy.',
    image: IMAGES.familyQuad,
    aspect: 'col-span-1',
  },
  {
    id: 'gal-6',
    title: '01. Biometric Fingerprint Suite Access',
    category: 'Suites',
    caption: 'Keyless biometric fingerprint lock on every suite door and personal locker.',
    image: IMAGES.biometricLock,
    aspect: 'col-span-1',
  },
  {
    id: 'gal-7',
    title: '03. 600 Mbps Fiber Co-Working Atrium',
    category: 'Social Spaces',
    caption: 'Sunlit oak work tables, universal outlets, and acoustic seating.',
    image: IMAGES.coworkingAtrium,
    aspect: 'col-span-1',
  },
  {
    id: 'gal-8',
    title: '05. Guest Chef Kitchen & Cinema Zone',
    category: 'Social Spaces',
    caption: 'Marble communal kitchen island, billiards table, and cinema lounge.',
    image: IMAGES.kitchenCinema,
    aspect: 'col-span-1',
  },
  {
    id: 'gal-9',
    title: '06. Prime Madrid Centro Walkability',
    category: 'Terrace & Views',
    caption: '2 minutes on foot from Pl. de Celenque, 3 to Puerta del Sol and Plaza Mayor.',
    image: IMAGES.madridCentro,
    aspect: 'col-span-1 md:col-span-2',
  },
];

export const OFFERS_FAQ = [
  {
    question: 'How do I book a Special Offer or Package at TOC Hostel Madrid?',
    answer:
      'Click the button on any offer card to open the instant reservation drawer with the package pre-selected, or click "Inquire via WhatsApp" to message our 24/7 reception team directly at +34 915 32 13 04.',
  },
  {
    question: 'What is the cancellation and date-modification policy for packages?',
    answer:
      'All direct website and WhatsApp package bookings include free date modifications and cancellation up to 48 hours prior to check-in (72 hours for Family Quad and Extended Stay packages).',
  },
  {
    question: 'Are taxes and fingerprint locker access included in the displayed prices?',
    answer:
      'Yes. All displayed package and room rates include 10% Spanish hospitality VAT, biometric fingerprint room & locker security, high-speed Wi-Fi 6, and linens/towels.',
  },
  {
    question: 'Can I combine a seasonal discount with an extended stay package?',
    answer:
      'Each package already reflects our highest verified direct-booking discount (15% to 22% off standard nightly rates). For groups of 8+ guests, contact us on WhatsApp (+34 915 32 13 04) for bespoke group rates.',
  },
];
