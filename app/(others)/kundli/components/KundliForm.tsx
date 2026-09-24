"use client";

import React, { useState } from "react";
import { RefreshCw, MapPin, User, Calendar, Clock, Navigation, Sparkles } from "lucide-react";
import { KundliFormData } from "../kundliApi";
import { LocationPickerModal } from "../../panchang/components/LocationPickerModal";

interface KundliFormProps {
  formData: KundliFormData;
  setFormData: React.Dispatch<React.SetStateAction<KundliFormData>>;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const PRESET_CITIES = [
  "Delhi, India",
  "Noida, India",
  "Varanasi, India",
  "Mumbai, India",
  "Jaipur, India",
  "Bangalore, India",
];

export function KundliForm({
  formData,
  setFormData,
  handleSubmit,
  loading,
}: KundliFormProps) {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleLocationSelect = (placeName: string, lat?: number, lon?: number) => {
    setFormData((prev) => ({
      ...prev,
      placeOfBirth: placeName,
      lat,
      lon,
    }));
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10 max-w-4xl">
        <div className="flex items-center gap-3 text-[#c87638] mb-2">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c87638]" />
            FREE VEDIC KUNDLI
          </span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] tracking-tight mb-4">
          Generate Your Free Kundli in Seconds
        </h1>

        <p className="text-sm sm:text-base text-[#5c4033] leading-relaxed max-w-2xl font-sans">
          Generate your accurate Vedic Janam Kundli instantly using your birth details and
          receive deep insights into your Lagna, Navamsha, Planetary Positions, Mahadasha, Doshas, and Remedies.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-3xl bg-white border border-[#e6c896] rounded-3xl p-6 sm:p-10 shadow-sm mb-16 relative">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#801c10] text-center mb-8 tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span>Enter Birth Details</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3c2415] uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full bg-white border border-[#e6c896] rounded-xl py-3 pl-10 pr-4 text-sm font-semibold text-[#2b1810] placeholder:text-slate-400 focus:outline-none focus:border-[#1b4327] focus:ring-2 focus:ring-[#1b4327]/20 shadow-2xs"
                />
                <User className="w-4 h-4 text-[#c87638] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Select Gender */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3c2415] uppercase tracking-wider block">
                Gender
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full bg-white border border-[#e6c896] rounded-xl py-3 px-4 text-sm font-semibold text-[#2b1810] focus:outline-none focus:border-[#1b4327] focus:ring-2 focus:ring-[#1b4327]/20 shadow-2xs appearance-none cursor-pointer pr-10"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#c87638] text-xs font-bold">
                  ▼
                </div>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3c2415] uppercase tracking-wider block">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  className="w-full bg-white border border-[#e6c896] rounded-xl py-3 px-4 text-sm font-semibold text-[#2b1810] focus:outline-none focus:border-[#1b4327] focus:ring-2 focus:ring-[#1b4327]/20 shadow-2xs cursor-pointer"
                />
              </div>
            </div>

            {/* Time of Birth */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3c2415] uppercase tracking-wider block">
                Time of Birth
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={formData.timeOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, timeOfBirth: e.target.value })
                  }
                  className="w-full bg-white border border-[#e6c896] rounded-xl py-3 px-4 text-sm font-semibold text-[#2b1810] focus:outline-none focus:border-[#1b4327] focus:ring-2 focus:ring-[#1b4327]/20 shadow-2xs cursor-pointer"
                />
              </div>
            </div>

            {/* Place of Birth with Google Map Picker */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#3c2415] uppercase tracking-wider block">
                  Birth Place / City
                </label>
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  className="text-xs font-bold text-[#801c10] hover:text-[#1b4327] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#c87638]" />
                  <span>Choose on Map / GPS</span>
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  placeholder="Enter birth city (e.g. Delhi, Varanasi, Mumbai)"
                  value={formData.placeOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, placeOfBirth: e.target.value })
                  }
                  className="w-full bg-white border border-[#e6c896] rounded-xl py-3 pl-4 pr-12 text-sm font-semibold text-[#2b1810] placeholder:text-slate-400 focus:outline-none focus:border-[#1b4327] focus:ring-2 focus:ring-[#1b4327]/20 shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  title="Choose location on Google Map"
                  className="absolute right-2 p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-[#801c10] hover:text-[#1b4327] transition-all cursor-pointer group shadow-2xs"
                >
                  <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform text-[#801c10]" />
                </button>
              </div>

              {/* Popular City Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-xs font-semibold text-[#8c6d58] mr-1">Popular:</span>
                {PRESET_CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setFormData({ ...formData, placeOfBirth: city })}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                      formData.placeOfBirth.toLowerCase().includes(city.split(",")[0].toLowerCase())
                        ? "bg-[#1b4327] text-white font-bold"
                        : "bg-amber-50 hover:bg-amber-100 text-[#5c4033] border border-amber-200"
                    }`}
                  >
                    {city.split(",")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-md bg-[#1b4327] hover:bg-[#13321d] text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-80 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-amber-300" />
                  <span>Calculating Vedic Kundli...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Generate Free Kundli Report</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Location Picker Map Modal */}
      <LocationPickerModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        currentPlace={formData.placeOfBirth || "Delhi, India"}
        onSelectLocation={handleLocationSelect}
      />
    </>
  );
}
