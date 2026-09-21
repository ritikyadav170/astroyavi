"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AstroNavbar } from "../../Homepage/navbar";
import { Footer } from "../../Homepage/footer";
import {
  PujaDetailData,
  TIME_SLOTS,
  getPujaDetailById,
} from "../pujaBooking";
import { PujaStatsBar } from "../components/PujaStatsBar";
import { PujaGalleryAndBenefits } from "../components/PujaGalleryAndBenefits";
import {
  Calendar,
  Clock,
  Tv,
  Home,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export default function PujaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.id as string) || "satyanarayana-puja";

  const [puja, setPuja] = useState<PujaDetailData | null>(null);
  const [pujaMode, setPujaMode] = useState<"online" | "offline">("online");
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string>("11:00 AM");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    getPujaDetailById(rawId).then((data) => setPuja(data));
  }, [rawId]);

  if (!puja) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center">
        <p className="text-slate-600">Loading Puja Details...</p>
      </div>
    );
  }

  // Calendar days generation
  const calendarDays = Array.from({ length: 31 }, (_, i) => ({
    dayNumber: i + 1,
    dayName: "Wed",
    isAvailable: i + 1 >= 14,
  }));

  return (
    <main className="min-h-screen bg-[#faf9f5] flex flex-col font-sans text-slate-800">
      {/* Navbar */}
      <AstroNavbar />

      {/* Hero Banner Image */}
      <div className="w-full h-[340px] sm:h-[440px] lg:h-[500px] relative overflow-hidden bg-slate-900">
        <img
          src={puja.bannerImage}
          alt={puja.name}
          className="w-full h-full object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Main Details Body */}
      <div className="w-full flex-1 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
        {/* Title & Description */}
        <div className="space-y-4">
          <h1 className="font-sans text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {puja.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-5xl">
            {puja.description}
          </p>
        </div>

        {/* Highlights / Stats Bar Box Component */}
        <PujaStatsBar puja={puja} />

        {/* Gallery & Benefits Components */}
        <PujaGalleryAndBenefits puja={puja} />

        {/* Puja Mode Selection */}
        <div className="space-y-4 pt-2">
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900">
            Puja Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {/* Online Puja Card */}
            <div
              onClick={() => setPujaMode("online")}
              className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${pujaMode === "online"
                  ? "border-[#1E3B2B] bg-white shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
                }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                  <Tv className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Online Puja
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Join puja from anywhere via live video
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pujaMode === "online"
                    ? "border-[#1E3B2B] bg-[#1E3B2B]"
                    : "border-slate-300"
                  }`}
              >
                {pujaMode === "online" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>

            {/* Offline Puja Card */}
            <div
              onClick={() => setPujaMode("offline")}
              className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${pujaMode === "offline"
                  ? "border-[#1E3B2B] bg-white shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
                }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Offline Puja
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pandit will perform puja at your location
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pujaMode === "offline"
                    ? "border-[#1E3B2B] bg-[#1E3B2B]"
                    : "border-slate-300"
                  }`}
              >
                {pujaMode === "offline" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Book Session Section */}
        <div className="space-y-6 pt-2">
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900">
            Book Session
          </h2>

          {/* Month Header */}
          <div className="flex items-center gap-3 text-slate-900 font-semibold text-base">
            <Calendar className="w-5 h-5 text-slate-700" />
            <span>July 2026</span>
            <div className="flex items-center gap-1 ml-2">
              <button className="p-1 text-slate-400 hover:text-slate-700">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 text-slate-400 hover:text-slate-700">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Strip */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-none no-scrollbar">
            {calendarDays.map((item) => {
              const isSelected = selectedDay === item.dayNumber;
              const isPastOrDisabled = !item.isAvailable;

              return (
                <button
                  key={item.dayNumber}
                  disabled={isPastOrDisabled}
                  onClick={() => setSelectedDay(item.dayNumber)}
                  className={`w-12 py-2.5 rounded-xl text-center flex flex-col items-center justify-center transition-all shrink-0 cursor-pointer ${isSelected
                      ? "bg-[#1E3B2B] text-white font-bold shadow-md"
                      : isPastOrDisabled
                        ? "bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-200"
                        : "bg-white border border-slate-300 text-slate-800 hover:border-slate-400"
                    }`}
                >
                  <span className="text-[11px] font-medium opacity-80">
                    {item.dayName}
                  </span>
                  <span className="text-sm font-bold">{item.dayNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Select Time Slots */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-slate-800">Select Time</h3>

            <div className="flex flex-wrap gap-3">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTime === slot.time;

                return (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${isSelected
                        ? "bg-[#1E3B2B] text-white shadow-sm"
                        : !slot.available
                          ? "bg-slate-200/80 text-slate-400 cursor-not-allowed"
                          : "bg-white border border-slate-400 text-slate-800 hover:bg-slate-50"
                      }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Button: Book Now */}
          <div className="pt-6 flex flex-col items-center justify-center">
            <button
              onClick={() => router.push(`/puja-booking/${puja.id}/details`)}
              className="w-full sm:w-auto px-16 py-3.5 bg-[#1E3B2B] hover:bg-[#142a1e] text-white font-bold text-base rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {bookingConfirmed && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl border border-amber-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-2xl text-slate-900">
              Booking Confirmed!
            </h3>
            <p className="text-sm text-slate-600">
              Your session for{" "}
              <span className="font-semibold text-slate-900">{puja.name}</span>{" "}
              ({pujaMode.toUpperCase()}) is scheduled for{" "}
              <span className="font-semibold text-slate-900">
                15 July 2026 at {selectedTime}
              </span>
              .
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setBookingConfirmed(false)}
                className="px-8 py-2.5 bg-[#1E3B2B] text-white text-sm font-bold rounded-full shadow-md hover:bg-[#142a1e] transition-all cursor-pointer"
              >
                Great, Thank You!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
