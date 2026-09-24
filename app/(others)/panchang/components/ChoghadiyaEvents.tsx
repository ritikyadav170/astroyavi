"use client";

import React, { useState } from "react";
import { Sun, Moon, Sparkles, Compass, ShieldAlert, CheckCircle2 } from "lucide-react";
import { ChoghadiyaItem, PanchangAuspicious, PanchangNivasShool } from "../panchang";

interface ChoghadiyaEventsProps {
  choghadiya: {
    day: ChoghadiyaItem[];
    night: ChoghadiyaItem[];
  };
  auspicious?: PanchangAuspicious;
  nivasShool?: PanchangNivasShool;
}

export function ChoghadiyaEvents({
  choghadiya,
  auspicious,
  nivasShool,
}: ChoghadiyaEventsProps) {
  const [activeTab, setActiveTab] = useState<"day" | "night">("day");

  const currentList = activeTab === "day" ? choghadiya.day : choghadiya.night;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full mb-14">
      {/* Left Card: Choghadiya Muhurat Timings (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#801c10] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Daily Choghadiya (चौघड़िया)
            </h3>
            <p className="text-xs text-[#5c4033]">
              Plan auspicious activities using 8 daytime and 8 nighttime planetary divisions.
            </p>
          </div>

          {/* Day / Night Toggle Tabs */}
          <div className="flex items-center bg-amber-50 p-1 rounded-xl border border-amber-200 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("day")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "day"
                  ? "bg-[#1b4327] text-white shadow-xs"
                  : "text-[#5c4033] hover:text-[#1b4327]"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Day (दिन)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("night")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "night"
                  ? "bg-[#1b4327] text-white shadow-xs"
                  : "text-[#5c4033] hover:text-[#1b4327]"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Night (रात)</span>
            </button>
          </div>
        </div>

        {/* Choghadiya Items List */}
        <div className="space-y-2.5">
          {currentList.map((item) => {
            const isAuspicious = item.status === "Auspicious";
            const isInauspicious = item.status === "Inauspicious";

            return (
              <div key={`${activeTab}-${item.id}`} className="flex items-center gap-3 group">
                <div
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs ${
                    isAuspicious
                      ? "bg-green-700 text-white"
                      : isInauspicious
                      ? "bg-red-700 text-white"
                      : "bg-amber-700 text-white"
                  }`}
                >
                  {item.id}
                </div>
                <div className="flex-1 flex items-center justify-between bg-amber-50/40 hover:bg-amber-50 p-2.5 rounded-xl border border-amber-100/90 transition-colors">
                  <div>
                    <span className="font-bold text-sm text-[#2b1810] mr-2">
                      {item.name}
                    </span>
                    <span className="text-xs text-[#5c4033] font-medium">
                      {item.time}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isAuspicious
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : isInauspicious
                        ? "bg-red-100 text-red-800 border border-red-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Card: Disha Shool & Special Muhurats Guide (5 cols) */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm flex flex-col justify-between space-y-5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#801c10] border-b border-amber-100 pb-3 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-600" />
            Disha Shool &amp; Muhurats
          </h3>
          <p className="text-xs text-[#5c4033] mt-1 mb-4">
            Directional guidance and sacred daily windows according to Vedic astrology.
          </p>

          <div className="space-y-4">
            {/* Disha Shool Alert */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
              <div className="flex items-center gap-2 text-[#801c10] font-bold text-sm mb-1">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>Disha Shool (दिशा शूल)</span>
              </div>
              <p className="text-xs text-[#5c4033] leading-relaxed">
                Avoid traveling towards the{" "}
                <strong className="text-[#801c10]">{nivasShool?.dishaShool || "East"}</strong>{" "}
                direction today. If unavoidable, consume curd or jaggery before commencing the journey.
              </p>
            </div>

            {/* Moon Nivas */}
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
              <div className="flex items-center gap-2 text-purple-950 font-bold text-sm mb-1">
                <Moon className="w-4 h-4 text-purple-700" />
                <span>Chandra Nivas (चन्द्र वास)</span>
              </div>
              <p className="text-xs text-[#5c4033] leading-relaxed">
                Moon resides in the{" "}
                <strong className="text-purple-900">{nivasShool?.moonNivas || "South"}</strong>{" "}
                direction, conferring auspicious results for ceremonies aligned with this direction.
              </p>
            </div>

            {/* Godhuli Muhurta */}
            {auspicious?.godhuliMuhurta && auspicious.godhuliMuhurta !== "--" && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">Godhuli Muhurta</span>
                  <span className="text-[11px] text-[#5c4033]">Twilight hour for worship &amp; mantra japa</span>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-300">
                  {auspicious.godhuliMuhurta}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Pro Tip Footer */}
        <div className="pt-3 border-t border-amber-100 flex items-start gap-2 text-[11px] text-[#5c4033]">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
          <span>
            <strong>Shubh, Amrit, and Labh</strong> Choghadiyas are best for business openings, journeys, purchases, and religious ceremonies.
          </span>
        </div>
      </div>
    </div>
  );
}
