"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Share2,
  Star,
  Phone,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { RadarChart } from "./RadarChart";
import {
  profileCards,
  recommendedAstrologers,
  reportText,
} from "../matchMakingApi";

interface MatchMakingReportViewProps {
  onReset: () => void;
}

export function MatchMakingReportView({
  onReset,
}: MatchMakingReportViewProps) {
  const [shareCopied, setShareCopied] = useState(false);

  const handleShare = () => {
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <div className="mt-10 rounded-[18px] border border-[#e2d6bc] bg-[#f6f3ee] p-5 shadow-[0_1px_0_rgba(72,51,29,0.03)]">
      <div className="flex flex-col items-center justify-center">
        {/* Selected Profile Avatars Header */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {profileCards.map((profile) => (
            <div
              key={profile.id}
              className="flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-full border-[3px] border-[#d8d0c2] bg-white object-cover"
            >
              <img
                src={profile.image}
                alt={profile.label}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Interactive Compatibility Radar Chart */}
        <div className="mt-8 flex items-center justify-center">
          <RadarChart />
        </div>

        {/* Vedic Guna Milan Score */}
        <div className="mt-4 text-center">
          <h2 className="text-3xl font-bold text-[#2d1a0e]">
            Vedic Guna Milan Report
          </h2>
          <p className="mt-2 text-[32px] font-bold text-[#1c5b49]">20/36</p>
        </div>

        {/* Detailed Analysis Text Sections */}
        <div className="mt-10 w-full max-w-[1100px] text-left">
          <h3 className="text-[18px] font-bold text-[#2d1a0e]">Report</h3>
          <p className="mt-4 text-[15px] leading-8 text-[#4d382f]">
            {reportText}
          </p>

          <h3 className="mt-8 text-[18px] font-bold text-[#2d1a0e]">
            Relations
          </h3>
          <p className="mt-4 text-[15px] leading-8 text-[#4d382f]">
            {reportText}
          </p>
        </div>

        {/* Share Match Making Report Card */}
        <div className="mt-12 w-full rounded-[18px] border border-[#e0cab0] bg-[#f3f0ec] p-4 sm:p-5">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d9d1c4] bg-[#f5f1ea] text-[#2d1a0e]">
                <Share2 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-[#2d1a0e]">
                  Share Match Making Report
                </h4>
                <p className="text-sm text-[#5d4637]">
                  Share your personalized Kundli matching report instantly with
                  family and friends.
                </p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="rounded-full bg-[#1c5b49] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174d42] cursor-pointer"
            >
              {shareCopied ? "Link Copied!" : "Share Match Making Report"}
            </button>
          </div>
        </div>

        {/* Calculate Another Match Button */}
        <div className="mt-8">
          <button
            onClick={onReset}
            className="rounded-full border border-[#1c5b49] px-6 py-2.5 text-xs font-bold text-[#1c5b49] hover:bg-[#1c5b49] hover:text-white transition-all cursor-pointer"
          >
            ← Calculate Another Match
          </button>
        </div>

        {/* Recommended Astrologers Section */}
        <div className="mt-14 w-full">
          <div className="relative mb-8 text-center">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#d8d0c2]" />
            <span className="relative inline-block bg-[#f6f3ee] px-5 text-lg font-semibold text-[#2d1a0e]">
              Recommended Astrologer
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {recommendedAstrologers.map((astro) => (
              <div
                key={astro.name}
                className="rounded-[20px] border border-[#e4d6b3] bg-[#f9f6f2] p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)] flex flex-col items-center"
              >
                <div className="mb-3 flex justify-center">
                  <img
                    src={astro.image}
                    alt={astro.name}
                    className="h-[84px] w-[84px] rounded-full border-[3px] border-[#1c5b49] object-cover"
                  />
                </div>
                <div className="text-center w-full">
                  <h4 className="text-[18px] font-semibold text-[#2d1a0e]">
                    {astro.name}
                  </h4>
                  <p className="mt-1 text-sm text-[#4d382f] truncate">
                    {astro.title}
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-1 text-[#e4a61a]">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={`${astro.name}-${index}`}
                        className="h-4 w-4 fill-current"
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#1c5b49]">
                    {astro.fee}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      aria-label={`Call ${astro.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1c5b49] bg-white text-[#1c5b49] hover:bg-[#1c5b49] hover:text-white transition-colors cursor-pointer"
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                    <button
                      aria-label={`Message ${astro.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1c5b49] bg-white text-[#1c5b49] hover:bg-[#1c5b49] hover:text-white transition-colors cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/talk-to-astrologer"
              className="inline-flex items-center justify-center rounded-full border border-[#1c5b49] px-6 py-3 text-sm font-semibold text-[#1c5b49] transition hover:bg-[#1c5b49] hover:text-white"
            >
              View All Astrologers <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
