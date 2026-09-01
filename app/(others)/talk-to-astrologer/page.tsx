"use client";

import React, { useState, useEffect } from "react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import { Astrologer, getAstrologers } from "./talkToAstrologerApi";
import { AstrologerSearchToolbar } from "./components/AstrologerSearchToolbar";
import { AstrologerGrid } from "./components/AstrologerGrid";

export default function TalkToAstrologerPage() {
  const [activeCategory, setActiveCategory] = useState("All Astrologers");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);

  // Fetch astrologers based on filters, search query, and sorting
  useEffect(() => {
    let isMounted = true;

    getAstrologers(activeCategory, searchQuery, sortBy).then((data) => {
      if (isMounted) {
        setAstrologers(data);
      }
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

        {/* Astrologers 5-Column Grid */}
        <AstrologerGrid
          astrologers={astrologers}
          onResetFilters={() => {
            setActiveCategory("All Astrologers");
            setSearchQuery("");
            setSortBy("popular");
          }}
        />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
