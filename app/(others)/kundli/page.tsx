"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import {
  RefreshCw,
  Share2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Star,
  Phone,
  MessageSquare,
  Video,
  Sparkles,
  ShieldAlert,
  Calendar,
  Clock,
  Compass,
} from "lucide-react";

const astrologers = [
  {
    id: 1,
    name: "Vikram Singh",
    specialty: "Vedic Astrology",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "VS",
    bgColor: "bg-[#1b4327]",
  },
  {
    id: 2,
    name: "Ravindra Sharma",
    specialty: "Tarot Reading",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-amber-700",
  },
  {
    id: 3,
    name: "Sandeep Sharma",
    specialty: "Vastu, Tarot Reading",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "SS",
    bgColor: "bg-orange-600",
  },
  {
    id: 4,
    name: "Pinki Choudhary",
    specialty: "Face Reading, Numerology",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "PC",
    bgColor: "bg-[#801c10]",
  },
  {
    id: 5,
    name: "Raju Srivastav",
    specialty: "Lal Kitab, Nadi, Numerology",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-emerald-800",
  },
];

const reportTabs = [
  "Basic Details",
  "Kundli Predictions",
  "Position of Planet",
  "Chart",
  "Dosha",
  "Dasha",
  "Remedies",
];

export default function KundliPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    gender: "",
  });

  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Basic Details");
  const [shareCopied, setShareCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
      // Scroll smoothly to report section
      window.scrollTo({ top: 400, behavior: "smooth" });
    }, 600);
  };

  const userName = formData.fullName || "Rohit";
  const birthDate = formData.dateOfBirth
    ? new Date(formData.dateOfBirth).toLocaleDateString("en-GB")
    : "13/07/2026";
  const birthTime = formData.timeOfBirth || "10:16 PM";
  const birthPlace = formData.placeOfBirth || "Delhi";
  const gender = formData.gender || "Male";

  const handleShare = () => {
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#fdf8f0] selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* Top Navbar */}
      <AstroNavbar />

      {/* Main Container */}
      <div className="w-full flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[1350px] mx-auto flex flex-col items-center">
        
        {!showResult ? (
          /* SECTION 1: KUNDLI GENERATOR FORM */
          <>
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-10 max-w-4xl">
              <div className="flex items-center gap-3 text-[#c87638] mb-2">
                <div className="h-[1px] w-16 bg-[#c87638]"></div>
                <span className="text-xs font-bold uppercase tracking-widest">Create Free Kundli</span>
                <div className="h-[1px] w-16 bg-[#c87638]"></div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] tracking-tight mb-4">
                Generate Your Free Kundli in Seconds
              </h1>

              <p className="text-sm sm:text-base text-[#5c4033] leading-relaxed max-w-2xl font-sans">
                Generate your free Vedic Kundli instantly using your birth details and receive accurate insights into your personality, career, marriage, health, and future.
              </p>
            </div>

            {/* Main Form Card */}
            <div className="w-full max-w-3xl bg-white border border-[#e6c896] rounded-3xl p-6 sm:p-10 shadow-sm mb-16 relative">
              
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#801c10] text-center mb-8 tracking-tight">
                Generate Your Free Kundli in Seconds
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Full name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#3c2415] block">
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-full py-3 px-5 text-sm text-[#2b1810] placeholder:text-slate-400 focus:outline-none focus:border-[#1b4327] focus:ring-1 focus:ring-[#1b4327] shadow-2xs"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#3c2415] block">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-full py-3 px-5 text-sm text-[#2b1810] focus:outline-none focus:border-[#1b4327] focus:ring-1 focus:ring-[#1b4327] shadow-2xs"
                    />
                  </div>

                  {/* Time of Birth */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#3c2415] block">
                      Time of Birth
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.timeOfBirth}
                      onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-full py-3 px-5 text-sm text-[#2b1810] focus:outline-none focus:border-[#1b4327] focus:ring-1 focus:ring-[#1b4327] shadow-2xs"
                    />
                  </div>

                  {/* Place of Birth */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#3c2415] block">
                      Place of Birth
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter birth city (e.g. Delhi)"
                      value={formData.placeOfBirth}
                      onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-full py-3 px-5 text-sm text-[#2b1810] placeholder:text-slate-400 focus:outline-none focus:border-[#1b4327] focus:ring-1 focus:ring-[#1b4327] shadow-2xs"
                    />
                  </div>

                  {/* Select Gender */}
                  <div className="space-y-2 md:col-span-2 max-w-md mx-auto w-full">
                    <label className="text-xs font-semibold text-[#3c2415] block text-left">
                      Select Gender
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-full py-3 px-5 text-sm text-[#2b1810] focus:outline-none focus:border-[#1b4327] focus:ring-1 focus:ring-[#1b4327] shadow-2xs appearance-none cursor-pointer pr-10"
                      >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>

                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full max-w-md bg-[#1b4327] hover:bg-[#13321d] text-white font-bold py-3.5 px-8 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-80"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Generating Kundli Report...</span>
                      </>
                    ) : (
                      <span>Show Kundli</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          /* SECTION 2: KUNDLI REPORT RESULT (EXACT MATCH TO USER SCREENSHOTS) */
          <div className="w-full max-w-[1100px] flex flex-col items-center animate-in fade-in duration-300 space-y-10">
            
            {/* Header Ornament & Description */}
            <div className="flex flex-col items-center text-center max-w-3xl">
              <div className="flex items-center gap-3 text-[#c87638] mb-3">
                <div className="h-[1px] w-16 bg-[#c87638]"></div>
                <span className="text-xs font-bold uppercase tracking-widest">Free Kundli Report</span>
                <div className="h-[1px] w-16 bg-[#c87638]"></div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#801c10] tracking-tight leading-snug">
                Receive a comprehensive Kundli with accurate astrological analysis and personalized predictions.
              </h1>
            </div>

            {/* Circular Natal Horoscope Wheel Diagram (Screenshot 1) */}
            <div className="relative w-72 sm:w-96 aspect-square flex items-center justify-center p-4 bg-white rounded-full border border-slate-200 shadow-md">
              {/* Detailed SVG Zodiac Wheel */}
              <svg viewBox="0 0 400 400" className="w-full h-full text-slate-800" fill="none">
                {/* Outer Ring */}
                <circle cx="200" cy="200" r="190" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="200" cy="200" r="175" stroke="#94a3b8" strokeWidth="1" />
                <circle cx="200" cy="200" r="120" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="200" cy="200" r="60" stroke="#1e293b" strokeWidth="1.5" />

                {/* 12 House Dividing Rays */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 200 + 60 * Math.cos(angle);
                  const y1 = 200 + 60 * Math.sin(angle);
                  const x2 = 200 + 190 * Math.cos(angle);
                  const y2 = 200 + 190 * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="0.8" />;
                })}

                {/* Aspect Lines inside Center Circle */}
                <path d="M 150 160 L 250 240 M 160 250 L 240 150 M 140 200 L 260 200 M 200 140 L 200 260" stroke="#e11d48" strokeWidth="0.7" opacity="0.6" />
                <path d="M 160 170 L 230 230 M 170 230 L 230 170" stroke="#2563eb" strokeWidth="0.7" opacity="0.6" />
                <path d="M 180 140 L 220 260 M 140 220 L 260 180" stroke="#16a34a" strokeWidth="0.7" opacity="0.6" />

                {/* Zodiac Symbols around Rim */}
                <text x="195" y="25" fill="#1e293b" fontSize="14" fontWeight="bold">♎ 20°</text>
                <text x="360" y="195" fill="#1e293b" fontSize="14" fontWeight="bold">♊ 27°</text>
                <text x="195" y="388" fill="#1e293b" fontSize="14" fontWeight="bold">♈ 20°</text>
                <text x="15" y="195" fill="#1e293b" fontSize="14" fontWeight="bold">♐ 27°</text>

                {/* Planetary Positions Glyphs */}
                <text x="150" y="80" fill="#2563eb" fontSize="12" fontWeight="bold">♄ 12</text>
                <text x="230" y="85" fill="#7c3aed" fontSize="12" fontWeight="bold">☿ 23</text>
                <text x="310" y="150" fill="#dc2626" fontSize="12" fontWeight="bold">☽ 16</text>
                <text x="290" y="270" fill="#059669" fontSize="12" fontWeight="bold">♃ 21</text>
                <text x="200" y="340" fill="#d97706" fontSize="12" fontWeight="bold">♃ 23</text>
                <text x="110" y="290" fill="#dc2626" fontSize="12" fontWeight="bold">☉ 13</text>
                <text x="80" y="170" fill="#2563eb" fontSize="12" fontWeight="bold">♂ 17</text>
              </svg>
            </div>

            {/* Kundli Report Tab Bar (Screenshot 2) */}
            <div className="w-full flex items-center justify-start sm:justify-center border-b border-amber-900/20 overflow-x-auto pb-1 scrollbar-none gap-4 sm:gap-8">
              {reportTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 text-sm font-semibold whitespace-nowrap transition-all relative ${
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

            {/* TAB CONTENT 1: BASIC DETAILS (EXACT MATCH TO SCREENSHOT 2) */}
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
                        <span className="text-slate-600 font-medium">Birth Date & Time</span>
                        <span className="font-bold text-[#2b1810]">{birthDate} | {birthTime}</span>
                      </div>
                      <div className="flex justify-between py-2.5 px-3 bg-white rounded-lg">
                        <span className="text-slate-600 font-medium">Birth Place</span>
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
                        <span className="text-slate-600 font-medium">Nakshatra Lord</span>
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
                        <span className="text-slate-600 font-medium">Name Alphabet</span>
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

                {/* 3. Favourable Card (Screenshot 3) */}
                <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-[#e6c896] shadow-2xs space-y-4">
                  <h3 className="font-bold text-base text-[#2b1810]">
                    Favourable
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Favourable Table */}
                    <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-2 text-xs space-y-1">
                      <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                        <span className="text-slate-600 font-medium">Name</span>
                        <span className="font-bold text-[#2b1810]">{userName}</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                        <span className="text-slate-600 font-medium">Destiny Number</span>
                        <span className="font-bold text-[#2b1810]">3</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                        <span className="text-slate-600 font-medium">Evil Number</span>
                        <span className="font-bold text-[#2b1810]">3.5</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                        <span className="text-slate-600 font-medium">Lucky Day</span>
                        <span className="font-bold text-[#2b1810]">Sunday, Monday, Saturday</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                        <span className="text-slate-600 font-medium">Lucky Mantra</span>
                        <span className="font-bold text-[#2b1810]">Om Rang Rahave Namah</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                        <span className="text-slate-600 font-medium">Lucky Stone</span>
                        <span className="font-bold text-[#2b1810]">Gomed</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                        <span className="text-slate-600 font-medium">Friendly Number</span>
                        <span className="font-bold text-[#2b1810]">6,1,8</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                        <span className="text-slate-600 font-medium">Radical Number</span>
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
                        <span className="text-slate-600 font-medium">Name Number</span>
                        <span className="font-bold text-[#2b1810]">12</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                        <span className="text-slate-600 font-medium">Lucky Colour</span>
                        <span className="font-bold text-[#2b1810]">Black</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                        <span className="text-slate-600 font-medium">Lucky God</span>
                        <span className="font-bold text-[#2b1810]">Ganesh</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                        <span className="text-slate-600 font-medium">Lucky Metal</span>
                        <span className="font-bold text-[#2b1810]">Lead</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                        <span className="text-slate-600 font-medium">Lucky Sunstone</span>
                        <span className="font-bold text-[#2b1810]">Black Hakik</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-white rounded-lg">
                        <span className="text-slate-600 font-medium">Neutral Number</span>
                        <span className="font-bold text-[#2b1810]">2,7,9</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-slate-50/50 rounded-lg">
                        <span className="text-slate-600 font-medium">Radical Ruler</span>
                        <span className="font-bold text-[#2b1810]">Rahu</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Share Kundli Report Card (Screenshot 3) */}
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
                    className="shrink-0 bg-[#1b4327] hover:bg-[#13321d] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-2"
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
                <h3 className="font-serif text-2xl font-bold text-[#801c10]">{activeTab} Analysis</h3>
                <p className="text-sm text-[#5c4033] max-w-md mx-auto">
                  Detailed astrological report for {activeTab} generated based on birth chart of {userName}.
                </p>
                <div className="p-4 bg-amber-50 rounded-2xl text-xs text-amber-900 max-w-md mx-auto">
                  ✨ Accurate Vedic calculations for {activeTab} are enabled for your profile.
                </div>
              </div>
            )}

            {/* Recalculate Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowResult(false)}
                className="px-6 py-2.5 border border-[#1b4327] text-[#1b4327] hover:bg-[#1b4327] hover:text-white rounded-full text-xs font-bold transition-all"
              >
                ← Calculate Another Kundli
              </button>
            </div>

            {/* RECOMMENDED ASTROLOGERS CAROUSEL (SCREENSHOT 3) */}
            <div className="w-full flex flex-col items-center space-y-8 pt-6 border-t border-amber-900/10">
              
              <div className="flex items-center gap-3 text-[#c87638]">
                <div className="h-[1px] w-16 bg-[#c87638]"></div>
                <span className="text-xs font-bold uppercase tracking-widest">Recommended Astrologer</span>
                <div className="h-[1px] w-16 bg-[#c87638]"></div>
              </div>

              <div className="relative w-full flex items-center justify-center">
                
                {/* Left Arrow */}
                <button className="hidden sm:flex absolute -left-4 z-20 w-10 h-10 rounded-full bg-[#1b4327] text-white items-center justify-center shadow-md hover:bg-[#13321d] transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Astrologers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
                  {astrologers.map((astrologer) => (
                    <div
                      key={astrologer.id}
                      className="bg-white rounded-3xl p-5 border border-[#e6c896] flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="relative mb-3">
                        <div className={`w-16 h-16 rounded-full ${astrologer.bgColor} border-2 border-[#1b4327] flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                          {astrologer.initials}
                        </div>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-2 py-0.5 rounded-full border border-green-600 flex items-center gap-1 shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          <span className="text-[8px] font-bold text-green-700 uppercase">Online</span>
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-[#2b1810] mb-0.5">
                        {astrologer.name}
                      </h3>
                      <p className="text-xs text-[#5c4033] min-h-[30px] flex items-center justify-center mb-2">
                        {astrologer.specialty}
                      </p>

                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-2">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{astrologer.rating}</span>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-[#2b1810] mb-4">
                        <span>₹{astrologer.price}/min</span>
                        <s className="text-[10px] text-red-500 font-normal">₹{astrologer.originalPrice}/min</s>
                      </div>

                      <div className="flex items-center justify-center gap-2 w-full">
                        <button className="w-9 h-9 rounded-full border border-slate-300 hover:border-[#1b4327] flex items-center justify-center text-[#1b4327] hover:bg-[#1b4327] hover:text-white transition-all">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-500 flex items-center justify-center text-slate-950 transition-all shadow-xs">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="w-9 h-9 rounded-full border border-slate-300 hover:border-[#1b4327] flex items-center justify-center text-[#1b4327] hover:bg-[#1b4327] hover:text-white transition-all">
                          <Video className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <button className="hidden sm:flex absolute -right-4 z-20 w-10 h-10 rounded-full bg-[#1b4327] text-white items-center justify-center shadow-md hover:bg-[#13321d] transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>

              </div>

              <Link
                href="/talk-to-astrologer"
                className="px-8 py-3 bg-[#1b4327] hover:bg-[#13321d] text-white font-bold text-sm rounded-full shadow-lg transition-all"
              >
                View All Astrologers &gt;
              </Link>

            </div>

          </div>
        )}

      </div>

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
