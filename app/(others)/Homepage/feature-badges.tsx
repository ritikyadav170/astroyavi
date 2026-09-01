"use client";

import React from "react";
import { UserCheck, Sparkles, CalendarDays, Compass, ShieldCheck } from "lucide-react";

const features = [
  {
    id: "astrologers",
    title: "Expert Astrologers",
    icon: <UserCheck className="w-6 h-6 text-[#c85a17]" />,
  },
  {
    id: "pujas",
    title: "Pujas Performed",
    icon: (
      <svg className="w-6 h-6 text-[#c85a17]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 11h10l-1 9H8l-1-9z" />
        <path d="M6 11c0-2 2.5-3 6-3s6 1 6 3" />
        <path d="M12 2c1 1.5.5 3-1 4 2 0 3-1.5 2-4z" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "live-darshan",
    title: "Live Darshan & Panchang",
    icon: <CalendarDays className="w-6 h-6 text-[#c85a17]" />,
  },
  {
    id: "kundli-match",
    title: "Kundli Matching",
    icon: (
      <svg className="w-6 h-6 text-[#c85a17]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <line x1="3" y1="3" x2="21" y2="21" />
        <line x1="21" y1="3" x2="3" y2="21" />
        <polygon points="12 3 21 12 12 21 3 12" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "secure",
    title: "Secure & Trusted",
    icon: <ShieldCheck className="w-6 h-6 text-[#c85a17]" />,
  },
];

export function FeatureBadges() {
  return (
    <div className="w-full flex items-start justify-center lg:justify-start gap-5 sm:gap-8 flex-wrap pt-6 sm:pt-8">
      {features.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#fde8d0]/90 border-2 border-[#e6c896] flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-[#f6e0bf] group-hover:border-[#c85a17] transition-all">
            {item.icon}
          </div>
          <span className="text-xs sm:text-[13px] font-bold text-[#2d1a0e] text-center max-w-[100px] leading-snug">
            {item.title}
          </span>
        </div>
      ))}
    </div>
  );
}
