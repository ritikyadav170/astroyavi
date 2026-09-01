"use client";

import React from "react";
import { Star, Calendar, Clock, ShieldCheck } from "lucide-react";
import { PujaDetailData } from "../pujaBookingApi";

interface PujaStatsBarProps {
  puja: PujaDetailData;
}

export function PujaStatsBar({ puja }: PujaStatsBarProps) {
  return (
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
            <p className="font-bold text-base text-slate-900">
              {puja.bookings}
            </p>
            <p className="text-xs text-slate-500 font-medium">Puja Booking</p>
          </div>
        </div>

        {/* Stat 3: Time Durations */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-base text-slate-900">
              {puja.duration}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              Time Durations
            </p>
          </div>
        </div>

        {/* Stat 4: Secure & Trusted */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-base text-slate-900">100%</p>
            <p className="text-xs text-slate-500 font-medium">
              Secure &amp; Trusted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
