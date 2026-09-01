"use client";

import React, { useState } from "react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import { KundliFormData, getKundliReport } from "./kundliApi";
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

  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Basic Details");
  const [shareCopied, setShareCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await getKundliReport(formData);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
      setShowResult(true);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  const handleShare = () => {
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#fdf8f0] selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* Top Navbar */}
      <AstroNavbar />

      {/* Main Content Container */}
      <div className="w-full flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[1350px] mx-auto flex flex-col items-center">
        {!showResult ? (
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
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              shareCopied={shareCopied}
              handleShare={handleShare}
              onReset={() => setShowResult(false)}
            />

            <KundliAstrologers />
          </div>
        )}
      </div>

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
