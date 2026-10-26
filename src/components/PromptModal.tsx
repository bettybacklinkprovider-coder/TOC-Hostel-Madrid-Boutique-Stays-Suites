import React, { useState } from 'react';
import { X, Copy, Check, FileText } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MASTER_PROMPT_TEXT = `Build or update the website for TOC Hostel Madrid as a 4-Page Multi-Page Luxury Website (strictly a multi-page website with 4 separate routed pages, NOT a single-page scrolling website). Keep the existing website structure, luxury hospitality aesthetic, and brand color theme consistent without deleting existing content.

Official Brand & Contact Information:
- Website Name: TOC Hostel Madrid
- Address: Pl. de Celenque, 3, Centro, 28013 Madrid, Spain
- Phone & WhatsApp Number: +34 915 32 13 04
- Direct WhatsApp Booking Link: https://wa.me/34915321304
- Hero Background Video URL: https://res.cloudinary.com/k7og2ybq/video/upload/v1793007379/hero-background.mp4.mp4
- Official Google Reviews Link: ${HOTEL_INFO.googleReviewsUrl}
- Official Trustpilot Link: ${HOTEL_INFO.trustpilotUrl}

MULTI-PAGE ARCHITECTURE (4 SEPARATE PAGES — NOT A ONE-PAGE WEBSITE):
1. Page 1: Home / Landing Page (Must feature exactly 6 complete luxury sections: 1. Hero & Direct Booking Bar, 2. Signature Rooms & Suites with Prices & Facilities, 3. Hotel Amenities & Biometric Security, 4. Exclusive Special Offers & Packages Preview, 5. Customer Reviews & Ratings Breakdown with Google/Trustpilot Cards & Functional QR Code, 6. Photo Gallery, Google Maps Location & WhatsApp Booking).
2. Page 2: Rooms, Suites & Facilities (Full catalog of Private Suites, Family Quad Suites, Deluxe Rooftop Terrace Suites, and Design Pods with room prices, facilities comparison, and WhatsApp booking).
3. Page 3: Special Offers & Packages (Heading: "Exclusive Offers & Packages", Subtitle: "Discover exceptional stays and exclusive offers designed to make your experience unforgettable", Featured Offer Banner, and 6 Offer Cards: A. Weekend Getaway, B. Extended Stay Package, C. Romantic Stay Package, D. Family Stay Package, E. Business Stay Package, F. Seasonal Special Offers + Interactive Date/Guest Selector + Package FAQ).
4. Page 4: Customer Reviews, Client Testimonials, Photo Gallery & Location (5.0/4.9 Rating Breakdown from 5 stars to 1 star with percentage bars, Google Reviews & Trustpilot cards, scannable "Review Us!" QR code card, plus "What Our Clients Say" 3-column verified testimonials grid with 5 golden stars, green Verified Client badge, circular profile avatars, Lightbox Photo Gallery, and Google Maps embed for Pl. de Celenque, 3, Centro, 28013 Madrid, Spain).`;

export const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(MASTER_PROMPT_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-2xl w-full p-6 shadow-xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-amber-700" />
            <h3 className="text-lg font-semibold text-stone-900">
              4-Page / 6-Section Master AI Prompt (TOC Hostel Madrid)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-4 overflow-y-auto bg-stone-50 border border-stone-200 rounded-xl p-4 font-mono text-xs text-stone-800 whitespace-pre-wrap leading-relaxed">
          {MASTER_PROMPT_TEXT}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied Complete Prompt</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Master Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
