"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
  Flame,
  Star,
} from "lucide-react";
import { UserReportForm } from "../reports";

export function QuickReportGenerator() {
  const [formData, setFormData] = useState<UserReportForm>({
    name: "",
    gender: "male",
    day: "15",
    month: "8",
    year: "1998",
    hour: "10",
    minute: "30",
    period: "AM",
    birthPlace: "New Delhi, Delhi, India",
    reportType: "kundli",
  });

  const [loading, setLoading] = useState(false);
  const [resultGenerated, setResultGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "planets" | "doshas" | "remedies">("overview");

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResultGenerated(true);
    }, 700);
  };

  const handleReset = () => {
    setResultGenerated(false);
  };

  return (
    <section id="quick-generator" className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative rounded-3xl bg-gradient-to-br from-[#1b2b48] via-[#131b3e] to-[#0c1228] p-6 sm:p-10 lg:p-12 text-white shadow-2xl border border-amber-500/30 overflow-hidden">
        {/* Background Aura */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Vedic Report Engine</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Generate Your Instant Birth Chart & Life Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Enter your exact birth details below to calculate your Lagna, Moon Sign, Planetary Positions & Dosha check instantly.
          </p>
        </div>

        {!resultGenerated ? (
          /* Input Form */
          <form onSubmit={handleCalculate} className="relative z-10 max-w-4xl mx-auto space-y-6">
            {/* Report Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-200 mb-2">
                Select Report Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "kundli", label: "Janam Kundli", icon: "📜" },
                  { id: "marriage", label: "Kundli Milan", icon: "💍" },
                  { id: "career", label: "Career & Wealth", icon: "💼" },
                  { id: "sade-sati", label: "Shani Sade Sati", icon: "🪐" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, reportType: item.id })}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${formData.reportType === item.id
                        ? "bg-gradient-to-r from-[#c85a17] to-amber-600 border-amber-300 text-white shadow-md shadow-orange-950/40"
                        : "bg-white/10 hover:bg-white/15 border-white/20 text-slate-200"
                      }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["male", "female"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`py-3 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer ${formData.gender === g
                          ? "bg-amber-500/30 border-amber-400 text-amber-200"
                          : "bg-white/10 border-white/20 text-slate-300"
                        }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* DOB */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Date of Birth (DD/MM/YYYY)</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    className="px-3 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-center text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="DD"
                  />
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="px-3 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-center text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="MM"
                  />
                  <input
                    type="number"
                    min="1940"
                    max="2030"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="px-3 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-center text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="YYYY"
                  />
                </div>
              </div>

              {/* TOB */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Time of Birth</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.hour}
                    onChange={(e) => setFormData({ ...formData, hour: e.target.value })}
                    className="px-3 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-center text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="HH"
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={formData.minute}
                    onChange={(e) => setFormData({ ...formData, minute: e.target.value })}
                    className="px-3 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-center text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="MM"
                  />
                  <select
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value as "AM" | "PM" })}
                    className="px-3 py-3 rounded-xl bg-[#1e2a4a] border border-white/20 text-white text-center text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Birth Place */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Place of Birth (City, State, Country)</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. New Delhi, Delhi, India"
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-[#c85a17] to-amber-600 hover:from-amber-400 hover:to-[#df6d28] text-white font-extrabold text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-95 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Calculating Vedic Chart...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Instant Vedic Report</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Live Result Preview */
          <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/10 border border-amber-400/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 flex items-center justify-center font-bold">
                  {formData.name ? formData.name[0].toUpperCase() : "U"}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {formData.name || "Vedic Seeker"}&apos;s Astrological Chart
                  </h3>
                  <p className="text-xs text-slate-300">
                    {formData.day}/{formData.month}/{formData.year} • {formData.hour}:{formData.minute} {formData.period} • {formData.birthPlace}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-amber-200 border border-amber-300/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Calculate Another</span>
              </button>
            </div>

            {/* Result Tabs */}
            <div className="flex items-center gap-2 border-b border-white/15 pb-2 overflow-x-auto">
              {[
                { id: "overview", label: "Core Overview" },
                { id: "planets", label: "Planetary Positions" },
                { id: "doshas", label: "Dosha & Sade Sati" },
                { id: "remedies", label: "Vedic Remedies" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${activeTab === t.id
                      ? "bg-amber-400 text-[#131b3e] shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Ascendant (Lagna)", value: "Leo (सिंह)", sub: "Sun in 1st House" },
                  { label: "Moon Sign (Rashi)", value: "Taurus (वृषभ)", sub: "Exalted Moon" },
                  { label: "Birth Nakshatra", value: "Rohini (रोहिणी)", sub: "Pad 2 • Moon Lord" },
                  { label: "Current Mahadasha", value: "Jupiter (गुरु)", sub: "Until Nov 2029" },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
                    <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white block mt-1">
                      {item.value}
                    </span>
                    <span className="text-[11px] text-slate-300 block mt-0.5">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "planets" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { planet: "Sun (सूर्य)", sign: "Leo (1st House)", status: "Own Sign (Mooltrikona)" },
                  { planet: "Moon (चन्द्र)", sign: "Taurus (10th House)", status: "Exalted (उच्च)" },
                  { planet: "Mars (मंगल)", sign: "Aries (9th House)", status: "Strong (बलवान)" },
                  { planet: "Jupiter (गुरु)", sign: "Pisces (8th House)", status: "Own House" },
                  { planet: "Venus (शुक्र)", sign: "Libra (3rd House)", status: "Friendly" },
                  { planet: "Saturn (शनि)", sign: "Aquarius (7th House)", status: "Shash Yoga" },
                ].map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">{p.planet}</span>
                      <span className="text-[11px] text-slate-300 block">{p.sign}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-500/30">
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "doshas" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-900/20 border border-emerald-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Manglik Dosha</h4>
                    <p className="text-[11px] text-emerald-200 mt-0.5">No Manglik Dosha present. Harmonious for marriage.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-900/20 border border-amber-500/30 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Shani Sade Sati</h4>
                    <p className="text-[11px] text-amber-200 mt-0.5">Currently in Rising phase (1st cycle). Caution in partnerships.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-900/20 border border-emerald-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Kaal Sarp Dosha</h4>
                    <p className="text-[11px] text-emerald-200 mt-0.5">No Kaal Sarp Dosha detected in your Janam Kundli.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "remedies" && (
              <div className="p-5 rounded-2xl bg-white/10 border border-amber-400/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>Personalized Vedic Remedies</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-amber-200">💎 Lucky Gemstone:</span> Ruby (माणिक्य) on ring finger in copper/gold.
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-amber-200">🕉️ Auspicious Mantra:</span> Om Suryaya Namaha (108 times at sunrise).
                  </div>
                </div>
              </div>
            )}

            {/* CTA to Get Full 25+ Page PDF */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm text-white">Want the Complete 25+ Page Life & Future Report?</h4>
                <p className="text-xs text-slate-300 mt-0.5">Includes year-by-year predictions, dasha analysis, marriage timing & career advice.</p>
              </div>
              <a
                href="/kundli"
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#131b3e] font-extrabold text-xs shadow-md transition-all whitespace-nowrap active:scale-95"
              >
                View Full Kundli Report
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
