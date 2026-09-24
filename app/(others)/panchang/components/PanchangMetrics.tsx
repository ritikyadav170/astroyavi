"use client";

import React from "react";
import {
  Sun,
  Moon,
  Compass,
  Star,
  Sparkles,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Globe,
} from "lucide-react";
import { FullPanchangData } from "../panchang";

interface PanchangMetricsProps {
  data: FullPanchangData;
  isLoading?: boolean;
}

export function PanchangMetrics({ data, isLoading = false }: PanchangMetricsProps) {
  const { sunMoon, panchang, auspicious, inauspicious, nivasShool } = data;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm flex flex-col space-y-8 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-2xs z-10 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-amber-300 shadow-md text-sm font-bold text-[#801c10]">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            Updating Panchang Data...
          </div>
        </div>
      )}

      {/* 1. Primary Panchang Elements (Tithi, Nakshatra, Yoga, Karana, etc.) */}
      <div>
        <div className="flex items-center justify-between border-b border-amber-100 pb-3 mb-5">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#801c10] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Core Panchang Details
          </h2>
          <span className="text-xs font-bold px-3 py-1 bg-amber-100/70 text-amber-950 rounded-full border border-amber-300">
            {panchang.dayName || "Vedic Day"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {/* Tithi */}
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-purple-50/60 border border-purple-100">
            <div className="w-9 h-9 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 text-purple-700 shadow-2xs">
              <Moon className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-purple-900/70 uppercase tracking-wider">
                Tithi
              </p>
              <p className="font-bold text-sm text-[#2b1810]">{panchang.tithi}</p>
              {panchang.tithiEndTime && (
                <p className="text-[11px] text-purple-800/80 font-medium">
                  {panchang.tithiEndTime}
                </p>
              )}
            </div>
          </div>

          {/* Nakshatra */}
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0 text-indigo-700 shadow-2xs">
              <Star className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-indigo-900/70 uppercase tracking-wider">
                Nakshatra
              </p>
              <p className="font-bold text-sm text-[#2b1810]">{panchang.nakshatra}</p>
              {panchang.nakshatraLord && (
                <p className="text-[11px] text-indigo-800/80 font-medium">
                  Lord: {panchang.nakshatraLord}
                </p>
              )}
            </div>
          </div>

          {/* Yoga */}
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-700 shadow-2xs">
              <Compass className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-emerald-900/70 uppercase tracking-wider">
                Yoga
              </p>
              <p className="font-bold text-sm text-[#2b1810]">{panchang.yoga}</p>
              {panchang.yogaEndTime && (
                <p className="text-[11px] text-emerald-800/80 font-medium">
                  {panchang.yogaEndTime}
                </p>
              )}
            </div>
          </div>

          {/* Karana */}
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-rose-50/60 border border-rose-100">
            <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0 text-rose-700 shadow-2xs">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-rose-900/70 uppercase tracking-wider">
                Karana
              </p>
              <p className="font-bold text-sm text-[#2b1810]">{panchang.karana}</p>
              {panchang.secondKarana && (
                <p className="text-[11px] text-rose-800/80 font-medium">
                  2nd: {panchang.secondKarana}
                </p>
              )}
            </div>
          </div>

          {/* Paksha */}
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
            <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 text-blue-700 shadow-2xs">
              <Moon className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-900/70 uppercase tracking-wider">
                Paksha
              </p>
              <p className="font-bold text-sm text-[#2b1810]">{panchang.paksha}</p>
              {panchang.hinduMaah && (
                <p className="text-[11px] text-blue-800/80 font-medium">
                  Month: {panchang.hinduMaah}
                </p>
              )}
            </div>
          </div>

          {/* Samvat & Ritu */}
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/60 border border-amber-200">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 text-amber-800 shadow-2xs">
              <Globe className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-amber-900/70 uppercase tracking-wider">
                Samvat
              </p>
              <p className="font-bold text-sm text-[#2b1810]">
                Vikram {panchang.vikramSamvat}
              </p>
              <p className="text-[11px] text-amber-800/80 font-medium">
                {panchang.ritu || "Ritu"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sun & Moon Celestial Timings */}
      <div className="bg-[#fdfbf7] p-4 sm:p-5 rounded-2xl border border-[#e6c896]">
        <h3 className="text-xs font-bold text-[#801c10] uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Sun className="w-4 h-4 text-amber-500" />
          Sun &amp; Moon Timings
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-2.5 bg-white rounded-xl border border-amber-100">
            <span className="text-[10px] font-bold text-[#8c6d58] uppercase block">Sunrise</span>
            <span className="font-bold text-sm text-amber-700">{sunMoon.sunrise}</span>
            {sunMoon.sunSign && (
              <span className="text-[10px] text-[#5c4033] block">Sun in {sunMoon.sunSign}</span>
            )}
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-amber-100">
            <span className="text-[10px] font-bold text-[#8c6d58] uppercase block">Sunset</span>
            <span className="font-bold text-sm text-orange-700">{sunMoon.sunset}</span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-amber-100">
            <span className="text-[10px] font-bold text-[#8c6d58] uppercase block">Moonrise</span>
            <span className="font-bold text-sm text-indigo-700">{sunMoon.moonrise}</span>
            {sunMoon.moonSign && (
              <span className="text-[10px] text-[#5c4033] block">Moon in {sunMoon.moonSign}</span>
            )}
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-amber-100">
            <span className="text-[10px] font-bold text-[#8c6d58] uppercase block">Moonset</span>
            <span className="font-bold text-sm text-slate-700">{sunMoon.moonset}</span>
          </div>
        </div>
      </div>

      {/* 3. Auspicious & Inauspicious Timings 2-Column Split */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Auspicious Timings (Shubh Muhurat) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-green-50/50 border border-green-200 space-y-3">
          <div className="flex items-center gap-2 text-green-800 font-bold text-sm border-b border-green-200 pb-2">
            <ShieldCheck className="w-4 h-4 text-green-700" />
            <span>Auspicious Timings (शुभ मुहूर्त)</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-green-100">
              <span className="font-semibold text-green-950">Abhijit Muhurta</span>
              <span className="font-bold text-green-800 bg-white px-2 py-0.5 rounded-md border border-green-200">
                {auspicious.abhijit}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-green-100">
              <span className="font-semibold text-green-950">Amrit Kaal</span>
              <span className="font-bold text-green-800 bg-white px-2 py-0.5 rounded-md border border-green-200">
                {auspicious.amruthaKala}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-green-100">
              <span className="font-semibold text-green-950">Brahma Muhurta</span>
              <span className="font-bold text-green-800 bg-white px-2 py-0.5 rounded-md border border-green-200">
                {auspicious.brahmaMuhurta}
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-semibold text-green-950">Vijay Muhurta</span>
              <span className="font-bold text-green-800 bg-white px-2 py-0.5 rounded-md border border-green-200">
                {auspicious.vijayMuhurta}
              </span>
            </div>
          </div>
        </div>

        {/* Inauspicious Timings (Ashubh Timings) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-red-50/50 border border-red-200 space-y-3">
          <div className="flex items-center gap-2 text-red-800 font-bold text-sm border-b border-red-200 pb-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Inauspicious Timings (अशुभ समय)</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-red-100">
              <span className="font-semibold text-red-950">Rahu Kaal</span>
              <span className="font-bold text-red-800 bg-white px-2 py-0.5 rounded-md border border-red-200">
                {inauspicious.rahuKal}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-red-100">
              <span className="font-semibold text-red-950">Yamaganda</span>
              <span className="font-bold text-red-800 bg-white px-2 py-0.5 rounded-md border border-red-200">
                {inauspicious.yamaganda}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-red-100">
              <span className="font-semibold text-red-950">Gulikai Kaal</span>
              <span className="font-bold text-red-800 bg-white px-2 py-0.5 rounded-md border border-red-200">
                {inauspicious.gulikaiKaal}
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-semibold text-red-950">Disha Shool</span>
              <span className="font-bold text-red-800 bg-white px-2 py-0.5 rounded-md border border-red-200">
                {nivasShool.dishaShool || "None"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
