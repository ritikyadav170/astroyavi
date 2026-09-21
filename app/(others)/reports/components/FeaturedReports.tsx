"use client";

import React from "react";
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
  Download,
} from "lucide-react";
import { AstrologyReportItem } from "../types";

interface FeaturedReportsProps {
  onOpenPreview: (report: AstrologyReportItem) => void;
}

export const featuredReportsData: AstrologyReportItem[] = [
  {
    id: "janam-kundli-full",
    title: "Complete Janam Kundli & Life Report",
    hindiTitle: "सम्पूर्ण जन्म कुंडली व जीवन फल",
    category: "kundli",
    tag: "Most Popular",
    tagColor: "bg-amber-100 text-[#c85a17] border-amber-300",
    description:
      "Deep Vedic analysis of all 12 houses, Lagna chart, Navamsha, Mahadasha cycles, favorable timelines & personalized remedies.",
    rating: 4.9,
    reviewsCount: 14850,
    pages: "25+ Pages",
    delivery: "Instant Online & PDF",
    features: [
      "12 Houses & Planetary Strength Breakdown",
      "Vimshottari Dasha & Antardasha Predictions",
      "Sade Sati, Manglik & Kaal Sarp Dosha Check",
      "Career, Wealth & Health Life Roadmap",
    ],
    href: "/kundli",
    iconType: "scroll",
    isPopular: true,
    isFree: true,
  },
  {
    id: "kundli-milan-detailed",
    title: "36 Guna Kundli Milan & Marriage Report",
    hindiTitle: "36 गुण मिलान व वैवाहिक भविष्यफल",
    category: "marriage",
    tag: "High Accuracy",
    tagColor: "bg-rose-100 text-rose-700 border-rose-300",
    description:
      "Ashtakoot Guna Milan analysis with Manglik Dosha compatibility, emotional harmony, longevity and mutual prosperity forecast.",
    rating: 4.9,
    reviewsCount: 12340,
    pages: "18+ Pages",
    delivery: "Instant PDF Download",
    features: [
      "Varna, Vashya, Tara, Yoni, Gana, Bhakoot & Nadi Milan",
      "Manglik Dosha Impact & Nivaran Remedies",
      "Financial Stability & Family Life Harmony",
      "Childbirth & Health Compatibility",
    ],
    href: "/match-making",
    iconType: "heart",
    isPopular: true,
    isFree: true,
  },
  {
    id: "career-wealth-report",
    title: "Career, Job & Wealth Astrology Report",
    hindiTitle: "करियर, व्यवसाय एवं धन योग रिपोर्ट",
    category: "career",
    tag: "Bestseller",
    tagColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description:
      "Pinpoint your strongest career path (Job vs Business), best promotion periods, favorable overseas opportunities & wealth yogas.",
    rating: 4.8,
    reviewsCount: 8900,
    pages: "20+ Pages",
    delivery: "Instant Access",
    features: [
      "10th House (Karma Bhava) In-depth Analysis",
      "Laxmi Yoga, Dhana Yoga & Gajkesari Yoga Check",
      "Favorable Business Sectors & Investments",
      "Remedies for Job Stability & Growth",
    ],
    href: "/talk-to-astrologer",
    iconType: "briefcase",
    isPopular: false,
    isFree: false,
  },
  {
    id: "dosha-sade-sati-report",
    title: "Shani Sade Sati & Kaal Sarp Dosha Report",
    hindiTitle: "शनि साढ़ेसाती एवं कालसर्प दोष निवारण",
    category: "dosha",
    tag: "Vedic Remedies",
    tagColor: "bg-indigo-100 text-indigo-700 border-indigo-300",
    description:
      "Precise timeline analysis of Shani Sade Sati phases, Dhaiya, Pitra Dosha, Rahu-Ketu transit impacts and authentic Vedic remedies.",
    rating: 4.9,
    reviewsCount: 7650,
    pages: "16+ Pages",
    delivery: "Instant Download",
    features: [
      "Current Shani Sade Sati Rising / Peak / Setting Phase",
      "Kaal Sarp Dosha Type & Cancellation Yogas",
      "Vedic Mantra, Yantra & Rudraksha Guidance",
      "Effective Charity (Daan) & Puja Recommendations",
    ],
    href: "/puja-booking",
    iconType: "shield",
    isPopular: false,
    isFree: false,
  },
];

export function FeaturedReports({ onOpenPreview }: FeaturedReportsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "scroll":
        return <Scroll className="w-6 h-6 text-[#c85a17]" />;
      case "heart":
        return <HeartHandshake className="w-6 h-6 text-rose-600" />;
      case "briefcase":
        return <Briefcase className="w-6 h-6 text-emerald-600" />;
      case "shield":
        return <ShieldCheck className="w-6 h-6 text-indigo-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c85a17]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Top Recommended Insights</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2d1a0e] mt-1">
            Featured Astrology Life Reports
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Handcrafted with traditional Parashari principles and verified Vedic algorithms.
          </p>
        </div>
        <Link
          href="#catalog"
          className="text-xs sm:text-sm font-bold text-[#c85a17] hover:text-[#9d4310] flex items-center gap-1.5 transition-colors group self-start sm:self-auto"
        >
          <span>View All 15+ Reports</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of Featured Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredReportsData.map((report) => (
          <div
            key={report.id}
            className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/90 shadow-sm hover:shadow-xl hover:border-[#c85a17]/50 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Row: Icon, Tag & Rating */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-13 h-13 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-amber-100 transition-all">
                  {getIcon(report.iconType)}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${report.tagColor}`}
                  >
                    {report.tag}
                  </span>
                  {report.isFree && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Free Online
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Hindi Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2d1a0e] group-hover:text-[#c85a17] transition-colors leading-snug">
                {report.title}
              </h3>
              <p className="text-xs font-semibold text-amber-700/80 mt-0.5">
                {report.hindiTitle}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
                {report.description}
              </p>

              {/* Rating & Details Row */}
              <div className="flex items-center gap-4 py-3 my-3 border-y border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-1 font-bold text-slate-800">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{report.rating}</span>
                  <span className="text-slate-400 font-normal">
                    ({report.reviewsCount.toLocaleString()}+ reviews)
                  </span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="font-semibold text-slate-700">{report.pages}</span>
                <span className="text-slate-300">•</span>
                <span className="font-semibold text-emerald-700">{report.delivery}</span>
              </div>

              {/* Feature Bullets */}
              <div className="space-y-2 mb-6">
                {report.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <Link
                href={report.href}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#c85a17] to-[#df6d28] hover:from-[#b04d11] hover:to-[#c85a17] text-white font-bold text-xs sm:text-sm text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>Get Report Now</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <button
                type="button"
                onClick={() => onOpenPreview(report)}
                className="px-3.5 py-3 rounded-xl bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Preview Sample Report"
              >
                <Eye className="w-4 h-4 text-amber-700" />
                <span className="hidden sm:inline">Preview</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
