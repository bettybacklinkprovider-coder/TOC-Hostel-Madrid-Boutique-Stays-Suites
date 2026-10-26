import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Check,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Wifi,
  Coffee,
  Clock,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import {
  HOTEL_INFO,
  OFFERS_DATA,
  OFFERS_FAQ,
  OfferPackage,
} from '../data/hotelData';
import { ResilientImage } from './ResilientImage';

interface SpecialOffersSectionProps {
  previewOnly?: boolean;
  onSelectOffer: (offer: OfferPackage, checkIn?: string, checkOut?: string, guests?: number) => void;
  onViewAllOffers?: () => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  previewOnly = false,
  onSelectOffer,
  onViewAllOffers,
}) => {
  const [checkIn, setCheckIn] = useState('2026-11-06');
  const [checkOut, setCheckOut] = useState('2026-11-08');
  const [guests, setGuests] = useState(2);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [filterMinStay, setFilterMinStay] = useState<'all' | 'short' | 'extended'>('all');

  const displayedOffers = previewOnly
    ? OFFERS_DATA.slice(0, 3)
    : OFFERS_DATA.filter((offer) => {
        if (filterMinStay === 'all') return true;
        if (filterMinStay === 'short') return offer.minStayNights <= 2;
        return offer.minStayNights >= 3;
      });

  const buildWhatsAppPackageUrl = (offer: OfferPackage) => {
    const text = encodeURIComponent(
      `Hola TOC Hostel Madrid! I would like to inquire about the "${offer.title}" (${offer.code}) package at Pl. de Celenque, 3. Check-in: ${checkIn}, Check-out: ${checkOut}, Guests: ${guests}. Rate shown: €${offer.discountedPrice}.`
    );
    return `https://wa.me/${HOTEL_INFO.phoneClean}?text=${text}`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Heading & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-amber-800 mb-2">
            Direct Booking Privileges · TOC Hostel Madrid
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Exclusive Offers & Packages
          </h2>
          <p className="mt-2 text-stone-600 text-base max-w-2xl">
            Discover exceptional stays and exclusive offers designed to make your experience unforgettable.
          </p>
        </div>

        {previewOnly && onViewAllOffers ? (
          <button
            onClick={onViewAllOffers}
            className="self-start md:self-auto px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Explore All 6 Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg self-start md:self-auto">
            <button
              onClick={() => setFilterMinStay('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filterMinStay === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All 6 Packages
            </button>
            <button
              onClick={() => setFilterMinStay('short')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filterMinStay === 'short'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              1–2 Night Escapes
            </button>
            <button
              onClick={() => setFilterMinStay('extended')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filterMinStay === 'extended'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              3–4+ Night Packages
            </button>
          </div>
        )}
      </div>

      {/* Featured Offer Banner at Top of Section */}
      <div className="mb-10 rounded-2xl overflow-hidden bg-stone-900 text-stone-100 border border-stone-800 grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-3">
              <span>Featured Direct Package</span>
              <span aria-hidden="true">·</span>
              <span>Save up to 22% Direct</span>
              <span aria-hidden="true">·</span>
              <span>Pl. de Celenque, 3</span>
            </div>
            <h3
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Find Your Perfect Stay in the Heart of Madrid Centro
            </h3>
            <p className="mt-3 text-sm text-stone-300 leading-relaxed max-w-xl">
              Book directly with TOC Hostel Madrid to receive verified rate reductions, complimentary
              Mediterranean breakfast options, biometric locker security, and priority late check-out.
            </p>
          </div>

          {/* Interactive Date & Guest Selector for Packages */}
          <div className="mt-8 pt-6 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-xs text-stone-400 mb-1">Check-In Date</label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white font-mono-tabular focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-stone-400 mb-1">Check-Out Date</label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white font-mono-tabular focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-stone-400 mb-1">Guests</label>
              <div className="relative">
                <Users className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests (Family Quad)</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => onSelectOffer(OFFERS_DATA[0], checkIn, checkOut, guests)}
              className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Find Your Perfect Stay
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative min-h-[240px]">
          <ResilientImage
            src={OFFERS_DATA[2].image}
            alt="TOC Hostel Madrid Deluxe Rooftop Terrace Suite"
            className="w-full h-full object-cover lg:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex items-end p-6">
            <div className="text-xs text-stone-200">
              <p className="font-semibold text-white">Deluxe Penthouse Terrace Suite</p>
              <p className="text-stone-300 mt-0.5">
                2 minutes from Puerta del Sol · Direct WhatsApp Concierge: {HOTEL_INFO.phoneDisplay}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedOffers.map((offer) => (
          <article
            key={offer.id}
            className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stone-300 transition-all duration-200 group"
          >
            <div>
              {/* Card Image */}
              <div className="relative h-52 overflow-hidden bg-stone-900">
                <ResilientImage
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2 text-white">
                  <div>
                    <p className="text-xs font-medium text-amber-300">{offer.code}</p>
                    <p className="text-xs text-stone-200">{offer.typeLabel}</p>
                  </div>
                  <div className="text-right font-mono-tabular">
                    <span className="text-xs line-through text-stone-300 mr-1.5">
                      €{offer.originalPrice}
                    </span>
                    <span className="text-xl font-bold text-white">€{offer.discountedPrice}</span>
                    <p className="text-[11px] text-amber-300">Save {offer.discountPercent}% Direct</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Clean unboxed metadata */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 font-mono-tabular">
                  <span>Min. {offer.minStayNights} {offer.minStayNights === 1 ? 'Night' : 'Nights'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{offer.occupancyLimit}</span>
                </div>

                <h3 className="text-lg font-semibold text-stone-900 leading-snug">
                  {offer.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  {offer.description}
                </p>

                {/* Included Benefits List */}
                <ul className="mt-4 pt-4 border-t border-stone-100 space-y-2">
                  {offer.includedBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Offer Validity & Conditions */}
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 space-y-1">
                  <p className="font-medium text-stone-700">{offer.validUntil}</p>
                  <p>{offer.conditions}</p>
                </div>
              </div>
            </div>

            {/* Interactive CTA Footer */}
            <div className="px-6 pb-6 pt-2 flex items-center gap-2.5">
              {offer.available ? (
                <>
                  <button
                    onClick={() => onSelectOffer(offer, checkIn, checkOut, guests)}
                    className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {offer.ctaText}
                  </button>
                  <a
                    href={buildWhatsAppPackageUrl(offer)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Inquire via WhatsApp"
                    className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </>
              ) : (
                <div className="w-full py-2.5 px-4 bg-stone-100 text-stone-500 text-xs font-medium rounded-lg text-center">
                  Offer Currently Sold Out for Selected Dates
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Consistent Service Icons Strip + Package FAQ Area (Shown on Full Offers Page) */}
      {!previewOnly && (
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t border-stone-200">
          {/* Left 5 cols: Consistent Service Inclusions */}
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-medium tracking-widest uppercase text-amber-800">
              Guaranteed With Every Package
            </p>
            <h3 className="text-2xl font-semibold text-stone-900">
              Standard TOC Hostel Madrid Direct Benefits
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Every package booked on our official website or via WhatsApp ({HOTEL_INFO.phoneDisplay})
              includes direct concierge support and transparent conditions with zero booking fees.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white border border-stone-200 rounded-xl">
                <Wifi className="w-4 h-4 text-amber-700 mb-2" />
                <h4 className="text-xs font-semibold text-stone-900">Symmetric Fiber Wi-Fi 6</h4>
                <p className="text-xs text-stone-500 mt-1">High-speed coverage in all rooms & atrium.</p>
              </div>
              <div className="p-4 bg-white border border-stone-200 rounded-xl">
                <Coffee className="w-4 h-4 text-amber-700 mb-2" />
                <h4 className="text-xs font-semibold text-stone-900">Mediterranean Buffet</h4>
                <p className="text-xs text-stone-500 mt-1">Freshly baked pastries, fruit & barista coffee.</p>
              </div>
              <div className="p-4 bg-white border border-stone-200 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-amber-700 mb-2" />
                <h4 className="text-xs font-semibold text-stone-900">Biometric Keyless Security</h4>
                <p className="text-xs text-stone-500 mt-1">Fingerprint door locks & 24/7 reception.</p>
              </div>
              <div className="p-4 bg-white border border-stone-200 rounded-xl">
                <Clock className="w-4 h-4 text-amber-700 mb-2" />
                <h4 className="text-xs font-semibold text-stone-900">Flexible Check-Out</h4>
                <p className="text-xs text-stone-500 mt-1">Priority late check-out on direct packages.</p>
              </div>
            </div>
          </div>

          {/* Right 7 cols: Interactive FAQ Accordion */}
          <div className="lg:col-span-7">
            <p className="text-xs font-medium tracking-widest uppercase text-amber-800 mb-2">
              Package Terms & Conditions
            </p>
            <h3 className="text-2xl font-semibold text-stone-900 mb-6">
              Frequently Asked Questions About Offers
            </h3>
            <div className="space-y-3">
              {OFFERS_FAQ.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-stone-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-sm font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
