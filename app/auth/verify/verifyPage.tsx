"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ClipboardEvent,
  KeyboardEvent,
} from "react";
import {
  ArrowLeft,
  Check,
  X,
  ShieldCheck,
  RotateCcw,
  Loader2,
  AlertCircle,
  Sparkles,
  Mail,
  Smartphone,
} from "lucide-react";
import { toast } from "@components/ui/toaster";
import axios from "../../../config/axios";

interface VerifyPageProps {
  authMethod?: "phone" | "email";
  phoneNumber?: string;
  countryCode?: string;
  email?: string;
  fcmToken?: string;
  deviceId?: string;
  deviceType?: string;
  onClose?: () => void;
  onBack?: () => void;
  onSuccess?: () => void;
  embedded?: boolean;
}

export function VerifyPage({
  authMethod = "phone",
  phoneNumber = "9872087820",
  countryCode = "+91",
  email = "",
  fcmToken = "dummy_token",
  deviceId = "",
  deviceType = "web",
  onClose,
  onBack,
  onSuccess,
  embedded = false,
}: VerifyPageProps) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isEmailMode = authMethod === "email";

  // Auto-focus the first OTP input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  // Handle single digit changes
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);
    setError("");

    if (digit && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace and keyboard navigation
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle pasting multi-digit OTP
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pastedData) return;

    const nextOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      nextOtp[i] = pastedData[i];
    }
    setOtp(nextOtp);
    setError("");

    const focusIndex = Math.min(pastedData.length, 3);
    inputRefs.current[focusIndex]?.focus();
  };

  // Verify OTP submission
  const handleVerify = useCallback(
    async (currentOtp?: string[]) => {
      const activeOtp = currentOtp || otp;
      if (!activeOtp.every(Boolean) || loading) return;

      setLoading(true);
      setError("");

      try {
        const otpString = activeOtp.join("");

        const payload = isEmailMode
          ? {
              otp: otpString,
              email,
              fcmToken,
              deviceId,
              deviceType,
            }
          : {
              otp: otpString,
              mobile: phoneNumber,
              countryCode,
              fcmToken,
              deviceId,
              deviceType,
            };

        const response = await axios.post("/verifyOtp", payload);
        const resData = response?.data;

        // Set logged-in flag and store token & user info in storage
        if (typeof window !== "undefined") {
          localStorage.setItem("astroyavi_logged_in", "true");

          const token =
            resData?.token ||
            resData?.data?.token ||
            resData?.accessToken ||
            resData?.data?.accessToken ||
            resData?.jwt ||
            resData?.data?.jwt;

          if (token) {
            localStorage.setItem("astroyavi_token", token);
            localStorage.setItem("token", token);
          }

          const userData =
            resData?.user ||
            resData?.data?.user ||
            resData?.data?.data ||
            resData?.data;

          if (userData && typeof userData === "object") {
            localStorage.setItem("astroyavi_user", JSON.stringify(userData));
          }

          window.dispatchEvent(new Event("astroyavi_auth_change"));
        }

        toast.success("Verification Successful", {
          description: isEmailMode
            ? "Your email has been verified successfully."
            : "Your mobile number has been verified successfully.",
        });

        setVerified(true);

        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          } else if (onClose) {
            onClose();
          }
        }, 1000);
      } catch (requestError: unknown) {
        const errorMessage =
          requestError instanceof Error
            ? requestError.message
            : "Invalid OTP. Please check and try again.";

        toast.error("OTP verification failed", {
          description: errorMessage,
        });
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [
      otp,
      loading,
      isEmailMode,
      phoneNumber,
      countryCode,
      email,
      fcmToken,
      deviceId,
      deviceType,
      onSuccess,
      onClose,
    ],
  );

  // Auto-submit when all 4 digits are filled
  useEffect(() => {
    if (otp.every((digit) => digit.length === 1) && !verified && !loading) {
      handleVerify(otp);
    }
  }, [otp, verified, loading, handleVerify]);

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (secondsLeft > 0 || resending) return;

    setResending(true);
    setError("");

    try {
      const payload = isEmailMode
        ? { email }
        : { mobile: phoneNumber, countryCode };

      await axios.post("/signUp", payload);

      toast.success("OTP Resent", {
        description: isEmailMode
          ? `A fresh code has been sent to ${email}`
          : `A fresh code has been sent to ${countryCode} ${phoneNumber}`,
      });

      setOtp(["", "", "", ""]);
      setSecondsLeft(30);
      setVerified(false);
      inputRefs.current[0]?.focus();
    } catch {
      toast.error("Failed to resend OTP", {
        description: "Please check your network and try again in a moment.",
      });
    } finally {
      setResending(false);
    }
  };

  const isFormComplete = otp.every(Boolean);

  const content = (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="verify-dialog-title"
      className={
        embedded
          ? "relative w-full text-center"
          : "relative z-10 my-auto w-full max-w-[440px] rounded-[32px] border border-amber-900/10 bg-white px-6 py-8 text-center shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 sm:px-8"
      }
    >
      {/* Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close verification dialog"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 hover:rotate-90 hover:bg-slate-200 hover:text-slate-900"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {verified ? (
        /* Success State */
        <div className="space-y-4 py-6 animate-in zoom-in-90 fade-in duration-300">
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-md">
            <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
            <Check className="relative h-8 w-8 stroke-[2.5]" />
          </div>

          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-[26px]">
              Verified Successfully!
            </h2>
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              Your Astroyavi account is ready.
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-[#c85a17] border border-amber-200/60 shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Welcome to Astroyavi</span>
            </div>
          </div>
        </div>
      ) : (
        /* OTP Verification Form */
        <>
          {/* Header Icon */}
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100/70 border border-amber-200/60 shadow-sm text-[#c85a17]">
            {isEmailMode ? (
              <Mail className="h-6 w-6 text-[#c85a17]" />
            ) : (
              <ShieldCheck className="h-6 w-6 text-[#c85a17]" />
            )}
          </div>

          <div className="space-y-1.5">
            <h1
              id="verify-dialog-title"
              className="font-serif text-2xl font-bold tracking-tight text-[#1e293b] sm:text-[26px]"
            >
              {isEmailMode ? "Verify Email OTP" : "Verify Mobile OTP"}
            </h1>
            <p className="text-xs font-medium leading-relaxed text-slate-500 sm:text-sm">
              Enter the 4-digit code sent to{" "}
              <span className="font-bold text-slate-800">
                {isEmailMode ? email : `${countryCode} ${phoneNumber}`}
              </span>
            </p>
          </div>

          {/* 4 OTP Digit Input Boxes */}
          <div className="mt-6 flex justify-center gap-3 sm:gap-4">
            {otp.map((digit, index) => {
              const isFilled = Boolean(digit);
              return (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  aria-label={`OTP digit ${index + 1}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleOtpChange(index, event.target.value)
                  }
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onPaste={handlePaste}
                  className={`h-14 w-12 rounded-2xl border text-center text-xl font-bold text-slate-900 outline-none transition-all duration-150 sm:h-16 sm:w-14 sm:text-2xl ${
                    isFilled
                      ? "border-[#163014] bg-emerald-50/30 text-[#163014] shadow-xs"
                      : "border-slate-300 bg-slate-50/50 hover:border-slate-400 focus:bg-white focus:border-[#163014] focus:ring-4 focus:ring-[#163014]/10"
                  }`}
                />
              );
            })}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-red-50 p-2.5 text-xs font-medium text-red-600 animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Verify CTA Button */}
          <button
            type="button"
            onClick={() => handleVerify()}
            disabled={!isFormComplete || loading}
            className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#163014] py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-[#0e210d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full pointer-events-none" />
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify & Proceed</span>
            )}
          </button>

          {/* Footer Controls: Change Input & Resend OTP */}
          <div className="mt-4 flex items-center justify-between px-1 text-xs">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-1.5 font-semibold text-slate-600 transition hover:text-slate-900"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{isEmailMode ? "Change email" : "Change number"}</span>
              </button>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={secondsLeft > 0 || resending}
              className="flex items-center gap-1.5 font-bold transition disabled:cursor-default"
            >
              {resending ? (
                <span className="flex items-center gap-1 text-slate-400">
                  <RotateCcw className="h-3 w-3 animate-spin" />
                  Sending...
                </span>
              ) : secondsLeft > 0 ? (
                <span className="text-slate-400 font-medium">
                  Resend in{" "}
                  <strong className="text-slate-700 font-bold">
                    {secondsLeft}s
                  </strong>
                </span>
              ) : (
                <span className="text-[#c85a17] hover:text-[#a0430d] underline decoration-amber-300 underline-offset-2">
                  Resend OTP
                </span>
              )}
            </button>
          </div>
        </>
      )}
    </section>
  );

  if (embedded) return content;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1f211f] px-4 py-8">
      <div className="absolute inset-0 bg-[url('/images/astroyavi_logo.jpeg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      {content}
    </main>
  );
}

export default VerifyPage;
