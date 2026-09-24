"use client";

import React, { useState } from "react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import {
  KundliFormData,
  FullKundliReportData,
  getKundliReport,
} from "./kundliApi";
import { KundliForm } from "./components/KundliForm";
import { KundliReportDetails } from "./components/KundliReportDetails";
import { KundliAstrologers } from "./components/KundliAstrologers";

export default function KundliPage() {
  const [formData, setFormData] = useState<KundliFormData>({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    gender: "",
  });

  const [reportData, setReportData] = useState<FullKundliReportData | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Basic Details");
  const [shareCopied, setShareCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const data = await getKundliReport(formData);
      setReportData(data);
      setShowResult(true);
      window.scrollTo({ top: 350, behavior: "smooth" });
    } catch (err: any) {
      console.error("Kundli calculation error:", err);
      setErrorMessage(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to calculate Kundli. Please ensure all details and place of birth are correct."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdf8f0] selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* Top Navbar */}
      <AstroNavbar />

      {/* Main Content Container */}
      <div className="w-full flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[1350px] mx-auto flex flex-col items-center">
        {errorMessage && (
          <div className="w-full max-w-3xl mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-semibold flex items-center justify-between">
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

        {!showResult || !reportData ? (
          <KundliForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        ) : (
          <div className="w-full flex flex-col items-center space-y-12">
            <KundliReportDetails
              formData={formData}
              reportData={reportData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              shareCopied={shareCopied}
              handleShare={handleShare}
              onReset={() => setShowResult(false)}
            />

            {/* Recommended Astrologers */}
            <KundliAstrologers />
          </div>
        )}
      </div>

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
