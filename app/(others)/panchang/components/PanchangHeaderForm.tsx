"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface PanchangHeaderFormProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  place: string;
  setPlace: (place: string) => void;
  onFetchPanchang: () => void;
}

export function PanchangHeaderForm({
  selectedDate,
  setSelectedDate,
  place,
  setPlace,
  onFetchPanchang,
}: PanchangHeaderFormProps) {
  return (
    <>
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-6 max-w-4xl">
        <div className="flex items-center gap-3 text-[#c87638] mb-2">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest">
            DAILY PANCHANG
          </span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] tracking-tight mb-4 leading-snug">
          Stay informed with today&apos;s auspicious timings and essential Vedic
          calendar details.
        </h1>

        <p className="text-sm sm:text-base text-[#5c4033] leading-relaxed max-w-3xl">
          Access an accurate daily Panchang with Tithi, Nakshatra, Yoga, Karana,
          Vara, Rahu Kaal, Sunrise, Sunset, and Shubh Muhurat to plan every
          important moment with confidence.
        </p>
      </div>

      {/* Date & Location Selector Form Container */}
      <div className="w-full bg-white/70 border border-[#e6c896] rounded-2xl p-5 shadow-xs mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Date Picker Input */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs font-bold text-[#3c2415] uppercase tracking-wider block">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-white border border-[#e6c896] rounded-xl py-2.5 px-4 text-sm font-semibold text-[#2b1810] focus:outline-none focus:border-[#1b4327] shadow-2xs"
              />
            </div>
          </div>

          {/* Place Input */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-bold text-[#3c2415] uppercase tracking-wider block">
              Place
            </label>
            <div className="relative">
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Enter City, Country"
                className="w-full bg-white border border-[#e6c896] rounded-xl py-2.5 pl-4 pr-10 text-sm font-semibold text-[#2b1810] focus:outline-none focus:border-[#1b4327] shadow-2xs"
              />
              <MapPin className="w-4 h-4 text-[#c87638] absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* View Panchang Action Button */}
          <div className="md:col-span-3">
            <button
              onClick={onFetchPanchang}
              className="w-full bg-[#1b4327] hover:bg-[#13321d] text-white py-2.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              View Panchang
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
