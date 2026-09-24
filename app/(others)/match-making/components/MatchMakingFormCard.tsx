"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Sparkles, RefreshCw, UserCheck } from "lucide-react";
import { ProfileDetails, SavedMatchProfile, getSavedMatchProfiles } from "../matchMaking";
import { LocationPickerModal } from "../../panchang/components/LocationPickerModal";

interface MatchMakingFormCardProps {
  boyDetails: ProfileDetails;
  setBoyDetails: React.Dispatch<React.SetStateAction<ProfileDetails>>;
  girlDetails: ProfileDetails;
  setGirlDetails: React.Dispatch<React.SetStateAction<ProfileDetails>>;
  isReportReady: boolean;
  onGetReport: () => void;
  loading: boolean;
}

export function MatchMakingFormCard({
  boyDetails,
  setBoyDetails,
  girlDetails,
  setGirlDetails,
  isReportReady,
  onGetReport,
  loading,
}: MatchMakingFormCardProps) {
  const [savedProfiles, setSavedProfiles] = useState<SavedMatchProfile[]>([]);
  const [activeLocationTarget, setActiveLocationTarget] = useState<"boy" | "girl" | null>(null);

  useEffect(() => {
    getSavedMatchProfiles().then((data) => {
      if (data && data.length > 0) {
        setSavedProfiles(data.slice(0, 5));
      }
    });
  }, []);

  const handleLocationSelect = (placeName: string, lat?: number, lon?: number) => {
    if (activeLocationTarget === "boy") {
      setBoyDetails((prev) => ({
        ...prev,
        placeOfBirth: placeName,
        lat,
        lon,
      }));
    } else if (activeLocationTarget === "girl") {
      setGirlDetails((prev) => ({
        ...prev,
        placeOfBirth: placeName,
        lat,
        lon,
      }));
    }
  };

  const handleSelectSavedProfile = (profile: SavedMatchProfile) => {
    const u1 = profile.user1 || {};
    const u2 = profile.user2 || {};

    if (u1.fullName || u1.day) {
      setBoyDetails({
        fullName: u1.fullName || "",
        dateOfBirth: u1.year && u1.month && u1.day ? `${u1.year}-${String(u1.month).padStart(2, "0")}-${String(u1.day).padStart(2, "0")}` : "",
        timeOfBirth: u1.hour !== undefined && u1.min !== undefined ? `${String(u1.hour).padStart(2, "0")}:${String(u1.min).padStart(2, "0")}` : "12:00",
        placeOfBirth: u1.place || "Delhi, India",
      });
    }

    if (u2.fullName || u2.day) {
      setGirlDetails({
        fullName: u2.fullName || "",
        dateOfBirth: u2.year && u2.month && u2.day ? `${u2.year}-${String(u2.month).padStart(2, "0")}-${String(u2.day).padStart(2, "0")}` : "",
        timeOfBirth: u2.hour !== undefined && u2.min !== undefined ? `${String(u2.hour).padStart(2, "0")}:${String(u2.min).padStart(2, "0")}` : "12:00",
        placeOfBirth: u2.place || "Delhi, India",
      });
    }
  };

  return (
    <>
      <div className="mt-10 rounded-[24px] border border-[#e2c99a] bg-[#f6f3ee] p-5 shadow-[0_1px_0_rgba(72,51,29,0.03)] sm:p-6">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.25fr]">
          {/* Previous Reports / Profiles List */}
          <div className="space-y-4 rounded-[18px] border border-[#e2d6bc] bg-[#f2efe9] p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-[17px] font-semibold text-[#2d1a0e] flex items-center gap-2 border-b border-amber-200/70 pb-2.5 mb-3">
                <UserCheck className="w-4.5 h-4.5 text-[#1c5b49]" />
                Previous Match Making Profiles
              </h3>

              {savedProfiles.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#6b4d3c] bg-white/60 rounded-xl border border-[#e2d6bc]/70">
                  <p className="font-semibold mb-1">No previous match profiles found.</p>
                  <p className="text-[11px] text-[#8c6d58]">Enter birth details on the right to calculate instant compatibility and auto-save.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {savedProfiles.map((p, idx) => {
                    const boyName = p.user1?.fullName || "Boy";
                    const girlName = p.user2?.fullName || "Girl";
                    const initials = `${boyName.charAt(0)}${girlName.charAt(0)}`.toUpperCase();

                    return (
                      <div
                        key={p._id || idx}
                        onClick={() => handleSelectSavedProfile(p)}
                        className="flex items-center justify-between gap-3 rounded-xl border border-amber-200/80 bg-white/80 p-2.5 hover:bg-amber-50/90 transition-all cursor-pointer shadow-2xs group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold bg-[#1c5b49] text-white">
                            {initials || "MP"}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#2d1a0e] group-hover:text-[#1c5b49] transition-colors line-clamp-1">
                              {boyName} &amp; {girlName}
                            </p>
                            <p className="text-[11px] text-[#6b4d3c]">
                              {p.user1?.place || "Vedic Match"}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectSavedProfile(p);
                          }}
                          className="rounded-full border border-[#1c5b49] bg-[#1c5b49] px-2.5 py-1 text-[11px] font-bold text-white shadow-2xs hover:bg-[#174d42] cursor-pointer"
                        >
                          Load
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-3 bg-amber-100/50 rounded-xl border border-amber-200/80 text-[11px] text-[#5c4033] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#801c10] shrink-0" />
              <span>Gun Milan uses all 8 Vedic Kutas (36 points) for accurate match analysis.</span>
            </div>
          </div>

          {/* Input Details Form */}
          <div className="rounded-[18px] border border-[#e2d6bc] bg-[#f7f6f4] p-5 sm:p-6 shadow-2xs">
            <h3 className="mb-5 text-xl font-serif font-bold text-[#801c10] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#c87638]" />
              Enter Partner Details
            </h3>

            <div className="space-y-6">
              {/* Boy Details */}
              <div className="p-4 rounded-2xl bg-white border border-[#e2d6bc] shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                  <h4 className="text-sm font-bold text-[#1c5b49] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1c5b49]"></span>
                    Boy (वर) Details
                  </h4>
                  <button
                    type="button"
                    onClick={() => setActiveLocationTarget("boy")}
                    className="text-[11px] font-bold text-[#801c10] hover:text-[#1c5b49] flex items-center gap-1 cursor-pointer"
                  >
                    <Navigation className="w-3 h-3 text-[#c87638]" />
                    <span>Map / GPS</span>
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#4d382f]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter boy's full name"
                      value={boyDetails.fullName}
                      onChange={(e) =>
                        setBoyDetails({ ...boyDetails, fullName: e.target.value })
                      }
                      className="h-10 w-full rounded-xl border border-[#d9d1c4] bg-[#fdfbf9] px-3 text-xs font-semibold text-[#2d1a0e] outline-none focus:border-[#1c5b49] focus:ring-1 focus:ring-[#1c5b49]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#4d382f]">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      required
                      value={boyDetails.dateOfBirth}
                      onChange={(e) =>
                        setBoyDetails({
                          ...boyDetails,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className="h-10 w-full rounded-xl border border-[#d9d1c4] bg-[#fdfbf9] px-3 text-xs font-semibold text-[#2d1a0e] outline-none focus:border-[#1c5b49] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#4d382f]">
                      Time of Birth
                    </label>
                    <input
                      type="time"
                      required
                      value={boyDetails.timeOfBirth}
                      onChange={(e) =>
                        setBoyDetails({
                          ...boyDetails,
                          timeOfBirth: e.target.value,
                        })
                      }
                      className="h-10 w-full rounded-xl border border-[#d9d1c4] bg-[#fdfbf9] px-3 text-xs font-semibold text-[#2d1a0e] outline-none focus:border-[#1c5b49] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#4d382f]">
                      Place of Birth
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        required
                        placeholder="Enter birth city"
                        value={boyDetails.placeOfBirth}
                        onChange={(e) =>
                          setBoyDetails({
                            ...boyDetails,
                            placeOfBirth: e.target.value,
                          })
                        }
                        className="h-10 w-full rounded-xl border border-[#d9d1c4] bg-[#fdfbf9] pl-3 pr-8 text-xs font-semibold text-[#2d1a0e] outline-none focus:border-[#1c5b49]"
                      />
                      <button
                        type="button"
                        onClick={() => setActiveLocationTarget("boy")}
                        className="absolute right-1.5 p-1 rounded hover:bg-amber-100 text-[#801c10] cursor-pointer"
                        title="Pick location on map"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Girl Details */}
              <div className="p-4 rounded-2xl bg-white border border-[#e2d6bc] shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                  <h4 className="text-sm font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-700"></span>
                    Girl (कन्या) Details
                  </h4>
                  <button
                    type="button"
                    onClick={() => setActiveLocationTarget("girl")}
                    className="text-[11px] font-bold text-[#801c10] hover:text-[#1c5b49] flex items-center gap-1 cursor-pointer"
                  >
                    <Navigation className="w-3 h-3 text-[#c87638]" />
                    <span>Map / GPS</span>
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#4d382f]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter girl's full name"
                      value={girlDetails.fullName}
                      onChange={(e) =>
                        setGirlDetails({
                          ...girlDetails,
                          fullName: e.target.value,
                        })
                      }
                      className="h-10 w-full rounded-xl border border-[#d9d1c4] bg-[#fdfbf9] px-3 text-xs font-semibold text-[#2d1a0e] outline-none focus:border-[#1c5b49] focus:ring-1 focus:ring-[#1c5b49]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#4d382f]">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      required
                      value={girlDetails.dateOfBirth}
                      onChange={(e) =>
                        setGirlDetails({
                          ...girlDetails,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className="h-10 w-full rounded-xl border border-[#d9d1c4] bg-[#fdfbf9] px-3 text-xs font-semibold text-[#2d1a0e] outline-none focus:border-[#1c5b49] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#4d382f]">
                      Time of Birth
                    </label>
                    <input
                      type="time"
                      required
                      value={girlDetails.timeOfBirth}
                      onChange={(e) =>
                        setGirlDetails({
                          ...girlDetails,
                          timeOfBirth: e.target.value,
                        })
                      }
                      className="h-10 w-full rounded-xl border border-[#d9d1c4] bg-[#fdfbf9] px-3 text-xs font-semibold text-[#2d1a0e] outline-none focus:border-[#1c5b49] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#4d382f]">
                      Place of Birth
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        required
                        placeholder="Enter birth city"
                        value={girlDetails.placeOfBirth}
                        onChange={(e) =>
                          setGirlDetails({
                            ...girlDetails,
                            placeOfBirth: e.target.value,
                          })
                        }
                        className="h-10 w-full rounded-xl border border-[#d9d1c4] bg-[#fdfbf9] pl-3 pr-8 text-xs font-semibold text-[#2d1a0e] outline-none focus:border-[#1c5b49]"
                      />
                      <button
                        type="button"
                        onClick={() => setActiveLocationTarget("girl")}
                        className="absolute right-1.5 p-1 rounded hover:bg-amber-100 text-[#801c10] cursor-pointer"
                        title="Pick location on map"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  disabled={!isReportReady || loading}
                  onClick={onGetReport}
                  className={[
                    "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white transition shadow-md cursor-pointer",
                    isReportReady && !loading
                      ? "bg-[#1c5b49] hover:bg-[#174d42]"
                      : "cursor-not-allowed bg-[#a9b6ae]",
                  ].join(" ")}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Calculating Guna Milan...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Calculate Vedic Match Report</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Picker Map Modal */}
      <LocationPickerModal
        isOpen={Boolean(activeLocationTarget)}
        onClose={() => setActiveLocationTarget(null)}
        currentPlace={
          activeLocationTarget === "boy"
            ? boyDetails.placeOfBirth || "Delhi, India"
            : girlDetails.placeOfBirth || "Delhi, India"
        }
        onSelectLocation={handleLocationSelect}
      />
    </>
  );
}
