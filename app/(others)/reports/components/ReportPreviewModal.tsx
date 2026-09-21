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
  ShieldCheck,
  Zap,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Check,
  Eye,
  Award,
  Flame,
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
import { formatImageUrl } from "@/lib/utils";
import { toast } from "@components/ui/toaster";

interface ReportPreviewModalProps {
  report: AstrologyReportItem | null;
  onClose: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Beautiful Vedic Astrological SVG Emblems for fallback / decoration
// ─────────────────────────────────────────────────────────────────────────────

function KundliModalEmblem() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#fffbeb" stroke="#d97706" strokeWidth="2.5" />
      <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" fill="#ffffff" stroke="#801c10" strokeWidth="2" />
      <line x1="10" y1="10" x2="90" y2="90" stroke="#d97706" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="90" y1="10" x2="10" y2="90" stroke="#d97706" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="50" cy="50" r="14" fill="#801c10" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="50" cy="50" r="6" fill="#f59e0b" />
    </svg>
  );
}

export function ReportPreviewModal({ report: initialReport, onClose }: ReportPreviewModalProps) {
  const [report, setReport] = useState<AstrologyReportItem | null>(initialReport);
  const [activeTab, setActiveTab] = useState<"preview" | "order" | "my-reports">("preview");
  const [variants, setVariants] = useState<ReportVariantData[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ReportVariantData | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [imgError, setImgError] = useState(false);

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
    setImgError(false);
  }, [initialReport]);

  // Load package details and variants when report opens
  useEffect(() => {
    if (!initialReport) return;
    setActiveTab("preview");
    setOrderSuccess(null);
    setOrderError("");

    let isMounted = true;
    async function loadData() {
      setLoadingDetails(true);
      try {
        const pkgId = initialReport?.backendPackageId || initialReport?.id;
        if (pkgId) {
          const [pkgRes, variantsRes] = await Promise.allSettled([
            getReportPackageById(pkgId),
            getReportPackageVariants({ reportPackage: pkgId, limit: 20 }),
          ]);

          if (isMounted) {
            let loadedVariants: ReportVariantData[] = [];
            if (variantsRes.status === "fulfilled" && variantsRes.value?.data) {
              const resData = Array.isArray(variantsRes.value.data)
                ? variantsRes.value.data
                : variantsRes.value.data?.variants;
              if (Array.isArray(resData) && resData.length > 0) {
                loadedVariants = resData;
              }
            }

            if (loadedVariants.length === 0 && initialReport?.variants && initialReport.variants.length > 0) {
              loadedVariants = initialReport.variants;
            }

            setVariants(loadedVariants);

            if (loadedVariants.length > 0) {
              const def = loadedVariants.find((v) => v.isDefault) || loadedVariants[0];
              setSelectedVariant(def);
            }

            if (pkgRes.status === "fulfilled" && pkgRes.value?.data) {
              const bPkg = pkgRes.value.data;
              const catObj = typeof bPkg.category === "object" ? bPkg.category : null;
              const rawImg =
                bPkg.thumbImage ||
                bPkg.image ||
                bPkg.thumbnail ||
                bPkg.icon ||
                bPkg.photo ||
                bPkg.coverImage ||
                bPkg.img ||
                initialReport.thumbImage ||
                "";

              setReport((prev) => ({
                ...(prev || initialReport),
                title: bPkg.title || prev?.title || initialReport.title,
                shortTitle: bPkg.shortTitle || prev?.shortTitle,
                hindiTitle: bPkg.shortTitle ? `${bPkg.shortTitle} रिपोर्ट` : prev?.hindiTitle,
                description: bPkg.description || prev?.description || initialReport.description,
                thumbImage: formatImageUrl(rawImg),
                benefits:
                  bPkg.benefits && bPkg.benefits.length > 0
                    ? bPkg.benefits
                    : prev?.benefits || initialReport.benefits,
                categoryTitle: catObj?.title || prev?.categoryTitle,
                categoryKey: catObj?.key || prev?.categoryKey || "vedic_reports",
                hasVariants: Boolean(bPkg.hasVariants || loadedVariants.length > 1),
                variants: loadedVariants,
              }));
            }
          }
        }
      } catch (err) {
        console.error("Error fetching report details:", err);
      } finally {
        if (isMounted) setLoadingDetails(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [initialReport]);

  const handleSelectVariant = async (v: ReportVariantData) => {
    setSelectedVariant(v);
    try {
      if (v._id) {
        const fullVariantRes = await getReportPackageVariantById(v._id);
        if (fullVariantRes?.data) {
          setSelectedVariant(fullVariantRes.data);
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
        description: "Your report is being generated. You can view or download it.",
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
  const discountPercent =
    originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  const validImageUrl = formatImageUrl(report.thumbImage);
  const hasValidImage = Boolean(validImageUrl) && !imgError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* 1. Modal Top Banner Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#801c10] via-[#59140b] to-[#2b1810] text-white border-b border-amber-400/30 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-300 text-amber-300 flex items-center justify-center shadow-inner shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                  VEDIC ASTROLOGY REPORT SUITE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white line-clamp-1">
                {report.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Crisp Segmented Navigation Bar on Clean White */}
        <div className="flex items-center border-b border-slate-100 bg-white px-4 sm:px-6 py-3 gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab("preview")}
            className={`py-2 px-4 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "bg-[#1b4327] text-white shadow-sm ring-2 ring-amber-300/40"
                : "bg-slate-50 text-slate-600 border border-slate-200/70 hover:border-[#1b4327] hover:text-[#1b4327]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Overview &amp; Sample</span>
          </button>
          <button
            onClick={() => setActiveTab("order")}
            className={`py-2 px-4 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "order"
                ? "bg-[#1b4327] text-white shadow-sm ring-2 ring-amber-300/40"
                : "bg-slate-50 text-slate-600 border border-slate-200/70 hover:border-[#1b4327] hover:text-[#1b4327]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate &amp; Order Report</span>
          </button>
          <button
            onClick={() => setActiveTab("my-reports")}
            className={`py-2 px-4 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "my-reports"
                ? "bg-[#1b4327] text-white shadow-sm ring-2 ring-amber-300/40"
                : "bg-slate-50 text-slate-600 border border-slate-200/70 hover:border-[#1b4327] hover:text-[#1b4327]"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>My Purchased Reports</span>
          </button>
        </div>

        {/* 3. Scrollable Content Body on Pure White */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 bg-white text-slate-800 text-sm">
          {/* TAB 1: OVERVIEW & SAMPLE PREVIEW */}
          {activeTab === "preview" && (
            <div className="space-y-6">
              {/* Grand Vedic Hero Certificate Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                {/* Left Visual Artwork */}
                <div className="relative shrink-0 flex items-center justify-center">
                  {hasValidImage ? (
                    <img
                      src={validImageUrl}
                      alt={report.title}
                      onError={() => setImgError(true)}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-[#1b4327] shadow-md p-1 bg-white"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-amber-50/80 border-2 border-amber-300 flex items-center justify-center shadow-md p-1">
                      <KundliModalEmblem />
                    </div>
                  )}
                </div>

                {/* Content Description */}
                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-[#801c10] border border-amber-300 shadow-2xs">
                      ✨ Certified Vedic Accuracy
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                      📜 {report.pages}
                    </span>
                    {discountPercent > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-800 border border-red-300 shadow-2xs">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                    {report.title}
                  </h2>

                  {report.hindiTitle && (
                    <span className="inline-block text-xs font-semibold text-[#801c10] bg-amber-100/60 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {report.hindiTitle}
                    </span>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
                    {report.description}
                  </p>
                </div>

                {/* Right Price Card */}
                <div className="p-4 rounded-2xl bg-white border border-amber-200 flex flex-col items-center justify-center shrink-0 min-w-[140px] shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    SPECIAL OFFER
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl font-black text-[#801c10]">
                      ₹{currentPrice}
                    </span>
                    {originalPrice > currentPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-600" /> Instant PDF
                  </span>
                </div>
              </div>

              {/* Package Variants Selection */}
              <div className="space-y-3 p-5 rounded-3xl bg-slate-50/50 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#801c10]" />
                    <span>Available Package Variants &amp; Timelines:</span>
                  </h4>
                  <span className="text-[11px] font-bold text-[#801c10] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {variants.length} {variants.length === 1 ? "Option" : "Options"} Available
                  </span>
                </div>

                {loadingDetails ? (
                  <div className="py-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Loader2 className="w-4 h-4 animate-spin text-[#1b4327]" />
                    <span>Fetching live package variants...</span>
                  </div>
                ) : variants.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {variants.map((v) => {
                      const isSelected = selectedVariant?._id === v._id;
                      const varDiscount =
                        v.price > v.sellPrice
                          ? Math.round(((v.price - v.sellPrice) / v.price) * 100)
                          : 0;

                      return (
                        <div
                          key={v._id}
                          onClick={() => handleSelectVariant(v)}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? "bg-white border-[#1b4327] shadow-md ring-2 ring-[#1b4327]/30 scale-[1.02]"
                              : "bg-white border-slate-200 hover:border-amber-300 hover:shadow-xs"
                          }`}
                        >
                          {varDiscount > 0 && (
                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              {varDiscount}% OFF
                            </span>
                          )}

                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span
                                className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                  isSelected
                                    ? "border-[#1b4327] bg-[#1b4327] text-white"
                                    : "border-slate-300 bg-slate-100 text-transparent"
                                }`}
                              >
                                ✓
                              </span>
                              <span className="text-xs font-bold text-slate-900 line-clamp-1">
                                {typeof v.variantName === "string" ? v.variantName : "Standard Edition"}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-500 font-medium">
                              {v.duration ? v.duration : v.pages ? `${v.pages} Pages PDF` : "Detailed Analysis"}
                            </p>
                          </div>

                          <div className="flex items-baseline gap-1.5 mt-3 pt-2 border-t border-slate-100">
                            <span className="text-base font-black text-[#801c10]">
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

              {/* Comprehensive Features & Sections */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Comprehensive Report Features &amp; Sections:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(report.benefits || []).map((feat, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-slate-50/70 hover:bg-emerald-50/30 border border-slate-200/70 hover:border-emerald-300 flex items-start gap-2.5 transition-colors shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-800">{feat}</span>
                    </div>
                  ))}
                  <div className="p-3.5 rounded-2xl bg-slate-50/70 hover:bg-emerald-50/30 border border-slate-200/70 hover:border-emerald-300 flex items-start gap-2.5 transition-colors shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-800">
                      Verified Mahadasha Timeline &amp; Astrological Yogas
                    </span>
                  </div>
                </div>
              </div>

              {/* Sample Planetary Table on White */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200/80 overflow-x-auto shadow-xs">
                <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-800">
                  <span className="font-serif text-sm">Sample Astrological Chart Breakdown</span>
                  <span className="text-[10px] text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-300 font-bold">
                    Lahiri Ephemeris
                  </span>
                </div>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                      <th className="p-2.5 font-bold">Planet</th>
                      <th className="p-2.5 font-bold">Sign (Rashi)</th>
                      <th className="p-2.5 font-bold">Degree</th>
                      <th className="p-2.5 font-bold">Nakshatra</th>
                      <th className="p-2.5 font-bold">House</th>
                      <th className="p-2.5 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-bold text-[#801c10]">Sun (सूर्य)</td>
                      <td className="p-2.5">Leo (सिंह)</td>
                      <td className="p-2.5">12&deg; 24&apos;</td>
                      <td className="p-2.5">Magha (1)</td>
                      <td className="p-2.5">1st House</td>
                      <td className="p-2.5 text-emerald-700 font-bold">Own Sign</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#801c10]">Moon (चन्द्र)</td>
                      <td className="p-2.5">Taurus (वृषभ)</td>
                      <td className="p-2.5">03&deg; 10&apos;</td>
                      <td className="p-2.5">Krittika (2)</td>
                      <td className="p-2.5">10th House</td>
                      <td className="p-2.5 text-emerald-700 font-bold">Exalted</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#801c10]">Jupiter (गुरु)</td>
                      <td className="p-2.5">Pisces (मीन)</td>
                      <td className="p-2.5">24&deg; 50&apos;</td>
                      <td className="p-2.5">Revati (3)</td>
                      <td className="p-2.5">8th House</td>
                      <td className="p-2.5 text-emerald-700 font-bold">Own House</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Trust Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="font-bold text-slate-900 block">100% Confidential</span>
                  <span className="text-[10px] text-slate-500">Your birth info is private</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <Zap className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <span className="font-bold text-slate-900 block">Instant Generation</span>
                  <span className="text-[10px] text-slate-500">PDF delivered immediately</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <Sparkles className="w-4 h-4 text-[#801c10] mx-auto mb-1" />
                  <span className="font-bold text-slate-900 block">Vedic Remedies</span>
                  <span className="text-[10px] text-slate-500">Personalized gemstone advice</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER & BIRTH DETAILS FORM */}
          {activeTab === "order" && (
            <form onSubmit={handleOrderSubmit} className="space-y-6">
              {orderSuccess ? (
                <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-3xl font-bold shadow-sm">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">
                    Report Order Created Successfully!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your report calculation request has been recorded. You can view progress and download the completed PDF in the &quot;My Purchased Reports&quot; tab.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("my-reports")}
                    className="px-8 py-3 rounded-full bg-[#1b4327] hover:bg-[#13321d] text-white text-xs font-bold shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>View My Reports</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  {/* Language Selection Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-slate-50/70 border border-slate-200 shadow-2xs">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Report Output Language</span>
                      <span className="text-[11px] text-slate-500">Select your preferred PDF language</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setLanguage("en")}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          language === "en"
                            ? "bg-[#1b4327] text-white border-[#1b4327] shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:border-[#1b4327]"
                        }`}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => setLanguage("hi")}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          language === "hi"
                            ? "bg-[#1b4327] text-white border-[#1b4327] shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:border-[#1b4327]"
                        }`}
                      >
                        हिन्दी (Hindi)
                      </button>
                    </div>
                  </div>

                  {/* Variant Selection in Order Tab (if variants exist) */}
                  {variants.length > 0 && (
                    <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-[#801c10]" />
                          <span>Select Edition / Duration:</span>
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
                              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-emerald-50/70 border-[#1b4327] shadow-xs ring-2 ring-[#1b4327]/20"
                                  : "bg-slate-50/50 border-slate-200 hover:border-[#1b4327]/60"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900">
                                  {typeof v.variantName === "string" ? v.variantName : "Standard"}
                                </span>
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#1b4327]" />}
                              </div>
                              <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-sm font-extrabold text-[#801c10]">
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
                  <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-2xs">
                    <h4 className="font-serif font-bold text-sm text-[#801c10] flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#801c10]" />
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
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#1b4327]"
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#1b4327]"
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
                            className="px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-center text-slate-900"
                          />
                          <input
                            type="number"
                            min={1}
                            max={12}
                            value={person1.month}
                            onChange={(e) => setPerson1({ ...person1, month: Number(e.target.value) })}
                            className="px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-center text-slate-900"
                          />
                          <input
                            type="number"
                            min={1920}
                            max={2030}
                            value={person1.year}
                            onChange={(e) => setPerson1({ ...person1, year: Number(e.target.value) })}
                            className="px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-center text-slate-900"
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
                            className="px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-center text-slate-900"
                          />
                          <input
                            type="number"
                            min={0}
                            max={59}
                            placeholder="Min (0-59)"
                            value={person1.min}
                            onChange={(e) => setPerson1({ ...person1, min: Number(e.target.value) })}
                            className="px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-center text-slate-900"
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#1b4327]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Person 2 Details (If Couple Report) */}
                  {isCoupleReport && (
                    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-rose-200 space-y-4 shadow-2xs">
                      <h4 className="font-serif font-bold text-sm text-rose-900 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-rose-600" />
                        <span>Person 2 (Partner Details for Kundli Milan):</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-rose-900/70 mb-1">
                            Partner&apos;s Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={person2.fullName}
                            onChange={(e) => setPerson2({ ...person2, fullName: e.target.value })}
                            placeholder="e.g. Priya Patel"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-rose-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-rose-600"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-rose-900/70 mb-1">
                            Partner&apos;s Gender
                          </label>
                          <select
                            value={person2.gender}
                            onChange={(e) =>
                              setPerson2({ ...person2, gender: e.target.value as "male" | "female" | "other" })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-rose-200 text-xs font-semibold text-slate-900"
                          >
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-rose-900/70 mb-1">
                            Partner&apos;s Place of Birth
                          </label>
                          <input
                            type="text"
                            required
                            value={person2.place}
                            onChange={(e) => setPerson2({ ...person2, place: e.target.value })}
                            placeholder="e.g. Mumbai, Maharashtra, India"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-rose-200 text-xs font-semibold text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Alert */}
                  {orderError && (
                    <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{orderError}</span>
                    </div>
                  )}

                  {/* Order Summary & Submit Button */}
                  <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                    <div>
                      <span className="text-xs text-slate-500 block">Total Payable:</span>
                      <span className="text-2xl font-black text-[#801c10]">
                        ₹{currentPrice}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingOrder}
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#1b4327] hover:bg-[#13321d] text-white text-xs sm:text-sm font-extrabold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.02]"
                    >
                      {submittingOrder ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Generating PDF Report...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm &amp; Generate Report</span>
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
                <h4 className="font-serif font-bold text-sm text-slate-900">
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
                  className="text-xs font-bold text-[#801c10] hover:underline cursor-pointer"
                >
                  Refresh
                </button>
              </div>

              {loadingMyReports ? (
                <div className="py-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#1b4327]" />
                  <span>Loading your reports...</span>
                </div>
              ) : myTransactions.length > 0 ? (
                <div className="space-y-3">
                  {myTransactions.map((item) => (
                    <div
                      key={item._id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            {item.reportPackage?.title || "Astrology Report"}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
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
                          className="px-4 py-2 rounded-full bg-[#1b4327] hover:bg-[#13321d] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
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
                <div className="py-12 bg-slate-50 rounded-3xl border border-slate-200 p-6 text-center space-y-2">
                  <FileText className="w-8 h-8 text-amber-600 mx-auto" />
                  <p className="text-xs font-bold text-slate-900">No reports ordered yet</p>
                  <p className="text-[11px] text-slate-500">
                    Switch to &quot;Generate &amp; Order Report&quot; to order your first report.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. Modal Footer Controls on White */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-white border-t border-slate-100 shadow-xs">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>

          {activeTab === "preview" && (
            <button
              onClick={() => setActiveTab("order")}
              className="px-6 py-2.5 rounded-full bg-[#1b4327] hover:bg-[#13321d] text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
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
