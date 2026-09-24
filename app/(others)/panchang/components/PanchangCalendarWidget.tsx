"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from "lucide-react";

interface PanchangCalendarWidgetProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function PanchangCalendarWidget({
  selectedDate,
  onSelectDate,
}: PanchangCalendarWidgetProps) {
  // Parse initial year & month from selectedDate
  const [currentYear, setCurrentYear] = useState(() => {
    const parts = selectedDate.split("-").map(Number);
    return parts[0] || new Date().getFullYear();
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    const parts = selectedDate.split("-").map(Number);
    return (parts[1] ? parts[1] - 1 : new Date().getMonth());
  });

  // Calculate calendar grid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const todayStr = React.useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#e6c896] shadow-sm flex flex-col justify-between h-full space-y-4">
      {/* Calendar Header with Navigation */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-amber-100">
        <button
          type="button"
          onClick={handlePrevMonth}
          aria-label="Previous Month"
          className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-[#2b1810] cursor-pointer transition-colors border border-amber-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#801c10]" />
          <h3 className="font-bold text-base text-[#2b1810]">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h3>
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          aria-label="Next Month"
          className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-[#2b1810] cursor-pointer transition-colors border border-amber-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Vedic Grid Calendar Container */}
      <div className="w-full bg-[#faedd9]/30 border border-[#e6c896] rounded-2xl p-3.5 text-center space-y-2">
        {/* Days of the Week Header */}
        <div className="grid grid-cols-7 gap-1 text-[11px] font-bold text-red-800 border-b border-amber-200/80 pb-1.5">
          {DAY_NAMES.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        {/* Month Dates Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-xs text-[#2b1810]">
          {/* Empty cells for leading offset */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2 opacity-0 select-none">
              -
            </div>
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateIso = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
              dayNum
            ).padStart(2, "0")}`;

            const isSelected = selectedDate === dateIso;
            const isToday = todayStr === dateIso;

            return (
              <button
                key={`day-${dayNum}`}
                type="button"
                onClick={() => onSelectDate(dateIso)}
                className={`p-2 rounded-xl text-center font-bold text-xs transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                  isSelected
                    ? "bg-[#1b4327] text-white shadow-md scale-105"
                    : isToday
                    ? "bg-amber-100 border border-amber-400 text-[#801c10] hover:bg-amber-200"
                    : "bg-white hover:bg-amber-50 border border-amber-200/60 text-[#2b1810]"
                }`}
              >
                <span>{dayNum}</span>
                {isToday && !isSelected && (
                  <span className="text-[8px] font-extrabold uppercase text-red-700">
                    Today
                  </span>
                )}
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 mt-0.5"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Calendar Note */}
      <div className="pt-2 text-[11px] text-[#5c4033] font-medium text-center flex items-center justify-center gap-1.5 border-t border-amber-100/70">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>Click any date on the calendar to view its exact Vedic Panchang &amp; Muhurat.</span>
      </div>
    </div>
  );
}
