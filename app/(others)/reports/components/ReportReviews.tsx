"use client";

import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export function ReportReviews() {
  const reviews = [
    {
      name: "Pooja Verma",
      city: "Lucknow, Uttar Pradesh",
      report: "36 Guna Kundli Milan Report",
      rating: 5,
      date: "2 days ago",
      comment:
        "The Kundli Matching report was incredibly detailed! It didn't just give the Guna score, but explained the Nadi Dosha and remedies in very simple terms. Both families were completely satisfied.",
    },
    {
      name: "Amitabh Sen",
      city: "Kolkata, West Bengal",
      report: "Career & Wealth Guidance Report",
      rating: 5,
      date: "1 week ago",
      comment:
        "Was confused about leaving my corporate job for a startup. The career report accurately highlighted my 10th house Jupiter dasha timeline. Made the transition and it turned out to be the best decision!",
    },
    {
      name: "Rohan Kapoor",
      city: "Mumbai, Maharashtra",
      report: "Complete Janam Kundli & Dasha Report",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Downloaded the 28-page PDF report. The Vimshottari Mahadasha timeline was spot on with my past life events. The gemstone recommendation also helped clear a lot of stress.",
    },
  ];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#c85a17] block mb-1">
          Real Seeker Experiences
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2d1a0e]">
          What Our Users Say About Astroyavi Reports
        </h2>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Rating & Report Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <span className="text-[10px] font-semibold text-slate-400">{rev.date}</span>
              </div>

              {/* Quote Comment */}
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">{rev.name}</h4>
                <span className="text-[11px] text-slate-500 block">{rev.city}</span>
              </div>
              <span className="text-[10px] font-bold text-[#c85a17] bg-amber-50 px-2 py-1 rounded border border-amber-200">
                {rev.report}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
