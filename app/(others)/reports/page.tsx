"use client";

import React, { useState } from "react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import { ReportsHero } from "./components/ReportsHero";
import { FeaturedReports } from "./components/FeaturedReports";
import { QuickReportGenerator } from "./components/QuickReportGenerator";
import { ReportsCatalog } from "./components/ReportsCatalog";
import { WhyOurReports } from "./components/WhyOurReports";
import { ReportReviews } from "./components/ReportReviews";
import { ReportsFAQ } from "./components/ReportsFAQ";
import { ReportsConsultCTA } from "./components/ReportsConsultCTA";
import { ReportPreviewModal } from "./components/ReportPreviewModal";
import { AstrologyReportItem, ReportCategory } from "./types";

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory>("all");
  const [previewReport, setPreviewReport] = useState<AstrologyReportItem | null>(null);

  const handleOpenPreview = (report: AstrologyReportItem) => {
    setPreviewReport(report);
  };

  const handleClosePreview = () => {
    setPreviewReport(null);
  };

  return (
    <main className="min-h-screen bg-[#fdf8f0] selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* 1. Sticky Navigation Bar */}
      <AstroNavbar />

      {/* 2. Hero Section with Search & Category Filters */}
      <ReportsHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* 3. Featured High-Demand Reports */}
      <FeaturedReports onOpenPreview={handleOpenPreview} />

      {/* 4. Instant Vedic Quick Report Calculator */}
      <QuickReportGenerator />

      {/* 5. Complete Catalog & Search Results */}
      <ReportsCatalog
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onOpenPreview={handleOpenPreview}
      />

      {/* 6. Why Choose Astroyavi Reports / Vedic Guarantee */}
      <WhyOurReports />

      {/* 7. Real Seeker Testimonials */}
      <ReportReviews />

      {/* 8. Frequently Asked Questions */}
      <ReportsFAQ />

      {/* 9. Astrologer Consultation CTA Banner */}
      <ReportsConsultCTA />

      {/* 10. Sample Report Interactive Preview Modal */}
      <ReportPreviewModal
        report={previewReport}
        onClose={handleClosePreview}
      />

      {/* 11. Footer */}
      <Footer />
    </main>
  );
}
