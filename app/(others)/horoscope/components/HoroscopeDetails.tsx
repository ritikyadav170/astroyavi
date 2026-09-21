"use client";

import { CategorySection } from "../horoscope";

interface HoroscopeDetailsProps {
  sections: CategorySection[];
  loading?: boolean;
}

export function HoroscopeDetails({
  sections,
  loading = false,
}: HoroscopeDetailsProps) {
  if (loading) {
    return (
      <div className="mt-10 space-y-8 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="pt-3">
            <div className="h-8 w-32 bg-[#e1d2b3]/50 rounded mb-3"></div>
            <div className="h-20 w-full bg-[#e1d2b3]/30 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-8">
      {sections.map((section) => (
        <div key={section.title} className="pt-3">
          <h3 className="mb-3 text-3xl font-bold tracking-tight text-[#2d1a0e]">
            {section.title}
          </h3>
          <p className="max-w-[1180px] text-[17px] leading-8 text-[#3f2c22]">
            {section.text}
          </p>
        </div>
      ))}
    </div>
  );
}
