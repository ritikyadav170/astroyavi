"use client";

import { useState } from "react";
import Link from "next/link";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import {
  ProfileDetails,
  MatchMakingResult,
  getMatchMakingReport,
} from "./matchMaking";
import { ProfileSelector } from "./components/ProfileSelector";
import { MatchMakingFormCard } from "./components/MatchMakingFormCard";
import { MatchMakingReportView } from "./components/MatchMakingReportView";

export default function MatchMakingPage() {
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([
    "boy",
    "girl",
  ]);
  const [showReport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportResult, setReportResult] = useState<MatchMakingResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [boyDetails, setBoyDetails] = useState<ProfileDetails>({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });

  const [girlDetails, setGirlDetails] = useState<ProfileDetails>({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });

  const isReportReady =
    selectedProfiles.length === 2 &&
    Boolean(boyDetails.fullName && boyDetails.dateOfBirth && boyDetails.placeOfBirth) &&
    Boolean(girlDetails.fullName && girlDetails.dateOfBirth && girlDetails.placeOfBirth);

  const handleGetReport = async () => {
    if (!boyDetails.fullName || !boyDetails.dateOfBirth || !boyDetails.placeOfBirth) {
      setErrorMessage("Please fill in Boy's Name, Date of Birth, and Place of Birth.");
      return;
    }
    if (!girlDetails.fullName || !girlDetails.dateOfBirth || !girlDetails.placeOfBirth) {
      setErrorMessage("Please fill in Girl's Name, Date of Birth, and Place of Birth.");
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      const data = await getMatchMakingReport(boyDetails, girlDetails);
      setReportResult(data);
      setShowReport(true);
      window.scrollTo({ top: 250, behavior: "smooth" });
    } catch (err: any) {
      console.error("Match making calculation error:", err);
      setErrorMessage(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to calculate match making report. Please verify both partners' details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f5f1] text-[#2d1a0e]">
      <AstroNavbar />

      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#6b4d3c] print:hidden">
          <Link href="/" className="hover:text-[#1c5b49]">
            Home
          </Link>
          <span>›</span>
          <span>Match Making</span>
        </div>

        {/* Page Title & Description */}
        <div className="print:hidden">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2d1a0e]">
            Kundli Match Making (कुंडली मिलान)
          </h1>
          <p className="mt-2 max-w-[820px] text-sm sm:text-base leading-relaxed text-[#4d382f]">
            Discover comprehensive relationship compatibility through authentic Vedic Ashtakoot Kundli matching, 36 Gunas analysis, and Manglik Dosha assessment.
          </p>
        </div>

        {/* Profile Avatars Selector */}
        <div className="print:hidden">
          <ProfileSelector
            selectedProfiles={selectedProfiles}
            setSelectedProfiles={setSelectedProfiles}
          />
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-2xs">
            <span>{errorMessage}</span>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-red-600 hover:text-red-900 font-bold px-2 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Form Card OR Report View */}
        {!showReport || !reportResult ? (
          <MatchMakingFormCard
            boyDetails={boyDetails}
            setBoyDetails={setBoyDetails}
            girlDetails={girlDetails}
            setGirlDetails={setGirlDetails}
            isReportReady={isReportReady}
            onGetReport={handleGetReport}
            loading={loading}
          />
        ) : (
          <MatchMakingReportView
            result={reportResult}
            onReset={() => setShowReport(false)}
          />
        )}
      </div>

      <Footer />
    </main>
  );
}
