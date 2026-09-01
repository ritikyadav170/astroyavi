"use client";

import { ArrowRight, Share2, Star } from "lucide-react";
import { recommendedAstrologers } from "../horoscopeApi";

export function RecommendedAstrologers() {
  return (
    <>
      {/* Share Horoscope Report Banner */}
      <div className="mt-12 flex items-center justify-between gap-4 rounded-[18px] border border-[#d7d3ca] bg-[#f4f2ee] p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#d7d3ca] bg-[#f7f5f3] text-[#2d1a0e]">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[#2d1a0e]">
              Share Horoscope Report
            </p>
            <p className="text-sm text-[#5d4637]">
              Share your personalized Horoscope instantly with family and
              friends
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-[#1f5b4c] bg-[#1f5b4c] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#194e42]"
        >
          Share Horoscope Report
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Recommended Astrologers Section */}
      <div className="mt-16">
        <div className="relative mb-8 text-center">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#d8d0c3]" />
          <span className="relative inline-block bg-[#f8f7f4] px-5 text-lg font-semibold tracking-wide text-[#2d1a0e]">
            Recommended Astrologers
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          {recommendedAstrologers.map((astro) => (
            <div
              key={astro.name}
              className="rounded-[20px] border border-[#d9c7a1] bg-[#f8f5f1] p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            >
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <img
                    src={astro.image}
                    alt={astro.name}
                    className="h-[84px] w-[84px] rounded-full border-[3px] border-[#1f5b4c] object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#1f5b4c] text-[10px] text-white">
                    ✓
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-[1.9rem] font-semibold leading-tight text-[#2d1a0e]">
                  {astro.name}
                </h4>
                <p className="mt-1 text-sm text-[#4a3020]">{astro.title}</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-[#e7a11c]">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={`${astro.name}-${index}`}
                      className="h-4 w-4 fill-current"
                    />
                  ))}
                </div>
                <div className="mt-3 text-sm text-[#1f5b4c]">
                  <span className="font-semibold">{astro.price}</span>
                  <span className="mx-2 text-[#2d1a0e]">₹30/min</span>
                </div>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1f5b4c] bg-white text-[#1f5b4c]"
                    aria-label={`Call ${astro.name}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.35 2.3.54 3.5.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.19 2.4.54 3.5a1 1 0 0 1-.24 1l-2.2 2.3Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1f5b4c] bg-white text-[#1f5b4c]"
                    aria-label={`Chat with ${astro.name}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v8A2.5 2.5 0 0 1 17.5 15H9l-5 5v-5.5A2.5 2.5 0 0 1 4 12.5v-8Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-[#1f5b4c] px-6 py-3 text-sm font-semibold text-[#1f5b4c] transition hover:bg-[#1f5b4c] hover:text-white"
          >
            View All Astrologers <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
