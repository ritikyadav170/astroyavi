"use client";

import React from "react";
import { PujaDetailData } from "../pujaBookingApi";

interface PujaGalleryAndBenefitsProps {
  puja: PujaDetailData;
}

export function PujaGalleryAndBenefits({ puja }: PujaGalleryAndBenefitsProps) {
  return (
    <>
      {/* Photos & Videos Section */}
      <div className="space-y-4">
        <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900">
          Photos &amp; Videos
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
    </>
  );
}
