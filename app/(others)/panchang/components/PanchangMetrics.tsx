"use client";

import React from "react";
import {
  Sun,
  Moon,
  Compass,
  Star,
  Sparkles,
  Clock,
} from "lucide-react";
import { PanchangMetricsData } from "../panchang";

interface PanchangMetricsProps {
  metrics: PanchangMetricsData;
}

export function PanchangMetrics({ metrics }: PanchangMetricsProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm flex flex-col justify-between space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {/* Sunrise */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-600">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">
              Sunrise
            </p>
            <p className="font-bold text-sm text-[#2b1810]">{metrics.sunrise}</p>
          </div>
        </div>

        {/* Sunset */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 text-orange-600">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">
              Sunset
            </p>
            <p className="font-bold text-sm text-[#2b1810]">{metrics.sunset}</p>
          </div>
        </div>

        {/* Yoga */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-700">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">
              Yoga
            </p>
            <p className="font-bold text-sm text-[#2b1810]">{metrics.yoga}</p>
          </div>
        </div>

        {/* Tithi */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0 text-purple-700">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">
              Tithi
            </p>
            <p className="font-bold text-sm text-[#2b1810]">{metrics.tithi}</p>
          </div>
        </div>

        {/* Nakshatra */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0 text-indigo-700">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">
              Nakshatra
            </p>
            <p className="font-bold text-sm text-[#2b1810]">{metrics.nakshatra}</p>
          </div>
        </div>

        {/* Karana */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-rose-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">
              Karana
            </p>
            <p className="font-bold text-sm text-[#2b1810]">{metrics.karana}</p>
          </div>
        </div>

        {/* Paksha */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-700">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">
              Paksha
            </p>
            <p className="font-bold text-sm text-[#2b1810]">{metrics.paksha}</p>
          </div>
        </div>

        {/* Second Karana */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 text-teal-700">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">
              2nd Karana
            </p>
            <p className="font-bold text-sm text-[#2b1810]">
              {metrics.secondKarana}
            </p>
          </div>
        </div>

        {/* Abhijit */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center shrink-0 text-amber-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">
              Abhijit
            </p>
            <p className="font-bold text-sm text-[#2b1810]">{metrics.abhijit}</p>
          </div>
        </div>

        {/* Varjam */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fde8d0] border border-[#e6c896] flex items-center justify-center shrink-0 text-[#c85a17]">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">
              Varjam
            </p>
            <p className="font-bold text-sm text-[#2b1810]">{metrics.varjam}</p>
          </div>
        </div>

        {/* Amrutha Kala */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0 text-green-700">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">
              Amrutha Kala
            </p>
            <p className="font-bold text-sm text-[#2b1810]">
              {metrics.amruthaKala}
            </p>
          </div>
        </div>

        {/* Rahu Kal */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0 text-red-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">
              Rahu Kal
            </p>
            <p className="font-bold text-sm text-red-700">{metrics.rahuKal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
