import React from "react";
import { Sparkles } from "lucide-react";

const LoadingPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-950 text-slate-100">
      <div className="flex flex-col items-center gap-3">
        <Sparkles className="w-10 h-10 text-amber-400 animate-spin" />
        <p className="text-sm font-medium text-slate-400 animate-pulse">Loading Astroyavi...</p>
      </div>
    </main>
  );
};

export default LoadingPage;

