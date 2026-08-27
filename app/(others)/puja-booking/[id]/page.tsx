"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AstroNavbar } from "../../Homepage/navbar";
import { Footer } from "../../Homepage/footer";
import {
  Star,
  Calendar,
  Clock,
  ShieldCheck,
  Tv,
  Home,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface PujaDetailData {
  id: string;
  name: string;
  category: string;
  bannerImage: string;
  description: string;
  rating: string;
  bookings: string;
  duration: string;
  guarantee: string;
  gallery: string[];
  benefits: string[];
}

const PUJA_DATABASE: Record<string, PujaDetailData> = {
  "satyanarayana-puja": {
    id: "satyanarayana-puja",
    name: "Satyanarayana Puja",
    category: "Satyanarayana Puja",
    bannerImage: "/images/puja/satyanarayana_puja.jpg",
    description:
      "The Satyanarayana Puja is one of the most sacred and popular Vedic rituals performed to seek the blessings of Lord Satyanarayana, an incarnation of Lord Vishnu. This puja brings peace, prosperity, health, and divine harmony to the family. It is typically performed during housewarming, birthdays, anniversaries, or on full moon (Purnima) days.",
    rating: "4.9",
    bookings: "1200+",
    duration: "1 hr - 2 hr",
    guarantee: "100% Secure & Trusted",
    gallery: [
      "/images/puja/satyanarayana_puja.jpg",
      "/images/puja/ganesh_puja.jpg",
      "/images/puja/lakshmi_puja.jpg",
      "/images/puja/navgraha_puja.jpg",
      "/images/puja/shiv_puja.jpg",
      "/images/puja/durga_puja.jpg",
      "/images/puja/satyanarayana_puja.jpg",
    ],
    benefits: [
      "Prosperity & Wealth",
      "Family Happiness",
      "Attracts prosperity",
      "Removal of Obstacles",
      "Divine Blessings",
      "Promotes peace",
      "Success in new ventures",
      "Fulfills wishes & divine blessings",
      "Strengthens family harmony",
    ],
  },
  "ganesh-puja": {
    id: "ganesh-puja",
    name: "Ganesh Puja",
    category: "Ganesh Puja",
    bannerImage: "/images/puja/ganesh_puja.jpg",
    description:
      "Ganesh Puja is performed to invoke Lord Ganesha, the remover of all obstacles (Vighnaharta) and the deity of wisdom and new beginnings. Conducting this puja before starting any new venture, buying a property, or business inauguration ensures success and smooth progress.",
    rating: "4.9",
    bookings: "1500+",
    duration: "1 hr - 1.5 hr",
    guarantee: "100% Secure & Trusted",
    gallery: [
      "/images/puja/ganesh_puja.jpg",
      "/images/puja/satyanarayana_puja.jpg",
      "/images/puja/lakshmi_puja.jpg",
      "/images/puja/navgraha_puja.jpg",
      "/images/puja/shiv_puja.jpg",
      "/images/puja/durga_puja.jpg",
      "/images/puja/ganesh_puja.jpg",
    ],
    benefits: [
      "Removes all obstacles",
      "Wisdom & Knowledge",
      "Career advancement",
      "Success in examinations",
      "Divine Protection",
      "Auspicious beginnings",
      "Positive energy inflow",
    ],
  },
  "lakshmi-puja": {
    id: "lakshmi-puja",
    name: "Lakshmi Puja",
    category: "Lakshmi Puja",
    bannerImage: "/images/puja/lakshmi_puja.jpg",
    description:
      "Lakshmi Puja is dedicated to Goddess Lakshmi, the divine deity of wealth, fortune, and prosperity. This sacred ritual removes financial hardship, attracts abundance, accelerates business growth, and bestows eternal peace and harmony upon the household.",
    rating: "4.8",
    bookings: "980+",
    duration: "1.5 hr - 2 hr",
    guarantee: "100% Secure & Trusted",
    gallery: [
      "/images/puja/lakshmi_puja.jpg",
      "/images/puja/ganesh_puja.jpg",
      "/images/puja/satyanarayana_puja.jpg",
      "/images/puja/navgraha_puja.jpg",
      "/images/puja/shiv_puja.jpg",
      "/images/puja/durga_puja.jpg",
      "/images/puja/lakshmi_puja.jpg",
    ],
    benefits: [
      "Financial stability & Growth",
      "Attracts Wealth & Fortune",
      "Removes debts & losses",
      "Business expansion",
      "Peace & Abundance",
      "Divine Grace",
    ],
  },
  "navgraha-puja": {
    id: "navgraha-puja",
    name: "Navgraha Puja",
    category: "Grah Puja",
    bannerImage: "/images/puja/navgraha_puja.jpg",
    description:
      "Navgraha Puja is a comprehensive Vedic ritual to pacify all nine planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu). It neutralizes planetary doshas, alleviates bad period effects, and enhances health, wealth, and mental peace.",
    rating: "4.9",
    bookings: "1100+",
    duration: "2 hr - 2.5 hr",
    guarantee: "100% Secure & Trusted",
    gallery: [
      "/images/puja/navgraha_puja.jpg",
      "/images/puja/ganesh_puja.jpg",
      "/images/puja/satyanarayana_puja.jpg",
      "/images/puja/lakshmi_puja.jpg",
      "/images/puja/shiv_puja.jpg",
      "/images/puja/durga_puja.jpg",
      "/images/puja/navgraha_puja.jpg",
    ],
    benefits: [
      "Pacifies planetary doshas",
      "Removes Sade Sati effects",
      "Enhances good fortune",
      "Health & Mental clarity",
      "Overcomes sudden hurdles",
    ],
  },
  "shiv-puja": {
    id: "shiv-puja",
    name: "Shiv Puja",
    category: "Shiv Puja",
    bannerImage: "/images/puja/shiv_puja.jpg",
    description:
      "Shiv Puja and Maha Rudrabhishekam is a powerful spiritual ritual performed for Lord Shiva. Abhishekam with holy water, milk, honey, and bilva leaves purifies mind and soul, removes past karmic burdens, and bestows good health, longevity, and liberation.",
    rating: "5.0",
    bookings: "1650+",
    duration: "1.5 hr - 2 hr",
    guarantee: "100% Secure & Trusted",
    gallery: [
      "/images/puja/shiv_puja.jpg",
      "/images/puja/ganesh_puja.jpg",
      "/images/puja/satyanarayana_puja.jpg",
      "/images/puja/lakshmi_puja.jpg",
      "/images/puja/navgraha_puja.jpg",
      "/images/puja/durga_puja.jpg",
      "/images/puja/shiv_puja.jpg",
    ],
    benefits: [
      "Inner peace & Purification",
      "Good Health & Longevity",
      "Destroys negative karma",
      "Fulfills deep desires",
      "Spiritual awakening",
    ],
  },
  "durga-puja": {
    id: "durga-puja",
    name: "Durga Puja",
    category: "Durga Puja",
    bannerImage: "/images/puja/durga_puja.jpg",
    description:
      "Durga Puja is performed to invoke Goddess Durga, the supreme embodiment of Shakti (divine power). This sacred puja offers ultimate protection against evil forces, enemies, illness, and fears, filling your life with courage and divine strength.",
    rating: "4.9",
    bookings: "1350+",
    duration: "1.5 hr - 2 hr",
    guarantee: "100% Secure & Trusted",
    gallery: [
      "/images/puja/durga_puja.jpg",
      "/images/puja/ganesh_puja.jpg",
      "/images/puja/satyanarayana_puja.jpg",
      "/images/puja/lakshmi_puja.jpg",
      "/images/puja/navgraha_puja.jpg",
      "/images/puja/shiv_puja.jpg",
      "/images/puja/durga_puja.jpg",
    ],
    benefits: [
      "Protection from enemy & evil eye",
      "Courage & Confidence",
      "Overcomes illness & fear",
      "Victory in litigation",
      "Divine grace & Energy",
    ],
  },
};

const TIME_SLOTS = [
  { time: "08:00 AM", available: false },
  { time: "09:00 AM", available: false },
  { time: "10:00 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "01:00 PM", available: true },
  { time: "02:00 PM", available: false },
  { time: "03:00 PM", available: false },
  { time: "04:00 PM", available: true },
  { time: "05:00 PM", available: true },
  { time: "06:00 PM", available: false },
  { time: "07:00 PM", available: true },
  { time: "08:00 PM", available: false },
];

export default function PujaDetailPage() {
  const params = useParams();
  const rawId = (params?.id as string) || "satyanarayana-puja";
  
  // Find matching puja from database or fallback to Satyanarayana Puja
  const puja =
    PUJA_DATABASE[rawId] ||
    PUJA_DATABASE[
      Object.keys(PUJA_DATABASE).find((k) =>
        rawId.toLowerCase().includes(k.split("-")[0])
      ) || "satyanarayana-puja"
    ] ||
    PUJA_DATABASE["satyanarayana-puja"];

  const [pujaMode, setPujaMode] = useState<"online" | "offline">("online");
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string>("11:00 AM");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Generate calendar days for July 2026
  const calendarDays = Array.from({ length: 31 }, (_, i) => ({
    dayNumber: i + 1,
    dayName: "Wed",
    isAvailable: i + 1 >= 14,
  }));

  const handleBookNow = () => {
    setBookingConfirmed(true);
  };

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
        
        {/* Puja Title & Description */}
        <div className="space-y-4">
          <h1 className="font-sans text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {puja.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-5xl">
            {puja.description}
          </p>
        </div>

        {/* Highlights / Stats Bar Box */}
        <div className="w-full bg-white border border-amber-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Stat 1: Rating */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shrink-0">
                <Star className="w-6 h-6 fill-amber-400" />
              </div>
              <div>
                <p className="font-bold text-base text-slate-900">{puja.rating}</p>
                <p className="text-xs text-slate-500 font-medium">Rating</p>
              </div>
            </div>

            {/* Stat 2: Bookings */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-base text-slate-900">{puja.bookings}</p>
                <p className="text-xs text-slate-500 font-medium">Puja Booking</p>
              </div>
            </div>

            {/* Stat 3: Time Durations */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-base text-slate-900">{puja.duration}</p>
                <p className="text-xs text-slate-500 font-medium">Time Durations</p>
              </div>
            </div>

            {/* Stat 4: Secure & Trusted */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-base text-slate-900">100%</p>
                <p className="text-xs text-slate-500 font-medium">Secure & Trusted</p>
              </div>
            </div>

          </div>
        </div>

        {/* Photos & Videos Section */}
        <div className="space-y-4">
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900">
            Photos & Videos
          </h2>

          <div className="flex items-center gap-4 overflow-x-auto pb-3 scrollbar-none no-scrollbar">
            {puja.gallery.map((imgSrc, idx) => (
              <div
                key={idx}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-2xs hover:scale-105 transition-transform duration-300 cursor-pointer bg-slate-100"
              >
                <img
                  src={imgSrc}
                  alt={`Puja gallery thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Puja Benefits Section */}
        <div className="space-y-4">
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900">
            Puja Benefits
          </h2>

          <div className="flex flex-wrap gap-3">
            {puja.benefits.map((benefit, idx) => (
              <span
                key={idx}
                className="bg-slate-100/90 text-slate-800 text-xs sm:text-sm font-medium px-4 py-2 rounded-lg border border-slate-200/60 shadow-2xs"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* Puja Mode Selection */}
        <div className="space-y-4 pt-2">
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900">
            Puja Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            
            {/* Online Puja Card */}
            <div
              onClick={() => setPujaMode("online")}
              className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                pujaMode === "online"
                  ? "border-[#1E3B2B] bg-white shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                  <Tv className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Online Puja</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Join puja from anywhere via live video
                  </p>
                </div>
              </div>

              {/* Radio Indicator */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  pujaMode === "online"
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
              className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                pujaMode === "offline"
                  ? "border-[#1E3B2B] bg-white shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Offline Puja</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pandit will perform puja at your location
                  </p>
                </div>
              </div>

              {/* Radio Indicator */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  pujaMode === "offline"
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

          {/* Calendar Strip (Horizontal Scroll / Grid) */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-none no-scrollbar">
            {calendarDays.map((item) => {
              const isSelected = selectedDay === item.dayNumber;
              const isPastOrDisabled = !item.isAvailable;

              return (
                <button
                  key={item.dayNumber}
                  disabled={isPastOrDisabled}
                  onClick={() => setSelectedDay(item.dayNumber)}
                  className={`w-12 py-2.5 rounded-xl text-center flex flex-col items-center justify-center transition-all shrink-0 ${
                    isSelected
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
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                      isSelected
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
              onClick={handleBookNow}
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
              Your session for <span className="font-semibold text-slate-900">{puja.name}</span> ({pujaMode.toUpperCase()}) is scheduled for <span className="font-semibold text-slate-900">15 July 2026 at {selectedTime}</span>.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setBookingConfirmed(false)}
                className="px-8 py-2.5 bg-[#1E3B2B] text-white text-sm font-bold rounded-full shadow-md hover:bg-[#142a1e] transition-all"
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
