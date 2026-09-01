"use client";

import React, { useState, useEffect } from "react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import {
  PanchangMetricsData,
  defaultMetrics,
  getPanchangData,
} from "./panchangApi";
import { PanchangHeaderForm } from "./components/PanchangHeaderForm";
import { PanchangMetrics } from "./components/PanchangMetrics";
import { PanchangCalendarWidget } from "./components/PanchangCalendarWidget";
import { ChoghadiyaEvents } from "./components/ChoghadiyaEvents";
import { PanchangAstrologers } from "./components/PanchangAstrologers";

export default function PanchangPage() {
  const [selectedDate, setSelectedDate] = useState("2026-07-13");
  const [place, setPlace] = useState("Noida, India");
  const [metrics, setMetrics] = useState<PanchangMetricsData>(defaultMetrics);

  const fetchPanchang = async () => {
    try {
      const data = await getPanchangData(selectedDate, place);
      setMetrics(data.metrics);
    } catch (err) {
      console.error("Error fetching panchang:", err);
    }
  };

  useEffect(() => {
    fetchPanchang();
  }, [selectedDate, place]);

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
        />

        {/* Main 2-Column Panchang Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full mb-10">
          {/* Left Column: Panchang Metrics Card (7 cols) */}
          <div className="lg:col-span-7">
            <PanchangMetrics metrics={metrics} />
          </div>

          {/* Right Column: Monthly Vedic Calendar Card Widget (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <PanchangCalendarWidget />
          </div>
        </div>

        {/* Secondary 2-Column Information Grid */}
        <ChoghadiyaEvents />

        {/* Recommended Astrologers Section */}
        <PanchangAstrologers />
      </div>

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
