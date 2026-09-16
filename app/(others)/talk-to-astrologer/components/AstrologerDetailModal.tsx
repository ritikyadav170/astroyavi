"use client";

import { useEffect, useState } from "react";
import {
  X,
  Star,
  Phone,
  MessageSquare,
  Video,
  ShieldCheck,
  Sparkles,
  Globe,
  Award,
  Loader2,
} from "lucide-react";
import { Astrologer, getAstrologerById } from "../talkToAstrologerApi";
import { toast } from "@components/ui/toaster";
import { formatImageUrl } from "@/lib/utils";

interface AstrologerDetailModalProps {
  astrologerId: string | number | null;
  onClose: () => void;
  initialAstrologer?: Astrologer | null;
}

export function AstrologerDetailModal({
  astrologerId,
  onClose,
  initialAstrologer,
}: AstrologerDetailModalProps) {
  const [astrologer, setAstrologer] = useState<Astrologer | null>(
    initialAstrologer || null
  );
  const [loading, setLoading] = useState(false);
  const [modalImgError, setModalImgError] = useState(false);

  useEffect(() => {
    if (!astrologerId) return;

    setModalImgError(false);
    let isMounted = true;
    setLoading(true);

    // Call GET /asterologer/:id API
    getAstrologerById(astrologerId)
      .then((data) => {
        if (isMounted) {
          if (data) {
            setAstrologer(data);
          } else if (initialAstrologer) {
            setAstrologer(initialAstrologer);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load astrologer details:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [astrologerId, initialAstrologer]);

  if (!astrologerId) return null;

  const handleStartConsultation = (type: "chat" | "call" | "video") => {
    const isLoggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem("astroyavi_logged_in") === "true";

    if (!isLoggedIn) {
      toast.error("Login Required", {
        description: `Please login to connect with ${astrologer?.name || "Astrologer"} via ${type}.`,
      });
      return;
    }

    toast.success("Connecting with Astrologer...", {
      description: `Starting ${type} consultation with ${astrologer?.name}. Connecting line...`,
    });
  };

  const displayName = astrologer?.name || "Astrologer Profile";
  const displayRating = astrologer?.rating || "5.0";
  const displayReviews = astrologer?.reviewsCount || 1200;
  const displayExp = astrologer?.experienceYears || 10;
  const displayPrice = astrologer?.price || 20;
  const displayOriginalPrice = astrologer?.originalPrice || displayPrice + 10;
  const displaySpecialty = astrologer?.specialty || "Vedic Astrology, Kundli";
  const displayBio =
    astrologer?.bio ||
    astrologer?.about ||
    `${displayName} is a certified expert astrologer specializing in ${displaySpecialty}, offering deep spiritual insights, precise Vedic predictions, and effective remedies for life's challenges.`;
  const skillsList = astrologer?.skills || [displaySpecialty];
  const languagesList = astrologer?.languages || ["Hindi", "English"];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-[620px] overflow-y-auto rounded-[32px] border border-amber-200/90 bg-[#fdf8f0] p-6 shadow-2xl animate-in zoom-in-95 duration-200 sm:p-8 scrollbar-thin">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {loading && !astrologer ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#c85a17]" />
            <p className="text-xs font-semibold text-slate-500">
              Fetching astrologer details...
            </p>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            {/* Header Profile Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Avatar Frame */}
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-[#163014] text-amber-200 shadow-xl overflow-hidden border-2 border-amber-400/80">
                {(astrologer?.profileImage || astrologer?.image) && !modalImgError ? (
                  <img
                    src={formatImageUrl(astrologer.profileImage || astrologer.image)}
                    alt={displayName}
                    onError={() => setModalImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className={`h-full w-full ${astrologer?.bgColor || "bg-[#1b4327]"} flex items-center justify-center text-white text-2xl font-bold`}
                  >
                    {astrologer?.initials || "AS"}
                  </div>
                )}
                {astrologer?.isOnline && (
                  <span className="absolute bottom-1 right-1 flex items-center gap-1 rounded-full bg-white px-2 py-0.5 border border-emerald-500 shadow-xs">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-700 uppercase">
                      Online
                    </span>
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {displayName}
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-300/60 shadow-2xs">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Astrologer
                  </span>
                </div>
                <p className="text-xs font-bold text-[#c85a17] sm:text-sm">
                  {displaySpecialty}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5 text-slate-400" />
                    {languagesList.join(", ")}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-slate-400" />
                    {displayExp}+ Yrs Exp
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl bg-white p-3.5 border border-amber-200/80 shadow-xs text-center">
              <div className="border-r border-slate-100 pr-2">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Rating
                </span>
                <div className="mt-0.5 flex items-center justify-center gap-1 text-sm font-bold text-slate-900">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                  <span>{displayRating}</span>
                </div>
              </div>

              <div className="border-r border-slate-100 pr-2">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Consultations
                </span>
                <p className="mt-0.5 text-sm font-bold text-slate-900">
                  {displayReviews}+
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Rate
                </span>
                <div className="mt-0.5 flex items-center justify-center gap-1 text-sm font-bold text-[#2b1810]">
                  <span>₹{displayPrice}/min</span>
                  <s className="text-[10px] text-red-500 font-normal">
                    ₹{displayOriginalPrice}
                  </s>
                </div>
              </div>
            </div>

            {/* Skills & Expertise Pills */}
            <div className="rounded-2xl bg-white p-4 border border-amber-200/80 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Skills & Specializations
              </span>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {skillsList.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-xl bg-amber-50 px-3 py-1 text-xs font-semibold text-[#c85a17] border border-amber-200/60 shadow-2xs"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* About / Bio */}
            <div className="rounded-2xl bg-white p-4 border border-amber-200/80 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                About Astrologer
              </span>
              <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
                {displayBio}
              </p>
            </div>

            {/* Direct Connect Action CTA Strip */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold text-slate-800">
                Connect Now with {displayName}:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleStartConsultation("chat")}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#163014] py-3 px-4 text-xs font-bold text-white shadow-md transition hover:bg-[#0e210d] hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4 text-amber-300" />
                  <span>Chat (₹{displayPrice}/min)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStartConsultation("call")}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#c85a17] py-3 px-4 text-xs font-bold text-white shadow-md transition hover:bg-[#a0430d] hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call (₹{displayPrice}/min)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStartConsultation("video")}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-white border border-amber-300 py-3 px-4 text-xs font-bold text-[#c85a17] shadow-xs transition hover:bg-amber-50 hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <Video className="h-4 w-4 text-[#c85a17]" />
                  <span>Video Call</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
