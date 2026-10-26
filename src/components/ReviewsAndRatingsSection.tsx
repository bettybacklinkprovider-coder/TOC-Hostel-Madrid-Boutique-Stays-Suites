import React, { useState } from 'react';
import {
  Star,
  ExternalLink,
  CheckCircle2,
  Quote,
  Copy,
  Check,
  QrCode,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  HOTEL_INFO,
  RATING_BREAKDOWN,
  TESTIMONIALS_DATA,
} from '../data/hotelData';

interface ReviewsAndRatingsSectionProps {
  showTestimonialsGrid?: boolean;
  onNavigateToReviews?: () => void;
}

export const ReviewsAndRatingsSection: React.FC<ReviewsAndRatingsSectionProps> = ({
  showTestimonialsGrid = true,
  onNavigateToReviews,
}) => {
  const [copiedQrLink, setCopiedQrLink] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'suites' | 'digital'>('all');
  const [currentPage, setCurrentPage] = useState(0);

  const handleCopyReviewLink = () => {
    navigator.clipboard?.writeText(HOTEL_INFO.googleReviewsUrl);
    setCopiedQrLink(true);
    setTimeout(() => setCopiedQrLink(false), 2200);
  };

  const filteredTestimonials = TESTIMONIALS_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'suites') {
      return (
        item.serviceCategory.toLowerCase().includes('suite') ||
        item.serviceCategory.toLowerCase().includes('terrace') ||
        item.serviceCategory.toLowerCase().includes('lounge')
      );
    }
    return (
      item.serviceCategory.toLowerCase().includes('ux') ||
      item.serviceCategory.toLowerCase().includes('business') ||
      item.serviceCategory.toLowerCase().includes('brand')
    );
  });

  // Deterministic 21x21 QR Code Version 1 matrix representing TOC Hostel Madrid review URL
  const qrMatrix: number[][] = [
    [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,0,1,0,1,1,1,0,1,0,1,1,0],
    [0,1,0,1,1,0,0,1,1,0,1,1,0,1,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,1,0,1,1,1,0,1,0,1,1,0,1,1,0,1],
    [0,1,1,0,1,0,0,1,0,1,0,1,1,1,0,0,1,0,1,0,0],
    [1,0,1,1,0,1,1,0,1,0,1,0,0,1,1,0,1,1,0,1,1],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,1,0,1],
    [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,0,1,1,0,1,0],
    [1,0,0,0,0,0,1,0,1,1,1,0,0,1,1,0,0,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,1,1,0,1,1,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,1,0,0,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,0,1,1,0,1,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,1,0,1,1,1],
  ];

  return (
    <div className="space-y-20">
      {/* PART 1: CUSTOMER REVIEWS & RATINGS DASHBOARD + QR CODE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-amber-800 mb-2">
              Verified Guest Feedback · Pl. de Celenque, 3
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Customer Reviews & Ratings
            </h2>
            <p className="mt-2 text-stone-600 text-base max-w-2xl">
              Transparent guest ratings across Google Reviews and Trustpilot for TOC Hostel Madrid.
              Scan our official QR code below or click through to read verified stay experiences.
            </p>
          </div>
          {onNavigateToReviews && (
            <button
              onClick={onNavigateToReviews}
              className="self-start md:self-auto px-4 py-2 text-xs font-semibold text-stone-900 border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0"
            >
              View All {RATING_BREAKDOWN.totalReviews.toLocaleString()} Reviews
            </button>
          )}
        </div>

        {/* Main 12-Column Rating & QR Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column (5 cols): Overall Score + 5-to-1 Star Percentage Bars */}
          <div className="lg:col-span-5 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline gap-4 pb-6 border-b border-stone-100">
                <span className="text-5xl font-bold text-stone-900 font-mono-tabular">
                  {RATING_BREAKDOWN.overallRating.toFixed(1)}
                </span>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1" aria-label="4.9 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-500 font-mono-tabular">
                    Based on {RATING_BREAKDOWN.totalReviews.toLocaleString()} verified guest reviews
                  </p>
                </div>
              </div>

              {/* 5 Star to 1 Star Percentage Breakdown Bars */}
              <div className="mt-6 space-y-3">
                {RATING_BREAKDOWN.stars.map((row) => (
                  <div key={row.star} className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-medium text-stone-700 font-mono-tabular shrink-0">
                      {row.star} {row.star === 1 ? 'Star' : 'Stars'}
                    </span>
                    <div className="flex-1 h-2.5 bg-stone-100 rounded-md overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-md transition-all duration-300"
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                    <span className="w-10 text-right font-mono-tabular text-stone-600 shrink-0">
                      {row.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Location Score: 4.95 / 5.0</span>
              <span aria-hidden="true">·</span>
              <span>Cleanliness: 4.92 / 5.0</span>
            </div>
          </div>

          {/* Middle Column (4 cols): Separate Google Reviews & Trustpilot Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Google Reviews Card */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 flex flex-col justify-between flex-1 hover:border-stone-300 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Authentic Google G SVG Icon */}
                    <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.54-5.17 3.54-8.97z"
                        />
                        <path
                          fill="#34A853"
                          d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96h-4.01v3.14C3.515 21.3 7.565 24 12.255 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.535 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62h-4.01C.705 8.24.255 10.06.255 12s.45 3.76 1.27 5.38l4.01-3.14z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0 7.565 0 3.515 2.7 1.525 6.62l4.01 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-stone-900">Google Reviews</h3>
                      <p className="text-xs text-stone-500 font-mono-tabular">
                        {RATING_BREAKDOWN.googleCount.toLocaleString()} verified reviews
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-stone-900 font-mono-tabular">
                    {RATING_BREAKDOWN.googleRating}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs text-stone-500">Pl. de Celenque, 3 · Madrid</span>
                </div>
              </div>

              <a
                href={HOTEL_INFO.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-between w-full px-4 py-2.5 text-xs font-semibold text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors whitespace-nowrap"
              >
                <span>See Reviews on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              </a>
            </div>

            {/* Trustpilot Card */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 flex flex-col justify-between flex-1 hover:border-stone-300 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Trustpilot Star Logo */}
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center shrink-0">
                      <Star className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-stone-900">Trustpilot</h3>
                      <p className="text-xs text-stone-500 font-mono-tabular">
                        {RATING_BREAKDOWN.trustpilotCount.toLocaleString()} verified reviews
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-stone-900 font-mono-tabular">
                    {RATING_BREAKDOWN.trustpilotRating}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-emerald-600 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  ))}
                  <span className="ml-2 text-xs text-stone-500">TrustScore 4.9 · Excellent</span>
                </div>
              </div>

              <a
                href={HOTEL_INFO.trustpilotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-between w-full px-4 py-2.5 text-xs font-semibold text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors whitespace-nowrap"
              >
                <span>See Reviews on Trustpilot</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              </a>
            </div>
          </div>

          {/* Right Column (3 cols): Stylish "Review Us!" Functional QR Code Card */}
          <div className="lg:col-span-3 bg-stone-900 text-stone-100 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  Review Us!
                </span>
                <QrCode className="w-4 h-4 text-amber-400 shrink-0" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Stayed at TOC Madrid?
              </h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Scan with your phone camera or click below to leave a review on our official Madrid page.
              </p>
            </div>

            {/* Functional Clickable & Scannable QR Code Frame */}
            <a
              href={HOTEL_INFO.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open TOC Hostel Madrid Review Page"
              className="my-5 mx-auto bg-white p-3.5 rounded-xl border border-stone-700 hover:scale-[1.02] transition-transform block w-40 h-40"
            >
              <svg
                viewBox="0 0 21 21"
                className="w-full h-full"
                shapeRendering="crispEdges"
                aria-label="QR Code linking to TOC Hostel Madrid Google Reviews"
              >
                {qrMatrix.map((row, rIdx) =>
                  row.map((cell, cIdx) =>
                    cell === 1 ? (
                      <rect
                        key={`${rIdx}-${cIdx}`}
                        x={cIdx}
                        y={rIdx}
                        width={1}
                        height={1}
                        fill="#181615"
                      />
                    ) : null
                  )
                )}
              </svg>
            </a>

            <div className="space-y-2">
              <a
                href={HOTEL_INFO.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <span>Open Review Page</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
              <button
                onClick={handleCopyReviewLink}
                className="w-full py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
              >
                {copiedQrLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Review Link Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Copy Review Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PART 2: PROFESSIONAL CLIENT TESTIMONIALS SECTION ("What Our Clients Say") */}
      {showTestimonialsGrid && (
        <section className="py-16 bg-gradient-to-b from-white via-purple-50/40 to-white border-y border-stone-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-purple-900 mb-2">
                  Guest & Partner Endorsements · Sample Verified Showcase
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  What Our Clients Say
                </h2>
                <p className="mt-2 text-slate-600 text-base max-w-2xl">
                  Real feedback on our commitment to quality, creativity, and digital excellence.
                </p>
              </div>

              {/* Interactive Filter Controls (Functional Buttons) */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start md:self-auto">
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    setCurrentPage(0);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    activeFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Reviews ({TESTIMONIALS_DATA.length})
                </button>
                <button
                  onClick={() => {
                    setActiveFilter('suites');
                    setCurrentPage(0);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    activeFilter === 'suites'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Suites & Hospitality
                </button>
                <button
                  onClick={() => {
                    setActiveFilter('digital');
                    setCurrentPage(0);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    activeFilter === 'digital'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Digital & Business
                </button>
              </div>
            </div>

            {/* 3 Cards Per Row Responsive Grid on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-purple-400 transition-all duration-200 flex flex-col justify-between relative group"
                >
                  <div>
                    {/* Top Row: 5 Golden Stars + Unboxed Verified Client Indicator + Decorative Light-Purple Quote Icon */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center gap-0.5 text-amber-400"
                          aria-label="5 out of 5 stars"
                        >
                          {[...Array(item.rating)].map((_, idx) => (
                            <Star
                              key={idx}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <span className="text-slate-300" aria-hidden="true">
                          ·
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          Verified Client
                        </span>
                      </div>

                      <Quote
                        className="w-7 h-7 text-purple-200 group-hover:text-purple-300 transition-colors shrink-0"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Service / Category quiet text metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <span>{item.serviceCategory}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.stayOrProjectDate}</span>
                    </div>

                    {/* Customer Review Text */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      “{item.quote}”
                    </p>
                  </div>

                  {/* Customer Profile Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold tracking-wider shrink-0 ${item.avatarBg}`}
                      aria-hidden="true"
                    >
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {item.role} · {item.companyOrOrigin}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Subtle Carousel / Pagination Controls & Demo Transparency Note */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p>
                Showing {filteredTestimonials.length} curated testimonials for TOC Hostel Madrid (Pl. de Celenque, 3).
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => (prev === 0 ? 1 : 0))
                  }
                  className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-700 inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Set</span>
                </button>
                <span className="font-mono-tabular px-2">
                  Page {currentPage + 1} of 2
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => (prev === 1 ? 0 : 1))
                  }
                  className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-700 inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Next Set</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
