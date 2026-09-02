"use client";

import React from "react";
import { CheckCircle2, Lock, Tag } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section className="w-full bg-[#fdf8f0] py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto flex flex-col items-center">

        {/* Section Header */}
        <div className="flex items-center gap-3 text-[#c87638] mb-8 sm:mb-10">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest">WHY CHOOSE US</span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        {/* Top 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full mb-10 sm:mb-14">

          {/* Left Text Content (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#163014] tracking-tight leading-[1.1]">
              Why Thousands Trust Our Astrology Platform
            </h2>
            <p className="text-[#4a3020]/90 text-lg sm:text-xl leading-relaxed font-sans max-w-xl">
              Verified astrologers, secure consultations, transparent pricing, instant connectivity, private conversations, and dedicated customer support ensure a reliable astrology experience.
            </p>
          </div>

          {/* Right Mobile Mockup Container (6 cols) */}
          <div className="lg:col-span-6 relative bg-[#faedd9]/60 border border-[#e6c896] rounded-3xl p-8 flex items-center justify-center overflow-hidden min-h-[380px] shadow-sm">
            {/* Background Zodiac Mandala Watermark */}
            <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-[450px] h-[450px] text-[#c87638]" fill="currentColor">
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M100 0 L100 200 M0 100 L200 100" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Mobile Phone Mockup Graphic */}
            <div className="relative z-10 w-64 bg-slate-900 rounded-[36px] p-3 border-4 border-slate-700 shadow-2xl">
              {/* Notch */}
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2"></div>
              {/* Screen App UI */}
              <div className="bg-white rounded-[26px] p-3 space-y-2 text-slate-900 text-xs">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="font-bold text-[11px] text-[#163014]">Chat with Astrologers</span>
                  <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">● Online</span>
                </div>
                {/* Astrologer Item 1 */}
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-200 border border-amber-400 flex items-center justify-center text-[10px] font-bold text-amber-900">VS</div>
                  <div className="flex-1">
                    <p className="font-bold text-[10px]">Rahul Khanna</p>
                    <p className="text-[8px] text-slate-500">Vedic • 10 Yrs Exp</p>
                  </div>
                  <span className="text-[9px] bg-[#163014] text-white px-2 py-0.5 rounded-lg font-semibold">Chat</span>
                </div>
                {/* Astrologer Item 2 */}
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-200 border border-orange-400 flex items-center justify-center text-[10px] font-bold text-orange-900">RS</div>
                  <div className="flex-1">
                    <p className="font-bold text-[10px]">Rahul Sharma</p>
                    <p className="text-[8px] text-slate-500">Tarot • 8 Yrs Exp</p>
                  </div>
                  <span className="text-[9px] bg-[#163014] text-white px-2 py-0.5 rounded-lg font-semibold">Chat</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

          <div className="bg-white rounded-2xl p-6 border border-[#e6c896] flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-[#fde8d0] flex items-center justify-center shrink-0 text-[#c85a17]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#2b1810] mb-1">Verified Astrologers</h3>
              <p className="text-xs text-[#5c4033] leading-relaxed">
                Every astrologer on our platform is verified for expertise and authenticity, ensuring trusted guidance.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#e6c896] flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-[#ebdff7] flex items-center justify-center shrink-0 text-purple-700">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#2b1810] mb-1">Secure Consultations</h3>
              <p className="text-xs text-[#5c4033] leading-relaxed">
                Our verified astrologers provide accurate, authentic, and trusted guidance with years of expertise.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#e6c896] flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-[#dff5d9] flex items-center justify-center shrink-0 text-green-700">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#2b1810] mb-1">Transparent Pricing</h3>
              <p className="text-xs text-[#5c4033] leading-relaxed">
                Our verified astrologers offer trusted, accurate guidance backed by expertise and experience.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}