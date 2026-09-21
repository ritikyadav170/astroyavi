"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  SlidersHorizontal,
  Star,
  FileText,
  Loader2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Check,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Zap,
  ShieldCheck,
  BookOpen,
  Filter,
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

const CATEGORY_META_MAP: Record<
  string,
  { initials: string; bg: string; icon: string; sub: string; gradient: string }
> = {
  all: {
    initials: "✨",
    bg: "bg-[#1b4327]",
    icon: "✨",
    sub: "Complete Vedic Catalog",
    gradient: "from-amber-600/20 via-emerald-600/10 to-transparent",
  },
  vedic_reports: {
    initials: "VR",
    bg: "bg-[#801c10]",
    icon: "📜",
    sub: "Vedic Kundli & Dasha",
    gradient: "from-red-600/20 via-amber-600/10 to-transparent",
  },
  natal_report: {
    initials: "NR",
    bg: "bg-[#1b4327]",
    icon: "🌟",
    sub: "Birth Chart & Personality",
    gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
  },
  natal_couple_report: {
    initials: "CR",
    bg: "bg-[#c85a17]",
    icon: "💍",
    sub: "Couple Compatibility & Guna",
    gradient: "from-orange-600/20 via-rose-600/10 to-transparent",
  },
  prediction_report: {
    initials: "PR",
    bg: "bg-[#2b1810]",
    icon: "🔮",
    sub: "Future Transits & Timeline",
    gradient: "from-purple-600/20 via-indigo-600/10 to-transparent",
  },
  numerology_report: {
    initials: "NM",
    bg: "bg-[#1b4327]",
    icon: "🔢",
    sub: "Life Path & Destiny Numbers",
    gradient: "from-teal-600/20 via-emerald-600/10 to-transparent",
  },
  vedic_numerology_v2: {
    initials: "VN",
    bg: "bg-[#801c10]",
    icon: "🕉️",
    sub: "Vedic Ank Jyotish & Mulank",
    gradient: "from-amber-700/20 via-red-600/10 to-transparent",
  },
  western_reports_v2: {
    initials: "WR",
    bg: "bg-[#2b1810]",
    icon: "🌌",
    sub: "Tropical Zodiac & Houses",
    gradient: "from-indigo-600/20 via-blue-600/10 to-transparent",
  },
};

function getReportMeta(report: AstrologyReportItem) {
  const cat = CATEGORY_META_MAP[report.categoryKey] || {
    initials: report.shortTitle?.slice(0, 2).toUpperCase() || "AR",
    bg: "bg-[#1b4327]",
    icon: "📜",
    sub: report.categoryTitle || "Astrology Report",
    gradient: "from-amber-600/20 via-emerald-600/10 to-transparent",
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

  return { initials, bg: cat.bg, icon: cat.icon, sub: cat.sub, gradient: cat.gradient };
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
      icon: c.icon || "📜",
    }))
  );
  const [reports, setReports] = useState<AstrologyReportItem[]>(DEFAULT_REPORT_PACKAGES);
  const [loading, setLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Advanced Filters
  const [priceFilter, setPriceFilter] = useState<string>("all"); // 'all', 'under_300', '300_500', 'above_500'
  const [typeFilter, setTypeFilter] = useState<string>("all"); // 'all', 'single', 'couple', 'multi_year'

  // High-Volume Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);
  const [jumpPageInput, setJumpPageInput] = useState<string>("");

  const catalogTopRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 1. Fetch Categories from GET /reportCategory
  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const res = await getReportCategories({ limit: 50 });
        if (res?.data && Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          const validCats = res.data.filter((c: any) => c.key !== "test");
          setCategories([
            { _id: "all", key: "all", title: "All Reports", icon: "✨" },
            ...validCats.map((c: any) => ({
              _id: c._id,
              key: c.key || c._id,
              title: c.title || c.shortTitle || c.key,
              icon: CATEGORY_META_MAP[c.key]?.icon || "📜",
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
        const params: Record<string, any> = { limit: 1000 };
        if (selectedCategory && selectedCategory !== "all") {
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
                      "Detailed Planetary Dasha Analysis",
                      "Life Predictions & Major Milestones",
                      "Personalized Astrological Remedies",
                    ],
              reportType: pkg.reportType || "vedic_report",
              personCount: pkg.personCount || 1,
              hasVariants: Boolean(pkg.hasVariants),
              variants: pkg.variants || [],
              rating: 4.9,
              reviewsCount: 1200 + ((pkg._id?.charCodeAt(0) || 0) % 300),
              pages: firstVariant?.pages ? `${firstVariant.pages} Pages` : "15 Pages",
              price: firstVariant?.price || 499,
              sellPrice: firstVariant?.sellPrice || 299,
              isPopular: Boolean(pkg.isPopular),
              tag: pkg.isPopular ? "Popular" : "Verified",
            };
          });
          setReports(mapped);
        } else if (res?.data && Array.isArray(res.data) && res.data.length === 0 && isMounted) {
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

  // Handle Horizontal Category Scroll Sync
  const checkCategoryScroll = () => {
    if (!categoryScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkCategoryScroll();
    window.addEventListener("resize", checkCategoryScroll);
    return () => window.removeEventListener("resize", checkCategoryScroll);
  }, [categories]);

  const handleScrollCategory = (direction: "left" | "right") => {
    if (!categoryScrollRef.current) return;
    const distance = 260;
    categoryScrollRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
    setTimeout(checkCategoryScroll, 300);
  };

  // Reset pagination when category, search, or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy, priceFilter, typeFilter, pageSize]);

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
        report.description.toLowerCase().includes(query) ||
        (report.categoryTitle && report.categoryTitle.toLowerCase().includes(query));

      // Price filter
      let matchesPrice = true;
      if (priceFilter === "under_300") {
        matchesPrice = report.sellPrice < 300;
      } else if (priceFilter === "300_500") {
        matchesPrice = report.sellPrice >= 300 && report.sellPrice <= 500;
      } else if (priceFilter === "above_500") {
        matchesPrice = report.sellPrice > 500;
      }

      // Type filter
      let matchesType = true;
      if (typeFilter === "single") {
        matchesType = report.personCount === 1 && !report.hasVariants;
      } else if (typeFilter === "couple") {
        matchesType = report.personCount === 2 || report.categoryKey === "natal_couple_report";
      } else if (typeFilter === "multi_year") {
        matchesType = report.hasVariants || (report.variants && report.variants.length > 1);
      }

      return matchesCategory && matchesSearch && matchesPrice && matchesType;
    });

    // Sorting
    if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price_low") {
      result = [...result].sort((a, b) => a.sellPrice - b.sellPrice);
    } else if (sortBy === "price_high") {
      result = [...result].sort((a, b) => b.sellPrice - a.sellPrice);
    } else if (sortBy === "popular") {
      result = [...result].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    } else if (sortBy === "title_asc") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [reports, searchQuery, selectedCategory, sortBy, priceFilter, typeFilter]);

  // Paginated Data
  const totalCount = filteredAndSortedReports.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const currentReportsPage = filteredAndSortedReports.slice(startIndex, endIndex);

  // Active filters count
  const activeFiltersCount =
    (priceFilter !== "all" ? 1 : 0) +
    (typeFilter !== "all" ? 1 : 0) +
    (sortBy !== "popular" ? 1 : 0) +
    (selectedCategory !== "all" ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const handlePageChange = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
    if (catalogTopRef.current) {
      catalogTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(jumpPageInput, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      handlePageChange(p);
      setJumpPageInput("");
    }
  };

  const handleClearAllFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("popular");
    setPriceFilter("all");
    setTypeFilter("all");
    setCurrentPage(1);
  };

  // Generate pagination items with smart ellipsis
  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("ellipsis-1");
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-2");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div ref={catalogTopRef} className="w-full flex flex-col scroll-mt-6">
      {/* 1. Header Ornament & Luxury Vedic Title */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/70 border border-amber-300 text-amber-900 mb-3.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#801c10]">
            VERIFIED VEDIC REPORTS &bull; INSTANT DIGITAL DELIVERY
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#801c10] tracking-tight mb-3">
          Consult Our Expert Astrology Reports
        </h1>

        <p className="text-sm sm:text-base text-[#5c4033] max-w-2xl mx-auto leading-relaxed">
          Unlock profound cosmic insights, life milestones, love compatibility &amp; accurate Vedic remedies calculated via authentic Lahiri Ayanamsha.
        </p>

        {/* Feature Trust Pills Strip */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-4 mt-6 text-xs text-[#2b1810]">
          <span className="inline-flex items-center gap-1.5 bg-white/90 border border-amber-200/80 px-3.5 py-1.5 rounded-full font-medium shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Instant PDF in &lt; 60s</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/90 border border-amber-200/80 px-3.5 py-1.5 rounded-full font-medium shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Confidential &amp; Safe</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/90 border border-amber-200/80 px-3.5 py-1.5 rounded-full font-medium shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#801c10]" />
            <span>15+ In-Depth Analysis Pages</span>
          </span>
        </div>
      </div>

      {/* 2. Search, Sort & Category Filters Bar */}
      <div className="flex flex-col gap-4 mb-8 w-full bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-[#eeddc8] shadow-sm">
        {/* Top Row: Search Input Box + Sort Dropdown + Filter Button */}
        <div className="flex items-center gap-3 w-full justify-between flex-wrap">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[260px] max-w-lg">
            <input
              type="text"
              placeholder="Search by topic, Kundli, Match Making, Career, Numerology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#fffcf7] border border-[#e2cca4] hover:border-[#1b4327] rounded-full py-2.5 pl-11 pr-10 text-sm text-[#2b1810] placeholder:text-[#8c6d58] focus:outline-none focus:ring-2 focus:ring-[#1b4327]/20 focus:border-[#1b4327] shadow-2xs transition-all"
            />
            <Search className="w-4 h-4 text-[#8c6d58] absolute left-4 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {/* Quick Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort Reports"
                className="bg-[#fffcf7] border border-[#e2cca4] hover:border-[#1b4327] rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#2b1810] focus:outline-none focus:ring-2 focus:ring-[#1b4327]/20 focus:border-[#1b4327] shadow-2xs cursor-pointer appearance-none pr-8 transition-all"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="rating">Sort: High Rating (4.9★)</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="title_asc">Title: A to Z</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#5c4033] text-xs">
                ▼
              </div>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilterModal(true)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold border shadow-2xs transition-all cursor-pointer ${
                activeFiltersCount > 0
                  ? "bg-[#1b4327] text-white border-[#1b4327] hover:bg-[#13321d]"
                  : "bg-[#fffcf7] text-[#2b1810] border-[#e2cca4] hover:border-[#1b4327]"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold flex items-center justify-center ml-0.5">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Smoothly Scrollable Horizontal Carousel) */}
        <div className="relative w-full pt-1">
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScrollCategory("left")}
              aria-label="Scroll Categories Left"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/95 border border-[#e2cca4] text-[#2b1810] shadow-md flex items-center justify-center hover:bg-amber-50 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Horizontal Scrollable Categories Container */}
          <div
            ref={categoryScrollRef}
            onScroll={checkCategoryScroll}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth w-full px-1"
          >
            {categories.map((cat) => {
              const isActive =
                selectedCategory === cat.key ||
                selectedCategory === cat._id ||
                (selectedCategory === "all" && cat.key === "all");

              return (
                <button
                  key={cat._id || cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all cursor-pointer select-none ${
                    isActive
                      ? "bg-[#1b4327] text-white border-[#1b4327] shadow-md ring-2 ring-amber-300/40"
                      : "bg-[#fffcf7] text-[#2b1810] border-[#e2cca4] hover:border-[#1b4327] hover:bg-white"
                  }`}
                >
                  <span className="text-sm">{cat.icon || "📜"}</span>
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleScrollCategory("right")}
              aria-label="Scroll Categories Right"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/95 border border-[#e2cca4] text-[#2b1810] shadow-md flex items-center justify-center hover:bg-amber-50 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Active Filter Chips & Clear All */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t border-[#eeddc8] flex-wrap text-xs">
            <span className="text-[#5c4033] font-medium">Active filters:</span>

            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-medium">
                Category: {categories.find((c) => c.key === selectedCategory)?.title || selectedCategory}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="hover:text-red-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-medium">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-red-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {priceFilter !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-medium">
                Price: {priceFilter === "under_300" ? "< ₹300" : priceFilter === "300_500" ? "₹300 - ₹500" : "> ₹500"}
                <button
                  onClick={() => setPriceFilter("all")}
                  className="hover:text-red-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {typeFilter !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-medium">
                Type: {typeFilter === "single" ? "Single Person" : typeFilter === "couple" ? "Couple" : "Multi-Year"}
                <button
                  onClick={() => setTypeFilter("all")}
                  className="hover:text-red-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleClearAllFilters}
              className="inline-flex items-center gap-1 text-[#801c10] font-semibold hover:underline cursor-pointer ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Catalog Status & Count Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="text-xs sm:text-sm text-[#5c4033] font-medium">
          Showing{" "}
          <span className="font-bold text-[#2b1810]">
            {totalCount > 0 ? startIndex + 1 : 0} &ndash; {endIndex}
          </span>{" "}
          of <span className="font-bold text-[#801c10]">{totalCount.toLocaleString()}</span> Reports
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center gap-2 text-xs text-[#5c4033]">
          <span>Items per page:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-white border border-[#e2cca4] rounded-lg px-2.5 py-1 font-semibold text-[#2b1810] focus:outline-none focus:border-[#1b4327] cursor-pointer shadow-2xs"
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* 4. Loading Spinner or Enhanced 5-Column Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-28 gap-3 bg-white/50 rounded-3xl border border-[#eeddc8]">
          <Loader2 className="h-9 w-9 animate-spin text-[#1b4327]" />
          <p className="text-sm font-semibold text-[#2b1810]">
            Consulting Vedic astronomical records...
          </p>
        </div>
      ) : currentReportsPage.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 w-full">
          {currentReportsPage.map((report) => {
            const meta = getReportMeta(report);
            const isMultiVariant =
              report.hasVariants || (report.variants && report.variants.length > 1);
            const discountPercent =
              report.price > report.sellPrice
                ? Math.round(((report.price - report.sellPrice) / report.price) * 100)
                : 0;

            return (
              <div
                key={report.id}
                onClick={() => onOpenPreview(report)}
                className="bg-white rounded-3xl p-5 border border-[#eeddc8] flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#1b4327] hover:-translate-y-1.5 transition-all duration-300 group relative cursor-pointer overflow-hidden"
              >
                {/* Subtle Luxury Gradient Background Glow on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${meta.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Top Badges Row */}
                <div className="flex items-center justify-between w-full mb-3.5 z-10">
                  <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {isMultiVariant
                      ? "Multi-Year"
                      : report.personCount === 2
                      ? "Couple Sync"
                      : report.pages || "15+ Pages"}
                  </span>

                  {discountPercent > 0 ? (
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-2xs">
                      {discountPercent}% OFF
                    </span>
                  ) : (
                    report.isPopular && (
                      <span className="bg-red-50 text-red-700 border border-red-200 font-bold text-[10px] px-2 py-0.5 rounded-full">
                        🔥 Popular
                      </span>
                    )
                  )}
                </div>

                {/* Central Avatar / Emblem with Cosmic Ring */}
                <div className="relative flex flex-col items-center mb-3 z-10">
                  <div className="relative group-hover:scale-105 transition-transform duration-300">
                    {/* Glowing outer ring */}
                    <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400/30 to-emerald-400/30 blur-xs opacity-70 group-hover:opacity-100 transition-opacity" />

                    {report.thumbImage ? (
                      <img
                        src={report.thumbImage}
                        alt={report.title}
                        className="relative w-20 h-20 rounded-full object-cover border-2 border-[#1b4327] shadow-md p-1 bg-amber-50/70"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div
                        className={`relative w-20 h-20 rounded-full ${meta.bg} border-2 border-amber-300/80 flex items-center justify-center text-white text-xl font-bold shadow-md`}
                      >
                        <span>{meta.initials}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Report Package Title & Hindi Name */}
                <div className="flex flex-col items-center text-center mb-2 z-10">
                  <h3 className="font-serif font-bold text-base text-[#2b1810] line-clamp-2 leading-snug group-hover:text-[#1b4327] transition-colors min-h-[44px] flex items-center justify-center">
                    {report.title}
                  </h3>

                  {report.hindiTitle && (
                    <span className="text-[11px] font-medium text-[#801c10] bg-amber-50/80 px-2.5 py-0.5 rounded-full mt-1 border border-amber-200/50">
                      {report.hindiTitle}
                    </span>
                  )}
                </div>

                {/* Subtitle / Category Description */}
                <p className="text-[11px] text-[#5c4033] text-center leading-tight mb-3 px-1 line-clamp-2 min-h-[28px] flex items-center justify-center z-10">
                  {meta.sub}
                </p>

                {/* Feature Highlights Strip */}
                <div className="w-full bg-[#fdfbf7] rounded-xl p-2.5 mb-3 border border-[#f0e3d2] space-y-1 text-left z-10">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-700 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">Planetary Dasha &amp; Charts</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-700 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">Personalized Vedic Remedies</span>
                  </div>
                </div>

                {/* Rating & Review Counter */}
                <div className="flex items-center justify-center gap-1 text-amber-500 text-xs font-bold mb-3 z-10">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{report.rating}</span>
                  <span className="text-[10px] text-[#8c6d58] font-normal">
                    ({report.reviewsCount.toLocaleString()}+ reviews)
                  </span>
                </div>

                {/* Pricing Block */}
                <div className="flex items-baseline justify-center gap-2 mb-4 z-10">
                  <span className="text-lg font-extrabold text-[#801c10]">
                    ₹{report.sellPrice}
                  </span>
                  {report.price > report.sellPrice && (
                    <s className="text-xs text-slate-400 font-normal">
                      ₹{report.price}
                    </s>
                  )}
                </div>

                {/* Action CTA Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPreview(report);
                  }}
                  className="w-full py-2.5 px-4 rounded-full bg-[#1b4327] hover:bg-[#13321d] text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md group-hover:scale-[1.02] cursor-pointer mt-auto z-10"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-300" />
                  <span>Get Report</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-80 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full bg-white rounded-3xl p-12 border border-[#eeddc8] text-center max-w-lg mx-auto my-10 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl border border-amber-200">
            🔍
          </div>
          <h3 className="font-bold text-xl text-[#2b1810]">
            No Matching Astrology Reports
          </h3>
          <p className="text-sm text-[#5c4033] leading-relaxed">
            We couldn't find any report packages matching your current filter or search criteria.
          </p>
          <button
            onClick={handleClearAllFilters}
            className="px-6 py-2.5 bg-[#1b4327] text-white rounded-full text-xs font-semibold hover:bg-[#13321d] transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* 5. Comprehensive Pagination Controls (Handles up to 10,000+ Cards seamlessly) */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-[#eeddc8] w-full">
          {/* Page Info */}
          <div className="text-xs text-[#5c4033] font-medium">
            Page <span className="font-bold text-[#2b1810]">{currentPage}</span> of{" "}
            <span className="font-bold text-[#2b1810]">{totalPages}</span> ({totalCount.toLocaleString()} total reports)
          </div>

          {/* Number Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {/* First Page */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              title="First Page"
              aria-label="First Page"
              className="p-2 rounded-xl border border-[#e2cca4] bg-white text-[#2b1810] hover:border-[#1b4327] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Previous Page */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              title="Previous Page"
              aria-label="Previous Page"
              className="px-3 py-1.5 rounded-xl border border-[#e2cca4] bg-white text-xs font-semibold text-[#2b1810] hover:border-[#1b4327] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page Number Buttons */}
            {getPaginationNumbers().map((p, idx) => {
              if (typeof p === "string") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 py-1 text-xs text-[#8c6d58] select-none"
                  >
                    &hellip;
                  </span>
                );
              }

              const isCurrent = p === currentPage;
              return (
                <button
                  key={`page-${p}`}
                  onClick={() => handlePageChange(p)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-[#1b4327] text-white shadow-sm ring-2 ring-amber-300/50"
                      : "bg-white text-[#2b1810] border border-[#e2cca4] hover:border-[#1b4327] hover:bg-amber-50/50"
                  }`}
                >
                  {p}
                </button>
              );
            })}

            {/* Next Page */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              title="Next Page"
              aria-label="Next Page"
              className="px-3 py-1.5 rounded-xl border border-[#e2cca4] bg-white text-xs font-semibold text-[#2b1810] hover:border-[#1b4327] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Last Page */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              title="Last Page"
              aria-label="Last Page"
              className="p-2 rounded-xl border border-[#e2cca4] bg-white text-[#2b1810] hover:border-[#1b4327] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>

          {/* Jump to Page Form */}
          <form onSubmit={handleJumpToPage} className="flex items-center gap-2">
            <span className="text-xs text-[#5c4033]">Go to:</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              placeholder="#"
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              className="w-14 bg-white border border-[#e2cca4] rounded-lg px-2 py-1 text-xs text-center text-[#2b1810] focus:outline-none focus:border-[#1b4327]"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-[#1b4327] text-white rounded-lg text-xs font-semibold hover:bg-[#13321d] transition-colors cursor-pointer"
            >
              Go
            </button>
          </form>
        </div>
      )}

      {/* 6. Filter & Sort Modal / Drawer */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#fdfbf7] rounded-3xl border border-[#eeddc8] max-w-md w-full p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#eeddc8]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#1b4327]" />
                <h3 className="font-serif font-bold text-lg text-[#2b1810]">
                  Sort &amp; Filter Reports
                </h3>
              </div>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#801c10]">
                Sort By
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { value: "popular", label: "🔥 Most Popular" },
                  { value: "rating", label: "⭐ Highest Rated (4.9★)" },
                  { value: "price_low", label: "💰 Price: Low to High" },
                  { value: "price_high", label: "💎 Price: High to Low" },
                  { value: "title_asc", label: "🔤 Title: A to Z" },
                ].map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSortBy(s.value)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                      sortBy === s.value
                        ? "bg-[#1b4327] text-white border-[#1b4327]"
                        : "bg-white text-[#2b1810] border-[#eeddc8] hover:border-[#1b4327]"
                    }`}
                  >
                    <span>{s.label}</span>
                    {sortBy === s.value && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#801c10]">
                Price Budget
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "all", label: "All Prices" },
                  { value: "under_300", label: "Under ₹300" },
                  { value: "300_500", label: "₹300 - ₹500" },
                  { value: "above_500", label: "Above ₹500" },
                ].map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriceFilter(p.value)}
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      priceFilter === p.value
                        ? "bg-[#1b4327] text-white border-[#1b4327]"
                        : "bg-white text-[#2b1810] border-[#eeddc8] hover:border-[#1b4327]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Type / Person Count Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#801c10]">
                Report Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "all", label: "All Formats" },
                  { value: "single", label: "Single Person" },
                  { value: "couple", label: "Couple Sync" },
                ].map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTypeFilter(t.value)}
                    className={`px-2 py-2 rounded-xl border text-[11px] font-semibold text-center transition-all cursor-pointer ${
                      typeFilter === t.value
                        ? "bg-[#1b4327] text-white border-[#1b4327]"
                        : "bg-white text-[#2b1810] border-[#eeddc8] hover:border-[#1b4327]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-3 border-t border-[#eeddc8]">
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="flex-1 py-2.5 rounded-full border border-[#eeddc8] bg-white text-xs font-bold text-[#5c4033] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setShowFilterModal(false)}
                className="flex-1 py-2.5 rounded-full bg-[#1b4327] hover:bg-[#13321d] text-xs font-bold text-white transition-colors cursor-pointer shadow-sm"
              >
                Apply Filters ({totalCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportsCatalog;
