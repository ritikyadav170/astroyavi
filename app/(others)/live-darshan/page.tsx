"use client";

import React, { useState, useEffect } from "react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import { Mandir, getLiveMandirs, getVirtualTempleCategories } from "./liveDarshan";
import { MandirToolbar } from "./components/MandirToolbar";
import { MandirGrid } from "./components/MandirGrid";
import { LiveStreamModal } from "./components/LiveStreamModal";
import { FilterModal } from "./components/FilterModal";

export default function LiveDarshanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Darshan");
  const [categories, setCategories] = useState<string[]>(["All Darshan"]);
  const [sortBy, setSortBy] = useState("popular");
  const [stateFilter, setStateFilter] = useState("All");
  const [deityFilter, setDeityFilter] = useState("All");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [mandirs, setMandirs] = useState<Mandir[]>([]);
  const [activeMandir, setActiveMandir] = useState<Mandir | null>(null);

  // Fetch Categories from API on mount
  useEffect(() => {
    let isMounted = true;
    getVirtualTempleCategories().then((cats) => {
      if (isMounted) {
        setCategories(cats);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Active filter count logic
  const activeFilterCount =
    (sortBy !== "popular" ? 1 : 0) +
    (stateFilter !== "All" ? 1 : 0) +
    (deityFilter !== "All" ? 1 : 0);

  // Fetch Mandirs from API whenever query, category, sort or filter options change
  useEffect(() => {
    let isMounted = true;

    getLiveMandirs(searchQuery, selectedCategory, sortBy, stateFilter, deityFilter).then(
      (data) => {
        if (isMounted) {
          setMandirs(data);
        }
      }
    );

    return () => {
      isMounted = false;
    };
  }, [searchQuery, selectedCategory, sortBy, stateFilter, deityFilter]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Darshan");
    setSortBy("popular");
    setStateFilter("All");
    setDeityFilter("All");
  };

  return (
    <main className="min-h-screen bg-[#faf9f5] flex flex-col font-sans text-slate-800 selection:bg-amber-200 selection:text-amber-950">
      {/* Top Navigation */}
      <AstroNavbar />

      {/* Main Container */}
      <div className="w-full flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Toolbar Section (Breadcrumb, Search, Sort&Filter, Category Pills) */}
        <MandirToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          onOpenFilterModal={() => setIsFilterModalOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* Mandir Grid */}
        <MandirGrid
          mandirs={mandirs}
          onSelectMandir={(mandir) => setActiveMandir(mandir)}
          onClearFilters={handleResetFilters}
        />
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        sortBy={sortBy}
        setSortBy={setSortBy}
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        deityFilter={deityFilter}
        setDeityFilter={setDeityFilter}
        onReset={handleResetFilters}
      />

      {/* Live Video Stream Modal Popup */}
      {activeMandir && (
        <LiveStreamModal
          mandir={activeMandir}
          onClose={() => setActiveMandir(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
