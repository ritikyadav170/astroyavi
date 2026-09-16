"use client";

import React, {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  X,
  ChevronDown,
  Check,
  Search,
  Mail,
  Phone,
  Sparkles,
  AlertCircle,
  Loader2,
  Smartphone,
} from "lucide-react";
import axios from "../../../config/axios";
import VerifyPage from "../verify/verifyPage";

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "NP", name: "Nepal", dialCode: "+977", flag: "🇳🇵" },
  { code: "BD", name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰" },
  { code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { code: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
  { code: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  { code: "MU", name: "Mauritius", dialCode: "+230", flag: "🇲🇺" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "GR", name: "Greece", dialCode: "+30", flag: "🇬🇷" },
  { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
  { code: "TW", name: "Taiwan", dialCode: "+886", flag: "🇹🇼" },
];

const POPULAR_COUNTRY_CODES = ["IN", "US", "GB", "AE", "CA", "AU"];

interface CountryPickerProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
}

function CountryPicker({
  selectedCountry,
  onSelectCountry,
}: CountryPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const popularCountries = useMemo(() => {
    return COUNTRIES.filter((c) => POPULAR_COUNTRY_CODES.includes(c.code));
  }, []);

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Country Code"
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 sm:text-sm cursor-pointer"
      >
        <span className="text-base leading-none">{selectedCountry.flag}</span>
        <span className="font-bold text-slate-900">{selectedCountry.dialCode}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#163014]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-[10000] mt-2 w-72 max-w-[calc(100vw-3rem)] rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-2xl duration-150 sm:w-80">
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country or code..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#163014] focus:bg-white focus:ring-2 focus:ring-[#163014]/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="max-h-60 overflow-y-auto pr-1 text-left scrollbar-thin scrollbar-thumb-slate-200">
            {!searchQuery && (
              <div className="mb-2">
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Popular
                </div>
                <div className="space-y-0.5">
                  {popularCountries.map((country) => {
                    const isSelected = selectedCountry.code === country.code;
                    return (
                      <button
                        key={`pop-${country.code}`}
                        type="button"
                        onClick={() => {
                          onSelectCountry(country);
                          setIsOpen(false);
                          setSearchQuery("");
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition cursor-pointer ${
                          isSelected
                            ? "bg-[#163014]/10 font-bold text-[#163014]"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-400">
                            {country.dialCode}
                          </span>
                          {isSelected && (
                            <Check className="h-3.5 w-3.5 text-[#163014]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="my-1.5 border-t border-slate-100" />
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  All Countries
                </div>
              </div>
            )}

            {filteredCountries.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                No countries found
              </div>
            ) : (
              <div className="space-y-0.5">
                {filteredCountries.map((country) => {
                  const isSelected = selectedCountry.code === country.code;
                  return (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        onSelectCountry(country);
                        setIsOpen(false);
                        setSearchQuery("");
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition cursor-pointer ${
                        isSelected
                          ? "bg-[#163014]/10 font-bold text-[#163014]"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-base shrink-0">{country.flag}</span>
                        <span className="truncate">{country.name}</span>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5 pl-2">
                        <span className="font-semibold text-slate-400">
                          {country.dialCode}
                        </span>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-[#163014]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignupDialog({ isOpen, onClose }: SignupDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setError("");
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const isFormValid =
    authMethod === "phone"
      ? phoneNumber.length >= 7 && agreed && !loading
      : validateEmail(email) && agreed && !loading;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agreed || loading) return;

    if (authMethod === "phone") {
      if (phoneNumber.length < 7) {
        setError("Please enter a valid mobile number.");
        return;
      }
    } else {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      const payload =
        authMethod === "phone"
          ? { mobile: phoneNumber, countryCode: selectedCountry.dialCode }
          : { email };

      await axios.post("/signUp", payload);
      setSubmitted(true);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to send OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const dialogContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-300">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-dialog-title"
        className="relative my-auto w-full max-w-[440px] rounded-[32px] border border-amber-900/10 bg-white px-6 py-8 text-center shadow-2xl sm:px-8"
      >
        {/* Close Button */}
        {!submitted && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close signup dialog"
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 hover:rotate-90 hover:bg-slate-200 hover:text-slate-900 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {submitted ? (
          <VerifyPage
            authMethod={authMethod}
            phoneNumber={phoneNumber}
            countryCode={selectedCountry.dialCode}
            email={email}
            onClose={onClose}
            onBack={() => setSubmitted(false)}
            embedded
          />
        ) : (
          <>
            {/* Header / Brand Icon */}
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100/70 border border-amber-200/60 shadow-sm text-[#c85a17]">
              <Sparkles className="h-6 w-6 text-[#c85a17]" />
            </div>

            <div className="space-y-1">
              <h1
                id="signup-dialog-title"
                className="font-serif text-2xl font-bold tracking-tight text-[#1e293b] sm:text-[26px]"
              >
                Let&apos;s Get You Started
              </h1>
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                Choose your preferred method to sign up or log in
              </p>
            </div>

            {/* Segmented Option Switcher: Phone vs Email */}
            <div className="mt-5 flex rounded-full bg-slate-100 p-1 border border-slate-200/80 shadow-inner">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod("phone");
                  setError("");
                }}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  authMethod === "phone"
                    ? "bg-[#163014] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Smartphone className="h-4 w-4" />
                <span>Phone Number</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMethod("email");
                  setError("");
                }}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  authMethod === "email"
                    ? "bg-[#163014] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Stable Input Container (No Remount Blinking) */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  {authMethod === "phone" ? "Mobile Number" : "Email Address"}
                </label>

                {authMethod === "phone" ? (
                  /* Option 1: Phone Input with Country Picker */
                  <div className="relative flex h-[50px] w-full items-center rounded-full border border-slate-300 bg-white p-1.5 shadow-xs transition-colors focus-within:border-[#163014] focus-within:ring-2 focus-within:ring-[#163014]/20 hover:border-slate-400">
                    <CountryPicker
                      selectedCountry={selectedCountry}
                      onSelectCountry={(country) => setSelectedCountry(country)}
                    />

                    <div className="my-auto h-6 w-[1px] bg-slate-200" />

                    <div className="relative flex flex-1 items-center">
                      <input
                        aria-label="Mobile number"
                        type="tel"
                        inputMode="numeric"
                        maxLength={15}
                        required
                        value={phoneNumber}
                        onChange={(event) =>
                          setPhoneNumber(event.target.value.replace(/\D/g, ""))
                        }
                        placeholder="Enter Mobile Number"
                        className="w-full bg-transparent px-3 py-1 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-normal"
                      />
                      {phoneNumber && (
                        <button
                          type="button"
                          onClick={() => setPhoneNumber("")}
                          className="mr-2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Option 2: Email Address Input */
                  <div className="relative flex h-[50px] w-full items-center rounded-full border border-slate-300 bg-white px-4 shadow-xs transition-colors focus-within:border-[#163014] focus-within:ring-2 focus-within:ring-[#163014]/20 hover:border-slate-400">
                    <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      aria-label="Email address"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter Email Address"
                      className="w-full bg-transparent pl-3 pr-2 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-normal"
                    />
                    {email && (
                      <button
                        type="button"
                        onClick={() => setEmail("")}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Error Alert */}
              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-left text-xs font-medium text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={!isFormValid}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#163014] py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-[#0e210d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full pointer-events-none" />
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <span>
                    {authMethod === "phone" ? "Get OTP on Mobile" : "Get OTP on Email"}
                  </span>
                )}
              </button>

              {/* Alternative method link */}
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod(authMethod === "phone" ? "email" : "phone");
                    setError("");
                  }}
                  className="text-xs font-semibold text-[#c85a17] hover:underline decoration-amber-300 underline-offset-4 transition-colors cursor-pointer"
                >
                  {authMethod === "phone"
                    ? "Or sign up with Email Address →"
                    : "Or sign up with Mobile Number →"}
                </button>
              </div>

              {/* Terms and Privacy Checkbox */}
              <label className="flex items-start justify-center gap-2.5 pt-1 text-left text-[11px] leading-relaxed text-slate-500 sm:text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-[#163014] focus:ring-[#163014] cursor-pointer"
                />
                <span className="select-none">
                  By signing up, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="font-bold text-slate-900 underline hover:text-[#c85a17] transition-colors"
                  >
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-bold text-slate-900 underline hover:text-[#c85a17] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </form>
          </>
        )}
      </section>
    </div>
  );

  return createPortal(dialogContent, document.body);
}
export default SignupDialog;
