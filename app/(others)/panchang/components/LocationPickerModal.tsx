"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  MapPin,
  Search,
  Crosshair,
  X,
  Check,
  Loader2,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { getCoordinates } from "../panchang";

interface LocationResult {
  displayName: string;
  cityName: string;
  lat: number;
  lon: number;
}

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlace: string;
  onSelectLocation: (placeName: string, lat?: number, lon?: number) => void;
}

const PRESET_CITIES = [
  { name: "Delhi, India", lat: 28.6139, lon: 77.209 },
  { name: "Noida, India", lat: 28.5355, lon: 77.391 },
  { name: "Varanasi, India", lat: 25.3176, lon: 82.9739 },
  { name: "Mumbai, India", lat: 19.076, lon: 72.8777 },
  { name: "Jaipur, India", lat: 26.9124, lon: 75.7873 },
  { name: "Ayodhya, India", lat: 26.7922, lon: 82.1998 },
  { name: "Ujjain, India", lat: 23.1765, lon: 75.7885 },
  { name: "Haridwar, India", lat: 29.9457, lon: 78.1642 },
  { name: "Bangalore, India", lat: 12.9716, lon: 77.5946 },
  { name: "Kolkata, India", lat: 22.5726, lon: 88.3639 },
  { name: "Chennai, India", lat: 13.0827, lon: 80.2707 },
  { name: "Pune, India", lat: 18.5204, lon: 73.8567 },
];

export function LocationPickerModal({
  isOpen,
  onClose,
  currentPlace,
  onSelectLocation,
}: LocationPickerModalProps) {
  const [searchQuery, setSearchQuery] = useState(currentPlace || "Delhi, India");
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lon: number }>({
    lat: 28.6139,
    lon: 77.209,
  });
  const [selectedPlaceName, setSelectedPlaceName] = useState(currentPlace || "Delhi, India");
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [searchResults, setSearchResults] = useState<LocationResult[]>([]);
  const [locateError, setLocateError] = useState<string | null>(null);

  // Initialize coordinates from currentPlace
  useEffect(() => {
    if (isOpen) {
      setSearchQuery(currentPlace || "Delhi, India");
      setSelectedPlaceName(currentPlace || "Delhi, India");
      setLocateError(null);
      getCoordinates(currentPlace || "Delhi, India").then((coords) => {
        setSelectedCoords(coords);
      });
    }
  }, [isOpen, currentPlace]);

  // Search places via Geocoding API with debounce
  const handleSearch = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setLocateError(null);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query.trim()
        )}&addressdetails=1&limit=6`
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const results: LocationResult[] = data.map((item: any) => {
            const addr = item.address || {};
            const city =
              addr.city ||
              addr.town ||
              addr.village ||
              addr.county ||
              addr.state_district ||
              item.name;
            const state = addr.state || "";
            const country = addr.country || "";
            const formatted = [city, state, country].filter(Boolean).join(", ");

            return {
              displayName: item.display_name,
              cityName: formatted || item.display_name.split(",").slice(0, 3).join(","),
              lat: parseFloat(item.lat),
              lon: parseFloat(item.lon),
            };
          });
          setSearchResults(results);
        }
      }
    } catch {
      // ignore
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery && searchQuery !== selectedPlaceName) {
        handleSearch(searchQuery);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch, selectedPlaceName]);

  // GPS Location Detection
  const handleDetectGPS = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocateError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setLocateError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setSelectedCoords({ lat, lon });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const city =
              addr.city ||
              addr.town ||
              addr.village ||
              addr.suburb ||
              addr.county ||
              "Current Location";
            const state = addr.state || "";
            const country = addr.country || "";
            const resolvedName = [city, state, country].filter(Boolean).join(", ");

            setSelectedPlaceName(resolvedName);
            setSearchQuery(resolvedName);
          } else {
            setSelectedPlaceName(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
            setSearchQuery(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
          }
        } catch {
          setSelectedPlaceName(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
          setSearchQuery(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        if (err.code === 1) {
          setLocateError("Location permission was denied. Please select from below or search your city.");
        } else {
          setLocateError("Could not fetch GPS. Please enter your city name.");
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSelectPreset = (city: { name: string; lat: number; lon: number }) => {
    setSelectedCoords({ lat: city.lat, lon: city.lon });
    setSelectedPlaceName(city.name);
    setSearchQuery(city.name);
    setSearchResults([]);
    setLocateError(null);
  };

  const handleSelectSearchResult = (result: LocationResult) => {
    setSelectedCoords({ lat: result.lat, lon: result.lon });
    setSelectedPlaceName(result.cityName);
    setSearchQuery(result.cityName);
    setSearchResults([]);
    setLocateError(null);
  };

  const handleConfirm = () => {
    onSelectLocation(selectedPlaceName, selectedCoords.lat, selectedCoords.lon);
    onClose();
  };

  if (!isOpen) return null;

  // Google Maps Embed URL
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${selectedCoords.lat},${selectedCoords.lon}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  const googleMapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    selectedPlaceName
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-[#e6c896] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#fdfbf7] border-b border-amber-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[#801c10]">
            <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-[#801c10]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#2b1810]">
                Choose Panchang Location
              </h3>
              <p className="text-xs text-[#5c4033]">
                Exact Vedic calculations (Sunrise, Sunset, Tithi) depend on your city coordinates.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Search & GPS Row */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#3c2415] uppercase tracking-wider block">
              Search City, Area, or Landmark
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., Delhi, Varanasi, Jaipur, London..."
                  className="w-full bg-white border border-[#e6c896] rounded-xl py-2.5 pl-10 pr-10 text-sm font-semibold text-[#2b1810] focus:outline-none focus:ring-2 focus:ring-[#1b4327]/20 focus:border-[#1b4327] shadow-2xs"
                />
                <Search className="w-4 h-4 text-[#c87638] absolute left-3.5 top-1/2 -translate-y-1/2" />
                {isSearching && (
                  <Loader2 className="w-4 h-4 text-[#1b4327] animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
                )}
              </div>

              {/* GPS Button */}
              <button
                type="button"
                onClick={handleDetectGPS}
                disabled={isLocating}
                className="px-3.5 py-2.5 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl text-xs font-bold text-[#801c10] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-60 shadow-2xs"
                title="Detect GPS Location"
              >
                {isLocating ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#801c10]" />
                ) : (
                  <Crosshair className="w-4 h-4 text-[#801c10]" />
                )}
                <span className="hidden sm:inline">Detect GPS</span>
              </button>
            </div>

            {/* Error Message with Dismiss Button */}
            {locateError && (
              <div className="flex items-center justify-between text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                <span>{locateError}</span>
                <button
                  type="button"
                  onClick={() => setLocateError(null)}
                  className="text-amber-800 hover:text-amber-950 ml-2"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Live Autocomplete Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="border border-amber-200 rounded-xl bg-white shadow-lg overflow-hidden divide-y divide-amber-100 max-h-48 overflow-y-auto mt-1 z-20">
                {searchResults.map((res, idx) => (
                  <button
                    key={`${res.cityName}-${idx}`}
                    type="button"
                    onClick={() => handleSelectSearchResult(res)}
                    className="w-full text-left px-3.5 py-2 hover:bg-amber-50 flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-[#c87638] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#2b1810]">{res.cityName}</p>
                      <p className="text-[11px] text-[#8c6d58] line-clamp-1">{res.displayName}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Google Maps Embed Visualizer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3c2415] uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#c87638]" />
                Google Map View
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#8c6d58] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {selectedCoords.lat.toFixed(4)}° N, {selectedCoords.lon.toFixed(4)}° E
                </span>
                <a
                  href={googleMapsExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-[#801c10] hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="w-full h-56 rounded-2xl overflow-hidden border border-[#e6c896] relative shadow-inner bg-slate-100">
              <iframe
                title="Google Map Panchang Location"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={googleMapEmbedUrl}
                className="w-full h-full"
                loading="lazy"
              />

              {/* Pin Overlay Badge */}
              <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-2xs px-2.5 py-1 rounded-lg border border-amber-300 shadow-md text-xs font-bold text-[#801c10] flex items-center gap-1 pointer-events-none">
                <MapPin className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                <span>{selectedPlaceName}</span>
              </div>
            </div>
          </div>

          {/* Quick Preset Sacred & Major Cities */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#8c6d58] uppercase tracking-wider block">
              Popular &amp; Holy Cities
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_CITIES.map((city) => (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => handleSelectPreset(city)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    selectedPlaceName.toLowerCase().includes(city.name.split(",")[0].toLowerCase())
                      ? "bg-[#1b4327] text-white font-bold shadow-2xs"
                      : "bg-amber-50 hover:bg-amber-100 text-[#5c4033] border border-amber-200"
                  }`}
                >
                  {city.name.split(",")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#fdfbf7] border-t border-amber-200/80 flex items-center justify-between gap-3">
          <div className="text-xs text-[#5c4033]">
            Selected: <strong className="text-[#801c10]">{selectedPlaceName}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#5c4033] hover:bg-amber-100/60 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1b4327] hover:bg-[#13321d] text-white shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
