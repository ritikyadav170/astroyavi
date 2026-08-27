"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import {
  Calendar,
  MapPin,
  Sun,
  Moon,
  Compass,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  Phone,
  MessageSquare,
  Video,
  CheckCircle,
} from "lucide-react";

const astrologers = [
  {
    id: 1,
    name: "Vikram Singh",
    specialty: "Vedic Astrology",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "VS",
    bgColor: "bg-[#1b4327]",
  },
  {
    id: 2,
    name: "Ravindra Sharma",
    specialty: "Tarot Reading",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-amber-700",
  },
  {
    id: 3,
    name: "Sandeep Sharma",
    specialty: "Vastu, Tarot Reading",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "SS",
    bgColor: "bg-orange-600",
  },
  {
    id: 4,
    name: "Pinki Choudhary",
    specialty: "Face Reading, Numerology",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "PC",
    bgColor: "bg-[#801c10]",
  },
  {
    id: 5,
    name: "Raju Srivastav",
    specialty: "Lal Kitab, Nadi, Numerology",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-emerald-800",
  },
];

const choghadiyaList = [
  { id: 1, name: "Rog", time: "05:58:43 AM - 07:30:25 AM", status: "Inauspicious" },
  { id: 2, name: "Kaal", time: "07:30:25 AM - 09:05:10 AM", status: "Inauspicious" },
  { id: 3, name: "Laabh", time: "09:05:10 AM - 10:40:00 AM", status: "Auspicious" },
  { id: 4, name: "Udveg", time: "10:40:00 AM - 12:15:45 PM", status: "Inauspicious" },
  { id: 5, name: "Shubh", time: "12:15:45 PM - 01:50:30 PM", status: "Auspicious" },
  { id: 6, name: "Amrit", time: "01:50:30 PM - 03:25:15 PM", status: "Auspicious" },
  { id: 7, name: "Char", time: "03:25:15 PM - 05:00:00 PM", status: "Neutral" },
  { id: 8, name: "Rog", time: "05:00:00 PM - 06:35:00 PM", status: "Inauspicious" },
];

const planetaryEvents = [
  {
    id: 1,
    title: "Surya & Budha at 0° (Today)",
    datetime: "July 13, 2026, Monday at 05:53 AM",
  },
  {
    id: 2,
    title: "Yam enters in U Ashadha (Today)",
    datetime: "July 13, 2026, Monday at 03:53 AM",
  },
  {
    id: 3,
    title: "Yam transits U Ashadha Pada (Today)",
    datetime: "July 13, 2026, Monday at 08:53 AM",
  },
  {
    id: 4,
    title: "Shukra enters in P Phalguni (3 Days)",
    datetime: "July 16, 2026, Thursday at 06:53 AM",
  },
  {
    id: 5,
    title: "Guru transits Pushya Pada (6 Days)",
    datetime: "July 19, 2026, Sunday at 06:53 AM",
  },
  {
    id: 6,
    title: "Mangal & Shani at 60° (7 Days)",
    datetime: "July 20, 2026, Monday at 06:53 AM",
  },
  {
    id: 7,
    title: "Bhadra & Mangal at 90° (9 Days)",
    datetime: "July 22, 2026, Wednesday at 06:53 AM",
  },
];

export default function PanchangPage() {
  const [selectedDate, setSelectedDate] = useState("2026-07-13");
  const [place, setPlace] = useState("Noida, India");

  return (
    <main className="min-h-screen bg-[#fdf8f0] selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* Navbar */}
      <AstroNavbar />

      {/* Main Container */}
      <div className="w-full flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[1350px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 max-w-4xl">
          <div className="flex items-center gap-3 text-[#c87638] mb-2">
            <div className="h-[1px] w-16 bg-[#c87638]"></div>
            <span className="text-xs font-bold uppercase tracking-widest">DAILY PANCHANG</span>
            <div className="h-[1px] w-16 bg-[#c87638]"></div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] tracking-tight mb-4 leading-snug">
            Stay informed with today's auspicious timings and essential Vedic calendar details.
          </h1>

          <p className="text-sm sm:text-base text-[#5c4033] leading-relaxed max-w-3xl">
            Access an accurate daily Panchang with Tithi, Nakshatra, Yoga, Karana, Vara, Rahu Kaal, Sunrise, Sunset, and Shubh Muhurat to plan every important moment with confidence.
          </p>
        </div>

        {/* Date & Location Selector Form Container */}
        <div className="w-full bg-white/70 border border-[#e6c896] rounded-2xl p-5 shadow-xs mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* Date Picker Input */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="text-xs font-bold text-[#3c2415] uppercase tracking-wider block">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white border border-[#e6c896] rounded-xl py-2.5 px-4 text-sm font-semibold text-[#2b1810] focus:outline-none focus:border-[#1b4327] shadow-2xs"
                />
              </div>
            </div>

            {/* Place Input */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="text-xs font-bold text-[#3c2415] uppercase tracking-wider block">
                Place
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Enter City, Country"
                  className="w-full bg-white border border-[#e6c896] rounded-xl py-2.5 pl-4 pr-10 text-sm font-semibold text-[#2b1810] focus:outline-none focus:border-[#1b4327] shadow-2xs"
                />
                <MapPin className="w-4 h-4 text-[#c87638] absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* View Panchang Action Button */}
            <div className="md:col-span-3">
              <button className="w-full bg-[#1b4327] hover:bg-[#13321d] text-white py-2.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all">
                View Panchang
              </button>
            </div>

          </div>
        </div>

        {/* Main 2-Column Panchang Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full mb-10">
          
          {/* Left Column: Panchang Metrics Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              
              {/* Sunrise */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-600">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">Sunrise</p>
                  <p className="font-bold text-sm text-[#2b1810]">05:24 AM</p>
                </div>
              </div>

              {/* Sunset */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 text-orange-600">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">Sunset</p>
                  <p className="font-bold text-sm text-[#2b1810]">07:18 PM</p>
                </div>
              </div>

              {/* Yoga */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-700">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">Yoga</p>
                  <p className="font-bold text-sm text-[#2b1810]">Shubha</p>
                </div>
              </div>

              {/* Tithi */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0 text-purple-700">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">Tithi</p>
                  <p className="font-bold text-sm text-[#2b1810]">Amavasya</p>
                </div>
              </div>

              {/* Nakshatra */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0 text-indigo-700">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">Nakshatra</p>
                  <p className="font-bold text-sm text-[#2b1810]">Rohini</p>
                </div>
              </div>

              {/* Karana */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-rose-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">Karana</p>
                  <p className="font-bold text-sm text-[#2b1810]">Chatushpada</p>
                </div>
              </div>

              {/* Paksha */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-700">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">Paksha</p>
                  <p className="font-bold text-sm text-[#2b1810]">Shukla Paksha</p>
                </div>
              </div>

              {/* Second Karana */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 text-teal-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">2nd Karana</p>
                  <p className="font-bold text-sm text-[#2b1810]">Hasta 11:40 PM</p>
                </div>
              </div>

              {/* Abhijit */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center shrink-0 text-amber-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">Abhijit</p>
                  <p className="font-bold text-sm text-[#2b1810]">11:51 - 12:44</p>
                </div>
              </div>

              {/* Varjam */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fde8d0] border border-[#e6c896] flex items-center justify-center shrink-0 text-[#c85a17]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">Varjam</p>
                  <p className="font-bold text-sm text-[#2b1810]">23:43 - 23:08</p>
                </div>
              </div>

              {/* Amrutha Kala */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0 text-green-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">Amrutha Kala</p>
                  <p className="font-bold text-sm text-[#2b1810]">11:51 - 12:44</p>
                </div>
              </div>

              {/* Rahu Kal */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0 text-red-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8c6d58] uppercase">Rahu Kal</p>
                  <p className="font-bold text-sm text-red-700">15:36 - 23:08</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Monthly Vedic Calendar Card Widget (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#e6c896] shadow-sm flex flex-col items-center justify-between">
            
            {/* Calendar Month Header */}
            <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <button className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-[#2b1810]">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h3 className="font-bold text-base text-[#2b1810]">28 June 2026</h3>
              <button className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-[#2b1810]">
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
                <div className="p-1.5 bg-amber-100/70 rounded-lg border border-amber-300 font-bold">1 🕉️</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">2</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">3</div>
                <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-200 text-red-700 font-bold">4 🚩</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">5</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">6</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">7</div>

                <div className="p-1.5 bg-white rounded-lg border border-amber-200">8</div>
                <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 font-semibold">9</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">10</div>
                <div className="p-1.5 bg-amber-100/80 rounded-lg border border-amber-300 font-bold text-red-800">11 🕉️</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">12</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">13</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">14</div>

                <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-200">15</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">16</div>
                <div className="p-1.5 bg-[#1b4327] text-white rounded-lg font-bold shadow-xs">17 TODAY</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">18</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">19</div>
                <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-200 font-semibold text-red-700">20 🪔</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">21</div>

                <div className="p-1.5 bg-white rounded-lg border border-amber-200">22</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">23</div>
                <div className="p-1.5 bg-amber-100 rounded-lg border border-amber-300 font-bold">24 🌙</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">25</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">26</div>
                <div className="p-1.5 bg-white rounded-lg border border-amber-200">27</div>
                <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-200">28</div>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-[#5c4033] font-medium text-center">
              🪔 Click any date to view detailed Panchang, Tithi, & Shubh Muhurat.
            </div>

          </div>

        </div>

        {/* Secondary 2-Column Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-14">
          
          {/* Left Card: Choghadiya / Daily Muhurat Timings */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896] shadow-sm space-y-5">
            <h3 className="font-serif text-2xl font-bold text-[#801c10] border-b border-amber-100 pb-3">
              Daily Choghadiya & Muhurat
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
                      <p className="text-xs text-[#5c4033] font-medium">{item.time}</p>
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
                    <p className="text-xs text-[#5c4033] font-medium">{event.datetime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Recommended Astrologer Section */}
        <div className="w-full flex flex-col items-center space-y-8 mb-8">
          
          <div className="flex items-center gap-3 text-[#c87638]">
            <div className="h-[1px] w-16 bg-[#c87638]"></div>
            <span className="text-xs font-bold uppercase tracking-widest">Recommended Astrologer</span>
            <div className="h-[1px] w-16 bg-[#c87638]"></div>
          </div>

          <div className="relative w-full flex items-center justify-center">
            
            {/* Left Arrow */}
            <button className="hidden sm:flex absolute -left-4 z-20 w-10 h-10 rounded-full bg-[#1b4327] text-white items-center justify-center shadow-md hover:bg-[#13321d] transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Astrologers 5 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
              {astrologers.map((astrologer) => (
                <div
                  key={astrologer.id}
                  className="bg-white rounded-3xl p-5 border border-[#e6c896] flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="relative mb-3">
                    <div className={`w-16 h-16 rounded-full ${astrologer.bgColor} border-2 border-[#1b4327] flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                      {astrologer.initials}
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-[#2b1810] mb-0.5">
                    {astrologer.name}
                  </h3>
                  <p className="text-xs text-[#5c4033] min-h-[30px] flex items-center justify-center mb-2">
                    {astrologer.specialty}
                  </p>

                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-2">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{astrologer.rating}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-[#2b1810] mb-4">
                    <span>₹{astrologer.price}/min</span>
                    <s className="text-[10px] text-red-500 font-normal">₹{astrologer.originalPrice}/min</s>
                  </div>

                  <div className="flex items-center justify-center gap-2 w-full">
                    <button className="w-9 h-9 rounded-full border border-slate-300 hover:border-[#1b4327] flex items-center justify-center text-[#1b4327] hover:bg-[#1b4327] hover:text-white transition-all">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-500 flex items-center justify-center text-slate-950 transition-all shadow-xs">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-full border border-slate-300 hover:border-[#1b4327] flex items-center justify-center text-[#1b4327] hover:bg-[#1b4327] hover:text-white transition-all">
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button className="hidden sm:flex absolute -right-4 z-20 w-10 h-10 rounded-full bg-[#1b4327] text-white items-center justify-center shadow-md hover:bg-[#13321d] transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

          <Link
            href="/talk-to-astrologer"
            className="px-8 py-3 bg-[#1b4327] hover:bg-[#13321d] text-white font-bold text-sm rounded-full shadow-lg transition-all"
          >
            View All Astrologers &gt;
          </Link>

        </div>

      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
