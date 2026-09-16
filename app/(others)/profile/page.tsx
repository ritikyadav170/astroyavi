"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  Edit3,
  Wallet,
  Scroll,
  Flame,
  ArrowRight,
  LogOut,
  ChevronRight,
  Loader2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  X,
  MessageSquare,
  Globe,
  HeartHandshake,
  Check,
  BellRing,
} from "lucide-react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import axios from "../../../config/axios";
import { toast } from "@components/ui/toaster";

export interface UserWallet {
  balance?: number;
  lockedBalance?: number;
}

export interface UserProfileData {
  _id?: string;
  name?: string;
  mobile?: string;
  countryCode?: string;
  email?: string;
  profileImage?: string;
  fcmToken?: string;
  latitude?: string;
  longitude?: string;
  birthTime?: string;
  maritalStatus?: string;
  deviceId?: string;
  deviceType?: string;
  status?: boolean;
  isDeleted?: boolean;
  preferredLanguage?: string;
  isProfileComplete?: boolean;
  city?: string;
  placeOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
  zodiacSign?: string | null;
  isHoroSubscription?: boolean;
  horoSubscription?: string | null;
  isWhatsappSubscription?: boolean;
  whatsappSubscription?: string | null;
  wallet?: UserWallet;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    placeOfBirth: "",
    city: "",
    birthTime: "",
    maritalStatus: "",
    preferredLanguage: "en",
    zodiacSign: "",
  });

  // Fetch Profile via GET /profile with Token
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("astroyavi_token") ||
            localStorage.getItem("token") ||
            localStorage.getItem("accessToken")
          : null;

      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;
        headers["token"] = token;
      }

      const res = await axios.get("/profile", { headers });

      if (res && res.data) {
        const userObj: UserProfileData =
          res.data.data?.user ||
          res.data.user ||
          res.data.data ||
          res.data;

        setProfile(userObj);

        setFormData({
          name: userObj.name || "",
          email: userObj.email || "",
          placeOfBirth: userObj.placeOfBirth || "",
          city: userObj.city || "",
          birthTime: userObj.birthTime || "",
          maritalStatus: (userObj.maritalStatus || "").toLowerCase(),
          preferredLanguage: userObj.preferredLanguage || "en",
          zodiacSign: userObj.zodiacSign || "",
        });

        if (typeof window !== "undefined") {
          localStorage.setItem("astroyavi_user", JSON.stringify(userObj));
        }
      }
    } catch (err: unknown) {
      console.warn("Could not fetch profile from /profile API:", err);
      const cached =
        typeof window !== "undefined"
          ? localStorage.getItem("astroyavi_user")
          : null;
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setProfile(parsed);
          setFormData({
            name: parsed.name || "",
            email: parsed.email || "",
            placeOfBirth: parsed.placeOfBirth || "",
            city: parsed.city || "",
            birthTime: parsed.birthTime || "",
            maritalStatus: parsed.maritalStatus || "",
            preferredLanguage: parsed.preferredLanguage || "en",
            zodiacSign: parsed.zodiacSign || "",
          });
        } catch {
          // ignore json parse error
        }
      } else {
        setError("Unable to load profile data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Handle Edit Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("astroyavi_token") || localStorage.getItem("token")
          : null;

      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        headers["token"] = token;
      }

      // Normalize maritalStatus to lowercase enum expected by backend
      const payload = {
        ...formData,
        maritalStatus: formData.maritalStatus
          ? formData.maritalStatus.toLowerCase()
          : "",
      };

      // Call PATCH /profile to update profile details
      const res = await axios.patch("/profile", payload, { headers });

      const updatedUser: UserProfileData =
        res?.data?.data?.user ||
        res?.data?.user ||
        res?.data?.data || {
          ...profile,
          ...payload,
          isProfileComplete: Boolean(
            payload.name && (payload.placeOfBirth || payload.city)
          ),
        };

      setProfile(updatedUser);
      localStorage.setItem("astroyavi_user", JSON.stringify(updatedUser));
      toast.success("Profile Updated Successfully", {
        description: "Your details have been updated in your account.",
      });
      setIsEditModalOpen(false);
    } catch (err: unknown) {
      type ApiErr = {
        response?: {
          data?: {
            message?: string;
            error?: { message?: string };
          };
        };
      };
      const apiErr = err as ApiErr;
      const msg =
        apiErr?.response?.data?.message ||
        apiErr?.response?.data?.error?.message ||
        (err instanceof Error
          ? err.message
          : "Unable to update profile. Please try again.");
      toast.error("Failed to update profile", {
        description: msg,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("astroyavi_logged_in");
      localStorage.removeItem("astroyavi_token");
      localStorage.removeItem("token");
      localStorage.removeItem("astroyavi_user");
      window.dispatchEvent(new Event("astroyavi_auth_change"));
      window.location.href = "/";
    }
  };

  // Format creation date
  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recently";

  // Data helpers
  const displayName = profile?.name ? profile.name : "Astroyavi User";
  const displayMobile = profile?.mobile
    ? `${profile?.countryCode || "+91"} ${profile.mobile}`
    : "Not linked";
  const displayEmail = profile?.email ? profile.email : "Not provided";
  const walletBalance = profile?.wallet?.balance ?? 0;
  const lockedBalance = profile?.wallet?.lockedBalance ?? 0;
  const displayLocation =
    profile?.placeOfBirth || profile?.city || "Not provided";
  const displayBirthTime = profile?.birthTime || "Not provided";
  const displayMaritalStatus = profile?.maritalStatus
    ? profile.maritalStatus.charAt(0).toUpperCase() +
      profile.maritalStatus.slice(1).toLowerCase()
    : "Not provided";
  const displayLanguage =
    profile?.preferredLanguage === "hi"
      ? "Hindi (हिन्दी)"
      : "English (en)";
  const displayZodiac = profile?.zodiacSign || "Not set";

  return (
    <main className="min-h-screen bg-[#fdf8f0] text-[#2d1a0e]">
      <AstroNavbar />

      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb & Refresh */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[#6b4d3c]">
            <Link href="/" className="hover:text-[#c85a17] transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="font-semibold text-[#2d1a0e]">My Profile</span>
          </div>

          <button
            type="button"
            onClick={fetchProfile}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-[#c85a17] shadow-xs transition hover:bg-amber-50 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Loading State Skeleton */}
        {loading && !profile ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-44 rounded-3xl bg-amber-100/60" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="h-80 rounded-3xl bg-amber-100/40 lg:col-span-2" />
              <div className="h-80 rounded-3xl bg-amber-100/40" />
            </div>
          </div>
        ) : (
          <>
            {/* Header Profile Hero Card */}
            <div className="relative overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-white to-orange-50/60 p-6 shadow-xl sm:p-8">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Avatar Frame */}
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#163014] text-amber-200 shadow-xl sm:h-24 sm:w-24 overflow-hidden border-2 border-amber-400/70">
                    {profile?.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt={displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-10 w-10 sm:h-12 sm:w-12" />
                    )}
                    <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 shadow-xs" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        {displayName}
                      </h1>
                      {profile?.status !== false ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-300/60">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Active Devotee
                        </span>
                      ) : null}
                    </div>

                    <p className="text-xs font-medium text-slate-600 sm:text-sm">
                      {displayMobile} {profile?.email ? `• ${profile.email}` : ""}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Member since {memberSince} • Language: {displayLanguage}
                    </p>
                  </div>
                </div>

                {/* Right Top Action CTAs */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center gap-1.5 rounded-2xl border border-amber-400/80 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-xs transition hover:bg-amber-50 hover:text-[#c85a17] hover:border-[#c85a17] cursor-pointer active:scale-95"
                  >
                    <Edit3 className="h-3.5 w-3.5 text-[#c85a17]" />
                    <span>Edit Profile</span>
                  </button>

                  <Link
                    href="/wallet"
                    className="flex items-center gap-2 rounded-2xl bg-[#163014] px-4 py-2.5 text-xs font-bold text-amber-200 shadow-md transition hover:bg-[#0e210d] hover:scale-105 active:scale-95"
                  >
                    <Wallet className="h-4 w-4 text-amber-300" />
                    <span>Wallet: ₹{walletBalance}</span>
                  </Link>
                </div>
              </div>

              {/* Complete Profile Notification Banner */}
              {!profile?.isProfileComplete && (
                <div className="mt-5 flex flex-col gap-2 rounded-2xl bg-amber-100/60 p-3.5 border border-amber-200/80 sm:flex-row sm:items-center sm:justify-between text-left">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-[#c85a17] shrink-0" />
                    <p className="text-xs text-slate-700">
                      <strong>Complete your profile:</strong> Add your name, place of birth and birth time for accurate Kundli and horoscope calculations.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="shrink-0 text-xs font-bold text-[#c85a17] underline hover:text-[#a0430d] cursor-pointer"
                  >
                    Complete Now →
                  </button>
                </div>
              )}
            </div>

            {/* Profile Content 2-Column Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Column: Account & Kundli Details (2 Cols) */}
              <div className="space-y-6 lg:col-span-2">
                {/* Personal Information */}
                <div className="rounded-3xl border border-amber-200/80 bg-white p-6 shadow-md sm:p-7">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-[#c85a17] border border-amber-200/50">
                        <User className="h-5 w-5" />
                      </div>
                      <h2 className="font-serif text-lg font-bold text-slate-900">
                        Personal Information
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(true)}
                      className="text-xs font-bold text-[#c85a17] hover:underline decoration-amber-300 underline-offset-4 cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50/70 p-4 border border-slate-100/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Full Name
                      </span>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {displayName}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50/70 p-4 border border-slate-100/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Registered Mobile
                      </span>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-900">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        {displayMobile}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50/70 p-4 border border-slate-100/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Email Address
                      </span>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-900 truncate">
                        <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{displayEmail}</span>
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50/70 p-4 border border-slate-100/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Marital Status
                      </span>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-900">
                        <HeartHandshake className="h-3.5 w-3.5 text-slate-400" />
                        {displayMaritalStatus}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50/70 p-4 border border-slate-100/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Place of Birth / City
                      </span>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-900 truncate">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{displayLocation}</span>
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50/70 p-4 border border-slate-100/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Birth Time
                      </span>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-900">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {displayBirthTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Astrology & Horoscope Summary */}
                <div className="rounded-3xl border border-amber-200/80 bg-white p-6 shadow-md sm:p-7">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-[#c85a17] border border-amber-200/50">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <h2 className="font-serif text-lg font-bold text-slate-900">
                        Vedic Astrology & Preferences
                      </h2>
                    </div>

                    <Link
                      href="/kundli"
                      className="flex items-center gap-1 text-xs font-bold text-[#c85a17] hover:underline"
                    >
                      <span>Generate Kundli</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 p-4 text-center border border-amber-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        Zodiac Sign (Rashi)
                      </span>
                      <p className="mt-1 text-sm font-bold text-[#c85a17]">
                        {displayZodiac}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 p-4 text-center border border-amber-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        Preferred Language
                      </span>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {displayLanguage}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 p-4 text-center border border-amber-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        Profile Status
                      </span>
                      <p className="mt-1 text-sm font-bold text-emerald-700">
                        {profile?.isProfileComplete ? "Complete" : "Incomplete"}
                      </p>
                    </div>
                  </div>

                  {/* Subscriptions Status Row */}
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50/80 p-3.5 border border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <BellRing className="h-4 w-4 text-[#c85a17]" />
                        <span className="text-xs font-semibold text-slate-800">
                          Horoscope Daily Alerts
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          profile?.isHoroSubscription
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {profile?.isHoroSubscription ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-slate-50/80 p-3.5 border border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <MessageSquare className="h-4 w-4 text-emerald-600" />
                        <span className="text-xs font-semibold text-slate-800">
                          WhatsApp Astro Updates
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          profile?.isWhatsappSubscription
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {profile?.isWhatsappSubscription ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Wallet & Quick Shortcuts */}
              <div className="space-y-6">
                {/* Wallet Balance Card */}
                <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-br from-[#163014] to-[#0e210d] p-6 text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300/90">
                      Astroyavi Wallet
                    </span>
                    <Wallet className="h-5 w-5 text-amber-300" />
                  </div>

                  <div className="mt-4">
                    <div className="text-3xl font-bold tracking-tight text-white">
                      ₹{walletBalance}
                    </div>
                    {lockedBalance > 0 && (
                      <p className="mt-1 text-xs text-amber-200/70">
                        Locked Balance: ₹{lockedBalance}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href="/wallet"
                      className="flex-1 rounded-2xl bg-gradient-to-r from-[#c85a17] to-amber-500 py-2.5 text-center text-xs font-bold text-white shadow-md transition hover:scale-105 hover:shadow-lg"
                    >
                      Recharge Wallet
                    </Link>
                  </div>
                </div>

                {/* Shortcuts Navigation Card */}
                <div className="rounded-3xl border border-amber-200/80 bg-white p-6 shadow-md">
                  <h2 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Quick Actions
                  </h2>

                  <div className="mt-4 space-y-2.5">
                    <Link
                      href="/kundli"
                      className="flex items-center justify-between rounded-2xl p-3.5 text-xs font-semibold text-slate-700 transition hover:bg-amber-50 hover:text-slate-900 border border-slate-100 shadow-2xs group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100/70 text-amber-700 group-hover:scale-105 transition-transform">
                          <Scroll className="h-4.5 w-4.5" />
                        </div>
                        <span className="font-bold">My Kundli</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#c85a17] transition-colors" />
                    </Link>

                    <Link
                      href="/puja-booking"
                      className="flex items-center justify-between rounded-2xl p-3.5 text-xs font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-slate-900 border border-slate-100 shadow-2xs group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100/70 text-orange-700 group-hover:scale-105 transition-transform">
                          <Flame className="h-4.5 w-4.5" />
                        </div>
                        <span className="font-bold">Puja Bookings</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#c85a17] transition-colors" />
                    </Link>

                    <Link
                      href="/talk-to-astrologer"
                      className="flex items-center justify-between rounded-2xl p-3.5 text-xs font-semibold text-slate-700 transition hover:bg-purple-50 hover:text-slate-900 border border-slate-100 shadow-2xs group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100/70 text-purple-700 group-hover:scale-105 transition-transform">
                          <Sparkles className="h-4.5 w-4.5" />
                        </div>
                        <span className="font-bold">Consult Astrologers</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-purple-700 transition-colors" />
                    </Link>
                  </div>

                  <div className="my-5 border-t border-slate-100" />

                  {/* Log Out Button */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 py-3.5 text-xs font-bold text-red-600 transition hover:bg-red-100 border border-red-200/80 cursor-pointer active:scale-98"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Profile Modal Dialog */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-[500px] rounded-[32px] border border-amber-200/90 bg-white p-6 shadow-2xl animate-in zoom-in-95 sm:p-8">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-[#c85a17] border border-amber-200/60">
                <Edit3 className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Update Profile Details
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in your details for personalized Kundli and astrology predictions
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-slate-600">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#163014] focus:bg-white focus:ring-2 focus:ring-[#163014]/20"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#163014] focus:bg-white focus:ring-2 focus:ring-[#163014]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600">Birth Time</label>
                  <input
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#163014] focus:bg-white focus:ring-2 focus:ring-[#163014]/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600">Marital Status</label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#163014] focus:bg-white"
                  >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600">Place of Birth / City</label>
                  <input
                    type="text"
                    value={formData.placeOfBirth || formData.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        placeOfBirth: e.target.value,
                        city: e.target.value,
                      })
                    }
                    placeholder="e.g. New Delhi"
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#163014] focus:bg-white focus:ring-2 focus:ring-[#163014]/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600">Preferred Language</label>
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#163014] focus:bg-white"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-[#163014] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0e210d] cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
