"use client";

import React from "react";
import { FileText, Share2 } from "lucide-react";
import { KundliFormData, reportTabs } from "../kundliApi";

interface KundliReportDetailsProps {
  formData: KundliFormData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  shareCopied: boolean;
  handleShare: () => void;
  onReset: () => void;
}

export function KundliReportDetails({
  formData,
  activeTab,
  setActiveTab,
  shareCopied,
  handleShare,
  onReset,
}: KundliReportDetailsProps) {
  const userName = formData.fullName || "Rohit";
  const birthDate = formData.dateOfBirth
    ? new Date(formData.dateOfBirth).toLocaleDateString("en-GB")
    : "13/07/2026";
  const birthTime = formData.timeOfBirth || "10:16 PM";
  const birthPlace = formData.placeOfBirth || "Delhi";
  const gender = formData.gender || "Male";

  return (
    <div className="w-full max-w-[1100px] flex flex-col items-center animate-in fade-in duration-300 space-y-10">
      {/* Header Ornament & Description */}
      <div className="flex flex-col items-center text-center max-w-3xl">
        <div className="flex items-center gap-3 text-[#c87638] mb-3">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest">
            Free Kundli Report
          </span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#801c10] tracking-tight leading-snug">
          Receive a comprehensive Kundli with accurate astrological analysis and
          personalized predictions.
        </h1>
      </div>

      {/* Circular Natal Horoscope Wheel Diagram */}
      <div className="relative w-72 sm:w-96 aspect-square flex items-center justify-center p-4 bg-white rounded-full border border-slate-200 shadow-md">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full text-slate-800"
          fill="none"
        >
          {/* Outer Ring */}
          <circle cx="200" cy="200" r="190" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="175" stroke="#94a3b8" strokeWidth="1" />
          <circle
            cx="200"
            cy="200"
            r="120"
            stroke="#cbd5e1"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <circle cx="200" cy="200" r="60" stroke="#1e293b" strokeWidth="1.5" />

          {/* 12 House Dividing Rays */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 200 + 60 * Math.cos(angle);
            const y1 = 200 + 60 * Math.sin(angle);
            const x2 = 200 + 190 * Math.cos(angle);
            const y2 = 200 + 190 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#94a3b8"
                strokeWidth="0.8"
              />
            );
          })}

          {/* Aspect Lines inside Center Circle */}
          <path
            d="M 150 160 L 250 240 M 160 250 L 240 150 M 140 200 L 260 200 M 200 140 L 200 260"
            stroke="#e11d48"
            strokeWidth="0.7"
            opacity="0.6"
          />
          <path
            d="M 160 170 L 230 230 M 170 230 L 230 170"
            stroke="#2563eb"
            strokeWidth="0.7"
            opacity="0.6"
          />
          <path
            d="M 180 140 L 220 260 M 140 220 L 260 180"
            stroke="#16a34a"
            strokeWidth="0.7"
            opacity="0.6"
          />

          {/* Zodiac Symbols around Rim */}
          <text x="195" y="25" fill="#1e293b" fontSize="14" fontWeight="bold">
            ♎ 20°
          </text>
          <text x="360" y="195" fill="#1e293b" fontSize="14" fontWeight="bold">
            ♊ 27°
          </text>
          <text x="195" y="388" fill="#1e293b" fontSize="14" fontWeight="bold">
            ♈ 20°
          </text>
          <text x="15" y="195" fill="#1e293b" fontSize="14" fontWeight="bold">
            ♐ 27°
          </text>

          {/* Planetary Positions Glyphs */}
          <text x="150" y="80" fill="#2563eb" fontSize="12" fontWeight="bold">
            ♄ 12
          </text>
          <text x="230" y="85" fill="#7c3aed" fontSize="12" fontWeight="bold">
            ☿ 23
          </text>
          <text x="310" y="150" fill="#dc2626" fontSize="12" fontWeight="bold">
            ☽ 16
          </text>
          <text x="290" y="270" fill="#059669" fontSize="12" fontWeight="bold">
            ♃ 21
          </text>
          <text x="200" y="340" fill="#d97706" fontSize="12" fontWeight="bold">
            ♃ 23
          </text>
          <text x="110" y="290" fill="#dc2626" fontSize="12" fontWeight="bold">
            ☉ 13
          </text>
          <text x="80" y="170" fill="#2563eb" fontSize="12" fontWeight="bold">
            ♂ 17
          </text>
        </svg>
      </div>

      {/* Kundli Report Tab Bar */}
      <div className="w-full flex items-center justify-start sm:justify-center border-b border-amber-900/20 overflow-x-auto pb-1 scrollbar-none gap-4 sm:gap-8">
        {reportTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-1 text-sm font-semibold whitespace-nowrap transition-all relative cursor-pointer ${
              activeTab === tab
                ? "text-[#1b4327] font-bold"
                : "text-[#5c4033]/70 hover:text-[#1b4327]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1b4327] rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT 1: BASIC DETAILS */}
      {activeTab === "Basic Details" && (
        <div className="w-full space-y-8">
          {/* 1. Basic Details Card */}
          <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-[#e6c896] shadow-2xs space-y-4">
            <h3 className="font-bold text-base text-[#2b1810]">
              Basic Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Details Table */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-2 text-xs space-y-1">
                <div className="flex justify-between py-2.5 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">Name</span>
                  <span className="font-bold text-[#2b1810]">{userName}</span>
                </div>
                <div className="flex justify-between py-2.5 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Birth Date & Time
                  </span>
                  <span className="font-bold text-[#2b1810]">
                    {birthDate} | {birthTime}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Birth Place
                  </span>
                  <span className="font-bold text-[#2b1810]">{birthPlace}</span>
                </div>
                <div className="flex justify-between py-2.5 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">Gender</span>
                  <span className="font-bold text-[#2b1810]">{gender}</span>
                </div>
              </div>

              {/* Right Details Table */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-2 text-xs space-y-1">
                <div className="flex justify-between py-2.5 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">Nakshatra</span>
                  <span className="font-bold text-[#2b1810]">Ardra</span>
                </div>
                <div className="flex justify-between py-2.5 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">Ascendant</span>
                  <span className="font-bold text-[#2b1810]">Aquarius</span>
                </div>
                <div className="flex justify-between py-2.5 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">Sign</span>
                  <span className="font-bold text-[#2b1810]">Gemini</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Kundli Details Card */}
          <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-[#e6c896] shadow-2xs space-y-4">
            <h3 className="font-bold text-base text-[#2b1810]">
              Kundli Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Kundli Details Table */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-2 text-xs space-y-1">
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Nakshatra Lord
                  </span>
                  <span className="font-bold text-[#2b1810]">Rahu</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">Yog</span>
                  <span className="font-bold text-[#2b1810]">Vyaghat</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">Tithi</span>
                  <span className="font-bold text-[#2b1810]">Amavasya</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">Tatva</span>
                  <span className="font-bold text-[#2b1810]">Air</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">Paya</span>
                  <span className="font-bold text-[#2b1810]">Sliver</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">Varna</span>
                  <span className="font-bold text-[#2b1810]">Shoodra</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">Sign Lord</span>
                  <span className="font-bold text-[#2b1810]">Mercury</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">Yoni</span>
                  <span className="font-bold text-[#2b1810]">Swaan</span>
                </div>
              </div>

              {/* Right Kundli Details Table */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-2 text-xs space-y-1">
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">Charan</span>
                  <span className="font-bold text-[#2b1810]">4</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">Karan</span>
                  <span className="font-bold text-[#2b1810]">Chatushpad</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">Yunja</span>
                  <span className="font-bold text-[#2b1810]">Madhya</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Name Alphabet
                  </span>
                  <span className="font-bold text-[#2b1810]">Chha</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">Gan</span>
                  <span className="font-bold text-[#2b1810]">Manushya</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">Nadi</span>
                  <span className="font-bold text-[#2b1810]">Adi</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">Vashya</span>
                  <span className="font-bold text-[#2b1810]">Maanav</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">Nakshatra</span>
                  <span className="font-bold text-[#2b1810]">Ardra</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Favourable Card */}
          <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-[#e6c896] shadow-2xs space-y-4">
            <h3 className="font-bold text-base text-[#2b1810]">Favourable</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Favourable Table */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-2 text-xs space-y-1">
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">Name</span>
                  <span className="font-bold text-[#2b1810]">{userName}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Destiny Number
                  </span>
                  <span className="font-bold text-[#2b1810]">3</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Evil Number
                  </span>
                  <span className="font-bold text-[#2b1810]">3.5</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">Lucky Day</span>
                  <span className="font-bold text-[#2b1810]">
                    Sunday, Monday, Saturday
                  </span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Lucky Mantra
                  </span>
                  <span className="font-bold text-[#2b1810]">
                    Om Rang Rahave Namah
                  </span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Lucky Stone
                  </span>
                  <span className="font-bold text-[#2b1810]">Gomed</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Friendly Number
                  </span>
                  <span className="font-bold text-[#2b1810]">6,1,8</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Radical Number
                  </span>
                  <span className="font-bold text-[#2b1810]">4</span>
                </div>
              </div>

              {/* Right Favourable Table */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-2 text-xs space-y-1">
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">Date</span>
                  <span className="font-bold text-[#2b1810]">{birthDate}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Name Number
                  </span>
                  <span className="font-bold text-[#2b1810]">12</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Lucky Colour
                  </span>
                  <span className="font-bold text-[#2b1810]">Black</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">Lucky God</span>
                  <span className="font-bold text-[#2b1810]">Ganesh</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Lucky Metal
                  </span>
                  <span className="font-bold text-[#2b1810]">Lead</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Lucky Sunstone
                  </span>
                  <span className="font-bold text-[#2b1810]">Black Hakik</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Neutral Number
                  </span>
                  <span className="font-bold text-[#2b1810]">2,7,9</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                  <span className="text-slate-600 font-medium">
                    Radical Ruler
                  </span>
                  <span className="font-bold text-[#2b1810]">Rahu</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Share Kundli Report Card */}
          <div className="w-full bg-white border border-[#e6c896] rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-700">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#2b1810]">
                  Share Kundli Report
                </h4>
                <p className="text-xs text-[#5c4033]">
                  Share your detailed Kundli securely through your favorite apps.
                </p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="shrink-0 bg-[#1b4327] hover:bg-[#13321d] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{shareCopied ? "Link Copied!" : "Share Kundli"}</span>
            </button>
          </div>
        </div>
      )}

      {/* OTHER TABS FALLBACKS */}
      {activeTab !== "Basic Details" && (
        <div className="w-full bg-white border border-[#e6c896] rounded-3xl p-8 text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#801c10]">
            {activeTab} Analysis
          </h3>
          <p className="text-sm text-[#5c4033] max-w-md mx-auto">
            Detailed astrological report for {activeTab} generated based on birth
            chart of {userName}.
          </p>
          <div className="p-4 bg-amber-50 rounded-2xl text-xs text-amber-900 max-w-md mx-auto">
            ✨ Accurate Vedic calculations for {activeTab} are enabled for your
            profile.
          </div>
        </div>
      )}

      {/* Recalculate Button */}
      <div className="pt-2">
        <button
          onClick={onReset}
          className="px-6 py-2.5 border border-[#1b4327] text-[#1b4327] hover:bg-[#1b4327] hover:text-white rounded-full text-xs font-bold transition-all cursor-pointer"
        >
          ← Calculate Another Kundli
        </button>
      </div>
    </div>
  );
}
