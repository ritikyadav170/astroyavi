"use client";

import { useState } from "react";
import Link from "next/link";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import {
  ProfileDetails,
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

  const isReportReady = selectedProfiles.length === 2;

  const handleGetReport = async () => {
    setLoading(true);
    try {
      await getMatchMakingReport(boyDetails, girlDetails);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
      setShowReport(true);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f5f1] text-[#2d1a0e]">
      <AstroNavbar />

      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#6b4d3c]">
          <Link href="/" className="hover:text-[#1c5b49]">
            Home
          </Link>
          <span>›</span>
          <span>Match Making</span>
        </div>

        {/* Page Title & Description */}
        <h1 className="text-4xl font-bold tracking-tight text-[#2d1a0e]">
          Match Making
        </h1>
        <p className="mt-3 max-w-[820px] text-[17px] leading-8 text-[#4d382f]">
          Discover relationship compatibility through accurate Kundli matching
          and Gun Milan.
        </p>

        {/* Profile Avatars Selector */}
        <ProfileSelector
          selectedProfiles={selectedProfiles}
          setSelectedProfiles={setSelectedProfiles}
        />

        {/* Form Card OR Report View */}
        {!showReport ? (
          <MatchMakingFormCard
            boyDetails={boyDetails}
            setBoyDetails={setBoyDetails}
            girlDetails={girlDetails}
            setGirlDetails={setGirlDetails}
            isReportReady={isReportReady}
            onGetReport={handleGetReport}
          />
        ) : (
          <MatchMakingReportView onReset={() => setShowReport(false)} />
        )}
      </div>

      <Footer />
    </main>
  );
}
