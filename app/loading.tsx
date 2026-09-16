import React from "react";

const LoadingPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#fdf8f0] text-slate-900 transition-opacity duration-200">
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-300/80 bg-white shadow-md">
          <div className="h-6 w-6 rounded-full border-2 border-[#c85a17] border-t-transparent animate-spin" />
        </div>
        <p className="font-serif text-sm font-semibold tracking-wide text-slate-700">
          Astroyavi
        </p>
      </div>
    </main>
  );
};

export default LoadingPage;
