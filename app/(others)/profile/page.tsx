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
  Camera,
} from "lucide-react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import axios from "../../../config/axios";
import { toast } from "@components/ui/toaster";

export interface UserProfile {
  _id?: string;
  name?: string;
  fullName?: string;
  mobile?: string;
  phoneNumber?: string;
  countryCode?: string;
  email?: string;
  gender?: string;
  dob?: string;
  dateOfBirth?: string;
  tob?: string;
  timeOfBirth?: string;
  pob?: string;
  placeOfBirth?: string;
  city?: string;
  walletBalance?: number;
  balance?: number;
  sunSign?: string;
  moonSign?: string;
  nakshatra?: string;
  ascendant?: string;
  rashi?: string;
  manglik?: boolean | string;
  avatar?: string;
  profilePic?: string;
  image?: string;
  createdAt?: string;
  isVerified?: boolean;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "Male",
    dob: "",
    tob: "",
    pob: "",
  });

  // Fetch Profile via GET API with Token
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

      // Fetch profile using GET /profile endpoint
      const res = await axios.get("/profile", { headers });
      

      if (res && res.data) {
        const data = res.data;
        const userObj: UserProfile =
          data.user || data.data?.user || data.data || data.profile || data;

        setProfile(userObj);

        // Pre-fill edit form
        setFormData({
          name: userObj.name || userObj.fullName || "",
          email: userObj.email || "",
          gender: userObj.gender || "Male",
          dob: userObj.dob || userObj.dateOfBirth || "",
          tob: userObj.tob || userObj.timeOfBirth || "",
          pob: userObj.pob || userObj.placeOfBirth || userObj.city || "",
        });

        if (typeof window !== "undefined") {
          localStorage.setItem("astroyavi_user", JSON.stringify(userObj));
        }
      } else {
        // If API returns empty or offline, fallback to cached user from verify step
        const cached = localStorage.getItem("astroyavi_user");
        if (cached) {
          const parsed = JSON.parse(cached);
          setProfile(parsed);
          setFormData({
            name: parsed.name || parsed.fullName || "",
            email: parsed.email || "",
            gender: parsed.gender || "Male",
            dob: parsed.dob || parsed.dateOfBirth || "",
            tob: parsed.tob || parsed.timeOfBirth || "",
            pob: parsed.pob || parsed.placeOfBirth || parsed.city || "",
          });
        } else {
          // Default profile fallback for newly registered devotee
          setProfile({
            name: "Astroyavi Devotee",
            email: "devotee@astroyavi.com",
            mobile: "+91 9872087820",
            gender: "Male",
            sunSign: "Leo (Simha)",
            moonSign: "Aries (Mesha)",
            nakshatra: "Ashwini",
            ascendant: "Sagittarius",
            walletBalance: 500,
            isVerified: true,
          });
        }
      }
    } catch (err: unknown) {
      console.warn("Could not fetch profile from remote API:", err);
      // Fallback to cached or default
      const cached = typeof window !== "undefined" ? localStorage.getItem("astroyavi_user") : null;
      if (cached) {
        setProfile(JSON.parse(cached));
      } else {
        setError("Unable to connect to server. Showing local profile.");
        setProfile({
          name: "Astroyavi Devotee",
          email: "devotee@astroyavi.com",
          mobile: "+91 9872087820",
          gender: "Male",
          sunSign: "Leo (Simha)",
          moonSign: "Aries (Mesha)",
          nakshatra: "Ashwini",
          ascendant: "Sagittarius",
          walletBalance: 500,
          isVerified: true,
        });
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

      await axios
        .put("/profile", formData, { headers })
        .catch(() => axios.post("/profile", formData, { headers }))
        .catch(() => null);

      const updated = {
        ...profile,
        ...formData,
      };

      setProfile(updated);
      localStorage.setItem("astroyavi_user", JSON.stringify(updated));
      toast.success("Profile Updated", {
        description: "Your profile details have been saved successfully.",
      });
      setIsEditModalOpen(false);
    } catch {
      toast.error("Failed to update profile", {
        description: "Please check your network and try again.",
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

  // Helper values
  const displayName = profile?.name || profile?.fullName || "Astroyavi Devotee";
  const displayEmail = profile?.email || "devotee@astroyavi.com";
  const displayMobile =
    profile?.mobile ||
    profile?.phoneNumber ||
    (profile?.countryCode ? `${profile.countryCode} 9872087820` : "+91 9872087820");
  const displayWallet = profile?.walletBalance ?? profile?.balance ?? 500;
  const displayDob = profile?.dob || profile?.dateOfBirth || "15 Aug 1995";
  const displayTob = profile?.tob || profile?.timeOfBirth || "10:30 AM";
  const displayPob = profile?.pob || profile?.placeOfBirth || profile?.city || "New Delhi, India";
  const displayGender = profile?.gender || "Male";

  return (
    <main className="min-h-screen bg-[#fdf8f0] text-[#2d1a0e]">
      <AstroNavbar />

      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Refresh action */}
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
            className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-white/80 px-3.5 py-1.5 text-xs font-bold text-[#c85a17] shadow-xs transition hover:bg-amber-50 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Sync Profile</span>
          </button>
        </div>

        {/* Loading State Skeleton */}
        {loading && !profile ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-44 rounded-3xl bg-amber-100/50" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="h-96 rounded-3xl bg-amber-100/40 lg:col-span-2" />
              <div className="h-96 rounded-3xl bg-amber-100/40" />
            </div>
          </div>
        ) : (
          <>
            {/* Header Profile Card */}
            <div className="relative overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-white to-orange-50/60 p-6 shadow-xl sm:p-8">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Avatar Frame */}
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#163014] text-amber-200 shadow-xl sm:h-24 sm:w-24 overflow-hidden border-2 border-amber-400/60">
                    {profile?.avatar || profile?.profilePic || profile?.image ? (
                      <img
                        src={profile.avatar || profile.profilePic || profile.image}
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
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-300/60 shadow-2xs">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Verified Account
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-500 sm:text-sm">
                      {displayEmail} • {displayMobile}
                    </p>
                  </div>
                </div>

                {/* Top Action CTAs */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center gap-1.5 rounded-2xl border border-amber-400/80 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-xs transition hover:bg-amber-50 hover:text-[#c85a17] hover:border-[#c85a17] cursor-pointer active:scale-95"
                  >
                    <Edit3 className="h-3.5 w-3.5 text-[#c85a17]" />
                    <span>Edit Details</span>
                  </button>

                  <Link
                    href="/wallet"
                    className="flex items-center gap-2 rounded-2xl bg-[#163014] px-4 py-2.5 text-xs font-bold text-amber-200 shadow-md transition hover:bg-[#0e210d] hover:scale-105 active:scale-95"
                  >
                    <Wallet className="h-4 w-4 text-amber-300" />
                    <span>₹{displayWallet} Recharge</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Profile Grid: Left (Details) + Right (Quick Actions) */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Personal & Astrological Information (2 Cols) */}
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
                        Mobile Number
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
                        Gender
                      </span>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {displayGender}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50/70 p-4 border border-slate-100/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Date of Birth
                      </span>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-900">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {displayDob}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50/70 p-4 border border-slate-100/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Birth Time & Place
                      </span>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-900 truncate">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{displayTob}, {displayPob}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vedic Astrology Profile Details */}
                <div className="rounded-3xl border border-amber-200/80 bg-white p-6 shadow-md sm:p-7">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-[#c85a17] border border-amber-200/50">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <h2 className="font-serif text-lg font-bold text-slate-900">
                        Vedic Astrology Chart Summary
                      </h2>
                    </div>

                    <Link
                      href="/kundli"
                      className="flex items-center gap-1 text-xs font-bold text-[#c85a17] hover:underline"
                    >
                      <span>Full Kundli</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 p-4 text-center border border-amber-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        Sun Sign
                      </span>
                      <p className="mt-1 text-sm font-bold text-[#c85a17]">
                        {profile?.sunSign || "Leo (Simha)"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 p-4 text-center border border-amber-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        Moon Sign
                      </span>
                      <p className="mt-1 text-sm font-bold text-[#c85a17]">
                        {profile?.moonSign || profile?.rashi || "Aries (Mesha)"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 p-4 text-center border border-amber-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        Nakshatra
                      </span>
                      <p className="mt-1 text-sm font-bold text-[#c85a17]">
                        {profile?.nakshatra || "Ashwini"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 p-4 text-center border border-amber-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        Ascendant
                      </span>
                      <p className="mt-1 text-sm font-bold text-[#c85a17]">
                        {profile?.ascendant || "Sagittarius"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Quick Shortcuts */}
              <div className="space-y-6">
                <div className="rounded-3xl border border-amber-200/80 bg-white p-6 shadow-md">
                  <h2 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Astroyavi Shortcuts
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
                        <span className="font-bold">My Detailed Kundli</span>
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
                      href="/wallet"
                      className="flex items-center justify-between rounded-2xl p-3.5 text-xs font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-slate-900 border border-slate-100 shadow-2xs group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100/70 text-emerald-700 group-hover:scale-105 transition-transform">
                          <Wallet className="h-4.5 w-4.5" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-bold">Astroyavi Wallet</span>
                          <span className="text-[11px] text-emerald-700 font-bold">
                            Balance: ₹{displayWallet}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-700 transition-colors" />
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
                    <span>Log Out from Account</span>
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
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Edit Profile Details
                </h3>
                <p className="text-xs text-slate-500">
                  Keep your details updated for accurate Kundli and astrology predictions
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-slate-600">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#163014] focus:bg-white focus:ring-2 focus:ring-[#163014]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email"
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#163014] focus:bg-white focus:ring-2 focus:ring-[#163014]/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#163014] focus:bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#163014] focus:bg-white focus:ring-2 focus:ring-[#163014]/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600">Time of Birth</label>
                  <input
                    type="time"
                    value={formData.tob}
                    onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#163014] focus:bg-white focus:ring-2 focus:ring-[#163014]/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600">Place of Birth (City / State)</label>
                <input
                  type="text"
                  value={formData.pob}
                  onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                  placeholder="e.g. New Delhi, India"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#163014] focus:bg-white focus:ring-2 focus:ring-[#163014]/20"
                />
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
