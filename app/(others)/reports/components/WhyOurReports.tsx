"use client";

import React from "react";
import {
  Award,
  Sparkles,
  ShieldCheck,
  Zap,
  BookOpen,
  CheckCircle2,
  Users,
  Printer,
} from "lucide-react";

export function WhyOurReports() {
  const pillars = [
    {
      icon: <BookOpen className="w-6 h-6 text-[#c85a17]" />,
      title: "Authentic Parashari Algorithms",
      desc: "Built on classical Brihat Parashara Hora Shastra principles and high-precision NASA JPL planetary ephemeris tables.",
    },
    {
      icon: <Award className="w-6 h-6 text-amber-600" />,
      title: "Astrologer Verified & Curated",
      desc: "Every report structure and remedial guideline is reviewed by senior Jyotish Acharyas with 15+ years experience.",
    },
    {
      icon: <Zap className="w-6 h-6 text-orange-600" />,
      title: "Actionable Life Roadmaps",
      desc: "Clear timelines for career shifts, marriage periods, Sade Sati caution windows, and custom Vedic gemstone remedies.",
    },
    {
      icon: <Printer className="w-6 h-6 text-emerald-600" />,
      title: "Instant Digital PDF & Print Ready",
      desc: "Download full color 25+ page reports in Hindi or English to read anytime, print, or share with family astrologers.",
    },
  ];

  return (
    <section className="w-full bg-[#fbf5ea] border-y border-[#e6c896]/60 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-bold text-[#c85a17] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Astroyavi Vedic Guarantee</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2d1a0e] tracking-tight">
            Why Over 100,000+ Trust Our Astrological Reports
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            We merge ancient Vedic wisdom with modern computational precision to give you clear, actionable answers.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-amber-200/90 shadow-xs hover:shadow-lg hover:border-[#c85a17]/50 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-100 transition-all">
                {item.icon}
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#2d1a0e] group-hover:text-[#c85a17] transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#163014] to-[#1f4a1c] text-white flex flex-wrap items-center justify-around gap-6 text-center shadow-lg border border-emerald-600/30">
          <div>
            <span className="font-serif text-2xl sm:text-4xl font-extrabold text-amber-300 block">
              100,000+
            </span>
            <span className="text-xs text-emerald-100 font-medium">Reports Generated</span>
          </div>
          <div className="hidden sm:block h-10 w-[1px] bg-emerald-700" />
          <div>
            <span className="font-serif text-2xl sm:text-4xl font-extrabold text-amber-300 block">
              4.9 / 5.0
            </span>
            <span className="text-xs text-emerald-100 font-medium">User Rating</span>
          </div>
          <div className="hidden sm:block h-10 w-[1px] bg-emerald-700" />
          <div>
            <span className="font-serif text-2xl sm:text-4xl font-extrabold text-amber-300 block">
              100%
            </span>
            <span className="text-xs text-emerald-100 font-medium">Privacy Guaranteed</span>
          </div>
          <div className="hidden sm:block h-10 w-[1px] bg-emerald-700" />
          <div>
            <span className="font-serif text-2xl sm:text-4xl font-extrabold text-amber-300 block">
              Instant
            </span>
            <span className="text-xs text-emerald-100 font-medium">Digital Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
