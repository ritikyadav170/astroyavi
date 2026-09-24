"use client";

import React, { useState } from "react";
import {
  Share2,
  Sparkles,
  ArrowLeft,
  Check,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Gem,
  Compass,
  Star,
  Clock,
  User,
  Heart,
  Briefcase,
  Layers,
} from "lucide-react";
import { KundliFormData, FullKundliReportData, reportTabs } from "../kundliApi";

interface KundliReportDetailsProps {
  formData: KundliFormData;
  reportData: FullKundliReportData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  shareCopied: boolean;
  handleShare: () => void;
  onReset: () => void;
}

function safeRender(val: any, fallback = "--"): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "string") return val.trim() || fallback;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (typeof val === "object") {
    if (typeof val.result === "string" && val.result.trim()) return val.result.trim();
    if (typeof val.description === "string" && val.description.trim()) return val.description.trim();
    if (typeof val.report === "string" && val.report.trim()) return val.report.trim();
    if (typeof val.name === "string" && val.name.trim()) return val.name.trim();
    if (typeof val.effects === "string" && val.effects.trim()) return val.effects.trim();
    if (typeof val.type === "string" && val.type.trim() && !val.result) return val.type.trim();
    if (typeof val.text === "string" && val.text.trim()) return val.text.trim();
    if (Array.isArray(val)) {
      return val.map((v) => safeRender(v, "")).filter(Boolean).join(", ") || fallback;
    }
    return fallback;
  }
  return fallback;
}

export function KundliReportDetails({
  formData,
  reportData,
  activeTab,
  setActiveTab,
  shareCopied,
  handleShare,
  onReset,
}: KundliReportDetailsProps) {
  const [activeChart, setActiveChart] = useState<"D1" | "D9" | "MOON">("D1");
  const { basic, planets, charts, doshas, dashas, predictions, remedies } = reportData;

  const currentChartSvg =
    activeChart === "D1"
      ? charts.d1Svg
      : activeChart === "D9"
      ? charts.d9Svg
      : charts.moonSvg;

  return (
    <div className="w-full max-w-[1150px] flex flex-col items-center animate-in fade-in duration-300 space-y-8">
      {/* Top Action & Navigation Row */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-amber-200/80">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-100/70 hover:bg-amber-100 text-[#801c10] font-bold text-xs transition-colors cursor-pointer border border-amber-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Birth Details</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1b4327] hover:bg-[#13321d] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
          >
            {shareCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-300" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Share Kundli</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Header Ornament & User Summary */}
      <div className="flex flex-col items-center text-center max-w-3xl space-y-3">
        <div className="flex items-center gap-3 text-[#c87638]">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c87638]" />
            VEDIC KUNDLI ANALYSIS
          </span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#801c10] tracking-tight leading-snug">
          Vedic Janam Kundli for {basic.name}
        </h1>

        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/60 border border-amber-300 text-amber-950 text-xs font-semibold">
          <span>DOB: {basic.dateOfBirth}</span>
          <span className="text-amber-700">•</span>
          <span>Time: {basic.timeOfBirth}</span>
          <span className="text-amber-700">•</span>
          <span>Place: {basic.placeOfBirth}</span>
          <span className="text-amber-700">•</span>
          <span className="text-[#801c10] font-bold">Lagna: {basic.ascendant}</span>
        </div>
      </div>

      {/* Tab Navigation Bar */}
      <div className="w-full flex items-center justify-start sm:justify-center border-b border-amber-200/80 overflow-x-auto pb-1 scrollbar-none gap-2 sm:gap-6 bg-white/60 p-2 rounded-2xl border border-[#e6c896]">
        {reportTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-3 text-xs sm:text-sm font-bold whitespace-nowrap rounded-xl transition-all cursor-pointer ${
              activeTab === tab
                ? "bg-[#1b4327] text-white shadow-xs"
                : "text-[#5c4033] hover:text-[#1b4327] hover:bg-amber-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: BASIC DETAILS */}
      {/* ========================================================================= */}
      {activeTab === "Basic Details" && (
        <div className="w-full space-y-6 animate-in fade-in duration-200">
          {/* 1. Personal & Birth Info */}
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#801c10] border-b border-amber-100 pb-3 flex items-center gap-2">
              <User className="w-4.5 h-4.5 text-[#c87638]" />
              Birth &amp; Geographical Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/80 flex justify-between items-center">
                <span className="text-[#5c4033] font-semibold">Full Name</span>
                <span className="font-bold text-[#2b1810]">{basic.name}</span>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/80 flex justify-between items-center">
                <span className="text-[#5c4033] font-semibold">Date &amp; Time</span>
                <span className="font-bold text-[#2b1810]">{basic.dateOfBirth} | {basic.timeOfBirth}</span>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/80 flex justify-between items-center">
                <span className="text-[#5c4033] font-semibold">Birth Place</span>
                <span className="font-bold text-[#2b1810]">{basic.placeOfBirth}</span>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/80 flex justify-between items-center">
                <span className="text-[#5c4033] font-semibold">Gender</span>
                <span className="font-bold text-[#2b1810]">{basic.gender}</span>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/80 flex justify-between items-center">
                <span className="text-[#5c4033] font-semibold">Coordinates</span>
                <span className="font-bold text-[#2b1810]">{basic.lat?.toFixed(2)}° N, {basic.lon?.toFixed(2)}° E</span>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/80 flex justify-between items-center">
                <span className="text-[#5c4033] font-semibold">Sunrise / Sunset</span>
                <span className="font-bold text-[#2b1810]">{basic.sunrise} / {basic.sunset}</span>
              </div>
            </div>
          </div>

          {/* 2. Avakahada & Panchangam Chakra Table */}
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#801c10] border-b border-amber-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-[#c87638]" />
              Avakahada Chakra &amp; Panchangam
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Ascendant (Lagna)</span>
                  <span className="font-bold text-[#801c10]">{basic.ascendant}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Ascendant Lord</span>
                  <span className="font-bold text-[#2b1810]">{basic.ascendantLord}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Moon Sign (Rashi)</span>
                  <span className="font-bold text-[#801c10]">{basic.sign}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Moon Sign Lord</span>
                  <span className="font-bold text-[#2b1810]">{basic.signLord}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Birth Nakshatra</span>
                  <span className="font-bold text-[#2b1810]">{basic.nakshatra} (Pada {basic.charan})</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Nakshatra Lord</span>
                  <span className="font-bold text-[#2b1810]">{basic.nakshatraLord}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Birth Yoga</span>
                  <span className="font-bold text-[#2b1810]">{basic.yog}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Birth Karana</span>
                  <span className="font-bold text-[#2b1810]">{basic.karan}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Birth Tithi</span>
                  <span className="font-bold text-[#2b1810]">{basic.tithi} ({basic.paksha})</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Tatva (Element)</span>
                  <span className="font-bold text-[#2b1810]">{basic.tatva}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Gana</span>
                  <span className="font-bold text-[#2b1810]">{basic.gan}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Yoni</span>
                  <span className="font-bold text-[#2b1810]">{basic.yoni}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Nadi</span>
                  <span className="font-bold text-[#2b1810]">{basic.nadi}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-amber-50/40 rounded-xl border border-amber-100/80">
                  <span className="font-medium text-[#5c4033]">Varna / Paya</span>
                  <span className="font-bold text-[#2b1810]">{basic.varna} / {basic.paya}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: KUNDLI PREDICTIONS & YOGAS */}
      {/* ========================================================================= */}
      {activeTab === "Kundli Predictions" && (
        <div className="w-full space-y-6 animate-in fade-in duration-200">
          {/* Ascendant Personality Predictions */}
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-5">
            <h3 className="font-serif text-xl font-bold text-[#801c10] border-b border-amber-100 pb-3 flex items-center gap-2">
              <Compass className="w-4.5 h-4.5 text-[#c87638]" />
              Lagna &amp; Personality Predictions ({basic.ascendant})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                <span className="font-bold text-[#801c10] flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#c87638]" />
                  General Personality &amp; Temperament
                </span>
                <p className="text-[#5c4033] leading-relaxed">{safeRender(predictions.ascendantReport.personality)}</p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1.5">
                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-blue-700" />
                  Career, Profession &amp; Wealth
                </span>
                <p className="text-[#5c4033] leading-relaxed">{safeRender(predictions.ascendantReport.career)}</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1.5">
                <span className="font-bold text-rose-900 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-700" />
                  Love, Relationships &amp; Marriage
                </span>
                <p className="text-[#5c4033] leading-relaxed">{safeRender(predictions.ascendantReport.loveMarriage)}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  Mental Strength &amp; Intellect
                </span>
                <p className="text-[#5c4033] leading-relaxed">{safeRender(predictions.ascendantReport.mental)}</p>
              </div>
            </div>
          </div>

          {/* Special Vedic Yogas in Chart */}
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#801c10] border-b border-amber-100 pb-3 flex items-center gap-2">
              <Star className="w-4.5 h-4.5 text-amber-500" />
              Special Vedic Yogas Present in Chart
            </h3>

            <div className="space-y-3">
              {predictions.yogas.length === 0 ? (
                <p className="text-xs text-[#5c4033] p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  Standard planetary yogas are active in the chart.
                </p>
              ) : (
                predictions.yogas.map((yoga, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#801c10]">{safeRender(yoga.name, "Vedic Yoga")}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 font-bold text-[10px] border border-green-300">
                        Auspicious Yoga
                      </span>
                    </div>
                    <p className="text-[#5c4033]"><strong className="text-[#2b1810]">Formation:</strong> {safeRender(yoga.description)}</p>
                    <p className="text-emerald-900 font-semibold"><strong className="text-[#2b1810]">Result:</strong> {safeRender(yoga.effects)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: POSITION OF PLANETS */}
      {/* ========================================================================= */}
      {activeTab === "Position of Planet" && (
        <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-4 animate-in fade-in duration-200">
          <h3 className="font-serif text-xl font-bold text-[#801c10] border-b border-amber-100 pb-3 flex items-center gap-2">
            <Compass className="w-4.5 h-4.5 text-[#c87638]" />
            Planetary Positions &amp; Degreewise Alignment
          </h3>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-amber-100/70 text-[#801c10] font-bold border-b border-amber-300">
                  <th className="p-3 rounded-l-xl">Planet</th>
                  <th className="p-3">Sign (Rashi)</th>
                  <th className="p-3">Sign Lord</th>
                  <th className="p-3">Degree</th>
                  <th className="p-3">House</th>
                  <th className="p-3">Nakshatra</th>
                  <th className="p-3">Nakshatra Lord</th>
                  <th className="p-3 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {planets.map((p) => (
                  <tr key={p.id} className="hover:bg-amber-50/60 transition-colors">
                    <td className="p-3 font-bold text-[#2b1810] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#1b4327]"></span>
                      {p.name}
                    </td>
                    <td className="p-3 text-[#5c4033] font-semibold">{p.sign}</td>
                    <td className="p-3 text-[#5c4033]">{p.signLord}</td>
                    <td className="p-3 font-mono font-bold text-[#801c10]">{p.normDegree}</td>
                    <td className="p-3 font-bold text-[#2b1810]">House {p.house}</td>
                    <td className="p-3 text-[#5c4033]">{p.nakshatra} (Pada {p.nakshatraPad})</td>
                    <td className="p-3 text-[#5c4033]">{p.nakshatraLord}</td>
                    <td className="p-3">
                      {p.isRetro ? (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[10px] border border-red-200">
                          Retrograde (R)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold text-[10px] border border-green-200">
                          Direct (D)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: KUNDLI CHARTS */}
      {/* ========================================================================= */}
      {activeTab === "Chart" && (
        <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-6 animate-in fade-in duration-200 flex flex-col items-center">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between border-b border-amber-100 pb-3 gap-3">
            <h3 className="font-serif text-xl font-bold text-[#801c10] flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-[#c87638]" />
              Vedic Kundli Charts
            </h3>

            {/* Chart Sub-tabs */}
            <div className="flex items-center bg-amber-50 p-1 rounded-xl border border-amber-200">
              <button
                type="button"
                onClick={() => setActiveChart("D1")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeChart === "D1" ? "bg-[#1b4327] text-white shadow-xs" : "text-[#5c4033]"
                }`}
              >
                Lagna Chart (D1)
              </button>
              <button
                type="button"
                onClick={() => setActiveChart("D9")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeChart === "D9" ? "bg-[#1b4327] text-white shadow-xs" : "text-[#5c4033]"
                }`}
              >
                Navamsha (D9)
              </button>
              <button
                type="button"
                onClick={() => setActiveChart("MOON")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeChart === "MOON" ? "bg-[#1b4327] text-white shadow-xs" : "text-[#5c4033]"
                }`}
              >
                Moon Chart
              </button>
            </div>
          </div>

          {/* Chart Display Area */}
          <div className="w-full max-w-lg aspect-square flex items-center justify-center p-4 bg-[#fdfbf7] rounded-3xl border border-[#e6c896] shadow-sm relative overflow-hidden">
            {currentChartSvg ? (
              <div
                className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                dangerouslySetInnerHTML={{ __html: currentChartSvg }}
              />
            ) : (
              /* High-fidelity Vedic Diamond Chart Fallback */
              <div className="w-full h-full relative">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Outer Box */}
                  <rect x="10" y="10" width="380" height="380" fill="none" stroke="#801c10" strokeWidth="2.5" />
                  {/* Diagonals */}
                  <line x1="10" y1="10" x2="390" y2="390" stroke="#801c10" strokeWidth="1.5" />
                  <line x1="390" y1="10" x2="10" y2="390" stroke="#801c10" strokeWidth="1.5" />
                  {/* Inner Diamond */}
                  <polygon points="200,10 390,200 200,390 10,200" fill="none" stroke="#801c10" strokeWidth="2" />

                  {/* House 1 (Lagna / Top Diamond) */}
                  <text x="200" y="55" textAnchor="middle" fill="#801c10" fontSize="12" fontWeight="bold">
                    1 {basic.ascendant ? `(${basic.ascendant.split(" ")[0]})` : ""}
                  </text>
                  <text x="200" y="80" textAnchor="middle" fill="#1b4327" fontSize="11" fontWeight="600">
                    {planets.filter((p) => Number(p.house) === 1).map((p) => p.name.split(" ")[0]).join(", ")}
                  </text>

                  {/* House 2 */}
                  <text x="120" y="50" textAnchor="middle" fill="#801c10" fontSize="11" fontWeight="bold">2</text>
                  <text x="120" y="70" textAnchor="middle" fill="#1b4327" fontSize="10">
                    {planets.filter((p) => Number(p.house) === 2).map((p) => p.name.split(" ")[0]).join(", ")}
                  </text>

                  {/* House 3 */}
                  <text x="50" y="110" textAnchor="middle" fill="#801c10" fontSize="11" fontWeight="bold">3</text>
                  <text x="50" y="130" textAnchor="middle" fill="#1b4327" fontSize="10">
                    {planets.filter((p) => Number(p.house) === 3).map((p) => p.name.split(" ")[0]).join(", ")}
                  </text>

                  {/* House 4 */}
                  <text x="100" y="200" textAnchor="middle" fill="#801c10" fontSize="12" fontWeight="bold">4</text>
                  <text x="100" y="225" textAnchor="middle" fill="#1b4327" fontSize="11" fontWeight="600">
                    {planets.filter((p) => Number(p.house) === 4).map((p) => p.name.split(" ")[0]).join(", ")}
                  </text>

                  {/* House 5 */}
                  <text x="50" y="290" textAnchor="middle" fill="#801c10" fontSize="11" fontWeight="bold">5</text>
                  <text x="50" y="310" textAnchor="middle" fill="#1b4327" fontSize="10">
                    {planets.filter((p) => Number(p.house) === 5).map((p) => p.name.split(" ")[0]).join(", ")}
                  </text>

                  {/* House 6 */}
                  <text x="120" y="355" textAnchor="middle" fill="#801c10" fontSize="11" fontWeight="bold">6</text>
                  <text x="120" y="375" textAnchor="middle" fill="#1b4327" fontSize="10">
                    {planets.filter((p) => Number(p.house) === 6).map((p) => p.name.split(" ")[0]).join(", ")}
                  </text>

                  {/* House 7 */}
                  <text x="200" y="335" textAnchor="middle" fill="#801c10" fontSize="12" fontWeight="bold">7</text>
                  <text x="200" y="360" textAnchor="middle" fill="#1b4327" fontSize="11" fontWeight="600">
                    {planets.filter((p) => Number(p.house) === 7).map((p) => p.name.split(" ")[0]).join(", ")}
                  </text>

                  {/* House 8 */}
                  <text x="280" y="355" textAnchor="middle" fill="#801c10" fontSize="11" fontWeight="bold">8</text>
                  <text x="280" y="375" textAnchor="middle" fill="#1b4327" fontSize="10">
                    {planets.filter((p) => Number(p.house) === 8).map((p) => p.name.split(" ")[0]).join(", ")}
                  </text>

                  {/* House 9 */}
                  <text x="350" y="290" textAnchor="middle" fill="#801c10" fontSize="11" fontWeight="bold">9</text>
                  <text x="350" y="310" textAnchor="middle" fill="#1b4327" fontSize="10">
                    {planets.filter((p) => Number(p.house) === 9).map((p) => p.name.split(" ")[0]).join(", ")}
                  </text>

                  {/* House 10 */}
                  <text x="300" y="200" textAnchor="middle" fill="#801c10" fontSize="12" fontWeight="bold">10</text>
                  <text x="300" y="225" textAnchor="middle" fill="#1b4327" fontSize="11" fontWeight="600">
                    {planets.filter((p) => Number(p.house) === 10).map((p) => p.name.split(" ")[0]).join(", ")}
                  </text>

                  {/* House 11 */}
                  <text x="350" y="110" textAnchor="middle" fill="#801c10" fontSize="11" fontWeight="bold">11</text>
                  <text x="350" y="130" textAnchor="middle" fill="#1b4327" fontSize="10">
                    {planets.filter((p) => Number(p.house) === 11).map((p) => p.name.split(" ")[0]).join(", ")}
                  </text>

                  {/* House 12 */}
                  <text x="280" y="50" textAnchor="middle" fill="#801c10" fontSize="11" fontWeight="bold">12</text>
                  <text x="280" y="70" textAnchor="middle" fill="#1b4327" fontSize="10">
                    {planets.filter((p) => Number(p.house) === 12).map((p) => p.name.split(" ")[0]).join(", ")}
                  </text>
                </svg>
              </div>
            )}
          </div>
          <p className="text-xs text-[#5c4033] font-medium">
            Traditional North Indian Vedic Diamond Chart with Lagna and planetary house placements.
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: DOSHAS (MANGLIK, SADHE SATI, KAAL SARP, PITRA) */}
      {/* ========================================================================= */}
      {activeTab === "Dosha" && (
        <div className="w-full space-y-6 animate-in fade-in duration-200">
          {/* Manglik Dosha Card */}
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#801c10] flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-600" />
                Manglik Dosha (Kuja Dosha) Analysis
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  doshas.manglik.isManglik
                    ? "bg-red-100 text-red-800 border-red-300"
                    : "bg-green-100 text-green-800 border-green-300"
                }`}
              >
                {doshas.manglik.status}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#5c4033] leading-relaxed">{safeRender(doshas.manglik.description)}</p>
              {doshas.manglik.exceptions && doshas.manglik.exceptions.length > 0 && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="font-bold text-[#801c10] block mb-1">Cancellations &amp; Exceptions:</span>
                  <ul className="list-disc pl-4 space-y-1 text-[#5c4033]">
                    {doshas.manglik.exceptions.map((ex, i) => (
                      <li key={i}>{safeRender(ex)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Shani Sadhe Sati Card */}
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#801c10] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                Shani Sadhe Sati Status
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                {safeRender(doshas.sadheSati.phase)}
              </span>
            </div>

            <p className="text-xs text-[#5c4033] leading-relaxed">{safeRender(doshas.sadheSati.description)}</p>
          </div>

          {/* Kaal Sarp & Pitra Dosha Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[#e6c896] shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                <h4 className="font-bold text-sm text-[#801c10]">Kaal Sarp Dosha</h4>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                  {doshas.kaalSarp.isKaalSarp ? safeRender(doshas.kaalSarp.type) : "Not Present"}
                </span>
              </div>
              <p className="text-xs text-[#5c4033]">{safeRender(doshas.kaalSarp.description)}</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#e6c896] shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                <h4 className="font-bold text-sm text-[#801c10]">Pitra Dosha</h4>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                  {doshas.pitraDosha.isPitraDosha ? "Present" : "Not Present"}
                </span>
              </div>
              <p className="text-xs text-[#5c4033]">{safeRender(doshas.pitraDosha.description)}</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: DASHA (VIMSHOTTARI MAHADASHA TIMELINE) */}
      {/* ========================================================================= */}
      {activeTab === "Dasha" && (
        <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-6 animate-in fade-in duration-200">
          <h3 className="font-serif text-xl font-bold text-[#801c10] border-b border-amber-100 pb-3 flex items-center gap-2">
            <Clock className="w-4.5 h-4.5 text-[#c87638]" />
            Vimshottari Mahadasha Planetary Cycles
          </h3>

          <div className="space-y-3">
            {dashas.map((dasha, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  dasha.isActive
                    ? "bg-amber-100/70 border-amber-400 shadow-xs"
                    : "bg-amber-50/40 hover:bg-amber-50 border-amber-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      dasha.isActive ? "bg-[#1b4327] text-white" : "bg-amber-200 text-[#801c10]"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#2b1810] block">{safeRender(dasha.planet)} Mahadasha</span>
                    <span className="text-[11px] text-[#5c4033]">Duration: {safeRender(dasha.durationYears)} Years</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-xs">
                    <span className="font-bold text-[#801c10] block">{safeRender(dasha.startDate)}</span>
                    <span className="text-[11px] text-[#5c4033]">to {safeRender(dasha.endDate)}</span>
                  </div>
                  {dasha.isActive && (
                    <span className="px-2.5 py-0.5 rounded-full bg-green-700 text-white font-bold text-[10px] uppercase">
                      Current
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: REMEDIES (RUDRAKSHA & GEMSTONES) */}
      {/* ========================================================================= */}
      {activeTab === "Remedies" && (
        <div className="w-full space-y-6 animate-in fade-in duration-200">
          {/* Rudraksha Recommendation */}
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#801c10] border-b border-amber-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-[#c87638]" />
              Sacred Rudraksha Recommendation
            </h3>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-[#801c10]">{safeRender(remedies.rudraksha.name)}</span>
                <span className="px-3 py-1 rounded-full bg-[#1b4327] text-white font-bold text-xs">
                  Ruling Planet: {safeRender(remedies.rudraksha.planet)}
                </span>
              </div>
              <p className="text-[#5c4033] leading-relaxed">{safeRender(remedies.rudraksha.recommendation)}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white rounded-xl border border-amber-100">
                  <strong className="text-[#801c10] block mb-0.5">Mantra to Chant:</strong>
                  <span className="font-mono text-[#2b1810]">{safeRender(remedies.rudraksha.mantra)}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-100">
                  <strong className="text-[#801c10] block mb-0.5">Primary Benefits:</strong>
                  <span className="text-[#5c4033]">{safeRender(remedies.rudraksha.benefits)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gemstone Recommendations */}
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#801c10] border-b border-amber-100 pb-3 flex items-center gap-2">
              <Gem className="w-4.5 h-4.5 text-blue-600" />
              Auspicious Gemstone Suggestions (रत्न सुझाव)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <span className="font-bold text-blue-900 block text-sm">Life Stone (जीवन रत्न)</span>
                <p className="font-bold text-base text-[#801c10]">{safeRender(remedies.gemstones.lifeStone.name)}</p>
                <div className="space-y-1 text-[#5c4033]">
                  <div><strong>Finger:</strong> {safeRender(remedies.gemstones.lifeStone.finger)}</div>
                  <div><strong>Metal:</strong> {safeRender(remedies.gemstones.lifeStone.metal)}</div>
                  <div><strong>Planet:</strong> {safeRender(remedies.gemstones.lifeStone.planet)}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-900 block text-sm">Lucky Stone (भाग्य रत्न)</span>
                <p className="font-bold text-base text-[#801c10]">{safeRender(remedies.gemstones.luckyStone.name)}</p>
                <div className="space-y-1 text-[#5c4033]">
                  <div><strong>Finger:</strong> {safeRender(remedies.gemstones.luckyStone.finger)}</div>
                  <div><strong>Metal:</strong> {safeRender(remedies.gemstones.luckyStone.metal)}</div>
                  <div><strong>Planet:</strong> {safeRender(remedies.gemstones.luckyStone.planet)}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
                <span className="font-bold text-purple-900 block text-sm">Benefic Stone (कारक रत्न)</span>
                <p className="font-bold text-base text-[#801c10]">{safeRender(remedies.gemstones.beneficStone.name)}</p>
                <div className="space-y-1 text-[#5c4033]">
                  <div><strong>Finger:</strong> {safeRender(remedies.gemstones.beneficStone.finger)}</div>
                  <div><strong>Metal:</strong> {safeRender(remedies.gemstones.beneficStone.metal)}</div>
                  <div><strong>Planet:</strong> {safeRender(remedies.gemstones.beneficStone.planet)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
