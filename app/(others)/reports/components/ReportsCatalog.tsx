"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Scroll,
  Star,
  ArrowRight,
  Eye,
  Check,
  Filter,
  Sparkles,
  Layers,
  CheckCircle2,
  Calendar,
  BookOpen,
} from "lucide-react";
import {
  AstrologyReportItem,
  ReportCategoryData,
  DEFAULT_REPORT_CATEGORIES,
  DEFAULT_REPORT_PACKAGES,
  getReportCategories,
  getReportPackages,
} from "../reports";

interface ReportsCatalogProps {
  searchQuery: string;
  selectedCategory: string;
  setSelectedCategory?: (cat: string) => void;
  onOpenPreview: (report: AstrologyReportItem) => void;
}

const CATEGORY_META: Record<
  string,
  { name: string; desc: string; icon: string; badge: string; badgeColor: string }
> = {
  all: {
    name: "All Reports",
    desc: "Complete library of Vedic, Natal, Numerology & Western astrology reports.",
    icon: "✨",
    badge: "Full Suite",
    badgeColor: "bg-amber-100 text-[#c85a17] border-amber-300",
  },
  vedic_reports: {
    name: "Vedic Astrology Reports",
    desc: "Detailed Vedic birth chart analysis, Kundli Milan, Dasha timing & remedies.",
    icon: "📜",
    badge: "Parashari Vedic",
    badgeColor: "bg-amber-100 text-[#c85a17] border-amber-300",
  },
  natal_report: {
    name: "Natal Chart Reports",
    desc: "In-depth psychological and life blueprint analysis based on your birth chart.",
    icon: "🌟",
    badge: "Natal Blueprint",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
  },
  natal_couple_report: {
    name: "Natal Couple Reports",
    desc: "Synastry and dual-chart relationship compatibility between two souls.",
    icon: "💍",
    badge: "Couple Synergy",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
  },
  prediction_report: {
    name: "Life Prediction Reports",
    desc: "Upcoming planetary transits, major life events, and strategic roadmap.",
    icon: "🔮",
    badge: "Transits & Future",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300",
  },
  numerology_report: {
    name: "Numerology Life Reports",
    desc: "Life Path, Destiny, Soul Urge numbers and name vibrational corrections.",
    icon: "🔢",
    badge: "Pythagorean & Chaldean",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  vedic_numerology_v2: {
    name: "Vedic Numerology Reports",
    desc: "Authentic Ank Jyotish, Mulank, Bhagyank, and planetary number rulers.",
    icon: "🕉️",
    badge: "Ank Jyotish",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
  },
  western_reports_v2: {
    name: "Western Astrology Reports",
    desc: "Tropical zodiac houses, planetary aspects, midheaven, and life calling.",
    icon: "🌌",
    badge: "Tropical Zodiac",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
  },
};

export function ReportsCatalog({
  searchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenPreview,
}: ReportsCatalogProps) {
  const [categories, setCategories] = useState<any[]>(
    DEFAULT_REPORT_CATEGORIES.map((c) => ({
      _id: c.key,
      key: c.key,
      title: c.label,
      icon: c.icon,
    }))
  );
  const [reports, setReports] = useState<AstrologyReportItem[]>(DEFAULT_REPORT_PACKAGES);
  const [loading, setLoading] = useState(false);

  // Load Categories & Packages from APIs
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        // Fetch Categories
        const catRes = await getReportCategories({ limit: 50 });
        if (catRes?.data && Array.isArray(catRes.data) && catRes.data.length > 0 && isMounted) {
          const validCats = catRes.data.filter((c: any) => c.key !== "test");
          setCategories(validCats);

          // If categories contain nested packages, flatten them
          const collectedPackages: AstrologyReportItem[] = [];
          validCats.forEach((cat: any) => {
            if (cat.packages && Array.isArray(cat.packages)) {
              cat.packages.forEach((pkg: any) => {
                const firstVariant = pkg.variants && pkg.variants[0];
                collectedPackages.push({
                  id: pkg._id,
                  backendPackageId: pkg._id,
                  backendVariantId: firstVariant?._id,
                  title: pkg.title || "Astrology Report",
                  shortTitle: pkg.shortTitle || "",
                  hindiTitle: pkg.shortTitle ? `${pkg.shortTitle} रिपोर्ट` : undefined,
                  categoryKey: cat.key || "vedic_reports",
                  categoryTitle: cat.title || "Vedic Reports",
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
                  reviewsCount: 12000,
                  pages: firstVariant?.pages ? `${firstVariant.pages} Pages` : "15 Pages",
                  price: firstVariant?.price || 499,
                  sellPrice: firstVariant?.sellPrice || 299,
                  isPopular: Boolean(pkg.isPopular),
                  tag: pkg.isPopular ? "Popular" : cat.shortTitle || "Vedic",
                  tagColor: "bg-amber-100 text-[#c85a17] border-amber-300",
                });
              });
            }
          });

          if (collectedPackages.length > 0) {
            setReports(collectedPackages);
          }
        }

        // Also fetch from /reportPackage endpoint directly for any extra populated details
        const pkgRes = await getReportPackages({ limit: 100 });
        if (pkgRes?.data && Array.isArray(pkgRes.data) && pkgRes.data.length > 0 && isMounted) {
          const mapped: AstrologyReportItem[] = pkgRes.data.map((pkg: any) => {
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
              reviewsCount: 12000,
              pages: firstVariant?.pages ? `${firstVariant.pages} Pages` : "15 Pages",
              price: firstVariant?.price || 499,
              sellPrice: firstVariant?.sellPrice || 299,
              isPopular: Boolean(pkg.isPopular),
              tag: pkg.isPopular ? "Popular" : "Verified Report",
              tagColor: pkg.isPopular
                ? "bg-amber-100 text-[#c85a17] border-amber-300"
                : "bg-slate-100 text-slate-700 border-slate-200",
            };
          });

          if (mapped.length > 0) {
            setReports(mapped);
          }
        }
      } catch (err) {
        console.error("Error loading reports data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter Reports by Search & Selected Category
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesCategory =
        selectedCategory === "all" ||
        report.categoryKey === selectedCategory ||
        report.id === selectedCategory ||
        (selectedCategory === "kundli" && report.categoryKey === "vedic_reports") ||
        (selectedCategory === "marriage" && report.reportType === "match_making");

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        report.title.toLowerCase().includes(query) ||
        (report.shortTitle && report.shortTitle.toLowerCase().includes(query)) ||
        (report.hindiTitle && report.hindiTitle.toLowerCase().includes(query)) ||
        report.description.toLowerCase().includes(query) ||
        (report.tag && report.tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [reports, searchQuery, selectedCategory]);

  // Grouping by Category when "All" is active and not searching
  const groupedByCategory = useMemo(() => {
    if (selectedCategory !== "all" || searchQuery.trim() !== "") {
      return null;
    }

    const groups: {
      categoryKey: string;
      categoryTitle: string;
      categoryDesc?: string;
      icon: string;
      items: AstrologyReportItem[];
    }[] = [];

    const order = [
      "vedic_reports",
      "natal_report",
      "natal_couple_report",
      "prediction_report",
      "numerology_report",
      "vedic_numerology_v2",
      "western_reports_v2",
    ];

    order.forEach((catKey) => {
      const items = reports.filter((r) => r.categoryKey === catKey);
      if (items.length > 0) {
        const meta = CATEGORY_META[catKey] || {
          name: items[0].categoryTitle || catKey,
          desc: "",
          icon: "📜",
        };
        groups.push({
          categoryKey: catKey,
          categoryTitle: meta.name,
          categoryDesc: meta.desc,
          icon: meta.icon,
          items,
        });
      }
    });

    return groups;
  }, [reports, selectedCategory, searchQuery]);

  const activeMeta = CATEGORY_META[selectedCategory] || {
    name: "Specialized Astrology Reports",
    desc: "Explore accurate calculations and personalized guidance.",
    icon: "✨",
  };

  return (
    <section id="catalog" className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c85a17]">
            <Filter className="w-3.5 h-3.5" />
            <span>Category-Based Report Packages</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2d1a0e] mt-1 flex items-center gap-2">
            <span>{activeMeta.icon}</span>
            <span>
              {selectedCategory === "all"
                ? `Browse All Report Packages (${filteredReports.length})`
                : `${activeMeta.name} (${filteredReports.length})`}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">{activeMeta.desc}</p>
        </div>
      </div>

      {/* Category Filter Bar */}
      {setSelectedCategory && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#c85a17] text-white shadow-md shadow-orange-900/20"
                : "bg-white text-slate-700 hover:text-[#c85a17] border border-amber-200"
            }`}
          >
            <span>✨ All Reports ({reports.length})</span>
          </button>
          {categories.map((cat) => {
            const catKey = cat.key || cat._id;
            const count = reports.filter((r) => r.categoryKey === cat.key).length;
            const isSelected = selectedCategory === catKey || selectedCategory === cat._id;
            const meta = CATEGORY_META[cat.key] || { icon: "📜", name: cat.title };

            return (
              <button
                key={cat._id || cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#c85a17] text-white shadow-md shadow-orange-900/20"
                    : "bg-white text-slate-700 hover:text-[#c85a17] border border-amber-200"
                }`}
              >
                <span>{meta.icon}</span>
                <span>{cat.title || cat.shortTitle || cat.key}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-amber-100 text-[#c85a17]"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Content: Loading Skeleton or Grouped or Filtered or Empty */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl p-6 border border-amber-200/60 shadow-xs h-72 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-100/60" />
                  <div className="w-20 h-5 rounded-full bg-amber-100/60" />
                </div>
                <div className="w-3/4 h-5 rounded-lg bg-slate-200" />
                <div className="w-full h-10 rounded-lg bg-slate-100" />
              </div>
              <div className="w-full h-9 rounded-xl bg-amber-100/50" />
            </div>
          ))}
        </div>
      ) : groupedByCategory && groupedByCategory.length > 0 ? (
        /* Case 1: Grouped View (When "All" is active with no search query) */
        <div className="space-y-12">
          {groupedByCategory.map((group) => (
            <div key={group.categoryKey} className="space-y-4">
              {/* Category Sub-Header */}
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{group.icon}</span>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2d1a0e]">
                      {group.categoryTitle}
                    </h3>
                    {group.categoryDesc && (
                      <p className="text-xs text-slate-500">{group.categoryDesc}</p>
                    )}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-[#c85a17] border border-amber-300">
                  {group.items.length} {group.items.length === 1 ? "Report" : "Reports"}
                </span>
              </div>

              {/* Category Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onOpenPreview={onOpenPreview}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : filteredReports.length > 0 ? (
        /* Case 2: Filtered Grid (Specific Category or Search Active) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onOpenPreview={onOpenPreview}
            />
          ))}
        </div>
      ) : (
        /* Case 3: Empty State */
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

// ─────────────────────────────────────────────────────────────────────────────
// Sub-Component: Report Card
// ─────────────────────────────────────────────────────────────────────────────

interface ReportCardProps {
  report: AstrologyReportItem;
  onOpenPreview: (report: AstrologyReportItem) => void;
}

function ReportCard({ report, onOpenPreview }: ReportCardProps) {
  return (
    <div
      onClick={() => onOpenPreview(report)}
      className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-200/80 shadow-xs hover:shadow-lg hover:border-[#c85a17]/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        {/* Top Row: Thumbnail & Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-13 h-13 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center p-2 shadow-2xs group-hover:scale-105 group-hover:bg-amber-100 transition-all overflow-hidden shrink-0">
            {report.thumbImage ? (
              <img
                src={report.thumbImage}
                alt={report.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <Scroll className="w-5 h-5 text-[#c85a17]" />
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                report.tagColor || "bg-amber-100 text-[#c85a17] border-amber-300"
              }`}
            >
              {report.tag}
            </span>
            {report.personCount === 2 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                2 Persons / Couple
              </span>
            )}
            {report.hasVariants && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                Multi-Year
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-[#2d1a0e] group-hover:text-[#c85a17] transition-colors leading-snug">
          {report.title}
        </h3>
        {report.hindiTitle && (
          <p className="text-[11px] font-semibold text-amber-700/80 mt-0.5">
            {report.hindiTitle}
          </p>
        )}

        {/* Description */}
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {report.description}
        </p>

        {/* Rating, Pages & Price */}
        <div className="flex items-center justify-between py-2.5 my-2.5 border-y border-slate-100 text-xs">
          <div className="flex items-center gap-1 font-bold text-slate-800">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{report.rating}</span>
            <span className="text-slate-400 font-normal">({report.pages})</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-[#c85a17]">
              ₹{report.sellPrice}
            </span>
            {report.price > report.sellPrice && (
              <span className="text-[11px] text-slate-400 line-through">
                ₹{report.price}
              </span>
            )}
          </div>
        </div>

        {/* Benefits Bullets */}
        <div className="space-y-1.5 mb-5">
          {(report.benefits || []).slice(0, 3).map((feat, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenPreview(report);
          }}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#c85a17] hover:bg-[#a9480e] text-white font-bold text-xs text-center shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Get Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenPreview(report);
          }}
          className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-colors cursor-pointer"
          title="Preview Sample"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ReportsCatalog;

