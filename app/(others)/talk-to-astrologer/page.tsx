"use client";

import React, { useState, useEffect } from "react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import { Astrologer, getAstrologers } from "./talkToAstrologerApi";
import { AstrologerSearchToolbar } from "./components/AstrologerSearchToolbar";
import { AstrologerGrid } from "./components/AstrologerGrid";
import { AstrologerDetailModal } from "./components/AstrologerDetailModal";
import { Loader2 } from "lucide-react";

export default function TalkToAstrologerPage() {
  const [activeCategory, setActiveCategory] = useState("All Astrologers");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAstrologer, setSelectedAstrologer] = useState<Astrologer | null>(null);

  // Fetch astrologers from GET /asterologer
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getAstrologers(activeCategory, searchQuery, sortBy)
      .then((data) => {
        if (isMounted) {
          setAstrologers(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load astrologers:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen bg-[#fdf8f0] selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* Header Navigation */}
      <AstroNavbar />

      {/* Main Content Area */}
      <div className="w-full flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        {/* Search, Sort & Category Filters Bar */}
        <AstrologerSearchToolbar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Loading Spinner */}
        {loading && astrologers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#1b4327]" />
            <p className="text-sm font-semibold text-slate-600">
              Loading astrologers from temple network...
            </p>
          </div>
        ) : (
          /* Astrologers 5-Column Grid */
          <AstrologerGrid
            astrologers={astrologers}
            onResetFilters={() => {
              setActiveCategory("All Astrologers");
              setSearchQuery("");
              setSortBy("popular");
            }}
            onSelectAstrologer={(astro) => setSelectedAstrologer(astro)}
          />
        )}
      </div>

      {/* Astrologer Detail Modal (GET /asterologer/:id) */}
      {selectedAstrologer && (
        <AstrologerDetailModal
          astrologerId={selectedAstrologer.id || selectedAstrologer._id || null}
          initialAstrologer={selectedAstrologer}
          onClose={() => setSelectedAstrologer(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
