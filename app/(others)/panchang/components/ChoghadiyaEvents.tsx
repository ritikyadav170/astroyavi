"use client";

import React from "react";
import { choghadiyaList, planetaryEvents } from "../panchangApi";

export function ChoghadiyaEvents() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-14">
      {/* Left Card: Choghadiya / Daily Muhurat Timings */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-5">
        <h3 className="font-serif text-2xl font-bold text-[#801c10] border-b border-amber-100 pb-3">
          Daily Choghadiya &amp; Muhurat
        </h3>

        <div className="space-y-3">
          {choghadiyaList.map((item) => (
            <div key={item.id} className="flex items-center gap-4 group">
              <div className="w-8 h-8 rounded-full bg-[#1b4327] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                {item.id}
              </div>
              <div className="flex-1 flex items-center justify-between bg-amber-50/50 hover:bg-amber-50 p-2.5 rounded-xl border border-amber-100/80 transition-colors">
                <div>
                  <p className="font-bold text-sm text-[#2b1810]">{item.name}</p>
                  <p className="text-xs text-[#5c4033] font-medium">
                    {item.time}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === "Auspicious"
                      ? "bg-green-100 text-green-800"
                      : item.status === "Inauspicious"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Card: Upcoming Planetary Events */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-5">
        <h3 className="font-serif text-2xl font-bold text-[#801c10] border-b border-amber-100 pb-3">
          Upcoming Planetary Events
        </h3>

        <div className="space-y-3">
          {planetaryEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-4 group">
              <div className="w-8 h-8 rounded-full bg-[#1b4327] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                {event.id}
              </div>
              <div className="flex-1 bg-amber-50/50 hover:bg-amber-50 p-2.5 rounded-xl border border-amber-100/80 transition-colors">
                <p className="font-bold text-sm text-[#2b1810]">{event.title}</p>
                <p className="text-xs text-[#5c4033] font-medium">
                  {event.datetime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
