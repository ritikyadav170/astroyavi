"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Share2,
  Check,
  Download,
  Star,
  MessageSquare,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Heart,
  Brain,
  Coins,
  Users,
  Flame,
  User,
} from "lucide-react";
import { RadarChart } from "./RadarChart";
import { MatchMakingResult } from "../matchMaking";
import { Astrologer, getAstrologers } from "../../talk-to-astrologer/talkToAstrologer";
import { AstrologerDetailModal } from "../../talk-to-astrologer/components/AstrologerDetailModal";
import { formatImageUrl } from "@/lib/utils";

interface MatchMakingReportViewProps {
  result: MatchMakingResult;
  onReset: () => void;
}

export function MatchMakingReportView({
  result,
  onReset,
}: MatchMakingReportViewProps) {
  const [shareCopied, setShareCopied] = useState(false);
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [selectedAstrologer, setSelectedAstrologer] = useState<Astrologer | null>(null);

  useEffect(() => {
    getAstrologers()
      .then((data) => {
        if (data && data.length > 0) {
          setAstrologers(data.slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const handleExport = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const {
    score,
    maxScore,
    percentage,
    conclusion,
    recommendation,
    boyDetails,
    girlDetails,
    boyAstro,
    girlAstro,
    ashtakoot,
    radarData,
    doshaAnalysis,
    detailedInsights,
  } = result;

  const kootList = [
    ashtakoot.varna,
    ashtakoot.vashya,
    ashtakoot.tara,
    ashtakoot.yoni,
    ashtakoot.maitri,
    ashtakoot.gan,
    ashtakoot.bhakoot,
    ashtakoot.nadi,
  ];

  const isApproved = score >= 18;

  return (
    <div className="mt-8 space-y-8 animate-in fade-in duration-300 print:m-0 print:space-y-4">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between border-b border-[#e2d6bc] pb-4 print:hidden">
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-[#1c5b49] bg-white px-5 py-2 text-xs font-bold text-[#1c5b49] hover:bg-[#1c5b49] hover:text-white transition-all cursor-pointer shadow-2xs"
        >
          ← Recalculate with New Details
        </button>

        <div className="flex items-center gap-2.5">
          {/* Export / Download PDF */}
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-full bg-[#801c10] px-4 py-2 text-xs font-bold text-white hover:bg-[#63140b] transition-all cursor-pointer shadow-xs"
          >
            <Download className="h-3.5 w-3.5 text-amber-300" />
            <span>Export Report (PDF)</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-full bg-[#1c5b49] px-4 py-2 text-xs font-bold text-white hover:bg-[#174d42] transition-all cursor-pointer shadow-xs"
          >
            {shareCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-amber-300" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5 text-amber-300" />
                <span>Share Match</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="rounded-[24px] border border-[#e2c99a] bg-white p-6 sm:p-8 shadow-sm text-center relative overflow-hidden">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="flex items-center gap-3 text-[#c87638]">
            <div className="h-[1px] w-12 bg-[#c87638]"></div>
            <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c87638]" />
              VEDIC GUNA MILAN REPORT
            </span>
            <div className="h-[1px] w-12 bg-[#c87638]"></div>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#801c10]">
            {boyDetails.fullName} &amp; {girlDetails.fullName}
          </h2>

          <div className="flex items-baseline justify-center gap-2 pt-2">
            <span className="font-serif text-5xl sm:text-6xl font-black text-[#1c5b49]">
              {score}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#6b4d3c]">
              / {maxScore} Points ({percentage}%)
            </span>
          </div>

          {/* Status Badge */}
          <div className="pt-2">
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border ${
                isApproved
                  ? "bg-green-100 text-green-900 border-green-300"
                  : "bg-red-100 text-red-900 border-red-300"
              }`}
            >
              {isApproved ? (
                <ShieldCheck className="w-4 h-4 text-green-700" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-700" />
              )}
              <span>{recommendation} Compatibility ({isApproved ? "Approved for Marriage" : "Remedies Suggested"})</span>
            </span>
          </div>

          <p className="max-w-2xl text-xs sm:text-sm text-[#5c4033] leading-relaxed pt-2">
            {conclusion}
          </p>
        </div>

        {/* Partner Astrology Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-amber-100 text-left text-xs">
          {/* Boy Info */}
          <div className="p-4 rounded-2xl bg-[#f7f6f4] border border-[#e2d6bc] space-y-2">
            <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
              <span className="font-bold text-[#1c5b49] text-sm flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#1c5b49]" />
                {boyDetails.fullName} (Groom)
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${boyAstro.isManglik ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"}`}>
                {boyAstro.isManglik ? "Manglik" : "Non-Manglik"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[#4d382f]">
              <div><strong>Rashi:</strong> {boyAstro.sign} ({boyAstro.signLord})</div>
              <div><strong>Nakshatra:</strong> {boyAstro.nakshatra} ({boyAstro.charan})</div>
              <div><strong>Gana:</strong> {boyAstro.gan}</div>
              <div><strong>Nadi:</strong> {boyAstro.nadi}</div>
              <div><strong>Yoni:</strong> {boyAstro.yoni}</div>
              <div><strong>Varna:</strong> {boyAstro.varna}</div>
            </div>
          </div>

          {/* Girl Info */}
          <div className="p-4 rounded-2xl bg-[#f7f6f4] border border-[#e2d6bc] space-y-2">
            <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
              <span className="font-bold text-rose-800 text-sm flex items-center gap-1.5">
                <User className="w-4 h-4 text-rose-700" />
                {girlDetails.fullName} (Bride)
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${girlAstro.isManglik ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"}`}>
                {girlAstro.isManglik ? "Manglik" : "Non-Manglik"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[#4d382f]">
              <div><strong>Rashi:</strong> {girlAstro.sign} ({girlAstro.signLord})</div>
              <div><strong>Nakshatra:</strong> {girlAstro.nakshatra} ({girlAstro.charan})</div>
              <div><strong>Gana:</strong> {girlAstro.gan}</div>
              <div><strong>Nadi:</strong> {girlAstro.nadi}</div>
              <div><strong>Yoni:</strong> {girlAstro.yoni}</div>
              <div><strong>Varna:</strong> {girlAstro.varna}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ashtakoot 8-Kuta Table & Radar Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 8 Kutas Breakdown Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#e2c99a] shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#801c10] border-b border-amber-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-[#c87638]" />
            Ashtakoot Guna Milan Breakdown (अष्टकूट मिलान)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-amber-100/70 text-[#801c10] font-bold border-b border-amber-300">
                  <th className="p-3 rounded-l-xl">Kuta (कूट)</th>
                  <th className="p-3">Groom</th>
                  <th className="p-3">Bride</th>
                  <th className="p-3">Score</th>
                  <th className="p-3 rounded-r-xl">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {kootList.map((koot, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                    <td className="p-3 font-bold text-[#2b1810]">
                      <div>{koot.name}</div>
                      <div className="text-[10px] text-[#6b4d3c] font-normal">{koot.hindiName}</div>
                    </td>
                    <td className="p-3 text-[#4d382f]">{koot.boyAttribute || "--"}</td>
                    <td className="p-3 text-[#4d382f]">{koot.girlAttribute || "--"}</td>
                    <td className="p-3 font-mono font-bold text-[#1c5b49]">
                      {koot.receivedPoints} / {koot.maxPoints}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          koot.status === "Auspicious"
                            ? "bg-green-100 text-green-800 border-green-300"
                            : koot.status === "Average"
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : "bg-red-100 text-red-800 border-red-300"
                        }`}
                      >
                        {koot.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Dynamic Compatibility Radar Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#e2c99a] shadow-sm flex flex-col items-center justify-between space-y-4">
          <div className="w-full text-center border-b border-amber-100 pb-3">
            <h3 className="font-serif text-xl font-bold text-[#801c10]">
              Compatibility Radar
            </h3>
            <p className="text-xs text-[#6b4d3c] mt-0.5">
              Multi-dimensional Vedic harmony chart
            </p>
          </div>

          <RadarChart labels={radarData.labels} values={radarData.values} />

          <p className="text-xs text-center text-[#5c4033] bg-amber-50 p-3 rounded-xl border border-amber-200">
            A score above 18/36 indicates favorable Vedic astrological alignment for marriage.
          </p>
        </div>
      </div>

      {/* Dosha Analysis & Life Domains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dosha Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2c99a] shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#801c10] border-b border-amber-100 pb-3 flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600" />
            Special Dosha Compatibility
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
              <strong className="text-[#801c10] block text-sm">Manglik Dosha Match:</strong>
              <p className="text-[#4d382f] leading-relaxed">{doshaAnalysis.manglikMatch}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-[#801c10] text-sm">Nadi Dosha:</strong>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${doshaAnalysis.nadiDosha.present ? "bg-red-100 text-red-800 border-red-300" : "bg-green-100 text-green-800 border-green-300"}`}>
                  {doshaAnalysis.nadiDosha.present ? "Dosha Present" : "No Dosha"}
                </span>
              </div>
              <p className="text-[#4d382f]">{doshaAnalysis.nadiDosha.remedy}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-[#801c10] text-sm">Bhakoot Dosha:</strong>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${doshaAnalysis.bhakootDosha.present ? "bg-red-100 text-red-800 border-red-300" : "bg-green-100 text-green-800 border-green-300"}`}>
                  {doshaAnalysis.bhakootDosha.present ? "Dosha Present" : "No Dosha"}
                </span>
              </div>
              <p className="text-[#4d382f]">{doshaAnalysis.bhakootDosha.remedy}</p>
            </div>
          </div>
        </div>

        {/* Life Domain Compatibility Insights */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2c99a] shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#801c10] border-b border-amber-100 pb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600" />
            Life Domain Compatibility
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200">
              <strong className="text-blue-900 block mb-0.5 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-blue-700" />
                Mental &amp; Intellectual Rapport
              </strong>
              <p className="text-[#4d382f] leading-relaxed">{detailedInsights.mental}</p>
            </div>

            <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200">
              <strong className="text-rose-900 block mb-0.5 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-700" />
                Physical &amp; Intimacy Harmony
              </strong>
              <p className="text-[#4d382f] leading-relaxed">{detailedInsights.physical}</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <strong className="text-emerald-900 block mb-0.5 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-emerald-700" />
                Financial Growth &amp; Fortune
              </strong>
              <p className="text-[#4d382f] leading-relaxed">{detailedInsights.financial}</p>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200">
              <strong className="text-purple-900 block mb-0.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-700" />
                Family Life &amp; Social Blending
              </strong>
              <p className="text-[#4d382f] leading-relaxed">{detailedInsights.family}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Recommended Astrologers Section */}
      <div className="pt-6 border-t border-[#e2d6bc] print:hidden">
        <div className="relative mb-8 text-center">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#d8d0c2]" />
          <span className="relative inline-block bg-[#f6f5f1] px-5 text-base font-bold text-[#2d1a0e] uppercase tracking-wider">
            Consult Match Making Astrologers
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {astrologers.map((astro, idx) => {
            const imgUrl = formatImageUrl(astro.profileImage || astro.image);
            return (
              <div
                key={astro.id || astro._id || idx}
                onClick={() => setSelectedAstrologer(astro)}
                className="rounded-3xl border border-[#e4d6b3] bg-white p-5 shadow-2xs hover:shadow-lg hover:border-[#1c5b49] transition-all cursor-pointer flex flex-col items-center text-center group"
              >
                <div className="mb-3 relative">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={astro.name}
                      className="h-16 w-16 rounded-full border-2 border-[#1c5b49] object-cover shadow-xs group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-[#1c5b49] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {astro.initials || "AS"}
                    </div>
                  )}
                </div>

                <h4 className="text-sm font-bold text-[#2d1a0e] group-hover:text-[#1c5b49] transition-colors line-clamp-1">
                  {astro.name}
                </h4>
                <p className="text-[11px] text-[#5c4033] min-h-[28px] line-clamp-2 mt-0.5 leading-tight">
                  {astro.specialty}
                </p>

                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold my-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{astro.rating}</span>
                </div>

                <div className="text-xs font-bold text-[#2b1810] mb-3">
                  ₹{astro.price}/min
                </div>

                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-full bg-[#1c5b49] hover:bg-[#13321d] text-amber-200 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs mt-auto cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                  <span>Chat Now</span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/talk-to-astrologer"
            className="inline-flex items-center justify-center rounded-full border border-[#1c5b49] bg-white px-7 py-3 text-xs font-bold text-[#1c5b49] transition hover:bg-[#1c5b49] hover:text-white shadow-xs"
          >
            View All Astrologers <ChevronRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      </div>

      {selectedAstrologer && (
        <AstrologerDetailModal
          astrologerId={selectedAstrologer.id || selectedAstrologer._id || null}
          initialAstrologer={selectedAstrologer}
          onClose={() => setSelectedAstrologer(null)}
        />
      )}
    </div>
  );
}
