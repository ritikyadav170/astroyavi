"use client";

import React from "react";
import { previousReports, ProfileDetails } from "../matchMakingApi";

interface MatchMakingFormCardProps {
  boyDetails: ProfileDetails;
  setBoyDetails: React.Dispatch<React.SetStateAction<ProfileDetails>>;
  girlDetails: ProfileDetails;
  setGirlDetails: React.Dispatch<React.SetStateAction<ProfileDetails>>;
  isReportReady: boolean;
  onGetReport: () => void;
}

export function MatchMakingFormCard({
  boyDetails,
  setBoyDetails,
  girlDetails,
  setGirlDetails,
  isReportReady,
  onGetReport,
}: MatchMakingFormCardProps) {
  return (
    <div className="mt-10 rounded-[24px] border border-[#e2c99a] bg-[#f6f3ee] p-5 shadow-[0_1px_0_rgba(72,51,29,0.03)] sm:p-6">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.25fr]">
        {/* Previous Reports List */}
        <div className="space-y-4 rounded-[18px] border border-[#e2d6bc] bg-[#f2efe9] p-4">
          <h3 className="text-[17px] font-semibold text-[#2d1a0e]">
            Previous Match Making Report
          </h3>

          <div className="space-y-3">
            {previousReports.map((report) => (
              <div
                key={report.name}
                className="flex items-center justify-between gap-3 rounded-[12px] border border-transparent bg-transparent px-1 py-1"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-bold text-[#2d1a0e]"
                    style={{ background: report.color }}
                  >
                    {report.initials}
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-[#2d1a0e]">
                      {report.name}
                    </p>
                    <p className="text-xs text-[#6b4d3c]">{report.date}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onGetReport}
                  className="rounded-full border border-[#1c5b49] bg-[#1c5b49] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#174d42] cursor-pointer"
                >
                  View Report
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Input Details Form */}
        <div className="rounded-[18px] border border-[#e2d6bc] bg-[#f7f6f4] p-5">
          <h3 className="mb-5 text-[20px] font-bold text-[#2d1a0e]">
            Match Making
          </h3>

          <div className="space-y-5">
            {/* Boy Details */}
            <div>
              <h4 className="mb-3 text-[17px] font-semibold text-[#2d1a0e]">
                Boy Details
              </h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-[#4d382f]">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter boy's full name"
                    value={boyDetails.fullName}
                    onChange={(e) =>
                      setBoyDetails({ ...boyDetails, fullName: e.target.value })
                    }
                    className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 text-sm text-[#2d1a0e] outline-none focus:border-[#1c5b49]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#4d382f]">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={boyDetails.dateOfBirth}
                    onChange={(e) =>
                      setBoyDetails({
                        ...boyDetails,
                        dateOfBirth: e.target.value,
                      })
                    }
                    className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 text-sm text-[#2d1a0e] outline-none focus:border-[#1c5b49]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#4d382f]">
                    Time of Birth
                  </label>
                  <input
                    type="time"
                    value={boyDetails.timeOfBirth}
                    onChange={(e) =>
                      setBoyDetails({
                        ...boyDetails,
                        timeOfBirth: e.target.value,
                      })
                    }
                    className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 text-sm text-[#2d1a0e] outline-none focus:border-[#1c5b49]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#4d382f]">
                    Place of Birth
                  </label>
                  <input
                    type="text"
                    placeholder="Enter birth city"
                    value={boyDetails.placeOfBirth}
                    onChange={(e) =>
                      setBoyDetails({
                        ...boyDetails,
                        placeOfBirth: e.target.value,
                      })
                    }
                    className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 text-sm text-[#2d1a0e] outline-none focus:border-[#1c5b49]"
                  />
                </div>
              </div>
            </div>

            {/* Girl Details */}
            <div>
              <h4 className="mb-3 text-[17px] font-semibold text-[#2d1a0e]">
                Girl Details
              </h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-[#4d382f]">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter girl's full name"
                    value={girlDetails.fullName}
                    onChange={(e) =>
                      setGirlDetails({
                        ...girlDetails,
                        fullName: e.target.value,
                      })
                    }
                    className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 text-sm text-[#2d1a0e] outline-none focus:border-[#1c5b49]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#4d382f]">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={girlDetails.dateOfBirth}
                    onChange={(e) =>
                      setGirlDetails({
                        ...girlDetails,
                        dateOfBirth: e.target.value,
                      })
                    }
                    className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 text-sm text-[#2d1a0e] outline-none focus:border-[#1c5b49]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#4d382f]">
                    Time of Birth
                  </label>
                  <input
                    type="time"
                    value={girlDetails.timeOfBirth}
                    onChange={(e) =>
                      setGirlDetails({
                        ...girlDetails,
                        timeOfBirth: e.target.value,
                      })
                    }
                    className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 text-sm text-[#2d1a0e] outline-none focus:border-[#1c5b49]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#4d382f]">
                    Place of Birth
                  </label>
                  <input
                    type="text"
                    placeholder="Enter birth city"
                    value={girlDetails.placeOfBirth}
                    onChange={(e) =>
                      setGirlDetails({
                        ...girlDetails,
                        placeOfBirth: e.target.value,
                      })
                    }
                    className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 text-sm text-[#2d1a0e] outline-none focus:border-[#1c5b49]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="button"
                disabled={!isReportReady}
                onClick={onGetReport}
                className={[
                  "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white transition cursor-pointer",
                  isReportReady
                    ? "bg-[#1c5b49] hover:bg-[#174d42]"
                    : "cursor-not-allowed bg-[#a9b6ae]",
                ].join(" ")}
              >
                Get Matching Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
