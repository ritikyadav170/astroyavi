"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PanchangCalendarWidget() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-[#e6c896] shadow-sm flex flex-col items-center justify-between">
      {/* Calendar Month Header */}
      <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <button
          aria-label="Previous Month"
          className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-[#2b1810] cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="font-bold text-base text-[#2b1810]">28 June 2026</h3>
        <button
          aria-label="Next Month"
          className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-[#2b1810] cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Vedic Grid Calendar Graphic Container */}
      <div className="w-full bg-[#faedd9]/40 border border-[#e6c896] rounded-2xl p-3 text-center space-y-2">
        <div className="grid grid-cols-7 gap-1 text-[10px] font-bold text-red-800 border-b border-amber-200 pb-1">
          <span>SUN</span>
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
        </div>

        {/* 5 Rows of Calendar Dates Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-[10px] text-[#2b1810]">
          <div className="p-1.5 bg-amber-100/70 rounded-lg border border-amber-300 font-bold">
            1 🕉️
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            2
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            3
          </div>
          <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-200 text-red-700 font-bold">
            4 🚩
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            5
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            6
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            7
          </div>

          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            8
          </div>
          <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 font-semibold">
            9
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            10
          </div>
          <div className="p-1.5 bg-amber-100/80 rounded-lg border border-amber-300 font-bold text-red-800">
            11 🕉️
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            12
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            13
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            14
          </div>

          <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-200">
            15
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            16
          </div>
          <div className="p-1.5 bg-[#1b4327] text-white rounded-lg font-bold shadow-xs">
            17 TODAY
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            18
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            19
          </div>
          <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-200 font-semibold text-red-700">
            20 🪔
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            21
          </div>

          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            22
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            23
          </div>
          <div className="p-1.5 bg-amber-100 rounded-lg border border-amber-300 font-bold">
            24 🌙
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            25
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            26
          </div>
          <div className="p-1.5 bg-white rounded-lg border border-amber-200">
            27
          </div>
          <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-200">
            28
          </div>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-[#5c4033] font-medium text-center">
        🪔 Click any date to view detailed Panchang, Tithi, &amp; Shubh Muhurat.
      </div>
    </div>
  );
}
