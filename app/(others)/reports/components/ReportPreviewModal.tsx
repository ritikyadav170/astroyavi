"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  FileText,
  Download,
  Star,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  User,
  Loader2,
  AlertCircle,
  Layers,
  History,
} from "lucide-react";
import {
  AstrologyReportItem,
  ReportVariantData,
  ReportMemberData,
  getReportPackageById,
  getReportPackageVariants,
  getReportPackageVariantById,
  createReportTransaction,
  getMyReportTransactions,
} from "../reports";
import Link from "next/link";
import { toast } from "@components/ui/toaster";

interface ReportPreviewModalProps {
  report: AstrologyReportItem | null;
  onClose: () => void;
}

export function ReportPreviewModal({ report: initialReport, onClose }: ReportPreviewModalProps) {
  const [report, setReport] = useState<AstrologyReportItem | null>(initialReport);
  const [activeTab, setActiveTab] = useState<"preview" | "order" | "my-reports">("preview");
  const [variants, setVariants] = useState<ReportVariantData[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ReportVariantData | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Order Form State
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);

  // My Reports State
  const [myTransactions, setMyTransactions] = useState<any[]>([]);
  const [loadingMyReports, setLoadingMyReports] = useState(false);

  // Person 1 Details
  const [person1, setPerson1] = useState<ReportMemberData>({
    fullName: "",
    gender: "male",
    day: 15,
    month: 8,
    year: 1998,
    hour: 10,
    min: 30,
    sec: 0,
    place: "New Delhi, India",
    lat: 28.6139,
    lon: 77.209,
    tzone: 5.5,
  });

  // Person 2 Details (for Couple / Matching reports)
  const [person2, setPerson2] = useState<ReportMemberData>({
    fullName: "",
    gender: "female",
    day: 20,
    month: 5,
    year: 1999,
    hour: 14,
    min: 15,
    sec: 0,
    place: "Mumbai, India",
    lat: 19.076,
    lon: 72.8777,
    tzone: 5.5,
  });

  const isCoupleReport =
    (report?.personCount || 1) === 2 ||
    report?.categoryKey === "natal_couple_report" ||
    report?.reportType === "match_making";

  // Sync initialReport
  useEffect(() => {
    setReport(initialReport);
  }, [initialReport]);

  // Load package details and variants when report opens
  useEffect(() => {
    if (!initialReport) return;
    setActiveTab("preview");
    setOrderSuccess(null);
    setOrderError("");

    let isMounted = true;
    async function loadFullData() {
      const packageId = initialReport?.backendPackageId || initialReport?.id;
      if (!packageId) return;

      setLoadingDetails(true);
      try {
        // 1. Fetch live package by ID
        const [pkgRes, varRes] = await Promise.allSettled([
          getReportPackageById(packageId),
          getReportPackageVariants({ reportPackage: packageId }),
        ]);

        if (pkgRes.status === "fulfilled" && pkgRes.value?.data && isMounted) {
          const pkg = pkgRes.value.data;
          const catObj = typeof pkg.category === "object" ? pkg.category : null;
          const firstVariant = pkg.variants && pkg.variants[0];

          setReport((prev) => ({
            ...(prev || initialReport!),
            title: pkg.title || prev?.title || "Astrology Report",
            shortTitle: pkg.shortTitle || prev?.shortTitle,
            thumbImage: pkg.thumbImage || prev?.thumbImage,
            description: pkg.description || prev?.description || "",
            benefits: pkg.benefits && pkg.benefits.length > 0 ? pkg.benefits : prev?.benefits || [],
            reportType: pkg.reportType || prev?.reportType || "vedic_report",
            personCount: pkg.personCount || prev?.personCount || 1,
            hasVariants: Boolean(pkg.hasVariants),
            variants: pkg.variants || prev?.variants || [],
            categoryKey: catObj?.key || prev?.categoryKey || "vedic_reports",
            categoryTitle: catObj?.title || prev?.categoryTitle || "Vedic Reports",
          }));
        }

        // 2. Set variants
        if (varRes.status === "fulfilled" && varRes.value?.data && Array.isArray(varRes.value.data) && varRes.value.data.length > 0 && isMounted) {
          setVariants(varRes.value.data);
          const def = varRes.value.data.find((v: any) => v.isDefault) || varRes.value.data[0];
          setSelectedVariant(def);
        } else if (initialReport?.variants && initialReport.variants.length > 0 && isMounted) {
          setVariants(initialReport.variants);
          setSelectedVariant(initialReport.variants.find((v) => v.isDefault) || initialReport.variants[0]);
        }
      } catch (err) {
        console.error("Failed to load report package details", err);
      } finally {
        if (isMounted) setLoadingDetails(false);
      }
    }

    loadFullData();
    return () => {
      isMounted = false;
    };
  }, [initialReport]);

  const handleSelectVariant = async (variant: ReportVariantData) => {
    setSelectedVariant(variant);
    try {
      if (variant._id) {
        const res = await getReportPackageVariantById(variant._id);
        if (res?.data) {
          setSelectedVariant((prev) => ({
            ...(prev || variant),
            ...res.data,
          }));
        }
      }
    } catch (err) {
      console.error("Error fetching single variant details:", err);
    }
  };

  // Load user transactions when My Reports tab is selected
  useEffect(() => {
    if (activeTab === "my-reports") {
      setLoadingMyReports(true);
      getMyReportTransactions({ limit: 20 })
        .then((res) => {
          if (res?.data && Array.isArray(res.data)) {
            setMyTransactions(res.data);
          }
        })
        .finally(() => setLoadingMyReports(false));
    }
  }, [activeTab]);

  if (!report) return null;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!person1.fullName.trim()) {
      setOrderError("Please enter full name for Person 1.");
      return;
    }
    if (isCoupleReport && !person2.fullName.trim()) {
      setOrderError("Please enter full name for Partner.");
      return;
    }

    setSubmittingOrder(true);
    setOrderError("");

    const members: ReportMemberData[] = [person1];
    if (isCoupleReport) {
      members.push(person2);
    }

    try {
      const payload = {
        reportPackage: report.backendPackageId || report.id,
        reportPackageVariant: selectedVariant?._id || report.backendVariantId || "default_variant",
        members,
        lan: language,
        PaymentMethod: paymentMethod,
        gstAmount: 0,
      };

      const res = await createReportTransaction(payload);
      setOrderSuccess(res?.data || res);
      toast.success("Report Order Placed Successfully!", {
        description: "Your report is being prepared. You can view or download it.",
      });
    } catch (err: any) {
      setOrderError(
        err?.message || "Failed to initiate report generation. Please log in or verify details."
      );
    } finally {
      setSubmittingOrder(false);
    }
  };

  const currentPrice = selectedVariant?.sellPrice ?? report.sellPrice ?? 299;
  const originalPrice = selectedVariant?.price ?? report.price ?? 599;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#fdfaf3] rounded-3xl shadow-2xl border border-amber-300 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#2d1a0e] via-[#432414] to-[#2d1a0e] text-white border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 block">
                Vedic Astrology Report Suite
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white line-clamp-1">
                {report.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-amber-200/80 bg-white px-4 sm:px-6 gap-2 sm:gap-4 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab("preview")}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "border-[#c85a17] text-[#c85a17]"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Overview & Preview</span>
          </button>
          <button
            onClick={() => setActiveTab("order")}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "order"
                ? "border-[#c85a17] text-[#c85a17]"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate & Order Report</span>
          </button>
          <button
            onClick={() => setActiveTab("my-reports")}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "my-reports"
                ? "border-[#c85a17] text-[#c85a17]"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>My Purchased Reports</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-slate-800 text-sm">
          {/* TAB 1: OVERVIEW & SAMPLE PREVIEW */}
          {activeTab === "preview" && (
            <div className="space-y-6">
              {/* Header Box */}
              <div className="p-6 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-[#c85a17] border border-amber-300">
                      Vedic Certified Calculation
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {report.pages}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#2d1a0e]">
                    {report.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {report.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center shrink-0 min-w-[130px]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Special Price
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-black text-[#c85a17]">
                      ₹{currentPrice}
                    </span>
                    {originalPrice > currentPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold mt-1">
                    Instant Download
                  </span>
                </div>
              </div>

              {/* Package Variants Selection */}
              <div className="space-y-3 p-5 rounded-2xl bg-white border border-amber-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-[#2d1a0e] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#c85a17]" />
                    <span>Available Package Variants &amp; Timelines:</span>
                  </h4>
                  <span className="text-[11px] font-bold text-[#c85a17] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {variants.length} {variants.length === 1 ? "Option" : "Options"} Available
                  </span>
                </div>

                {loadingDetails ? (
                  <div className="py-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Loader2 className="w-4 h-4 animate-spin text-[#c85a17]" />
                    <span>Fetching live package variants...</span>
                  </div>
                ) : variants.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {variants.map((v) => {
                      const isSelected = selectedVariant?._id === v._id;
                      const discountPercent =
                        v.price > v.sellPrice
                          ? Math.round(((v.price - v.sellPrice) / v.price) * 100)
                          : 0;

                      return (
                        <div
                          key={v._id}
                          onClick={() => handleSelectVariant(v)}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? "bg-gradient-to-b from-amber-50/90 to-orange-50/60 border-[#c85a17] shadow-md ring-2 ring-[#c85a17]/30 scale-[1.02]"
                              : "bg-white border-slate-200 hover:border-amber-300 hover:shadow-sm"
                          }`}
                        >
                          {discountPercent > 0 && (
                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              {discountPercent}% OFF
                            </span>
                          )}

                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span
                                className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                  isSelected
                                    ? "border-[#c85a17] bg-[#c85a17] text-white"
                                    : "border-slate-300 bg-slate-100 text-transparent"
                                }`}
                              >
                                ✓
                              </span>
                              <span className="text-xs font-bold text-slate-900 line-clamp-1">
                                {typeof v.variantName === "string" ? v.variantName : "Standard Report"}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-500 font-medium">
                              {v.duration ? v.duration : v.pages ? `${v.pages} Pages PDF` : "Detailed Analysis"}
                            </p>
                          </div>

                          <div className="flex items-baseline gap-1.5 mt-3 pt-2 border-t border-slate-100">
                            <span className="text-base font-black text-[#c85a17]">
                              ₹{v.sellPrice}
                            </span>
                            {v.price > v.sellPrice && (
                              <span className="text-xs text-slate-400 line-through">
                                ₹{v.price}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-700">
                    Standard comprehensive edition included with full charts and remedies.
                  </div>
                )}
              </div>

              {/* What's Inside This Report */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-[#2d1a0e] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Comprehensive Report Features:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(report.benefits || []).map((feat, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-800">{feat}</span>
                    </div>
                  ))}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-800">
                      Verified Mahadasha Timeline & Astrological Yogas
                    </span>
                  </div>
                </div>
              </div>

              {/* Sample Planetary Table */}
              <div className="p-4 rounded-2xl bg-white border border-amber-200/80 overflow-x-auto">
                <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-800">
                  <span>Sample Astrological Chart Breakdown</span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    High Accuracy Ephemeris
                  </span>
                </div>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-amber-100/50 text-slate-700 border-b border-amber-200">
                      <th className="p-2 font-bold">Planet</th>
                      <th className="p-2 font-bold">Sign (Rashi)</th>
                      <th className="p-2 font-bold">Degree</th>
                      <th className="p-2 font-bold">Nakshatra</th>
                      <th className="p-2 font-bold">House</th>
                      <th className="p-2 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2 font-semibold">Sun (सूर्य)</td>
                      <td className="p-2">Leo (सिंह)</td>
                      <td className="p-2">12° 24&apos;</td>
                      <td className="p-2">Magha (1)</td>
                      <td className="p-2">1st House</td>
                      <td className="p-2 text-emerald-700 font-bold">Own Sign</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">Moon (चन्द्र)</td>
                      <td className="p-2">Taurus (वृषभ)</td>
                      <td className="p-2">03° 10&apos;</td>
                      <td className="p-2">Krittika (2)</td>
                      <td className="p-2">10th House</td>
                      <td className="p-2 text-emerald-700 font-bold">Exalted</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">Jupiter (गुरु)</td>
                      <td className="p-2">Pisces (मीन)</td>
                      <td className="p-2">24° 50&apos;</td>
                      <td className="p-2">Revati (3)</td>
                      <td className="p-2">8th House</td>
                      <td className="p-2 text-emerald-700 font-bold">Own House</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER & BIRTH DETAILS FORM */}
          {activeTab === "order" && (
            <form onSubmit={handleOrderSubmit} className="space-y-6">
              {orderSuccess ? (
                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Report Order Created Successfully!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your report calculation request has been recorded. You can view progress and download the completed PDF in the &quot;My Purchased Reports&quot; tab.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("my-reports")}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    View My Reports
                  </button>
                </div>
              ) : (
                <>
                  {/* Language & Payment Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-amber-200/80">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Report Language</span>
                      <span className="text-[11px] text-slate-500">Choose PDF output language</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setLanguage("en")}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          language === "en"
                            ? "bg-[#c85a17] text-white border-[#c85a17]"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => setLanguage("hi")}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          language === "hi"
                            ? "bg-[#c85a17] text-white border-[#c85a17]"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                      >
                        हिन्दी (Hindi)
                      </button>
                    </div>
                  </div>

                  {/* Variant Selection in Order Tab (if variants exist) */}
                  {variants.length > 0 && (
                    <div className="p-4 rounded-2xl bg-white border border-[#e6c896] space-y-2.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2b1810] flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-[#1b4327]" />
                          <span>Select Package Variant / Duration:</span>
                        </h4>
                        <span className="text-[11px] font-bold text-[#1b4327] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                          {selectedVariant?.variantName || "Standard"}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {variants.map((v) => {
                          const isSelected = selectedVariant?._id === v._id;
                          return (
                            <button
                              key={v._id}
                              type="button"
                              onClick={() => handleSelectVariant(v)}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-emerald-50/70 border-[#1b4327] shadow-xs ring-2 ring-[#1b4327]/20"
                                  : "bg-slate-50/70 border-slate-200 hover:border-[#1b4327]/60"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900">
                                  {typeof v.variantName === "string" ? v.variantName : "Standard"}
                                </span>
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#1b4327]" />}
                              </div>
                              <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-sm font-extrabold text-[#1b4327]">
                                  ₹{v.sellPrice}
                                </span>
                                {v.price > v.sellPrice && (
                                  <span className="text-[10px] text-slate-400 line-through">
                                    ₹{v.price}
                                  </span>
                                )}
                                {v.pages && (
                                  <span className="text-[10px] text-slate-500 ml-auto">
                                    {v.pages} pgs
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Person 1 Details */}
                  <div className="p-5 rounded-2xl bg-white border border-amber-200/80 space-y-4">
                    <h4 className="font-serif font-bold text-sm text-[#2d1a0e] flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#c85a17]" />
                      <span>{isCoupleReport ? "Person 1 (Primary Details):" : "Birth & Identity Details:"}</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={person1.fullName}
                          onChange={(e) => setPerson1({ ...person1, fullName: e.target.value })}
                          placeholder="Enter your full name"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#c85a17]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Gender
                        </label>
                        <select
                          value={person1.gender}
                          onChange={(e) =>
                            setPerson1({ ...person1, gender: e.target.value as "male" | "female" | "other" })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#c85a17]"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Date of Birth (DD / MM / YYYY)
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          <input
                            type="number"
                            min={1}
                            max={31}
                            value={person1.day}
                            onChange={(e) => setPerson1({ ...person1, day: Number(e.target.value) })}
                            className="px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-center"
                          />
                          <input
                            type="number"
                            min={1}
                            max={12}
                            value={person1.month}
                            onChange={(e) => setPerson1({ ...person1, month: Number(e.target.value) })}
                            className="px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-center"
                          />
                          <input
                            type="number"
                            min={1920}
                            max={2030}
                            value={person1.year}
                            onChange={(e) => setPerson1({ ...person1, year: Number(e.target.value) })}
                            className="px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-center"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Time of Birth (Hour : Minute)
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          <input
                            type="number"
                            min={0}
                            max={23}
                            placeholder="Hour (0-23)"
                            value={person1.hour}
                            onChange={(e) => setPerson1({ ...person1, hour: Number(e.target.value) })}
                            className="px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-center"
                          />
                          <input
                            type="number"
                            min={0}
                            max={59}
                            placeholder="Min (0-59)"
                            value={person1.min}
                            onChange={(e) => setPerson1({ ...person1, min: Number(e.target.value) })}
                            className="px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-center"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Place of Birth (City, State, Country)
                        </label>
                        <input
                          type="text"
                          required
                          value={person1.place}
                          onChange={(e) => setPerson1({ ...person1, place: e.target.value })}
                          placeholder="e.g. New Delhi, Delhi, India"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#c85a17]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Person 2 Details (If Couple Report) */}
                  {isCoupleReport && (
                    <div className="p-5 rounded-2xl bg-white border border-rose-200/80 space-y-4">
                      <h4 className="font-serif font-bold text-sm text-rose-900 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-rose-600" />
                        <span>Person 2 (Partner Details for Kundli Milan):</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Partner&apos;s Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={person2.fullName}
                            onChange={(e) => setPerson2({ ...person2, fullName: e.target.value })}
                            placeholder="Enter partner's full name"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-rose-600"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Partner&apos;s Gender
                          </label>
                          <select
                            value={person2.gender}
                            onChange={(e) =>
                              setPerson2({ ...person2, gender: e.target.value as "male" | "female" | "other" })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                          >
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Partner&apos;s Place of Birth
                          </label>
                          <input
                            type="text"
                            required
                            value={person2.place}
                            onChange={(e) => setPerson2({ ...person2, place: e.target.value })}
                            placeholder="e.g. Mumbai, Maharashtra, India"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Alert */}
                  {orderError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{orderError}</span>
                    </div>
                  )}

                  {/* Order Summary & Submit Button */}
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-600 block">Total Payable:</span>
                      <span className="text-xl font-black text-[#c85a17]">
                        ₹{currentPrice}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingOrder}
                      className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-[#c85a17] hover:bg-[#a9480e] text-white text-xs sm:text-sm font-extrabold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {submittingOrder ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Generating Report...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm & Generate Report</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}

          {/* TAB 3: MY PURCHASED REPORTS */}
          {activeTab === "my-reports" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-sm text-[#2d1a0e]">
                  Your Generated Astrology Reports
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setLoadingMyReports(true);
                    getMyReportTransactions({ limit: 20 })
                      .then((res) => {
                        if (res?.data && Array.isArray(res.data)) {
                          setMyTransactions(res.data);
                        }
                      })
                      .finally(() => setLoadingMyReports(false));
                  }}
                  className="text-xs font-bold text-[#c85a17] hover:underline cursor-pointer"
                >
                  Refresh
                </button>
              </div>

              {loadingMyReports ? (
                <div className="py-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#c85a17]" />
                  <span>Loading your reports...</span>
                </div>
              ) : myTransactions.length > 0 ? (
                <div className="space-y-3">
                  {myTransactions.map((item) => (
                    <div
                      key={item._id}
                      className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            {item.reportPackage?.title || "Astrology Report"}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.reportStatus === "generated"
                                ? "bg-emerald-100 text-emerald-800"
                                : item.reportStatus === "processing"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {item.reportStatus}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {item.members && item.members[0] ? `Person: ${item.members[0].fullName}` : ""} •{" "}
                          Language: {item.lan?.toUpperCase() || "EN"}
                        </p>
                      </div>

                      {item.reportUrl ? (
                        <a
                          href={item.reportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Processing Report</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 bg-white rounded-2xl border border-amber-200/70 p-6 text-center space-y-2">
                  <FileText className="w-8 h-8 text-amber-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-800">No reports ordered yet</p>
                  <p className="text-[11px] text-slate-500">
                    Switch to &quot;Generate & Order Report&quot; to order your first report.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-white border-t border-amber-200/80">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>

          {activeTab === "preview" && (
            <button
              onClick={() => setActiveTab("order")}
              className="px-6 py-2.5 rounded-xl bg-[#c85a17] hover:bg-[#a9480e] text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Proceed to Order (₹{currentPrice})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportPreviewModal;
