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
import { Astrologer, getAstrologerById } from "../talkToAstrologer";
import { toast } from "@components/ui/toaster";
import { formatImageUrl } from "@/lib/utils";

// Import the new socket hook and chat window
import { useChatSocket } from "@/hooks/useChatSocket";
import { ChatWindow } from "./ChatWindow";
import { SignupDialog } from "../../../auth/signup/SignupDialog";

interface AstrologerDetailModalProps {
  astrologerId: string | number | null;
  onClose: () => void;
  initialAstrologer?: Astrologer | null;
}

function getStoredUser(): { id: string | null; name: string } {
  if (typeof window === "undefined") return { id: null, name: "Client" };
  const directId = localStorage.getItem("user_id") || localStorage.getItem("userId");
  try {
    const rawUser = localStorage.getItem("astroyavi_user");
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      const uid = parsed?._id || parsed?.id || parsed?.data?._id || parsed?.data?.id || (directId && directId.length === 24 ? directId : null);
      let userName = "Client";
      if (typeof parsed?.name === "string" && parsed.name) userName = parsed.name;
      else if (parsed?.name?.en) userName = parsed.name.en;
      else if (parsed?.name?.hi) userName = parsed.name.hi;
      return { id: uid, name: userName };
    }
  } catch {
    // ignore
  }
  return { id: directId && directId.length === 24 ? directId : null, name: "Client" };
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
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Retrieve user ID from localStorage (or parsed user object)
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(getStoredUser().id);
  }, []);

  // Initialize the chat socket connection
  const { socket, activeSession, isWaiting, sendChatRequest, cancelWaiting, endChat } = useChatSocket(userId);

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
  const astroImg = formatImageUrl(astrologer?.profileImage || astrologer?.image);

  // Render the chat window directly if a session has been accepted and is active
  if (activeSession && socket) {
    return (
      <ChatWindow
        socket={socket}
        session={activeSession}
        astrologer={astrologer}
        userId={userId || "guest_user"}
        onClose={() => endChat(activeSession.chatSessionId)}
      />
    );
  }

  // Render dedicated Connecting / Waiting Dialog when request is sent
  if (isWaiting) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-sm rounded-3xl border border-amber-300/80 bg-[#fdf8f0] p-7 text-center shadow-2xl animate-in zoom-in-95 duration-200">
          {/* Pulsing Radar Ring Avatar */}
          <div className="relative mx-auto mb-5 h-24 w-24">
            <div className="absolute -inset-2 rounded-full bg-emerald-500/20 animate-ping pointer-events-none" />
            <div className="relative h-full w-full rounded-full border-2 border-[#1b4327] overflow-hidden bg-[#1b4327] shadow-xl flex items-center justify-center p-0.5">
              {astroImg && !modalImgError ? (
                <img src={astroImg} alt={displayName} className="h-full w-full object-cover rounded-full" />
              ) : (
                <span className="text-2xl font-bold text-amber-200">{displayName.charAt(0)}</span>
              )}
            </div>
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
            Connecting with {displayName}...
          </h3>
          <p className="text-xs text-[#c85a17] font-semibold mb-5">
            Waiting for astrologer to accept your session
          </p>

          <div className="flex items-center justify-center gap-2.5 text-xs text-slate-700 bg-amber-100/70 py-3 px-4 rounded-2xl border border-amber-200 mb-6 shadow-2xs">
            <Loader2 className="w-4 h-4 animate-spin text-[#1b4327]" />
            <span className="font-medium">Sending request to Astrologer &bull; ₹{displayPrice}/min</span>
          </div>

          <button
            type="button"
            onClick={() => cancelWaiting()}
            className="w-full py-2.5 rounded-full border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 font-bold text-xs transition cursor-pointer"
          >
            Cancel Request
          </button>
        </div>
      </div>
    );
  }

  const handleStartConsultation = (type: "chat" | "call" | "video") => {
    const user = getStoredUser();

    if (!user.id) {
      toast.error(`Please login first to chat with ${astrologer?.name || "Astrologer"}.`);
      setShowLoginDialog(true);
      return;
    }

    if (type === "chat") {
      setUserId(user.id);
      sendChatRequest(astrologerId.toString(), user.id, user.name);
    } else {
      toast.info(`${type.charAt(0).toUpperCase() + type.slice(1)} consultation is not yet implemented.`);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginDialog(false);
    const user = getStoredUser();
    if (user.id) {
      setUserId(user.id);
      sendChatRequest(astrologerId.toString(), user.id, user.name);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-[620px] overflow-y-auto rounded-[32px] border border-amber-200/90 bg-[#fdf8f0] p-6 shadow-2xl animate-in zoom-in-95 duration-200 sm:p-8 scrollbar-thin">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isWaiting}
          aria-label="Close dialog"
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer disabled:opacity-50"
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
                  disabled={isWaiting}
                  onClick={() => handleStartConsultation("chat")}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#163014] py-3 px-4 text-xs font-bold text-white shadow-md transition hover:bg-[#0e210d] hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isWaiting ? (
                    <Loader2 className="h-4 w-4 animate-spin text-amber-300" />
                  ) : (
                    <MessageSquare className="h-4 w-4 text-amber-300" />
                  )}
                  <span>{isWaiting ? "Requesting..." : `Chat (₹${displayPrice}/min)`}</span>
                </button>

                <button
                  type="button"
                  disabled={isWaiting}
                  onClick={() => handleStartConsultation("call")}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#c85a17] py-3 px-4 text-xs font-bold text-white shadow-md transition hover:bg-[#a0430d] hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call (₹{displayPrice}/min)</span>
                </button>

                <button
                  type="button"
                  disabled={isWaiting}
                  onClick={() => handleStartConsultation("video")}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-white border border-amber-300 py-3 px-4 text-xs font-bold text-[#c85a17] shadow-xs transition hover:bg-amber-50 hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  <Video className="h-4 w-4 text-[#c85a17]" />
                  <span>Video Call</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <SignupDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}