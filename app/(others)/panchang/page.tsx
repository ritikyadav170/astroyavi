"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import {
  FullPanchangData,
  defaultPanchangData,
  getPanchangData,
} from "./panchang";
import { PanchangHeaderForm } from "./components/PanchangHeaderForm";
import { PanchangMetrics } from "./components/PanchangMetrics";
import { PanchangCalendarWidget } from "./components/PanchangCalendarWidget";
import { ChoghadiyaEvents } from "./components/ChoghadiyaEvents";
import { PanchangAstrologers } from "./components/PanchangAstrologers";

function getTodayIsoString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function PanchangPage() {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayIsoString);
  const [place, setPlace] = useState<string>("Delhi, India");
  const [panchangData, setPanchangData] = useState<FullPanchangData>(defaultPanchangData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPanchang = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPanchangData(selectedDate, place);
      setPanchangData(data);
    } catch (err) {
      console.error("Error fetching panchang data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, place]);

  useEffect(() => {
    fetchPanchang();
  }, [fetchPanchang]);

  return (
    <main className="min-h-screen bg-[#fdf8f0] selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* Top Navbar */}
      <AstroNavbar />

      {/* Main Container */}
      <div className="w-full flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[1350px] mx-auto flex flex-col items-center">
        {/* Header & Date/Place Form */}
        <PanchangHeaderForm
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          place={place}
          setPlace={setPlace}
          onFetchPanchang={fetchPanchang}
          isLoading={isLoading}
        />

        {/* Main 2-Column Panchang Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full mb-10">
          {/* Left Column: Core Panchang Details Card (7 cols) */}
          <div className="lg:col-span-7">
            <PanchangMetrics data={panchangData} isLoading={isLoading} />
          </div>

          {/* Right Column: Interactive Vedic Calendar Card Widget (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <PanchangCalendarWidget
              selectedDate={selectedDate}
              onSelectDate={(newDate) => {
                setSelectedDate(newDate);
              }}
            />
          </div>
        </div>

        {/* Secondary Information Grid: Day/Night Choghadiya & Directional Guidance */}
        <ChoghadiyaEvents
          choghadiya={panchangData.choghadiya}
          auspicious={panchangData.auspicious}
          nivasShool={panchangData.nivasShool}
        />

        {/* Recommended Astrologers Section (Live API Backend Connected) */}
        <PanchangAstrologers />
      </div>

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
