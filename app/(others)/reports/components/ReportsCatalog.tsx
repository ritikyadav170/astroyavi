"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  Star,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  AstrologyReportItem,
  DEFAULT_REPORT_CATEGORIES,
  DEFAULT_REPORT_PACKAGES,
  getReportCategories,
  getReportPackages,
} from "../reports";

interface ReportsCatalogProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onOpenPreview: (report: AstrologyReportItem) => void;
}

const CATEGORY_INITIALS_MAP: Record<string, { initials: string; bg: string; sub: string }> = {
  vedic_reports: { initials: "VR", bg: "bg-[#801c10]", sub: "Vedic Astrology, Kundli" },
  natal_report: { initials: "NR", bg: "bg-[#1b4327]", sub: "Natal Chart, Psychology" },
  natal_couple_report: { initials: "CR", bg: "bg-[#c85a17]", sub: "Synastry, Couple Compatibility" },
  prediction_report: { initials: "PR", bg: "bg-[#2b1810]", sub: "Transits, Future Predictions" },
  numerology_report: { initials: "NM", bg: "bg-[#1b4327]", sub: "Life Path, Destiny Numbers" },
  vedic_numerology_v2: { initials: "VN", bg: "bg-[#801c10]", sub: "Vedic Ank Jyotish, Mulank" },
  western_reports_v2: { initials: "WR", bg: "bg-[#2b1810]", sub: "Tropical Zodiac, Houses" },
};

function getReportMeta(report: AstrologyReportItem) {
  const cat = CATEGORY_INITIALS_MAP[report.categoryKey] || {
    initials: report.shortTitle?.slice(0, 2).toUpperCase() || "AR",
    bg: "bg-[#1b4327]",
    sub: report.categoryTitle || "Astrology Report",
  };

  const initials =
    report.shortTitle && report.shortTitle.length >= 2
      ? report.shortTitle
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : cat.initials;

  return { initials, bg: cat.bg, sub: cat.sub };
}

export function ReportsCatalog({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  onOpenPreview,
}: ReportsCatalogProps) {
  const [categories, setCategories] = useState<any[]>(
    DEFAULT_REPORT_CATEGORIES.map((c) => ({
      _id: c.key,
      key: c.key,
      title: c.label,
    }))
  );
  const [reports, setReports] = useState<AstrologyReportItem[]>(DEFAULT_REPORT_PACKAGES);
  const [loading, setLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // 1. Fetch Categories from GET /reportCategory
  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const res = await getReportCategories({ limit: 50 });
        if (res?.data && Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          const validCats = res.data.filter((c: any) => c.key !== "test");
          setCategories([
            { _id: "all", key: "all", title: "All Reports" },
            ...validCats.map((c: any) => ({
              _id: c._id,
              key: c.key || c._id,
              title: c.title || c.shortTitle || c.key,
            })),
          ]);
        }
      } catch (err) {
        console.error("Error fetching report categories:", err);
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Fetch Packages from GET /reportPackage?category=...
  useEffect(() => {
    let isMounted = true;
    async function loadPackages() {
      setLoading(true);
      try {
        const params: Record<string, any> = { limit: 100 };
        if (selectedCategory && selectedCategory !== "all") {
          // Find matching category ID or pass key
          const matched = categories.find(
            (c) => c.key === selectedCategory || c._id === selectedCategory
          );
          params.category = matched?._id || selectedCategory;
        }

        const res = await getReportPackages(params);
        if (res?.data && Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          const mapped: AstrologyReportItem[] = res.data.map((pkg: any) => {
            const firstVariant = pkg.variants && pkg.variants[0];
            const catObj = typeof pkg.category === "object" ? pkg.category : null;
            const catKey = catObj?.key || "vedic_reports";

            return {
              id: pkg._id,
              backendPackageId: pkg._id,
              backendVariantId: firstVariant?._id,
              title: pkg.title || "Astrology Report",
              shortTitle: pkg.shortTitle || "",
              hindiTitle: pkg.shortTitle ? `${pkg.shortTitle} रिपोर्ट` : undefined,
              categoryKey: catKey,
              categoryTitle: catObj?.title || "Vedic Reports",
              thumbImage: pkg.thumbImage,
              description: pkg.description || "Detailed astrological report.",
              benefits:
                pkg.benefits && pkg.benefits.length > 0
                  ? pkg.benefits
                  : [
                      "Detailed Planetary Analysis",
                      "Life Predictions & Milestones",
                      "Personalized Astrological Remedies",
                    ],
              reportType: pkg.reportType || "vedic_report",
              personCount: pkg.personCount || 1,
              hasVariants: Boolean(pkg.hasVariants),
              variants: pkg.variants || [],
              rating: 4.9,
              reviewsCount: 1200,
              pages: firstVariant?.pages ? `${firstVariant.pages} Pages` : "15 Pages",
              price: firstVariant?.price || 499,
              sellPrice: firstVariant?.sellPrice || 299,
              isPopular: Boolean(pkg.isPopular),
              tag: pkg.isPopular ? "Popular" : "Verified",
            };
          });
          setReports(mapped);
        } else if (res?.data && Array.isArray(res.data) && res.data.length === 0 && isMounted) {
          // Filter fallback packages locally if API returns empty
          if (selectedCategory && selectedCategory !== "all") {
            setReports(
              DEFAULT_REPORT_PACKAGES.filter((p) => p.categoryKey === selectedCategory)
            );
          } else {
            setReports(DEFAULT_REPORT_PACKAGES);
          }
        }
      } catch (err) {
        console.error("Error fetching report packages:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPackages();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, categories]);

  // Client-side filtering & sorting
  const filteredAndSortedReports = useMemo(() => {
    let result = reports.filter((report) => {
      const matchesCategory =
        selectedCategory === "all" ||
        report.categoryKey === selectedCategory ||
        report.id === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        report.title.toLowerCase().includes(query) ||
        (report.shortTitle && report.shortTitle.toLowerCase().includes(query)) ||
        (report.hindiTitle && report.hindiTitle.toLowerCase().includes(query)) ||
        report.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price_low") {
      result = [...result].sort((a, b) => a.sellPrice - b.sellPrice);
    } else if (sortBy === "price_high") {
      result = [...result].sort((a, b) => b.sellPrice - a.sellPrice);
    } else if (sortBy === "popular") {
      result = [...result].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    return result;
  }, [reports, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Header Ornament & Title */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
        <div className="flex items-center gap-3 text-[#c87638] mb-2">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest">
            TOP REPORTS
          </span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] tracking-tight">
          Consult Our Expert Astrology Reports
        </h1>
      </div>

      {/* 2. Search, Sort & Category Filters Bar */}
      <div className="flex flex-col gap-6 mb-10 w-full">
        {/* Top Row: Search Input Box + Sort Dropdown + Filter Button */}
        <div className="flex items-center gap-3 w-full justify-between flex-wrap">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[260px] max-w-md">
            <input
              type="text"
              placeholder="Search Reports (e.g. Kundli, Match Making, Career)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#e6c896] rounded-full py-2.5 pl-5 pr-11 text-sm text-[#2b1810] placeholder:text-[#8c6d58] focus:outline-none focus:border-[#1b4327] shadow-xs"
            />
            <Search className="w-4 h-4 text-[#8c6d58] absolute right-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort Reports"
                className="bg-white border border-[#e6c896] rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#2b1810] focus:outline-none focus:border-[#1b4327] shadow-xs cursor-pointer appearance-none pr-8"
              >
                <option value="popular">Sort: Popularity</option>
                <option value="rating">Sort: High Rating</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#2b1810] text-xs">
                ▼
              </div>
            </div>

            <button
              onClick={() => setShowFilterModal(!showFilterModal)}
              className="flex items-center gap-2 bg-white border border-[#e6c896] hover:border-[#1b4327] px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#2b1810] shadow-xs transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#1b4327]" />
              <span>Sort &amp; Filter</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Passing category ID/key to API) */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none w-full flex-wrap sm:flex-nowrap">
          {categories.map((cat) => {
            const isActive =
              selectedCategory === cat.key ||
              selectedCategory === cat._id ||
              (selectedCategory === "all" && cat.key === "all");

            return (
              <button
                key={cat._id || cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`shrink-0 px-5 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#1b4327] text-white border-[#1b4327] shadow-sm"
                    : "bg-white text-[#2b1810] border-[#e6c896] hover:border-[#1b4327]"
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Loading Spinner or 5-Column Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#1b4327]" />
          <p className="text-sm font-semibold text-slate-600">
            Fetching report packages from Vedic catalog...
          </p>
        </div>
      ) : filteredAndSortedReports.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
          {filteredAndSortedReports.map((report) => {
            const meta = getReportMeta(report);
            const isMultiVariant = report.hasVariants || (report.variants && report.variants.length > 1);

            return (
              <div
                key={report.id}
                onClick={() => onOpenPreview(report)}
                className="bg-white rounded-3xl p-5 border border-[#e6c896] flex flex-col items-center text-center shadow-sm hover:shadow-2xl hover:border-[#1b4327] hover:-translate-y-2 transition-all duration-300 group relative cursor-pointer"
              >
                {/* Avatar with Badge */}
                <div className="relative mb-3 group-hover:scale-105 transition-transform duration-300">
                  {report.thumbImage ? (
                    <img
                      src={report.thumbImage}
                      alt={report.title}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#1b4327] shadow-md p-1 bg-amber-50/50"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div
                      className={`w-20 h-20 rounded-full ${meta.bg} border-2 border-[#1b4327] flex items-center justify-center text-white text-xl font-bold shadow-md`}
                    >
                      {meta.initials}
                    </div>
                  )}

                  {/* Sub-badge below avatar */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-2 py-0.5 rounded-full border border-green-600 flex items-center gap-1 shadow-xs whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span className="text-[9px] font-bold text-green-700 uppercase">
                      {isMultiVariant ? "Multi-Year" : report.personCount === 2 ? "Couple" : report.pages || "Verified"}
                    </span>
                  </span>
                </div>

                {/* Report Package Title */}
                <h3 className="font-bold text-base text-[#2b1810] mt-2 mb-0.5 line-clamp-1 group-hover:text-[#1b4327] transition-colors">
                  {report.title}
                </h3>

                {/* Subtitle / Category Description */}
                <p className="text-xs text-[#5c4033] min-h-[32px] flex items-center justify-center mb-2 leading-tight px-1 line-clamp-2">
                  {meta.sub}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-2">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{report.rating}</span>
                  <span className="text-[10px] text-[#8c6d58] font-normal">
                    ({report.reviewsCount})
                  </span>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#2b1810] mb-4">
                  <span>₹{report.sellPrice}</span>
                  {report.price > report.sellPrice && (
                    <s className="text-xs text-red-500 font-normal">
                      ₹{report.price}
                    </s>
                  )}
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPreview(report);
                  }}
                  className="w-full py-2 px-4 rounded-full border border-emerald-600 text-emerald-700 bg-emerald-50/50 hover:bg-[#1b4327] hover:text-white hover:border-[#1b4327] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs mt-auto cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Get Report</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full bg-white rounded-3xl p-12 border border-[#e6c896] text-center max-w-lg mx-auto my-10 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <h3 className="font-bold text-xl text-[#2b1810]">
            No Report Packages Found
          </h3>
          <p className="text-sm text-[#5c4033]">
            Try resetting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
              setSortBy("popular");
            }}
            className="px-6 py-2.5 bg-[#1b4327] text-white rounded-full text-xs font-semibold hover:bg-[#13321d] transition-all cursor-pointer shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default ReportsCatalog;
