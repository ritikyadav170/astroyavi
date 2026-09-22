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
  ArrowRight,
  RotateCcw,
  Zap,
  ShieldCheck,
  BookOpen,
  Filter,
  Flame,
} from "lucide-react";
import {
  AstrologyReportItem,
  DEFAULT_REPORT_CATEGORIES,
  DEFAULT_REPORT_PACKAGES,
  getReportCategories,
  getReportPackages,
} from "../reports";
import { formatImageUrl } from "@/lib/utils";

interface ReportsCatalogProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onOpenPreview: (report: AstrologyReportItem) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Beautiful Vedic Astrological Artwork Emblems (Used if image missing or as fallback)
// ─────────────────────────────────────────────────────────────────────────────

function KundliEmblem() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#fdf3e7" stroke="#b45309" strokeWidth="2.5" />
      <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" fill="#fef9f2" stroke="#801c10" strokeWidth="2" />
      <line x1="10" y1="10" x2="90" y2="90" stroke="#b45309" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="90" y1="10" x2="10" y2="90" stroke="#b45309" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="50" cy="50" r="14" fill="#801c10" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="50" cy="50" r="6" fill="#f59e0b" />
      <path d="M50 14L52 20H48L50 14Z" fill="#b45309" />
      <path d="M50 86L52 80H48L50 86Z" fill="#b45309" />
      <path d="M14 50L20 52V48L14 50Z" fill="#b45309" />
      <path d="M86 50L80 52V48L86 50Z" fill="#b45309" />
    </svg>
  );
}

function MatchMakingEmblem() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#fff5f0" stroke="#ea580c" strokeWidth="2.5" />
      <circle cx="38" cy="50" r="22" stroke="#c2410c" strokeWidth="3" fill="#fed7aa" fillOpacity="0.4" />
      <circle cx="62" cy="50" r="22" stroke="#801c10" strokeWidth="3" fill="#fecdd3" fillOpacity="0.4" />
      <path d="M50 36C52 42 54 46 54 50C54 54 52 58 50 64C48 58 46 54 46 50C46 46 48 42 50 36Z" fill="#e11d48" />
      <circle cx="50" cy="22" r="4" fill="#f59e0b" />
      <circle cx="50" cy="78" r="4" fill="#f59e0b" />
      <path d="M48 20L52 24M52 20L48 24" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

function PredictionEmblem() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#f8fafc" stroke="#4f46e5" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="26" fill="url(#grad-pred)" stroke="#6366f1" strokeWidth="2" />
      <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#f59e0b" strokeWidth="1.5" transform="rotate(-30 50 50)" />
      <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#06b6d4" strokeWidth="1.5" transform="rotate(30 50 50)" />
      <circle cx="70" cy="35" r="4" fill="#f59e0b" />
      <circle cx="30" cy="65" r="3.5" fill="#06b6d4" />
      <defs>
        <radialGradient id="grad-pred" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#c7d2fe" />
          <stop offset="100%" stopColor="#312e81" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function NatalEmblem() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#f0fdf4" stroke="#1b4327" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <path d="M50 12V20M50 80V88M12 50H20M80 50H88M23 23L29 29M71 71L77 77M77 23L71 29M23 77L29 71" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="50" cy="50" r="14" fill="#eab308" />
      <path d="M50 36A14 14 0 0 1 50 64A14 14 0 0 0 50 36Z" fill="#15803d" />
    </svg>
  );
}

function NumerologyEmblem() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2.5" />
      <rect x="25" y="25" width="50" height="50" rx="8" fill="#ede9fe" stroke="#6d28d9" strokeWidth="2" />
      <line x1="42" y1="25" x2="42" y2="75" stroke="#8b5cf6" strokeWidth="1.5" />
      <line x1="58" y1="25" x2="58" y2="75" stroke="#8b5cf6" strokeWidth="1.5" />
      <line x1="25" y1="42" x2="75" y2="42" stroke="#8b5cf6" strokeWidth="1.5" />
      <line x1="25" y1="58" x2="75" y2="58" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="33.5" y="37" fontSize="10" fontWeight="bold" fill="#5b21b6" textAnchor="middle">3</text>
      <text x="50" y="37" fontSize="10" fontWeight="bold" fill="#d97706" textAnchor="middle">1</text>
      <text x="66.5" y="37" fontSize="10" fontWeight="bold" fill="#5b21b6" textAnchor="middle">9</text>
      <text x="50" y="53" fontSize="12" fontWeight="extrabold" fill="#7c3aed" textAnchor="middle">7</text>
      <text x="33.5" y="69" fontSize="10" fontWeight="bold" fill="#5b21b6" textAnchor="middle">8</text>
      <text x="66.5" y="69" fontSize="10" fontWeight="bold" fill="#5b21b6" textAnchor="middle">6</text>
    </svg>
  );
}

function VedicNumerologyEmblem() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#fffbeb" stroke="#b45309" strokeWidth="2.5" />
      <polygon points="50,15 85,75 15,75" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
      <polygon points="50,85 85,25 15,25" fill="#fef3c7" stroke="#801c10" strokeWidth="2" opacity="0.8" />
      <circle cx="50" cy="50" r="16" fill="#801c10" stroke="#f59e0b" strokeWidth="2" />
      <text x="50" y="56" fontSize="16" fontWeight="bold" fill="#fef3c7" textAnchor="middle">🕉</text>
    </svg>
  );
}

function WesternAstrologyEmblem() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="32" stroke="#0369a1" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="50" cy="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <path d="M50 20L53 30L63 30L55 36L58 46L50 40L42 46L45 36L37 30L47 30Z" fill="#f59e0b" />
      <circle cx="50" cy="50" r="6" fill="#0284c7" />
    </svg>
  );
}

function renderCategoryEmblem(catKey: string) {
  switch (catKey) {
    case "vedic_reports":
      return <KundliEmblem />;
    case "natal_couple_report":
      return <MatchMakingEmblem />;
    case "prediction_report":
      return <PredictionEmblem />;
    case "natal_report":
      return <NatalEmblem />;
    case "numerology_report":
      return <NumerologyEmblem />;
    case "vedic_numerology_v2":
      return <VedicNumerologyEmblem />;
    case "western_reports_v2":
      return <WesternAstrologyEmblem />;
    default:
      return <KundliEmblem />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Category Visual Metadata
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORY_META_MAP: Record<
  string,
  { initials: string; bg: string; icon: string; sub: string; gradient: string }
> = {
  all: {
    initials: "✨",
    bg: "bg-[#1b4327]",
    icon: "✨",
    sub: "Complete Vedic Catalog",
    gradient: "from-amber-600/15 via-emerald-600/10 to-transparent",
  },
  vedic_reports: {
    initials: "VR",
    bg: "bg-[#801c10]",
    icon: "📜",
    sub: "Vedic Kundli & Dasha",
    gradient: "from-red-600/15 via-amber-600/10 to-transparent",
  },
  natal_report: {
    initials: "NR",
    bg: "bg-[#1b4327]",
    icon: "🌟",
    sub: "Birth Chart & Personality",
    gradient: "from-emerald-600/15 via-teal-600/10 to-transparent",
  },
  natal_couple_report: {
    initials: "CR",
    bg: "bg-[#c85a17]",
    icon: "💍",
    sub: "Couple Compatibility & Guna",
    gradient: "from-orange-600/15 via-rose-600/10 to-transparent",
  },
  prediction_report: {
    initials: "PR",
    bg: "bg-[#2b1810]",
    icon: "🔮",
    sub: "Future Transits & Timeline",
    gradient: "from-purple-600/15 via-indigo-600/10 to-transparent",
  },
  numerology_report: {
    initials: "NM",
    bg: "bg-[#1b4327]",
    icon: "🔢",
    sub: "Life Path & Destiny Numbers",
    gradient: "from-teal-600/15 via-emerald-600/10 to-transparent",
  },
  vedic_numerology_v2: {
    initials: "VN",
    bg: "bg-[#801c10]",
    icon: "🕉️",
    sub: "Vedic Ank Jyotish & Mulank",
    gradient: "from-amber-700/15 via-red-600/10 to-transparent",
  },
  western_reports_v2: {
    initials: "WR",
    bg: "bg-[#2b1810]",
    icon: "🌌",
    sub: "Tropical Zodiac & Houses",
    gradient: "from-indigo-600/15 via-blue-600/10 to-transparent",
  },
};

function getReportMeta(report: AstrologyReportItem) {
  const cat = CATEGORY_META_MAP[report.categoryKey] || {
    initials: report.shortTitle?.slice(0, 2).toUpperCase() || "AR",
    bg: "bg-[#1b4327]",
    icon: "📜",
    sub: report.categoryTitle || "Astrology Report",
    gradient: "from-amber-600/15 via-emerald-600/10 to-transparent",
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

const POPULAR_SEARCH_TAGS = [
  "Kundali PDF",
  "Match Making",
  "Yearly Prediction",
  "Numerology",
  "Western Astrology",
  "Ank Jyotish",
];

// ─────────────────────────────────────────────────────────────────────────────
// Dedicated Report Card Component with Reliable Image Loading & Vedic Artwork Fallback
// ─────────────────────────────────────────────────────────────────────────────

function ReportCard({
  report,
  onOpenPreview,
}: {
  report: AstrologyReportItem;
  onOpenPreview: (report: AstrologyReportItem) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const meta = getReportMeta(report);
  const isMultiVariant = report.hasVariants || (report.variants && report.variants.length > 1);
  const discountPercent =
    report.price > report.sellPrice
      ? Math.round(((report.price - report.sellPrice) / report.price) * 100)
      : 0;

  const validImageUrl = formatImageUrl(report.thumbImage);
  const hasValidImage = Boolean(validImageUrl) && !imgError;

  return (
    <div
      onClick={() => onOpenPreview(report)}
      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#eeddc8] hover:border-[#1b4327] flex flex-col justify-between shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative cursor-pointer overflow-hidden"
    >
      {/* Subtle Luxury Gradient Background Glow on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${meta.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Top Badges Row */}
      <div className="flex items-center justify-between w-full mb-2.5 z-10">
        <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight shadow-2xs">
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

      {/* Central Visual Avatar / Image */}
      <div className="relative flex flex-col items-center mb-2 z-10">
        <div className="relative w-14 h-14 group-hover:scale-105 transition-transform duration-300">
          <div className="absolute -inset-1 rounded-full bg-amber-400/20 blur-xs group-hover:bg-amber-400/40 transition-colors" />

          {hasValidImage ? (
            <img
              src={validImageUrl}
              alt={report.title}
              onError={() => setImgError(true)}
              className="relative w-14 h-14 rounded-full object-cover border-2 border-[#1b4327] shadow-xs p-0.5 bg-amber-50/70"
            />
          ) : (
            <div className="relative w-14 h-14 rounded-full shadow-xs flex items-center justify-center">
              {renderCategoryEmblem(report.categoryKey)}
            </div>
          )}
        </div>
      </div>

      {/* Title & Hindi Tag */}
      <div className="flex flex-col items-center text-center mb-2 z-10 min-h-[48px] justify-center">
        <h3 className="font-serif font-bold text-sm text-[#2b1810] line-clamp-2 leading-snug group-hover:text-[#1b4327] transition-colors">
          {report.title}
        </h3>

        {report.hindiTitle && (
          <span className="text-[10px] font-medium text-[#801c10] bg-amber-50/90 px-2 py-0.5 rounded-full mt-1 border border-amber-200/60 truncate max-w-[90%]">
            {report.hindiTitle}
          </span>
        )}
      </div>

      {/* Rating & Price Row */}
      <div className="flex items-center justify-between w-full pt-2 pb-2 border-t border-[#f4e8d8] z-10 mt-1">
        {/* Rating */}
        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
          <span>{report.rating}</span>
          <span className="text-[10px] text-[#8c6d58] font-normal">
            ({report.reviewsCount >= 1000 ? `${(report.reviewsCount / 1000).toFixed(1)}k` : report.reviewsCount})
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-extrabold text-[#801c10]">
            ₹{report.sellPrice}
          </span>
          {report.price > report.sellPrice && (
            <s className="text-[11px] text-slate-400 font-normal">
              ₹{report.price}
            </s>
          )}
        </div>
      </div>

      {/* Action CTA Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpenPreview(report);
        }}
        className="w-full py-2 px-3 rounded-xl bg-[#1b4327] hover:bg-[#13321d] text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-md cursor-pointer z-10 group/btn"
      >
        <FileText className="w-3.5 h-3.5 text-amber-300" />
        <span>Get Report</span>
        <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-80 group-hover/btn:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Reports Catalog Component
// ─────────────────────────────────────────────────────────────────────────────

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
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Advanced Filter States
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [onlyPopular, setOnlyPopular] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);

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

            // Resolve image from all potential backend keys and format properly
            const rawImg =
              pkg.thumbImage ||
              pkg.image ||
              pkg.thumbnail ||
              pkg.icon ||
              pkg.photo ||
              pkg.coverImage ||
              pkg.img ||
              (Array.isArray(pkg.images) && pkg.images[0]) ||
              firstVariant?.image ||
              firstVariant?.thumbImage ||
              "";

            const resolvedThumbImage = formatImageUrl(rawImg);

            return {
              id: pkg._id,
              backendPackageId: pkg._id,
              backendVariantId: firstVariant?._id,
              title: pkg.title || "Astrology Report",
              shortTitle: pkg.shortTitle || "",
              hindiTitle: pkg.shortTitle ? `${pkg.shortTitle} रिपोर्ट` : undefined,
              categoryKey: catKey,
              categoryTitle: catObj?.title || "Vedic Reports",
              thumbImage: resolvedThumbImage,
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

  // Horizontal Category Scroll Checks
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
    const distance = 280;
    categoryScrollRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
    setTimeout(checkCategoryScroll, 300);
  };

  // Reset pagination on filter or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    searchQuery,
    sortBy,
    priceFilter,
    typeFilter,
    onlyPopular,
    minRating,
    pageSize,
  ]);

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

      // Popular filter
      const matchesPopular = !onlyPopular || report.isPopular;

      // Rating filter
      const matchesRating = minRating === 0 || report.rating >= minRating;

      return matchesCategory && matchesSearch && matchesPrice && matchesType && matchesPopular && matchesRating;
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
  }, [
    reports,
    searchQuery,
    selectedCategory,
    sortBy,
    priceFilter,
    typeFilter,
    onlyPopular,
    minRating,
  ]);

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
    (onlyPopular ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
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
    setOnlyPopular(false);
    setMinRating(0);
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
      {/* 1. Vedic Astrological Grand Header */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border border-amber-300/80 text-amber-950 mb-3.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#801c10]">
            VERIFIED VEDIC REPORTS &bull; INSTANT DIGITAL DELIVERY
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#801c10] tracking-tight mb-3">
          Consult Our Expert Astrology Reports
        </h1>

        <p className="text-sm sm:text-base text-[#5c4033] max-w-2xl mx-auto leading-relaxed">
          Unlock profound cosmic insights, life milestones, love compatibility &amp; accurate Vedic remedies calculated via authentic Lahiri Ayanamsha.
        </p>

        {/* Feature Trust Pills Strip */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-4 mt-5 text-xs text-[#2b1810]">
          <span className="inline-flex items-center gap-1.5 bg-white/95 border border-amber-200/90 px-3.5 py-1.5 rounded-full font-medium shadow-2xs hover:border-amber-400 transition-colors">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Instant PDF in &lt; 60s</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/95 border border-amber-200/90 px-3.5 py-1.5 rounded-full font-medium shadow-2xs hover:border-emerald-400 transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Confidential &amp; Safe</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/95 border border-amber-200/90 px-3.5 py-1.5 rounded-full font-medium shadow-2xs hover:border-red-400 transition-colors">
            <BookOpen className="w-3.5 h-3.5 text-[#801c10]" />
            <span>15+ In-Depth Analysis Pages</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/95 border border-amber-200/90 px-3.5 py-1.5 rounded-full font-medium shadow-2xs hover:border-amber-400 transition-colors">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>4.9/5 Rating (50k+ Seekers)</span>
          </span>
        </div>
      </div>

      {/* 2. Search, Quick Filters & Category Toolbar */}
      <div className="flex flex-col gap-4 mb-8 w-full bg-white/85 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-[#eeddc8] shadow-sm">
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

            {/* Filter Toggle Button (Toggles Inline Filter Drawer) */}
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold border shadow-2xs transition-all cursor-pointer ${
                showFilterDrawer || activeFiltersCount > 0
                  ? "bg-[#1b4327] text-white border-[#1b4327] hover:bg-[#13321d]"
                  : "bg-[#fffcf7] text-[#2b1810] border-[#e2cca4] hover:border-[#1b4327]"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold flex items-center justify-center ml-0.5">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Search Tag Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
          <span className="text-[#8c6d58] font-medium shrink-0 flex items-center gap-1 text-[11px]">
            <Sparkles className="w-3 h-3 text-amber-600" /> Trending:
          </span>
          {POPULAR_SEARCH_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchQuery(tag)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-amber-50/70 hover:bg-amber-100 text-[#5c4033] hover:text-[#801c10] border border-amber-200/60 transition-colors text-[11px] font-medium cursor-pointer"
            >
              {tag}
            </button>
          ))}
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

        {/* Expandable In-Page Filter Drawer (Intuitive & Rich) */}
        {showFilterDrawer && (
          <div className="bg-[#fefaf3] rounded-2xl p-4 border border-[#e8d8c3] mt-2 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-[#eeddc8]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#801c10]" />
                <span className="font-serif font-bold text-sm text-[#2b1810]">
                  Refine Astrology Reports
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="text-xs text-[#801c10] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              {/* Price Filter */}
              <div className="space-y-1.5">
                <span className="font-bold text-[#801c10] uppercase tracking-wider text-[10px]">
                  Price Range
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under_300", label: "Under ₹300" },
                    { id: "300_500", label: "₹300 - ₹500" },
                    { id: "above_500", label: "Above ₹500" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriceFilter(p.id)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                        priceFilter === p.id
                          ? "bg-[#1b4327] text-white border-[#1b4327]"
                          : "bg-white text-[#2b1810] border-[#eeddc8] hover:border-[#1b4327]"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Filter */}
              <div className="space-y-1.5">
                <span className="font-bold text-[#801c10] uppercase tracking-wider text-[10px]">
                  Person Format
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "all", label: "All Formats" },
                    { id: "single", label: "Single Person" },
                    { id: "couple", label: "Couple Sync" },
                    { id: "multi_year", label: "Multi-Year" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTypeFilter(t.id)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                        typeFilter === t.id
                          ? "bg-[#1b4327] text-white border-[#1b4327]"
                          : "bg-white text-[#2b1810] border-[#eeddc8] hover:border-[#1b4327]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-1.5">
                <span className="font-bold text-[#801c10] uppercase tracking-wider text-[10px]">
                  Customer Rating
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { val: 0, label: "All Ratings" },
                    { val: 4.5, label: "4.5★ & Above" },
                    { val: 4.8, label: "4.8★ & Above" },
                    { val: 4.9, label: "4.9★ Verified" },
                  ].map((r) => (
                    <button
                      key={r.val}
                      type="button"
                      onClick={() => setMinRating(r.val)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                        minRating === r.val
                          ? "bg-[#1b4327] text-white border-[#1b4327]"
                          : "bg-white text-[#2b1810] border-[#eeddc8] hover:border-[#1b4327]"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Toggles */}
              <div className="space-y-1.5">
                <span className="font-bold text-[#801c10] uppercase tracking-wider text-[10px]">
                  Special Flags
                </span>
                <button
                  type="button"
                  onClick={() => setOnlyPopular(!onlyPopular)}
                  className={`w-full py-2 px-3 rounded-lg border font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    onlyPopular
                      ? "bg-[#1b4327] text-white border-[#1b4327]"
                      : "bg-white text-[#2b1810] border-[#eeddc8] hover:border-[#1b4327]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Popular Only</span>
                  </span>
                  {onlyPopular && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        )}

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

            {onlyPopular && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-800 border border-red-200 font-medium">
                🔥 Popular Only
                <button
                  onClick={() => setOnlyPopular(false)}
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
          {currentReportsPage.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onOpenPreview={onOpenPreview}
            />
          ))}
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
            <RotateCcw className="w-3 h-3" />
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
    </div>
  );
}

export default ReportsCatalog;
