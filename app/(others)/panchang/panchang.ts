import axios from "@/config/axios";

export interface PanchangSunMoon {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  sunSign: string;
  moonSign: string;
}

export interface PanchangDetails {
  dayName: string;
  tithi: string;
  tithiEndTime: string;
  nakshatra: string;
  nakshatraLord: string;
  nakshatraEndTime: string;
  yoga: string;
  yogaEndTime: string;
  karana: string;
  secondKarana: string;
  karanaEndTime: string;
  paksha: string;
  ritu: string;
  ayana: string;
  vikramSamvat: string;
  shakaSamvat: string;
  hinduMaah: string;
}

export interface PanchangAuspicious {
  abhijit: string;
  amruthaKala: string;
  brahmaMuhurta: string;
  vijayMuhurta: string;
  godhuliMuhurta: string;
}

export interface PanchangInauspicious {
  rahuKal: string;
  yamaganda: string;
  gulikaiKaal: string;
  varjam: string;
  durMuhurta: string;
}

export interface PanchangNivasShool {
  dishaShool: string;
  nakshatraShool: string;
  moonNivas: string;
}

export interface ChoghadiyaItem {
  id: number;
  name: string;
  time: string;
  status: "Auspicious" | "Inauspicious" | "Neutral";
}

export interface FullPanchangData {
  sunMoon: PanchangSunMoon;
  panchang: PanchangDetails;
  auspicious: PanchangAuspicious;
  inauspicious: PanchangInauspicious;
  nivasShool: PanchangNivasShool;
  choghadiya: {
    day: ChoghadiyaItem[];
    night: ChoghadiyaItem[];
  };
  date: string;
  place: string;
}

// Coordinate Dictionary for common cities
const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  delhi: { lat: 28.6139, lon: 77.209 },
  "new delhi": { lat: 28.6139, lon: 77.209 },
  noida: { lat: 28.5355, lon: 77.391 },
  gurgaon: { lat: 28.4595, lon: 77.0266 },
  gurugram: { lat: 28.4595, lon: 77.0266 },
  mumbai: { lat: 19.076, lon: 72.8777 },
  pune: { lat: 18.5204, lon: 73.8567 },
  bangalore: { lat: 12.9716, lon: 77.5946 },
  bengaluru: { lat: 12.9716, lon: 77.5946 },
  hyderabad: { lat: 17.385, lon: 78.4867 },
  chennai: { lat: 13.0827, lon: 80.2707 },
  kolkata: { lat: 22.5726, lon: 88.3639 },
  ahmedabad: { lat: 23.0225, lon: 72.5714 },
  jaipur: { lat: 26.9124, lon: 75.7873 },
  lucknow: { lat: 26.8467, lon: 80.9462 },
  varanasi: { lat: 25.3176, lon: 82.9739 },
  patna: { lat: 25.5941, lon: 85.1376 },
  chandigarh: { lat: 30.7333, lon: 76.7794 },
  surat: { lat: 21.1702, lon: 72.8311 },
  indore: { lat: 22.7196, lon: 75.8577 },
  bhopal: { lat: 23.2599, lon: 77.4126 },
  nagpur: { lat: 21.1458, lon: 79.0882 },
  kanpur: { lat: 26.4499, lon: 80.3319 },
  visakhapatnam: { lat: 17.6868, lon: 83.2185 },
  vadodara: { lat: 22.3072, lon: 73.1812 },
  ghaziabad: { lat: 28.6692, lon: 77.4538 },
  ludhiana: { lat: 30.901, lon: 75.8573 },
  agra: { lat: 27.1767, lon: 78.0081 },
  nashik: { lat: 19.9975, lon: 73.7898 },
  faridabad: { lat: 28.4089, lon: 77.3178 },
  meerut: { lat: 28.9845, lon: 77.7064 },
  rajkot: { lat: 22.3039, lon: 70.8022 },
  srinagar: { lat: 34.0837, lon: 74.7973 },
  amritsar: { lat: 31.634, lon: 74.8723 },
  ranchi: { lat: 23.3441, lon: 85.3096 },
  jabalpur: { lat: 23.1815, lon: 79.9864 },
  gwalior: { lat: 26.2183, lon: 78.1828 },
  vijayawada: { lat: 16.5062, lon: 80.648 },
  jodhpur: { lat: 26.2389, lon: 73.0243 },
  raipur: { lat: 21.2514, lon: 81.6296 },
  kota: { lat: 25.2138, lon: 75.8648 },
  guwahati: { lat: 26.1445, lon: 91.7362 },
  dehradun: { lat: 30.3165, lon: 78.0322 },
  bhubaneswar: { lat: 20.2961, lon: 85.8245 },
  coimbatore: { lat: 11.0168, lon: 76.9558 },
  madurai: { lat: 9.9252, lon: 78.1198 },
  mysore: { lat: 12.2958, lon: 76.6394 },
  thiruvananthapuram: { lat: 8.5241, lon: 76.9366 },
};

export async function getCoordinates(placeName: string): Promise<{ lat: number; lon: number }> {
  const normalized = placeName.trim().toLowerCase();

  for (const [key, coords] of Object.entries(CITY_COORDINATES)) {
    if (normalized.includes(key)) {
      return coords;
    }
  }

  // Fallback to OpenStreetMap geocoding if available
  try {
    const res = await window.fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        placeName
      )}&limit=1`
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
      }
    }
  } catch {
    // ignore fetch error in non-browser/offline environments
  }

  // Default fallback (Delhi)
  return { lat: 28.6139, lon: 77.209 };
}

function formatTimingRange(obj: any): string {
  if (!obj) return "--";
  if (typeof obj === "string") return obj;
  const start = obj.start || obj.start_time || obj.starts || "";
  const end = obj.end || obj.end_time || obj.ends || "";
  if (start && end) return `${start} - ${end}`;
  if (start) return `Starts ${start}`;
  if (end) return `Up to ${end}`;
  return "--";
}

function formatChoghadiyaStatus(type: string): "Auspicious" | "Inauspicious" | "Neutral" {
  const lower = (type || "").toLowerCase();
  if (["shubh", "amrit", "labh", "amrita", "auspicious", "good"].some((k) => lower.includes(k))) {
    return "Auspicious";
  }
  if (["udveg", "rog", "kal", "kaal", "inauspicious", "bad"].some((k) => lower.includes(k))) {
    return "Inauspicious";
  }
  return "Neutral";
}

export const defaultPanchangData: FullPanchangData = {
  sunMoon: {
    sunrise: "--",
    sunset: "--",
    moonrise: "--",
    moonset: "--",
    sunSign: "--",
    moonSign: "--",
  },
  panchang: {
    dayName: "--",
    tithi: "--",
    tithiEndTime: "--",
    nakshatra: "--",
    nakshatraLord: "--",
    nakshatraEndTime: "--",
    yoga: "--",
    yogaEndTime: "--",
    karana: "--",
    secondKarana: "--",
    karanaEndTime: "--",
    paksha: "--",
    ritu: "--",
    ayana: "--",
    vikramSamvat: "--",
    shakaSamvat: "--",
    hinduMaah: "--",
  },
  auspicious: {
    abhijit: "--",
    amruthaKala: "--",
    brahmaMuhurta: "--",
    vijayMuhurta: "--",
    godhuliMuhurta: "--",
  },
  inauspicious: {
    rahuKal: "--",
    yamaganda: "--",
    gulikaiKaal: "--",
    varjam: "--",
    durMuhurta: "--",
  },
  nivasShool: {
    dishaShool: "--",
    nakshatraShool: "--",
    moonNivas: "--",
  },
  choghadiya: {
    day: [],
    night: [],
  },
  date: "",
  place: "",
};

// Compatibility export
export type PanchangMetricsData = {
  sunrise: string;
  sunset: string;
  yoga: string;
  tithi: string;
  nakshatra: string;
  karana: string;
  paksha: string;
  secondKarana: string;
  abhijit: string;
  varjam: string;
  amruthaKala: string;
  rahuKal: string;
};

export const defaultMetrics: PanchangMetricsData = {
  sunrise: defaultPanchangData.sunMoon.sunrise,
  sunset: defaultPanchangData.sunMoon.sunset,
  yoga: defaultPanchangData.panchang.yoga,
  tithi: defaultPanchangData.panchang.tithi,
  nakshatra: defaultPanchangData.panchang.nakshatra,
  karana: defaultPanchangData.panchang.karana,
  paksha: defaultPanchangData.panchang.paksha,
  secondKarana: defaultPanchangData.panchang.secondKarana,
  abhijit: defaultPanchangData.auspicious.abhijit,
  varjam: defaultPanchangData.inauspicious.varjam,
  amruthaKala: defaultPanchangData.auspicious.amruthaKala,
  rahuKal: defaultPanchangData.inauspicious.rahuKal,
};

// ==========================================
// API INTEGRATION FUNCTION FOR PANCHANG
// ==========================================
export async function getPanchangData(dateString: string, place: string): Promise<FullPanchangData> {
  const parts = dateString.split("-").map(Number);
  const year = parts[0] || new Date().getFullYear();
  const month = parts[1] || new Date().getMonth() + 1;
  const day = parts[2] || new Date().getDate();

  const { lat, lon } = await getCoordinates(place);

  const payload = {
    day,
    month,
    year,
    place: place || "Delhi, India",
    lat,
    lon,
    tzone: 5.5,
    lan: "en",
  };

  // Perform parallel requests with individual catch handling so partial API failures don't block the UI
  const [
    sunMoonRes,
    panchangRes,
    auspiciousRes,
    inauspiciousRes,
    choghadiyaRes,
    nivasRes,
  ] = await Promise.all([
    axios.post("/sunAndMoon", payload).catch((err) => {
      console.warn("sunAndMoon API error:", err?.response?.data || err.message);
      return { data: { data: null } };
    }),
    axios.post("/panchang", { ...payload, sign_lan: 0 }).catch((err) => {
      console.warn("panchang API error:", err?.response?.data || err.message);
      return { data: { data: null } };
    }),
    axios.post("/auspiciousTimings", payload).catch((err) => {
      console.warn("auspiciousTimings API error:", err?.response?.data || err.message);
      return { data: { data: null } };
    }),
    axios.post("/inauspiciousTimings", payload).catch((err) => {
      console.warn("inauspiciousTimings API error:", err?.response?.data || err.message);
      return { data: { data: null } };
    }),
    axios.post("/choghadiya", payload).catch((err) => {
      console.warn("choghadiya API error:", err?.response?.data || err.message);
      return { data: { data: null } };
    }),
    axios.post("/nivasAndShool", payload).catch((err) => {
      console.warn("nivasAndShool API error:", err?.response?.data || err.message);
      return { data: { data: null } };
    }),
  ]);

  const sunMoonRaw = sunMoonRes?.data?.data || {};
  const panchangRaw = panchangRes?.data?.data || {};
  const auspiciousRaw = auspiciousRes?.data?.data || {};
  const inauspiciousRaw = inauspiciousRes?.data?.data || {};
  const choghadiyaRaw = choghadiyaRes?.data?.data || {};
  const nivasRaw = nivasRes?.data?.data || {};

  // Parse Sun & Moon Details
  const sunMoon: PanchangSunMoon = {
    sunrise: sunMoonRaw.sunrise || defaultPanchangData.sunMoon.sunrise,
    sunset: sunMoonRaw.sunset || defaultPanchangData.sunMoon.sunset,
    moonrise: sunMoonRaw.moonrise || defaultPanchangData.sunMoon.moonrise,
    moonset: sunMoonRaw.moonset || defaultPanchangData.sunMoon.moonset,
    sunSign: sunMoonRaw.sun_sign || sunMoonRaw.sunSign || defaultPanchangData.sunMoon.sunSign,
    moonSign: sunMoonRaw.moon_sign || sunMoonRaw.moonSign || defaultPanchangData.sunMoon.moonSign,
  };

  // Parse Vedic Panchang Details
  const tithiObj = panchangRaw.tithi || {};
  const nakshatraObj = panchangRaw.nakshatra || {};
  const yogaObj = panchangRaw.yoga || panchangRaw.yog || {};
  const karanaObj = panchangRaw.karana || panchangRaw.karan || {};
  const hinduMaahObj = panchangRaw.hindu_maah || panchangRaw.hindu_month || {};

  const panchang: PanchangDetails = {
    dayName: panchangRaw.day?.name || defaultPanchangData.panchang.dayName,
    tithi: tithiObj.name || defaultPanchangData.panchang.tithi,
    tithiEndTime: tithiObj.end ? `Up to ${tithiObj.end}` : defaultPanchangData.panchang.tithiEndTime,
    nakshatra: nakshatraObj.name || defaultPanchangData.panchang.nakshatra,
    nakshatraLord: nakshatraObj.lord || defaultPanchangData.panchang.nakshatraLord,
    nakshatraEndTime: nakshatraObj.end ? `Up to ${nakshatraObj.end}` : defaultPanchangData.panchang.nakshatraEndTime,
    yoga: yogaObj.name || defaultPanchangData.panchang.yoga,
    yogaEndTime: yogaObj.end ? `Up to ${yogaObj.end}` : defaultPanchangData.panchang.yogaEndTime,
    karana: karanaObj.name || defaultPanchangData.panchang.karana,
    secondKarana: karanaObj.next_karana?.name || panchangRaw.second_karana?.name || "Balava",
    karanaEndTime: karanaObj.end ? `Up to ${karanaObj.end}` : defaultPanchangData.panchang.karanaEndTime,
    paksha: typeof panchangRaw.paksha === "object" ? panchangRaw.paksha?.name : panchangRaw.paksha || defaultPanchangData.panchang.paksha,
    ritu: typeof panchangRaw.ritu === "object" ? panchangRaw.ritu?.name : panchangRaw.ritu || defaultPanchangData.panchang.ritu,
    ayana: typeof panchangRaw.ayana === "object" ? panchangRaw.ayana?.name : panchangRaw.ayana || defaultPanchangData.panchang.ayana,
    vikramSamvat: String(panchangRaw.vikram_samvat || defaultPanchangData.panchang.vikramSamvat),
    shakaSamvat: String(panchangRaw.shaka_samvat || defaultPanchangData.panchang.shakaSamvat),
    hinduMaah: typeof hinduMaahObj === "object" ? (hinduMaahObj.purnimanta || hinduMaahObj.amanta || defaultPanchangData.panchang.hinduMaah) : String(hinduMaahObj),
  };

  // Parse Auspicious Timings
  const auspicious: PanchangAuspicious = {
    abhijit: formatTimingRange(auspiciousRaw.abhijit_muhurta || auspiciousRaw.abhijit),
    amruthaKala: formatTimingRange(auspiciousRaw.amrit_kaal || auspiciousRaw.amrit_kalam || auspiciousRaw.amrita_kala),
    brahmaMuhurta: formatTimingRange(auspiciousRaw.brahma_muhurta || auspiciousRaw.brahma),
    vijayMuhurta: formatTimingRange(auspiciousRaw.vijay_muhurta || auspiciousRaw.vijaya),
    godhuliMuhurta: formatTimingRange(auspiciousRaw.godhuli_muhurta || auspiciousRaw.godhuli),
  };

  // If abhijit wasn't returned from API, fallback to default
  if (auspicious.abhijit === "--") auspicious.abhijit = defaultPanchangData.auspicious.abhijit;
  if (auspicious.amruthaKala === "--") auspicious.amruthaKala = defaultPanchangData.auspicious.amruthaKala;
  if (auspicious.brahmaMuhurta === "--") auspicious.brahmaMuhurta = defaultPanchangData.auspicious.brahmaMuhurta;
  if (auspicious.vijayMuhurta === "--") auspicious.vijayMuhurta = defaultPanchangData.auspicious.vijayMuhurta;
  if (auspicious.godhuliMuhurta === "--") auspicious.godhuliMuhurta = defaultPanchangData.auspicious.godhuliMuhurta;

  // Parse Inauspicious Timings
  const inauspicious: PanchangInauspicious = {
    rahuKal: formatTimingRange(inauspiciousRaw.rahu_kaal || inauspiciousRaw.rahu_kalam),
    yamaganda: formatTimingRange(inauspiciousRaw.yamaganda || inauspiciousRaw.yamagandam),
    gulikaiKaal: formatTimingRange(inauspiciousRaw.gulikai_kaal || inauspiciousRaw.gulika_kalam),
    varjam: formatTimingRange(inauspiciousRaw.varjyam || inauspiciousRaw.varjam),
    durMuhurta: formatTimingRange(inauspiciousRaw.dur_muhurta || inauspiciousRaw.durmuhurtham),
  };

  if (inauspicious.rahuKal === "--") inauspicious.rahuKal = defaultPanchangData.inauspicious.rahuKal;
  if (inauspicious.yamaganda === "--") inauspicious.yamaganda = defaultPanchangData.inauspicious.yamaganda;
  if (inauspicious.gulikaiKaal === "--") inauspicious.gulikaiKaal = defaultPanchangData.inauspicious.gulikaiKaal;
  if (inauspicious.varjam === "--") inauspicious.varjam = defaultPanchangData.inauspicious.varjam;
  if (inauspicious.durMuhurta === "--") inauspicious.durMuhurta = defaultPanchangData.inauspicious.durMuhurta;

  // Parse Nivas & Shool Details
  const nivasShool: PanchangNivasShool = {
    dishaShool: nivasRaw.disha_shool || defaultPanchangData.nivasShool.dishaShool,
    nakshatraShool: nivasRaw.nakshatra_shool || defaultPanchangData.nivasShool.nakshatraShool,
    moonNivas: nivasRaw.moon_nivas || defaultPanchangData.nivasShool.moonNivas,
  };

  // Parse Choghadiya (Day & Night)
  let dayChoghadiya: ChoghadiyaItem[] = [];
  if (Array.isArray(choghadiyaRaw.day) && choghadiyaRaw.day.length > 0) {
    dayChoghadiya = choghadiyaRaw.day.map((item: any, idx: number) => ({
      id: idx + 1,
      name: item.name || item.muhurta || `Period ${idx + 1}`,
      time: item.start_time && item.end_time ? `${item.start_time} - ${item.end_time}` : formatTimingRange(item),
      status: formatChoghadiyaStatus(item.type || item.muhurta || item.status),
    }));
  } else {
    dayChoghadiya = defaultPanchangData.choghadiya.day;
  }

  let nightChoghadiya: ChoghadiyaItem[] = [];
  if (Array.isArray(choghadiyaRaw.night) && choghadiyaRaw.night.length > 0) {
    nightChoghadiya = choghadiyaRaw.night.map((item: any, idx: number) => ({
      id: idx + 1,
      name: item.name || item.muhurta || `Night ${idx + 1}`,
      time: item.start_time && item.end_time ? `${item.start_time} - ${item.end_time}` : formatTimingRange(item),
      status: formatChoghadiyaStatus(item.type || item.muhurta || item.status),
    }));
  } else {
    nightChoghadiya = defaultPanchangData.choghadiya.night;
  }

  return {
    sunMoon,
    panchang,
    auspicious,
    inauspicious,
    nivasShool,
    choghadiya: {
      day: dayChoghadiya,
      night: nightChoghadiya,
    },
    date: dateString,
    place,
  };
}
