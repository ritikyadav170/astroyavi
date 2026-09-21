"use client";

import React, { useState } from "react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import { ReportsCatalog } from "./components/ReportsCatalog";
import { ReportPreviewModal } from "./components/ReportPreviewModal";
import { AstrologyReportItem } from "./reports";

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [previewReport, setPreviewReport] = useState<AstrologyReportItem | null>(null);

  const handleOpenPreview = (report: AstrologyReportItem) => {
    setPreviewReport(report);
  };

  const handleClosePreview = () => {
    setPreviewReport(null);
  };

  return (
    <main className="min-h-screen bg-[#fdf8f0] selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* 1. Header Navigation */}
      <AstroNavbar />

      {/* 2. Main Content Area matching Talk To Astrologer Style */}
      <div className="w-full flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <ReportsCatalog
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onOpenPreview={handleOpenPreview}
        />
      </div>

      {/* 3. Interactive Report Variant & Order Modal */}
      {previewReport && (
        <ReportPreviewModal
          report={previewReport}
          onClose={handleClosePreview}
        />
      )}

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}
