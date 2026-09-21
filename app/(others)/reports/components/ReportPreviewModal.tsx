"use client";

import React from "react";
import {
  X,
  FileText,
  Download,
  Star,
  CheckCircle2,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { AstrologyReportItem } from "../types";
import Link from "next/link";

interface ReportPreviewModalProps {
  report: AstrologyReportItem | null;
  onClose: () => void;
}

export function ReportPreviewModal({ report, onClose }: ReportPreviewModalProps) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#fdfaf3] rounded-3xl shadow-2xl border border-amber-300 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#2d1a0e] via-[#432414] to-[#2d1a0e] text-white border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 block">
                Sample Report Preview
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white line-clamp-1">
                {report.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Preview Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800 text-sm">
          {/* Cover Simulation Header */}
          <div className="p-6 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1.5">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-[#c85a17] border border-amber-300">
                Official Vedic Astroyavi Document
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#2d1a0e]">
                {report.title}
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                Prepared for: Rahul Sharma • DOB: 15 Aug 1998 • New Delhi, India
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-semibold text-emerald-700">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Certified Calculations
                </span>
                <span>•</span>
                <span>{report.pages} Deep Study</span>
              </div>
            </div>

            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1b2b48] to-[#131b3e] text-amber-300 border-2 border-amber-400 p-2 flex flex-col items-center justify-center shadow-md shrink-0">
              <span className="text-xs font-serif font-bold">Lagna</span>
              <span className="text-xl font-bold">सिंह</span>
              <span className="text-[10px] text-slate-300">Leo Ascendant</span>
            </div>
          </div>

          {/* Sample Sections Breakdown */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-base text-[#2d1a0e] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#c85a17]" />
              <span>What&apos;s Inside This Comprehensive Report:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.features.map((feat, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-800">{feat}</span>
                </div>
              ))}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-800">Complete 12-Year Vimshottari Mahadasha Timeline</span>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-800">Astrologer Verified Custom Gemstone & Rudraksha Advice</span>
              </div>
            </div>
          </div>

          {/* Sample Chart Table Simulation */}
          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 overflow-x-auto">
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-800">
              <span>Sample Planetary Positions (Lagna D-1 Chart)</span>
              <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Lahiri Ayanamsha</span>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-amber-100/50 text-slate-700 border-b border-amber-200">
                  <th className="p-2 font-bold">Planet</th>
                  <th className="p-2 font-bold">Sign (Rashi)</th>
                  <th className="p-2 font-bold">Degree</th>
                  <th className="p-2 font-bold">Nakshatra</th>
                  <th className="p-2 font-bold">House</th>
                  <th className="p-2 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2 font-semibold">Sun (सूर्य)</td>
                  <td className="p-2">Leo (सिंह)</td>
                  <td className="p-2">12° 24&apos;</td>
                  <td className="p-2">Magha (1)</td>
                  <td className="p-2">1st House</td>
                  <td className="p-2 text-emerald-700 font-bold">Own Sign</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Moon (चन्द्र)</td>
                  <td className="p-2">Taurus (वृषभ)</td>
                  <td className="p-2">03° 10&apos;</td>
                  <td className="p-2">Krittika (2)</td>
                  <td className="p-2">10th House</td>
                  <td className="p-2 text-emerald-700 font-bold">Exalted</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Jupiter (गुरु)</td>
                  <td className="p-2">Pisces (मीन)</td>
                  <td className="p-2">24° 50&apos;</td>
                  <td className="p-2">Revati (3)</td>
                  <td className="p-2">8th House</td>
                  <td className="p-2 text-emerald-700 font-bold">Own House</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 bg-white border-t border-amber-200/80">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Ready to get your personalized report instantly?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              Close
            </button>
            <Link
              href={report.href}
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#c85a17] hover:bg-[#a9480e] text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Get Full Report</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
