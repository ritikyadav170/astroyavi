"use client";

import React from "react";
import { MapPin, Calendar, Sparkles, Loader2 } from "lucide-react";

interface PanchangHeaderFormProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  place: string;
  setPlace: (place: string) => void;
  onFetchPanchang: () => void;
  isLoading?: boolean;
}

const POPULAR_CITIES = [
  "Delhi, India",
  "Noida, India",
  "Mumbai, India",
  "Varanasi, India",
  "Jaipur, India",
  "Bangalore, India",
];

export function PanchangHeaderForm({
  selectedDate,
  setSelectedDate,
  place,
  setPlace,
  onFetchPanchang,
  isLoading = false,
}: PanchangHeaderFormProps) {
  // Format selected date nicely (e.g. Wednesday, 24 Sep 2026)
  const formattedDisplayDate = React.useMemo(() => {
    try {
      const parts = selectedDate.split("-").map(Number);
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    } catch {
      // fallback
    }
    return selectedDate;
  }, [selectedDate]);

  const handleQuickDay = (daysOffset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
    setSelectedDate(iso);
  };

  return (
    <>
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8 max-w-4xl">
        <div className="flex items-center gap-3 text-[#c87638] mb-2">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c87638]" />
            DAILY VEDIC PANCHANG
          </span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] tracking-tight mb-4 leading-snug">
          Today&apos;s Panchang &amp; Auspicious Timings
        </h1>

        <p className="text-sm sm:text-base text-[#5c4033] leading-relaxed max-w-3xl">
          Get authentic daily Vedic Panchang calculations including Tithi, Nakshatra, Yoga, Karana,
          Paksha, Shubh Muhurat, Rahu Kaal, Sunrise, Sunset, and Day/Night Choghadiya for any city.
        </p>

        {/* Formatted Date Pill */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/70 border border-amber-300 text-amber-950 text-xs sm:text-sm font-semibold shadow-2xs">
          <Calendar className="w-4 h-4 text-[#801c10]" />
          <span>{formattedDisplayDate}</span>
          <span className="text-amber-700">•</span>
          <span className="text-[#801c10]">{place}</span>
        </div>
      </div>

      {/* Date & Location Selector Form Container */}
      <div className="w-full bg-white border border-[#e6c896] rounded-3xl p-5 sm:p-6 shadow-sm mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Date Picker Input */}
          <div className="md:col-span-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#3c2415] uppercase tracking-wider block">
                Select Date
              </label>
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleQuickDay(0)}
                  className="px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-[#801c10] font-bold cursor-pointer transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDay(1)}
                  className="px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-[#801c10] font-bold cursor-pointer transition-colors"
                >
                  Tomorrow
                </button>
              </div>
            </div>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-white border border-[#e6c896] rounded-xl py-2.5 px-4 text-sm font-semibold text-[#2b1810] focus:outline-none focus:ring-2 focus:ring-[#1b4327]/20 focus:border-[#1b4327] shadow-2xs cursor-pointer"
              />
            </div>
          </div>

          {/* Place Input */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs font-bold text-[#3c2415] uppercase tracking-wider block">
              City / Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Enter City, e.g., Delhi, India"
                className="w-full bg-white border border-[#e6c896] rounded-xl py-2.5 pl-4 pr-10 text-sm font-semibold text-[#2b1810] focus:outline-none focus:ring-2 focus:ring-[#1b4327]/20 focus:border-[#1b4327] shadow-2xs"
              />
              <MapPin className="w-4 h-4 text-[#c87638] absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* View Panchang Action Button */}
          <div className="md:col-span-3">
            <button
              onClick={onFetchPanchang}
              disabled={isLoading}
              className="w-full bg-[#1b4327] hover:bg-[#13321d] disabled:opacity-75 text-white py-2.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>View Panchang</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Cities List */}
        <div className="mt-4 pt-3 border-t border-amber-100/80 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-xs font-semibold text-[#8c6d58] mr-1">Popular Cities:</span>
          {POPULAR_CITIES.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setPlace(city)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                place.toLowerCase().includes(city.split(",")[0].toLowerCase())
                  ? "bg-[#1b4327] text-white font-bold"
                  : "bg-amber-50 hover:bg-amber-100 text-[#5c4033] border border-amber-200"
              }`}
            >
              {city.split(",")[0]}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
