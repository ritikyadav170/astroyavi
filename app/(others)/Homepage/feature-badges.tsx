"use client";

import React from "react";

const features = [
  {
    id: "astrologers",
    title: "Expert Astrologers",
    icon: (
      <svg className="w-7 h-7 text-[#b55012]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <polygon points="19 11 19.8 12.5 21.5 12.8 20.2 14 20.6 15.7 19 14.8 17.4 15.7 17.8 14 16.5 12.8 18.2 12.5 19 11" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "pujas",
    title: "Pujas Performed",
    icon: (
      <svg className="w-7 h-7 text-[#b55012]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 11h10l-1 9H8l-1-9z" />
        <path d="M6 11c0-2 2.5-3 6-3s6 1 6 3" />
        <path d="M12 2c1 1.5.5 3-1 4 2 0 3-1.5 2-4z" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "live-darshan",
    title: "Live Darshan & Panchang",
    icon: (
      <svg className="w-7 h-7 text-[#b55012]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <rect x="7" y="13" width="3" height="3" fill="currentColor" opacity="0.3" />
        <rect x="14" y="13" width="3" height="3" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "kundli-match",
    title: "Kundli Matching",
    icon: (
      <svg className="w-7 h-7 text-[#b55012]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <line x1="3" y1="3" x2="21" y2="21" />
        <line x1="21" y1="3" x2="3" y2="21" />
        <polygon points="12 3 21 12 12 21 3 12" fill="currentColor" opacity="0.15" />
      </svg>
    ),
  },
  {
    id: "secure",
    title: "Secure & Trusted",
    icon: (
      <svg className="w-7 h-7 text-[#b55012]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

export function FeatureBadges() {
  return (
    <div className="w-full flex items-start justify-center md:justify-start gap-4 sm:gap-6 lg:gap-8 flex-wrap pt-6 sm:pt-8">
      {features.map((item) => (
        <div key={item.id} className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#faedd9]/80 border-2 border-[#c87638]/60 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:bg-[#f6e0bf] group-hover:border-[#b55012] transition-all">
            {item.icon}
          </div>
          <span className="text-xs sm:text-[13px] font-semibold text-[#2d1a0e] text-center max-w-[100px] leading-tight">
            {item.title}
          </span>
        </div>
      ))}
    </div>
  );
}
