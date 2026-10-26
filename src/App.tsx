/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  Users,
  Check,
  ArrowRight,
  ExternalLink,
  X,
  Mail,
  Clock,
  FileText,
  Maximize2,
} from 'lucide-react';
import {
  HOTEL_INFO,
  IMAGES,
  ROOMS_DATA,
  GALLERY_DATA,
  RoomItem,
  OfferPackage,
  GalleryItem,
} from './data/hotelData';
import { ResilientImage } from './components/ResilientImage';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { ReviewsAndRatingsSection } from './components/ReviewsAndRatingsSection';
import { PromptModal } from './components/PromptModal';

type PageRoute = 'home' | 'rooms' | 'offers' | 'reviews-location';

interface BookingModalState {
  isOpen: boolean;
  title: string;
  subtitle: string;
  pricePerUnit: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function App() {
  const [activePage, setActivePage] = useState<PageRoute>('home');
  const [roomCategoryFilter, setRoomCategoryFilter] = useState<'all' | 'private' | 'family' | 'dorm'>('all');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  // Hero Booking Bar State
  const [heroCheckIn, setHeroCheckIn] = useState('2026-11-06');
  const [heroCheckOut, setHeroCheckOut] = useState('2026-11-09');
  const [heroGuests, setHeroGuests] = useState(2);
  const [heroRoomId, setHeroRoomId] = useState(ROOMS_DATA[0].id);

  // Interactive Booking Modal State
  const [bookingModal, setBookingModal] = useState<BookingModalState>({
    isOpen: false,
    title: '',
    subtitle: '',
    pricePerUnit: 118,
    checkIn: '2026-11-06',
    checkOut: '2026-11-09',
    guests: 2,
  });
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Contact Inquiry State (Page 4 & Home Section 6)
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  const navigateTo = (page: PageRoute) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openRoomBooking = (room: RoomItem) => {
    setBookingConfirmed(false);
    setBookingError('');
    setBookingModal({
      isOpen: true,
      title: room.name,
      subtitle: `${room.categoryLabel} · ${room.sizeSqm} m² · Up to ${room.maxGuests} Guests`,
      pricePerUnit: room.pricePerNight,
      checkIn: heroCheckIn,
      checkOut: heroCheckOut,
      guests: Math.min(heroGuests, room.maxGuests),
    });
  };

  const openOfferBooking = (
    offer: OfferPackage,
    checkIn = heroCheckIn,
    checkOut = heroCheckOut,
    guests = heroGuests
  ) => {
    setBookingConfirmed(false);
    setBookingError('');
    setBookingModal({
      isOpen: true,
      title: `${offer.title} (${offer.code})`,
      subtitle: `${offer.typeLabel} · ${offer.occupancyLimit}`,
      pricePerUnit: offer.discountedPrice,
      checkIn,
      checkOut,
      guests,
    });
  };

  const handleConfirmBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.includes('@') || guestPhone.trim().length < 6) {
      setBookingError('Please enter your full name, a valid email address, and phone number.');
      return;
    }
    setBookingError('');
    setBookingConfirmed(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.includes('@') || !contactMessage.trim()) {
      setContactError('Please provide your name, valid email, and inquiry details.');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  const filteredRooms = ROOMS_DATA.filter((r) =>
    roomCategoryFilter === 'all' ? true : r.category === roomCategoryFilter
  );

  const filteredGallery = GALLERY_DATA.filter((g) =>
    galleryCategoryFilter === 'All' ? true : g.category === galleryCategoryFilter
  );

  const getDirectWhatsAppUrl = (customText?: string) => {
    const message =
      customText ||
      `Hola TOC Hostel Madrid! I would like to book a stay at ${HOTEL_INFO.address}. Check-in: ${heroCheckIn}, Check-out: ${heroCheckOut}, Guests: ${heroGuests}.`;
    return `https://wa.me/${HOTEL_INFO.phoneClean}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/90">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-4">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => navigateTo('home')}
            className="text-xl font-bold tracking-tight text-stone-900 font-serif-display whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            TOC Hostel Madrid
          </button>

          {/* Zone 2: 4 concise single-line text navigation links (4 Separate Pages) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => navigateTo('home')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
                activePage === 'home'
                  ? 'text-stone-900 border-b-2 border-amber-700 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('rooms')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
                activePage === 'rooms'
                  ? 'text-stone-900 border-b-2 border-amber-700 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Rooms & Suites
            </button>
            <button
              onClick={() => navigateTo('offers')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
                activePage === 'offers'
                  ? 'text-stone-900 border-b-2 border-amber-700 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Offers & Packages
            </button>
            <button
              onClick={() => navigateTo('reviews-location')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
                activePage === 'reviews-location'
                  ? 'text-stone-900 border-b-2 border-amber-700 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Reviews & Location
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <a
              href={getDirectWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Booking</span>
            </a>
          </div>
        </div>

        {/* Mobile 4-Page Route Switcher Bar */}
        <div className="md:hidden flex items-center justify-around border-t border-stone-200 bg-white px-2 py-2 text-xs font-medium">
          <button
            onClick={() => navigateTo('home')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 ${
              activePage === 'home' ? 'bg-stone-900 text-white' : 'text-stone-600'
            }`}
          >
            1. Home
          </button>
          <button
            onClick={() => navigateTo('rooms')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 ${
              activePage === 'rooms' ? 'bg-stone-900 text-white' : 'text-stone-600'
            }`}
          >
            2. Rooms
          </button>
          <button
            onClick={() => navigateTo('offers')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 ${
              activePage === 'offers' ? 'bg-stone-900 text-white' : 'text-stone-600'
            }`}
          >
            3. Offers
          </button>
          <button
            onClick={() => navigateTo('reviews-location')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 ${
              activePage === 'reviews-location' ? 'bg-stone-900 text-white' : 'text-stone-600'
            }`}
          >
            4. Reviews & Map
          </button>
        </div>
      </header>

      {/* =====================================================================
          PAGE 1: HOME / LANDING PAGE (EXACTLY 6 STRUCTURED LUXURY SECTIONS)
         ===================================================================== */}
      {activePage === 'home' && (
        <main className="flex-1 space-y-24 pb-20">
          {/* SECTION 1 OF 6: HERO SHOWCASE & DIRECT BOOKING BAR */}
          <section className="pt-6 sm:pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 6 Cols: Editorial Proposition */}
              <div className="lg:col-span-6 flex flex-col justify-between py-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-800 mb-4">
                    <span>Pl. de Celenque, 3 · Centro, 28013 Madrid</span>
                    <span aria-hidden="true">·</span>
                    <span>Tel: {HOTEL_INFO.phoneDisplay}</span>
                  </div>

                  <h1
                    className="font-serif-display font-semibold text-stone-900 tracking-tight leading-[1.08]"
                    style={{
                      fontSize: 'clamp(2.35rem, 4vw, 3.75rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Contemporary Spanish Luxury in the Heart of Historic Madrid.
                  </h1>

                  <p className="mt-5 text-stone-600 text-base leading-relaxed max-w-xl">
                    Steps away from Puerta del Sol and Plaza Mayor, TOC Hostel Madrid pairs boutique
                    private suites, rooftop terraces, and family quadruple rooms with biometric
                    keyless security and a sunlit courtyard bar.
                  </p>
                </div>

                {/* Primary Hero CTAs */}
                <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openRoomBooking(ROOMS_DATA[0])}
                    className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Check Availability & Rates
                  </button>
                  <button
                    onClick={() => navigateTo('offers')}
                    className="px-5 py-3 bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    View 6 Special Offers
                  </button>
                  <button
                    onClick={() => setIsPromptModalOpen(true)}
                    className="px-4 py-3 text-amber-900 hover:bg-amber-50 text-xs font-medium rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View 4-Page AI Prompt</span>
                  </button>
                </div>
              </div>

              {/* Right 6 Cols: High-Impact 16:9 Architectural Hero Video Showcase */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[360px] border border-stone-200 bg-stone-950">
                <video
                  key={HOTEL_INFO.heroVideoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={IMAGES.hero}
                  className="w-full h-full object-cover lg:h-full absolute inset-0"
                >
                  <source
                    src={HOTEL_INFO.heroVideoUrl}
                    type="video/mp4"
                  />
                  <source
                    src="https://res.cloudinary.com/k7og2ybq/video/upload/v1793007379/hero-background.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-6">
                  <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                    <div>
                      <p className="text-xs text-amber-300 font-medium">
                        Official Property Cinema · Madrid Centro
                      </p>
                      <p className="text-sm font-semibold mt-0.5">
                        Pl. de Celenque, 3, Centro, 28013 Madrid, Spain
                      </p>
                    </div>
                    <div className="text-left sm:text-right font-mono-tabular">
                      <p className="text-xs text-stone-300">Direct Rates From</p>
                      <p className="text-xl font-bold text-white">€39 – €165 / night</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width Direct Booking & Instant Availability Bar Below Hero Split */}
            <div className="mt-6 bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  Check-In Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={heroCheckIn}
                    onChange={(e) => setHeroCheckIn(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 font-mono-tabular focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  Check-Out Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={heroCheckOut}
                    onChange={(e) => setHeroCheckOut(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 font-mono-tabular focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  Accommodation Type
                </label>
                <select
                  value={heroRoomId}
                  onChange={(e) => setHeroRoomId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                >
                  {ROOMS_DATA.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} (€{room.pricePerNight}/nt)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  Guests
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={heroGuests}
                    onChange={(e) => setHeroGuests(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests (Family Quad)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => {
                  const chosen =
                    ROOMS_DATA.find((r) => r.id === heroRoomId) || ROOMS_DATA[0];
                  openRoomBooking(chosen);
                }}
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Book Direct Rate
              </button>
            </div>
          </section>

          {/* SECTION 2 OF 6: SIGNATURE ROOMS & SUITES PREVIEW */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-amber-800 mb-2">
                  Section 02 · Accommodations & Nightly Rates
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Boutique Suites, Family Quads & Design Pods
                </h2>
                <p className="mt-2 text-stone-600 text-base max-w-2xl">
                  Thoughtfully crafted interiors featuring soundproofed balconies, bespoke oak
                  furniture, and biometric fingertip room access.
                </p>
              </div>
              <button
                onClick={() => navigateTo('rooms')}
                className="self-start md:self-auto px-5 py-2.5 text-xs font-semibold text-stone-900 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Open Full Rooms Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ROOMS_DATA.map((room) => (
                <article
                  key={room.id}
                  className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stone-300 transition-colors"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-stone-900">
                      <ResilientImage
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-white font-mono-tabular">
                        <span className="text-xs text-stone-200">{room.sizeSqm} m²</span>
                        <div>
                          {room.originalPrice && (
                            <span className="text-xs line-through text-stone-300 mr-1.5">
                              €{room.originalPrice}
                            </span>
                          )}
                          <span className="text-lg font-bold">€{room.pricePerNight}</span>
                          <span className="text-[11px] text-stone-200"> / night</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                        <span>{room.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>Up to {room.maxGuests} Guests</span>
                      </div>
                      <h3 className="text-base font-semibold text-stone-900">{room.name}</h3>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                        {room.shortDesc}
                      </p>

                      <ul className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
                        {room.facilities.slice(0, 4).map((fac, i) => (
                          <li key={i} className="text-xs text-stone-700 flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                            <span className="truncate">{fac}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                    <button
                      onClick={() => openRoomBooking(room)}
                      className="flex-1 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Book Room
                    </button>
                    <a
                      href={getDirectWhatsAppUrl(
                        `Hola TOC Hostel Madrid! I would like to book the ${room.name} (€${room.pricePerNight}/night) for check-in ${heroCheckIn}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      WhatsApp
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION 3 OF 6: HOTEL FACILITIES & MADRID HOSPITALITY ARCHITECTURE */}
          <section className="py-16 bg-stone-900 text-stone-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <p className="text-xs font-medium tracking-widest uppercase text-amber-400 mb-2">
                  Section 03 · Property Facilities & Services
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-semibold text-white tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Engineered for Effortless Stays in Central Madrid
                </h2>
                <p className="mt-3 text-stone-300 text-sm leading-relaxed">
                  Located at Pl. de Celenque, 3, every floor combines historic Madrileño
                  architecture with modern security and communal comfort.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    num: '01. Biometric Fingerprint Access',
                    tag: 'Keyless Suite Security',
                    desc: 'No plastic keycards to lose. Every suite door and personal locker unlocks securely with your registered fingertip.',
                    image: IMAGES.biometricLock,
                  },
                  {
                    num: '02. Courtyard Café, Bar & Lounge',
                    tag: 'Breakfast & Evening Cocktails',
                    desc: 'Start your morning with Mediterranean buffet breakfast and unwind in the evening with Spanish vermouth and craft cocktails.',
                    image: IMAGES.loungeBar,
                  },
                  {
                    num: '03. 600 Mbps Fiber Co-Working Atrium',
                    tag: 'Remote Work & Barista Coffee',
                    desc: 'Sunlit atrium tables with universal power outlets, acoustic seating, and barista service for remote professionals.',
                    image: IMAGES.coworkingAtrium,
                  },
                  {
                    num: '04. 24/7 Multilingual Reception & Concierge',
                    tag: 'Pl. de Celenque, 3 Front Desk',
                    desc: 'Round-the-clock assistance at Plaza de Celenque 3 for Prado museum tickets, flamenco reservations, and airport transfers.',
                    image: IMAGES.hero,
                  },
                  {
                    num: '05. Guest Chef Kitchen & Cinema Zone',
                    tag: 'Communal Kitchen & Billiards',
                    desc: 'Fully equipped communal kitchen, billiards table, and large-screen lounge for families and long-stay travellers.',
                    image: IMAGES.kitchenCinema,
                  },
                  {
                    num: '06. Prime Centro Walkability (28013)',
                    tag: '2 Min to Puerta del Sol',
                    desc: '2 minutes on foot to Puerta del Sol, 4 minutes to Plaza Mayor, and 7 minutes to the Royal Palace of Madrid.',
                    image: IMAGES.madridCentro,
                  },
                ].map((item, idx) => (
                  <article
                    key={idx}
                    onClick={() =>
                      setLightboxImage({
                        id: `fac-${idx}`,
                        title: item.num,
                        category: 'Social Spaces',
                        caption: item.desc,
                        image: item.image,
                        aspect: 'col-span-1',
                      })
                    }
                    className="rounded-2xl overflow-hidden bg-stone-800/80 border border-stone-700/80 hover:border-amber-500/60 transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden bg-stone-950">
                        <ResilientImage
                          src={item.image}
                          alt={item.num}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-amber-300 font-medium">
                          <span>{item.tag}</span>
                          <Maximize2 className="w-3.5 h-3.5 text-stone-300 opacity-80 group-hover:opacity-100 shrink-0" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-base font-semibold text-white mb-2">
                          {item.num}
                        </h3>
                        <p className="text-xs text-stone-300 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 4 OF 6: EXCLUSIVE SPECIAL OFFERS & PACKAGES PREVIEW */}
          <SpecialOffersSection
            previewOnly={true}
            onSelectOffer={openOfferBooking}
            onViewAllOffers={() => navigateTo('offers')}
          />

          {/* SECTION 5 OF 6: CUSTOMER REVIEWS, RATINGS BREAKDOWN & QR CODE */}
          <ReviewsAndRatingsSection
            showTestimonialsGrid={false}
            onNavigateToReviews={() => navigateTo('reviews-location')}
          />

          {/* SECTION 6 OF 6: PHOTO GALLERY, GOOGLE MAPS LOCATION & WHATSAPP BOOKING */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-amber-800 mb-2">
                  Section 06 · Visual Tour & Central Madrid Location
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Photo Gallery & Plaza de Celenque Map
                </h2>
                <p className="mt-2 text-stone-600 text-base max-w-2xl">
                  Explore our interiors and find us directly at {HOTEL_INFO.address}.
                </p>
              </div>
              <button
                onClick={() => navigateTo('reviews-location')}
                className="self-start md:self-auto px-4 py-2 text-xs font-semibold text-stone-900 border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Open Full Gallery & Testimonials Page
              </button>
            </div>

            {/* Asymmetric Photo Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {GALLERY_DATA.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxImage(item)}
                  className={`${item.aspect} group relative h-64 rounded-2xl overflow-hidden border border-stone-200 cursor-pointer bg-stone-900`}
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex items-end justify-between p-5 text-white">
                    <div>
                      <p className="text-xs text-amber-300">{item.category}</p>
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                    </div>
                    <Maximize2 className="w-4 h-4 text-stone-200 opacity-80 group-hover:opacity-100 shrink-0" />
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps Location & Direct WhatsApp Concierge Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-white border border-stone-200 rounded-2xl overflow-hidden">
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-800 mb-2">
                    Verified Madrid Centro Address
                  </p>
                  <h3 className="text-2xl font-semibold text-stone-900">
                    TOC Hostel Madrid
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    2 minutes from Sol Metro Station (Lines 1, 2, 3 & Cercanías)
                  </p>

                  <div className="mt-6 space-y-4 text-xs text-stone-700">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-stone-900">Address</p>
                        <p className="text-stone-600">{HOTEL_INFO.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-stone-900">24/7 Reception & WhatsApp</p>
                        <a
                          href={`tel:${HOTEL_INFO.phoneDisplay.replace(/\s+/g, '')}`}
                          className="text-amber-800 font-mono-tabular hover:underline"
                        >
                          {HOTEL_INFO.phoneDisplay}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-stone-900">Check-In & Check-Out</p>
                        <p className="text-stone-600 font-mono-tabular">
                          Check-in from {HOTEL_INFO.checkIn} · Check-out until {HOTEL_INFO.checkOut}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center gap-3">
                  <a
                    href={getDirectWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book on WhatsApp ({HOTEL_INFO.phoneDisplay})</span>
                  </a>
                  <a
                    href={HOTEL_INFO.googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 min-h-[340px] bg-stone-100">
                <iframe
                  title="TOC Hostel Madrid Official Google Maps Location"
                  src={HOTEL_INFO.googleMapsEmbedUrl}
                  className="w-full h-full min-h-[340px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          PAGE 2: ROOMS, SUITES & FACILITIES (DEDICATED MULTI-PAGE VIEW)
         ===================================================================== */}
      {activePage === 'rooms' && (
        <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-amber-800 mb-2">
                Page 2 of 4 · Accommodations & Room Facilities
              </p>
              <h1
                className="text-3xl sm:text-5xl font-semibold text-stone-900 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Rooms, Private Suites & Family Quads
              </h1>
              <p className="mt-3 text-stone-600 text-base max-w-2xl">
                Every room at TOC Hostel Madrid ({HOTEL_INFO.address}) features acoustic insulation,
                individual climate control, and biometric fingerprint access.
              </p>
            </div>

            {/* Interactive Category Filter Buttons */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg self-start md:self-auto">
              {[
                { id: 'all', label: 'All Rooms (4)' },
                { id: 'private', label: 'Private Suites' },
                { id: 'family', label: 'Family Quads' },
                { id: 'dorm', label: 'Design Dorms' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setRoomCategoryFilter(tab.id as 'all' | 'private' | 'family' | 'dorm')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    roomCategoryFilter === tab.id
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Room Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRooms.map((room) => (
              <article
                key={room.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 bg-stone-900">
                    <ResilientImage
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
                      <div>
                        <p className="text-xs text-amber-300">{room.categoryLabel}</p>
                        <h2 className="text-xl font-semibold">{room.name}</h2>
                      </div>
                      <div className="text-right font-mono-tabular">
                        {room.originalPrice && (
                          <span className="text-xs line-through text-stone-300 mr-1.5">
                            €{room.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold">€{room.pricePerNight}</span>
                        <p className="text-[11px] text-stone-300">per night · VAT incl.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 pb-4 border-b border-stone-100 font-mono-tabular">
                      <span>Area: {room.sizeSqm} m²</span>
                      <span aria-hidden="true">·</span>
                      <span>Max Occupancy: {room.maxGuests} Guests</span>
                      <span aria-hidden="true">·</span>
                      <span>{room.bedConfig}</span>
                    </div>

                    <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                      {room.shortDesc}
                    </p>

                    <div className="mt-5">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                        Included Room Facilities
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {room.facilities.map((fac, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                            <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>{fac}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="mt-5 pt-4 border-t border-stone-100 text-xs text-stone-500">
                      Policy: {room.cancellation}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                  <button
                    onClick={() => openRoomBooking(room)}
                    className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Reserve {room.name}
                  </button>
                  <a
                    href={getDirectWhatsAppUrl(
                      `Hola TOC Hostel Madrid! I want to reserve the ${room.name} (€${room.pricePerNight}/night).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Tabular Room Comparison Matrix */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 overflow-x-auto">
            <h2 className="text-2xl font-semibold text-stone-900 mb-4">
              Accommodation Rate & Specification Comparison
            </h2>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500">
                  <th className="py-3 pr-4 font-semibold">Room Category</th>
                  <th className="py-3 px-4 font-semibold">Floor Area</th>
                  <th className="py-3 px-4 font-semibold">Max Guests</th>
                  <th className="py-3 px-4 font-semibold">Bathroom</th>
                  <th className="py-3 px-4 font-semibold">Direct Nightly Rate</th>
                  <th className="py-3 pl-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono-tabular">
                {ROOMS_DATA.map((r) => (
                  <tr key={r.id} className="hover:bg-stone-50">
                    <td className="py-3.5 pr-4 font-sans font-semibold text-stone-900">
                      {r.name}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">{r.sizeSqm} m²</td>
                    <td className="py-3.5 px-4 text-stone-600">{r.maxGuests}</td>
                    <td className="py-3.5 px-4 font-sans text-stone-600">Private En-Suite</td>
                    <td className="py-3.5 px-4 font-bold text-stone-900">€{r.pricePerNight} / nt</td>
                    <td className="py-3.5 pl-4 text-right font-sans">
                      <button
                        onClick={() => openRoomBooking(r)}
                        className="px-3 py-1.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {/* =====================================================================
          PAGE 3: SPECIAL OFFERS & PACKAGES (DEDICATED MULTI-PAGE VIEW)
         ===================================================================== */}
      {activePage === 'offers' && (
        <main className="flex-1 py-12 space-y-16">
          <SpecialOffersSection
            previewOnly={false}
            onSelectOffer={openOfferBooking}
          />
        </main>
      )}

      {/* =====================================================================
          PAGE 4: REVIEWS, TESTIMONIALS, GALLERY & LOCATION (DEDICATED PAGE)
         ===================================================================== */}
      {activePage === 'reviews-location' && (
        <main className="flex-1 py-12 space-y-20">
          {/* Customer Reviews & Ratings Breakdown + QR Code + 3-Column Verified Testimonials */}
          <ReviewsAndRatingsSection showTestimonialsGrid={true} />

          {/* Full Interactive Filterable Photo Gallery */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-amber-800 mb-2">
                  Official Property Photography
                </p>
                <h2 className="text-3xl font-semibold text-stone-900">
                  Inside TOC Hostel Madrid
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 rounded-lg">
                {['All', 'Suites', 'Social Spaces', 'Family Rooms', 'Terrace & Views'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryCategoryFilter(cat)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        galleryCategoryFilter === cat
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxImage(item)}
                  className="group relative h-64 rounded-2xl overflow-hidden border border-stone-200 cursor-pointer bg-stone-900"
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <p className="text-xs text-amber-300">{item.category}</p>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="text-xs text-stone-300 mt-1">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Direct Contact Form & Google Maps Location */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-stone-200 rounded-2xl p-6 sm:p-10">
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-800 mb-2">
                    Direct Reception Desk
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900">
                    Contact TOC Hostel Madrid
                  </h2>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Have a question about group bookings, airport transfers, or our special packages?
                    Send a message to our Plaza de Celenque reception or chat with us on WhatsApp.
                  </p>

                  {contactSubmitted ? (
                    <div className="mt-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-2">
                      <p className="font-semibold text-sm">Inquiry Received — ¡Gracias!</p>
                      <p>
                        Our reception team at {HOTEL_INFO.address} will reply to{' '}
                        <span className="font-semibold">{contactEmail}</span> shortly.
                      </p>
                      <button
                        onClick={() => {
                          setContactSubmitted(false);
                          setContactName('');
                          setContactEmail('');
                          setContactMessage('');
                        }}
                        className="mt-2 px-3 py-1.5 bg-emerald-800 text-white rounded-md font-medium"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                      {contactError && (
                        <p className="text-xs text-red-700 bg-red-50 border border-red-200 p-2.5 rounded-lg">
                          {contactError}
                        </p>
                      )}
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g., María García"
                          className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Your Message or Group Inquiry
                        </label>
                        <textarea
                          rows={3}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Tell us your preferred dates, room type, or package..."
                          className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="submit"
                          className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Send Inquiry to Reception
                        </button>
                        <a
                          href={getDirectWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </form>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500 space-y-1">
                  <p className="font-semibold text-stone-800">{HOTEL_INFO.address}</p>
                  <p className="font-mono-tabular">
                    Tel: {HOTEL_INFO.phoneDisplay} · Email: {HOTEL_INFO.email}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 rounded-xl overflow-hidden border border-stone-200 min-h-[360px]">
                <iframe
                  title="TOC Hostel Madrid Map View"
                  src={HOTEL_INFO.googleMapsEmbedUrl}
                  className="w-full h-full min-h-[360px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        </main>
      )}

      {/* QUIET ARCHITECTURAL FOOTER */}
      <footer className="bg-stone-950 text-stone-400 border-t border-stone-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800/80">
            <div className="md:col-span-2 space-y-3">
              <p className="text-lg font-bold text-white font-serif-display">
                TOC Hostel Madrid
              </p>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
                Boutique Suites & Design Hostel at {HOTEL_INFO.address}. Direct bookings include
                biometric fingertip security, high-speed Wi-Fi 6, and 24/7 reception support.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-stone-300 font-mono-tabular">
                <a
                  href={`tel:${HOTEL_INFO.phoneDisplay.replace(/\s+/g, '')}`}
                  className="hover:text-white inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{HOTEL_INFO.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="hover:text-white inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{HOTEL_INFO.email}</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3">
                4-Page Navigation
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => navigateTo('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    1. Home (6-Section Landing Page)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('rooms')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    2. Rooms, Suites & Facilities
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('offers')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    3. Special Offers & Packages
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('reviews-location')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    4. Reviews, Testimonials & Map
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3">
                Verified Review Links & Tools
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href={HOTEL_INFO.googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white inline-flex items-center gap-1"
                  >
                    <span>Google Reviews (4.8 ★)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href={HOTEL_INFO.trustpilotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white inline-flex items-center gap-1"
                  >
                    <span>Trustpilot Reviews (4.9 ★)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href={getDirectWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white inline-flex items-center gap-1 text-emerald-400"
                  >
                    <span>WhatsApp Concierge (+34 915 32 13 04)</span>
                  </a>
                </li>
                <li className="pt-1">
                  <button
                    onClick={() => setIsPromptModalOpen(true)}
                    className="text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Copy 4-Page Master Prompt</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>© {new Date().getFullYear()} TOC Hostel Madrid · {HOTEL_INFO.address}</p>
            <p>Official Multi-Page Boutique Hospitality Experience</p>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE RESERVATION MODAL */}
      {bookingModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <p className="text-xs font-medium text-amber-800">
                  Direct Reservation · TOC Hostel Madrid
                </p>
                <h3 className="text-lg font-semibold text-stone-900 mt-0.5">
                  {bookingModal.title}
                </h3>
                <p className="text-xs text-stone-500">{bookingModal.subtitle}</p>
              </div>
              <button
                onClick={() => setBookingModal((prev) => ({ ...prev, isOpen: false }))}
                className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg"
                aria-label="Close reservation dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="py-6 space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1.5">
                  <p className="text-sm font-semibold text-emerald-900">
                    Reservation Request Confirmed
                  </p>
                  <p>
                    Guest: <span className="font-semibold">{guestName}</span> ({guestEmail})
                  </p>
                  <p className="font-mono-tabular">
                    Dates: {bookingModal.checkIn} to {bookingModal.checkOut} · Guests:{' '}
                    {bookingModal.guests}
                  </p>
                  <p>Location: {HOTEL_INFO.address}</p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={getDirectWhatsAppUrl(
                      `Hola TOC Hostel Madrid! I have submitted a booking for ${bookingModal.title}. Name: ${guestName}, Check-in: ${bookingModal.checkIn}, Check-out: ${bookingModal.checkOut}, Guests: ${bookingModal.guests}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg text-center whitespace-nowrap"
                  >
                    Send Instant Confirmation via WhatsApp
                  </a>
                  <button
                    onClick={() => setBookingModal((prev) => ({ ...prev, isOpen: false }))}
                    className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBookingSubmit} className="mt-4 space-y-4">
                {bookingError && (
                  <p className="text-xs text-red-700 bg-red-50 border border-red-200 p-2.5 rounded-lg">
                    {bookingError}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={bookingModal.checkIn}
                      onChange={(e) =>
                        setBookingModal((prev) => ({ ...prev, checkIn: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono-tabular"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      value={bookingModal.checkOut}
                      onChange={(e) =>
                        setBookingModal((prev) => ({ ...prev, checkOut: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono-tabular"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono-tabular"
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-stone-600">Direct Rate (VAT & Biometric Locker incl.)</span>
                  <span className="text-base font-bold text-stone-900 font-mono-tabular">
                    €{bookingModal.pricePerUnit}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Confirm Direct Booking
                  </button>
                  <a
                    href={getDirectWhatsAppUrl(
                      `Hola TOC Hostel Madrid! I would like to book ${bookingModal.title} for check-in ${bookingModal.checkIn} to ${bookingModal.checkOut} (${bookingModal.guests} guests).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* LIGHTBOX GALLERY MODAL */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden"
          >
            <div className="relative h-[60vh] bg-black">
              <ResilientImage
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black text-white rounded-full"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex items-center justify-between gap-4 text-white">
              <div>
                <p className="text-xs text-amber-400">{lightboxImage.category}</p>
                <h3 className="text-base font-semibold">{lightboxImage.title}</h3>
                <p className="text-xs text-stone-400 mt-0.5">{lightboxImage.caption}</p>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-medium rounded-lg shrink-0"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COPYABLE 4-PAGE / 6-SECTION MASTER PROMPT MODAL */}
      <PromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />
    </div>
  );
}
