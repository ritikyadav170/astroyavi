"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Scroll,
  HeartHandshake,
  Briefcase,
  ShieldCheck,
  Flame,
  Sparkles,
  Star,
  ArrowRight,
  Eye,
  Check,
  Filter,
} from "lucide-react";
import { AstrologyReportItem, ReportCategory } from "../reports";

interface ReportsCatalogProps {
  searchQuery: string;
  selectedCategory: ReportCategory;
  onOpenPreview: (report: AstrologyReportItem) => void;
}

export const catalogReportsData: AstrologyReportItem[] = [
  {
    id: "kundli-complete",
    title: "Vedic Janam Kundli & Life Forecast",
    hindiTitle: "सम्पूर्ण जन्म कुंडली व जीवन फल",
    category: "kundli",
    tag: "Essential",
    tagColor: "bg-amber-100 text-[#c85a17] border-amber-300",
    description:
      "All 12 Bhavas, Navamsha D9 chart, Vimshottari Mahadasha timeline, Shadbala planetary strengths and lifetime predictions.",
    rating: 4.9,
    reviewsCount: 16400,
    pages: "25+ Pages",
    delivery: "Instant Online & PDF",
    features: ["12 Houses & Planetary Strengths", "Mahadasha & Antardasha Predictions", "Free Vedic Dosha Analysis"],
    href: "/kundli",
    iconType: "scroll",
    isFree: true,
  },
  {
    id: "kundli-milan-detailed",
    title: "Ashtakoot Kundli Matching (Milan)",
    hindiTitle: "36 गुण अष्टकूट मिलान रिपोर्ट",
    category: "marriage",
    tag: "Marriage",
    tagColor: "bg-rose-100 text-rose-700 border-rose-300",
    description:
      "36 Guna Milan, Mangal Dosha check, emotional synchronization, financial prosperity, and marital longevity compatibility score.",
    rating: 4.9,
    reviewsCount: 13200,
    pages: "18+ Pages",
    delivery: "Instant Download",
    features: ["36 Gunas Breakdown Table", "Manglik Dosha Nivaran Advice", "Emotional & Family Compatibility"],
    href: "/match-making",
    iconType: "heart",
    isFree: true,
  },
  {
    id: "career-business-report",
    title: "Career & Business Guidance Report",
    hindiTitle: "करियर व व्यापार मार्गदर्शन रिपोर्ट",
    category: "career",
    tag: "Growth",
    tagColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description:
      "Discover the ideal profession, favorable promotion periods, partnership viability, overseas opportunities and wealth yogas.",
    rating: 4.8,
    reviewsCount: 9100,
    pages: "20+ Pages",
    delivery: "Instant Access",
    features: ["10th House Karma Analysis", "Job vs Business Suitability", "Promotion & Transit Timelines"],
    href: "/talk-to-astrologer",
    iconType: "briefcase",
  },
  {
    id: "sade-sati-transit",
    title: "Shani Sade Sati & Dhaiya Report",
    hindiTitle: "शनि साढ़ेसाती एवं ढैय्या प्रभाव",
    category: "dosha",
    tag: "Saturn Transit",
    tagColor: "bg-indigo-100 text-indigo-700 border-indigo-300",
    description:
      "Exact dates of your 7.5 years Shani Sade Sati cycle, peak impact periods, mental peace remedies and Shani Nivaran rituals.",
    rating: 4.9,
    reviewsCount: 8400,
    pages: "15+ Pages",
    delivery: "Instant PDF",
    features: ["Rising, Peak & Setting Phase Dates", "Career & Health Impact Check", "Vedic Shani Nivaran Remedies"],
    href: "/puja-booking",
    iconType: "shield",
  },
  {
    id: "panchang-muhurat-report",
    title: "Personalized Daily Panchang & Muhurat",
    hindiTitle: "दैनिक पंचांग व शुभ मुहूर्त",
    category: "kundli",
    tag: "Daily Calendar",
    tagColor: "bg-amber-100 text-amber-800 border-amber-300",
    description:
      "Personalized daily Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Abhijit Muhurat and auspicious hours for buying, traveling or weddings.",
    rating: 4.8,
    reviewsCount: 6500,
    pages: "Daily Live & PDF",
    delivery: "Instant Updates",
    features: ["Abhijit & Shubh Choghadiya Timings", "Rahu Kaal & Yamaganda Warnings", "Customized for your location"],
    href: "/panchang",
    iconType: "scroll",
    isFree: true,
  },
  {
    id: "gemstone-rudraksha-report",
    title: "Lucky Gemstone & Rudraksha Recommendation",
    hindiTitle: "शुभ रत्न एवं रुद्राक्ष परामर्श",
    category: "remedies",
    tag: "Remedies",
    tagColor: "bg-purple-100 text-purple-700 border-purple-300",
    description:
      "Identify your primary Life Stone (Bhagya Ratna), Secondary gemstone, favorable metals, wearing procedure and Mukhi Rudraksha.",
    rating: 4.9,
    reviewsCount: 7800,
    pages: "12+ Pages",
    delivery: "Instant Access",
    features: ["Bhagya Ratna & Lagna Lord Gem", "Wearing Metal, Day & Mantra", "Mukhi Rudraksha Energy Alignment"],
    href: "/talk-to-astrologer",
    iconType: "sparkles",
  },
  {
    id: "kaal-sarp-dosh-report",
    title: "Kaal Sarp Dosha Detection & Nivaran",
    hindiTitle: "कालसर्प दोष निवारण रिपोर्ट",
    category: "dosha",
    tag: "Remedies",
    tagColor: "bg-red-100 text-red-700 border-red-300",
    description:
      "Detect if Rahu-Ketu enclose all planets in your chart. Identifies the specific type (Anant, Kulik, Vasuki, etc.) and effective Vedic remedies.",
    rating: 4.9,
    reviewsCount: 5200,
    pages: "14+ Pages",
    delivery: "Instant Download",
    features: ["12 Types of Kaal Sarp Analysis", "Cancellation Yogas Check", "Trimbakeshwar / Vedic Puja Advice"],
    href: "/puja-booking",
    iconType: "flame",
  },
  {
    id: "yearly-horoscope-report",
    title: "Annual Life Predictions 2026-2027",
    hindiTitle: "वार्षिक राशिफल एवं गोचर फल",
    category: "career",
    tag: "Yearly Forecast",
    tagColor: "bg-blue-100 text-blue-700 border-blue-300",
    description:
      "Month-by-month life roadmap covering Jupiter transit in Gemini/Cancer, Saturn transit in Pisces, finance, love, and health milestones.",
    rating: 4.8,
    reviewsCount: 11200,
    pages: "22+ Pages",
    delivery: "Instant PDF",
    features: ["Month-by-Month Forecast", "Guru & Shani Transit Impacts", "Do's and Don'ts for the Year"],
    href: "/horoscope",
    iconType: "scroll",
    isFree: true,
  },
];

export function ReportsCatalog({
  searchQuery,
  selectedCategory,
  onOpenPreview,
}: ReportsCatalogProps) {
  const filteredReports = useMemo(() => {
    return catalogReportsData.filter((report) => {
      const matchesCategory =
        selectedCategory === "all" || report.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        report.title.toLowerCase().includes(query) ||
        report.hindiTitle.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.tag.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const getIcon = (type: string) => {
    switch (type) {
      case "scroll":
        return <Scroll className="w-5 h-5 text-[#c85a17]" />;
      case "heart":
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case "briefcase":
        return <Briefcase className="w-5 h-5 text-emerald-600" />;
      case "shield":
        return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      case "flame":
        return <Flame className="w-5 h-5 text-red-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <section id="catalog" className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c85a17]">
            <Filter className="w-3.5 h-3.5" />
            <span>Complete Vedic Library</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2d1a0e] mt-1">
            Browse All Specialized Reports ({filteredReports.length})
          </h2>
        </div>
      </div>

      {/* Grid of Catalog Cards */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-200/80 shadow-xs hover:shadow-lg hover:border-[#c85a17]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:bg-amber-100 transition-all">
                    {getIcon(report.iconType)}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${report.tagColor || "bg-amber-100 text-[#c85a17] border-amber-300"}`}
                    >
                      {report.tag}
                    </span>
                    {report.isFree && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Free
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-[#2d1a0e] group-hover:text-[#c85a17] transition-colors leading-snug">
                  {report.title}
                </h3>
                <p className="text-[11px] font-semibold text-amber-700/80 mt-0.5">
                  {report.hindiTitle}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {report.description}
                </p>

                {/* Rating & Pages */}
                <div className="flex items-center gap-2 text-xs text-slate-600 py-2.5 my-2.5 border-y border-slate-100">
                  <div className="flex items-center gap-1 font-bold text-slate-800">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{report.rating}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="font-semibold text-slate-700">{report.pages}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">{report.delivery}</span>
                </div>

                {/* Features Bullets */}
                <div className="space-y-1.5 mb-5">
                  {report.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <Link
                  href={report.href}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#c85a17] hover:bg-[#a9480e] text-white font-bold text-xs text-center shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Get Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => onOpenPreview(report)}
                  className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-colors cursor-pointer"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-amber-200/80 p-8 max-w-xl mx-auto">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-[#c85a17] flex items-center justify-center font-bold text-2xl mb-3">
            🔍
          </div>
          <h3 className="text-lg font-bold text-slate-800">No matching reports found</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Try adjusting your search terms or switch to &quot;All Reports&quot; category.
          </p>
        </div>
      )}
    </section>
  );
}
