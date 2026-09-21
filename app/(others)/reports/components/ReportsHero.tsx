"use client";

import React from "react";
import { Sparkles, FileText, Search, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

import { DEFAULT_REPORT_CATEGORIES, getReportCategories } from "../reports";

interface ReportsHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: any) => void;
}

const CATEGORY_ICON_MAP: Record<string, string> = {
  all: "✨",
  vedic_reports: "📜",
  natal_report: "🌟",
  natal_couple_report: "💍",
  prediction_report: "🔮",
  numerology_report: "🔢",
  vedic_numerology_v2: "🕉️",
  western_reports_v2: "🌌",
  test: "🧪",
};

export function ReportsHero({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: ReportsHeroProps) {
  const [categories, setCategories] = React.useState(
    DEFAULT_REPORT_CATEGORIES.map((c) => ({
      id: c.key,
      label: c.label,
      icon: c.icon,
    }))
  );

  React.useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const res = await getReportCategories({ limit: 20 });
        if (res?.data && Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          const apiCats = res.data
            .filter((c: any) => c.key !== "test")
            .map((c: any) => ({
              id: c.key || c._id,
              label: c.title || c.shortTitle || c.key,
              icon: CATEGORY_ICON_MAP[c.key] || "📜",
            }));
          setCategories([{ id: "all", label: "All Reports", icon: "✨" }, ...apiCats]);
        }
      } catch {
        // Fallback to default presets
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#fdf6e9] via-[#fbf1dc] to-[#fdf8f0] border-b border-[#e6c896]/60 pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-400/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1280px] mx-auto text-center flex flex-col items-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-xs sm:text-sm font-bold text-[#c85a17] shadow-xs mb-4 animate-in fade-in slide-in-from-top-3 duration-500">
          <Sparkles className="w-4 h-4 text-amber-600 animate-spin-slow" />
          <span>Vedic Certified & AI-Powered Astrology Reports</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#2d1a0e] tracking-tight max-w-4xl leading-[1.15]">
          Unlock Your Destiny with Precision{" "}
          <span className="text-[#c85a17] relative inline-block">
            Astrological Reports
            <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#c85a17]/20 -z-10 rounded-full"></span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-700 max-w-2xl font-medium leading-relaxed">
          Comprehensive 25+ page Vedic insights covering Kundli, Career, Love Compatibility, Mahadasha timelines, and personalized planetary remedies.
        </p>

        {/* Key Trust Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-amber-200/80 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Vedic Mathematical Accuracy</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-amber-200/80 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Instant PDF & Online Reading</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-amber-200/80 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Verified by Senior Astrologers</span>
          </div>
        </div>

        {/* Search Bar & Instant Actions */}
        <div className="w-full max-w-2xl mt-8 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports (e.g. Kundli Milan, Sade Sati, Career, Gemstone)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-amber-200 text-slate-800 placeholder-slate-400 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c85a17]/50 focus:border-[#c85a17] transition-all"
            />
          </div>
          <a
            href="#quick-generator"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#1b4327] hover:bg-[#14341e] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <span>Generate Free Kundli</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mt-8">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const el = document.getElementById("catalog");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#c85a17] text-white shadow-md shadow-orange-900/20 scale-105"
                    : "bg-white/80 hover:bg-white text-slate-700 hover:text-[#c85a17] border border-amber-200/80 shadow-2xs"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
