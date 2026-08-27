"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ChevronDown, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { HeroSection } from "../../(others)/Homepage/hero-section";
import { ServicesSection } from "../../(others)/Homepage/services-section";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleGetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      
      {/* Background Homepage View (Blurred Overlay) */}
      <div className="inset-0 filter blur-[3px] pointer-events-none opacity-40 select-none">
        <HeroSection />
        <ServicesSection />
      </div>

      {/* Dark Backdrop Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
        
        {/* Centered Login Modal Card (Exact match to screenshot) */}
        <div className="relative w-full max-w-[440px] bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
          
          {/* Close Modal Button */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-all"
            aria-label="Close Login Modal"
          >
            <X className="w-4 h-4" />
          </button>

          {step === "phone" ? (
            /* STEP 1: PHONE NUMBER INPUT FORM */
            <div className="w-full space-y-6">
              
              {/* Title & Subtitle */}
              <div className="space-y-1.5 pt-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e293b]">
                  Let's Get You Login
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Enter Your number to access your Astroyavi account
                </p>
              </div>

              <form onSubmit={handleGetOtp} className="space-y-6">
                
                {/* Phone Input Box with Country Code */}
                <div className="relative w-full bg-white border border-slate-300 rounded-full p-1.5 flex items-center shadow-2xs focus-within:border-[#1b4327] focus-within:ring-1 focus-within:ring-[#1b4327] transition-all">
                  
                  {/* Country Flag & Code */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 shrink-0 cursor-pointer select-none">
                    <span className="text-base">🇮🇳</span>
                    <span>+91</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  {/* Vertical Divider */}
                  <div className="h-6 w-[1px] bg-slate-200 my-auto shrink-0"></div>

                  {/* Mobile Number Text Input */}
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="Enter Mobile Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-transparent px-3 text-sm font-semibold text-[#1e293b] placeholder:text-slate-400 focus:outline-none"
                  />

                </div>

                {/* Dark Green Get OTP Action Button */}
                <button
                  type="submit"
                  disabled={loading || phoneNumber.length < 10 || !agreed}
                  className="w-full py-3.5 bg-[#163014] hover:bg-[#0e210d] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-full shadow-md text-sm sm:text-base transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Sending OTP...</span>
                  ) : (
                    <span>Get OTP</span>
                  )}
                </button>

                {/* Terms of Use & Privacy Policy Checkbox */}
                <div className="flex items-start justify-center gap-2 text-left pt-1">
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#163014] focus:ring-[#163014] cursor-pointer"
                  />
                  <label htmlFor="terms-checkbox" className="text-[11px] sm:text-xs text-slate-500 leading-tight cursor-pointer">
                    By signing up, you agree to our{" "}
                    <Link href="/terms" className="font-bold text-slate-900 underline hover:text-[#c85a17]">
                      Terms of Use
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-bold text-slate-900 underline hover:text-[#c85a17]">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

              </form>

            </div>
          ) : (
            /* STEP 2: OTP VERIFICATION FORM */
            <div className="w-full space-y-6">
              
              {/* Title & Subtitle */}
              <div className="space-y-1.5 pt-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e293b]">
                  Verify OTP
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Enter 4-digit OTP sent to <span className="font-bold text-slate-900">+91 {phoneNumber}</span>
                </p>
              </div>

              {verified ? (
                <div className="py-6 flex flex-col items-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">Login Successful!</h3>
                  <p className="text-xs text-slate-500">Redirecting to home...</p>
                </div>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  
                  {/* 4-Digit OTP Boxes */}
                  <div className="flex items-center justify-center gap-3">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-input-${i}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        className="w-12 h-14 bg-slate-50 border border-slate-300 rounded-2xl text-center text-xl font-bold text-slate-900 focus:bg-white focus:border-[#163014] focus:outline-none shadow-2xs"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.some((d) => !d)}
                    className="w-full py-3.5 bg-[#163014] hover:bg-[#0e210d] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-full shadow-md text-sm sm:text-base transition-all"
                  >
                    {loading ? "Verifying..." : "Verify & Proceed"}
                  </button>

                  <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                    <button
                      type="button"
                      onClick={() => setStep("phone")}
                      className="hover:underline text-slate-700 font-semibold"
                    >
                      ← Change Number
                    </button>
                    <button
                      type="button"
                      onClick={() => alert("OTP re-sent successfully!")}
                      className="hover:underline text-[#163014] font-bold"
                    >
                      Resend OTP
                    </button>
                  </div>

                </form>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
