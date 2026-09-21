"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import {
  AstrologyReportItem,
  DEFAULT_REPORT_PACKAGES,
  getReportPackages,
} from "../reports";

interface FeaturedReportsProps {
  onOpenPreview: (report: AstrologyReportItem) => void;
}

export function FeaturedReports({ onOpenPreview }: FeaturedReportsProps) {
  const [reports, setReports] = useState<AstrologyReportItem[]>(
    DEFAULT_REPORT_PACKAGES.filter((p) => p.isPopular)
  );

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const res = await getReportPackages({ isPopular: true, limit: 6 });
        if (res?.data && Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          const mapped: AstrologyReportItem[] = res.data.map((pkg: any) => {
            const firstVariant = pkg.variants && pkg.variants[0];
            const catKey =
              typeof pkg.category === "object" ? pkg.category?.key || "vedic_reports" : "vedic_reports";

            return {
              id: pkg._id,
              backendPackageId: pkg._id,
              backendVariantId: firstVariant?._id,
              title: pkg.title || "Vedic Astrology Report",
              shortTitle: pkg.shortTitle || "",
              hindiTitle: pkg.shortTitle ? `${pkg.shortTitle} रिपोर्ट` : "वैदिक ज्योतिष रिपोर्ट",
              categoryKey: catKey,
              categoryTitle: typeof pkg.category === "object" ? pkg.category?.title : "Vedic Reports",
              thumbImage: pkg.thumbImage,
              description: pkg.description || "Detailed computer-generated astrological report.",
              reportType: pkg.reportType,
              personCount: pkg.personCount || 1,
              hasVariants: Boolean(pkg.hasVariants),
              variants: pkg.variants || [],
              rating: 4.9,
              reviewsCount: 14500,
              pages: firstVariant?.pages ? `${firstVariant.pages} Pages` : "15 Pages",
              price: firstVariant?.price || 499,
              sellPrice: firstVariant?.sellPrice || 299,
              isPopular: true,
              tag: "Bestseller",
              tagColor: "bg-amber-100 text-[#c85a17] border-amber-300",
              benefits:
                pkg.benefits && pkg.benefits.length > 0
                  ? pkg.benefits
                  : [
                      "Detailed Birth Chart Analysis",
                      "Career & Finance Insights",
                      "Love & Marriage Predictions",
                      "Remedies & Recommendations",
                    ],
            };
          });
          setReports(mapped);
        }
      } catch {
        // Fallback to default presets
      }
    }
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

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
            Handcrafted with authentic Parashari principles, high-accuracy ephemeris & personalized remedies.
          </p>
        </div>
        <a
          href="#catalog"
          className="text-xs sm:text-sm font-bold text-[#c85a17] hover:text-[#9d4310] flex items-center gap-1.5 transition-colors group self-start sm:self-auto"
        >
          <span>View All Reports</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Grid of Featured Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="group relative bg-white rounded-3xl p-6 border border-amber-200/90 shadow-sm hover:shadow-xl hover:border-[#c85a17]/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Thumbnail Image & Tag */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-center p-2 shadow-xs group-hover:scale-105 group-hover:bg-amber-100/80 transition-all overflow-hidden">
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
                    <Scroll className="w-6 h-6 text-[#c85a17]" />
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      report.tagColor || "bg-amber-100 text-[#c85a17] border-amber-300"
                    }`}
                  >
                    {report.tag || "Bestseller"}
                  </span>
                </div>
              </div>

              {/* Title & Hindi Title */}
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2d1a0e] group-hover:text-[#c85a17] transition-colors leading-snug">
                {report.title}
              </h3>
              {report.hindiTitle && (
                <p className="text-xs font-semibold text-amber-700/80 mt-0.5">
                  {report.hindiTitle}
                </p>
              )}

              {/* Description */}
              <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-normal">
                {report.description}
              </p>

              {/* Rating, Pages & Price Row */}
              <div className="flex items-center justify-between py-3 my-3 border-y border-slate-100 text-xs">
                <div className="flex items-center gap-1 font-bold text-slate-800">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{report.rating}</span>
                  <span className="text-slate-400 font-normal">
                    ({report.reviewsCount.toLocaleString()}+)
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-extrabold text-[#c85a17]">
                    ₹{report.sellPrice}
                  </span>
                  {report.price > report.sellPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{report.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Feature Bullets from benefits */}
              <div className="space-y-1.5 mb-5">
                {report.benefits.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onOpenPreview(report)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#c85a17] to-[#df6d28] hover:from-[#b04d11] hover:to-[#c85a17] text-white font-bold text-xs sm:text-sm text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
              >
                <span>Get Report</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => onOpenPreview(report)}
                className="p-2.5 rounded-xl bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
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

export default FeaturedReports;
