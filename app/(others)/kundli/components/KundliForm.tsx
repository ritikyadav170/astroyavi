"use client";

import React from "react";
import { RefreshCw } from "lucide-react";
import { KundliFormData } from "../kundliApi";

interface KundliFormProps {
  formData: KundliFormData;
  setFormData: React.Dispatch<React.SetStateAction<KundliFormData>>;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export function KundliForm({
  formData,
  setFormData,
  handleSubmit,
  loading,
}: KundliFormProps) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10 max-w-4xl">
        <div className="flex items-center gap-3 text-[#c87638] mb-2">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest">
            Create Free Kundli
          </span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] tracking-tight mb-4">
          Generate Your Free Kundli in Seconds
        </h1>

        <p className="text-sm sm:text-base text-[#5c4033] leading-relaxed max-w-2xl font-sans">
          Generate your free Vedic Kundli instantly using your birth details and
          receive accurate insights into your personality, career, marriage,
          health, and future.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-3xl bg-white border border-[#e6c896] rounded-3xl p-6 sm:p-10 shadow-sm mb-16 relative">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#801c10] text-center mb-8 tracking-tight">
          Generate Your Free Kundli in Seconds
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#3c2415] block">
                Full name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full bg-white border border-slate-300 rounded-full py-3 px-5 text-sm text-[#2b1810] placeholder:text-slate-400 focus:outline-none focus:border-[#1b4327] focus:ring-1 focus:ring-[#1b4327] shadow-2xs"
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#3c2415] block">
                Date of Birth
              </label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                className="w-full bg-white border border-slate-300 rounded-full py-3 px-5 text-sm text-[#2b1810] focus:outline-none focus:border-[#1b4327] focus:ring-1 focus:ring-[#1b4327] shadow-2xs"
              />
            </div>

            {/* Time of Birth */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#3c2415] block">
                Time of Birth
              </label>
              <input
                type="time"
                required
                value={formData.timeOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, timeOfBirth: e.target.value })
                }
                className="w-full bg-white border border-slate-300 rounded-full py-3 px-5 text-sm text-[#2b1810] focus:outline-none focus:border-[#1b4327] focus:ring-1 focus:ring-[#1b4327] shadow-2xs"
              />
            </div>

            {/* Place of Birth */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#3c2415] block">
                Place of Birth
              </label>
              <input
                type="text"
                required
                placeholder="Enter birth city (e.g. Delhi)"
                value={formData.placeOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, placeOfBirth: e.target.value })
                }
                className="w-full bg-white border border-slate-300 rounded-full py-3 px-5 text-sm text-[#2b1810] placeholder:text-slate-400 focus:outline-none focus:border-[#1b4327] focus:ring-1 focus:ring-[#1b4327] shadow-2xs"
              />
            </div>

            {/* Select Gender */}
            <div className="space-y-2 md:col-span-2 max-w-md mx-auto w-full">
              <label className="text-xs font-semibold text-[#3c2415] block text-left">
                Select Gender
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 rounded-full py-3 px-5 text-sm text-[#2b1810] focus:outline-none focus:border-[#1b4327] focus:ring-1 focus:ring-[#1b4327] shadow-2xs appearance-none cursor-pointer pr-10"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-md bg-[#1b4327] hover:bg-[#13321d] text-white font-bold py-3.5 px-8 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-80 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Generating Kundli Report...</span>
                </>
              ) : (
                <span>Show Kundli</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
